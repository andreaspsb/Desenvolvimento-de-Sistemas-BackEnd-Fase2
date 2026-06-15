-- CreateTable
CREATE TABLE "Pagamento" (
    "codigo" SERIAL NOT NULL,
    "codAss" INTEGER NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("codigo")
);
