import { VerificarPlanoAtivoUseCase } from './verificar-plano-ativo.use-case';
import { IPlanoAtivoCache } from '../../domain/cache/plano-ativo.cache';
import { IGestaoClient } from '../../domain/clients/gestao.client';

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

class GestaoClientFake implements IGestaoClient {
    public chamadas: number[] = [];

    async verificarAssinaturaAtiva(codAss: number): Promise<boolean> {
        this.chamadas.push(codAss);
        return true;
    }
}

describe('VerificarPlanoAtivoUseCase', () => {
    it('deve consultar gestao e salvar em cache quando cache miss', async () => {
        const cache = new PlanoAtivoCacheFake();
        const gestaoClient = new GestaoClientFake();
        const useCase = new VerificarPlanoAtivoUseCase(cache, gestaoClient);

        const ativo = await useCase.execute(1);

        expect(ativo).toBe(true);
        expect(gestaoClient.chamadas).toEqual([1]);
        expect(cache.cache.get(1)).toBe(true);
    });

    it('deve retornar valor do cache quando cache hit', async () => {
        const cache = new PlanoAtivoCacheFake();
        const gestaoClient = new GestaoClientFake();
        const useCase = new VerificarPlanoAtivoUseCase(cache, gestaoClient);

        await cache.set(1, false);

        const ativo = await useCase.execute(1);

        expect(ativo).toBe(false);
        expect(gestaoClient.chamadas).toEqual([]);
    });
});