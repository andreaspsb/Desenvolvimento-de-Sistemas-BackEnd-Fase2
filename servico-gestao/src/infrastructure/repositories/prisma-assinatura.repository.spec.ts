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
});