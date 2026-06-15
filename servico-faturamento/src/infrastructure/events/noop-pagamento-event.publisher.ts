import {
  IPagamentoEventPublisher,
  PagamentoRegistradoEvent,
} from '../../domain/events/pagamento-event.publisher';

export class NoopPagamentoEventPublisher implements IPagamentoEventPublisher {
  async publishPagamentoRegistrado(
    _event: PagamentoRegistradoEvent,
  ): Promise<void> {}
}