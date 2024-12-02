#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[1;36m'
BOLD='\033[1m'
ITALIC='\033[3m'
RESET='\033[0m'

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ""
echo -e "${BOLD}${CYAN}Aeedo-Connect Setup${RESET}"

echo ""
echo -e "${YELLOW}Como deseja rodar o projeto?${RESET}"
echo -e "1) ${BLUE}Na máquina${RESET} ${ITALIC}(instalando dependências localmente)${RESET}"
echo -e "2) ${BLUE}Usando Docker${RESET} ${ITALIC}(Dockerfile) ${BOLD}recomendado*${RESET}"
echo ""
read -rp "Escolha sua opção (1, 2): " executionChoice

case $executionChoice in
  1)
    bash "$BASE_DIR/scripts/setup-with-local.sh"
    ;;
  2)
    bash "$BASE_DIR/scripts/setup-with-docker.sh"
    ;;
  *)
    echo -e "${RED}Opção inválida. Encerrando o setup.${RESET}"
    exit 1
    ;;
esac
