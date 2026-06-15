import { Injectable } from '@nestjs/common';
import { IPlanoAtivoCache } from '../../domain/cache/plano-ativo.cache';
import { IGestaoClient } from '../../domain/clients/gestao.client';

@Injectable()
export class VerificarPlanoAtivoUseCase {
    constructor(
        private readonly cache: IPlanoAtivoCache,
        private readonly gestaoClient: IGestaoClient,
    ) { }

    async execute(codAss: number): Promise<boolean> {
        const cached = await this.cache.get(codAss);

        if (cached !== null) {
            return cached;
        }

        const ativo = await this.gestaoClient.verificarAssinaturaAtiva(codAss);
        await this.cache.set(codAss, ativo);

        return ativo;
    }
}