# 🚀 Backend Server Start Guide

## Quick Start

The backend server must be running for the TED API integration to work.

### Option 1: Start Backend (Recommended)

1. **Open a new terminal** in Cursor
2. **Navigate to backend directory:**
   ```powershell
   cd ..\tender-ai-backend
   ```

3. **Start the server:**
   ```powershell
   npm run dev
   ```

4. **You should see:**
   ```
   🚀 Backend server running on http://localhost:3001
   📡 TED API proxy ready at http://localhost:3001/api/ted
   ```

### Option 2: Check if Backend is Running

```powershell
# Check if port 3001 is in use
Get-NetTCPConnection -LocalPort 3001
```

### Option 3: Manual Start

If `npm run dev` doesn't work:

```powershell
cd ..\tender-ai-backend
npm install  # Only needed first time
npx ts-node src/server.ts
```

## Troubleshooting

### Port 3001 Already in Use

If you get `EADDRINUSE` error:

```powershell
# Kill the process using port 3001
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force
```

### Backend Not Found

If the backend directory doesn't exist, check:
- Location: `C:\Users\MY\Desktop\tender-ai-backend`
- Or create it using the example in `backend-example/` folder

### API Key Not Found

Make sure `.env` file exists in `tender-ai-backend/` with:
```
TED_API_KEY=7c064b525df54c11ab2b27aafca8b82a
```

## Verify Backend is Running

Test the health endpoint:
```powershell
curl http://localhost:3001/health
```

Or open in browser: http://localhost:3001/health

---

**Note:** The backend must be running before testing the TED API connection in the frontend!

