# Quiz IA

Um aplicativo de terminal desenvolvido em Node.js que gera perguntas de múltipla escolha utilizando a API do Google Gemini.

## Funcionalidades

- Geração de perguntas por tema
- Escolha da dificuldade
- Definição da quantidade de questões
- Correção automática
- Exibição da porcentagem de acertos

## Tecnologias

- Node.js
- JavaScript
- Inquirer
- Google Gemini API
- Dotenv

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Matheus-575/Quiz.git
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env`:

```env
GEMINI_API_KEY=sua_chave_aqui
```

## Executando

```bash
node src/quiz.js
```

## Estrutura

```
quiz/
├── src/
│   ├── quiz.js
│   └── generateQuestions.js
├── .env
├── package.json
└── README.md
```

## Licença

MIT
