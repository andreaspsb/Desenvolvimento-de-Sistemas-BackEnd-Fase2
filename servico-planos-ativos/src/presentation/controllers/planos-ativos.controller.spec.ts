import { RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { PlanosAtivosController } from './planos-ativos.controller';

describe('PlanosAtivosController', () => {
    it('deve retornar status da assinatura', async () => {
        const useCase = {
            execute: jest.fn().mockResolvedValue(true),
        };

        const controller = new PlanosAtivosController(useCase as any);

        const result = await controller.getPlanoAtivo('1');

        expect(useCase.execute).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it('deve expor rota GET /planosativos/:codass', () => {
        const controllerPath = Reflect.getMetadata(
            PATH_METADATA,
            PlanosAtivosController,
        );

        const routePath = Reflect.getMetadata(
            PATH_METADATA,
            PlanosAtivosController.prototype.getPlanoAtivo,
        );

        const requestMethod = Reflect.getMetadata(
            METHOD_METADATA,
            PlanosAtivosController.prototype.getPlanoAtivo,
        );

        expect(controllerPath).toBe('planosativos');
        expect(routePath).toBe(':codass');
        expect(requestMethod).toBe(RequestMethod.GET);
    });
});