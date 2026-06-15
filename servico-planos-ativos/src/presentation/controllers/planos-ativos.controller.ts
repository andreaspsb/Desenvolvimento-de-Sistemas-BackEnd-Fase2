import { Controller, Get, Param } from '@nestjs/common';
import { VerificarPlanoAtivoUseCase } from '../../application/use-cases/verificar-plano-ativo.use-case';

@Controller('planosativos')
export class PlanosAtivosController {
    constructor(private readonly verificarPlanoAtivo: VerificarPlanoAtivoUseCase) { }

    @Get(':codass')
    getPlanoAtivo(@Param('codass') codass: string): Promise<boolean> {
        return this.verificarPlanoAtivo.execute(Number(codass));
    }
}