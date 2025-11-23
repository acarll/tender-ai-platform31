# Testing TED API with Your Key

## Your API Key
```
7c064b525df54c11ab2b27aafca8b82a
```

## Quick Setup

### Option 1: Use In-App (Recommended)
1. Start the app: `npm run dev`
2. Go to Discovery view
3. Click "Fetch from TED API"
4. Paste your API key: `7c064b525df54c11ab2b27aafca8b82a`
5. Click "Test" to verify connection
6. Click "Fetch Tenders from TED"

### Option 2: Environment Variable
1. Create `.env` file in root directory:
   ```
   TED_API_KEY=7c064b525df54c11ab2b27aafca8b82a
   ```
2. Restart the dev server
3. The key will be automatically loaded

## Testing Steps

1. **Test Connection First**
   - Enter API key
   - Click "Test" button
   - Should show "Connected" status

2. **Fetch Test Data**
   - Set filters (optional):
     - Country: "PL" (Poland)
     - Page Size: 25 (for testing)
   - Click "Fetch Tenders from TED"

3. **Verify Results**
   - Check if tenders appear in discovery
   - Verify data quality:
     - Titles are populated
     - Descriptions exist
     - CPV codes are present
     - Budgets are shown
     - Deadlines are set

## Troubleshooting

### If Connection Test Fails:

1. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for CORS errors or 401/403 errors

2. **Try Different Endpoints**
   The service tries multiple endpoints automatically:
   - `https://api.ted.europa.eu/api/v1/notices`
   - `https://ted.europa.eu/api/v2.1/notices`
   - `https://api.ted.europa.eu/v1/notices`
   - `https://ted.europa.eu/api/v1/notices`

3. **Check Authentication Method**
   The service tries multiple auth methods:
   - `X-API-Key` header
   - `Authorization: Bearer`
   - `Authorization: ApiKey`
   - `apikey` header

4. **Verify API Key Format**
   - Make sure no extra spaces
   - Check if key needs to be activated
   - Verify key has proper permissions

### If Data Format is Wrong:

1. **Check Response Structure**
   - Open Network tab in DevTools
   - Find the TED API request
   - Check the actual response format
   - Update `transformTEDNoticeToTender()` if needed

2. **Common Issues:**
   - Response might be XML instead of JSON
   - Field names might differ
   - Nested structure might be different

## Expected Behavior

✅ **Success:**
- Connection test shows "Connected"
- Fetched tenders appear in discovery
- All tender fields are populated
- Match scores are calculated
- CPV intelligence works

❌ **Failure:**
- Connection test fails
- Error message shows in red
- Check console for details
- Verify API key and endpoint

## Next Steps After Testing

1. **If it works:**
   - Adjust filters as needed
   - Set up regular fetching schedule
   - Integrate with your workflow

2. **If it doesn't work:**
   - Check TED API documentation
   - Verify endpoint URL
   - Check authentication requirements
   - Contact TED support if needed

## Security Note

⚠️ **Never commit your API key to version control!**
- Keep `.env` in `.gitignore`
- Don't share API key publicly
- Rotate key if exposed

