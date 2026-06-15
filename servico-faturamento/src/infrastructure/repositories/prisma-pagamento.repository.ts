import { Injectable } from '@nestjs/common';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { IPagamentoRepository } from '../../domain/repositories/pagamento.repository';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaPagamentoRepository implements IPagamentoRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(pagamento: Omit<Pagamento, 'codigo'>): Promise<Pagamento> {
        const created = await this.prisma.pagamento.create({
            data: {
                codAss: pagamento.codAss,
                valorPago: pagamento.valorPago,
                dataPagamento: pagamento.dataPagamento,
            },
        });

        return new Pagamento(
            created.codigo,
            created.codAss,
            created.valorPago,
            created.dataPagamento,
        );
    }
}