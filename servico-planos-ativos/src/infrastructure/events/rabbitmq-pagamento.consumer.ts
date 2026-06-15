import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'amqplib';
import { InvalidarCachePlanoAtivoUseCase } from '../../application/use-cases/invalidar-cache-plano-ativo.use-case';

type PagamentoRegistradoMessage = {
    codAss: number;
    valorPago: number;
    dataPagamento: string;
};

@Injectable()
export class RabbitmqPagamentoConsumer implements OnModuleInit {
    constructor(
        private readonly invalidarCachePlanoAtivo: InvalidarCachePlanoAtivoUseCase,
    ) { }

    async onModuleInit() {
        const connection = await connect(
            process.env.RABBITMQ_URL ?? 'amqp://localhost:5672',
        );
        const channel = await connection.createChannel();

        await channel.assertExchange('pagamentos', 'fanout', { durable: true });

        const queue = await channel.assertQueue(
            'servico-planos-ativos-pagamentos',
            { durable: true },
        );

        await channel.bindQueue(queue.queue, 'pagamentos', '');

        await channel.consume(queue.queue, async (message) => {
            if (!message) {
                return;
            }

            await this.handleMessage(message.content);
            channel.ack(message);
        });
    }

    async handleMessage(content: Buffer): Promise<void> {
        const payload = JSON.parse(
            content.toString(),
        ) as PagamentoRegistradoMessage;

        await this.invalidarCachePlanoAtivo.execute(payload.codAss);
    }
}