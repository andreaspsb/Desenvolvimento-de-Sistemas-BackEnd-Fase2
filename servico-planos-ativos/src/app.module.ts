import { Module } from '@nestjs/common';
import { InvalidarCachePlanoAtivoUseCase } from './application/use-cases/invalidar-cache-plano-ativo.use-case';
import { VerificarPlanoAtivoUseCase } from './application/use-cases/verificar-plano-ativo.use-case';
import { IPlanoAtivoCache } from './domain/cache/plano-ativo.cache';
import { IGestaoClient } from './domain/clients/gestao.client';
import { InMemoryPlanoAtivoCache } from './infrastructure/cache/in-memory-plano-ativo.cache';
import { HttpGestaoClient } from './infrastructure/clients/http-gestao.client';
import { RabbitmqPagamentoConsumer } from './infrastructure/events/rabbitmq-pagamento.consumer';
import { PlanosAtivosController } from './presentation/controllers/planos-ativos.controller';

@Module({
    controllers: [PlanosAtivosController],
    providers: [
        { provide: IPlanoAtivoCache, useClass: InMemoryPlanoAtivoCache },
        { provide: IGestaoClient, useClass: HttpGestaoClient },
        VerificarPlanoAtivoUseCase,
        InvalidarCachePlanoAtivoUseCase,
        RabbitmqPagamentoConsumer,
    ],
})
export class AppModule { }