# Desenvolvimento de Sistemas Back-End - Fase 2

Repositorio da disciplina **Desenvolvimento de Sistemas Back-End** - Andreas Berwaldt.

Esta fase finaliza o sistema de controle de planos de operadora com tres servicos, API Gateway, bancos independentes e comunicacao assincrona por message broker.

## Estrutura

```text
.
├── api-gateway/             # Entrada HTTP unica na porta 3000
├── servico-gestao/          # Clientes, planos e assinaturas
├── servico-faturamento/     # Registro de pagamentos
├── servico-planos-ativos/   # Consulta rapida de assinaturas ativas
├── docs/                    # Arquivos-fonte da documentacao durante o desenvolvimento
└── docker-compose.yml       # PostgreSQL gestao, PostgreSQL faturamento e RabbitMQ
```

## Arquitetura

- **API Gateway** encaminha as chamadas HTTP externas.
- **ServicoGestao** mantem clientes, planos e assinaturas em PostgreSQL proprio.
- **ServicoFaturamento** registra pagamentos em PostgreSQL proprio e publica evento no RabbitMQ.
- **ServicoPlanosAtivos** responde rapidamente se uma assinatura esta ativa, usando cache em memoria.
- **RabbitMQ** distribui eventos de pagamento para o ServicoGestao e o ServicoPlanosAtivos.

Regra de assinatura ativa: uma assinatura permanece ativa quando `dataUltimoPagamento` esta a menos de 30 dias da data atual. `fimFidelidade` continua existindo para representar o periodo promocional/fidelidade, mas nao define se o servico esta ativo.

## Portas

| Recurso | Porta |
|---|---:|
| API Gateway | 3000 |
| ServicoGestao | 3001 |
| ServicoFaturamento | 3002 |
| ServicoPlanosAtivos | 3003 |
| PostgreSQL Gestao | 5433 |
| PostgreSQL Faturamento | 5434 |
| RabbitMQ | 5672 |
| RabbitMQ Management | 15672 |

## Execucao

1. Suba a infraestrutura:

```bash
docker compose up -d
```

2. Instale dependencias em cada servico:

```bash
cd servico-gestao && npm install
cd ../servico-faturamento && npm install
cd ../servico-planos-ativos && npm install
cd ../api-gateway && npm install
```

3. Configure os arquivos `.env` a partir dos `.env.example` de cada servico.

4. Prepare os bancos:

```bash
cd servico-gestao
npx prisma generate
npx prisma migrate deploy
npm run seed

cd ../servico-faturamento
npx prisma generate
npx prisma migrate deploy
```

5. Inicie os quatro servicos em terminais separados:

```bash
cd servico-gestao && npm run start
cd servico-faturamento && npm run start
cd servico-planos-ativos && npm run start
cd api-gateway && npm run start
```

## Endpoints via Gateway

Base URL: `http://localhost:3000`

| Metodo | Rota | Descricao |
|---|---|---|
| GET | `/gestao/clientes` | Lista clientes |
| GET | `/gestao/planos` | Lista planos |
| POST | `/gestao/assinaturas` | Cria assinatura |
| PATCH | `/gestao/planos/:idPlano` | Atualiza custo mensal do plano |
| GET | `/gestao/assinaturas/:tipo` | Lista assinaturas por `TODOS`, `ATIVOS` ou `CANCELADOS` |
| GET | `/gestao/assinaturascliente/:codcli` | Lista assinaturas de um cliente |
| GET | `/gestao/assinaturasplano/:codplano` | Lista assinaturas de um plano |
| POST | `/registrarpagamento` | Registra pagamento e publica evento |
| GET | `/planosativos/:codass` | Retorna `true` ou `false` para assinatura ativa |

## Validacao

Testes executados:

- `servico-gestao`: 27 testes passando
- `servico-faturamento`: 8 testes passando
- `servico-planos-ativos`: 9 testes passando
- `api-gateway`: 5 testes passando

Tambem foi validado fluxo integrado via gateway:

1. `GET /gestao/clientes`
2. `GET /planosativos/1`
3. `POST /registrarpagamento`
4. `GET /planosativos/1`

## Entrega

Nao incluir no arquivo zip:

- `node_modules/`
- `dist/`
- `.env`

Incluir os arquivos fonte, `docker-compose.yml`, os PDFs finais de instrucao/relatorio e a collection Postman atualizada.
