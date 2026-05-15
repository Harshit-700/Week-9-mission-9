# The Data Hub – Prompts Documentation

This document contains the complete collection of structured prompts used during the development of The Data Hub RESTful API Server.

---

## 1. Express Server Initialization

Create a backend server using Node.js and Express.js.

The server should initialize successfully, listen on Port 5000, and display a clean startup message in the terminal showing all available API endpoints.

The application should follow a scalable backend architecture with proper middleware configuration.

---

## 2. RESTful API Route Architecture

Design a complete REST API structure for managing blog posts.

The backend should include the following endpoints:

* GET `/posts`
* GET `/posts/:id`
* POST `/posts`
* PUT `/posts/:id`
* DELETE `/posts/:id`

Each route should return structured JSON responses with proper HTTP status codes.

---

## 3. In-Memory Database System

Implement a lightweight in-memory database using JavaScript arrays.

The application should store blog posts temporarily inside a `blogPosts` array without using any external database system.

Each blog post should include:

* Unique ID
* Title
* Author
* Content
* Created timestamp
* Updated timestamp

---

## 4. Create Blog Post API

Build a POST API endpoint for creating new blog posts dynamically.

The server should extract request data from `req.body`, validate required fields, generate timestamps automatically, assign unique IDs, and store the blog post inside the in-memory database.

The API should return a success response with the newly created blog object.

---

## 5. Fetch All Blog Posts

Create a GET API endpoint that returns all blog posts stored inside the server.

The response should include:

* Success status
* Total post count
* Complete blog post array

The API should return structured JSON data suitable for frontend consumption.

---

## 6. Fetch Single Blog Post by ID

Implement a dynamic GET API route using route parameters.

The endpoint should locate a specific blog post using its unique ID and return the matching object.

If the post does not exist, the server should return a proper 404 error response.

---

## 7. Update Existing Blog Post

Create a PUT API endpoint for updating blog posts dynamically.

The route should:

* Identify the target post using route parameters
* Merge existing and incoming data
* Update the `updatedAt` timestamp
* Prevent manual ID overwriting

The server should return the updated blog post in the response.

---

## 8. Delete Blog Post API

Implement a DELETE API endpoint for removing blog posts from the database array.

The server should:

* Locate the target blog post by ID
* Remove it using array filtering
* Return a success message after deletion

If the post does not exist, return a proper error response.

---

## 9. Validation and Error Handling

Add backend validation and centralized error handling throughout the application.

The server should:

* Prevent empty fields
* Handle invalid routes
* Handle missing IDs
* Return proper HTTP status codes
* Send clean JSON error responses

Create a custom 404 middleware for undefined routes.

---

## 10. Express Middleware Configuration

Configure Express middleware for handling JSON request bodies.

Use `express.json()` middleware to parse incoming API payloads and enable proper request handling for POST and PUT operations.

Ensure all incoming data is processed correctly.

---

## 11. Timestamp Management System

Implement automatic timestamp generation for all blog posts.

Every created blog should include:

* `createdAt`
* `updatedAt`

Use JavaScript Date functions to generate ISO formatted timestamps dynamically.

---

