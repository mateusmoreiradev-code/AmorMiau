# AmorMiau

Aplicação para conectar pessoas e animais para adoção. O repositório contém o frontend React/Vite em `frontend/`, uma API Node.js em `backend/` e a configuração de banco PostgreSQL com Prisma.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm
- Docker Desktop (para usar o PostgreSQL local)

## Começar

Execute os comandos na pasta do projeto (a pasta que contém este README):

```sh
npm install
docker compose up -d
npm run dev
```

Antes de iniciar, copie `.env.example` para `.env` (PowerShell: `Copy-Item .env.example .env`; bash: `cp .env.example .env`).

O frontend fica em `http://localhost:5173` e a API em `http://localhost:3001`. O endpoint `GET /api/health` confirma que a API está ativa. Chamadas do frontend para `/api` são encaminhadas pelo Vite. O código das telas e estilos fica em `frontend/src`; arquivos estáticos ficam em `frontend/public`.

## Comandos

- `npm run dev`: inicia frontend e API em desenvolvimento.
- `npm run dev:frontend`: inicia somente o Vite.
- `npm run dev:backend`: inicia somente a API com reinício automático.
- `npm run build`: gera a versão de produção do frontend.
- `npm run lint`: verifica o código do frontend.
- `npm run prisma:generate`: gera o Prisma Client.
- `npm run prisma:migrate`: cria/aplica migrações no banco local.

## Banco de dados

O schema e as tabelas, colunas e enumerações do PostgreSQL usam nomes em português. O modelo inicial cobre:

- `Usuario` e `SessaoAutenticacao`: contas, hash da senha, perfis de adotante/ONG/admin e sessões revogáveis.
- `Animal`, `Etiqueta` e `AnimalEtiqueta`: cadastro dos animais e relação muitos-para-muitos para tags.
- `Adocao`: solicitações com situação, solicitante, avaliador, mensagem, observações e datas do processo.

A migração inicial está em `prisma/migrations/20261109000000_base`. Com o PostgreSQL iniciado e `.env` configurado, `npm run prisma:migrate` aplica a estrutura. A API ainda não implementa endpoints de login ou de gestão de adoções; o schema fornece a base para essas rotas. As senhas devem ser armazenadas somente como hash.
