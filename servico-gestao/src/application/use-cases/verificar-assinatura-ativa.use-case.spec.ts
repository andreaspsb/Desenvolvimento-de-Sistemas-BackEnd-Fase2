import { VerificarAssinaturaAtivaUseCase } from './verificar-assinatura-ativa.use-case';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';

class AssinaturaRepositoryFake implements IAssinaturaRepository {
    constructor(private readonly assinatura: Assinatura | null) { }

    async create(codPlano: number, codCli: number): Promise<Assinatura> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<Assinatura[]> {
        return [];
    }

    async findByCliente(codCli: number): Promise<Assinatura[]> {
        return [];
    }

    async findByPlano(codPlano: number): Promise<Assinatura[]> {
        return [];
    }

    async updateDataUltimoPagamento(
        codigo: number,
        dataUltimoPagamento: Date,
    ): Promise<Assinatura> {
        throw new Error('Method not implemented.');
    }

    async findById(codigo: number): Promise<Assinatura | null> {
        if (this.assinatura?.codigo === codigo) {
            return this.assinatura;
        }

        return null;
    }
}

describe('VerificarAssinaturaAtivaUseCase', () => {
    it('deve retornar true quando assinatura esta ativa', async () => {
        const assinatura = new Assinatura(
            1,
            1,
            1,
            new Date('2026-01-01T00:00:00.000Z'),
            new Date('2027-01-01T00:00:00.000Z'),
            new Date(),
            99.9,
            'Assinatura ativa',
        );

        const useCase = new VerificarAssinaturaAtivaUseCase(
            new AssinaturaRepositoryFake(assinatura),
        );

        await expect(useCase.execute(1)).resolves.toBe(true);
    });

    it('deve retornar false quando assinatura nao existe', async () => {
        const useCase = new VerificarAssinaturaAtivaUseCase(
            new AssinaturaRepositoryFake(null),
        );

        await expect(useCase.execute(999)).resolves.toBe(false);
    });
});