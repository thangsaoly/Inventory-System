# Inventory System - Backend Architecture

This backend follows a strict **4-Layer Architecture** (Separation of Concerns) to ensure maximum maintainability, testability, and clean code separation.

---

## 🏗️ 4-Layer Architecture Pattern

```
HTTP Request ──► [ 1. Routes ] ──► [ Middleware ] ──► [ 2. Controllers ] ──► [ 3. Services ] ──► [ 4. Repositories ] ──► MySQL DB
                                                                                                                           │
HTTP Response ◄────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Layer Details & Responsibilities

### 1. Routes Layer (`/routes`)
- **Responsibility:** Maps HTTP methods and endpoint paths (`/api/v1/auth/register`) to specific controller functions.
- **Middleware:** Chains route-specific input validation middlewares (e.g. `validateRegisterInput`).
- **Example File:** `routes/auth.routes.js`

### 2. Controller Layer (`/controllers`)
- **Responsibility:** Handles HTTP protocol details:
  - Extracts parameters from `req.body`, `req.params`, or `req.query`.
  - Invokes Service functions.
  - Sends HTTP responses (`res.status(201).json(...)`).
  - Converts domain/service errors into appropriate HTTP error codes (`400`, `409`, `500`).
- **Example File:** `controllers/auth.controllers.js`

### 3. Service Layer (`/services`)
- **Responsibility:** Contains core **Business Logic**:
  - Enforces domain rules (e.g., verifying user uniqueness, password hashing).
  - Orchestrates calls across multiple Repositories if needed.
  - Independent of Express `req`/`res` objects.
- **Example File:** `services/auth.service.js`

### 4. Repository Layer (`/repositories`)
- **Responsibility:** Handles **Data Access & Storage**:
  - Executes database queries directly using MySQL connection pool (`db.query`) or ORM methods.
  - Abstracts SQL queries away from the business logic.
  - Returns raw data objects or `null` to the Service layer.
- **Example File:** `repositories/user.repository.js`

---

## 🔄 Request Data Flow Example (Registration)

```
1. POST /api/v1/auth/register
   ↓
2. [routes/auth.routes.js]
   └─► validateRegisterInput (middleware)
   ↓
3. [controllers/auth.controllers.js]
   └─► calls registerUserService(username, email, password)
   ↓
4. [services/auth.service.js]
   ├─► calls findUserByUsernameOrEmail(username, email)
   ├─► hashes password with bcrypt
   └─► calls createUser({ username, email, passwordHash })
   ↓
5. [repositories/user.repository.js]
   ├─► executes SELECT SQL query
   └─► executes INSERT SQL query
```
