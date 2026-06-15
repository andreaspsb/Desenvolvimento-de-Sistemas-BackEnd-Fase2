import { Body, Controller, Post } from '@nestjs/common';
import { RegistrarPagamentoUseCase } from '../../application/use-cases/registrar-pagamento.use-case';

type RegistrarPagamentoBody = {
    dia: number;
    mes: number;
    ano: number;
    codAss: number;
    valorPago: number;
};

@Controller()
export class FaturamentoController {
    constructor(private readonly registrarPagamentoUseCase: RegistrarPagamentoUseCase) { }

    @Post('registrarpagamento')
    async registrarPagamento(@Body() body: RegistrarPagamentoBody) {
        const dataPagamento = new Date(
            Date.UTC(body.ano, body.mes - 1, body.dia),
        );

        return this.registrarPagamentoUseCase.execute({
            codAss: body.codAss,
            valorPago: body.valorPago,
            dataPagamento,
        });
    }
}