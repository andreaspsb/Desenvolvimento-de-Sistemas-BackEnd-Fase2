import { ListarAssinaturasPlanoUseCase } from './listar-assinaturas-plano.use-case';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

describe('ListarAssinaturasPlanoUseCase', () => {
  let useCase: ListarAssinaturasPlanoUseCase;
  let assinaturaRepo: jest.Mocked<IAssinaturaRepository>;

  const hoje = new Date();
  const anoQueVem = new Date(hoje);
  anoQueVem.setFullYear(anoQueVem.getFullYear() + 1);

  beforeEach(() => {
    assinaturaRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByCliente: jest.fn(),
      findByPlano: jest.fn(),
    } as jest.Mocked<IAssinaturaRepository>;

    useCase = new ListarAssinaturasPlanoUseCase(assinaturaRepo);
  });

  it('deve retornar assinaturas de um plano específico', async () => {
    const assinaturasMock = [
      new Assinatura(1, 2, 1, hoje, anoQueVem, 119.9, 'Assinatura 1'),
      new Assinatura(2, 2, 3, hoje, anoQueVem, 119.9, 'Assinatura 2'),
    ];
    assinaturaRepo.findByPlano.mockResolvedValue(assinaturasMock);

    const resultado = await useCase.execute(2);

    expect(assinaturaRepo.findByPlano).toHaveBeenCalledWith(2);
    expect(resultado).toHaveLength(2);
    expect(resultado[0].codPlano).toBe(2);
  });

  it('deve retornar lista vazia quando plano não tem assinantes', async () => {
    assinaturaRepo.findByPlano.mockResolvedValue([]);
    const resultado = await useCase.execute(99);
    expect(resultado).toHaveLength(0);
  });
});