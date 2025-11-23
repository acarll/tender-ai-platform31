# Frontend Integration Guide

## ✅ API Client Created

I've created a complete API client for the frontend:

### Files Created:
- `src/api/config.ts` - API configuration and base URL
- `src/api/tenders.ts` - Tenders API client
- `src/api/results.ts` - Results/Awards API client
- `src/api/analytics.ts` - Analytics API client

## 📝 Usage Examples

### 1. Import API Clients

```typescript
import { getTenders, getTenderById } from './api/tenders';
import { getResults } from './api/results';
import { getTopProducts, getCpvAnalytics } from './api/analytics';
```

### 2. Fetch Tenders

```typescript
// Get all tenders
const response = await getTenders();
console.log(response.data); // Array of tenders

// Get tenders with filters
const filtered = await getTenders({
  cpv: '48000000',
  branch: 'IT Services & Software',
  page: 1,
  pageSize: 20
});

// Get single tender
const tender = await getTenderById(123);
```

### 3. Fetch Results/Awards

```typescript
// Get all results
const results = await getResults();

// Get results by CPV
const cpvResults = await getResults({ cpv: '48000000' });
```

### 4. Fetch Analytics

```typescript
// Get top products
const topProducts = await getTopProducts('48000000', 10);

// Get CPV analytics
const analytics = await getCpvAnalytics('48000000');

// Get top keywords
const keywords = await getTopKeywords('48000000', 'IT Services & Software');
```

## 🔧 Configuration

### Environment Variable

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:3002/api
```

Or use the default: `http://localhost:3002/api`

## 🔗 Integration Steps

### Step 1: Update Discovery.tsx

Replace any hardcoded API calls with the new API client:

```typescript
import { getTenders } from '../api/tenders';
import { getResults } from '../api/results';
import { getTopProducts } from '../api/analytics';

// In your component
const [tenders, setTenders] = useState([]);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await getTenders({ cpv: selectedCpv });
      setTenders(response.data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  }
  fetchData();
}, [selectedCpv]);
```

### Step 2: Update Workspace.tsx

```typescript
import { getTenderById } from '../api/tenders';

// Fetch tender details
const tender = await getTenderById(tenderId);
```

### Step 3: Add Analytics to Views

```typescript
import { getTopProducts, getCpvAnalytics } from '../api/analytics';

// Show top products
const products = await getTopProducts(cpvCode);
```

## ✅ Next Steps

1. **Import API clients** in your components
2. **Replace hardcoded API calls** with the new client functions
3. **Test the integration** - verify data loads from backend
4. **Add error handling** - show user-friendly error messages
5. **Add loading states** - show spinners while fetching

## 🎯 Example: Complete Integration

```typescript
import { useState, useEffect } from 'react';
import { getTenders } from '../api/tenders';
import { getTopProducts } from '../api/analytics';

function TenderList({ cpvCode }: { cpvCode: string }) {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTenders() {
      try {
        setLoading(true);
        const response = await getTenders({ cpv: cpvCode, pageSize: 20 });
        setTenders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (cpvCode) {
      fetchTenders();
    }
  }, [cpvCode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tenders.map(tender => (
        <div key={tender.id}>
          <h3>{tender.title}</h3>
          <p>{tender.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📊 API Endpoints Available

All endpoints are now accessible via the API client:

- ✅ `GET /api/tenders` - List tenders
- ✅ `GET /api/tenders/:id` - Get tender by ID
- ✅ `GET /api/results` - List results/awards
- ✅ `GET /api/analytics/products/top` - Top products
- ✅ `GET /api/analytics/cpv/:cpvCode` - CPV analytics
- ✅ `GET /api/analytics/keywords/top` - Top keywords
- ✅ `GET /api/data-sources` - Data source status

Your frontend is now ready to connect to the backend! 🚀

