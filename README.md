# Projeto Aeedo-Connect - Guia de Setup

Bem-vindo ao projeto Aeedo-Connect! Este guia irá orientá-lo na configuração do ambiente de desenvolvimento para os quatro principais componentes: **API**, **Web**, **Documentação** e **Admin**. O processo é facilitado por scripts automatizados para simplificar sua configuração.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- [Git](https://git-scm.com/downloads)

**Para Setup Local:**
- [Node.js](https://nodejs.org/) com `npm`, `yarn` ou `pnpm`
- [Composer](https://getcomposer.org/) para o Laravel
- Banco de dados compatível com Laravel (MySQL ou outro definido no `.env.api`)

**Para Setup com Docker:**
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Passos Iniciais (Comuns a Todas as Plataformas)

1. **Clone o repositório principal**:
   ```bash
   git clone https://github.com/segabrielcarvalho/aeedo-connect.git
   cd aeedo-connect
   ```

2. **Verifique os arquivos de variáveis de ambiente**:
   - Acesse a pasta `envs/` e confira a existência dos arquivos `.env.example` e `.env.*.example`.
   - Esses arquivos servirão de base para configurar variáveis de ambiente dos componentes (API, Web, Doc, Admin).

---

## Configuração no Linux/macOS

### 1. Executando o Script de Setup

No Linux ou macOS, você pode rodar o script principal usando o Bash:

```bash
bash ./scripts/setup.sh
```

Este script irá perguntar em qual plataforma você deseja rodar (Linux, macOS, Windows nativo), e qual gerenciador de pacotes deseja usar. Após isso, fará todo o procedimento de clonagem, instalação de dependências e inicialização dos serviços.

### 2. Após a Execução

Ao final, o script exibira as URLs para acessar a Web, Documentação, Admin e API, de acordo com as portas definidas no `.env`.

---

## Configuração no Windows (Nativo)

### 1. Habilitar Execução de Scripts PowerShell

Por padrão, o Windows bloqueia a execução de scripts PowerShell não assinados. Para habilitá-los:

1. Abra o **PowerShell** ou o **Windows Terminal** como administrador.
2. Rode o comando:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   - Digite "S" para confirmar.

### 2. Executando o Script de Setup no Windows

Navegue até a pasta do projeto no PowerShell e execute o script nativo do Windows:

```powershell
cd caminho\para\aeedo-connect
.\scripts\setup-windows-native.ps1
```

Este script fará perguntas semelhantes às do Linux/macOS, clonará os repositórios, instalará as dependências e iniciará os serviços localmente no Windows. Ao finalizar, exibira os endereços de acesso para cada serviço.

---

## Acessando os Serviços

Após a execução (seja no Linux, macOS ou Windows), os serviços estarão disponíveis nas URLs configuradas nos `.env`:

- **Web**: `http://localhost:<PORT_WEB>`
- **Documentação**: `http://localhost:<PORT_DOC>`
- **Admin**: `http://localhost:<PORT_ADMIN>`
- **API**: `http://localhost:<PORT_API>`

---

## Estrutura do Projeto

- **envs/**: Arquivos de configuração para variáveis de ambiente.
- **scripts/**: Contém scripts para automatizar o setup inicial.
- **apps/**: Diretório que será criado pelo script, contendo os repositórios dos componentes clonados.

---

## Problemas Comuns

- **Permissão negada para executar o script (Linux/macOS)**:
  Se receber um erro de permissão, rode:
  ```bash
  chmod +x ./scripts/setup-with-*.sh
  ```
  e então repita o comando de execução.

- **Portas em uso**:
  Se alguma porta já estiver ocupada, ajuste o `.env` correspondente antes de rodar o setup novamente.

- **Docker não encontrado**:
  Certifique-se de que Docker e Docker Compose estão instalados e no PATH do seu sistema.

---

## Conclusão

Seguindo os passos acima, seu ambiente de desenvolvimento estará pronto para uso tanto em Linux/macOS quanto em Windows. Em caso de problemas, abra uma issue no repositório do componente correspondente.

Bom desenvolvimento! 🚀