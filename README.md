# 💳 Digital Banking System

A modular **Node.js-based digital banking backend** that simulates real-world banking operations including account creation, transfers, ledger tracking, and external API integrations (NIBSS).

---

## 🚀 Overview

This project is designed to replicate core banking functionalities used in fintech systems. It demonstrates:

* Account creation using BVN/KYC
* Secure authentication with JWT
* Internal and interbank transfers
* Ledger-based transaction tracking
* Integration with external banking APIs (NIBSS)

The system follows a clean architecture with separation of concerns between controllers, services, repositories, and external integrations.

---

## 🏗️ Architecture

The application is structured using a layered architecture:

```
src/
│
├── controllers/        # Handles HTTP requests & responses
├── services/           # Business logic (core banking operations)
├── repo/               # Database access layer (Prisma)
├── nibbs/              # External API integrations (NIBSS)
├── middlewares/        # Auth & validation middleware
├── validators/         # Joi/Zod schemas
├── config/             # Prisma & environment configs
└── routes/             # API route definitions
```

---

## ⚙️ Tech Stack

* **Node.js** – Backend runtime
* **Express.js** – Web framework
* **Prisma ORM** – Database access
* **PostgreSQL / Supabase** – Database
* **JWT** – Authentication
* **Axios** – API requests
* **NIBSS API (Mock)** – Banking integrations

---

## 🔑 Core Features

### 🧾 Account Management

* Create bank accounts with BVN validation
* Fetch account details
* Check account balance

### 💸 Transactions

* Credit and debit accounts
* Maintain transaction history
* Ledger entries for audit trail

### 🔄 Transfers

* Internal transfers (within system)
* Interbank transfers via NIBSS
* Name enquiry before transfer

### 🔐 Authentication

* Secure JWT-based authentication
* Protected routes with middleware

---

## 🔌 API Endpoints

### Account Routes

```
POST   /api/accounts/create
GET    /api/accounts/:id
GET    /api/accounts/:id/balance
POST   /api/accounts/credit
POST   /api/accounts/debit
```

### Transfer Routes

```
POST   /api/transfers
```

---

## 🔄 Transfer Flow

1. Validate sender account
2. Check sufficient balance
3. Perform name enquiry (NIBSS)
4. Create transaction (PENDING)
5. Debit sender (DB transaction)
6. Create ledger entry
7. Call external transfer API
8. Update transaction status

---

## 🧪 Example Request

### Transfer Funds

```json
POST /api/transfers

{
  "senderAccountId": "uuid",
  "receiverAccountNumber": "1234567890",
  "bankcode": "058",
  "amount": 5000,
  "narration": "Test transfer"
}
```

---

## ⚠️ Error Handling

The system handles:

* Insufficient funds
* Invalid accounts
* External API failures
* Network/DNS issues
* Transaction rollbacks using Prisma

---

## 📦 Installation

```bash
git clone https://github.com/your-username/Digital-Banking-App.git

cd Digital-Banking-App

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
NIBSS_BASE_URL=https://nibssbyphoenix.onrender.com/api
NIBSS_API_KEY=your_key
NIBSS_API_SECRET=your_secret
```

---

## 📊 Future Improvements

* Retry mechanism for failed transfers
* Transaction reversal system
* Webhooks for transfer status updates
* Rate limiting & fraud detection
* Role-based access control (RBAC)
* Microservices architecture

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Gabriel Unimke**

* Backend Developer | Fintech Enthusiast
* Focused on building scalable banking systems and APIs

---
