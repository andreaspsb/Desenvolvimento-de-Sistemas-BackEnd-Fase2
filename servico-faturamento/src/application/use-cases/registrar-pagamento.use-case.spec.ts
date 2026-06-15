import { RegistrarPagamentoUseCase } from './registrar-pagamento.use-case';
import { IPagamentoRepository } from '../../domain/repositories/pagamento.repository';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { IPagamentoEventPublisher, PagamentoRegistradoEvent } from '../../domain/events/pagamento-event.publisher';

class PagamentoRepositoryFake implements IPagamentoRepository {
    public pagamentos: Pagamento[] = [];

    async create(pagamento: Omit<Pagamento, 'codigo'>): Promise<Pagamento> {
        const novoPagamento = new Pagamento(
            1,
            pagamento.codAss,
            pagamento.valorPago,
            pagamento.dataPagamento,
        );

        this.pagamentos.push(novoPagamento);
        return novoPagamento;
    }
}

class PagamentoEventPublisherFake implements IPagamentoEventPublisher {
    public eventos: PagamentoRegistradoEvent[] = [];

    async publishPagamentoRegistrado(
        event: PagamentoRegistradoEvent,
    ): Promise<void> {
        this.eventos.push(event);
    }
}

describe('RegistrarPagamentoUseCase', () => {
    it('deve registrar um pagamento valido', async () => {
        const pagamentoRepository = new PagamentoRepositoryFake();
        const eventPublisher = new PagamentoEventPublisherFake();
        const useCase = new RegistrarPagamentoUseCase(
            pagamentoRepository,
            eventPublisher,
        );

        const dataPagamento = new Date('2026-06-14T00:00:00.000Z');

        const pagamento = await useCase.execute({
            codAss: 1,
            valorPago: 99.9,
            dataPagamento,
        });

        expect(pagamento.codigo).toBe(1);
        expect(pagamento.codAss).toBe(1);
        expect(pagamento.valorPago).toBe(99.9);
        expect(pagamento.dataPagamento).toEqual(dataPagamento);
        expect(pagamentoRepository.pagamentos).toHaveLength(1);
    });

    it('deve publicar evento quando pagamento for registrado', async () => {
        const pagamentoRepository = new PagamentoRepositoryFake();
        const eventPublisher = new PagamentoEventPublisherFake();
        const useCase = new RegistrarPagamentoUseCase(
            pagamentoRepository,
            eventPublisher,
        );

        const dataPagamento = new Date('2026-06-14T00:00:00.000Z');

        await useCase.execute({
            codAss: 1,
            valorPago: 99.9,
            dataPagamento,
        });

        expect(eventPublisher.eventos).toHaveLength(1);
        expect(eventPublisher.eventos[0]).toEqual({
            codAss: 1,
            valorPago: 99.9,
            dataPagamento,
        });
    });

    it('deve rejeitar pagamento com valor menor ou igual a zero', async () => {
        const pagamentoRepository = new PagamentoRepositoryFake();
        const eventPublisher = new PagamentoEventPublisherFake();
        const useCase = new RegistrarPagamentoUseCase(
            pagamentoRepository,
            eventPublisher,
        );

        await expect(
            useCase.execute({
                codAss: 1,
                valorPago: 0,
                dataPagamento: new Date('2026-06-14T00:00:00.000Z'),
            }),
        ).rejects.toThrow('Valor pago deve ser maior que zero');

        expect(pagamentoRepository.pagamentos).toHaveLength(0);
        expect(eventPublisher.eventos).toHaveLength(0);
    });

});