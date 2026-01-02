# Copilot Instructions for Autonomous Incident Triage & Root Cause Analysis Platform

## Project Overview

**Purpose**: A platform for automatically triaging incidents and determining root causes using AI/ML.

**Architecture**: Microservices-based with frontend UI and backend services.

```
frontend/          → React + TypeScript + Vite (SPA)
services/
  ├── api/         → REST API (Python - venv set up)
  ├── ingestion/   → Event/telemetry ingestion service
  ├── ml-engine/   → ML model inference and analysis
  ├── stream-processor/ → Real-time stream processing
  └── telemetry-simulation/ → Test data generation
infra/
  ├── docker/      → Container configurations
  ├── k8s/         → Kubernetes manifests
  └── terraform/   → Infrastructure as Code
```

## Frontend Development

**Tech Stack**: React 19, TypeScript, Vite, ESLint

**Key Commands**:

- `npm run dev` - Start dev server (HMR enabled at localhost:5173)
- `npm run build` - TypeScript compilation + Vite build (produces optimized dist/)
- `npm run lint` - Run ESLint static analysis

**File Organization** ([frontend/src/](frontend/src/)):

- `main.tsx` - React app entry point
- `App.tsx` - Root component (currently template)
- `index.css`, `App.css` - Global and component styling
- `assets/` - Static resources

**Conventions**:

- Components are `.tsx` files with React hooks (useState, etc.)
- TypeScript strict mode enabled (`tsconfig.json`)
- ESLint uses React plugin for hooks validation
- Absolute imports preferred over relative (if path alias configured)

## Backend Services (Python)

**Environment**: Virtual environment (`services/api/venv/`) configured

**Setup Pattern** (each service should follow):

1. Virtual environment for isolation
2. requirements.txt or pyproject.toml for dependencies
3. Entry point script (main.py / app.py)

**Key Services to Implement**:

- **API**: REST endpoints for incident management
- **Ingestion**: Consume telemetry/logs from various sources
- **ML Engine**: Analyze incidents, predict root causes, classify severity
- **Stream Processor**: Real-time processing of incoming telemetry
- **Telemetry Simulation**: Generate test incidents for development

## Integration Points

**Expected Data Flows**:

1. Frontend → API (HTTP REST)
2. Telemetry sources → Ingestion service (push/pull)
3. Ingestion → Stream Processor → ML Engine
4. ML Engine → API (inference results storage)
5. API → Frontend (query results)

**Dependencies Not Yet Visible** (likely needed):

- Message queue (Kafka, RabbitMQ, or similar for streaming)
- Data store (PostgreSQL, MongoDB)
- ML framework (sklearn, TensorFlow, PyTorch)

## Development Workflows

**Frontend Development**:

```bash
cd frontend
npm install  # First time only
npm run dev  # Watch mode with hot reload
```

**Backend Service Development**:

```bash
cd services/api
source venv/Scripts/Activate  # Windows: venv\Scripts\Activate.ps1
pip install -r requirements.txt  # if exists
python main.py  # or app.py
```

**Linting & Quality**:

- Frontend: `npm run lint` enforces React/TypeScript standards
- Backend: Plan for pylint/black/mypy with git hooks

## Important Patterns to Follow

1. **Service Isolation**: Each service should be independently deployable
2. **Configuration**: Use environment variables (not hardcoded credentials)
3. **Logging**: Structured logging with service name prefixes for debugging
4. **Error Handling**: Return consistent error formats (HTTP status codes, error messages)
5. **Testing**: Tests in service root or `tests/` subdirectory
6. **Docker**: Each service should have its own Dockerfile in `infra/docker/`

## File Locations Reference

- **Frontend config**: [frontend/vite.config.ts](frontend/vite.config.ts), [frontend/tsconfig.json](frontend/tsconfig.json)
- **Main frontend code**: [frontend/src/](frontend/src/)
- **API venv**: [services/api/venv/](services/api/venv/) (created; contains Python packages)
- **Infrastructure templates**: `infra/docker/`, `infra/k8s/`, `infra/terraform/` (currently empty, needs population)

## Next Steps to Complete

1. **Implement service entry points** (main.py for each Python service)
2. **Define API schema** (OpenAPI/Swagger documentation)
3. **Set up Docker files** in `infra/docker/`
4. **Configure Kubernetes manifests** for deployment
5. **Add database schema** and migrations
6. **Create test fixtures** for telemetry simulation
