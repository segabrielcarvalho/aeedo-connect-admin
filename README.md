# Projeto Aeedo-Connect - Guia de Setup

Bem-vindo ao projeto Aeedo-Connect! Este guia irá orientá-lo na configuração do ambiente de desenvolvimento para os quatro principais componentes: API, Web, Documentação e Admin. O processo é facilitado por scripts automatizados para simplificar sua configuração.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- [Git](https://git-scm.com/downloads)
- **Para Setup Local:**
  - [Node.js](https://nodejs.org/) com gerenciadores como `npm`, `yarn` ou `pnpm`
  - [Composer](https://getcomposer.org/) para o Laravel
  - Banco de dados compatível com o Laravel (MySQL ou outro configurado no `.env.api`)
- **Para Setup com Docker:**
  - [Docker](https://docs.docker.com/get-docker/)
  - [Docker Compose](https://docs.docker.com/compose/install/)

---

## Passo a Passo de Configuração

### 1. Clone o Repositório Principal

Primeiro, clone este repositório principal que contém os scripts de configuração e os arquivos necessários:
```bash
  git clone https://github.com/segabrielcarvalho/aeedo-connect.git
  cd aeedo-connect
```

### 2. Arquivos de Variáveis de Ambiente

Verifique a pasta `envs/` para garantir que os arquivos `.env.example` estejam disponíveis. Estes arquivos são usados para configurar as variáveis de ambiente dos componentes do projeto:

- `.env.example` - Arquivo base para o projeto principal.
- `.env.api.example` - Configuração para a API.
- `.env.web.example` - Configuração para o front-end Web.
- `.env.doc.example` - Configuração para a documentação.
- `.env.admin.example` - Configuração para o Admin.

### 3. Executando o Script de Setup

Para configurar o ambiente, rode o seguinte comando:
```bash
  bash ./scripts/setup.sh
```

Este script irá perguntar se você deseja configurar o ambiente localmente ou utilizando Docker e, em seguida, direcionará para o script apropriado (`setup-with-local.sh` ou `setup-with-docker.sh`).

### 4. Acessando os Serviços

Após a execução dos scripts, você poderá acessar cada componente pelos endereços configurados no arquivo `.env`:

- **Web**: Interface do usuário (`http://localhost:<PORT_WEB>`).
- **Documentação**: Documentação do projeto (`http://localhost:<PORT_DOC>`).
- **Admin**: Interface administrativa (`http://localhost:<PORT_ADMIN>`).
- **API**: Back-end (`http://localhost:<PORT_API>`).

---

## Estrutura do Projeto

- **envs/**: Arquivos de configuração para variáveis de ambiente.
- **scripts/**: Contém scripts para automatizar o setup inicial (`setup-with-local.sh`, `setup-with-docker.sh`, e `setup.sh`).
- **apps/**: Diretório criado pelo script, que conterá os repositórios dos componentes clonados.

---

## Problemas Comuns

- **Permissão negada para executar o script**:
  Caso receba um erro de permissão, execute o comando abaixo antes de executar o script:
  ```bash
  chmod +x ./scripts/setup-with-*.sh
  ```

- **Portas em Uso**:
  Caso alguma das portas configuradas no `.env` já esteja em uso, altere a porta correspondente antes de rodar o setup.

- **Docker não encontrado**:
  Certifique-se de que o Docker e Docker Compose estão instalados e configurados no seu PATH.

---

## Conclusão

Depois de seguir todos os passos acima, seu ambiente de desenvolvimento estará configurado e pronto para o trabalho! Caso encontre algum problema ou tenha alguma dúvida, sinta-se à vontade para abrir uma issue no repositório correspondente.

Aproveite o desenvolvimento! 🚀

