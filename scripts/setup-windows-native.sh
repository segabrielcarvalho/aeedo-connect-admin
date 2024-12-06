# Requires -Version 5.1

$RED = "`e[0;31m"
$GREEN = "`e[0;32m"
$YELLOW = "`e[1;33m"
$BLUE = "`e[1;34m"
$CYAN = "`e[1;36m"
$BOLD = "`e[1m"
$RESET = "`e[0m"

Write-Host ""
Write-Host "${BOLD}${CYAN}Aeedo-Connect Setup (Windows)${RESET}"

$dependencies = @("git")
foreach ($dep in $dependencies) {
    if (-not (Get-Command $dep -ErrorAction SilentlyContinue)) {
        Write-Host "${RED}Dependência '$dep' não encontrada. Por favor, instale '$dep' e tente novamente.${RESET}"
        exit 1
    }
}

Write-Host ""
Write-Host "${YELLOW}Qual gerenciador de pacotes deseja usar para instalar as dependências?${RESET}"
Write-Host "1) ${BLUE}npm${RESET}"
Write-Host "2) ${BLUE}yarn${RESET}"
Write-Host "3) ${BLUE}pnpm${RESET}"
Write-Host ""

$packageManager = Read-Host "Escolha sua opção (1, 2, 3)"

switch ($packageManager) {
    "1" {
        $packageCommand = "npm install"
    }
    "2" {
        $packageCommand = "yarn"
    }
    "3" {
        $packageCommand = "pnpm install"
    }
    default {
        Write-Host "${RED}Opção inválida. Encerrando o setup.${RESET}"
        exit 1
    }
}

# Checar se o gerenciador de pacotes está disponível
$pkgCmdParts = $packageCommand.Split(" ")
if (-not (Get-Command $pkgCmdParts[0] -ErrorAction SilentlyContinue)) {
    Write-Host "${RED}Gerenciador de pacotes '$($pkgCmdParts[0])' não encontrado. Por favor, instale-o antes de continuar.${RESET}"
    exit 1
}

# Verificar se a pasta apps existe
if (Test-Path "apps") {
    Write-Host "${YELLOW}A pasta 'apps' já existe. Deseja removê-la e começar do zero? (s/n)${RESET}"
    $removeApps = Read-Host "Sua escolha"
    if ($removeApps -match '^[sS]$') {
        Write-Host "${CYAN}Removendo a pasta 'apps'...${RESET}"
        Remove-Item -Recurse -Force "apps" -ErrorAction Stop
    } else {
        Write-Host "${YELLOW}Continuando com a pasta 'apps' existente.${RESET}"
    }
}

New-Item -ItemType Directory -Force -Name "apps" | Out-Null
Set-Location "apps"

$repos = @(
  "git@github.com:segabrielcarvalho/aeedo-connect-api.git",
  "git@github.com:segabrielcarvalho/aeedo-connect-web.git",
  "git@github.com:segabrielcarvalho/aeedo-connect-doc.git",
  "git@github.com:segabrielcarvalho/aeedo-connect-admin.git"
)

Write-Host "${CYAN}Clonando os repositórios...${RESET}"
foreach ($repo in $repos) {
    $repo_name = [System.IO.Path]::GetFileNameWithoutExtension($repo)
    if (-not (Test-Path $repo_name)) {
        Write-Host "${YELLOW}Clonando $repo...${RESET}"
        git clone $repo
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao clonar $repo. Verifique sua conexão ou permissões do Git.${RESET}"
            exit 1
        }
    } else {
        Write-Host "${GREEN}Repositório $repo_name já existe. Pulando clonagem.${RESET}"
    }
}

$apps = @("aeedo-connect-api", "aeedo-connect-web", "aeedo-connect-doc", "aeedo-connect-admin")
$envExamples = @(
  "../../envs/.env.api.example",
  "../../envs/.env.web.example",
  "../../envs/.env.doc.example",
  "../../envs/.env.admin.example"
)

function Is-Port-In-Use {
    param($Port)
    $test = Test-NetConnection -Port $Port -ComputerName 'localhost'
    return ($test.TcpTestSucceeded -eq $true)
}

$APP_PORTS = New-Object System.Collections.ArrayList

for ($i = 0; $i -lt $apps.Count; $i++) {
    $app = $apps[$i]
    $env = $envExamples[$i]

    Write-Host "${YELLOW}Configurando $app...${RESET}"

    Set-Location $app

    if ($app -eq "aeedo-connect-api") {
        # Checar Docker
        if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
            Write-Host "${RED}Docker não encontrado. Instale o Docker para continuar.${RESET}"
            exit 1
        }

        if (-not (Test-Path ".env")) {
            Copy-Item $env ".env"
            if ($LASTEXITCODE -ne 0) {
                Write-Host "${RED}Erro ao copiar o arquivo .env para $app.${RESET}"
                exit 1
            }
            Write-Host "${GREEN}.env configurado para $app.${RESET}"
        } else {
            Write-Host "${YELLOW}Arquivo .env já existe para $app. Deseja sobrescrevê-lo? (s/n)${RESET}"
            $overwriteEnv = Read-Host "Sua escolha"
            if ($overwriteEnv -match '^[sS]$') {
                Copy-Item $env ".env" -Force
                if ($LASTEXITCODE -ne 0) {
                    Write-Host "${RED}Erro ao copiar o arquivo .env para $app.${RESET}"
                    exit 1
                }
                Write-Host "${GREEN}.env sobrescrito para $app.${RESET}"
            } else {
                Write-Host "${YELLOW}Mantendo o arquivo .env existente para $app.${RESET}"
            }
        }

        if (-not (Test-Path ".env")) {
            Write-Host "${RED}Erro: Arquivo .env não encontrado para $app.${RESET}"
            exit 1
        }

        $APP_PORT = (Get-Content ".env" | Where-Object {$_ -match "^APP_PORT="}) -replace "APP_PORT=", ""

        if ([string]::IsNullOrEmpty($APP_PORT)) {
            Write-Host "${RED}Erro: Variável APP_PORT não encontrada no arquivo .env de $app.${RESET}"
            exit 1
        }

        if (Is-Port-In-Use $APP_PORT) {
            Write-Host "${RED}A porta $APP_PORT já está em uso. Por favor, libere a porta ou altere a configuração.${RESET}"
            exit 1
        }

        Write-Host "${CYAN}Atualizando docker-compose.yml para mapear a porta $APP_PORT...${RESET}"
        $dockerComposeContent = (Get-Content "docker-compose.yml") -replace "80:80","$APP_PORT:80"
        $dockerComposeContent | Set-Content "docker-compose.yml"

        Write-Host "${CYAN}Instalando dependências do Composer via Docker...${RESET}"
        docker run --rm -u "$(id -u):$(id -g)" -v (Get-Location):/var/www/html -w /var/www/html laravelsail/php84-composer:latest composer install --ignore-platform-reqs
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao instalar dependências do Composer.${RESET}"
            exit 1
        }

        # Dar permissão de execução (no Windows isso pode ser ignorado)
        # No Windows não é necessário chmod
        # sail down -v
        Write-Host "${CYAN}Parando e removendo containers e volumes existentes...${RESET}"
        .\vendor\bin\sail down -v

        Write-Host "${CYAN}Iniciando os containers com o Sail...${RESET}"
        .\vendor\bin\sail up -d
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao iniciar os containers com o Sail.${RESET}"
            exit 1
        }

        Write-Host "${CYAN}Aguardando o banco de dados estar pronto...${RESET}"
        $MAX_RETRIES = 60
        $RETRIES = 0
        $DB_HOST = (Get-Content ".env" | Where-Object {$_ -match "^DB_HOST="}) -replace "DB_HOST=", ""
        $DB_USERNAME = (Get-Content ".env" | Where-Object {$_ -match "^DB_USERNAME="}) -replace "DB_USERNAME=", ""
        $DB_PASSWORD = (Get-Content ".env" | Where-Object {$_ -match "^DB_PASSWORD="}) -replace "DB_PASSWORD=", ""

        while ($true) {
            docker exec mysql mysqladmin ping -h "$DB_HOST" -u "$DB_USERNAME" --password="$DB_PASSWORD" --silent
            if ($LASTEXITCODE -eq 0) {
                break
            }
            $RETRIES++
            if ($RETRIES -ge $MAX_RETRIES) {
                Write-Host "${RED}Banco de dados não ficou pronto a tempo. Verifique a configuração e tente novamente.${RESET}"
                exit 1
            }
            Write-Host "${YELLOW}Banco de dados ainda não está pronto. Tentativa $RETRIES/$MAX_RETRIES...${RESET}"
            Start-Sleep -Seconds 2
        }

        Write-Host "${GREEN}Banco de dados está pronto! Continuando...${RESET}"
        Write-Host "${CYAN}Limpando cache de configuração e aplicação...${RESET}"
        .\vendor\bin\sail artisan config:clear
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao limpar cache de configuração.${RESET}"
            exit 1
        }

        .\vendor\bin\sail artisan cache:clear
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao limpar cache de aplicação.${RESET}"
            exit 1
        }

        Write-Host "${CYAN}Executando migrações...${RESET}"
        .\vendor\bin\sail artisan migrate --force
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao executar migrações.${RESET}"
            exit 1
        }

        Write-Host "${CYAN}Executando seeders...${RESET}"
        .\vendor\bin\sail artisan db:seed --force
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao executar seeders.${RESET}"
            exit 1
        }

        $APP_PORTS.Add("$app|$APP_PORT") | Out-Null

    } else {
        if (-not (Test-Path ".env.local")) {
            Copy-Item $env ".env.local"
            if ($LASTEXITCODE -ne 0) {
                Write-Host "${RED}Erro ao copiar o arquivo .env.local para $app.${RESET}"
                exit 1
            }
            Write-Host "${GREEN}.env.local configurado para $app.${RESET}"
        } else {
            Write-Host "${GREEN}Arquivo .env.local já existe para $app. Pulando cópia.${RESET}"
        }

        $APP_PORT = (Get-Content ".env.local" | Where-Object {$_ -match "^PORT="}) -replace "PORT=", ""
        
        if ([string]::IsNullOrEmpty($APP_PORT)) {
            Write-Host "${RED}Erro: Variável PORT não encontrada no arquivo .env.local de $app.${RESET}"
            exit 1
        }

        if (Is-Port-In-Use $APP_PORT) {
            Write-Host "${RED}A porta $APP_PORT já está em uso. Por favor, libere a porta ou altere a configuração.${RESET}"
            exit 1
        }

        Write-Host "${CYAN}Instalando dependências para $app...${RESET}"
        cmd /c $packageCommand
        if ($LASTEXITCODE -ne 0) {
            Write-Host "${RED}Erro ao instalar dependências para $app. Verifique o gerenciador de pacotes.${RESET}"
            exit 1
        }

        $APP_PORTS.Add("$app|$APP_PORT") | Out-Null
    }

    Set-Location ..
}

Write-Host ""
Write-Host "${GREEN}Serviços iniciados com sucesso! Acesse os serviços abaixo:${RESET}"

foreach ($entry in $APP_PORTS) {
    $parts = $entry.Split("|")
    $app_name = $parts[0]
    $app_port_num = $parts[1]

    switch ($app_name) {
        "aeedo-connect-web" {
            Write-Host "🌐 ${CYAN}Web:${RESET} http://localhost:$app_port_num"
        }
        "aeedo-connect-doc" {
            Write-Host "📄 ${CYAN}Documentação:${RESET} http://localhost:$app_port_num"
        }
        "aeedo-connect-admin" {
            Write-Host "🛠️ ${CYAN}Admin:${RESET} http://localhost:$app_port_num"
        }
        "aeedo-connect-api" {
            Write-Host "⚙️ ${CYAN}API:${RESET} http://localhost:$app_port_num"
        }
        default {
            Write-Host "${CYAN}$app_name:${RESET} http://localhost:$app_port_num"
        }
    }
}

Write-Host ""
Write-Host "${BOLD}${GREEN}Setup local concluído com sucesso! 🚀${RESET}"
