# TED API Integration Guide

## Setup

1. **Get your TED API Key**
   - Register at [TED Portal](https://ted.europa.eu/)
   - Navigate to API section
   - Generate your API key

2. **Configure Environment Variable**
   - Create a `.env` file in the root directory
   - Add your API key:
     ```
     TED_API_KEY=your_ted_api_key_here
     ```

3. **Alternative: Use In-App Input**
   - The app also supports entering the API key directly in the UI
   - Click "Fetch from TED API" in Discovery view
   - Enter your API key and click "Test"
   - The key will be stored locally in your browser

## Usage

1. **Navigate to Discovery View**
   - Click on "Discovery" in the sidebar

2. **Fetch Tenders**
   - Click "Fetch from TED API" button
   - Configure filters (optional):
     - Country Code (e.g., "PL" for Poland)
     - CPV Code (e.g., "72000000-5" for IT Services)
     - Min/Max Value
     - Results per page
   - Click "Fetch Tenders from TED"

3. **Fetched Tenders**
   - Tenders will be automatically added to your discovery list
   - All features work on TED data:
     - Match scoring
     - CPV intelligence
     - Pricing intelligence
     - Smart filters
     - AI enrichment

## API Endpoint

**Note:** The TED API endpoint in the code (`https://ted.europa.eu/api/v2.1/notices`) is a placeholder.

**Actual TED API endpoints may vary:**
- Some use OJS (Official Journal) format
- Some require different authentication
- Some use XML instead of JSON

**Please verify:**
1. Check TED API documentation for correct endpoint
2. Update `services/tedApiService.ts` with correct URL
3. Adjust response parsing if format differs

## Troubleshooting

### Connection Test Fails
- Verify your API key is correct
- Check if TED API requires different authentication method
- Ensure you have internet connection
- Check browser console for detailed error messages

### No Tenders Returned
- Try removing filters (country, CPV, etc.)
- Check if filters are too restrictive
- Verify API key has proper permissions
- Check TED API documentation for query limits

### Data Format Issues
- TED API may return XML instead of JSON
- Update `transformTEDNoticeToTender` function if field names differ
- Check TED API response structure

## Testing

1. **Test Connection**
   - Click "Test" button in TED Data Fetcher
   - Should show "Connected" status

2. **Fetch Small Batch**
   - Set page size to 25
   - Fetch and verify data quality
   - Check if all fields are populated correctly

3. **Verify Integration**
   - Check if fetched tenders appear in discovery
   - Test match scoring works
   - Verify CPV intelligence is calculated
   - Test smart filters work with TED data

## Security

- API keys are stored in browser localStorage
- Never commit `.env` file to version control
- API keys are only used for client-side requests
- Consider using a backend proxy for production

