import { Injectable } from '@nestjs/common';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';

type RegistrarPagamentoAssinaturaInput = {
    codAss: number;
    dataPagamento: Date;
};

@Injectable()
export class RegistrarPagamentoAssinaturaUseCase {
    constructor(private readonly assinaturaRepository: IAssinaturaRepository) { }

    async execute(
        input: RegistrarPagamentoAssinaturaInput,
    ): Promise<Assinatura> {
        return this.assinaturaRepository.updateDataUltimoPagamento(
            input.codAss,
            input.dataPagamento,
        );
    }
}