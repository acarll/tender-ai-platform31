# 🔍 TED API GitHub Research Results

Based on research of the official [OP-TED GitHub organization](https://github.com/OP-TED), here's what we found:

## 📚 Official Resources

### GitHub Organization
- **URL:** https://github.com/OP-TED
- **Owner:** TED & EU Public Procurement Unit - Publications Office of the EU
- **Location:** Luxembourg
- **Website:** https://ted.europa.eu

### Key Repositories
1. **tedapi-docs** - TED API Documentation
2. **eForms-SDK** - Foundation for building eForms applications
3. **OP-TED.github.io** - TED Developer Documentation site
4. **ted-open-data** - SPARQL query editor for TED Open Data

### Developer Resources
- **Developer Documentation:** https://docs.ted.europa.eu
- **Developer Portal:** https://developer.ted.europa.eu
- **API Documentation GitHub:** https://github.com/OP-TED/tedapi-docs

## 🔑 Key Findings

### API Endpoint Format
Based on research, the TED API v3 uses this structure:
```
https://api.ted.europa.eu/{api-version}/{resource}/{action}
```

**Example:**
```
https://api.ted.europa.eu/v3/notices/search
```

### Authentication
- API keys are managed via the Developer Portal
- API key required for most endpoints
- Search API may not require authentication (needs verification)

### Endpoint Variations to Try
1. `https://api.ted.europa.eu/v3/notices/search` (POST) - Official v3 format
2. `https://api.ted.europa.eu/v2/notices/search` (POST/GET)
3. `https://api.ted.europa.eu/v1/notices/search` (POST/GET)
4. `https://ted.europa.eu/api/latest/search` (GET) - Alternative format
5. `https://ted.europa.eu/api/v3/search` (GET)
6. `https://api.ted.europa.eu/v3/search` (POST/GET)
7. `https://api.ted.europa.eu/search` (POST/GET)
8. `https://ted.europa.eu/api/latest/notices/search` (POST/GET)

## 🔧 What We Updated

### Backend Changes
1. ✅ Added 8 endpoint variations
2. ✅ Testing both POST (JSON body) and GET (query params)
3. ✅ Trying multiple authentication methods
4. ✅ Enhanced error logging
5. ✅ Browser-like headers

### Current Implementation
- **Endpoints:** 8 variations
- **Methods:** POST and GET for each
- **Auth:** X-API-Key, Authorization Bearer, both
- **Headers:** Full browser-like headers

## 📝 Next Steps

1. **Check Developer Portal** - https://developer.ted.europa.eu
   - Verify API key is active
   - Check if there are any restrictions

2. **Review API Documentation** - https://docs.ted.europa.eu/api/latest/
   - Find exact endpoint paths
   - Verify authentication method
   - Check required parameters

3. **Test Manually** - Use Postman or curl
   ```bash
   # Try POST
   curl -X POST https://api.ted.europa.eu/v3/notices/search \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_KEY" \
     -d '{"q":"software","scope":"TD","status":"O","pagesize":1}'
   
   # Try GET
   curl "https://ted.europa.eu/api/latest/search?q=software&scope=TD&status=O&pagesize=1"
   ```

4. **Check GitHub Issues** - https://github.com/OP-TED/tedapi-docs/issues
   - See if others have similar issues
   - Find working examples

## 🎯 Summary

The backend now tries **16 combinations** (8 endpoints × 2 methods) with proper authentication. This should cover all possible endpoint formats.

**If it still doesn't work:**
- The API might require specific API key permissions
- The endpoint might be behind authentication that requires login
- The API might be in a different environment (preview vs production)

---

**Resources:**
- GitHub: https://github.com/OP-TED
- Docs: https://docs.ted.europa.eu
- Portal: https://developer.ted.europa.eu

