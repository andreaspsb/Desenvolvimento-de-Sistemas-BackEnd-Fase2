export class Assinatura {
  constructor(
    public readonly codigo: number,
    public codPlano: number,
    public codCli: number,
    public inicioFidelidade: Date,
    public fimFidelidade: Date,
    public dataUltimoPagamento: Date,
    public custoFinal: number,
    public descricao: string,
  ) { }

  // Regra de domínio: ATIVO = dataUltimoPagamento < 30 dias
  get ativa(): boolean {
    const hoje = new Date();
    const diffMs = hoje.getTime() - this.dataUltimoPagamento.getTime();
    const diffDias = diffMs / (1000 * 60 * 60 * 24);
    return diffDias < 30;
  }
}