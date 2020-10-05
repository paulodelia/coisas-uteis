# Alterar autor do commit de um repositório inteiro

## Cuidados antes de seguir o passo a passo

- Este processo foi testado no **Windows** e no **Mac**, mas acredito que também funciona no **Linux**
- Se estiver no **Windows**, aconselho que use o **powershell** e em modo de **administrador**
- O script altera somente os commits que possuem o email preenchido em OLD_EMAIL, portanto se seu repositório tiver commits de mais usuários estes não serão alterados
- Você pode rodar o script quantas vezes quiser
- Se está em um projeto com mais pessoas, **avise-os** de que este processo está sendo feito.

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
OLD_EMAIL="preencha-o-email-que-deseja-alterar-aqui@exemplo.com"
CORRECT_NAME="coloque-seu-usuario-correto"
CORRECT_EMAIL="coloque-seu-email-correto@exemplo.com"
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
