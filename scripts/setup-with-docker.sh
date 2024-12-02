#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[1;36m'
BOLD='\033[1m'
ITALIC='\033[3m'
RESET='\033[0m'

echo ""
echo -e "${BOLD}${CYAN}Aeedo-Connect Docker Setup${RESET}"

if ! command -v docker &> /dev/null; then
  echo -e "${RED}🚨 Docker não encontrado. Instale o Docker para continuar.${RESET}"
  exit 1
fi

if ! command -v docker-compose &> /dev/null; then
  echo -e "${RED}🚨 Docker Compose não encontrado. Instale o Docker Compose para continuar.${RESET}"
  exit 1
fi

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

cd apps || exit

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

cd .. || exit

if [ ${#profiles[@]} -eq 0 ]; then
  echo -e "${RED}🚨 Nenhum perfil habilitado no .env. Apenas serviços fora de perfis serão iniciados.${RESET}"
else
  echo -e "${CYAN}🚀 Iniciando o Docker Compose com os perfis: ${profiles[*]}...${RESET}"
fi

docker-compose $profile_args up --build -d || { echo -e "${RED}Erro ao iniciar os containers com o Docker Compose.${RESET}"; exit 1; }

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
