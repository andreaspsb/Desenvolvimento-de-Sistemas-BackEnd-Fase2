import { RegistrarPagamentoAssinaturaUseCase } from './registrar-pagamento-assinatura.use-case';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';

class AssinaturaRepositoryFake implements IAssinaturaRepository {
    public assinaturas: Assinatura[] = [
        new Assinatura(
            1,
            1,
            1,
            new Date('2026-01-01T00:00:00.000Z'),
            new Date('2027-01-01T00:00:00.000Z'),
            new Date('2026-05-01T00:00:00.000Z'),
            99.9,
            'Assinatura teste',
        ),
    ];

    async create(codPlano: number, codCli: number): Promise<Assinatura> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<Assinatura[]> {
        return this.assinaturas;
    }

    async findByCliente(codCli: number): Promise<Assinatura[]> {
        return this.assinaturas.filter((a) => a.codCli === codCli);
    }

    async findByPlano(codPlano: number): Promise<Assinatura[]> {
        return this.assinaturas.filter((a) => a.codPlano === codPlano);
    }

    async updateDataUltimoPagamento(
        codigo: number,
        dataUltimoPagamento: Date,
    ): Promise<Assinatura> {
        const assinatura = this.assinaturas.find((a) => a.codigo === codigo);

        if (!assinatura) {
            throw new Error('Assinatura nao encontrada');
        }

        assinatura.dataUltimoPagamento = dataUltimoPagamento;
        return assinatura;
    }
}

describe('RegistrarPagamentoAssinaturaUseCase', () => {
    it('deve atualizar data do ultimo pagamento da assinatura', async () => {
        const assinaturaRepository = new AssinaturaRepositoryFake();
        const useCase = new RegistrarPagamentoAssinaturaUseCase(
            assinaturaRepository,
        );

        const dataPagamento = new Date('2026-06-14T00:00:00.000Z');

        const assinatura = await useCase.execute({
            codAss: 1,
            dataPagamento,
        });

        expect(assinatura.codigo).toBe(1);
        expect(assinatura.dataUltimoPagamento).toEqual(dataPagamento);
    });
});