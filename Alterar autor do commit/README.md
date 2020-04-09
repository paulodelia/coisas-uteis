# Alterar autor do commit de um repositório inteiro

## Demonstração
[Clique aqui para assistir um vídeo com o funcionamento na prática das instruções dadas abaixo](https://www.youtube.com/watch?v=TjzBUwk4Zag)

## Passo a passo
- **Comece fazendo um clone do seu bare repository** - Vá até seu repositório no github e aperte o botão "Clone or Download" e copie a url. Após isso, abra seu terminal, navegue até a pasta onde deseja fazer o clone e digite o seguinte comando:

> Este comando criará um "bare repository" que você utilizará para executar os comandos das próximas etapas. Na prática você irá reconhecê-lo como uma pasta com o final .git, no meu caso foi criada como how-to-fix.git

```sh
git clone --bare https://github.com/paulodelia/how-to-fix.git
```

- **Descubra o email registrado nos commits que deseja alterar** - Para a próxima etapa é necessário saber o email que está atrelado ao commit. Para descobrir isto, basta navegar até a pasta que você acabou de fazer o clone (a com o final .git) e utilizar o comando:

> Este comando mostrará o histórico de commits feitos e mostrará o usuário e email utilizado em cada commit    

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
OLD_EMAIL="paulod@gmail.com"
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

- **Execute o script** - Abra o terminal e navegue até a pasta do seu bare repository, cole o script alterado com as suas informações e pressione enter

- **Envia suas alterações para o github** - Quando o processo acima finalizar execute este comando:

```sh
git push --force --tags origin 'refs/heads/*'
```
  
Ao entrar no github e olhar os commits você verá que foram alterados corretamente.

- **Considerações finais**
    1. O script altera somente os commits que possuem o email preenchido em OLD_EMAIL, portanto se seu repositório tiver commits de mais usuários estes não serão alterados
    2. Você pode rodar o script quantas vezes quiser
    3. Se está em um projeto com mais pessoas, avise-os de que este processo está sendo feito. Caso esqueçam de fazer um pull, e depois derem um merge, os commits serão duplicados. Portanto, lembre-se de não dar um push se você não tem o seu repositório local atualizado
    4. Este script não foi criado por mim, apenas estou fazendo um tutorial em português para ajudar mais pessoas. Link para o github do autor e vídeo original estão logo abaixo. PS: Recomendo muito que confiram o github e canal do Tim Sully e deixem uma estrela e um like

## Autor do script

https://github.com/timsully

## Vídeo original (inglês)

[![How to Change Author on Git Commits on an Entire Repository
](http://i3.ytimg.com/vi/3LIr70uVZ_Q/maxresdefault.jpg)](https://www.youtube.com/watch?v=3LIr70uVZ_Q&feature=youtu.be)

