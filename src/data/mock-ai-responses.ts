import type { AIAction } from '../types/index.js';

interface ResponseMap {
  [caseId: string]: {
    [action in AIAction]?: string;
  };
}

export const MOCK_AI_RESPONSES: ResponseMap = {
  H1: {
    summary: `INVESTIGATION SUMMARY — H1: Marcus Chen

RISK ASSESSMENT: HIGH (87) — Structuring

Marcus Chen, 28, self-employed import/export consultant based in Vancouver, BC. Account opened June 2025 with initial risk score of 18 (Low).

KEY FINDINGS:
• 12 transactions totaling $116,300 over 23 days (Feb 1–23, 2026)
• Systematic sub-$10,000 CADD purchases — 8 separate buys ranging $9,500–$9,800
• All transfers directed to 2 unhosted wallets (0x4d2c...a891)
• 30-day crypto volume is 2.3× stated annual income from consulting
• Chainalysis: 62% indirect exposure to TradeOcean (unlicensed exchange)
• Cross-chain movement: ETH → TRON within 2 hours (layering indicator)
• Flinks confirms irregular income ($4,200/mo avg) inconsistent with transaction volume

INTEL CONSENSUS (7/7 systems):
- Persona: Passed KYC ✓
- Plaid: Trust Index 68 (below average)
- Flinks: ⚠ Crypto volume 2.3× annual income
- Chainalysis: SEVERE (8.7) — unlicensed exchange cluster
- TRM Labs: SEVERE (8.9) — 68% risk volume
- Elliptic: SEVERE (8.4) — 3 rules fired including mixer exposure
- Screening: Clean — no sanctions/PEP hits

RECOMMENDATION FOR HUMAN REVIEW: Sub-$10K structuring pattern with high-risk destinations. Consider STR (structuring) + LVCTR filings.`,

    str: `SUSPICIOUS TRANSACTION REPORT — DRAFT
FINTRAC STR Narrative — Case H1

WHO: Marcus Chen, age 28, self-employed import/export consultant ("Chen Import Consulting"). Canadian citizen residing at 4891 Cambie St, Vancouver, BC. Account holder since June 2025. KYC verified via BC Driver's License (Persona — 96.2% selfie match).

WHAT: 12 virtual currency transactions totaling $116,300 CAD over a 23-day period. Pattern consists of repeated Canadian Dollar-denominated (CADD) purchases structured below the $10,000 Large Virtual Currency Transaction Report (LVCTR) threshold, followed by transfers to unhosted wallets associated with unlicensed exchange services.

WHEN: February 1–23, 2026. Activity commenced abruptly — account was dormant from opening (June 2025) through January 2026.

WHERE: Purchases executed on Wealthsimple Crypto platform. Transfers directed to wallet 0x4d2c...a891, identified by Chainalysis (risk score 8.7/10 — SEVERE) and TRM Labs (risk score 8.9/10 — SEVERE) as connected to TradeOcean, an unlicensed virtual currency exchange.

WHY: Transaction pattern is consistent with FINTRAC ML/TF Indicator #1 (structuring to avoid reporting thresholds) and Indicator #7 (transactions inconsistent with customer profile). 30-day volume of $116,300 represents approximately 2.3× the customer's stated annual income.

HOW: Customer purchases CADD in amounts ranging from $9,500 to $9,800 (consistently below the $10,000 LVCTR threshold), then transfers to unhosted wallets within 1–3 days. Cross-chain bridging from ETH to TRON detected within 2 hours of transfer, suggesting layering.

FILING: STR (structuring) + 2× LVCTR for aggregate threshold.`,

    typology: `FINTRAC ML/TF TYPOLOGY ANALYSIS — H1: Marcus Chen

MATCHED INDICATORS:

1. STRUCTURING (Confidence: HIGH — 95%)
   ML/TF Indicator #1: "Transactions structured to avoid reporting thresholds"
   • 8 CADD purchases between $9,500–$9,800 (below $10,000 LVCTR)
   • Consistent sub-threshold amounts suggest deliberate avoidance
   • Pattern: Buy → Transfer → Buy → Transfer (12 cycles in 23 days)

2. PROFILE INCONSISTENCY (Confidence: HIGH — 92%)
   ML/TF Indicator #7: "Transactions inconsistent with customer's profile"
   • $116,300 volume vs. $4,200/mo stated income (2.3× annual)
   • Self-employed with irregular income pattern
   • No prior crypto activity (Jun–Dec 2025 dormant)

3. RAPID MOVEMENT (Confidence: HIGH — 88%)
   ML/TF Indicator #3: "Virtual currency converted/transferred within short period"
   • Buy-to-transfer within 1–3 days
   • Cross-chain bridging ETH → TRON < 2 hours
   • No holding period observed

4. HIGH-RISK DESTINATIONS (Confidence: MEDIUM — 75%)
   ML/TF Indicator #12: "Transfers to wallets linked to unlicensed services"
   • 62% indirect exposure to unlicensed exchange (TradeOcean)
   • Mixer exposure > 10% (Elliptic rule)
   • Note: Exposure is indirect, not direct — reduces confidence

TYPOLOGY CLASSIFICATION: ML-1 (Structuring for Threshold Avoidance)
SECONDARY: ML-7 (Layering via Cross-Chain Bridges)`
  },

  H2: {
    summary: `INVESTIGATION SUMMARY — H2: Reza Mohammadi

RISK ASSESSMENT: CRITICAL (92) — Sanctions — Iran Directive

Reza Mohammadi, 45, software engineer, Toronto ON. Long-term account holder (Feb 2024) with previously clean profile. Risk score escalated from 12 → 92 on Feb 16 following Chainalysis cluster reclassification.

KEY FINDINGS:
• $20,500 in CADD transfers over 9 days (Feb 14–19, 2026)
• Wallet 0x91cc...d4e2 reclassified SEVERE — 2-hop Iran-nexus exchange
• Buy-and-transfer pattern: purchases immediately sent out (< 24h hold)
• Escalating amounts: $3,200 → $5,000 → $8,000 → $12,500
• Prior 18 months: passive holding, ~$1,200/mo, long hold periods
• Iran Ministerial Directive IR2020: ANY Iran nexus requires STR

INTEL CONSENSUS:
- Chainalysis: SEVERE (9.2) — Iran-servicing exchange, 31% exposure
- TRM Labs: SEVERE (9.4) — Iran-nexus counterparty
- Elliptic: SEVERE (9.1) — 3 rules fired including sanctions nexus
- Flinks: Stable income ($17,800/mo) — transactions within means
- Screening: No individual sanctions hit

CRITICAL: Under IR2020 Ministerial Directive, ANY Iran nexus exposure — direct or indirect — triggers mandatory STR filing regardless of amount or intent.`,

    str: `SUSPICIOUS TRANSACTION REPORT — DRAFT
FINTRAC STR Narrative — Case H2 (IR2020 IRAN DIRECTIVE)

WHO: Reza Mohammadi, age 45, software engineer employed at Meridian (salary $8,900 bi-weekly / $17,800 monthly). Canadian citizen residing at 315 Bloor St W, Toronto, ON. Account holder since February 2024. KYC verified via Canadian Passport (Persona — 99.1% selfie match).

WHAT: 4 virtual currency purchase-and-transfer transactions totaling $28,700 CAD, of which $20,500 occurred in the reporting period (Feb 14–19). Transfers directed to wallet 0x91cc...d4e2, identified as connected to Iran-servicing exchange services (2 hops). This triggers the Iran Ministerial Directive (IR2020).

WHEN: February 2–19, 2026. Initial transactions (Feb 2–10) involved BTC and USDC. Subsequent transactions (Feb 14–19) shifted to CADD with escalating amounts ($8,000 then $12,500).

WHERE: Purchases on Wealthsimple Crypto. Transfers to personal wallet 0x91cc...d4e2. Chainalysis identifies this wallet as 2 hops from Iran-servicing exchange cluster (31% exposure). TRM Labs confirms Iran-nexus classification (risk score 9.4/10).

WHY: Filing required under Ministerial Directive IR2020 — any transaction with Iran nexus, regardless of amount, requires STR. Additionally, behavioral change is significant: 18-month passive holding pattern broken by rapid buy-and-transfer activity with escalating amounts.

HOW: Customer purchases virtual currency (BTC → USDC → CADD progression), then transfers to personal wallet within 24 hours. Hold duration dropped from 30+ days (baseline) to < 24 hours. Pattern consistent with pass-through or sanctions evasion layering.

IR2020 APPLICABILITY: Confirmed. 31% Iran-nexus exposure via 2-hop connection to Iran-servicing exchange cluster, as identified by Chainalysis (9.2), TRM Labs (9.4), and Elliptic (9.1).

FILING: STR (IR2020 Directive) + LVCTR ($12,500 transaction).`,

    typology: `FINTRAC ML/TF TYPOLOGY ANALYSIS — H2: Reza Mohammadi

MATCHED INDICATORS:

1. SANCTIONS EVASION (Confidence: HIGH — 94%)
   Iran Ministerial Directive IR2020
   • 31% Iran-nexus exposure (2-hop to Iran-servicing exchange)
   • 3 independent systems confirm: Chainalysis (9.2), TRM (9.4), Elliptic (9.1)
   • IR2020 threshold: ANY nexus = mandatory STR

2. BEHAVIORAL CHANGE (Confidence: HIGH — 91%)
   ML/TF Indicator #8: "Sudden change in transaction pattern"
   • 18 months passive holding → active buy-and-transfer
   • Volume spike: $1,200/mo → $20,500 in 9 days (17.1×)
   • Hold duration: 30+ days → < 24 hours
   • New asset type (CADD) and new destination wallet

3. PASS-THROUGH (Confidence: HIGH — 88%)
   ML/TF Indicator #3: "Virtual currency converted/transferred within short period"
   • Buy-and-transfer within 24 hours (all 4 transactions)
   • Escalating pattern: $3,200 → $5,000 → $8,000 → $12,500
   • No holding or trading activity — pure pass-through

4. ESCALATION (Confidence: MEDIUM — 72%)
   ML/TF Indicator #5: "Escalating transaction amounts"
   • Progressive increase across 4 transactions
   • Testing pattern: small → medium → large
   • $12,500 exceeds LVCTR threshold

TYPOLOGY CLASSIFICATION: TF-1 (Sanctions Evasion — Iran Directive)
SECONDARY: ML-3 (Pass-Through / Layering)`
  },

  H3: {
    summary: `INVESTIGATION SUMMARY — H3: Mule Network (3 Linked Accounts)

RISK ASSESSMENT: CRITICAL (95) — Mule Network / Proceeds of Fraud

Correlated alert across 3 student accounts at University of Waterloo: Sarah Park (22, Simplii), James Liu (23, Tangerine), Priya Sharma (21, Simplii). All accounts opened Nov–Dec 2025, dormant until Feb 3, 2026.

KEY FINDINGS:
• 3 accounts activated simultaneously on Feb 3, 2026
• Combined volume: $44,300 in synchronized receive → sell → withdraw
• Source wallet 0xaaaa...1111 — 142-address cluster, 78% pig butchering exposure
• Chainalysis: SEVERE (9.6), TRM: SEVERE (9.7), Elliptic: SEVERE (9.8)
• Source wallet attributed to Huione Guarantee network (SE Asia scam operation)
• $842,000 total volume from source (197 outbound transactions)
• Classic mule recruitment pattern: student accounts with no income

NETWORK ANALYSIS:
• Same source wallet for all 3 accounts
• Same-day receive → convert → withdraw pattern
• No legitimate income to support $4K–$6K per-account transactions
• TRON → ETH bridge (47 transactions from source)

RECOMMENDATION: Consolidated STR (mule network / proceeds of fraud). All 3 accounts should be included in single filing. Source wallet cluster under active monitoring.`,

    str: `SUSPICIOUS TRANSACTION REPORT — DRAFT
FINTRAC Consolidated STR — Case H3 (Mule Network)

WHO: Three linked account holders — Sarah Park (22), James Liu (23), Priya Sharma (21). All students at University of Waterloo, ON. Accounts opened November–December 2025 at Simplii Financial (Park, Sharma) and Tangerine (Liu). KYC verified via ON Driver's Licenses (Persona — 97–98% selfie match range).

WHAT: Coordinated receipt and immediate liquidation of Canadian Dollar-denominated tokens (CADD) totaling $44,300 across 3 accounts over 2 cycles (Feb 3–4 and Feb 10–11). Funds originated from wallet 0xaaaa...1111, a 142-address cluster with 78% attribution to pig butchering / romance scam proceeds (Huione Guarantee network).

WHEN: February 3–11, 2026. Two distinct cycles:
- Cycle 1 (Feb 3–4): $13,500 received and converted across 3 accounts
- Cycle 2 (Feb 10–11): $15,300 received and converted across 3 accounts
All 3 accounts dormant from opening (Nov–Dec 2025) through Feb 2, 2026.

WHERE: CADD received on Wealthsimple Crypto from wallet 0xaaaa...1111 (TRON → ETH bridge). Immediate conversion to CAD on platform, followed by bank withdrawal to respective accounts (Simplii, Tangerine).

WHY: Pattern consistent with organized money mule cash-out operation. Source wallet (0xaaaa...1111) attributed by Chainalysis (9.6/10), TRM Labs (9.7/10), and Elliptic (9.8/10) to Huione Guarantee — a known SE Asian scam facilitation network. Total outbound volume from source: $842,000 across 197 transactions.

HOW: Coordinated 3-step process: (1) CADD received from scam-linked source wallet, (2) immediate conversion to CAD on Wealthsimple, (3) bank withdrawal. All 3 accounts execute simultaneously, suggesting centralized control. Student accounts with minimal/no income used as cash-out points.

NETWORK INDICATORS:
• Same source wallet cluster for all 3 accounts
• Synchronized timing (same-day receive and convert)
• Dormant → active pattern (2+ months dormant)
• No legitimate income source (OSAP/minimal employment)

FILING: Consolidated STR — mule network / proceeds of fraud (3 subjects).`,

    typology: `FINTRAC ML/TF TYPOLOGY ANALYSIS — H3: Mule Network

MATCHED INDICATORS:

1. MONEY MULE NETWORK (Confidence: VERY HIGH — 98%)
   ML/TF Indicator #15: "Multiple accounts with coordinated activity"
   • 3 accounts, same source wallet, same-day execution
   • Receive → Convert → Withdraw (classic mule cash-out)
   • Student accounts with no income to support activity
   • Dormant 2+ months, then coordinated activation

2. PROCEEDS OF FRAUD (Confidence: VERY HIGH — 97%)
   ML/TF Indicator #11: "Funds linked to known fraud/scam operations"
   • Source: 0xaaaa...1111 — 78% pig butchering attribution
   • Huione Guarantee network (SE Asia scam facilitation)
   • $842,000 total volume from source cluster
   • 3 independent systems confirm SEVERE risk (9.6–9.8)

3. RAPID CONVERSION (Confidence: HIGH — 95%)
   ML/TF Indicator #3: "Virtual currency converted/transferred within short period"
   • Receive-to-withdrawal within 24 hours
   • No holding period
   • Immediate fiat off-ramp (CADD → CAD → bank)

4. STUDENT RECRUITMENT (Confidence: HIGH — 90%)
   ML/TF Indicator #14: "Accounts opened by individuals with no apparent need"
   • All 3 are students (age 21–23, UW campus)
   • Account balances $180–$340 (near-zero)
   • No income to support $4K–$6K transactions
   • Classic demographic for mule recruitment

TYPOLOGY CLASSIFICATION: ML-5 (Money Mule Network — Organized Cash-Out)
SECONDARY: FRAUD-2 (Proceeds of Pig Butchering / Romance Scam)`
  },

  M1: {
    summary: `INVESTIGATION SUMMARY — M1: David Thompson

RISK ASSESSMENT: MEDIUM (35) — Large Transaction (LVCTR)

David Thompson, 52, CFO at a Toronto tech company. Long-term account holder (Sep 2023) with consistently clean profile. Single large transaction triggered alert.

KEY FINDINGS:
• $85,000 CADD purchase and transfer on Feb 12, 2026
• Transfer to verified Coinbase institutional custody (regulated VASP)
• All 3 on-chain systems rate destination as LOW risk (0.6–1.0)
• Income: $38,200/mo — transaction represents 2.2× monthly income
• Quarterly large deposits of $22K align with bonus/board compensation
• No structuring, no layering, no high-risk counterparties

ASSESSMENT: Routine LVCTR filing. Large transaction from verified high-income customer to regulated institutional custody. No suspicious indicators beyond volume threshold.`,

    str: `LARGE VIRTUAL CURRENCY TRANSACTION REPORT — DRAFT
FINTRAC LVCTR — Case M1

REPORTING ENTITY: Wealthsimple Financial Corp.
TRANSACTION DATE: February 12, 2026

SUBJECT: David Thompson, age 52, CFO — Technology company
ADDRESS: Toronto, ON
ACCOUNT: Opened September 2023

TRANSACTION DETAILS:
• Purchase: $85,000 CADD on Wealthsimple Crypto
• Transfer: $85,000 CADD to Coinbase Custody (institutional)
• Single transaction, same day

LVCTR TRIGGER: Transaction exceeds $10,000 threshold.

VERIFICATION:
• Coinbase Custody — regulated VASP (verified by Chainalysis, TRM Labs, Elliptic)
• Customer income: $38,200/month (salary + board compensation)
• Transaction represents 2.2× monthly income — proportional to financial profile
• No structuring or splitting detected
• No high-risk counterparties

RISK ASSESSMENT: LOW — routine large transaction to verified institutional custody.

Note: This is an LVCTR filing only. No suspicious indicators warrant STR consideration.`,

    typology: `FINTRAC ML/TF TYPOLOGY ANALYSIS — M1: David Thompson

MATCHED INDICATORS:

1. LARGE TRANSACTION (Confidence: N/A — Reporting Requirement)
   LVCTR Threshold: Transaction exceeds $10,000
   • Single $85,000 CADD purchase and transfer
   • Mandatory reporting regardless of risk assessment

NEGATIVE INDICATORS (No Suspicion):
• ✓ Destination is regulated VASP (Coinbase Custody)
• ✓ Income proportional ($38,200/mo salary + board)
• ✓ Long-term customer (since Sep 2023) with clean history
• ✓ No structuring pattern
• ✓ No high-risk counterparties (all 3 systems: LOW)
• ✓ Single transaction, no layering
• ✓ KYC fully verified (Persona 98% match)

TYPOLOGY CLASSIFICATION: None — routine LVCTR
RISK LEVEL: LOW (35)
FILING: LVCTR only`
  },

  M2: {
    summary: `INVESTIGATION SUMMARY — M2: Anika Okafor

RISK ASSESSMENT: MEDIUM (48) — Behavioral Change

Anika Okafor, 34, marketing manager, Ottawa ON. Account opened Aug 2024 with 18-month consistent DCA trading pattern ($800–$1,200/month in BTC/ETH).

KEY FINDINGS:
• Feb 8: Full liquidation of BTC ($15,000) and ETH ($8,000) holdings
• Feb 9: $23,000 CADD purchase, immediately transferred to new wallet (0xf1b8...new)
• Destination wallet created < 24 hours before transfer (no prior history)
• 18-month DCA pattern completely broken — first deviation since account opening
• On-chain risk: MEDIUM (3.6–4.2) — primarily due to wallet age, not counterparty
• No sanctions, no fraud links, no high-risk counterparties detected

ASSESSMENT: Significant behavioral deviation requiring review. Pattern break could indicate account compromise, coercion, or legitimate strategy change. Wallet age (< 24h) is primary concern. Recommend customer outreach before escalation.`,

    str: `LARGE VIRTUAL CURRENCY TRANSACTION REPORT — DRAFT
FINTRAC LVCTR — Case M2

REPORTING ENTITY: Wealthsimple Financial Corp.
TRANSACTION DATE: February 8–9, 2026

SUBJECT: Anika Okafor, age 34, Marketing Manager
ADDRESS: Ottawa, ON
ACCOUNT: Opened August 2024

TRANSACTION DETAILS:
• Feb 8: Sold BTC holdings — $15,000
• Feb 8: Sold ETH holdings — $8,000
• Feb 9: Purchased $23,000 CADD
• Feb 9: Transferred $23,000 CADD to wallet 0xf1b8...new

LVCTR TRIGGER: $23,000 transfer exceeds $10,000 threshold.

BEHAVIORAL CONTEXT:
• 18-month DCA pattern ($800–$1,200/mo) broken
• First-ever full liquidation of holdings
• First-ever transfer to external wallet
• Destination wallet: < 24 hours old, no prior history

ON-CHAIN ASSESSMENT:
• Chainalysis: MEDIUM (4.2) — new wallet, no history
• TRM Labs: MEDIUM (3.8) — unknown ownership
• Elliptic: MEDIUM (3.6) — wallet age flag only
• No sanctions, fraud, or high-risk counterparty links

FILING: LVCTR + continued monitoring. Behavioral change flagged for review.`,

    typology: `FINTRAC ML/TF TYPOLOGY ANALYSIS — M2: Anika Okafor

MATCHED INDICATORS:

1. BEHAVIORAL CHANGE (Confidence: MEDIUM — 65%)
   ML/TF Indicator #8: "Sudden change in transaction pattern"
   • 18-month DCA ($800–$1,200/mo) → full liquidation ($23,000)
   • Volume spike: 23× baseline
   • First external transfer in account history
   • Asset concentration: diversified (BTC/ETH) → 100% CADD

2. NEW/UNVERIFIED DESTINATION (Confidence: MEDIUM — 60%)
   ML/TF Indicator #9: "Transfer to wallet with no history"
   • Wallet 0xf1b8...new created < 24 hours before transfer
   • No prior transactions, no VASP attribution
   • Could indicate: new personal wallet, compromise, or coercion

MITIGATING FACTORS:
• ✓ No high-risk counterparties detected
• ✓ Income supports transaction ($9,200/mo salary)
• ✓ No structuring — single transaction
• ✓ No sanctions/fraud links
• ✓ Clean 18-month history prior to change

TYPOLOGY CLASSIFICATION: ML-8 (Behavioral Anomaly — Requires Review)
RISK LEVEL: MEDIUM (48)
NOTE: Pattern break alone insufficient for STR. Recommend customer outreach.`
  },

  M3: {
    summary: `INVESTIGATION SUMMARY — M3: Jean-Pierre Dubois

RISK ASSESSMENT: MEDIUM (42) — Travel Rule Incomplete

Jean-Pierre Dubois, 40, dual CA/FR consultant, Montreal QC. Account opened Mar 2024 with regular small-volume activity ($2K–$4K/month).

KEY FINDINGS:
• Feb 16: Received $15,000 CADD from Bitstamp EU (MiCA-regulated French exchange)
• Travel Rule information incomplete — originator/beneficiary data missing
• EFTR required for international electronic funds transfer > $10,000
• Source (Bitstamp) is MiCA-regulated and verified by all 3 on-chain systems as LOW risk
• Transaction is 3.8× baseline monthly volume but proportional to income ($11,400/mo)
• Funds currently held pending Travel Rule completion

ASSESSMENT: Procedural compliance issue, not behavioral concern. MiCA-regulated source with verified VASP status. LVCTR + EFTR required. Recommend holding funds until Travel Rule information obtained from Bitstamp.`,

    str: `ELECTRONIC FUNDS TRANSFER REPORT + LVCTR — DRAFT
FINTRAC EFTR + LVCTR — Case M3

REPORTING ENTITY: Wealthsimple Financial Corp.
TRANSACTION DATE: February 16, 2026

SUBJECT: Jean-Pierre Dubois, age 40, Consultant (CA/FR dual practice)
ADDRESS: Montreal, QC
ACCOUNT: Opened March 2024

TRANSACTION DETAILS:
• Feb 16: Received $15,000 CADD from Bitstamp EU
• International electronic funds transfer (France → Canada)
• Travel Rule information: INCOMPLETE

EFTR TRIGGER: International EFT exceeding $10,000.
LVCTR TRIGGER: Virtual currency transaction exceeding $10,000.

TRAVEL RULE STATUS:
• Originator information: Partial (name only)
• Beneficiary information: Complete
• Missing: Originator address, account number, institution identifier
• Action: Request sent to Bitstamp for complete Travel Rule data
• Funds: Held pending completion

SOURCE VERIFICATION:
• Bitstamp Ltd — MiCA-registered VASP (European Union)
• Chainalysis: LOW (1.5), TRM Labs: LOW (1.2), Elliptic: LOW (1.0)
• Regulated, compliant exchange with full VASP attribution

FILING: EFTR (international EFT > $10K) + LVCTR (> $10K threshold).
NOTE: Procedural filing. No suspicious indicators.`,

    typology: `FINTRAC ML/TF TYPOLOGY ANALYSIS — M3: Jean-Pierre Dubois

MATCHED INDICATORS:

1. TRAVEL RULE INCOMPLETE (Confidence: N/A — Regulatory Requirement)
   Proceeds of Crime (Money Laundering) and Terrorist Financing Act
   • International EFT > $10,000 requires complete originator/beneficiary data
   • Missing: originator address, account number, institution ID
   • Source: Bitstamp EU (MiCA-regulated VASP)

2. EFTR REQUIREMENT (Confidence: N/A — Reporting Requirement)
   • International electronic funds transfer > $10,000
   • France → Canada (cross-border)
   • Mandatory EFTR filing within 5 business days

NEGATIVE INDICATORS (No Suspicion):
• ✓ Source is MiCA-regulated exchange (Bitstamp Ltd)
• ✓ All 3 on-chain systems: LOW risk (1.0–1.5)
• ✓ Dual CA/FR practice explains international transfer
• ✓ Income proportional ($11,400/mo consulting)
• ✓ Volume increase modest (3.8× baseline)
• ✓ First international transfer — consistent with expanding practice
• ✓ Clean account history (Mar 2024–present)

TYPOLOGY CLASSIFICATION: None — procedural compliance
RISK LEVEL: LOW-MEDIUM (42)
FILING: EFTR + LVCTR (regulatory requirements only)`
  }
};
