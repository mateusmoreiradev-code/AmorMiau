# AmorMiau

Site para divulgar gatos para adoção, eventos, formas de doação e pet sitters, com um painel administrativo para os donos do site cadastrarem tudo.

- **Frontend:** React 19 + Vite, em `frontend/`
- **API:** Node.js + Express 5, em `backend/`
- **Banco:** PostgreSQL (via Docker) com Prisma 7

## O que você precisa instalar

| Programa | Versão | Para quê |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | 20.19+ ou 22.12+ (testado no 26) | rodar o site e a API |
| npm | vem com o Node | instalar as dependências |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | qualquer recente | rodar o PostgreSQL |
| Git | opcional | baixar o projeto |

> Já tem um PostgreSQL instalado? Pode pular o Docker e só ajustar o `DATABASE_URL` no `.env`.

## Rodar pela primeira vez

Todos os comandos são executados **na pasta que contém este README** (`AmorMiau/AmorMiau`).

**1. Instale as dependências**

```sh
npm install
```

**2. Crie o arquivo `.env`** copiando o exemplo:

```sh
# PowerShell
Copy-Item .env.example .env
# bash / macOS / Linux
cp .env.example .env
```

Abra o `.env` e troque **`ADMIN_EMAIL`** e **`ADMIN_SENHA`** (mínimo 8 caracteres). Esse será o login do painel. O `.env` não vai para o git.

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `API_PORT` | `3001` | porta da API |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | endereço do site (liberado no CORS) |
| `DATABASE_URL` | `postgresql://postgres:root@localhost:5432/amormiau?schema=public` | conexão com o banco (já bate com o `docker-compose.yml`) |
| `ADMIN_NOME`, `ADMIN_EMAIL`, `ADMIN_SENHA` | — | administrador criado pelo `npm run seed` |

**3. Suba o banco de dados** (com o Docker Desktop aberto):

```sh
docker compose up -d
```

**4. Crie as tabelas**

```sh
npm run prisma:migrate
```

**5. Crie o administrador**

```sh
npm run seed
```

**6. (Opcional) Cadastre os dados de exemplo:** 9 gatos, 5 eventos, 5 formas de doação, 4 pet sitters e o texto do "Sobre nós", todos com ilustrações.

```sh
npm run exemplos
```

**7. Inicie o site e a API**

```sh
npm run dev
```

Pronto:

- **Site:** http://localhost:5173
- **Painel administrativo:** http://localhost:5173/admin (entre com o `ADMIN_EMAIL` / `ADMIN_SENHA` do `.env`)
- **API:** http://localhost:3001 (`/api/health` responde `{"status":"ok"}`)

## No dia a dia

```sh
docker compose up -d   # se o banco não estiver rodando
npm run dev
```

Para parar: `Ctrl + C` no terminal do `npm run dev` e, se quiser, `docker compose down` (os dados continuam salvos no volume do Docker).

## Painel administrativo

Fica em `/admin` e não aparece no menu do site. Só usuários administradores entram, e não existe cadastro público de contas.

| Aba | O que dá para fazer |
| --- | --- |
| Animais | cadastrar gatos com foto, idade, características e situação. Só **Disponível** e **Reservado** aparecem na vitrine; **Rascunho**, **Adotado** e **Arquivado** ficam só no painel. |
| Eventos | data, horário, local, imagem e link de inscrição (se houver, aparece o botão "Participar"). A página pública mostra só os próximos eventos publicados. |
| Doações | Pix (com botão "Copiar chave"), dados bancários, itens, apadrinhamento etc., com ordem de exibição. |
| Pet sitters | contato de WhatsApp (com DDI 55), cidade, região, foto e descrição. |
| Sobre nós | título, subtítulo, imagem e texto da página. Uma linha em branco separa os parágrafos. |

As fotos enviadas pelo painel ficam em `backend/uploads/` (fora do git). Aceita JPG, PNG, WEBP e GIF de até 5 MB.

**Dar acesso a outra pessoa:** troque `ADMIN_NOME`, `ADMIN_EMAIL` e `ADMIN_SENHA` no `.env` e rode `npm run seed` de novo. Cada e-mail novo vira mais um administrador. Rodar com um e-mail que já existe redefine a senha dele.

## Dados de exemplo

- `npm run exemplos` cria (ou recria) os exemplos. As ilustrações são geradas em `backend/uploads/exemplos/`.
- `npm run exemplos:remover` apaga só os exemplos e mantém o que foi cadastrado pelo painel.

Os exemplos são fictícios (telefones `5547900000…`, e-mails e links `example.com`). O texto do "Sobre nós" de exemplo só é gravado se a página ainda estiver com o texto padrão. Ao colocar o site no ar, rode `npm run exemplos:remover` e cadastre o conteúdo real.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | inicia site (5173) e API (3001) juntos, com recarregamento automático |
| `npm run dev:frontend` | só o site |
| `npm run dev:backend` | só a API |
| `npm run build` | gera a versão de produção do site em `frontend/dist` |
| `npm run start:backend` | inicia a API sem recarregamento automático (produção) |
| `npm run lint` | verifica o código do frontend |
| `npm run prisma:migrate` | cria/aplica migrações no banco de desenvolvimento |
| `npm run prisma:deploy` | aplica as migrações existentes (produção) |
| `npm run prisma:generate` | gera o Prisma Client (o `npm install` já faz isso) |
| `npm run seed` | cria/atualiza o administrador e o texto inicial do "Sobre nós" |
| `npm run exemplos` | cadastra os dados de exemplo |
| `npm run exemplos:remover` | remove os dados de exemplo |

## Problemas comuns

| Erro | Solução |
| --- | --- |
| `The table public.usuarios does not exist` | As tabelas ainda não foram criadas: rode `npm run prisma:migrate`. |
| `Can't reach database server` / `ECONNREFUSED 5432` | O banco não está rodando: abra o Docker Desktop e rode `docker compose up -d`. |
| `failed to connect to the docker API` | O Docker Desktop está fechado. Abra-o e espere iniciar. |
| `Cannot resolve environment variable: DATABASE_URL` | Falta o arquivo `.env`: veja o passo 2. |
| `Defina ADMIN_EMAIL e ADMIN_SENHA` | Preencha essas variáveis no `.env` (senha com 8+ caracteres). |
| `EADDRINUSE` (porta 3001 ou 5173 em uso) | Já existe um `npm run dev` aberto: feche-o, ou mude `API_PORT` no `.env`. |
| Site abre, mas sem animais/eventos | Confira se a API está rodando (http://localhost:3001/api/health) e se há itens cadastrados e visíveis. |
| "Sua sessão expirou" no painel | O login vale 7 dias. Basta entrar de novo. |

## Estrutura

```
backend/
  src/
    server.js           rotas e configuração do Express
    routes/             animais, eventos, doacoes, petsitters, paginas, auth, uploads
    lib/                Prisma, autenticação, upload, validação e CRUD genérico
    seed.js             cria o administrador
    seed-exemplos.js    dados de exemplo (conteúdo em exemplos/)
  uploads/              imagens enviadas (fora do git)
frontend/
  src/
    api.js              cliente da API usado pelas páginas
    components/Gatos.jsx  ilustrações de gato usadas na decoração
    pages/HomeDesktop/  páginas públicas (adoção, eventos, doações, pet sitters, sobre)
    pages/Admin/        painel administrativo
  public/               arquivos estáticos
prisma/
  schema.prisma         modelo do banco
  migrations/           migrações SQL
```

## Banco de dados

O schema, as tabelas, as colunas e as enumerações usam nomes em português.

- `Usuario` e `SessaoAutenticacao`: contas (senhas só como hash bcrypt) e sessões de login revogáveis.
- `Animal`, `Etiqueta` e `AnimalEtiqueta`: animais e suas características (muitos-para-muitos).
- `Adocao`: solicitações de adoção (estrutura pronta, ainda sem telas).
- `Evento`: agenda (título, descrição, datas, local, imagem, link de inscrição, publicado).
- `FormaDoacao`: formas de doar, com ordem de exibição.
- `PetSitter`: pet sitters (contato, cidade/UF, região, descrição, foto, ativo).
- `ConteudoPagina`: textos editáveis por página, identificados por `slug` (ex.: `sobre`).

## API

Rotas `GET` são públicas e retornam só o que está visível no site. As demais exigem login de administrador, com o header `Authorization: Bearer <token>`.

| Recurso | Público | Administrador |
| --- | --- | --- |
| Autenticação | `POST /api/auth/login` `{ email, senha }` → `{ token }` | `GET /api/auth/me`, `POST /api/auth/logout` |
| Animais | `GET /api/animais` (`?especie=GATO&sexo=FEMEA&cidade=...`), `GET /api/animais/:id` | `GET /api/animais/admin`, `POST /api/animais`, `PUT /api/animais/:id`, `DELETE /api/animais/:id` |
| Eventos | `GET /api/eventos` (`?periodo=proximos\|passados\|todos`), `GET /api/eventos/:id` | `GET /api/eventos/admin`, `POST`, `PUT /:id`, `DELETE /:id` |
| Formas de doação | `GET /api/doacoes`, `GET /api/doacoes/:id` | `GET /api/doacoes/admin`, `POST`, `PUT /:id`, `DELETE /:id` |
| Pet sitters | `GET /api/petsitters` (`?cidade=...`), `GET /api/petsitters/:id` | `GET /api/petsitters/admin`, `POST`, `PUT /:id`, `DELETE /:id` |
| Páginas | `GET /api/paginas/sobre` | `PUT /api/paginas/sobre` `{ titulo, subtitulo, corpo, imagemUrl }` |
| Imagens | `GET /uploads/<arquivo>` | `POST /api/uploads` (multipart, campo `imagem`, até 5 MB) → `{ url }` |

- A resposta de animais inclui `idade` em texto (ex.: "3 meses") e `etiquetas` como lista de nomes.
- `PUT` aceita atualização parcial. Em animais, enviar `etiquetas` substitui a lista inteira.
- Para usar uma foto, envie primeiro para `/api/uploads` e use a `url` retornada em `fotoUrl`/`imagemUrl`.
- Telefones de pet sitters são salvos só com dígitos, prontos para links `https://wa.me/<telefone>`.
- Erros de validação retornam `400` com `{ error, details }`, em que `details` traz as mensagens por campo.
