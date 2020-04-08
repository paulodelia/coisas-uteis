# Alterar autor do commit de um repositório inteiro

## Passo a passo
- **Comece fazendo um clone do seu bare repository** - Vá até seu repositório no github e aperte o botão "Clone or Download" e copie a url. Após isso, abra seu terminal, navegue até a pasta onde deseja fazer o clone e digite o seguinte comando:

> Utilize a url que você copiou

```sh
git clone --bare https://github.com/paulodelia/how-to-fix.git
```

- **Descubra o email registrado nos commits que deseja alterar** - Para a próxima etapa é necessário saber o email que está atrelado ao commit. Para descobrir isto, basta navegar até a pasta que você acabou de fazer o clone (a com o final .git) e utilizar o comando:

> Este comando mostrará o histórico de commits feitos e mostrará o usuário e email utilizado em cada commit    
> No meu caso, o email cadastrado que desejo alterar é youtube@teste.com

```sh
git log
```

- **Altere os valores no script** - Você precisará trocar o valor de três variáveis: OLD_EMAIL, CORRECT_NAME e CORRECT_EMAIL

> É importante que você preencha esses valores dentro das aspas "seu-email-aqui-dentro@exemplo.com"  
  
- **Script original**
```sh
#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```  
  
- **Script com valores devidamente alterados**
```sh
#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="youtube@teste.com"
CORRECT_NAME="paulodelia"
CORRECT_EMAIL="paulohdelia@gmail.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```  

## Autor do script

https://github.com/timsully

## Vídeo original (inglês)

[![How to Change Author on Git Commits on an Entire Repository
](http://i3.ytimg.com/vi/3LIr70uVZ_Q/maxresdefault.jpg)](https://www.youtube.com/watch?v=3LIr70uVZ_Q&feature=youtu.be)

