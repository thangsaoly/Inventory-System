# Inventory System - REST API Specification

**Version:** 1.0.0  
**Base URL:** `/api/v1`  
**Protocol:** HTTP/HTTPS  
**Data Format:** JSON (`Content-Type: application/json`)

---

## 1. Overview & General Standards

All API endpoints follow RESTful conventions. Responses are returned in a consistent JSON format with standard HTTP status codes.

### 1.1 HTTP Status Codes

| Status Code | Meaning | Use Case |
|---|---|---|
| **200 OK** | Success | Standard successful response for `GET`, `PUT`, `PATCH` |
| **201 Created** | Created | Successful creation of a resource via `POST` |
| **204 No Content** | No Content | Successful deletion via `DELETE` (no response body) |
| **400 Bad Request** | Malformed Input | Syntax error or malformed JSON payload |
| **401 Unauthorized** | Unauthenticated | Missing or invalid authentication token |
| **403 Forbidden** | Forbidden | User authenticated, but lacks permissions |
| **404 Not Found** | Not Found | Requested resource does not exist |
| **409 Conflict** | Conflict | Duplicate resource (e.g. duplicate SKU or email) |
| **422 Unprocessable Entity** | Validation Error | Field-level validation failed |
| **500 Internal Server Error** | Server Error | Unhandled server exception (details hidden) |

---

## 2. Standard Response Envelope

### 2.1 Success Envelope (Single Resource)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "PROD-001",
    "name": "Wireless Mouse",
    "price": 29.99,
    "quantity": 150,
    "created_at": "2026-08-08T10:00:00.000Z"
  }
}
```

### 2.2 Success Envelope (Paginated List)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sku": "PROD-001",
      "name": "Wireless Mouse",
      "price": 29.99,
      "quantity": 150
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total_items": 45,
    "total_pages": 5
  }
}
```

### 2.3 Error Envelope

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid product input data",
    "details": [
      {
        "field": "price",
        "message": "Price must be a positive number"
      }
    ]
  }
}
```

---

## 3. Endpoints Specification

### 3.1 Health & System

#### `GET /health`
* **Description:** Public server health check endpoint.
* **Auth:** None (Public)
* **Response (200 OK):**
```json
{
  "status": "ok",
  "message": "My Health is OK!",
  "timestamp": "2026-08-08T10:00:00.000Z"
}
```

---

### 3.2 Authentication (`/api/v1/auth`)

#### `POST /api/v1/auth/register`
* **Description:** Register a new system user.
* **Auth:** None (Public)
* **Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "role": "staff"
}
```
* **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "staff",
    "created_at": "2026-08-08T10:00:00.000Z"
  }
}
```

#### `POST /api/v1/auth/login`
* **Description:** Authenticate user and issue JWT token.
* **Auth:** None (Public)
* **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "role": "staff"
    }
  }
}
```

---

### 3.3 Products Management (`/api/v1/products`)

#### `GET /api/v1/products`
* **Description:** List products with filtering, search, and pagination.
* **Auth:** Bearer Token
* **Query Parameters:**
  * `page` (integer, default: 1)
  * `limit` (integer, default: 10)
  * `search` (string, optional - searches name and SKU)
  * `category_id` (integer, optional)
* **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sku": "KB-LOGI-01",
      "name": "Logitech MX Keys",
      "category": "Electronics",
      "price": 99.99,
      "quantity": 42,
      "min_stock_level": 10,
      "updated_at": "2026-08-08T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total_items": 1,
    "total_pages": 1
  }
}
```

#### `GET /api/v1/products/:id`
* **Description:** Get detailed information for a single product.
* **Auth:** Bearer Token
* **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "KB-LOGI-01",
    "name": "Logitech MX Keys",
    "description": "Wireless Illuminated Keyboard",
    "category": "Electronics",
    "price": 99.99,
    "quantity": 42,
    "min_stock_level": 10,
    "created_at": "2026-08-08T10:00:00.000Z",
    "updated_at": "2026-08-08T10:00:00.000Z"
  }
}
```

#### `POST /api/v1/products`
* **Description:** Create a new inventory product.
* **Auth:** Bearer Token (Admin / Manager)
* **Request Body:**
```json
{
  "sku": "KB-LOGI-01",
  "name": "Logitech MX Keys",
  "description": "Wireless Illuminated Keyboard",
  "price": 99.99,
  "quantity": 50,
  "min_stock_level": 10
}
```
* **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "KB-LOGI-01",
    "name": "Logitech MX Keys",
    "price": 99.99,
    "quantity": 50,
    "min_stock_level": 10,
    "created_at": "2026-08-08T10:00:00.000Z"
  }
}
```

#### `PUT /api/v1/products/:id`
* **Description:** Update an existing product's details.
* **Auth:** Bearer Token (Admin / Manager)
* **Request Body:**
```json
{
  "name": "Logitech MX Keys S Advanced",
  "price": 109.99,
  "min_stock_level": 15
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "KB-LOGI-01",
    "name": "Logitech MX Keys S Advanced",
    "price": 109.99,
    "quantity": 50,
    "min_stock_level": 15,
    "updated_at": "2026-08-08T10:05:00.000Z"
  }
}
```

#### `DELETE /api/v1/products/:id`
* **Description:** Delete a product from inventory.
* **Auth:** Bearer Token (Admin)
* **Response (204 No Content)**

---

### 3.4 Inventory Movements & Stock Audit Logs (`/api/v1/stock-logs`)

#### `POST /api/v1/products/:id/stock`
* **Description:** Adjust inventory quantity (Stock IN / Stock OUT / Adjustment).
* **Auth:** Bearer Token
* **Request Body:**
```json
{
  "type": "IN",
  "quantity": 20,
  "reason": "Supplier Delivery PO-8842"
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "product_id": 1,
    "previous_quantity": 50,
    "new_quantity": 70,
    "movement": {
      "id": 101,
      "type": "IN",
      "quantity": 20,
      "reason": "Supplier Delivery PO-8842",
      "created_at": "2026-08-08T10:10:00.000Z"
    }
  }
}
```

#### `GET /api/v1/stock-logs`
* **Description:** Retrieve audit history of inventory stock adjustments.
* **Auth:** Bearer Token
* **Query Parameters:**
  * `product_id` (integer, optional)
  * `type` (enum: `IN`, `OUT`, `ADJUSTMENT`, optional)
  * `page` (integer, default: 1)
  * `limit` (integer, default: 20)
* **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "product_id": 1,
      "product_name": "Logitech MX Keys",
      "type": "IN",
      "quantity": 20,
      "reason": "Supplier Delivery PO-8842",
      "created_by": "johndoe",
      "created_at": "2026-08-08T10:10:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total_items": 1,
    "total_pages": 1
  }
}
```
