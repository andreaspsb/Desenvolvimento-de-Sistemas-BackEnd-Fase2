import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
    it('deve encaminhar registro de pagamento para servico-faturamento', async () => {
        const proxy = {
            forward: jest.fn().mockResolvedValue({
                status: 200,
                body: null,
            }),
        };

        const controller = new GatewayController(
            proxy as any,
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003',
        );

        const body = {
            dia: 14,
            mes: 6,
            ano: 2026,
            codAss: 1,
            valorPago: 99.9,
        };

        const result = await controller.registrarPagamento(body);

        expect(proxy.forward).toHaveBeenCalledWith({
            method: 'POST',
            targetUrl: 'http://localhost:3002/registrarpagamento',
            headers: { 'content-type': 'application/json' },
            body,
        });
        expect(result).toBeNull();
    });

    it('deve encaminhar consulta de plano ativo para servico-planos-ativos', async () => {
        const proxy = {
            forward: jest.fn().mockResolvedValue({
                status: 200,
                body: true,
            }),
        };

        const controller = new GatewayController(
            proxy as any,
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003',
        );

        const result = await controller.getPlanoAtivo('1');

        expect(proxy.forward).toHaveBeenCalledWith({
            method: 'GET',
            targetUrl: 'http://localhost:3003/planosativos/1',
            headers: {},
            body: undefined,
        });
        expect(result).toBe(true);
    });

    it('deve encaminhar listagem de clientes para servico-gestao', async () => {
        const proxy = {
            forward: jest.fn().mockResolvedValue({
                status: 200,
                body: [{ codigo: 1, nome: 'Ana' }],
            }),
        };

        const controller = new GatewayController(
            proxy as any,
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003',
        );

        const result = await controller.getClientes();

        expect(proxy.forward).toHaveBeenCalledWith({
            method: 'GET',
            targetUrl: 'http://localhost:3001/gestao/clientes',
            headers: {},
            body: undefined,
        });
        expect(result).toEqual([{ codigo: 1, nome: 'Ana' }]);
    });

});