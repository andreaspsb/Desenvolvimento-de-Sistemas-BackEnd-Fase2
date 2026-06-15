import { InMemoryPlanoAtivoCache } from './in-memory-plano-ativo.cache';

describe('InMemoryPlanoAtivoCache', () => {
    it('deve armazenar, buscar e remover status de assinatura', async () => {
        const cache = new InMemoryPlanoAtivoCache();

        expect(await cache.get(1)).toBeNull();

        await cache.set(1, true);

        expect(await cache.get(1)).toBe(true);

        await cache.delete(1);

        expect(await cache.get(1)).toBeNull();
    });
});