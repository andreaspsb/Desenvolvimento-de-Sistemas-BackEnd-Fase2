import { Inject, Injectable, Optional } from '@nestjs/common';
import { IGestaoClient } from '../../domain/clients/gestao.client';

@Injectable()
export class HttpGestaoClient implements IGestaoClient {
    constructor(
        @Optional()
        @Inject('GESTAO_URL')
        private readonly baseUrl = process.env.GESTAO_URL ?? 'http://localhost:3001',
    ) { }

    async verificarAssinaturaAtiva(codAss: number): Promise<boolean> {
        const response = await fetch(
            `${this.baseUrl}/gestao/assinatura/${codAss}/status`,
        );

        if (!response.ok) {
            return false;
        }

        return response.json();
    }
}