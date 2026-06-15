import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { IPagamentoEventPublisher } from '../../domain/events/pagamento-event.publisher';
import { IPagamentoRepository } from '../../domain/repositories/pagamento.repository';

type RegistrarPagamentoInput = {
    codAss: number;
    valorPago: number;
    dataPagamento: Date;
};

@Injectable()
export class RegistrarPagamentoUseCase {
    constructor(
        @Inject(IPagamentoRepository)
        private readonly pagamentoRepository: IPagamentoRepository,

        @Inject(IPagamentoEventPublisher)
        private readonly eventPublisher: IPagamentoEventPublisher,
    ) { }

    async execute(input: RegistrarPagamentoInput): Promise<Pagamento> {
        if (input.valorPago <= 0) {
            throw new Error('Valor pago deve ser maior que zero.');
        }

        const pagamento = await this.pagamentoRepository.create({
            codAss: input.codAss,
            valorPago: input.valorPago,
            dataPagamento: input.dataPagamento,
        });

        await this.eventPublisher.publishPagamentoRegistrado({
            codAss: pagamento.codAss,
            valorPago: pagamento.valorPago,
            dataPagamento: pagamento.dataPagamento,
        });

        return pagamento;
    }
}