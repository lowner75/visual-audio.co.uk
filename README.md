# Visual Audio (Fastify / TypeScript Platform)

Full-stack **Node.js / Fastify** platform built for **visual-audio.co.uk**.

### 🧬 Architecture
- Modular file structure  
- Feature-based domains  
- Fastify plugin system for auth, sessions, DB, mailer, views  
- Strong TypeScript types throughout  
- Separation of concerns: controllers → services → utils → data models where applicable

## 🛠 Tech Stack

- **Backend:** Node.js / Fastify / TypeScript  
- **Database:** MongoDB  
- **Templating:** Pug templating  
- **Build:** Vite for asset bundling  
- **Styling:** SCSS + Bootstrap  
- **Auth:** JWT + Sessions  
- **Encryption:** Argon2  
- **Email:** Custom templating engine + NodeMailer Plugin  
- **Deployment:** Nginx reverse proxy & Node service

## 📁 Project Structure (High-Level)

```bash
root
  |___ public
    |___ css
    |___ images
    |___ favicons
    |___ fonts
    |___ js
  |___ scss
    |___ abstracts
    |___ base
    |___ components
    |___ layout
    |___ pages
    |___ themes
    |___ vendors
  |___ src
    |___ middleware
    |___ modules
      |___ landing
      |___ products
      |___ sessions
      |___ users
    |___ plugins
    |___ types
    |___ utils
    |___ views
      |___ include
      |___ layouts

```

## 🖥️ Setup

### 1. Install Dependencies

``` bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the project root:

```bash
MONGODB_URI=your_mongodb_connection
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=development
ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=1
ARGON2_HASH_LENGTH=32
NODEMAILER_HOST=smtp.example.com
NODEMAILER_PORT=587
NODEMAILER_USER=your_email@example.com
NODEMAILER_PASS=your_email_password
```

### 3. Run Development Server

``` bash
npm run dev
```

### 4. **Build and Deploy for Production**

``` bash
npm run build
node deploy
```

### 5. **Run the Server with PM2**

``` bash
pm2 start dist/server.js --name "visual-audio"
pm2 save
pm2 startup
```

## 🖥️ Scripts

-   `npm run dev` -- Start Fastify in development
-   `npm run build` -- Build frontend + compile SCSS
-   `npm run server` -- Run ts-node-dev src/server.ts
-   `npm start` -- Run production server
-   `npm sass:watch` -- Watch SCSS changes (scss/styles.scss -> public/css/styles.min.css)
-   `npm vite:build` -- Build frontend assets with Vite
-   `npm esbuild:dev`-- Bundle JS with esbuild in watch mode
-   `npm dev` -- Run all dev tasks concurrently

## 🔐 Security

-   Strong session cookies
-   Sanitized input
-   XSS/CSRF protections
-   Argon2 Hashing
-   Strict TypeScript models
-   Controlled admin namespaces

## 👤 Author

Designed, architected, and built end-to-end by Bryan Lown, focusing on performance, reliability, and maintainability in a real production environment.

## License

Private project. All rights reserved.