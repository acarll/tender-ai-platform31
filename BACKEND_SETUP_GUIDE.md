# 🚀 Backend Server Setup Guide for TED API

This guide will help you set up a simple Node.js/Express backend server to proxy TED API requests and bypass CORS restrictions.

---

## 📋 Prerequisites

- Node.js installed (v16 or higher)
- npm (comes with Node.js)
- Your TED API key: `7c064b525df54c11ab2b27aafca8b82a`

---

## 🛠️ Step 1: Create Backend Directory

Create a new folder for your backend (separate from your frontend):

```bash
# In your parent directory (outside of 'sdasdas')
mkdir tender-ai-backend
cd tender-ai-backend
```

---

## 📦 Step 2: Initialize Node.js Project

```bash
npm init -y
```

---

## 📥 Step 3: Install Dependencies

```bash
npm install express cors dotenv
npm install --save-dev @types/express @types/cors typescript ts-node nodemon
```

---

## ⚙️ Step 4: Create TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 🔐 Step 5: Create Environment File

Create `.env` file in the backend root:

```env
PORT=3001
TED_API_KEY=7c064b525df54c11ab2b27aafca8b82a
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important:** Add `.env` to `.gitignore` to keep your API key secure!

---

## 📁 Step 6: Create Backend Structure

Create the following folder structure:

```
tender-ai-backend/
├── src/
│   ├── server.ts
│   └── routes/
│       └── ted.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 💻 Step 7: Create Server File

Create `src/server.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tedRoutes from './routes/ted';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// API routes
app.use('/api/ted', tedRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 TED API proxy ready at http://localhost:${PORT}/api/ted`);
  console.log(`🔗 Frontend URL: ${FRONTEND_URL}`);
});

export default app;
```

---

## 🔌 Step 8: Create TED API Route

Create `src/routes/ted.ts`:

```typescript
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const TED_API_KEY = process.env.TED_API_KEY || '';

// Possible TED API endpoints to try
const TED_ENDPOINTS = [
  'https://api.ted.europa.eu/api/v1/notices',
  'https://ted.europa.eu/api/v2.1/notices',
  'https://api.ted.europa.eu/v1/notices',
  'https://ted.europa.eu/api/v1/notices'
];

// Possible authentication methods
const getAuthHeaders = (apiKey: string) => [
  { 'X-API-Key': apiKey },
  { 'Authorization': `Bearer ${apiKey}` },
  { 'Authorization': `ApiKey ${apiKey}` },
  { 'apikey': apiKey }
];

/**
 * Test TED API connection
 */
router.get('/test', async (req: Request, res: Response) => {
  try {
    if (!TED_API_KEY) {
      return res.status(400).json({ 
        error: 'TED_API_KEY not configured in environment variables' 
      });
    }

    // Try to fetch one notice as a test
    const params = new URLSearchParams({ pageSize: '1' });
    
    let lastError: Error | null = null;
    
    // Try each endpoint with each auth method
    for (const baseUrl of TED_ENDPOINTS) {
      for (const authHeader of getAuthHeaders(TED_API_KEY)) {
        try {
          const url = `${baseUrl}?${params.toString()}`;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              ...authHeader,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            return res.json({
              success: true,
              message: 'TED API connection successful',
              endpoint: baseUrl,
              dataCount: data.notices?.length || 0
            });
          }
        } catch (err) {
          lastError = err instanceof Error ? err : new Error('Unknown error');
          continue;
        }
      }
    }
    
    throw lastError || new Error('Failed to connect to TED API');
    
  } catch (error) {
    console.error('TED API test error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to connect to TED API. Please check your API key and endpoint.'
    });
  }
});

/**
 * Fetch tenders from TED API
 */
router.get('/notices', async (req: Request, res: Response) => {
  try {
    if (!TED_API_KEY) {
      return res.status(400).json({ 
        error: 'TED_API_KEY not configured' 
      });
    }

    // Extract query parameters
    const {
      country,
      cpv,
      minValue,
      maxValue,
      deadlineFrom,
      deadlineTo,
      page = '1',
      pageSize = '50'
    } = req.query;

    // Build query parameters
    const params = new URLSearchParams();
    if (country) params.append('country', country as string);
    if (cpv) params.append('cpv', cpv as string);
    if (minValue) params.append('minValue', minValue as string);
    if (maxValue) params.append('maxValue', maxValue as string);
    if (deadlineFrom) params.append('deadlineFrom', deadlineFrom as string);
    if (deadlineTo) params.append('deadlineTo', deadlineTo as string);
    params.append('page', page as string);
    params.append('pageSize', pageSize as string);

    let lastError: Error | null = null;
    
    // Try each endpoint with each auth method
    for (const baseUrl of TED_ENDPOINTS) {
      for (const authHeader of getAuthHeaders(TED_API_KEY)) {
        try {
          const url = `${baseUrl}?${params.toString()}`;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              ...authHeader,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            return res.json({
              success: true,
              notices: data.notices || [],
              total: data.total || 0,
              page: data.page || parseInt(page as string),
              pageSize: data.pageSize || parseInt(pageSize as string)
            });
          } else if (response.status !== 404 && response.status !== 401) {
            lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
            continue;
          }
        } catch (err) {
          lastError = err instanceof Error ? err : new Error('Unknown error');
          continue;
        }
      }
    }
    
    throw lastError || new Error('Failed to fetch from TED API');
    
  } catch (error) {
    console.error('TED API fetch error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to fetch tenders from TED API'
    });
  }
});

export default router;
```

---

## 📝 Step 9: Update package.json Scripts

Update `package.json` scripts section:

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

---

## 🚫 Step 10: Create .gitignore

Create `.gitignore`:

```
node_modules/
dist/
.env
*.log
.DS_Store
```

---

## 🏃 Step 11: Install node-fetch (if needed)

If you're using Node.js 18+, `fetch` is built-in. For older versions:

```bash
npm install node-fetch@2
```

Then update `src/routes/ted.ts` to use:
```typescript
import fetch from 'node-fetch';
```

---

## ▶️ Step 12: Run the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3001
📡 TED API proxy ready at http://localhost:3001/api/ted
🔗 Frontend URL: http://localhost:5173
```

---

## 🔗 Step 13: Update Frontend to Use Backend

Update `services/tedApiService.ts` to use your backend:

Replace the fetch calls with:

```typescript
// At the top of the file, add:
const BACKEND_URL = 'http://localhost:3001';

// Replace fetchTEDTenders function:
export const fetchTEDTenders = async (
  apiKey: string,
  options: TEDFetchOptions = {}
): Promise<Tender[]> => {
  try {
    const params = new URLSearchParams();
    if (options.country) params.append('country', options.country);
    if (options.cpv) params.append('cpv', options.cpv);
    if (options.minValue) params.append('minValue', options.minValue.toString());
    if (options.maxValue) params.append('maxValue', options.maxValue.toString());
    if (options.deadlineFrom) params.append('deadlineFrom', options.deadlineFrom);
    if (options.deadlineTo) params.append('deadlineTo', options.deadlineTo);
    if (options.page) params.append('page', options.page.toString());
    params.append('pageSize', (options.pageSize || 50).toString());

    const response = await fetch(`${BACKEND_URL}/api/ted/notices?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch tenders');
    }

    // Transform TED notices to our Tender format
    return (data.notices || []).map((notice: any, index: number) => 
      transformTEDNoticeToTender(notice, index)
    );

  } catch (error) {
    console.error('TED API fetch error:', error);
    throw new Error(`Failed to fetch from TED API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Update testTEDConnection:
export const testTEDConnection = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/ted/test`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('TED API connection test failed:', error);
    return false;
  }
};
```

---

## ✅ Step 14: Test the Setup

1. **Start Backend:**
   ```bash
   cd tender-ai-backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd sdasdas
   npm run dev
   ```

3. **Test Connection:**
   - Open your app at `http://localhost:5173`
   - Go to Discovery tab
   - Click "Fetch TED Tenders"
   - Click "Test Connection"
   - Should now work! ✅

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Verify Node.js is installed: `node --version`
- Check if all dependencies are installed: `npm install`

### CORS errors still happening
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check backend is running on port 3001
- Make sure frontend is using `http://localhost:3001` in `tedApiService.ts`

### TED API returns errors
- Verify your API key is correct in `.env`
- Check TED API documentation for correct endpoint format
- Some endpoints may require different authentication methods

### Frontend can't connect to backend
- Ensure backend is running
- Check browser console for errors
- Verify `BACKEND_URL` in `tedApiService.ts` matches backend URL

---

## 📚 Next Steps

1. **Add Error Handling:** Improve error messages and retry logic
2. **Add Rate Limiting:** Prevent API abuse
3. **Add Caching:** Cache TED API responses to reduce calls
4. **Add Logging:** Log all API requests for debugging
5. **Add Authentication:** Secure your backend endpoints

---

## 🔒 Security Notes

- **Never commit `.env` file** to git
- **Keep API keys secret** - never expose in frontend code
- **Use environment variables** for all sensitive data
- **Add authentication** before deploying to production
- **Use HTTPS** in production

---

## 📞 Support

If you encounter issues:
1. Check the console logs (both backend and frontend)
2. Verify all environment variables are set
3. Test backend endpoints directly: `http://localhost:3001/api/ted/test`
4. Check TED API documentation for endpoint changes

---

**🎉 You're all set! Your backend should now proxy TED API requests and bypass CORS restrictions.**

