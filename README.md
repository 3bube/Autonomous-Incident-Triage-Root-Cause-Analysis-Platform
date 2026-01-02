# Autonomous Incident Triage & Root Cause Analysis Platform

An intelligent platform that automatically identifies, categorizes, and analyzes system incidents to determine their root causes using AI/ML.

## 🎯 What Does It Do?

When something goes wrong in your system:

- **Automatically detects** incidents from alerts and logs
- **Prioritizes** them based on severity and impact
- **Analyzes** what caused the problem
- **Recommends** fixes and preventive actions

Instead of engineers spending hours investigating, this platform does it automatically.

---

## 📁 Project Structure

```
.
├── frontend/                 # React/Next.js web interface
│   ├── app/                 # Pages and layouts
│   ├── public/              # Static files
│   └── package.json         # Dependencies
├── services/
│   ├── api/                 # FastAPI backend (main service)
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   └── alembic/         # Database migrations
│   ├── ingestion/           # Data collection from alerts/logs
│   ├── ml-engine/           # AI models for analysis
│   ├── stream-processor/    # Real-time data processing
│   └── telemetry-simulation/ # Test data generator
├── infra/
│   ├── docker/              # Container configurations
│   ├── k8s/                 # Kubernetes deployment
│   └── terraform/           # Infrastructure as Code
└── .github/                 # GitHub workflows & docs
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.13+
- Node.js/npm (for frontend)
- PostgreSQL (or Neon)

### Backend Setup

```bash
cd services/api

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python -m alembic upgrade head

# Run the API
python main.py
```

API runs at: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🗄️ Database

Uses **PostgreSQL** with automatic migrations via Alembic.

**Main tables:**

- `users` - System users and authentication
- `organizations` - Companies/teams
- `incidents` - Reported problems
- `services` - Monitored applications
- `alerts` - Alert notifications
- `root_cause_hypotheses` - Identified root causes
- `incidents_clusters` - Grouped similar incidents

Run migrations with: `python -m alembic upgrade head`

---

## 🛠️ Development

### Backend

- **Framework:** FastAPI
- **Database:** SQLAlchemy ORM + Alembic
- **Auth:** JWT + bcrypt
- **Logging:** Python logging

### Frontend

- **Framework:** React 19 + Next.js
- **Language:** TypeScript
- **Build:** Vite
- **Linting:** ESLint

### Linting

```bash
# Frontend
npm run lint

# Backend
# Coming soon
```

---

## 📊 Key Features

- **Multi-tenant support** - Isolate data by organization
- **Role-based access control** - User permissions
- **Real-time incident tracking** - Live updates
- **ML-powered root cause analysis** - AI-driven insights
- **REST API** - Easy integration
- **Docker ready** - Deploy anywhere

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

### Incidents

- `GET /api/incidents` - List all incidents
- `POST /api/incidents` - Create incident
- `GET /api/incidents/{id}` - Get details
- `PUT /api/incidents/{id}` - Update incident

### Root Causes

- `GET /api/root-causes/{incident_id}` - Get analysis
- `POST /api/root-causes` - Create hypothesis

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t incident-api -f infra/docker/Dockerfile services/api

# Run container
docker run -p 8000:8000 incident-api
```

---

## 📚 Environment Variables

Create `.env` file in `services/api/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/incident_db
ENVIRONMENT=development
DEBUG=True
JWT_SECRET=your_secret_key_here
```

---

## 🧪 Testing

```bash
# Run tests (coming soon)
pytest
```

---

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -am "Add my feature"`
3. Push to branch: `git push origin feature/my-feature`
4. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Support

For issues or questions, open a GitHub issue or contact the team.
