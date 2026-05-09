Valor da fase

4
Fase Individual
Datas e prazos

Prazo regular:

06/05/2026 até

17/06/2026


Prazo em atraso:

18/06/2026 até

24/06/2026


Período de refação:

25/06/2026 a

01/07/2026


Enunciado da fase 2

Esta fase objetiva a finalização do sistema proposto. Nela, dois microsserviços serão implementados e integrados ao ServicoGestao:

- ServicoFaturamento: responsável por gerenciar cobranças e pagamentos dos clientes.

- ServicoPlanosAtivos: responsável por consultar e retornar informações sobre planos ativos de cada cliente.

Os microsserviços deverão ser integrados ao serviço principal em um ambiente que conte com todos os recursos necessários para a correta execução e comunicação dos serviços, conforme apresentado durante o curso (utilizar API gateway ou name server + message broker).

Entregáveis da Fase 2

Um arquivo “.zip” contendo:

• Um documento em PDF com orientações para executar o sistema.

     - A seção de conclusão do documento deverá descrever como se deu o desenvolvimento da fase: desafios encontrados e como foram resolvidos (podendo citar links de referência que auxiliaram a desenvolver determinadas partes do sistema e etc.). Em caso de entrega em fase de refação, esta seção deverá listar os pontos que foram ajustados de acordo com o feedback recebido.

• Todos os arquivos fonte (exceto a pasta node_modules) organizados na estrutura de pastas necessária para sua correta execução.

• Um arquivo da ferramenta Postman, conforme o template disponibilizado (template.postman_collection.json), atualizado se necessário.

Exemplo de entregáveis esperados nesta fase (em um zip): A imagem abaixo mostra uma pasta com o seguinte nome: "seu_nome-desenvol-sistemas-backend-fase-2". Dentro desta pasta você encontra outras pastas com os seguintes nomes: "servico-gestao", “servico-planos-ativos", “servico-faturamento”, “api-gateway”; um arquivo .json com o nome "seu_nome_Desenvolvimento_de_Sistemas_backend_Fase-2.postman_collection" e um arquivo PDF com o nome "seu_nome_relatório".

Critérios de Avaliação


Descrição
Valor
O texto descreve como implantar a aplicação e como executar ela corretamente; é possível executar o sistema a partir do texto e dos arquivos entregues

1.5
Dimensões
1.5 - O texto descreve como implantar a aplicação e como executá-la corretamente; é possível executar o sistema a partir do texto e dos arquivos entregues

0.75 - É possível implantar e executar o sistema, mas as instruções apresentadas no texto estão incompletas

0 - Não é possível executar o sistema ou o texto não apresenta instruções consistentes


Descrição
Valor
O sistema apresenta os três serviços solicitados com as funcionalidades especificadas; a infraestrutura necessária para os microsserviços está implantada (gateway ou name server; message broker); cada serviço possui seu banco de dados próprio com os mecanismos adequados para garantia de consistência quando for o caso; os serviços se comunicam conforme especificado

2
Dimensões
2 - O sistema apresenta os três serviços solicitados com as funcionalidades especificadas; a infraestrutura necessária para os microsserviços está implantada (gateway ou name server; message broker); cada serviço possui seu banco de dados próprio com os mecanismos adequados para garantia de consistência quando for o caso; os serviços se comunicam conforme especificado

1.5 - O sistema apresenta os três serviços solicitados com as funcionalidades especificadas; a infraestrutura necessária para os microsserviços não está implantada ou nem todos os serviços possuem seu banco de dados próprio ou os mecanismos adequados para garantia de consistência quando for o caso não foram implantados; os serviços se comunicam conforme especificado

1 - O sistema apresenta os três serviços solicitados com as funcionalidades especificadas e atende pelo menos a dois dos itens a seguir: a infraestrutura necessária para os microsserviços está implantada; cada serviço possui seu banco de dados próprio com os mecanismos adequados para garantia de consistência quando for o caso; nem todos os serviços se comunicam conforme especificado

0 - A maioria das funcionalidades do sistema não funciona corretamente ou menos de dois dos itens a seguir são atendidos: a infraestrutura necessária para os microsserviços está implantada; cada serviço possui seu banco de dados próprio com os mecanismos adequados para garantia de consistência quando for o caso


Descrição
Valor
Arquivos do projeto e texto com instruções atualizadas sobre como inicializar o ambiente e executar/testar o projeto

0.5
Dimensões
0.5 - O texto contém informações suficientes para, a partir dos arquivos entregues, executar/testar o projeto, incluindo template atualizado da ferramenta Postman com os endpoints da aplicação.

0.25 - É possível executar o projeto a partir dos arquivos entregues, mas as informações constantes no texto não são suficientes.

0 - Não é possível executar/testar o projeto a partir dos arquivos entregues.