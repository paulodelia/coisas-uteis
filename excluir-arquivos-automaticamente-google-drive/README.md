# Excluir arquivos automaticamente após X dias no Google Drive

1. [Introdução](#intro) - Situação em que precisei excluir arquivos automaticamente
2. [Como usar o script](#script) - Como usar e configurar o script para permitir que arquivos sejam excluídos automaticamente, de uma pasta do Google Drive, após determinado período de tempo

<div id='intro' />

## Introdução

O Google Drive é de longe minha ferramenta favorita para fazer o armazenamento de diversos arquivos. Eu gosto dele pela facilidade de estar integrado com as contas do Google e pelos 15GB que vem de graça. Além disso tem toda a vantagem de ter o Google Docs, Google Sheets... é simplesmente sensacional!

Sendo minha ferramenta de armazenamento favorita, obviamente foi a primeira que pensei quando precisei fazer backups para sites em Wordpress de um jeito que fosse "fácil de usar, seguro e gratuito".

No Wordpress foi bem tranquilo, pois achei um plugin chamado UpdraftPlus e ele também faz integração com o Google Drive. O UpdraftPlus cria uma pasta na raiz do seu Drive chamada UpdraftPlus, e todos os arquivos de backup ficam lá.

Já que eu queria o armazenamento gratuito, eu precisava ficar atento com o limite de 15GB do Google Drive. Nessa hora pensei que seria super simples, e bastava ir na pasta e configurar para excluir arquivos antigos que estivessem guardados por um período maior que 3 semanas. Desse jeito eu teria sempre 3 semanas de backup e não ocuparia o espaço todo.

Mas foi aí que veio minha primeira surpresa... O Google Drive não te dá nenhum meio para fazer esse controle maior sobre as pastas (nem mesmo nas versões pagas). Mas não é o fim do mundo! **Eu definitivamente não iria ficar excluindo manualmente os backups antigos, então tive que dar um jeito de fazer isso automaticamente.**

### Google Apps Script

Para resolver todo esse problema me deparei com o **Google Apps Script**, que é "uma plataforma de script desenvolvida pelo Google para o desenvolvimento de aplicativos leves na plataforma G Suite". Em outras palavras, com ela eu poderia escrever um **script para excluir os arquivos antigos automaticamente**!!

Vou fazer um breve tutorial caso você queira configurar um script para lidar com "manipulações" dentro do seu Google Drive de forma automática. Lembre-se de que isso não se limita apenas a excluir arquivos. A combinação do G Suite, APIs do Google e o Google Scripts te da uma **infinidade de possibilidades**.

<div id="script" />

## Como usar o script

Imagino que nessa altura você tem uma conta no Google e também possui uma pasta no Google Drive que você queira fazer essa gestão automática. Então vamos lá:

1. [Acesse o Google Apps Script](https://www.google.com/script/start/) e aperte no botão "Start Scripting"
2. Crie um novo projeto (tem um botão enorme escrito "Novo Projeto")
3. Dentro do projeto você pode dar uma nome pra ele (algo fácil por favor) - se quiser seguir que nem eu, você pode nomear para **remove-old-files**
4. No [**codigo.gs**](/codigo.gs) (arquivo principal padrão) cole o script que deixei disponível
5. Defina a pasta de backup e o limite de dias que vocÊ irá manter um arquivo
6. Crie o acionador para rodar o script toda semana

### Definir pasta de backup e limite de dias

Dentro do script tem duas variáveis logo no começo: **backupFolder** e **days**.

A **backupFolder** recebe o nome da pasta que você está usando de backup. Para o caso que eu falei lá em cima, de usar o UpdraftPlus no Wordpress, eu simplesmente atribuiria o valor 'UpdraftPlus' para a variável.

E para **days** basta você definir a quantidade de dias que você quer manter os arquivos antigos antes de serem excluídos. No meu caso tenho a necessidade de manter os arquivos por pelo menos 21 dias.

Para essas necessidades eu altero o script da seguinte maneira:

```js
var backupFolder = 'UpdraftPlus';

// How many days do you want to hold your files before they get deleted ?
var days = 21;
```

### Criar acionador para rodar o script toda semana

Agora que o script está configurado, só falta criar um acionador para que ele seja rodado toda semana (ou algum período que você achar melhor).

Procure pela opção "Meus projetos" lá na Home do Google Apps Scripts (fica um pouco abaixo do botão "Novo Projeto" que a gente usou lá no começo).

Dentro dos projetos você tem que apertar nas opções do seu projeto (os três pontinhos na vertical) e apertar em "acionadores"

Agora você pode apertar o botão azul escrito "Adicionar acionador". Dentro dele vão aparecer algumas opções de configuração. Eu vou passar as que eu utilizo e recomendo, mas você pode alterar sem problemas (exceto a de **função a ser executada**)

- Escolha a função que será executada: **DeleteFilesByDate**
- Implantação a ser executada: **Teste**
- Selecione a origem do evento: **Baseado no tempo**
- Selecione o tipo de acionador com base no tempo: **Contador de semanas**
- Selecione o dia da semana: **Escolha o dia que achar melhor**
- Selecione a hora do dia: **Escolha a hora que achar melhor**

### OBS

Pode ser que em algum momento seja socilitado que você autorize que o script tenha permissão para fazer alterações nas suas pastas do Google Drive. Como é um script que você mesmo fez não tem problemas em autorizar.

Para quem tem uma base de programação, acho que vai ser tranquilo para ler e entender o script sem problemas. Mas se você não entendeu e tem suas dúvidas do funcionamento, logo eu estarei postando um tutorial completo em vídeo, desde o backup no Wordpress, até chegar nesse script para gerenciar o backup no Google Drive.
