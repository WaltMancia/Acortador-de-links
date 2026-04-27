# 🔗 Mini URL Shortener API

A simple and minimal URL shortener built with Node.js and Express.  
This project demonstrates backend fundamentals such as API design, routing, validation, and redirection.

---

## 🚀 Features

- Shorten long URLs into unique short links
- Redirect to original URLs using a short code
- Basic URL validation
- In-memory storage (no database required)
- Health check endpoint

---

## 🛠 Tech Stack

- Node.js
- Express.js

---

## 📦 Installation

bash npm install 

---

## ▶️ Run the application

bash node app.js 

Server will run at:

http://localhost:3000

---

## 📡 API Endpoints

### 🔹 Create Short URL

POST /shorten

Request body:

json {   "url": "https://example.com" } 

Response:

json {   "shortUrl": "http://localhost:3000/abc123" } 

---

### 🔹 Redirect

GET /:code

Redirects to the original URL.

---

### 🔹 Health Check

GET /health

json {   "status": "OK" } 

---

## ⚠️ Limitations

- Data is stored in memory (resets when server restarts)
- No authentication or rate limiting
- No persistence layer (database)

---

## 🔐 Security Considerations

- Basic input validation implemented
- In a production environment, consider:
  - Rate limiting
  - Input sanitization
  - Persistent database
  - HTTPS enforcement

---

## 📈 Future Improvements

- Add database (MongoDB / PostgreSQL)
- Implement user accounts
- Add analytics (click tracking)
- Custom short URLs
- Expiration dates for links

---

## 👨‍💻 Author

Walter Mancia
