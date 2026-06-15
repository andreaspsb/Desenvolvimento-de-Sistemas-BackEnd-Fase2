import { ConfirmChannel } from 'amqplib';
import {
    IPagamentoEventPublisher,
    PagamentoRegistradoEvent,
} from '../../domain/events/pagamento-event.publisher';

export class RabbitmqPagamentoEventPublisher implements IPagamentoEventPublisher {
    constructor(private readonly channel: ConfirmChannel) { }

    async publishPagamentoRegistrado(
        event: PagamentoRegistradoEvent,
    ): Promise<void> {
        await this.channel.assertExchange('pagamentos', 'fanout', {
            durable: true,
        });

        this.channel.publish(
            'pagamentos',
            '',
            Buffer.from(
                JSON.stringify({
                    codAss: event.codAss,
                    valorPago: event.valorPago,
                    dataPagamento: event.dataPagamento.toISOString(),
                }),
            ),
            { persistent: true },
        );
    }
}