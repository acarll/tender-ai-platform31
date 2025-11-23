# TED API Documentation Research

## ✅ What We Found

### 1. **Base URL**
- **Official Domain**: `https://api.ted.europa.eu`
- **Endpoint Format**: `https://api.ted.europa.eu/{api-version}/{resource}/{action}`

### 2. **Authentication Methods**
Based on documentation, TED API uses different auth methods for different endpoints:

- **`X-API-Key` header**: Used by some endpoints (e.g., `renderNotice`)
- **`Authorization: Bearer {API_KEY}`**: Standard Bearer token format
- **Search API**: May NOT require authentication at all

### 3. **API Key**
- Obtain from: [TED Developer Portal](https://docs.ted.europa.eu/api/latest/)
- Login with EU Login credentials
- Generate via "Manage API Keys" section
- **Important**: Copy and store securely - cannot be retrieved later

### 4. **Parameter Names** (from documentation)
TED API uses specific parameter names:
- `country_code` (not `country`) - Two-letter country code (e.g., 'PL', 'FR', 'UK')
- `cpv_code` (not `cpv`) - Common Procurement Vocabulary code
- `date_from` - Start date in 'DD-MM-YYYY' format
- `date_to` - End date in 'DD-MM-YYYY' format
- `page_size` (may use underscore, not camelCase)
- `include_child_cpvs` - Set to '1' to include child CPV codes
- `organisation` - Search for specific organization

### 5. **Endpoints We're Trying**
Current implementation tries:
1. `https://api.ted.europa.eu/v1/search` (Search API - may not need auth)
2. `https://api.ted.europa.eu/v2/search` (Search API v2)
3. `https://api.ted.europa.eu/v1/notices` (Notices API)
4. `https://api.ted.europa.eu/v2/notices` (Notices API v2)
5. `https://api.ted.europa.eu/api/v1/notices` (Alternative format)
6. `https://api.ted.europa.eu/api/v1/search` (Alternative format)

## ❌ Current Status

**Backend is working** ✅
- Server running on port 3001
- API key is configured
- CORS is enabled
- Error handling is in place

**TED API Connection** ❌
- All endpoints return **404 Not Found**
- This means the endpoint URLs are incorrect
- Need to verify exact endpoint paths from official documentation

## 🔍 Next Steps

### Option 1: Check Official Swagger Documentation
1. Visit: https://docs.ted.europa.eu/api/latest/
2. Look for the Swagger/OpenAPI interface
3. Find the exact endpoint for:
   - Searching notices/tenders
   - Fetching notice details
4. Note the exact path, required parameters, and authentication method

### Option 2: Test with Search API (No Auth)
The Search API may not require authentication. Try:
```
GET https://api.ted.europa.eu/v1/search?country_code=PL&page_size=1
```
(No headers needed)

### Option 3: Verify API Key Format
- Your API key: `7c064b525df54c11ab2b27aafca8b82a`
- Length: 32 characters
- Format looks correct (hexadecimal)

### Option 4: Check API Version
- Documentation mentions v1, v2, v2.1
- Need to verify which version is currently active
- May need to use `/api/v2.1/` instead of `/v1/`

## 📝 What We Updated

### Backend (`backend-example/src/routes/ted.ts`)
1. ✅ Added multiple endpoint variations
2. ✅ Added both `X-API-Key` and `Authorization: Bearer` auth methods
3. ✅ Updated parameter names to match TED API (`country_code`, `cpv_code`, `date_from`, etc.)
4. ✅ Added better error logging with response details
5. ✅ Try search endpoints without authentication first

### Testing
- Backend test endpoint: `http://localhost:3001/api/ted/test`
- Returns detailed error messages with documentation link

## 🚀 How to Proceed

1. **Visit TED API Documentation**: https://docs.ted.europa.eu/api/latest/
2. **Find the Swagger/API Explorer** - This will show exact endpoints
3. **Test one endpoint manually** using:
   - Postman
   - curl
   - Browser (if no auth needed)
4. **Share the working endpoint** and I'll update the backend

## Example curl Commands to Try

```bash
# Try Search API (no auth)
curl "https://api.ted.europa.eu/v1/search?country_code=PL&page_size=1"

# Try with X-API-Key
curl -H "X-API-Key: 7c064b525df54c11ab2b27aafca8b82a" \
  "https://api.ted.europa.eu/v1/notices?page_size=1"

# Try with Bearer token
curl -H "Authorization: Bearer 7c064b525df54c11ab2b27aafca8b82a" \
  "https://api.ted.europa.eu/v1/notices?page_size=1"
```

## 📚 Documentation Links

- **Main Documentation**: https://docs.ted.europa.eu/api/latest/
- **Developer Portal**: https://docs.ted.europa.eu/api/latest/ (login required for API keys)
- **Search API Docs**: Check documentation for exact endpoint

---

**Status**: Backend is ready, waiting for correct TED API endpoint paths.

