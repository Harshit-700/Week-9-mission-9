# The Data Hub

The Data Hub is a RESTful API server built using Node.js and Express.js. The project focuses on backend architecture and API development, allowing users to create, read, update, and delete blog posts through HTTP requests. It simulates a lightweight backend service using an in-memory database and follows standard REST principles.

🔗 Live Demo: https://week-9-mission-9-3.onrender.com

📸 Screenshot
![img alt](https://github.com/Harshit-700/Week-9-mission-9/blob/522632ca17fb5001b2e6d05c8448852421e8ea55/Screenshot%20(432).png)
---

## 📁 Project Structure

```txt
The-Data-Hub/
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## ✨ Features

**RESTful API Architecture** — Structured backend server following REST principles.

**CRUD Operations** — Supports Create, Read, Update, and Delete functionality for blog posts.

**Express.js Server** — Lightweight and scalable Node.js backend framework.

**In-Memory Database** — Stores blog data temporarily using JavaScript arrays.

**Dynamic Routing** — Handles parameterized routes using Express routing.

**JSON Response System** — Sends structured JSON responses with status codes.

**Validation Handling** — Prevents incomplete blog submissions with field validation.

**Error Handling** — Includes custom 404 routes and invalid ID handling.

**Auto Timestamping** — Automatically generates createdAt and updatedAt values.

**API Testing Ready** — Fully testable using Postman or Thunder Client.

---

## 🚀 Getting Started

### 1. Initialize Project

```bash
npm init -y
```

### 2. Install Dependencies

```bash
npm install express
```

### 3. Start Server

```bash
node server.js
```

### 4. Open In Browser

```txt
http://localhost:5000
```

---

## 🔗 API Endpoints

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| GET    | `/posts`     | Fetch all blog posts         |
| GET    | `/posts/:id` | Fetch a single blog post     |
| POST   | `/posts`     | Create a new blog post       |
| PUT    | `/posts/:id` | Update an existing blog post |
| DELETE | `/posts/:id` | Delete a blog post           |

---

## 📥 Sample Request Body

### Create / Update Blog Post

```json
{
  "title": "My First Blog",
  "author": "Harshit",
  "content": "Hello World"
}
```

---

## 📤 Sample API Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 1,
    "title": "My First Blog",
    "author": "Harshit",
    "content": "Hello World"
  }
}
```

---

## 🧪 API Testing

All API routes were tested using:

* Postman

The following operations were verified successfully:

| Operation          | Status  |
| ------------------ | ------- |
| GET Requests       | Working |
| POST Requests      | Working |
| PUT Requests       | Working |
| DELETE Requests    | Working |
| Validation Errors  | Working |
| 404 Error Handling | Working |

---

## 🧩 Server Functionalities

| Functionality       | Description                 |
| ------------------- | --------------------------- |
| GET All Posts       | Returns all blog posts      |
| GET Single Post     | Fetches a post using ID     |
| POST Request        | Adds a new blog post        |
| PUT Request         | Updates existing post       |
| DELETE Request      | Removes post from array     |
| Validation System   | Prevents empty fields       |
| Timestamp Generator | Tracks creation/update time |

---

## ⚡ Backend Highlights

| Feature            | Purpose                    |
| ------------------ | -------------------------- |
| Express Middleware | Parses JSON request bodies |
| Dynamic Routing    | Handles route parameters   |
| Status Codes       | Proper API communication   |
| In-Memory Storage  | Temporary data persistence |
| Error Middleware   | Handles invalid routes     |
| JSON APIs          | Structured API responses   |

---

## 🛠️ Built With

* Node.js — JavaScript runtime
* Express.js — Backend framework
* JavaScript (ES6+) — Application logic
* REST API — API architecture
* Postman — API testing


---

## 💡 Future Improvements

* Connect MongoDB database
* Add authentication system
* Implement JWT authorization
* Add pagination support
* Create frontend dashboard
* Add image upload support
* Integrate cloud database

---

## 🌍 Deployment

This project can be deployed on:

* [Render](https://render.com/?utm_source=chatgpt.com)

Production-ready port configuration:

```javascript
const PORT = process.env.PORT || 5000;
```

---

## 📄 License

This project is open source and available under the MIT License.
