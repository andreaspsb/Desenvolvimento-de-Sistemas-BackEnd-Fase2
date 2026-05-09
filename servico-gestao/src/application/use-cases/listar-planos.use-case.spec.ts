import { ListarPlanosUseCase } from './listar-planos.use-case';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { Plano } from '../../domain/entities/plano.entity';

describe('ListarPlanosUseCase', () => {
  let useCase: ListarPlanosUseCase;
  let repositoryMock: jest.Mocked<IPlanoRepository>;

  beforeEach(() => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      updateCustoMensal: jest.fn(),
    } as jest.Mocked<IPlanoRepository>;

    useCase = new ListarPlanosUseCase(repositoryMock);
  });

  it('deve retornar a lista de planos', async () => {
    const planosMock = [
      new Plano(1, 'Plano Básico', 79.9, new Date(), 'Internet 100MB'),
      new Plano(2, 'Plano Premium', 199.9, new Date(), 'Internet 1GB'),
    ];
    repositoryMock.findAll.mockResolvedValue(planosMock);

    const resultado = await useCase.execute();

    expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(resultado).toHaveLength(2);
    expect(resultado[0].nome).toBe('Plano Básico');
  });

  it('deve retornar lista vazia quando não há planos', async () => {
    repositoryMock.findAll.mockResolvedValue([]);

    const resultado = await useCase.execute();

    expect(resultado).toHaveLength(0);
  });
});