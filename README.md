# Gym Manager API

## Escopo do Projeto

O **Gym Manager API** é uma API backend para gerenciamento de matrículas em academia.

O objetivo do projeto é permitir o controle administrativo de alunos, planos, matrículas, mensalidades, pagamentos manuais e cobranças por e-mail.

Nesta primeira versão, o sistema não terá integração com gateway de pagamento real. O foco será construir a base da regra de negócio, permitindo que a academia acompanhe alunos ativos, matrículas em andamento, mensalidades pendentes, pagamentos registrados manualmente e possíveis casos de inadimplência.

## Funcionalidades previstas

- Cadastro e autenticação de usuários administrativos
- Cadastro de alunos
- Cadastro de planos
- Criação e controle de matrículas
- Geração e controle de mensalidades
- Registro manual de pagamentos
- Identificação de mensalidades vencidas
- Envio de e-mails de cobrança
- Dashboard administrativo com resumo básico

## Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Zod
- bcrypt
- Docker Compose
- ESLint
- dotenv
- Nodemailer ou serviço equivalente para envio de e-mails

## Arquitetura prevista

O projeto seguirá uma organização em camadas:

- Routes
- Controllers
- Services
- Repositories
- Validators
- Middlewares
- Errors
- Config
- Prisma

A ideia é manter os controllers mais simples, concentrar as regras de negócio nos services e deixar o acesso ao banco isolado nos repositories.
