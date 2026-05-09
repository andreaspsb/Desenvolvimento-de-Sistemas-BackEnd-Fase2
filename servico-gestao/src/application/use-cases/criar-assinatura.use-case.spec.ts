import { NotFoundException } from '@nestjs/common';
import { CriarAssinaturaUseCase } from './criar-assinatura.use-case';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { IPlanoRepository } from '../../domain/repositories/plano.repository';
import { IClienteRepository } from '../../domain/repositories/cliente.repository';
import { Plano } from '../../domain/entities/plano.entity';
import { Cliente } from '../../domain/entities/cliente.entity';
import { Assinatura } from '../../domain/entities/assinatura.entity';

describe('CriarAssinaturaUseCase', () => {
  let useCase: CriarAssinaturaUseCase;
  let assinaturaRepo: jest.Mocked<IAssinaturaRepository>;
  let planoRepo: jest.Mocked<IPlanoRepository>;
  let clienteRepo: jest.Mocked<IClienteRepository>;

  beforeEach(() => {
    assinaturaRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByCliente: jest.fn(),
      findByPlano: jest.fn(),
    } as jest.Mocked<IAssinaturaRepository>;

    planoRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      updateCustoMensal: jest.fn(),
    } as jest.Mocked<IPlanoRepository>;

    clienteRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<IClienteRepository>;

    useCase = new CriarAssinaturaUseCase(assinaturaRepo, planoRepo, clienteRepo);
  });

  it('deve criar assinatura quando plano e cliente existem', async () => {
    const plano = new Plano(1, 'Plano Básico', 79.9, new Date(), 'Internet 100MB');
    const cliente = new Cliente(1, 'Ana Silva', 'ana@email.com');
    const hoje = new Date();
    const fimFidelidade = new Date(hoje);
    fimFidelidade.setFullYear(fimFidelidade.getFullYear() + 1);
    const assinaturaMock = new Assinatura(1, 1, 1, hoje, fimFidelidade, 79.9, 'Assinatura do plano Plano Básico');

    planoRepo.findById.mockResolvedValue(plano);
    clienteRepo.findById.mockResolvedValue(cliente);
    assinaturaRepo.create.mockResolvedValue(assinaturaMock);

    const resultado = await useCase.execute(1, 1);

    expect(planoRepo.findById).toHaveBeenCalledWith(1);
    expect(clienteRepo.findById).toHaveBeenCalledWith(1);
    expect(assinaturaRepo.create).toHaveBeenCalledWith(1, 1);
    expect(resultado.codPlano).toBe(1);
    expect(resultado.codCli).toBe(1);
  });

  it('deve lançar NotFoundException quando plano não existir', async () => {
    planoRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(99, 1)).rejects.toThrow(NotFoundException);
    expect(assinaturaRepo.create).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException quando cliente não existir', async () => {
    const plano = new Plano(1, 'Plano Básico', 79.9, new Date(), 'Internet 100MB');
    planoRepo.findById.mockResolvedValue(plano);
    clienteRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(1, 99)).rejects.toThrow(NotFoundException);
    expect(assinaturaRepo.create).not.toHaveBeenCalled();
  });
});