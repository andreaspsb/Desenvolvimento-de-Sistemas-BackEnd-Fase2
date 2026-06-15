import { RabbitmqPagamentoConsumer } from './rabbitmq-pagamento.consumer';

describe('RabbitmqPagamentoConsumer', () => {
    it('deve invalidar cache ao receber evento de pagamento', async () => {
        const invalidarCache = {
            execute: jest.fn().mockResolvedValue(undefined),
        };

        const consumer = new RabbitmqPagamentoConsumer(invalidarCache as any);

        await consumer.handleMessage(
            Buffer.from(
                JSON.stringify({
                    codAss: 1,
                    valorPago: 99.9,
                    dataPagamento: '2026-06-14T00:00:00.000Z',
                }),
            ),
        );

        expect(invalidarCache.execute).toHaveBeenCalledWith(1);
    });
});