# ⚡ Quick Backend Start (5 Minutes)

## Fast Setup

### 1. Create Backend Folder
```bash
# Go to parent directory
cd ..
mkdir tender-ai-backend
cd tender-ai-backend
```

### 2. Copy-Paste This Command (installs everything)
```bash
npm init -y && npm install express cors dotenv && npm install --save-dev @types/express @types/cors typescript ts-node nodemon
```

### 3. Create Files

**Create `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

**Create `.env`:**
```env
PORT=3001
TED_API_KEY=7c064b525df54c11ab2b27aafca8b82a
FRONTEND_URL=http://localhost:5173
```

**Create `src/server.ts`** (see BACKEND_SETUP_GUIDE.md for full code)

**Create `src/routes/ted.ts`** (see BACKEND_SETUP_GUIDE.md for full code)

### 4. Update `package.json` scripts:
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/server.ts"
}
```

### 5. Run Backend
```bash
npm run dev
```

### 6. Update Frontend

In `services/tedApiService.ts`, add at the top:
```typescript
const BACKEND_URL = 'http://localhost:3001';
```

Then replace fetch calls to use `${BACKEND_URL}/api/ted/...` instead of direct TED API calls.

**Done!** 🎉

See `BACKEND_SETUP_GUIDE.md` for complete details.

