import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { InvalidarCachePlanoAtivoUseCase } from './application/use-cases/invalidar-cache-plano-ativo.use-case';
import { VerificarPlanoAtivoUseCase } from './application/use-cases/verificar-plano-ativo.use-case';
import { IPlanoAtivoCache } from './domain/cache/plano-ativo.cache';
import { IGestaoClient } from './domain/clients/gestao.client';
import { RabbitmqPagamentoConsumer } from './infrastructure/events/rabbitmq-pagamento.consumer';
import { PlanosAtivosController } from './presentation/controllers/planos-ativos.controller';

describe('AppModule', () => {
    it('deve resolver controller e providers principais', async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(RabbitmqPagamentoConsumer)
            .useValue({})
            .compile();

        expect(moduleRef.get(PlanosAtivosController)).toBeInstanceOf(
            PlanosAtivosController,
        );
        expect(moduleRef.get(VerificarPlanoAtivoUseCase)).toBeInstanceOf(
            VerificarPlanoAtivoUseCase,
        );
        expect(moduleRef.get(InvalidarCachePlanoAtivoUseCase)).toBeInstanceOf(
            InvalidarCachePlanoAtivoUseCase,
        );
        expect(moduleRef.get(IPlanoAtivoCache)).toBeDefined();
        expect(moduleRef.get(IGestaoClient)).toBeDefined();
    });
});