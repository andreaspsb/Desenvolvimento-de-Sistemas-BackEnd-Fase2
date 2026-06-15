import {
    Body,
    Controller,
    Get,
    Inject,
    Optional,
    Param,
    Patch,
    Post,
} from '@nestjs/common'; import { ProxyService } from './proxy.service';

@Controller()
export class GatewayController {
    constructor(
        private readonly proxy: ProxyService,

        @Optional()
        @Inject('GESTAO_URL')
        private readonly gestaoUrl = process.env.GESTAO_URL ?? 'http://localhost:3001',

        @Optional()
        @Inject('FATURAMENTO_URL')
        private readonly faturamentoUrl = process.env.FATURAMENTO_URL ?? 'http://localhost:3002',
        
        @Optional()
        @Inject('PLANOS_ATIVOS_URL')
        private readonly planosAtivosUrl = process.env.PLANOS_ATIVOS_URL ?? 'http://localhost:3003',
    ) { }

    @Post('registrarpagamento')
    async registrarPagamento(@Body() body: unknown) {
        const result = await this.proxy.forward({
            method: 'POST',
            targetUrl: `${this.faturamentoUrl}/registrarpagamento`,
            headers: { 'content-type': 'application/json' },
            body,
        });

        return result.body;
    }

    @Get('planosativos/:codass')
    async getPlanoAtivo(@Param('codass') codass: string) {
        const result = await this.proxy.forward({
            method: 'GET',
            targetUrl: `${this.planosAtivosUrl}/planosativos/${codass}`,
            headers: {},
            body: undefined,
        });

        return result.body;
    }

    @Get('gestao/clientes')
    async getClientes() {
        const result = await this.proxy.forward({
            method: 'GET',
            targetUrl: `${this.gestaoUrl}/gestao/clientes`,
            headers: {},
            body: undefined,
        });

        return result.body;
    }

    @Get('gestao/planos')
    async getPlanos() {
        const result = await this.proxy.forward({
            method: 'GET',
            targetUrl: `${this.gestaoUrl}/gestao/planos`,
            headers: {},
            body: undefined,
        });

        return result.body;
    }

    @Post('gestao/assinaturas')
    async postAssinatura(@Body() body: unknown) {
        const result = await this.proxy.forward({
            method: 'POST',
            targetUrl: `${this.gestaoUrl}/gestao/assinaturas`,
            headers: { 'content-type': 'application/json' },
            body,
        });

        return result.body;
    }

    @Patch('gestao/planos/:idPlano')
    async patchPlano(@Param('idPlano') idPlano: string, @Body() body: unknown) {
        const result = await this.proxy.forward({
            method: 'PATCH',
            targetUrl: `${this.gestaoUrl}/gestao/planos/${idPlano}`,
            headers: { 'content-type': 'application/json' },
            body,
        });

        return result.body;
    }

    @Get('gestao/assinaturas/:tipo')
    async getAssinaturas(@Param('tipo') tipo: string) {
        const result = await this.proxy.forward({
            method: 'GET',
            targetUrl: `${this.gestaoUrl}/gestao/assinaturas/${tipo}`,
            headers: {},
            body: undefined,
        });

        return result.body;
    }

    @Get('gestao/assinaturascliente/:codcli')
    async getAssinaturasCliente(@Param('codcli') codcli: string) {
        const result = await this.proxy.forward({
            method: 'GET',
            targetUrl: `${this.gestaoUrl}/gestao/assinaturascliente/${codcli}`,
            headers: {},
            body: undefined,
        });

        return result.body;
    }

    @Get('gestao/assinaturasplano/:codplano')
    async getAssinaturasPlano(@Param('codplano') codplano: string) {
        const result = await this.proxy.forward({
            method: 'GET',
            targetUrl: `${this.gestaoUrl}/gestao/assinaturasplano/${codplano}`,
            headers: {},
            body: undefined,
        });

        return result.body;
    }
}