import { Module } from '@nestjs/common';
import { RegistrarPagamentoUseCase } from './application/use-cases/registrar-pagamento.use-case';
import { IPagamentoEventPublisher } from './domain/events/pagamento-event.publisher';
import { IPagamentoRepository } from './domain/repositories/pagamento.repository';
import { PrismaService } from './infrastructure/database/prisma.service';
import { PrismaPagamentoRepository } from './infrastructure/repositories/prisma-pagamento.repository';
import { FaturamentoController } from './presentation/controllers/faturamento.controller';
import { connect } from 'amqplib';
import { RabbitmqPagamentoEventPublisher } from './infrastructure/events/rabbitmq-pagamento-event.publisher';

@Module({
    controllers: [FaturamentoController],
    providers: [
        PrismaService,
        { provide: IPagamentoRepository, useClass: PrismaPagamentoRepository },
        {
            provide: IPagamentoEventPublisher,
            useFactory: async () => {
                const connection = await connect(
                    process.env.RABBITMQ_URL ?? 'amqp://localhost:5672',
                );
                const channel = await connection.createConfirmChannel();
                return new RabbitmqPagamentoEventPublisher(channel);
            },
        },
        RegistrarPagamentoUseCase,
    ],
})
export class AppModule { }