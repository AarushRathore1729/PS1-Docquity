# URL Shortener

A simple, robust, and extensible URL shortening service built with Node.js, Express, MongoDB, and Redis. Features RESTful APIs for shortening, managing, and redirecting URLs, plus user management and Swagger API docs.

## Features

- Shorten long URLs to compact, shareable links
- Custom short codes and expiration support
- User management (CRUD)
- MongoDB for persistent storage
- Redis for caching and performance
- Health check endpoints for server, database, and cache
- Swagger UI for interactive API documentation

## Tech Stack

- Node.js, Express
- MongoDB (via Mongoose)
- Redis (via ioredis)
- Swagger (OpenAPI 3.0)
- NanoID for unique short codes

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- Redis instance (local or cloud)

### Installation

```bash
git clone https://github.com/Godssidekick1/Docquity.git
cd URL-Shorten
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/urlshorten
REDIS_URI=redis://localhost:6379
NODE_ENV=development
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:8080`.

## API Documentation

Interactive docs available at:  
`http://localhost:8080/api-docs`

### Main Endpoints

#### URL Shortening

- `POST /api/shorten`  
  Shorten a new URL.  
  Body: `{ "original_url": "https://example.com" }`

- `GET /api/shorten`  
  List all shortened URLs.

- `GET /api/shorten/:id`  
  Get details for a specific short URL by MongoDB ID.

- `PUT /api/shorten/:id`  
  Update a short URL by ID.

- `PUT /api/shorten/short/:shortCode`  
  Update a short URL by its short code.

- `DELETE /api/shorten/:id`  
  Delete a short URL by ID.

- `DELETE /api/shorten/short/:shortCode`  
  Delete a short URL by its short code.

- `GET /api/shorten/redirect/:shortCode`  
  Redirect to the original URL.

#### User Management

- `POST /api/users`  
  Create a new user.

- `GET /api/users`  
  List all users.

- `GET /api/users/:id`  
  Get user by ID.

- `PUT /api/users/:id`  
  Update user by ID.

- `DELETE /api/users/:id`  
  Delete user by ID.

#### Health Check

- `GET /health`  
  Returns status of server, database, and cache.

## Example Request

```bash
curl -X POST http://localhost:8080/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"original_url": "https://www.google.com"}'
```

## Development

- All code is in the main project folder, organized by feature (controllers, services, models, routes, etc).
- API documentation is auto-generated from JSDoc comments using Swagger.

## License

ISC