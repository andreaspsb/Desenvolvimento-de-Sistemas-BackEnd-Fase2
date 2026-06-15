# Plano de Desenvolvimento - Fase 2

## Objetivo

Finalizar o sistema de controle de planos com microsservicos integrados ao ServicoGestao, conforme enunciado da Fase 2.

## Arquitetura Escolhida

- **API Gateway** na porta `3000`.
- **ServicoGestao** na porta `3001`, com PostgreSQL proprio.
- **ServicoFaturamento** na porta `3002`, com PostgreSQL proprio.
- **ServicoPlanosAtivos** na porta `3003`, com cache em memoria.
- **RabbitMQ** como message broker.

## Decisoes

- Manter NestJS + TypeScript em todos os servicos.
- Manter Prisma 7 nos servicos com banco.
- Usar RabbitMQ com exchange `pagamentos` do tipo `fanout`.
- Usar cache em memoria no ServicoPlanosAtivos, suficiente para a entrega academica.
- Fazer o ServicoPlanosAtivos consultar o ServicoGestao em cache miss, evitando duplicar a regra de dominio.
- Considerar assinatura ativa quando `dataUltimoPagamento` ocorreu ha menos de 30 dias.

## Ciclos de Implementacao

### 1. ServicoFaturamento

- Criar entidade `Pagamento`.
- Criar caso de uso `RegistrarPagamentoUseCase`.
- Validar pagamento com `valorPago > 0`.
- Persistir pagamento com Prisma.
- Publicar evento de pagamento no RabbitMQ.
- Expor `POST /registrarpagamento`.

### 2. ServicoGestao

- Adicionar metodo de repositorio para atualizar `dataUltimoPagamento`.
- Criar caso de uso para registrar pagamento recebido por evento.
- Criar caso de uso para verificar assinatura ativa por codigo.
- Expor `GET /gestao/assinatura/:codass/status`.
- Consumir eventos de pagamento do RabbitMQ.

### 3. ServicoPlanosAtivos

- Criar caso de uso para verificar plano ativo.
- Criar cache em memoria.
- Criar client HTTP para consultar o ServicoGestao.
- Expor `GET /planosativos/:codass`.
- Consumir eventos de pagamento e invalidar cache.

### 4. API Gateway

- Encaminhar rotas `/gestao/*` para o ServicoGestao.
- Encaminhar `/registrarpagamento` para o ServicoFaturamento.
- Encaminhar `/planosativos/:codass` para o ServicoPlanosAtivos.

### 5. Infraestrutura

- Criar `docker-compose.yml` raiz com:
  - PostgreSQL Gestao em `5433`;
  - PostgreSQL Faturamento em `5434`;
  - RabbitMQ em `5672`;
  - RabbitMQ Management em `15672`.

## Verificacao

Comandos executados por servico:

```bash
npm test
npm run build
```

Resultados:

```text
servico-gestao:         27 testes
servico-faturamento:    8 testes
servico-planos-ativos:  9 testes
api-gateway:            5 testes
```

Fluxo integrado validado pelo gateway:

1. `GET /gestao/clientes`
2. `GET /planosativos/1`
3. `POST /registrarpagamento`
4. `GET /planosativos/1`

## Entregaveis

- Codigo-fonte dos quatro servicos.
- `docker-compose.yml` com infraestrutura.
- Documentacao de execucao.
- Relatorio.
- Arquivo Postman atualizado para a Fase 2.

Nao incluir no zip:

- `node_modules/`
- `dist/`
- `.env`
