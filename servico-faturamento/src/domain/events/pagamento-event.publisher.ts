export type PagamentoRegistradoEvent = {
    codAss: number;
    valorPago: number;
    dataPagamento: Date;
};

export abstract class IPagamentoEventPublisher {
    abstract publishPagamentoRegistrado(
        event: PagamentoRegistradoEvent,
    ): Promise<void>;
}