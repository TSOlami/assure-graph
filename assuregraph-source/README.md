# AssureGraph GRC Platform

An AI-powered Governance, Risk, and Compliance (GRC) platform for modern enterprises.

## Features

### Core Modules

- **Dashboard** - Centralized view of compliance posture, AI insights, and key metrics
- **Tasks** - AI-prioritized task management with cross-module drill-downs
- **Integrations** - Connect with 100+ tools for automated evidence collection
- **Personnel** - Manage team members and compliance roles
- **Policy Center** - Centralized policy management with AI suggestions
- **Exceptions** - Track and manage policy exceptions

### Compliance Modules

- **Monitoring** - Continuous compliance monitoring with AI-detected issues
- **Frameworks** - Track compliance across 50+ frameworks (SOC 2, ISO 27001, PCI DSS, HIPAA, GDPR)
- **Controls** - Design, test, and monitor security controls
- **Audits** - Simplify audit workflows with AI-assisted preparation
- **Evidence** - Automated evidence collection and AI-powered mapping
- **Findings** - Track and remediate audit findings
- **Documents** - Centralized document library
- **Reports** - AI-enhanced compliance reporting

### Risk Management Modules

- **Risk Management** - Identify, assess, and mitigate enterprise risks
- **Risk Register** - Complete inventory of identified risks
- **Risk Assessment** - AI-assisted risk assessment workflows
- **Risk Acceptance** - Manage accepted risks with review schedules
- **Vendors** - Third-party vendor risk assessment
- **Assets** - IT asset inventory for compliance
- **Vulnerabilities** - Security vulnerability tracking and remediation

### Special Features

- **AssureAI** - AI-powered insights, predictions, and recommendations
- **Auditor View** - Read-only portal for external auditors
- **Cross-Module Navigation** - Seamless drill-downs (Task → Control → Evidence)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assuregraph-grc
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
app/
├── page.tsx                 # Homepage
├── welcome/                 # Login page
├── onboarding/              # User onboarding flow
├── auditor-view/            # Read-only auditor portal
├── dashboard/               # Main dashboard
│   ├── layout.tsx           # Dashboard layout with sidebar
│   ├── page.tsx             # Dashboard overview
│   ├── tasks/               # Task management
│   ├── integrations/        # Tool integrations
│   ├── personnel/           # Team management
│   ├── policy-center/       # Policy management
│   ├── exceptions/          # Exception handling
│   ├── monitoring/          # Compliance monitoring
│   ├── frameworks/          # Framework compliance
│   ├── controls/            # Security controls
│   ├── audits/              # Audit management
│   ├── evidence/            # Evidence collection
│   ├── findings/            # Audit findings
│   ├── documents/           # Document library
│   ├── reports/             # Compliance reports
│   ├── risk-management/     # Risk overview
│   ├── risk-register/       # Risk inventory
│   ├── risk-assessment/     # Risk assessment
│   ├── risk-acceptance/     # Risk acceptance
│   ├── vendors/             # Vendor management
│   ├── assets/              # Asset inventory
│   └── vulnerabilities/     # Vulnerability tracking
components/
└── ui/                      # Reusable UI components
lib/
└── utils.ts                 # Utility functions
```

## Key Features

### AI-Powered Capabilities

- **Predictive Risk Detection** - Identify emerging risks before they impact your business
- **Automated Evidence Mapping** - AI maps evidence to controls across multiple frameworks
- **Smart Task Prioritization** - Focus on what matters most with AI-ranked priorities
- **Natural Language Queries** - Ask questions about your compliance posture in plain English
- **Compliance Forecasting** - Predict future compliance scores based on current trends

### Role-Based Access

- **Admin** - Full access to all modules and settings
- **Operator** - Day-to-day compliance management
- **Auditor** - Read-only access to compliance documentation

## License

Proprietary - All rights reserved.

## Support

For support, contact support@assuregraph.com
