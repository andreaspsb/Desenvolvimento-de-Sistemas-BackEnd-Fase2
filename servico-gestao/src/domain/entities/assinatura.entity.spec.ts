import { Assinatura } from './assinatura.entity';

describe('Assinatura Entity', () => {
  const hoje = new Date();

  const anoQueVem = new Date(hoje);
  anoQueVem.setFullYear(anoQueVem.getFullYear() + 1);

  const anoPassado = new Date(hoje);
  anoPassado.setFullYear(anoPassado.getFullYear() - 1);

  it('deve estar ativa quando dataUltimoPagamento é menor que 30 dias, mesmo com fimFidelidade no passado', () => {
    const dezDiasAtras = new Date(hoje);
    dezDiasAtras.setDate(dezDiasAtras.getDate() - 10);

    const assinatura = new Assinatura(
      1,
      1,
      1,
      anoPassado,
      anoPassado,
      dezDiasAtras,
      79.9,
      'Ativa',
    );

    expect(assinatura.ativa).toBe(true);
  });

  it('deve estar cancelada quando dataUltimoPagamento é igual ou maior que 30 dias', () => {
    const trintaDiasAtras = new Date(hoje);
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const assinatura = new Assinatura(
      2,
      1,
      1,
      hoje,
      anoQueVem,
      trintaDiasAtras,
      79.9,
      'Cancelada',
    );

    expect(assinatura.ativa).toBe(false);
  });
});