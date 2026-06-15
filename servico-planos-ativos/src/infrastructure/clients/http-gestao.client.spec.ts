import { HttpGestaoClient } from './http-gestao.client';

describe('HttpGestaoClient', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    it('deve consultar status da assinatura no servico-gestao', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => true,
        } as Response);

        const client = new HttpGestaoClient('http://localhost:3001');

        const ativo = await client.verificarAssinaturaAtiva(1);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3001/gestao/assinatura/1/status',
        );
        expect(ativo).toBe(true);
    });
});