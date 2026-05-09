import { NotFoundException } from '@nestjs/common';
import { AtualizarCustoPlanoUseCase } from './atualizar-custo-plano.use-case';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { Plano } from '../../domain/entities/plano.entity';

describe('AtualizarCustoPlanoUseCase', () => {
  let useCase: AtualizarCustoPlanoUseCase;
  let planoRepo: jest.Mocked<IPlanoRepository>;

  beforeEach(() => {
    planoRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      updateCustoMensal: jest.fn(),
    } as jest.Mocked<IPlanoRepository>;

    useCase = new AtualizarCustoPlanoUseCase(planoRepo);
  });

  it('deve atualizar o custo mensal quando o plano existe', async () => {
    const planoOriginal = new Plano(1, 'Plano Básico', 79.9, new Date(), 'Internet 100MB');
    const planoAtualizado = new Plano(1, 'Plano Básico', 89.9, new Date(), 'Internet 100MB');

    planoRepo.findById.mockResolvedValue(planoOriginal);
    planoRepo.updateCustoMensal.mockResolvedValue(planoAtualizado);

    const resultado = await useCase.execute(1, 89.9);

    expect(planoRepo.findById).toHaveBeenCalledWith(1);
    expect(planoRepo.updateCustoMensal).toHaveBeenCalledWith(1, 89.9);
    expect(resultado.custoMensal).toBe(89.9);
  });

  it('deve lançar NotFoundException quando o plano não existir', async () => {
    planoRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(99, 89.9)).rejects.toThrow(NotFoundException);
    expect(planoRepo.updateCustoMensal).not.toHaveBeenCalled();
  });
});