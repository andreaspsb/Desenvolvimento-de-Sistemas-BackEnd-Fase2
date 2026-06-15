import { PrismaAssinaturaRepository } from './prisma-assinatura.repository';

describe('PrismaAssinaturaRepository', () => {
    it('deve mapear dataUltimoPagamento para a entidade Assinatura', async () => {
        const dataUltimoPagamento = new Date();

        const prismaMock = {
            assinatura: {
                findMany: jest.fn().mockResolvedValue([
                    {
                        codigo: 1,
                        codPlano: 1,
                        codCli: 1,
                        inicioFidelidade: new Date(),
                        fimFidelidade: new Date(),
                        dataUltimoPagamento,
                        custoFinal: 100,
                        descricao: 'Assinatura do plano Básico',
                    },
                ]),
            },
        };

        const repository = new PrismaAssinaturaRepository(prismaMock as any);
        const resultado = await repository.findAll();
        expect(resultado[0].dataUltimoPagamento).toEqual(dataUltimoPagamento);
    });

    it('deve definir dataUltimoPagamento ao criar uma assinatura', async () => {
        const prismaMock = {
            plano: {
                findUnique: jest.fn().mockResolvedValue({
                    codigo: 1,
                    nome: 'Plano Básico',
                    custoMensal: 79.9,
                }),
            },
            assinatura: {
                create: jest.fn().mockImplementation(({ data }) =>
                    Promise.resolve({
                        codigo: 1,
                        ...data,
                    }),
                ),
            },
        };

        const repository = new PrismaAssinaturaRepository(prismaMock as any);

        const resultado = await repository.create(1, 1);

        expect(prismaMock.assinatura.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                codPlano: 1,
                codCli: 1,
                dataUltimoPagamento: expect.any(Date),
            }),
        });

        expect(resultado.dataUltimoPagamento).toBeInstanceOf(Date);
    });

    it('deve atualizar dataUltimoPagamento de uma assinatura', async () => {
        const dataPagamento = new Date('2026-06-14T00:00:00.000Z');

        const prisma = {
            assinatura: {
                update: jest.fn().mockResolvedValue({
                    codigo: 1,
                    codPlano: 1,
                    codCli: 1,
                    inicioFidelidade: new Date('2026-01-01T00:00:00.000Z'),
                    fimFidelidade: new Date('2027-01-01T00:00:00.000Z'),
                    dataUltimoPagamento: dataPagamento,
                    custoFinal: 99.9,
                    descricao: 'Assinatura teste',
                }),
            },
        };

        const repository = new PrismaAssinaturaRepository(prisma as any);

        const assinatura = await repository.updateDataUltimoPagamento(
            1,
            dataPagamento,
        );

        expect(prisma.assinatura.update).toHaveBeenCalledWith({
            where: { codigo: 1 },
            data: { dataUltimoPagamento: dataPagamento },
        });

        expect(assinatura.codigo).toBe(1);
        expect(assinatura.dataUltimoPagamento).toEqual(dataPagamento);
    });

    it('deve buscar assinatura por codigo', async () => {
        const dataUltimoPagamento = new Date('2026-06-14T00:00:00.000Z');

        const prisma = {
            assinatura: {
                findUnique: jest.fn().mockResolvedValue({
                    codigo: 1,
                    codPlano: 1,
                    codCli: 1,
                    inicioFidelidade: new Date('2026-01-01T00:00:00.000Z'),
                    fimFidelidade: new Date('2027-01-01T00:00:00.000Z'),
                    dataUltimoPagamento,
                    custoFinal: 99.9,
                    descricao: 'Assinatura teste',
                }),
            },
        };

        const repository = new PrismaAssinaturaRepository(prisma as any);

        const assinatura = await repository.findById(1);

        expect(prisma.assinatura.findUnique).toHaveBeenCalledWith({
            where: { codigo: 1 },
        });

        expect(assinatura?.codigo).toBe(1);
        expect(assinatura?.dataUltimoPagamento).toEqual(dataUltimoPagamento);
    });
});