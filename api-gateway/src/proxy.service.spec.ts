import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    it('deve encaminhar requisicao GET para a URL alvo', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            status: 200,
            headers: new Headers({ 'content-type': 'application/json' }),
            text: async () => JSON.stringify({ ok: true }),
        } as Response);

        const service = new ProxyService();

        const result = await service.forward({
            method: 'GET',
            targetUrl: 'http://localhost:3001/gestao/clientes',
            body: undefined,
            headers: {},
        });

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3001/gestao/clientes',
            {
                method: 'GET',
                headers: {},
                body: undefined,
            },
        );

        expect(result.status).toBe(200);
        expect(result.body).toEqual({ ok: true });
    });
});