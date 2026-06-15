import { Injectable } from '@nestjs/common';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';

@Injectable()
export class VerificarAssinaturaAtivaUseCase {
    constructor(private readonly assinaturaRepository: IAssinaturaRepository) { }

    async execute(codigo: number): Promise<boolean> {
        const assinatura = await this.assinaturaRepository.findById(codigo);

        if (!assinatura) {
            return false;
        }

        return assinatura.ativa;
    }
}