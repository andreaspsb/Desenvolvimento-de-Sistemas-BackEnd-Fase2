import { GestaoController } from './gestao.controller';

describe('GestaoController', () => {
    it('deve retornar status ativo da assinatura por codigo', async () => {
        const verificarAssinaturaAtiva = {
            execute: jest.fn().mockResolvedValue(true),
        };

        const controller = new GestaoController(
            null as any,
            null as any,
            null as any,
            null as any,
            null as any,
            null as any,
            null as any,
            verificarAssinaturaAtiva as any,
        );

        const result = await controller.getAssinaturaStatus('1');

        expect(verificarAssinaturaAtiva.execute).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});