import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 5 Planos
  const planos = await Promise.all([
    prisma.plano.create({ data: { nome: 'Plano Básico', custoMensal: 79.90, descricao: 'Internet fibra 100MB' } }),
    prisma.plano.create({ data: { nome: 'Plano Intermediário', custoMensal: 119.90, descricao: 'Internet fibra 300MB + TV' } }),
    prisma.plano.create({ data: { nome: 'Plano Avançado', custoMensal: 159.90, descricao: 'Internet fibra 500MB + TV + Fixo' } }),
    prisma.plano.create({ data: { nome: 'Plano Premium', custoMensal: 219.90, descricao: 'Internet fibra 1GB + TV + Fixo + Móvel' } }),
    prisma.plano.create({ data: { nome: 'Plano Empresarial', custoMensal: 399.90, descricao: 'Internet fibra 2GB dedicada + IP fixo' } }),
  ]);

  // 10 Clientes
  const clientes = await Promise.all([
    prisma.cliente.create({ data: { nome: 'Ana Silva', email: 'ana@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Bruno Costa', email: 'bruno@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Carla Souza', email: 'carla@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Diego Mendes', email: 'diego@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Elena Torres', email: 'elena@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Felipe Lima', email: 'felipe@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Gabriela Rocha', email: 'gabriela@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Henrique Dias', email: 'henrique@email.com' } }),
    prisma.cliente.create({ data: { nome: 'Isabela Nunes', email: 'isabela@email.com' } }),
    prisma.cliente.create({ data: { nome: 'João Ferreira', email: 'joao@email.com' } }),
  ]);

  // 5 Assinaturas (algumas ativas, uma cancelada)
  const hoje = new Date();
  const anoPassado = new Date(hoje);
  anoPassado.setFullYear(anoPassado.getFullYear() - 1);
  const anoQueVem = new Date(hoje);
  anoQueVem.setFullYear(anoQueVem.getFullYear() + 1);

  await Promise.all([
    prisma.assinatura.create({ data: { codPlano: planos[0].codigo, codCli: clientes[0].codigo, inicioFidelidade: hoje, fimFidelidade: anoQueVem, custoFinal: planos[0].custoMensal, descricao: `Assinatura do plano ${planos[0].nome}` } }),
    prisma.assinatura.create({ data: { codPlano: planos[1].codigo, codCli: clientes[1].codigo, inicioFidelidade: hoje, fimFidelidade: anoQueVem, custoFinal: planos[1].custoMensal, descricao: `Assinatura do plano ${planos[1].nome}` } }),
    prisma.assinatura.create({ data: { codPlano: planos[2].codigo, codCli: clientes[2].codigo, inicioFidelidade: hoje, fimFidelidade: anoQueVem, custoFinal: planos[2].custoMensal, descricao: `Assinatura do plano ${planos[2].nome}` } }),
    prisma.assinatura.create({ data: { codPlano: planos[3].codigo, codCli: clientes[3].codigo, inicioFidelidade: hoje, fimFidelidade: anoQueVem, custoFinal: planos[3].custoMensal, descricao: `Assinatura do plano ${planos[3].nome}` } }),
    // Assinatura cancelada (fimFidelidade no passado)
    prisma.assinatura.create({ data: { codPlano: planos[4].codigo, codCli: clientes[4].codigo, inicioFidelidade: anoPassado, fimFidelidade: anoPassado, custoFinal: planos[4].custoMensal, descricao: `Assinatura do plano ${planos[4].nome}` } }),
  ]);

  console.log('Seed concluído!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());