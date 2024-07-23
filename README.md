# Health&Med | ScheduleService - Microserviço para gestão de agenda

Este projeto foi implementa para a etapa de Hackaton da pós graduação em Arquitetura de Software pela FIAP.
Este Microserviço é responsavel por gerenciar a agenda do médico, onde o mesmo edita sua agenda e os seus dados de atendimento.

## Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura Hexagonal / Limpa](#arquitetura-hexagonal--limpa)
- [Setup do ambiente de desenvolvimento](#setup-do-ambiente-de-desenvolvimento)
  - [Pré-requisitos](#pré-requisitos)
- [Banco de Dados](#banco-de-dados)
  - [Configuração](#configuração-do-projeto)
- [Docker e Docker Compose](#docker-e-docker-compose)
  - [Dockerfile](#dockerfile)
  - [Docker Compose](#docker-compose)
- [Infraestrutura Kubernetes](#infraestrutura-com-kubernetes)
  - [Banco de Dados](#banco-de-dados-1)
  - [Aplicação](#aplicação)
- [Postman](#postman)
- [Conclusão](#conclusão)

<a name="section-1"></a>

### Estrutura do Projeto

- `src`

  - `modules`: Os módulos da aplicação, cada um responsável por uma parte específica do sistema. Cada módulo configura suas próprias entidades, repositórios e controladores.

  - `core`

    - `domain`: Contém as entidades, portas (ports), e interfaces que representam a lógica de domínio do sistema. Também inclui objetos de valor, DTOs entre outros recursos.
    - `application`: Aqui estão os casos de uso (use-cases) que implementam a lógica de negócios. Eles interagem com os repositórios por meio de ports para fazer a persistencia dos dados.

  - `adapter`: wip
  - `config`: Armazena arquivos de configuração, como variáveis de ambiente e os 'symbol' usados para injeção de dependência do NestJS.

<a name="section-2"></a>

### Arquitetura Hexagonal / Limpa

A arquitetura hexagonal é uma abordagem que enfatiza a separação das preocupações em camadas distintas e prove uma estrutura organizada e testável para sua aplicação. As camadas bem definidas facilitam a manutenção, testes e evolução do sistema.

1. Camada de Domínio (Core - Domain):

   - Contém as entidades de domínio que representam os objetos principais do sistema.
   - Define portas (ports) e interfaces que descrevem a interação com componentes externos, como repositórios.
   - Contém objetos de valor (value objects) que representam conceitos imutáveis do domínio.
   - Define DTOs (Data Transfer Objects) para transferir dados entre as camadas.

2. Camada de Aplicação (Core - Application): wip

3. Camada de Adaptadores (Adapter): wip

<a name="section-3"></a>

### Setup do ambiente de desenvolvimento

<a name="#section-3.1"></a>

#### Pré-requisitos

- [NodeJS](https://nodejs.org/)
- [pnpm](https://pnpm.io)
- [Docker](https://www.docker.com/)
  - Instale também o [Docker Compose](https://docs.docker.com/compose/)
- [Kubernetes](https://kubernetes.io/pt-br/)
- [Visual Studio Code](https://code.visualstudio.com/) ou [WebStorm](https://www.jetbrains.com/webstorm/)

<a name="#section-4"></a>

### Banco de Dados

wip

#### Configuração do Projeto

Antes de iniciar o projeto, siga as etapas abaixo para configurá-lo corretamente:

1. Copie o arquivo `settings.json.template` e renomeie-o para `settings.json`. O arquivo `settings.json` está localizado na pasta `src/`. Este arquivo contém as configurações essenciais do projeto, como variáveis de ambiente e configurações específicas. Certifique-se de definir as configurações apropriadas, como credenciais de banco de dados, portas e outras variáveis necessárias.

<a name="#section-5"></a>

### Docker e Docker Compose

O projeto utiliza Docker e Docker Compose para facilitar a criação e execução do ambiente de desenvolvimento. Aqui estão os arquivos relevantes:

<a name="#section-5.1"></a>

#### Dockerfile

O arquivo Dockerfile define a imagem do contêiner do Node.js a ser usada para executar o projeto.

```dockerfile
FROM node:20

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

USER node

WORKDIR /home/node

RUN npm install --global pnpm

WORKDIR /home/node/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

COPY --chown=node:node ./src/settings.json.template ./src/settings.json

RUN pnpm run build

EXPOSE 3333

CMD [ "node", "dist/main.js" ]

```

<a name="#section-5.2"></a>

#### Docker Compose

O arquivo docker-compose.yml define os serviços a serem executados usando o Docker Compose. Ele inclui os serviços do aplicativo (Node.js) e do banco de dados (PostgreSQL).

```yaml
services:
  schedule-db:
    container_name: ms-schedule-db
    build: .docker/postgres
    environment:
      POSTGRES_DB: scheduledb
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
    ports:
      - 5432:5432
    profiles: [dev]
    networks:
      - schedule-service

  application:
    container_name: schedule-service-app
    build: .
    ports:
      - 3333:3333
    mem_limit: 2g
    profiles: [build]
    networks:
      - schedule-service

networks:
  schedule-service:
```

Para iniciar o projeto, siga estas etapas:

1. Certifique-se de ter o Docker e o Docker Compose instalados no seu sistema.

2. No diretório raiz do seu projeto, onde o arquivo docker-compose.yml está localizado, execute o seguinte comando para iniciar os serviços:

Inicializar banco de dados PostgreSQL

```bash
docker compose -p schedule-db --profile dev up -d
```

Inicializar apenas a aplicação

```bash
docker compose -p schedule-app --profile build up -d
```

Isso criará os contêineres para o aplicativo e o banco de dados.

3. Após a inicialização bem-sucedida, a aplicação estará disponível em `http://localhost:3333`. Certifique-se de que a porta 333 esteja mapeada corretamente no arquivo `docker-compose.yml`.

<a name="#section-6"></a>

### Infraestrutura com Kubernetes

wip

<a name="#section-6.1"></a>

#### Banco de Dados

wip

### Postman

wip

<a name="#section-7"></a>

### Conclusão

---

Com isso, seu projeto estará configurado e em execução dentro de um ambiente Dockerizado.
