# Quick Start: Testing TED API

## Your API Key
```
7c064b525df54c11ab2b27aafca8b82a
```

## Step 1: Start the App
```bash
npm run dev
```

## Step 2: Test in Browser

1. **Open the app** (usually http://localhost:3000)

2. **Go to Discovery view** (click "Discovery" in sidebar)

3. **Click "Fetch from TED API"** button

4. **Enter your API key:**
   ```
   7c064b525df54c11ab2b27aafca8b82a
   ```

5. **Click "Test"** to verify connection

6. **If connection succeeds:**
   - Set filters (optional):
     - Country: `PL` (for Poland)
     - Page Size: `25` (for testing)
   - Click **"Fetch Tenders from TED"**

## What the Service Does

The updated service automatically tries:
- **4 different API endpoints**
- **4 different authentication methods**
- Returns the first successful connection

This means it should work even if the exact endpoint/auth method isn't known.

## If It Doesn't Work

1. **Open Browser Console** (F12 → Console tab)
2. **Look for error messages**
3. **Check Network tab** to see which requests are being made
4. **Share the error** and I can help fix it

## Alternative: Use .env File

Create `.env` file in root:
```
TED_API_KEY=7c064b525df54c11ab2b27aafca8b82a
```

Then restart the dev server. The key will be auto-loaded.

## Expected Results

✅ **Success:**
- Connection test shows green "Connected"
- Tenders appear in discovery list
- All features work (match scoring, CPV intelligence, etc.)

❌ **If it fails:**
- Check console for specific error
- Verify API key is correct
- Check if TED API requires different format

