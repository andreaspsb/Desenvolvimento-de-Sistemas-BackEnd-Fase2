export class Pagamento {
    constructor(
        public readonly codigo: number,
        public readonly codAss: number,
        public readonly valorPago: number,
        public readonly dataPagamento: Date,
    ) { }
}