import { ListarClientesUseCase } from './listar-clientes.use-case';
import { IClienteRepository } from '../../domain/repositories/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

describe('ListarClientesUseCase', () => {
  let useCase: ListarClientesUseCase;
  let clienteRepo: jest.Mocked<IClienteRepository>;

  beforeEach(() => {
    clienteRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<IClienteRepository>;

    useCase = new ListarClientesUseCase(clienteRepo);
  });

  it('deve retornar a lista de clientes', async () => {
    const clientesMock = [
      new Cliente(1, 'Ana Silva', 'ana@email.com'),
      new Cliente(2, 'Bruno Costa', 'bruno@email.com'),
    ];
    clienteRepo.findAll.mockResolvedValue(clientesMock);

    const resultado = await useCase.execute();

    expect(clienteRepo.findAll).toHaveBeenCalledTimes(1);
    expect(resultado).toHaveLength(2);
    expect(resultado[0].nome).toBe('Ana Silva');
  });

  it('deve retornar lista vazia quando não há clientes', async () => {
    clienteRepo.findAll.mockResolvedValue([]);
    const resultado = await useCase.execute();
    expect(resultado).toHaveLength(0);
  });
});