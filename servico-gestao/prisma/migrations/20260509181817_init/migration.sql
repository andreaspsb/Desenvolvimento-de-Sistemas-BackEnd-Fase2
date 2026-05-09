-- CreateTable
CREATE TABLE "Plano" (
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "custoMensal" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "codigo" SERIAL NOT NULL,
    "codPlano" INTEGER NOT NULL,
    "codCli" INTEGER NOT NULL,
    "inicioFidelidade" TIMESTAMP(3) NOT NULL,
    "fimFidelidade" TIMESTAMP(3) NOT NULL,
    "custoFinal" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_codPlano_fkey" FOREIGN KEY ("codPlano") REFERENCES "Plano"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "Cliente"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
