# ServicoGestao

Servico principal do sistema de controle de planos de operadora.

Na Fase 2, o ServicoGestao continua responsavel por clientes, planos e assinaturas, e passa a consumir eventos de pagamento publicados pelo ServicoFaturamento para atualizar `dataUltimoPagamento`.

## Stack

| Tecnologia | Versao |
|---|---|
| Node.js | 20+ |
| TypeScript | 5.x |
| NestJS | 11.x |
| Prisma ORM | 7.x |
| PostgreSQL | 16 |
| RabbitMQ | 3.x |
| Jest | 30.x |

Arquitetura: **Clean Architecture** (`domain / application / infrastructure / presentation`).

## Variaveis de Ambiente

Crie `.env` a partir de `.env.example`:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/servico_gestao?schema=public"
RABBITMQ_URL="amqp://localhost:5672"
```

## Execucao

Na raiz do repositorio, suba PostgreSQL e RabbitMQ:

```bash
docker compose up -d
```

Dentro de `servico-gestao`:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run start
```

O servico roda em `http://localhost:3001`.

## Endpoints

| Metodo | Rota | Descricao |
|---|---|---|
| GET | `/gestao/clientes` | Lista todos os clientes |
| GET | `/gestao/planos` | Lista todos os planos |
| POST | `/gestao/assinaturas` | Cria uma assinatura |
| PATCH | `/gestao/planos/:idPlano` | Atualiza custo mensal de um plano |
| GET | `/gestao/assinaturas/:tipo` | Lista assinaturas (`TODOS`, `ATIVOS`, `CANCELADOS`) |
| GET | `/gestao/assinaturascliente/:codcli` | Lista assinaturas de um cliente |
| GET | `/gestao/assinaturasplano/:codplano` | Lista assinaturas de um plano |
| GET | `/gestao/assinatura/:codass/status` | Retorna `true` ou `false` para assinatura ativa |

Body do POST `/gestao/assinaturas`:

```json
{ "codPlano": 1, "codCli": 1 }
```

Body do PATCH `/gestao/planos/:idPlano`:

```json
{ "custoMensal": 99.9 }
```

## Eventos

O servico observa eventos de pagamento no exchange RabbitMQ `pagamentos`.

Payload esperado:

```json
{
  "codAss": 1,
  "valorPago": 99.9,
  "dataPagamento": "2026-06-14T00:00:00.000Z"
}
```

Ao receber o evento, o ServicoGestao atualiza `dataUltimoPagamento` da assinatura indicada por `codAss`.

## Regra de Assinatura Ativa

Uma assinatura esta ativa quando `dataUltimoPagamento` ocorreu ha menos de 30 dias. O campo `fimFidelidade` representa o periodo de fidelidade/promocionalidade e nao determina o bloqueio do servico.

## Testes

```bash
npm test
```

Resultado validado:

```text
Test Suites: 13 passed, 13 total
Tests:       27 passed, 27 total
```
