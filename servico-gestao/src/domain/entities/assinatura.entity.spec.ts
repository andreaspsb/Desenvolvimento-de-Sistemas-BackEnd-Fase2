import { Assinatura } from './assinatura.entity';

describe('Assinatura Entity', () => {
  const hoje = new Date();

  const anoQueVem = new Date(hoje);
  anoQueVem.setFullYear(anoQueVem.getFullYear() + 1);

  const anoPassado = new Date(hoje);
  anoPassado.setFullYear(anoPassado.getFullYear() - 1);

  it('deve estar ativa quando fimFidelidade é no futuro', () => {
    const assinatura = new Assinatura(1, 1, 1, hoje, anoQueVem, 79.9, 'Ativa');
    expect(assinatura.ativa).toBe(true);
  });

  it('deve estar cancelada quando fimFidelidade é no passado', () => {
    const assinatura = new Assinatura(2, 1, 1, anoPassado, anoPassado, 79.9, 'Cancelada');
    expect(assinatura.ativa).toBe(false);
  });
});