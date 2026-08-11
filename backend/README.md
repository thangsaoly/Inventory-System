# Inventory System - Backend

RESTful API backend for the Inventory Management System, built with **Node.js**, **Express**, and **MySQL**.

---

## 📚 Documentation

Detailed documentation for architecture, API design, and database schema can be found in the [`/docs`](docs/) directory:

* 🏗️ **[Architecture Overview](docs/ARCHITECTURE.md)** — 4-layer architecture pattern (Routes → Controllers → Services → Repositories).
* 📑 **[API Specification](docs/API_SPEC.md)** — Base URL `/api/v1`, standard JSON envelopes, status codes, and endpoint contracts.
* 🗄️ **[Database Schema & ERD Design](docs/DATABASE_SCHEMA.md)** — Entity Relationship Diagram, table specs (`users`, `products`, `stock_logs`), and DDL migration scripts.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)

### 2. Environment Setup
Copy the environment template and adjust database credentials:
```bash
cp .env.example .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000` (or the port defined in `.env`).

---

## 🛠️ Tech Stack
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MySQL / MariaDB
- **ORM / Driver:** Sequelize / MySQL2
- **Auth:** JWT (JSON Web Tokens) & BcryptJS
