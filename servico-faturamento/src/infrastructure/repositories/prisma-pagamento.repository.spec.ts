import { PrismaPagamentoRepository } from './prisma-pagamento.repository';

describe('PrismaPagamentoRepository', () => {
    it('deve criar pagamento usando Prisma e retornar entidade', async () => {
        const dataPagamento = new Date('2026-06-14T00:00:00.000Z');

        const prisma = {
            pagamento: {
                create: jest.fn().mockResolvedValue({
                    codigo: 1,
                    codAss: 10,
                    valorPago: 99.9,
                    dataPagamento,
                }),
            },
        };

        const repository = new PrismaPagamentoRepository(prisma as any);

        const pagamento = await repository.create({
            codAss: 10,
            valorPago: 99.9,
            dataPagamento,
        });

        expect(prisma.pagamento.create).toHaveBeenCalledWith({
            data: {
                codAss: 10,
                valorPago: 99.9,
                dataPagamento,
            },
        });

        expect(pagamento.codigo).toBe(1);
        expect(pagamento.codAss).toBe(10);
        expect(pagamento.valorPago).toBe(99.9);
        expect(pagamento.dataPagamento).toEqual(dataPagamento);
    });
});