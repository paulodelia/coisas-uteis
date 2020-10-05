function GetFilesByDate() {
  var backupFolder = 'your-backup-folder-name-here';

  // How many days do you want to hold your files before they get deleted ?
  var days = 21;

  var arrFileIDs = [];

  // Files created/updated before this date will be deleted
  var LimitDateToHoldFiles = new Date().getTime() - 1000 * 60 * 60 * 24 * days;
  // 1000 = 1s
  // 1s * 60 = 1min * 60 = 1h * 24 = 1d * 21 = 21days

  var limitDateToHoldFiles = new Date(LimitDateToHoldFiles);
  var strLimitDateToHoldFiles = Utilities.formatDate(
    limitDateToHoldFiles,
    'GMT',
    'yyyy-MM-dd'
  );
  console.info(strLimitDateToHoldFiles);

  var FileID = '';
  var FileName = '';

  //Create an array of file ID's by date criteria
  var files = DriveApp.searchFiles(
    'modifiedDate < "' + strLimitDateToHoldFiles + '"'
  );

  while (files.hasNext()) {
    var file = files.next();
    var FileID = file.getId();
    var FileName = file.getName();
    // var FileType = file.getMimeType();
    var FileParentFolder = file.getParents().next().getName();

    // get files from the folder that you use to save the backup
    if (FileParentFolder == backupFolder) {
      arrFileIDs.push(FileID);
      console.info('FileID: ' + FileID);
      console.info('Last Updated: ' + file.getLastUpdated());
      console.info('Filename: ' + FileName);
    }
  }

  return arrFileIDs;
  console.info('FileIDs Array: ' + arrFileIDs);
}

function DeleteFilesByDate() {
  var arrayIDs = GetFilesByDate();

  for (var i = 0; i < arrayIDs.length; i++) {
    console.info('arrayIDs[i]: ' + arrayIDs[i]);
    //This deletes a file without needing to move it to the trash
    var DelResponse = Drive.Files.remove(arrayIDs[i]);
  }
}
