-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "tipo_usuario" AS ENUM ('ADOTANTE', 'ONG', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "especie_animal" AS ENUM ('GATO', 'CACHORRO', 'OUTRO');

-- CreateEnum
CREATE TYPE "sexo_animal" AS ENUM ('FEMEA', 'MACHO', 'DESCONHECIDO');

-- CreateEnum
CREATE TYPE "situacao_animal" AS ENUM ('RASCUNHO', 'DISPONIVEL', 'RESERVADO', 'ADOTADO', 'ARQUIVADO');

-- CreateEnum
CREATE TYPE "situacao_adocao" AS ENUM ('ENVIADA', 'EM_ANALISE', 'APROVADA', 'RECUSADA', 'RETIRADA', 'CONCLUIDA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "telefone" TEXT,
    "tipo" "tipo_usuario" NOT NULL DEFAULT 'ADOTANTE',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessoes_autenticacao" (
    "id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "usuario_id" UUID NOT NULL,
    "expira_em" TIMESTAMP(3) NOT NULL,
    "revogada_em" TIMESTAMP(3),
    "criada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessoes_autenticacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animais" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" "especie_animal" NOT NULL,
    "raca" TEXT,
    "sexo" "sexo_animal" NOT NULL DEFAULT 'DESCONHECIDO',
    "data_nascimento" TIMESTAMP(3),
    "descricao" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "vacinado" BOOLEAN NOT NULL DEFAULT false,
    "castrado" BOOLEAN NOT NULL DEFAULT false,
    "situacao" "situacao_animal" NOT NULL DEFAULT 'RASCUNHO',
    "responsavel_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etiquetas" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "criada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etiquetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animais_etiquetas" (
    "animal_id" UUID NOT NULL,
    "etiqueta_id" UUID NOT NULL,

    CONSTRAINT "animais_etiquetas_pkey" PRIMARY KEY ("animal_id","etiqueta_id")
);

-- CreateTable
CREATE TABLE "adocoes" (
    "id" UUID NOT NULL,
    "animal_id" UUID NOT NULL,
    "solicitante_id" UUID NOT NULL,
    "avaliador_id" UUID,
    "situacao" "situacao_adocao" NOT NULL DEFAULT 'ENVIADA',
    "mensagem" TEXT,
    "observacoes" TEXT,
    "enviada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avaliada_em" TIMESTAMP(3),
    "concluida_em" TIMESTAMP(3),
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adocoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_tipo_ativo_idx" ON "usuarios"("tipo", "ativo");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_autenticacao_token_hash_key" ON "sessoes_autenticacao"("token_hash");

-- CreateIndex
CREATE INDEX "sessoes_autenticacao_usuario_id_expira_em_idx" ON "sessoes_autenticacao"("usuario_id", "expira_em");

-- CreateIndex
CREATE INDEX "animais_situacao_especie_criado_em_idx" ON "animais"("situacao", "especie", "criado_em");

-- CreateIndex
CREATE INDEX "animais_cidade_estado_idx" ON "animais"("cidade", "estado");

-- CreateIndex
CREATE INDEX "animais_responsavel_id_idx" ON "animais"("responsavel_id");

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_nome_key" ON "etiquetas"("nome");

-- CreateIndex
CREATE INDEX "animais_etiquetas_etiqueta_id_idx" ON "animais_etiquetas"("etiqueta_id");

-- CreateIndex
CREATE INDEX "adocoes_animal_id_situacao_idx" ON "adocoes"("animal_id", "situacao");

-- CreateIndex
CREATE INDEX "adocoes_solicitante_id_enviada_em_idx" ON "adocoes"("solicitante_id", "enviada_em");

-- CreateIndex
CREATE INDEX "adocoes_avaliador_id_idx" ON "adocoes"("avaliador_id");

-- AddForeignKey
ALTER TABLE "sessoes_autenticacao" ADD CONSTRAINT "sessoes_autenticacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animais" ADD CONSTRAINT "animais_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animais_etiquetas" ADD CONSTRAINT "animais_etiquetas_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animais_etiquetas" ADD CONSTRAINT "animais_etiquetas_etiqueta_id_fkey" FOREIGN KEY ("etiqueta_id") REFERENCES "etiquetas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_solicitante_id_fkey" FOREIGN KEY ("solicitante_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_avaliador_id_fkey" FOREIGN KEY ("avaliador_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
