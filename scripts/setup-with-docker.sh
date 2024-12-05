#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[1;36m'
BOLD='\033[1m'
ITALIC='\033[3m'
RESET='\033[0m'

if [ -z "$BASH_VERSION" ]; then
  echo -e "${RED}Este script deve ser executado em um ambiente Bash.${RESET}"
  exit 1
fi

echo ""
echo -e "${BOLD}${CYAN}Aeedo-Connect Docker Setup${RESET}"

DEPENDENCIES=(git docker docker-compose)
for dep in "${DEPENDENCIES[@]}"; do
  if ! command -v $dep &> /dev/null; then
    echo -e "${RED}Dependência '${dep}' não encontrada. Por favor, instale '${dep}' e tente novamente.${RESET}"
    exit 1
  fi
done

if [ ! -f .env ]; then
  echo -e "${RED}🚨 Arquivo .env não encontrado na raiz do projeto. Certifique-se de configurá-lo antes de continuar.${RESET}"
  exit 1
fi

echo -e "${CYAN}Carregando variáveis de ambiente do .env...${RESET}"
set -a
source .env
set +a

profiles=()

if [ "$START_API" = "true" ]; then
  profiles+=("api")
fi

if [ "$START_WEB" = "true" ]; then
  profiles+=("web")
fi

if [ "$START_DOC" = "true" ]; then
  profiles+=("doc")
fi

if [ "$START_ADMIN" = "true" ]; then
  profiles+=("admin")
fi

profile_args=""
for profile in "${profiles[@]}"; do
  profile_args+="--profile $profile "
done

if [ ! -d "apps" ]; then
  mkdir -p apps || { echo -e "${RED}Erro ao criar a pasta 'apps'. Encerrando.${RESET}"; exit 1; }
fi

cd apps || exit 1

echo -e "${CYAN}Clonando os repositórios...${RESET}"
repos=(
  "git@github.com:segabrielcarvalho/aeedo-connect-api.git"
  "git@github.com:segabrielcarvalho/aeedo-connect-web.git"
  "git@github.com:segabrielcarvalho/aeedo-connect-doc.git"
  "git@github.com:segabrielcarvalho/aeedo-connect-admin.git"
)

for repo in "${repos[@]}"; do
  repo_name=$(basename "$repo" .git)
  if [ ! -d "$repo_name" ]; then
    echo -e "${YELLOW}Clonando ${repo}...${RESET}"
    git clone "$repo" || { echo -e "${RED}Erro ao clonar ${repo}. Verifique sua conexão ou permissões do Git.${RESET}"; exit 1; }
  else
    echo -e "${GREEN}Repositório ${repo_name} já existe. Pulando clonagem.${RESET}"
  fi
done

apps=(
  "aeedo-connect-api"
  "aeedo-connect-web"
  "aeedo-connect-doc"
  "aeedo-connect-admin"
)

envExamples=(
  "../envs/.env.api.example"
  "../envs/.env.web.example"
  "../envs/.env.doc.example"
  "../envs/.env.admin.example"
)

for i in "${!apps[@]}"; do
  app="${apps[i]}"
  env="${envExamples[i]}"

  echo -e "${YELLOW}Configurando ${app}...${RESET}"

  cd "$app" || exit 1

  if [ "$app" = "aeedo-connect-api" ]; then
    if [ ! -f .env ]; then
      cp "$env" .env || { echo -e "${RED}Erro ao copiar o arquivo .env para ${app}.${RESET}"; exit 1; }
      echo -e "${GREEN}.env configurado para ${app}.${RESET}"
    else
      echo -e "${GREEN}Arquivo .env já existe para ${app}. Pulando cópia.${RESET}"
    fi

    echo -e "${CYAN}Instalando dependências do Composer via Docker...${RESET}"
    docker run --rm \
      -u "$(id -u):$(id -g)" \
      -v "$(pwd):/var/www/html" \
      -w /var/www/html \
      laravelsail/php82-composer:latest \
      composer install --ignore-platform-reqs || { echo -e "${RED}Erro ao instalar dependências do Composer.${RESET}"; exit 1; }

  else
    if [ ! -f .env.local ]; then
      cp "$env" .env.local || { echo -e "${RED}Erro ao copiar o arquivo .env.local para ${app}.${RESET}"; exit 1; }
      echo -e "${GREEN}.env.local configurado para ${app}.${RESET}"
    else
      echo -e "${GREEN}Arquivo .env.local já existe para ${app}. Pulando cópia.${RESET}"
    fi
  fi

  cd ..
done

cd ..

if [ ${#profiles[@]} -eq 0 ]; then
  echo -e "${RED}🚨 Nenhum perfil habilitado no .env. Apenas serviços fora de perfis serão iniciados.${RESET}"
else
  echo -e "${CYAN}🚀 Iniciando o Docker Compose com os perfis: ${profiles[*]}...${RESET}"
fi

docker-compose $profile_args up --build -d || { echo -e "${RED}Erro ao iniciar os containers com o Docker Compose.${RESET}"; exit 1; }

if [ "$START_API" = "true" ]; then
  echo -e "${CYAN}Aguardando o serviço da API iniciar...${RESET}"
  sleep 15 

  echo -e "${CYAN}Executando migrações e seeders para a API...${RESET}"
  docker-compose exec api sail artisan migrate || { echo -e "${RED}Erro ao executar migrações.${RESET}"; exit 1; }
  docker-compose exec api sail artisan db:seed || { echo -e "${RED}Erro ao executar seeders.${RESET}"; exit 1; }
fi

echo ""
echo -e "${GREEN}Serviços iniciados com sucesso! Acesse os serviços abaixo:${RESET}"
if [ "$START_WEB" = "true" ]; then
  echo -e "🌐 ${CYAN}Web:${RESET} http://localhost:${PORT_WEB}"
fi
if [ "$START_DOC" = "true" ]; then
  echo -e "📄 ${CYAN}Documentação:${RESET} http://localhost:${PORT_DOC}"
fi
if [ "$START_ADMIN" = "true" ]; then
  echo -e "🛠️ ${CYAN}Admin:${RESET} http://localhost:${PORT_ADMIN}"
fi
if [ "$START_API" = "true" ]; then
  echo -e "⚙️ ${CYAN}API:${RESET} http://localhost:${PORT_API}"
fi

echo ""
echo -e "${BOLD}${GREEN}Setup com Docker concluído com sucesso! 🚀${RESET}"
