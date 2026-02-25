# Sentinel WatchTower

**AI-Native AML Compliance Dashboard for Canadian Crypto Platforms**

Sentinel is a working prototype of an AI-powered Anti-Money Laundering (AML) compliance tool designed for Canadian crypto platforms operating under FINTRAC regulations and the upcoming Bill C-15 (Stablecoin Act). It demonstrates how AI can transform compliance analyst workflows — handling triage, investigation assembly, and narrative drafting — while keeping humans in control of all legal filing decisions.

---

## Live Features

### Core Dashboard
- **Alert Queue** — 12 cases across 3 risk tiers (High / Medium / Auto-Resolved), sorted by severity
- **Overview / Daily Brief** — Command center showing alert breakdown, pending filings, priority cases, SLA status, and QA pipeline
- **Case Detail View** — Full customer profiles with transaction timelines, risk indicators, and filing requirements
- **AI Case Analysis** - Analyzes case by pulling various 3rd party data together for senior approval
- **Case Log Internal View** - Tracking case log activity, including view, shares, copies, etc. 

### 7-System Intelligence Stack
Each case includes realistic mock data from the actual tools used by Canadian crypto compliance teams:

| System | Purpose |
|--------|---------|
| Persona | Identity verification (selfie match, ID docs, behavioral signals) |
| Plaid | Bank verification (identity match scores, trust index) |
| Flinks | Banking data (income, cash flow, anomaly detection) |
| Chainalysis | On-chain analytics (wallet risk, exposure, counterparty attribution) |
| TRM Labs | Wallet screening (risk volume, VASP attribution) |
| Elliptic | Holistic blockchain analytics (wallet/entity/compliance risk) |
| Sanctions/PEP | Watchlist screening (OFAC, UN, EU, Canada SEMA) |

### AI Investigation Assistant
Three live Claude API actions per case:
- **Investigation Summary** — Synthesizes intelligence from all 7 systems
- **Draft STR Narrative** — FINTRAC-compliant Suspicious Transaction Report using WHO/WHAT/WHEN/WHERE/WHY/HOW format
- **FINTRAC Typology** — Identifies matching ML/TF indicators with confidence ratings

### Compliance Features
- **Human Decision Bar** — File STR / File LVCTR / File EFTR / Dismiss / Escalate (AI drafts, human decides)
- **Role Switcher** — Toggle between Analyst and Lead views (Lead sees QA Approve/Return/Override)
- **SLA Timers** — Countdown badges per case (4h critical, 8h high, 24h medium)
- **Case Export** — Download structured case files with all evidence
- **Calibration Mode** — Share cases for team training and alignment
- **Behavioral Delta View** — Before/after behavioral comparison with risk trajectory timeline
- **Activity Log** — Timestamped audit trail per case (alerts, actions, AI usage, decisions, QA)
- **Login Screen** — Branded authentication screen with Okta/Microsoft SSO options

### Mock Cases

**High Risk:**
- Structuring (sub-$10K CADD purchases avoiding LVCTR threshold)
- Iran Sanctions Directive (wallet traces to Iran-nexus services)
- Mule Network (3 student accounts cashing out pig butchering scam proceeds)

**Medium Risk:**
- Large Transaction ($85K CADD to institutional custody — LVCTR required)
- Behavioral Change (sudden portfolio liquidation into new wallet)
- Travel Rule Incomplete (cross-border CADD missing beneficiary data)

**Auto-Resolved (6):** DCA patterns, roundtrip testing, family transfers, business payments, stablecoin swaps, payroll off-ramp

---

## Tech Stack

- **React** (single-file JSX component)
- **Claude API** (Anthropic) — live AI investigation assistant
- **CSS-in-JS** — Wealthsimple-inspired design system (DM Sans, warm grays, marigold accents)

---

## Setup

### As Claude.ai Artifact
1. Open [claude.ai](https://claude.ai)
2. Paste the contents of `sentinel-v5.jsx` into a new conversation
3. Ask Claude to render it as a React artifact

### As Standalone React App (Claude Code)
```bash
# Clone the repo
git clone https://github.com/viyasan/sentinel-watchtower.git
cd sentinel-watchtower

# TODO: Convert to Vite + React project structure
# See DEVELOPMENT_JOURNAL.md for roadmap
```

---

## Development History

See **[DEVELOPMENT_JOURNAL.md](./DEVELOPMENT_JOURNAL.md)** for a complete record of every prompt, design decision, and revision across all 5 versions — from initial research through final build.

**Version Timeline:**
| Version | Key Addition |
|---------|-------------|
| V1 | Core alert queue + AI assistant + 12 cases |
| V2 | Wealthsimple brand redesign |
| V3 | 6-system intelligence stack with per-case mock data |
| V4 | EFTR, Elliptic, export, QA workflow, SLA timers, calibration |
| V5 | Behavioral delta, activity logs, login screen |

---

## Regulatory Context

This prototype addresses compliance requirements under:
- **FINTRAC** — Canada's financial intelligence unit (STR, LVCTR, EFTR reporting)
- **Bill C-15 (Stablecoin Act)** — Upcoming federal regulation for stablecoin issuers and dealers
- **Iran Ministerial Directive** — STR with IR2020 code required for any amount involving Iran-nexus transactions
- **Travel Rule** — Originator/beneficiary information requirements for crypto transfers

---

## Author

**Viyasan Ariyarathnam**
- Builder of [StablecoinStats.ca](https://stablecoinstats.ca)
- Expertise in crypto partnerships, compliance frameworks, and enterprise integration

---

## License

This project is currently for portfolio and demonstration purposes. Exploring commericialization. 
