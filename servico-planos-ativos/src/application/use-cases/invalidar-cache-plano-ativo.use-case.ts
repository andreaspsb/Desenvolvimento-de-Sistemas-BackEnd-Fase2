import { Injectable } from '@nestjs/common';
import { IPlanoAtivoCache } from '../../domain/cache/plano-ativo.cache';

@Injectable()
export class InvalidarCachePlanoAtivoUseCase {
    constructor(private readonly cache: IPlanoAtivoCache) { }

    async execute(codAss: number): Promise<void> {
        await this.cache.delete(codAss);
    }
}