# 🔄 Frontend Update Guide

After setting up your backend server, update the frontend to use it.

## Quick Update

In `services/tedApiService.ts`, make these changes:

### 1. Add Backend URL at the top

```typescript
// Add this constant at the top of the file (after imports)
const BACKEND_URL = 'http://localhost:3001';
```

### 2. Update `fetchTEDTenders` function

Replace the entire function (around line 57-138) with:

```typescript
export const fetchTEDTenders = async (
  apiKey: string, // API key is now handled by backend, but keep for compatibility
  options: TEDFetchOptions = {}
): Promise<Tender[]> => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (options.country) params.append('country', options.country);
    if (options.cpv) params.append('cpv', options.cpv);
    if (options.minValue) params.append('minValue', options.minValue.toString());
    if (options.maxValue) params.append('maxValue', options.maxValue.toString());
    if (options.deadlineFrom) params.append('deadlineFrom', options.deadlineFrom);
    if (options.deadlineTo) params.append('deadlineTo', options.deadlineTo);
    if (options.page) params.append('page', options.page.toString());
    params.append('pageSize', (options.pageSize || 50).toString());

    // Call backend proxy instead of TED API directly
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
```

### 3. Update `testTEDConnection` function

Replace the function (around line 295-300) with:

```typescript
export const testTEDConnection = async (apiKey: string): Promise<boolean> => {
  try {
    // Test backend connection (API key is handled by backend)
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

## That's It! 🎉

After these changes:
1. Your frontend will call your backend at `http://localhost:3001`
2. Your backend will proxy requests to TED API
3. CORS issues will be resolved!

## Testing

1. Make sure backend is running: `npm run dev` (in backend folder)
2. Make sure frontend is running: `npm run dev` (in frontend folder)
3. Test connection in the app - it should work now! ✅

