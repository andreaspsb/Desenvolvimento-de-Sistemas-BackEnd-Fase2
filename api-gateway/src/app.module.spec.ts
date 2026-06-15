import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { GatewayController } from './gateway.controller';
import { ProxyService } from './proxy.service';

describe('AppModule', () => {
    it('deve resolver controller e proxy service', async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        expect(moduleRef.get(GatewayController)).toBeInstanceOf(GatewayController);
        expect(moduleRef.get(ProxyService)).toBeInstanceOf(ProxyService);
    });
});