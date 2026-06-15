import { Injectable } from '@nestjs/common';
import { IPlanoAtivoCache } from '../../domain/cache/plano-ativo.cache';

@Injectable()
export class InMemoryPlanoAtivoCache implements IPlanoAtivoCache {
    private readonly cache = new Map<number, boolean>();

    async get(codAss: number): Promise<boolean | null> {
        return this.cache.has(codAss) ? this.cache.get(codAss)! : null;
    }

    async set(codAss: number, ativo: boolean): Promise<void> {
        this.cache.set(codAss, ativo);
    }

    async delete(codAss: number): Promise<void> {
        this.cache.delete(codAss);
    }
}