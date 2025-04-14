# React + Node.js + MySQL CRUD App

This is a full-stack web application that demonstrates a simple **CRUD** (Create, Read, Update, Delete) system using:

- **Frontend**: React (with basic styling)
- **Backend**: Node.js + Express
- **Database**: MySQL

---

## 📦 Features

- Add, edit, and delete items.
- Each item includes:
  - `name`: string
  - `price`: number (decimal)
  - `stock`: number (integer)
- Validation on both frontend and backend.
- Download all items as a JSON file.
- Error handling with proper HTTP status codes.
- RESTful API structure.
---

## 🛠 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Ardelean-Claudiu-Andrei/WSMT2025-IndividualProj.git
cd WSMT2025-IndividualProj
```
2. Install dependencies

Backend
```
cd server
npm install
```
Frontend
```
cd ../client
npm install
```

3. MySQL Database Setup

```
CREATE DATABASE crud_app;

USE crud_app;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0
);
```
4. Start the application
   
   Start the backend (Node.js + Express)
    ```
    cd server
    node index.js
    ```
    Runs at: http://localhost:3000
  
   Start the frontend (React)
    ```
    cd ../client
    npm start
    ```
    Runs at: http://localhost:3001

---
🧪 API Endpoints
Method	Endpoint	Description:
* GET	/items	Get all items
* POST	/items	Add new item
* PUT	/items/:id	Update existing
* DELETE	/items/:id	Delete item
---
✅ Requirements Covered
* RESTful HTTP requests
* Proper status codes (200, 201, 404, 400, 500)
* JSON format request/response
* Full CRUD
* Frontend displays data in a user-friendly way
* Data validation
* Concurrent client support
* Download JSON feature
---
