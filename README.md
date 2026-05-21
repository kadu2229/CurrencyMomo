# CurrencyMomo 💰

**EN:** Personal finance management API. Track your income, expenses and goals.

**PT:** API de gestão financeira pessoal. Controle sua renda, gastos e objetivos.

---

## Tech Stack

- Node.js + TypeScript
- Express
- Sequelize + MySQL
- JWT Authentication
- Zod — data validation
- Helmet — HTTP security headers
- express-rate-limit — brute force protection

---

## Getting Started / Como rodar

1. Clone o repositório / Clone the repo
\```bash
git clone https://github.com/seu-usuario/currencymomo
\```

2. Instale as dependências / Install dependencies
\```bash
npm install
\```

3. Copie o `.env.example` para `.env` e preencha os valores
Copy `.env.example` to `.env` and fill in the values

4. Rode em desenvolvimento / Run in development
\```bash
npm run dev
\```

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Roda em desenvolvimento |
| `npm run build` | Compila o TypeScript |
| `npm start` | Roda em produção |
| `npm test` | Roda os testes unitários |

---

## Variáveis de Ambiente / Environment Variables

Veja / See `.env.example`

---

## Endpoints

> Rotas marcadas com ✅ exigem header `Authorization: Bearer <token>`

### Users
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/users/register | Cadastrar usuário | ❌ |
| POST | /api/users/login | Login | ❌ |

### Expenses
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/expenses | Criar despesa | ✅ |
| GET | /api/expenses | Listar despesas | ✅ |
| PUT | /api/expenses/:id | Atualizar despesa | ✅ |
| DELETE | /api/expenses/:id | Deletar despesa | ✅ |

### Incomes
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/incomes | Criar renda | ✅ |
| GET | /api/incomes | Listar rendas | ✅ |
| PUT | /api/incomes/:id | Atualizar renda | ✅ |
| DELETE | /api/incomes/:id | Deletar renda | ✅ |

### Goals
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/goals | Criar meta | ✅ |
| GET | /api/goals | Listar metas | ✅ |
| PUT | /api/goals/:id | Atualizar meta | ✅ |
| DELETE | /api/goals/:id | Deletar meta | ✅ |