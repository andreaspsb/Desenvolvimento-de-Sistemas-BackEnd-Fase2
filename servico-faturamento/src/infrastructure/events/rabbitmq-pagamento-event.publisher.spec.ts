import { RabbitmqPagamentoEventPublisher } from './rabbitmq-pagamento-event.publisher';

describe('RabbitmqPagamentoEventPublisher', () => {
    it('deve publicar evento de pagamento registrado no RabbitMQ', async () => {
        const channel = {
            assertExchange: jest.fn().mockResolvedValue(undefined),
            publish: jest.fn(),
        };

        const publisher = new RabbitmqPagamentoEventPublisher(channel as any);

        const dataPagamento = new Date('2026-06-14T00:00:00.000Z');

        await publisher.publishPagamentoRegistrado({
            codAss: 1,
            valorPago: 99.9,
            dataPagamento,
        });

        expect(channel.assertExchange).toHaveBeenCalledWith(
            'pagamentos',
            'fanout',
            { durable: true },
        );

        expect(channel.publish).toHaveBeenCalledWith(
            'pagamentos',
            '',
            Buffer.from(
                JSON.stringify({
                    codAss: 1,
                    valorPago: 99.9,
                    dataPagamento: dataPagamento.toISOString(),
                }),
            ),
            { persistent: true },
        );
    });
});