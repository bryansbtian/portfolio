import fs from 'node:fs'
import process from 'node:process'
import { parseEnv } from 'node:util'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ADMIN_ROUTES = {
  '/api/admin/login': '/api/admin/login.js',
  '/api/admin/logout': '/api/admin/logout.js',
  '/api/admin/content': '/api/admin/content.js',
}

// parseEnv keeps the $ characters in the password hash intact.
const readEnvFile = () =>
  fs.existsSync('.env') ? parseEnv(fs.readFileSync('.env', 'utf8')) : {}

// Runs the Vercel admin functions under `npm run dev`.
function adminApi() {
  return {
    name: 'admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const route = ADMIN_ROUTES[req.url.split('?')[0]]
        if (!route) return next()

        try {
          Object.assign(process.env, readEnvFile(), { VERCEL_ENV: 'development' })

          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const raw = Buffer.concat(chunks).toString()
          Object.defineProperty(req, 'body', {
            get: () => (raw ? JSON.parse(raw) : undefined),
          })

          res.status = (code) => {
            res.statusCode = code
            return res
          }
          res.json = (body) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
          }

          const { default: handler } = await server.ssrLoadModule(route)
          await handler(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), adminApi()],
})
