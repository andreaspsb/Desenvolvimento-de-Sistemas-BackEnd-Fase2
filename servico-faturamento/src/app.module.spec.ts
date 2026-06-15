import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { RegistrarPagamentoUseCase } from './application/use-cases/registrar-pagamento.use-case';
import { IPagamentoRepository } from './domain/repositories/pagamento.repository';
import { IPagamentoEventPublisher } from './domain/events/pagamento-event.publisher';
import { FaturamentoController } from './presentation/controllers/faturamento.controller';
import { NoopPagamentoEventPublisher } from './infrastructure/events/noop-pagamento-event.publisher';

describe('AppModule', () => {
    it('deve resolver controller e providers principais', async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(IPagamentoEventPublisher)
            .useClass(NoopPagamentoEventPublisher)
            .compile();

        expect(moduleRef.get(FaturamentoController)).toBeInstanceOf(FaturamentoController);
        expect(moduleRef.get(RegistrarPagamentoUseCase)).toBeInstanceOf(RegistrarPagamentoUseCase);
        expect(moduleRef.get(IPagamentoRepository)).toBeDefined();
        expect(moduleRef.get(IPagamentoEventPublisher)).toBeDefined();
    });
});