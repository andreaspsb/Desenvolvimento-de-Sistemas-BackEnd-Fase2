import { InvalidarCachePlanoAtivoUseCase } from './invalidar-cache-plano-ativo.use-case';
import { IPlanoAtivoCache } from '../../domain/cache/plano-ativo.cache';

class PlanoAtivoCacheFake implements IPlanoAtivoCache {
    public cache = new Map<number, boolean>();

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

describe('InvalidarCachePlanoAtivoUseCase', () => {
    it('deve remover assinatura do cache', async () => {
        const cache = new PlanoAtivoCacheFake();
        const useCase = new InvalidarCachePlanoAtivoUseCase(cache);

        await cache.set(1, true);

        await useCase.execute(1);

        expect(await cache.get(1)).toBeNull();
    });
});