import { FaturamentoController } from './faturamento.controller';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import { RequestMethod } from '@nestjs/common';

class RegistrarPagamentoUseCaseFake {
    public inputRecebido?: {
        codAss: number;
        valorPago: number;
        dataPagamento: Date;
    };

    async execute(input: {
        codAss: number;
        valorPago: number;
        dataPagamento: Date;
    }): Promise<Pagamento> {
        this.inputRecebido = input;

        return new Pagamento(
            1,
            input.codAss,
            input.valorPago,
            input.dataPagamento,
        );
    }
}

describe('FaturamentoController', () => {
    it('deve registrar pagamento a partir do body da requisicao', async () => {
        const useCase = new RegistrarPagamentoUseCaseFake();
        const controller = new FaturamentoController(useCase as any);

        const resposta = await controller.registrarPagamento({
            dia: 14,
            mes: 6,
            ano: 2026,
            codAss: 1,
            valorPago: 99.9,
        });

        expect(useCase.inputRecebido).toEqual({
            codAss: 1,
            valorPago: 99.9,
            dataPagamento: new Date('2026-06-14T00:00:00.000Z'),
        });

        expect(resposta).toEqual({
            codigo: 1,
            codAss: 1,
            valorPago: 99.9,
            dataPagamento: new Date('2026-06-14T00:00:00.000Z'),
        });
    });

    it('deve expor a rota POST /registrarpagamento', () => {
        const controllerPath = Reflect.getMetadata(
            PATH_METADATA,
            FaturamentoController,
        );

        const routePath = Reflect.getMetadata(
            PATH_METADATA,
            FaturamentoController.prototype.registrarPagamento,
        );

        const requestMethod = Reflect.getMetadata(
            METHOD_METADATA,
            FaturamentoController.prototype.registrarPagamento,
        );

        expect(controllerPath).toBe('/');
        expect(routePath).toBe('registrarpagamento');
        expect(requestMethod).toBe(RequestMethod.POST);
    });

});