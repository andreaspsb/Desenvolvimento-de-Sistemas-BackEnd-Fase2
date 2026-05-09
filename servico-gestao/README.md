# ServicoGestao

API REST de controle de planos de internet, desenvolvida para a disciplina **Desenvolvimento de Sistemas Back-End — Fase 1**.

**Aluno:** Andreas Berwaldt

## Stack

| Tecnologia | Versão |
|---|---|
| Node.js | 20+ |
| TypeScript | 5.x |
| NestJS | 11.x |
| Prisma ORM | 7.x |
| PostgreSQL | 16 |
| Docker | 24+ |
| Jest | 29.x |

Arquitetura: **Clean Architecture** (domain / application / infrastructure / presentation)

## Pré-requisitos

- Node.js v20+
- Docker Desktop

## Configuração e execução

```bash
# 1. Subir o banco de dados (PostgreSQL na porta 5433)
docker compose up -d

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Instalar dependências
npm install

# 4. Executar migrations
npx prisma migrate deploy

# 5. Popular o banco (10 clientes, 5 planos, 5 assinaturas)
npx ts-node prisma/seed.ts

# 6. Iniciar o servidor (porta 3001)
npm run start:dev
```

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/gestao/clientes` | Lista todos os clientes |
| GET | `/gestao/planos` | Lista todos os planos |
| POST | `/gestao/assinaturas` | Cria uma assinatura |
| PATCH | `/gestao/planos/:idPlano` | Atualiza custo mensal de um plano |
| GET | `/gestao/assinaturas/:tipo` | Lista assinaturas (TODOS, ATIVOS, CANCELADOS) |
| GET | `/gestao/assinaturascliente/:codcli` | Assinaturas de um cliente |
| GET | `/gestao/assinaturasplano/:codplano` | Assinaturas de um plano |

Body do POST `/gestao/assinaturas`:
```json
{ "codPlano": 1, "codCli": 1 }
```

Body do PATCH `/gestao/planos/:idPlano`:
```json
{ "custoMensal": 99.90 }
```

## Testes

```bash
npm test
```

18 testes passando em 8 suites (use cases + entidade Assinatura).

## Parar o ambiente

```bash
docker compose down
```
