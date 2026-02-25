import type { IntelMap } from '../types/index.js';

export const INTEL: IntelMap = {
  H1: {
    persona: { status: "Passed", date: "Jun 12, 2025", idType: "BC Driver's License", selfieMatch: 96.2, addr: "4891 Cambie St, Vancouver BC", pep: "None" },
    plaid: { institution: "TD Canada Trust", accountType: "Chequing", nameScore: 93, emailScore: 88, phoneScore: 81, addressScore: 91, balance: "$8,240", trustIndex: 68 },
    flinks: { incomeSource: "Self-employed — 'Chen Import Consulting'", monthlyIncome: "$4,200 avg", frequency: "Irregular — 2-5 deposits/mo", cashFlow: "Variable", nsf: "1 in 12mo", largeDeposits: "3 cash deposits ~$4,800", cryptoTransfers: "$118.4K (30d)", anomaly: "\u26A0 Crypto volume ($118K/30d) is 2.3x stated annual income" },
    chainalysis: [{ wallet: "0x4d2c...a891", risk: "SEVERE", score: 8.7, indirect: "62%", counterparty: "TradeOcean \u2014 unlicensed", crossChain: "ETH to TRON within 2h" }],
    trm: [{ wallet: "0x4d2c...a891", rl: "Severe", riskScore: 8.9, ownership: "Personal wallet", counterparty: "High \u2014 8 txns unlicensed exchange", vasp: "No", volume30d: "$67,200 / $71,400", txCount: "31 in / 24 out", riskVolPct: "68%", crossChain: "4 bridge txns" }],
    elliptic: [{ wallet: "0x4d2c...a891", hs: 8.4, rl: "SEVERE", wr: "High \u2014 unlicensed exchange cluster", tr: "Severe \u2014 rapid sequential (12 in 30d)", er: "Unknown \u2014 no VASP", crossChain: "ETH, TRON, BSC", rf: ["Mixer > 10%", "Unlicensed exchange > 50%", "Cross-chain < 2h"], rt: 12 }],
    screening: { sanctions: "None", lists: "All lists", adverseMedia: "1 hit \u2014 low relevance" }
  },
  H2: {
    persona: { status: "Passed", date: "Feb 8, 2024", idType: "Canadian Passport", selfieMatch: 99.1, addr: "315 Bloor St W, Toronto ON", pep: "None" },
    plaid: { institution: "RBC Royal Bank", accountType: "Chequing", nameScore: 96, emailScore: 92, phoneScore: 89, addressScore: 94, balance: "$24,100", trustIndex: 81 },
    flinks: { incomeSource: "Salary \u2014 $8.9K bi-weekly \u2014 Meridian", monthlyIncome: "$17,800", frequency: "Bi-weekly", cashFlow: "Stable", liabilities: "$2,400/mo mortgage", largeDeposits: "None outside payroll", cryptoTransfers: "$31.7K (60d)", anomaly: "\u26A0 Feb crypto transfers ($20.5K) sudden spike \u2014 prior avg $1,200/mo" },
    chainalysis: [{ wallet: "0x91cc...d4e2", risk: "SEVERE", score: 9.2, indirect: "31%", counterparty: "Iran-servicing exchange" }],
    trm: [{ wallet: "0x91cc...d4e2", rl: "Severe", riskScore: 9.4, ownership: "Personal wallet", counterparty: "Severe \u2014 Iran-nexus", vasp: "No", volume30d: "$20,500 / $20,500", txCount: "2 in / 2 out", riskVolPct: "74%" }],
    elliptic: [{ wallet: "0x91cc...d4e2", hs: 9.1, rl: "SEVERE", wr: "Severe \u2014 2-hop Iran-nexus", tr: "High \u2014 buy-and-transfer", er: "Iran-servicing exchange cluster", rf: ["Sanctions nexus", "Transfer < 30min", "Risk cluster reclass"], rt: 12 }],
    screening: { sanctions: "None on individual", lists: "All lists", adverseMedia: "1 hit \u2014 low relevance" }
  },
  H3: {
    persona: { status: "Passed (all 3)", date: "Nov-Dec 2025", idType: "ON Driver's License (x3)", selfieMatch: "97-98", addr: "UW campus area, Waterloo", pep: "None" },
    plaid: { institution: "Simplii/Tangerine", accountType: "Chequing \u00D73", nameScore: "91-94", emailScore: "82-87", phoneScore: "86-90", addressScore: "89-92", balance: "$180-$340", trustIndex: "58-63", networkSignals: "\u26A0 Same deposit pattern" },
    flinks: { incomeSource: "Minimal/None/OSAP", monthlyIncome: "$0-$1,200", frequency: "Irregular", cashFlow: "Near-zero all 3", nsf: "0/2/1", largeDeposits: "\u26A0 Only Wealthsimple cash-outs", cryptoTransfers: "$46.1K combined out", anomaly: "\u26A0 CRITICAL: No income to support $4K-$6K crypto txns" },
    chainalysis: [{ wallet: "0xaaaa...1111", risk: "SEVERE", score: 9.6, direct: "78%", indirect: "12%", counterparty: "SE Asia scam (Huione)", crossChain: "TRON to ETH bridge" }],
    trm: [{ wallet: "0xaaaa...1111", rl: "Severe", riskScore: 9.7, ownership: "Scam operation", counterparty: "Severe \u2014 direct scam", vasp: "No", volume30d: "$842,000 sent", txCount: "197 out / 12 in", riskVolPct: "91%", crossChain: "TRON to ETH (47 txns)" }],
    elliptic: [{ wallet: "0xaaaa...1111", hs: 9.8, rl: "SEVERE", wr: "Severe \u2014 attributed scam wallet", tr: "Severe \u2014 batch to mule accounts", er: "Huione Guarantee network", crossChain: "TRON, ETH, BSC (47 txns)", rf: ["Direct scam > 50%", "Batch transfer", "Cross-chain bridge", "New wallet rapid"], rt: 12 }]
  },
  M1: {
    persona: { status: "Passed", date: "Sep 5, 2023", idType: "Canadian Passport", pep: "None", adverseMedia: "2 hits \u2014 positive (awards)" },
    plaid: { institution: "BMO", accountType: "Premium Chequing", nameScore: 98, emailScore: 95, phoneScore: 94, addressScore: 97, trustIndex: 92 },
    flinks: { incomeSource: "Salary $18.5K bi-weekly + board", monthlyIncome: "$38,200", frequency: "Bi-weekly", cashFlow: "Strong", liabilities: "$4,800/mo mortgage", largeDeposits: "$22K quarterly", cryptoTransfers: "$85K to WS" },
    chainalysis: [{ wallet: "Coinbase Custody", risk: "LOW", score: 1.0, indirect: "0%" }],
    trm: [{ wallet: "Coinbase Custody", rl: "Low", riskScore: 0.8, ownership: "Coinbase Inc.", counterparty: "Low", vasp: "Yes", volume30d: "$85K", txCount: "1 in" }],
    elliptic: [{ wallet: "Coinbase Custody", hs: 0.6, rl: "LOW", wr: "Low \u2014 verified Coinbase", tr: "Low \u2014 single transfer", er: "Coinbase Inc. \u2014 regulated VASP", rf: [], rt: 12 }]
  },
  M2: {
    persona: { status: "Passed", date: "Aug 14, 2024", idType: "ON Driver's License", pep: "None" },
    plaid: { institution: "Scotiabank", accountType: "Chequing", nameScore: 95, emailScore: 90, phoneScore: 87, addressScore: 93, trustIndex: 74 },
    flinks: { incomeSource: "Salary $4.6K bi-weekly \u2014 Spark", monthlyIncome: "$9,200", frequency: "Bi-weekly", cashFlow: "Stable", liabilities: "$1,650/mo rent", largeDeposits: "None unusual", cryptoTransfers: "$23K CADD (pattern break)", anomaly: "\u26A0 18-month DCA broken \u2014 full liquidation + single large CADD" },
    chainalysis: [{ wallet: "0xf1b8...new", risk: "MEDIUM", score: 4.2, indirect: "0%" }],
    trm: [{ wallet: "0xf1b8...new", rl: "Medium", riskScore: 3.8, ownership: "Unknown", vasp: "No", volume30d: "$23K", txCount: "1in/0out" }],
    elliptic: [{ wallet: "0xf1b8...new", hs: 3.6, rl: "MEDIUM", wr: "Medium \u2014 wallet age < 24h", tr: "Medium \u2014 large inbound, no outbound", er: "Unknown", rf: ["New wallet + large transfer"], rt: 12 }]
  },
  M3: {
    persona: { status: "Passed", date: "Mar 22, 2024", idType: "French Passport + QC License", pep: "None" },
    plaid: { institution: "National Bank", accountType: "Chequing", nameScore: 97, emailScore: 91, phoneScore: 85, addressScore: 96, trustIndex: 79 },
    flinks: { incomeSource: "Consulting (FR + CA)", monthlyIncome: "$11,400 avg", frequency: "Irregular 3-6/mo", cashFlow: "Positive", liabilities: "$2,100/mo rent", largeDeposits: "\u20AC12.8K wire (Paris)", cryptoTransfers: "$15K to WS" },
    chainalysis: [{ wallet: "Bitstamp EU", risk: "LOW", score: 1.5, indirect: "0%" }],
    trm: [{ wallet: "Bitstamp EU", rl: "Low", riskScore: 1.2, ownership: "Bitstamp Ltd", counterparty: "Low", vasp: "Yes \u2014 MiCA", volume30d: "$15K", txCount: "1in" }],
    elliptic: [{ wallet: "Bitstamp EU", hs: 1.0, rl: "LOW", wr: "Low \u2014 known Bitstamp", tr: "Low \u2014 compliant inbound", er: "Bitstamp Ltd \u2014 MiCA VASP", rf: [], rt: 12 }]
  }
};
