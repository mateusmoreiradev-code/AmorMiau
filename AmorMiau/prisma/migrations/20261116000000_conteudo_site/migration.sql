-- CreateEnum
CREATE TYPE "tipo_doacao" AS ENUM ('PIX', 'TRANSFERENCIA', 'DINHEIRO', 'ITENS', 'APADRINHAMENTO', 'OUTRO');

-- AlterTable
ALTER TABLE "animais" ADD COLUMN     "foto_url" TEXT;

-- CreateTable
CREATE TABLE "eventos" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "local" TEXT NOT NULL,
    "imagem_url" TEXT,
    "link_inscricao" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formas_doacao" (
    "id" UUID NOT NULL,
    "tipo" "tipo_doacao" NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "chave_pix" TEXT,
    "dados_bancarios" TEXT,
    "link" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formas_doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_sitters" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "regiao" TEXT,
    "descricao" TEXT NOT NULL,
    "foto_url" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pet_sitters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conteudos_pagina" (
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "corpo" TEXT NOT NULL,
    "imagem_url" TEXT,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conteudos_pagina_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE INDEX "eventos_publicado_data_inicio_idx" ON "eventos"("publicado", "data_inicio");

-- CreateIndex
CREATE INDEX "formas_doacao_ativo_ordem_idx" ON "formas_doacao"("ativo", "ordem");

-- CreateIndex
CREATE INDEX "pet_sitters_ativo_cidade_idx" ON "pet_sitters"("ativo", "cidade");

