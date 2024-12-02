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
echo -e "${BOLD}${CYAN}Aeedo-Connect Setup Local${RESET}"

echo ""
echo -e "${YELLOW}Qual gerenciador de pacotes deseja usar para instalar as dependências?${RESET}"
echo -e "1) ${BLUE}npm${RESET}"
echo -e "2) ${BLUE}yarn${RESET}"
echo -e "3) ${BLUE}pnpm${RESET}"
echo ""
read -rp "Escolha sua opção (1, 2, 3): " packageManager

case $packageManager in
  1)
    packageCommand="npm install"
    buildCommand="npm run build"
    runCommand="npm run start"
    ;;
  2)
    packageCommand="yarn"
    buildCommand="yarn build"
    runCommand="yarn start"
    ;;
  3)
    packageCommand="pnpm install"
    buildCommand="pnpm build"
    runCommand="pnpm start"
    ;;
  *)
    echo -e "${RED}Opção inválida. Encerrando o setup.${RESET}"
    exit 1
    ;;
esac

if [ -d "apps" ]; then
  echo -e "${YELLOW}A pasta 'apps' já existe. Deseja removê-la e começar do zero? (s/n)${RESET}"
  read -rp "Sua escolha: " removeApps

  if [[ $removeApps == "s" || $removeApps == "S" ]]; then
    echo -e "${CYAN}Removendo a pasta 'apps'...${RESET}"
    rm -rf apps || { echo -e "${RED}Erro ao remover a pasta 'apps'. Encerrando.${RESET}"; exit 1; }
  else
    echo -e "${RED}Ação cancelada pelo usuário. Encerrando.${RESET}"
    exit 1
  fi
fi

mkdir -p apps || { echo -e "${RED}Erro ao criar a pasta 'apps'. Encerrando.${RESET}"; exit 1; }
cd apps || exit

repos=(
  "git@github.com:segabrielcarvalho/aeedo-connect-api.git"
  "git@github.com:segabrielcarvalho/aeedo-connect-web.git"
  "git@github.com:segabrielcarvalho/aeedo-connect-doc.git"
  "git@github.com:segabrielcarvalho/aeedo-connect-admin.git"
)

echo -e "${CYAN}Clonando os repositórios...${RESET}"
for repo in "${repos[@]}"; do
  echo -e "${YELLOW}Clonando ${repo}...${RESET}"
  git clone "$repo" || { echo -e "${RED}Erro ao clonar ${repo}. Verifique sua conexão ou permissões do Git.${RESET}"; exit 1; }
done

apps=(
  "aeedo-connect-api"
  "aeedo-connect-web"
  "aeedo-connect-doc"
  "aeedo-connect-admin"
)

envExamples=(
  "../../envs/.env.api.example"
  "../../envs/.env.web.example"
  "../../envs/.env.doc.example"
  "../../envs/.env.admin.example"
)

if [ -z "$PORT_API" ] || [ -z "$PORT_WEB" ] || [ -z "$PORT_DOC" ] || [ -z "$PORT_ADMIN" ]; then
  echo -e "${RED}Erro: Certifique-se de que as variáveis PORT_API, PORT_WEB, PORT_DOC, e PORT_ADMIN estejam definidas no arquivo .env.${RESET}"
  exit 1
fi

for i in "${!apps[@]}"; do
  app="${apps[i]}"
  env="${envExamples[i]}"

  echo -e "${YELLOW}Configurando ${app}...${RESET}"

  cd "$app" || exit

  if [ "$app" = "aeedo-connect-api" ]; then
    cp "$env" .env || { echo -e "${RED}Erro ao copiar o arquivo .env para ${app}.${RESET}"; exit 1; }
    echo -e "${GREEN}.env configurado para ${app}.${RESET}"
  else
    cp "$env" .env.local || { echo -e "${RED}Erro ao copiar o arquivo .env.local para ${app}.${RESET}"; exit 1; }
    echo -e "${GREEN}.env.local configurado para ${app}.${RESET}"
  fi

  echo -e "${CYAN}Instalando dependências para ${app}...${RESET}"
  $packageCommand || { echo -e "${RED}Erro ao instalar dependências para ${app}. Verifique o gerenciador de pacotes.${RESET}"; exit 1; }

  if [ "$app" = "aeedo-connect-api" ]; then
    echo -e "${CYAN}Configurando e iniciando o Laravel para ${app}...${RESET}"
    if ! command -v composer &> /dev/null; then
      echo -e "${RED}Composer não encontrado. Instale o Composer para continuar.${RESET}"
      exit 1
    fi
    composer install || { echo -e "${RED}Erro ao instalar dependências do Composer.${RESET}"; exit 1; }
    php artisan key:generate || { echo -e "${RED}Erro ao gerar chave do Laravel.${RESET}"; exit 1; }
    php artisan migrate --force || { echo -e "${RED}Erro ao executar migrações do Laravel.${RESET}"; exit 1; }
    php artisan serve --host=0.0.0.0 --port="${PORT_API}" > laravel.log 2>&1 &
  else
    echo -e "${CYAN}Construindo e iniciando o ${app}...${RESET}"
    $buildCommand || { echo -e "${RED}Erro ao construir o ${app}.${RESET}"; exit 1; }
    $runCommand > nextjs_${app}.log 2>&1 &
  fi

  cd ..
done

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
echo -e "${BOLD}${GREEN}Setup local concluído com sucesso! 🚀${RESET}"
