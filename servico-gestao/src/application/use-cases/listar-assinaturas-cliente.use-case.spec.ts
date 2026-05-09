import { ListarAssinaturasClienteUseCase } from './listar-assinaturas-cliente.use-case';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

describe('ListarAssinaturasClienteUseCase', () => {
  let useCase: ListarAssinaturasClienteUseCase;
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

    useCase = new ListarAssinaturasClienteUseCase(assinaturaRepo);
  });

  it('deve retornar assinaturas de um cliente específico', async () => {
    const assinaturasMock = [
      new Assinatura(1, 1, 3, hoje, anoQueVem, 79.9, 'Assinatura 1'),
      new Assinatura(2, 2, 3, hoje, anoQueVem, 99.9, 'Assinatura 2'),
    ];
    assinaturaRepo.findByCliente.mockResolvedValue(assinaturasMock);

    const resultado = await useCase.execute(3);

    expect(assinaturaRepo.findByCliente).toHaveBeenCalledWith(3);
    expect(resultado).toHaveLength(2);
    expect(resultado[0].codCli).toBe(3);
  });

  it('deve retornar lista vazia quando cliente não tem assinaturas', async () => {
    assinaturaRepo.findByCliente.mockResolvedValue([]);
    const resultado = await useCase.execute(99);
    expect(resultado).toHaveLength(0);
  });
});