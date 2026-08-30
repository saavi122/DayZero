# DayZero Directory Layout

This document outlines the complete directory layout and architecture of the DayZero repository.

```text
DayZero/
├── frontend/                   # React Single Page Application & Static Assets
│   ├── public/                 # Static Assets & Legacy Simulation Room Bundle
│   │   ├── frontend/
│   │   │   ├── css/            # Simulation room styling sheets (simulation.css)
│   │   │   ├── js/             # Simulation room controllers (simulation.js)
│   │   │   └── pages/          # Embedded simulation room iframe target (simulation.html)
│   │   └── favicon.svg         # Platform favicon
│   ├── src/                    # Native React Application (Vite + React)
│   │   ├── components/         # Modular React UI Components
│   │   │   ├── dashboard/      # Candidate Dashboard Components & Panels
│   │   │   │   └── panels/     # Workspace, SkillRecord, Projects, Insights Panels
│   │   │   └── recruiter/      # Recruiter OS Components & Candidate Detail Modals
│   │   ├── pages/              # Main Page Views (Dashboard, RecruiterDashboard, ResultsPage, SimulationRoom)
│   │   ├── styles/             # Application Global CSS Stylesheets
│   │   ├── App.jsx             # Top-Level Router & Route Persistence State
│   │   └── main.jsx            # Application Mounting Entry Point
│   ├── vercel.json             # Single-Project Vercel Routing Configuration
│   ├── package.json            # Frontend Dependencies & Scripts
│   └── vite.config.js          # Vite Build & Asset Configuration
│
├── backend/                    # Flask Backend Microservice Core
│   ├── services/               # Simulation Orchestrator & Evaluation Engines
│   │   ├── evaluation.py       # 3-Layer Evaluation System & SkillRecord Synthesis
│   │   └── orchestrator.py     # Live Sprint Orchestration & Room Management
│   ├── app.py                  # Primary Flask API Router & Endpoints
│   ├── auth.py                 # Identity & Domain Verification Service
│   ├── requirements.txt        # Backend Dependencies
│   └── .env.example            # Backend Environment Variables Template
│
├── ai_engine/                  # Multi-Agent Generative Core
│   ├── agents/                 # Agent Definitions (evaluator.py, PMAgent.py, LeadAgent.py, etc.)
│   ├── config/                 # AI Engine Configuration Settings
│   └── core/                   # LLM Client Integrations (gemini_client.py, llm.py, prompts.py)
│
├── db/                         # Database Schema Configurations
│   └── schema.sql              # Static Relational Database Initialization Scripts
│
├── docs/                       # Platform Documentation & Visual Assets
│   └── assets/                 # Architecture Diagrams & Interface Previews
│
├── tests/                      # Automated Testing Framework
│   └── test.py                 # Simulation & Endpoint Automated Tests
│
├── .env.example                # Root Environment Variables Template
├── .gitignore                  # Git Version Control Exclusions
├── FOLDER_STRUCTURE.md         # Detailed Directory Layout Documentation
└── README.md                   # System Architecture & Setup Guide
```

## Core Subsystem Descriptions

### Frontend (`/frontend`)
The frontend is built with React and Vite. It contains the Landing Page, Candidate Dashboard, Recruiter OS, and Official SkillRecord Verification Page. The live sprint simulation workspace is embedded via an iframe wrapper to preserve real-time multi-file state without DOM conflicts.

### Backend (`/backend`)
The backend is built with Python and Flask. It exposes REST API endpoints for user authentication, candidate invitations, domain validation, session management, and evaluation generation.

### AI Engine (`/ai_engine`)
The AI engine orchestrates simulated teammates (Asha - PM, Ravi - Lead, Mira - UX, Kenji - QA, Leah - Data Analyst) and background evaluation agents (Quinn Evaluator, Observer Agent).

### Database Layer (`/db`)
Stores candidate accounts, active sprint room sessions, behavioral transcripts, and recruiter enterprise domain permissions across MongoDB Atlas and relational SQL schemas.
