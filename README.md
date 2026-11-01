# Satyam Shukla: MERN portfolio

React (Vite) frontend, Express and MongoDB backend. The site works even if the API is down: projects fall back to local data in `client/src/data/content.js`.

## Run it locally

1. Install Node 20.19+ and MongoDB (local, or a free MongoDB Atlas cluster).
2. Install everything: `npm run install:all`
3. Create the server config: `cp server/.env.example server/.env`, then set `MONGO_URI`, a real `ADMIN_EMAIL`, a strong `ADMIN_PASSWORD` and a unique cryptographically random `JWT_SECRET` of at least 32 bytes (for example, generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`). The API refuses to start if authentication settings are missing, use example placeholders, or the JWT secret is too short.
4. Load your projects into MongoDB: `npm run seed`
5. Start both apps: `npm run dev`
   - Site: http://localhost:5173
   - API: http://localhost:5000/api/health

The development server binds to `127.0.0.1` and is not exposed to other devices on your network.

## What the backend does

| Route | Access | Purpose |
| --- | --- | --- |
| `GET /api/projects` | public | Projects shown in "Selected work" (`?category=ai&featured=true`) |
| `GET /api/github/repos` | public | Your public GitHub repos, cached 10 minutes |
| `POST /api/contact` | public | Contact form, validated, rate limited, honeypot spam trap |
| `POST /api/auth/login` | public | Returns an admin JWT |
| `POST/PUT/DELETE /api/projects` | admin | Add, edit, remove projects |
| `GET /api/contact` | admin | Read messages sent from the site |

Send the token as `Authorization: Bearer <token>`.

## Edit your content

- Projects: `server/seed/projects.js`, then `npm run seed`. Add a `repoUrl` to any project to show its GitHub link.
- Bio, experience, skills, links: `client/src/data/content.js`.
- Colors and fonts: the variables at the top of `client/src/styles.css`.

## Deploy

One server for everything: `npm run build`, then `npm start`. Express serves `client/dist` and the API from the same origin. Hosts such as Render or Railway work with that setup; set the variables from `server/.env.example` in their dashboard.

If you host the frontend separately (Vercel, Netlify), set `VITE_API_URL` to the API origin and add the frontend origin to `CLIENT_ORIGIN` on the server.
