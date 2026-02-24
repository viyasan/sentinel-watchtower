# Sentinel WatchTower — Development Journal

> A complete record of every prompt, design decision, and revision made during the build of Sentinel, an AI-native AML compliance dashboard prototype. Built by **Viyasan Ariyarathnam** using Claude (Anthropic), February 23–24, 2026.

---

## Table of Contents

1. [Project Context](#1-project-context)
2. [Session 1 — Research & System Design](#2-session-1--research--system-design)
3. [Session 2 — V1 Build: Core Alert Queue + AI Assistant](#3-session-2--v1-build-core-alert-queue--ai-assistant)
4. [Session 3 — V2: Wealthsimple Brand Redesign](#4-session-3--v2-wealthsimple-brand-redesign)
5. [Session 4 — V3: 6-System Intelligence Stack](#5-session-4--v3-6-system-intelligence-stack)
6. [Session 5 — Compliance Job Posting Research](#6-session-5--compliance-job-posting-research)
7. [Session 6 — V4: Feature Integration (6 New Features)](#7-session-6--v4-feature-integration-6-new-features)
8. [Session 7 — V5: Behavioral Delta + Activity Logs + Login](#8-session-7--v5-behavioral-delta--activity-logs--login)
9. [Revision Summary Table](#9-revision-summary-table)
10. [Technical Decisions & Trade-offs](#10-technical-decisions--trade-offs)
11. [What's Next (Claude Code Roadmap)](#11-whats-next-claude-code-roadmap)

---

## 1. Project Context

**Goal:** Build a working prototype of an AI-native AML (Anti-Money Laundering) compliance dashboard as a portfolio piece demonstrating deep knowledge of:
- Canadian crypto compliance (FINTRAC reporting, Bill C-15 Stablecoin Act)
- Wealthsimple's actual compliance tech stack (Persona, Plaid, Flinks, Chainalysis, TRM Labs, Elliptic)
- AI-augmented analyst workflows where humans remain the decision-makers
- Stablecoin-specific monitoring (CADD, USDC, USDT)

**Background:** The builder (Viyasan) has direct experience in crypto partnerships at Mastercard, managing integrations with Alchemy, BitGo, Kraken, and Gemini. He also has deep knowledge of Canada's emerging stablecoin regulatory framework through research into Tetra Trust's CADD stablecoin, the C.D. Howe Institute paper, and Bill C-15 compliance requirements.

**Tech:** Single-file React component (.jsx) with live Claude API integration, rendering as an interactive artifact. All mock data, components, and CSS in one file.

---

## 2. Session 1 — Research & System Design

**Date:** February 23, 2026

### Prompt 1: Initial Build Request
> "No mobile responsiveness required. Yes add live Claude API call. Make this Wealthsimple brand design colours, no dark mode, only light mode."

**Context:** Continued from a prior deep research session where the full system was planned. The research had already mapped:
- Wealthsimple's current compliance stack (Persona for KYC, Plaid/Flinks for bank verification, Chainalysis/TRM Labs/Elliptic for on-chain analytics)
- The legacy AML analyst workflow and its bottlenecks
- How Bill C-15 would create new compliance obligations around stablecoins
- Tetra/CADD's role as a Wealthsimple-invested stablecoin

### Prompt 2: Planning Deep Dive
> "Let's clearly plan this out — how is AI being used to benefit Wealthsimple compliance? How will Canada's stablecoin new laws affect compliance? Tetra stablecoin involvement here? Let's keep planning first."

**Why this revision:** Rather than jumping straight into code, I wanted to ensure the system design was grounded in real regulatory requirements and actual analyst pain points. The planning session produced:
- A detailed mapping of how AI transforms each step of the legacy workflow
- Analysis of Bill C-15's specific compliance implications for Wealthsimple
- The CADD/Tetra angle (Wealthsimple is both an investor and design partner)
- Architecture for 3 modules: AI KYC Reviewer, Stablecoin Transaction Monitor, AI Investigation Assistant

### Prompt 3: Mock Data Design
> Selected: "Still need to plan more" + "Mock data design (realistic cases)"

**Why this revision:** The mock data IS the demo. If the cases feel generic, the whole system feels like a toy. I chose to invest time in designing 12 realistic AML cases across 3 risk tiers:

**High Risk (3 cases):**
- H1: Marcus Chen — Structuring (repeated sub-$10K CADD purchases to avoid LVCTR thresholds)
- H2: Reza Mohammadi — Iran Sanctions Directive (wallet traces 2 hops to Iran-nexus services)
- H3: Mule Network — 3 university student accounts receiving CADD from pig butchering scam cluster

**Medium Risk (3 cases):**
- M1: David Thompson — Large Transaction ($85K CADD to Coinbase institutional custody, clean but requires LVCTR)
- M2: Anika Okafor — Behavioral Change (18-month DCA trader suddenly liquidated everything into CADD)
- M3: Jean-Pierre Dubois — Travel Rule Incomplete (CADD from French exchange, missing beneficiary address)

**Low Risk / Auto-Resolved (6 cases):**
- L1–L6: Various false positives (DCA pattern, roundtrip testing, family transfers, business payments, stablecoin swaps, payroll off-ramp)

---

## 3. Session 2 — V1 Build: Core Alert Queue + AI Assistant

**Date:** February 23, 2026

### Prompt 4: Build Approval
> Approved the plan to build all 3 modules with the combined stablecoin compliance + AI efficiency angle.

**V1 Delivered:**
- Left sidebar alert queue with all 12 cases sorted by risk tier
- Case detail view with customer profiles, transaction timelines, on-chain analytics, and FINTRAC indicators
- 3 AI assistant buttons (Investigation Summary, Draft STR Narrative, FINTRAC Typology) making live Claude API calls
- "Human Decision Required" bar with File STR / File LVCTR / Dismiss / Escalate buttons
- Stablecoin Flow Monitor footer (CADD/USDC/USDT 24h volumes)
- Default view: Case H3 (Mule Network) as the star case

---

## 4. Session 3 — V2: Wealthsimple Brand Redesign

### Prompt 5: Design Polish Request
> Q: "What needs work next?"
> A: "Design/branding needs polish"

**Why this revision:** V1 looked like a generic dashboard. For this to be convincing as something Wealthsimple could actually build, it needed to match their design DNA.

**Research conducted:** Studied Wealthsimple's actual design language — extreme minimalism, warm tones (Dune #32302F), marigold/gold accents, generous whitespace, almost zero box-shadows, DM Sans typography.

**V2 Changes:**
- **Color system** rebuilt with CSS variables — warmer grays (#F9F9F7, #F3F2EF, #ECEAE6) replacing cold ones
- **Typography** tightened — DM Sans with proper weight hierarchy, JetBrains Mono only for data
- **Spacing** dramatically increased — Wealthsimple breathes
- **Shadows eliminated** — distinguished by subtle background color shifts and thin borders only
- **Gold accent** refined to #D4A843 (Wealthsimple "marigold") for AI Assessment card
- **Network visualization** added for H3 showing 3 linked mule accounts connected by dashed lines to common source wallet

---

## 5. Session 4 — V3: 6-System Intelligence Stack

### Prompt 6: Overview Dashboard Request
> Feedback indicated the need for a "command center" landing view — what does an analyst see when they start their shift?

**V2.5 Addition:** Overview/Daily Brief panel as default landing view with:
- Alert breakdown badges (Critical / Review / Resolved)
- 5 key metrics (Total Alerts, Auto-Resolved, Pending Review, Flagged Volume, Auto-Resolve Rate)
- Alert breakdown by typology with visual bars
- Pending FINTRAC filings summary (STR, LVCTR, Travel Rule counts)
- Priority cases with click-through navigation

### Prompt 7: Intelligence Stack Integration
> The case view needed to show WHERE the data came from — not just conclusions, but raw intelligence from each compliance tool.

**V3 Delivered:** 6-tab Intelligence Sources panel per case:

| Tab | System | Data Shown |
|-----|--------|-----------|
| 1 | Persona | ID type, selfie match %, behavioral signals, PEP/watchlist/adverse media, device fingerprint |
| 2 | Plaid | Bank institution, identity match score bars (name/email/phone/address), Trust Index, network fraud signals |
| 3 | Flinks | Income source + amount, cash flow, large deposits, crypto transfers, anomaly alerts |
| 4 | Chainalysis | Per-wallet risk cards with severity badges, exposure breakdowns, counterparty attribution, cross-chain flags |
| 5 | TRM Labs | Risk volume %, VASP attribution, ownership/counterparty/indirect risk breakdown |
| 6 | Sanctions | PEP status, lists screened, adverse media, ongoing monitoring, changes since onboarding |

Each of the 12 cases got unique, realistic mock data across all 6 systems. The AI Assistant was also updated to receive intel from all 6 systems when generating narratives.

**Why this mattered:** A real compliance analyst's workflow involves pulling data from these exact tools. Showing the raw intelligence alongside the AI synthesis proves the system is grounded in how compliance actually works.

---

## 6. Session 5 — Compliance Job Posting Research

### Prompt 8: End-User Validation
> "Let's start by finding all the job postings for Wealthsimple's compliance department, let's review their descriptions to see what's required and if we have anything relevant."

**Why this revision:** Before adding more features, I wanted to validate the prototype against what Wealthsimple's actual compliance team does day-to-day.

**Research found 5 roles:**
1. AML Analyst ($55K–$67K)
2. Senior AML Analyst, Crypto ($69K–$87K)
3. Team Lead, AML ($84K–$105K)
4. Senior Manager, Lending & Credit Compliance
5. Fraud Investigator

**Key validations:**
- Every tool in our stack (Chainalysis, TRM Labs, sanctions screening) explicitly named in requirements
- Analysts measured on SLA turnaround time and QA scores (both surfaced in our Daily Brief)
- Team Lead reviews and approves complex cases (maps to our role switcher)
- Certifications in Chainalysis, TRM Labs, Elliptic mentioned (validates our 7-tab intel panel)

**Gaps identified:**
1. EFTR (Electronic Funds Transfer Reports) — mentioned alongside STRs/LVCTRs but not in our filing options
2. Elliptic — third blockchain analytics tool they use, not yet in our intel tabs
3. Case file export — analysts need to "prepare comprehensive case files"
4. QA review workflow — senior analysts review junior work
5. SLA timer — analysts manage "multiple alerts within SLA timeframes"
6. Calibration mode — ability to share cases for team review

---

## 7. Session 6 — V4: Feature Integration (6 New Features)

### Prompt 9: Address All Gaps
> "Yes, I like the 1, 2 and 3 gaps you mentioned. Let's work on addressing those. As well, let's work on the below you mentioned in the report: EFTR, Elliptic, Case file export, QA review workflow, SLA timer, Calibration mode. Let's plan this all in detail."

**Why this revision:** The job posting research revealed specific features that would make the demo feel like it was built BY someone who understands compliance workflows, not just someone who built a pretty dashboard.

**V4 Features Added:**

| Feature | Implementation | Why It Matters |
|---------|---------------|---------------|
| **EFTR Filing** | New button in Decision Bar alongside STR/LVCTR | Analysts file EFTRs for electronic fund transfers — shows knowledge of full FINTRAC reporting suite |
| **Elliptic** | 7th intel tab with holistic risk score, wallet risk, entity risk, compliance risk breakdown | Third blockchain analytics tool Wealthsimple uses — completes the trifecta |
| **Case Export** | ↓ Export button generates structured text case file with all sections | Analysts prepare case files for legal/regulatory review — export proves production readiness |
| **QA Review** | Role switcher (Analyst ↔ Lead), Lead sees Approve/Return/Override instead of file buttons | Senior analysts review junior work — dual-role UI shows understanding of team hierarchy |
| **SLA Timers** | Countdown badges per case (4h critical, 8h high, 24h medium), status colors | Analysts manage alerts within SLA timeframes — visible timers create urgency |
| **Calibration Mode** | Overlay panel for sharing cases with team, discussion notes, difficulty ratings | Team training and alignment tool — shows awareness of compliance culture |

---

## 8. Session 7 — V5: Behavioral Delta + Activity Logs + Login

**Date:** February 24, 2026

### Prompt 10: Article-Inspired Features
> Based on analysis of a Persona (identity verification company) article about stablecoin compliance, two new features were planned that map to real compliance needs.

**Why this revision:** The article highlighted that stablecoin compliance requires monitoring behavioral changes over time and maintaining complete audit trails. These are exactly the gaps between "good" and "great" compliance tooling.

### Feature A: Behavioral Delta View
Shows before/after behavioral comparison for each case:
- Baseline period metrics vs. current period metrics
- Risk trajectory timeline with colored dots (low → medium → high → severe)
- Confidence level + plain-English explanation
- Severity-based styling

**Most dramatic examples:**
- H2 (Reza): 17.1× volume spike, LOW → SEVERE trajectory, Iran-nexus destination
- H3 (Mule Network): Dormant → Active, synchronized 3-account cash-out
- H1 (Marcus): Structuring pattern, 2.3× income ratio

### Feature B: Case Activity Log
Collapsible audit trail per case showing:
- Timestamped events: alert generation, analyst actions, AI usage, decisions, QA, exports
- Color-coded by type (amber = alerts, red = decisions, green = QA)
- Today vs Earlier date separators
- Historical entries (account opening, risk reclassifications)

### Prompt 11: Size Optimization
The v5 build hit 100KB — too large for reliable artifact rendering. Multiple optimization passes were required:

**Removed/compressed:**
- FlowBar component (stablecoin flows footer)
- Recent Activity feed from Overview
- Duplicate wallet entries from INTEL
- Verbose string values across all data
- Several Persona fields (device, IP, adverseMedia, tamperChecks, DOB, selfieMatch, addressExtracted)
- Flinks gambling field
- Multiple Plaid fields (accountAge, trustLabel, balance for some cases)
- Chainalysis verbose fields (behavioral, alertType, cluster, confidence, monitoring)
- TRM/Elliptic: shortened field names (riskLevel→rl, holisticScore→hs, walletRisk→wr, etc.)
- Transaction data: consolidated H1 (12→9 txns), H3 (12→4 summary rows)
- Activity logs: merged redundant entries
- CSS: minified, removed unused classes

**Final size: ~86KB** (with login screen)

### Prompt 12: Login Screen
> "Add a fake login screen for demo polish"

**Why this revision:** A login screen makes the demo feel like a real internal tool rather than a prototype that just loads. Small detail, big impact on perceived production-readiness.

**LoginScreen features:**
- Pre-filled email: v.ariyarathnam@wealthsimple.com
- Password field (any input works)
- SSO buttons: Okta SSO, Microsoft AD
- 1.2-second "Authenticating..." animation
- FINTRAC compliance footer
- Environment badge: "COMPLIANCE ENVIRONMENT · FINTRAC REGULATED · AML/ATF"

### Prompt 13: Personalization
> "Let's replace J.Kim everywhere with my name, Viyasan Ariyarathnam"

Updated 15 references across login email, role switcher, and all activity logs.

---

## 9. Revision Summary Table

| Version | Date | Key Changes | Size | Trigger |
|---------|------|-------------|------|---------|
| V1 | Feb 23 | Core alert queue, 12 cases, AI assistant, decision bar, stablecoin flow monitor | ~30KB | Initial build from research plan |
| V2 | Feb 23 | Wealthsimple brand redesign (colors, typography, spacing, shadows), network visualization | ~35KB | "Design/branding needs polish" |
| V2.5 | Feb 23 | Overview/Daily Brief dashboard as default landing | ~40KB | "What does an analyst see when they start their shift?" |
| V3 | Feb 23 | 6-system intelligence stack (Persona, Plaid, Flinks, Chainalysis, TRM, Sanctions) with unique mock data per case | ~55KB | Need to show raw intelligence sources, not just conclusions |
| V4 | Feb 24 | EFTR filing, Elliptic analytics, case export, QA workflow, SLA timers, calibration mode | ~75KB | Job posting research revealed 6 feature gaps |
| V5 | Feb 24 | Behavioral delta view, case activity logs, login screen, size optimization, personalization | ~86KB | Persona stablecoin compliance article + demo polish |

---

## 10. Technical Decisions & Trade-offs

### Single-File Architecture
**Decision:** Keep everything in one .jsx file rather than splitting into modules.
**Rationale:** The artifact rendering environment requires a single default export. Multi-file would require a build system.
**Trade-off:** File is large (86KB) but self-contained and portable.

### Size Constraints
**Problem:** Artifact rendering becomes unreliable above ~85-90KB.
**Solution:** Aggressive data compression — shortened field names, removed verbose fields, consolidated transactions, minified CSS.
**What was sacrificed:** Some intel fields (Persona device/IP, Flinks gambling, some Plaid fields) were removed from medium-risk cases. Full data remains on high-risk cases where it matters most.

### Mock Data vs. Live API
**Decision:** All case data is hardcoded; only the AI Investigation Assistant makes live API calls.
**Rationale:** A compliance demo needs consistent, repeatable data. Live data would be unpredictable and couldn't demonstrate specific typologies.

### Claude API Integration
**Decision:** Uses Claude Sonnet 4 via direct API call from the browser.
**Implementation:** The system prompt instructs Claude to NEVER decide whether to file an STR — the human decides. For STR narratives it uses WHO/WHAT/WHEN/WHERE/WHY/HOW format with specific FINTRAC codes (IR2020 for Iran cases).

### Role Switcher (Analyst vs. Lead)
**Decision:** Implemented as a simple state toggle rather than actual authentication.
**Rationale:** Demonstrates the concept of role-based views without the complexity of auth. The Lead view transforms the Decision Bar into a QA Review panel.

---

## 11. What's Next (Claude Code Roadmap)

Features planned for continued development in Claude Code:

### Priority 1 — Architecture
- [ ] Split into proper React project structure (Vite + TypeScript)
- [ ] Separate components, data, and styles into modules
- [ ] Add proper routing (react-router)
- [ ] Environment variable management for API keys

### Priority 2 — Data Layer
- [ ] Move mock data to JSON fixtures
- [ ] Add Supabase backend for persistent case state
- [ ] Real-time updates via Supabase subscriptions
- [ ] User authentication (Supabase Auth)

### Priority 3 — Features
- [ ] Restore FlowBar (stablecoin flows footer) with real-time data
- [ ] Add network graph visualization (D3.js) for mule network cases
- [ ] Streaming AI responses (replace simulated character-by-character with real SSE)
- [ ] PDF export for case files (using react-pdf)
- [ ] Notification system for SLA breaches
- [ ] Batch case review mode

### Priority 4 — Production Polish
- [ ] Responsive design for tablet/large screens
- [ ] Keyboard shortcuts for analyst workflow
- [ ] Dark mode support
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Performance optimization (React.memo, virtualized lists)

---

## Appendix: File Inventory

| File | Description |
|------|-------------|
| `sentinel-v5.jsx` | Complete v5 source — single-file React component (86KB) |
| `DEVELOPMENT_JOURNAL.md` | This file — full prompt history and revision rationale |
| `README.md` | Project overview, setup instructions, and feature list |

---

*Built with Claude by Anthropic · February 2026*
