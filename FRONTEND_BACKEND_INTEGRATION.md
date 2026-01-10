# Frontend-Backend Integration Summary

## Overview

This document outlines all the changes made to connect the frontend React components to the backend FastAPI endpoints using React Query hooks (TanStack Query) without using `useEffect` for data fetching.

---

## Frontend Changes

### 1. Dashboard Overview Component (`DashboardClient.tsx`)

**Status**: ✅ Complete

**Changes Made**:

- Removed static `statData` import from constants
- Added `useDashboardOverview(1)` hook to fetch real-time stats
- Implemented loading skeleton UI with 4 animated stat cards
- Dynamic stat cards now display:
  - Total Services (Activity icon)
  - Critical Services (Heart icon)
  - Total Events (TrendingDown icon)
  - Total Logs (Clock icon)

**API Integration**:

- Endpoint: `GET /api/v1/dashboard/overview/{organization_id}`
- Hook: `useDashboardOverview(organizationId: number)`
- Response: `{ total_services, critical_services, degraded_services, total_events, total_logs }`

**Best Practices Applied**:

- ✅ No `useEffect` - pure React Query hook
- ✅ Loading states with skeleton UI
- ✅ Error handling via React Query
- ✅ Automatic caching and refetching

---

### 2. Correlation Engine Component (`CorrelationEngine.tsx`)

**Status**: ✅ Complete

**Changes Made**:

- Removed static props interface
- Added `useCorrelationAnalysis(undefined, 1)` hook
- Displays:
  - Error logs count
  - Number of correlations found
  - AI prediction with confidence percentage
  - Correlation strength as progress bar (0-100%)
  - AI reasoning text
- Loading state with animated skeleton

**API Integration**:

- Endpoint: `GET /api/v1/dashboard/correlation?organization_id={id}`
- Hook: `useCorrelationAnalysis(serviceName?: string, organizationId: number)`
- Response:

```json
{
  "error_logs_count": 42,
  "events_count": 28,
  "correlations": [...],
  "ai_prediction": {
    "root_cause": "Database connection pool exhausted",
    "confidence": 0.87,
    "reasoning": "Pattern of database timeout errors correlates with connection spike..."
  },
  "correlation_score": 0.87
}
```

**AI Features**:

- Brain icon for AI predictions
- Confidence displayed as percentage
- Reasoning text provides context
- Real-time Groq AI integration via LangChain

**Best Practices Applied**:

- ✅ No `useEffect` - pure React Query hook
- ✅ AI prediction display with visual confidence indicator
- ✅ Loading states
- ✅ Error boundaries

---

### 3. Incident Volume Chart (`IncidentVolume.tsx`)

**Status**: ✅ Complete

**Changes Made**:

- Removed static `chartData` array
- Added `useIncidentVolume(undefined, hours)` hook with dynamic time range
- Time range selector maps:
  - "Last 7 Days" → 168 hours
  - "Last 30 Days" → 720 hours
  - "Last 90 Days" → 2160 hours
- Dynamic chart data transformation from API response
- Timestamp formatting with `toLocaleDateString()`
- Loading state: "Loading chart..." message
- Empty state: "No data available" message
- Removed static trend line (not provided by API)

**API Integration**:

- Endpoint: `GET /api/v1/dashboard/incident-volume?hours={hours}`
- Hook: `useIncidentVolume(serviceName?: string, hours: number)`
- Response:

```json
{
  "service_name": "all",
  "time_range_hours": 168,
  "data_points": [
    { "timestamp": "2024-01-15 14:00:00", "incident_count": 23 },
    ...
  ]
}
```

**Chart Configuration**:

- XAxis: `dataKey="timestamp"` (formatted dates)
- YAxis: Incident count
- Bar: Volume data with blue color (#2b5a9f)
- ResponsiveContainer: Fills parent 100%

**Best Practices Applied**:

- ✅ No `useEffect` - pure React Query hook
- ✅ Dynamic time range filtering
- ✅ Loading and empty states
- ✅ Proper timestamp formatting

---

### 4. Critical Services Component (`CriticalServices.tsx`)

**Status**: ✅ Complete

**Changes Made**:

- Removed `defaultServices` static array
- Removed `services` prop from component interface
- Added `useCriticalServices(1, 10)` hook
- Transforms API response to component format
- Maps `degraded` status → `warning` for UI display
- Shows error rate as percentage metric
- Loading skeleton with 3 animated service cards
- Empty state: "No critical services found"

**API Integration**:

- Endpoint: `GET /api/v1/dashboard/services/critical?organization_id=1&hours=1&limit=10`
- Hook: `useCriticalServices(organizationId: number, limit: number)`
- Response: Array of `ServiceHealthResponse[]`

```json
[
  {
    "service_id": 1,
    "service_name": "checkout-api",
    "version": "v1.0",
    "status": "critical",
    "error_rate": 23.5,
    "avg_latency": 3200.0,
    "error_count": 47,
    "total_logs": 200
  },
  ...
]
```

**Status Mapping**:

- `critical` → Red dot, red text
- `degraded` → Yellow dot, yellow text (shown as "warning")
- `healthy` → Teal dot, teal text

**Best Practices Applied**:

- ✅ No `useEffect` - pure React Query hook
- ✅ Status mapping from backend enum to UI
- ✅ Loading skeleton with animations
- ✅ Empty state handling

---

### 5. Incidents Table Component (`IncidentsTable.tsx`)

**Status**: ✅ Complete

**Changes Made**:

- Removed `defaultIncidents` static array
- Removed `incidents` prop from component interface
- Added `useLogs(skip, limit, undefined, "ERROR")` hook
- Fetches ERROR-level logs from telemetry
- Transforms logs to incidents with:
  - Severity mapping: ERROR→P1, WARN→P2, INFO→P3, DEBUG→P4
  - Time difference calculation (e.g., "2h 15m", "42s")
  - Incident ID from log ID (`#INC-{id}`)
  - Status rotation for demo (Investigating/Monitoring/Mitigated/Resolved)
- Pagination controls:
  - Previous/Next buttons
  - Shows "Showing 1-10 of 42 incidents"
  - Disables buttons at boundaries
- Loading state: "Loading incidents..." message
- Empty state: "No incidents found"

**API Integration**:

- Endpoint: `GET /api/v1/telemetry/logs?skip={skip}&limit={limit}&level=ERROR`
- Hook: `useLogs(skip: number, limit: number, serviceName?: string, level?: string)`
- Response:

```json
{
  "total": 42,
  "skip": 0,
  "limit": 10,
  "items": [
    {
      "id": 2401,
      "service_name": "user-db",
      "timestamp": "2024-01-15T14:23:45Z",
      "level": "ERROR",
      "message": "Database connection timeout after 30s",
      "trace_id": "abc123"
    },
    ...
  ]
}
```

**Helper Functions**:

- `mapLogLevelToSeverity(level)`: Maps log levels to P1/P2/P3/P4
- `getTimeDifference(timestamp)`: Calculates human-readable time ago

**Best Practices Applied**:

- ✅ No `useEffect` - pure React Query hook
- ✅ Server-side pagination with skip/limit
- ✅ Loading and empty states
- ✅ Disabled pagination buttons at boundaries
- ✅ Data transformation from logs to incidents

---

## Backend Changes

### 1. Dashboard Schema Updates (`dashboard_schema.py`)

**Changes Made**:

- Added `service_id: int` field to `ServiceHealthResponse`
- Added `version: Optional[str]` field to `ServiceHealthResponse`
- Fields now match frontend expectations

**Updated Schema**:

```python
class ServiceHealthResponse(BaseModel):
    service_id: int = Field(..., description="Service ID")
    service_name: str
    version: Optional[str] = Field(None, description="Service version")
    status: ServiceHealthEnum
    severity_score: int
    error_rate: float
    avg_latency: float
    error_count: int
    total_logs: int
```

---

### 2. Dashboard Service Updates (`dashboard_service.py`)

**Changes Made**:

- Updated `calculate_service_health()` method
- Now queries `ServiceModel` table to get `service_id`
- Returns `service_id` and `version` in response
- Default version is "v1.0" (can be enhanced later)

**Updated Logic**:

```python
@staticmethod
def calculate_service_health(db: Session, service_name: str, hours: int = 1):
    from models.services_model import ServiceModel

    # Get service details from services table
    service = db.query(ServiceModel).filter(ServiceModel.name == service_name).first()
    service_id = service.id if service else 0

    # ... existing logic ...

    return {
        "service_id": service_id,
        "service_name": service_name,
        "version": "v1.0",  # Default version
        "status": status,
        # ... rest of fields ...
    }
```

---

## Authentication Components

**Status**: ✅ Already Connected (No Changes Needed)

### LoginForm.tsx & SignUpForm.tsx

- Already using `authService` directly
- Form validation with `react-hook-form` and `zod`
- Error handling implemented
- Loading states present
- No changes required (mutations are fine to call services directly)

---

## React Query Hooks Architecture

### Dashboard Hooks (`hooks/queries/useDashboard.ts`)

All hooks implemented with proper query keys and caching:

1. **useDashboardOverview(organizationId)**
   - Query Key: `["dashboard", "overview", organizationId]`
   - Returns: Dashboard statistics

2. **useServicesHealth(organizationId, hours)**
   - Query Key: `["dashboard", "services-health", organizationId, hours]`
   - Returns: Array of service health data

3. **useServiceHealth(serviceName, organizationId, hours)**
   - Query Key: `["dashboard", "service-health", serviceName, organizationId, hours]`
   - Returns: Single service health data

4. **useIncidentVolume(serviceName, hours)**
   - Query Key: `["dashboard", "incident-volume", serviceName, hours]`
   - Returns: Time series data for incidents

5. **useCriticalServices(organizationId, limit)**
   - Query Key: `["dashboard", "critical-services", organizationId, limit]`
   - Returns: Array of critical/degraded services

6. **useCorrelationAnalysis(serviceName, organizationId)**
   - Query Key: `["dashboard", "correlation", serviceName, organizationId]`
   - Returns: AI correlation analysis with predictions

### Telemetry Hooks (`hooks/queries/useTelemetry.ts`)

Used by IncidentsTable:

1. **useLogs(skip, limit, serviceName, level)**
   - Query Key: `["telemetry", "logs", skip, limit, serviceName, level]`
   - Returns: Paginated logs

---

## API Endpoints Summary

### Dashboard Endpoints

- `GET /api/v1/dashboard/overview/{organization_id}` - Dashboard stats
- `GET /api/v1/dashboard/services/health` - All services health
- `GET /api/v1/dashboard/services/{service_name}/health` - Single service
- `GET /api/v1/dashboard/incident-volume` - Time series incidents
- `GET /api/v1/dashboard/services/critical` - Critical services list
- `GET /api/v1/dashboard/correlation` - AI correlation analysis

### Telemetry Endpoints

- `GET /api/v1/telemetry/logs` - Paginated logs with filters
- `GET /api/v1/telemetry/metrics` - Metrics data
- `GET /api/v1/telemetry/traces` - Distributed traces
- `GET /api/v1/telemetry/events` - System events

### AI Integration

- **Service**: `services/ai_service.py`
- **Model**: Groq via LangChain (ChatGroq)
- **Methods**:
  - `predict_root_cause()` - Analyzes telemetry for root cause
  - `score_correlation()` - AI-scored correlation strength
  - `classify_incident_severity()` - Severity classification

---

## Best Practices Followed

### ✅ React Query Instead of useEffect

- All data fetching uses TanStack React Query hooks
- No `useEffect` for API calls anywhere
- Automatic caching, refetching, and background updates
- Query invalidation on mutations (future enhancement)

### ✅ Loading States

- Skeleton UI for DashboardClient (4 stat cards)
- Skeleton UI for CorrelationEngine
- Skeleton UI for CriticalServices (3 service cards)
- Text loading indicators for charts and tables
- Disabled pagination buttons during loading

### ✅ Empty States

- "No data available" for empty charts
- "No critical services found" for empty service list
- "No incidents found" for empty incidents table
- Graceful handling of null/undefined data

### ✅ Error Handling

- React Query automatic error states
- Error boundaries (can be enhanced)
- Try-catch in backend services with logging
- User-friendly error messages

### ✅ Type Safety

- TypeScript interfaces for all components
- Pydantic schemas on backend
- Type checking for API responses
- Proper enum mappings

### ✅ Performance

- Query caching with React Query
- Pagination for large datasets
- Server-side filtering and sorting
- Background refetching

### ✅ Code Organization

- Separated hooks from components
- Service layer for API calls
- Centralized API client with Axios
- Clear folder structure

---

## Testing Checklist

### Frontend Testing

- [ ] Dashboard loads with real data
- [ ] Stat cards show correct numbers
- [ ] Correlation engine displays AI predictions
- [ ] Incident volume chart renders with time range selector
- [ ] Critical services list shows services with correct status
- [ ] Incidents table loads ERROR logs
- [ ] Pagination works (previous/next)
- [ ] Loading states appear during fetch
- [ ] Empty states show when no data
- [ ] Time range changes update chart data

### Backend Testing

- [ ] All dashboard endpoints return correct data
- [ ] Telemetry endpoints filter correctly
- [ ] AI service makes real Groq API calls
- [ ] Service health calculation works
- [ ] Correlation analysis includes AI predictions
- [ ] Pagination parameters work (skip/limit)
- [ ] Organization filtering works
- [ ] Time range filtering works (hours)

### Integration Testing

- [ ] Frontend receives data in expected format
- [ ] Status enums match between frontend/backend
- [ ] Timestamps format correctly
- [ ] Error rates calculate properly
- [ ] AI predictions appear with confidence scores
- [ ] Service IDs match between responses

---

## Future Enhancements

### Short Term

1. Add real-time updates with WebSockets
2. Implement query invalidation after mutations
3. Add more granular error handling
4. Enhance empty state designs
5. Add loading progress indicators

### Medium Term

1. Add filtering controls to all components
2. Implement advanced search functionality
3. Add export functionality (CSV, JSON)
4. Create drill-down views for detailed analysis
5. Add user preferences (default time ranges, etc.)

### Long Term

1. Real-time streaming updates
2. Advanced ML model integration
3. Predictive analytics
4. Automated remediation suggestions
5. Multi-tenancy support

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React Components (TSX)                    │   │
│  │  - DashboardClient                                  │   │
│  │  - CorrelationEngine                                │   │
│  │  - IncidentVolume                                   │   │
│  │  - CriticalServices                                 │   │
│  │  - IncidentsTable                                   │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │ (NO useEffect!)                        │
│                    ▼                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      React Query Hooks (TanStack Query)            │   │
│  │  - useDashboardOverview()                          │   │
│  │  - useCorrelationAnalysis()                        │   │
│  │  - useIncidentVolume()                             │   │
│  │  - useCriticalServices()                           │   │
│  │  - useLogs()                                       │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                        │
│                    ▼                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Service Layer                             │   │
│  │  - dashboardService                                 │   │
│  │  - telemetryService                                 │   │
│  │  - authService                                      │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                        │
│                    ▼                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           API Client (Axios)                        │   │
│  │  - Base URL: http://localhost:8000                  │   │
│  │  - Request/Response interceptors                    │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                        │
└────────────────────┼────────────────────────────────────────┘
                     │
                     │ HTTP REST API
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   BACKEND (FastAPI)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API Routes                             │   │
│  │  - /api/v1/dashboard/*                              │   │
│  │  - /api/v1/telemetry/*                              │   │
│  │  - /api/v1/auth/*                                   │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                        │
│                    ▼                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Business Logic Services                   │   │
│  │  - DashboardService                                 │   │
│  │  - TelemetryService                                 │   │
│  │  - AIService (Groq + LangChain) ◄─────┐            │   │
│  └─────────────────┬───────────────────────┼────────────┘   │
│                    │                       │                │
│                    ▼                       │                │
│  ┌─────────────────────────────────────────┼────────────┐   │
│  │         Database Models (SQLAlchemy)    │            │   │
│  │  - LogModel                             │            │   │
│  │  - MetricsModel                         │            │   │
│  │  - EventModel                           │            │   │
│  │  - ServiceModel                         │            │   │
│  └─────────────────┬───────────────────────┼────────────┘   │
│                    │                       │                │
│                    ▼                       │                │
│  ┌─────────────────────────────────────────┼────────────┐   │
│  │          MySQL Database                 │            │   │
│  │  - logs, metrics, events, services      │            │   │
│  └─────────────────────────────────────────┼────────────┘   │
│                                            │                │
│                                            │                │
│                                 External API Call          │
│                                            │                │
│                                            ▼                │
│                              ┌──────────────────────┐       │
│                              │   Groq Cloud API     │       │
│                              │  (AI/ML Inference)   │       │
│                              └──────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Environment Variables Required

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Backend (.env)

```bash
DATABASE_URL=mysql://user:password@localhost:3306/ops_guard
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Running the Application

### Backend

```bash
cd services/api
source venv/Scripts/activate  # Windows
python main.py
# Server runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### Database

```bash
# Run migrations
cd services/api
alembic upgrade head

# Seed fixtures (optional)
python seed_fixtures_direct.py
```

---

## Conclusion

All frontend dashboard components are now successfully connected to the backend API using React Query hooks. The integration follows best practices by:

1. ✅ **No useEffect for data fetching** - All components use React Query hooks
2. ✅ **Proper loading states** - Skeleton UI and loading indicators
3. ✅ **Empty state handling** - User-friendly messages when no data
4. ✅ **Type safety** - TypeScript + Pydantic schemas
5. ✅ **AI Integration** - Real Groq AI predictions via LangChain
6. ✅ **Pagination** - Server-side pagination for large datasets
7. ✅ **Error handling** - Graceful error states and logging
8. ✅ **Performance** - Query caching and background refetching

The platform is now ready for testing and can display real-time incident data, AI-powered root cause analysis, and service health metrics!
