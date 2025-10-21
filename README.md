# Gladius

Uma API Node.js/TypeScript para gerenciamento de chat em tempo real com integração WebSocket e autenticação básica.

## 📋 Características

- **Chat em Tempo Real**: Implementação com Socket.IO para comunicação instantânea
- **Autenticação Segura**: Sistema de autenticação básica com middleware personalizado
- **Integração com API Externa**: Comunicação com sistema Athenas via API REST
- **Validação de Dados**: Validação robusta com Zod e class-validator
- **Injeção de Dependência**: Arquitetura limpa usando TSyringe
- **Docker Ready**: Configuração completa para desenvolvimento e produção
- **TypeScript**: Tipagem estática para maior segurança e produtividade

## 🚀 Tecnologias

- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript
- **Framework**: Express.js
- **WebSocket**: Socket.IO
- **Validação**: Zod, class-validator
- **DI Container**: TSyringe
- **HTTP Client**: Axios
- **Logging**: Winston
- **Containerização**: Docker & Docker Compose

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Configuração de clientes HTTP
├── controllers/            # Controladores das rotas
├── errors/                 # Classes de erro personalizadas
├── interfaces/             # Interfaces TypeScript
├── middlewares/            # Middlewares do Express
├── routes/                 # Definições de rotas
├── schemas/                # Schemas de validação Zod
├── services/               # Lógica de negócio
├── shared/                 # Utilitários compartilhados
│   ├── container/          # Configuração do container DI
│   ├── helper/             # Funções auxiliares
│   └── utils/              # Utilitários gerais
├── socket/                 # Configuração WebSocket
└── server.ts               # Arquivo principal da aplicação
```

## ⚙️ Configuração

### Variáveis de Ambiente

Copie o arquivo `env_example` para `.env` e configure as seguintes variáveis:

```bash
# URL da API externa
URLAPI=http://localhost/apix/

# Credenciais da API externa
APIXUSER=seu_usuario_api
APIXPASS=sua_senha_api

# Autenticação básica da aplicação
BASIC_USER=seu_usuario
BASIC_PASS=sua_senha

# Configuração Docker
DOCKERFILE=Dockerfile.dev

# Domínio para CORS
DOMAIN=athenas.online
```

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Docker e Docker Compose (opcional)

## 🔧 Instalação

### Desenvolvimento Local

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd gladius

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env_example .env
# Edite o arquivo .env com suas configurações

# Execute em modo desenvolvimento
npm run dev

# Execute com debug
npm run dev:debug
```

### Usando Docker

```bash
# Para desenvolvimento
docker-compose up

# Para produção (modifique DOCKERFILE=Dockerfile no .env)
docker-compose up --build
```

## 📚 API Endpoints

### Chat

#### POST `/chat/message`

Envia uma nova mensagem para o chat.

**Headers:**
```
Authorization: Basic <base64(username:password)>
Content-Type: application/json
```

**Body:**
```json
{
  "message": "Conteúdo da mensagem",
  "assunto": "Assunto opcional",
  "usoreg": 123,
  "tipo": 1,
  "codigochat": 456
}
```

**Resposta:**
- `200`: Mensagem enviada com sucesso
- `400`: Erro de validação ou falha no envio
- `401`: Falha na autenticação

## 🔌 WebSocket Events

### Eventos do Cliente

- `connection`: Conecta ao servidor WebSocket
- `disconnect`: Desconecta do servidor

### Eventos do Servidor

- `chat_message`: Recebe novas mensagens do chat

**Exemplo de uso:**
```javascript
const socket = io('http://localhost:3000');

// Escutar mensagens do chat
socket.on('chat_message', (data) => {
  console.log('Nova mensagem:', data);
});
```

## 🔒 Autenticação

A API utiliza autenticação HTTP Basic. Todas as rotas (exceto `/health`) requerem autenticação.

**Formato do Header:**
```
Authorization: Basic <base64(BASIC_USER:BASIC_PASS)>
```

## 🏗️ Arquitetura

### Injeção de Dependência

O projeto utiliza TSyringe para injeção de dependência, promovendo baixo acoplamento e alta testabilidade.

### Middleware Pipeline

1. **CORS**: Configurado para aceitar requisições do domínio especificado
2. **Body Parser**: Processa JSON com limite de 50MB
3. **Authentication**: Valida credenciais básicas
4. **Routes**: Roteamento da aplicação
5. **Error Handler**: Tratamento centralizado de erros

### Validação de Dados

- **Zod**: Schemas de validação para dados de entrada
- **class-validator**: Validação adicional nos DTOs

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia com nodemon
npm run dev:debug    # Inicia com debug habilitado

# Produção
npm run build        # Compila TypeScript
npm run start        # Inicia aplicação compilada
npm run start:debug  # Inicia produção com debug

# Testes
npm test            # Executa testes (configurar)
```

## 🐳 Docker

### Dockerfile.dev (Desenvolvimento)
- Hot reload com volumes
- Debug port exposto (9229)
- Ideal para desenvolvimento

### Dockerfile (Produção)
- Imagem otimizada
- Multi-stage build
- Usuário não-root para segurança

### Docker Compose
- Configuração completa de rede
- Volumes para desenvolvimento
- Variáveis de ambiente automáticas

## 🔧 Debug

### VS Code

Use a configuração em `.vscode/launch.json` para debug direto no VS Code.

### Docker Debug

```bash
# Para debug em container
npm run dev:debug
# ou
docker-compose up (com DOCKERFILE=Dockerfile.dev)

# Conecte no port 9229
```

## 📝 Logs

O sistema utiliza Winston para logging estruturado:

- Logs de erro automaticamente capturados
- Formato JSON para facilitar parsing
- Diferentes níveis de log configuráveis

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verifique os logs da aplicação
2. Confirme as variáveis de ambiente
3. Verifique a conectividade com a API externa
4. Consulte a documentação da API Athenas

## 🚀 Deploy

### Variáveis de Ambiente para Produção

Certifique-se de configurar todas as variáveis necessárias no ambiente de produção:

- `URLAPI`: URL da API de produção
- `APIXUSER` e `APIXPASS`: Credenciais de produção
- `BASIC_USER` e `BASIC_PASS`: Credenciais de autenticação
- `DOMAIN`: Domínio de produção para CORS
- `PORT`: Porta da aplicação (padrão: 3000)
- `NODE_ENV`: Defina como "production"

### Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Build da aplicação (`npm run build`)
- [ ] Testes executados
- [ ] Conectividade com API externa verificada
- [ ] Domínio CORS configurado corretamente
- [ ] Monitoramento e logs configurados