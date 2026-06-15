import { RabbitmqPagamentoConsumer } from './rabbitmq-pagamento.consumer';

describe('RabbitmqPagamentoConsumer', () => {
    it('deve processar evento de pagamento registrado', async () => {
        const useCase = {
            execute: jest.fn().mockResolvedValue(undefined),
        };

        const consumer = new RabbitmqPagamentoConsumer(useCase as any);

        const dataPagamento = '2026-06-14T00:00:00.000Z';

        await consumer.handleMessage(
            Buffer.from(
                JSON.stringify({
                    codAss: 1,
                    valorPago: 99.9,
                    dataPagamento,
                }),
            ),
        );

        expect(useCase.execute).toHaveBeenCalledWith({
            codAss: 1,
            dataPagamento: new Date(dataPagamento),
        });
    });
});