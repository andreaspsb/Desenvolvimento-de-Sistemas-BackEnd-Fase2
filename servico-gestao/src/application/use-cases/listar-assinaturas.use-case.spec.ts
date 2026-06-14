import { ListarAssinaturasUseCase } from './listar-assinaturas.use-case';
import { IAssinaturaRepository } from '../../domain/repositories/assinatura.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';

describe('ListarAssinaturasUseCase', () => {
  let useCase: ListarAssinaturasUseCase;
  let assinaturaRepo: jest.Mocked<IAssinaturaRepository>;

  const hoje = new Date();
  const anoQueVem = new Date(hoje);
  anoQueVem.setFullYear(anoQueVem.getFullYear() + 1);
  const anoPassado = new Date(hoje);
  anoPassado.setFullYear(anoPassado.getFullYear() - 1);
  const dezDiasAtras = new Date(hoje);
  dezDiasAtras.setDate(dezDiasAtras.getDate() - 10);
  const trintaDiasAtras = new Date(hoje);
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

  const assinaturaAtiva = new Assinatura(1, 1, 1, anoPassado, anoPassado, dezDiasAtras, 79.9, 'Ativa');
  const assinaturaCancelada = new Assinatura(2, 2, 2, hoje, anoQueVem, trintaDiasAtras, 99.9, 'Cancelada');

  beforeEach(() => {
    assinaturaRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByCliente: jest.fn(),
      findByPlano: jest.fn(),
    } as jest.Mocked<IAssinaturaRepository>;

    useCase = new ListarAssinaturasUseCase(assinaturaRepo);
    assinaturaRepo.findAll.mockResolvedValue([assinaturaAtiva, assinaturaCancelada]);
  });

  it('deve retornar todas as assinaturas quando tipo é TODOS', async () => {
    const resultado = await useCase.execute('TODOS');
    expect(resultado).toHaveLength(2);
  });

  it('deve retornar apenas assinaturas ativas quando tipo é ATIVOS', async () => {
    const resultado = await useCase.execute('ATIVOS');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].codigo).toBe(1);
  });

  it('deve retornar apenas assinaturas canceladas quando tipo é CANCELADOS', async () => {
    const resultado = await useCase.execute('CANCELADOS');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].codigo).toBe(2);
  });
});