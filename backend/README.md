# Express Backend

Express.js backend API for Sam's portfolio.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file from `.env.example`:
```bash
# mac / linux
cp .env.example .env
# windows (PowerShell)
copy .env.example .env
```

3. Update environment variables:
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/sam-portfolio
```

## Development

Start the dev server with hot reload:
```bash
npm run dev
```

Server will run on `http://localhost:3001`

### With MongoDB

This backend uses MongoDB via Mongoose. For local development you can run MongoDB with Docker:

```bash
docker run -p 27017:27017 -d --name sam-mongo mongo:7
```

Then start the server after setting `MONGO_URI` if needed.

## API Routes

### Projects
- `GET /api/projects` - Fetch all projects
- `GET /api/projects/:id` - Fetch single project
- `POST /api/projects` - Create new project

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/status` - Check email service status

### Blog
- `GET /api/blog` - Fetch all blog posts (with pagination)
- `GET /api/blog/:slug` - Fetch single post
- `GET /api/blog/tag/:tag` - Fetch posts by tag

### Health
- `GET /health` - Server health check

## Build

Build TypeScript to JavaScript:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Notes

- CORS is configured to allow requests from frontend URL
- All routes are prefixed with `/api/`
-- Mock data has been replaced by MongoDB storage for projects, blog posts and contact messages
- Email service integration needed for contact form
