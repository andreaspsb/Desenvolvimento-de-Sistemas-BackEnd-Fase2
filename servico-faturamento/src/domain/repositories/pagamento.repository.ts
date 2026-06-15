import { Pagamento } from '../entities/pagamento.entity';

export abstract class IPagamentoRepository {
    abstract create(pagamento: Omit<Pagamento, 'codigo'>): Promise<Pagamento>;
}