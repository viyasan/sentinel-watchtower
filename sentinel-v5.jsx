import { useState, useEffect, useRef } from "react";

const INTEL = {
 H1: {
 persona: { status: "Passed", date: "Jun 12, 2025", idType: "BC Driver's License", selfieMatch: 96.2, addr: "4891 Cambie St, Vancouver BC", pep: "None" },
 plaid: { institution: "TD Canada Trust", accountType: "Chequing", nameScore: 93, emailScore: 88, phoneScore: 81, addressScore: 91, balance: "$8,240", trustIndex: 68 },
 flinks: { incomeSource: "Self-employed — 'Chen Import Consulting'", monthlyIncome: "$4,200 avg", frequency: "Irregular — 2-5 deposits/mo", cashFlow: "Variable", nsf: "1 in 12mo", largeDeposits: "3 cash deposits ~$4,800", cryptoTransfers: "$118.4K (30d)", anomaly: "\u26a0 Crypto volume ($118K/30d) is 2.3x stated annual income" },
 chainalysis: [{ wallet: "0x4d2c...a891", risk: "SEVERE", score: 8.7, indirect: "62%", counterparty: "TradeOcean — unlicensed", crossChain: "ETH to TRON within 2h" }],
 trm: [{ wallet: "0x4d2c...a891", rl: "Severe", riskScore: 8.9, ownership: "Personal wallet", counterparty: "High — 8 txns unlicensed exchange", vasp: "No", volume30d: "$67,200 / $71,400", txCount: "31 in / 24 out", riskVolPct: "68%", crossChain: "4 bridge txns" }],
 elliptic: [{ wallet: "0x4d2c...a891", hs: 8.4, rl: "SEVERE", wr: "High — unlicensed exchange cluster", tr: "Severe — rapid sequential (12 in 30d)", er: "Unknown — no VASP", crossChain: "ETH, TRON, BSC", rf: ["Mixer > 10%", "Unlicensed exchange > 50%", "Cross-chain < 2h"], rt: 12 }],
 screening: { sanctions: "None", lists: "All lists", adverseMedia: "1 hit — low relevance" }
 },
 H2: {
 persona: { status: "Passed", date: "Feb 8, 2024", idType: "Canadian Passport", selfieMatch: 99.1, addr: "315 Bloor St W, Toronto ON", pep: "None" },
 plaid: { institution: "RBC Royal Bank", accountType: "Chequing", nameScore: 96, emailScore: 92, phoneScore: 89, addressScore: 94, balance: "$24,100", trustIndex: 81 },
 flinks: { incomeSource: "Salary — $8.9K bi-weekly — Meridian", monthlyIncome: "$17,800", frequency: "Bi-weekly", cashFlow: "Stable", liabilities: "$2,400/mo mortgage", largeDeposits: "None outside payroll", cryptoTransfers: "$31.7K (60d)", anomaly: "\u26a0 Feb crypto transfers ($20.5K) sudden spike — prior avg $1,200/mo" },
 chainalysis: [{ wallet: "0x91cc...d4e2", risk: "SEVERE", score: 9.2, indirect: "31%", counterparty: "Iran-servicing exchange" }],
 trm: [{ wallet: "0x91cc...d4e2", rl: "Severe", riskScore: 9.4, ownership: "Personal wallet", counterparty: "Severe — Iran-nexus", vasp: "No", volume30d: "$20,500 / $20,500", txCount: "2 in / 2 out", riskVolPct: "74%" }],
 elliptic: [{ wallet: "0x91cc...d4e2", hs: 9.1, rl: "SEVERE", wr: "Severe — 2-hop Iran-nexus", tr: "High — buy-and-transfer", er: "Iran-servicing exchange cluster", rf: ["Sanctions nexus", "Transfer < 30min", "Risk cluster reclass"], rt: 12 }],
 screening: { sanctions: "None on individual", lists: "All lists", adverseMedia: "1 hit — low relevance" }
 },
 H3: {
 persona: { status: "Passed (all 3)", date: "Nov-Dec 2025", idType: "ON Driver's License (x3)", selfieMatch: "97-98", addr: "UW campus area, Waterloo", pep: "None" },
 plaid: { institution: "Simplii/Tangerine", accountType: "Chequing ×3", nameScore: "91-94", emailScore: "82-87", phoneScore: "86-90", addressScore: "89-92", balance: "$180-$340", trustIndex: "58-63", networkSignals: "⚠ Same deposit pattern" },
 flinks: { incomeSource: "Minimal/None/OSAP", monthlyIncome: "$0-$1,200", frequency: "Irregular", cashFlow: "Near-zero all 3", nsf: "0/2/1", largeDeposits: "\u26a0 Only Wealthsimple cash-outs", cryptoTransfers: "$46.1K combined out", anomaly: "\u26a0 CRITICAL: No income to support $4K-$6K crypto txns" },
 chainalysis: [{ wallet: "0xaaaa...1111", risk: "SEVERE", score: 9.6, direct: "78%", indirect: "12%", counterparty: "SE Asia scam (Huione)", crossChain: "TRON to ETH bridge" }],
 trm: [{ wallet: "0xaaaa...1111", rl: "Severe", riskScore: 9.7, ownership: "Scam operation", counterparty: "Severe — direct scam", vasp: "No", volume30d: "$842,000 sent", txCount: "197 out / 12 in", riskVolPct: "91%", crossChain: "TRON to ETH (47 txns)" }],
 elliptic: [{ wallet: "0xaaaa...1111", hs: 9.8, rl: "SEVERE", wr: "Severe — attributed scam wallet", tr: "Severe — batch to mule accounts", er: "Huione Guarantee network", crossChain: "TRON, ETH, BSC (47 txns)", rf: ["Direct scam > 50%", "Batch transfer", "Cross-chain bridge", "New wallet rapid"], rt: 12 }]
 },
 M1: {
 persona: { status: "Passed", date: "Sep 5, 2023", idType: "Canadian Passport", pep: "None", adverseMedia: "2 hits — positive (awards)" },
 plaid: { institution: "BMO", accountType: "Premium Chequing", nameScore: 98, emailScore: 95, phoneScore: 94, addressScore: 97, trustIndex: 92 },
 flinks: { incomeSource: "Salary $18.5K bi-weekly + board", monthlyIncome: "$38,200", frequency: "Bi-weekly", cashFlow: "Strong", liabilities: "$4,800/mo mortgage", largeDeposits: "$22K quarterly", cryptoTransfers: "$85K to WS" },
 chainalysis: [{ wallet: "Coinbase Custody", risk: "LOW", score: 1.0, indirect: "0%" }],
 trm: [{ wallet: "Coinbase Custody", rl: "Low", riskScore: 0.8, ownership: "Coinbase Inc.", counterparty: "Low", vasp: "Yes", volume30d: "$85K", txCount: "1 in" }],
 elliptic: [{ wallet: "Coinbase Custody", hs: 0.6, rl: "LOW", wr: "Low — verified Coinbase", tr: "Low — single transfer", er: "Coinbase Inc. — regulated VASP", rf: [], rt: 12 }]
 },
 M2: {
 persona: { status: "Passed", date: "Aug 14, 2024", idType: "ON Driver's License", pep: "None" },
 plaid: { institution: "Scotiabank", accountType: "Chequing", nameScore: 95, emailScore: 90, phoneScore: 87, addressScore: 93, trustIndex: 74 },
 flinks: { incomeSource: "Salary $4.6K bi-weekly — Spark", monthlyIncome: "$9,200", frequency: "Bi-weekly", cashFlow: "Stable", liabilities: "$1,650/mo rent", largeDeposits: "None unusual", cryptoTransfers: "$23K CADD (pattern break)", anomaly: "\u26a0 18-month DCA broken — full liquidation + single large CADD" },
 chainalysis: [{ wallet: "0xf1b8...new", risk: "MEDIUM", score: 4.2, indirect: "0%" }],
 trm: [{ wallet: "0xf1b8...new", rl: "Medium", riskScore: 3.8, ownership: "Unknown", vasp: "No", volume30d: "$23K", txCount: "1in/0out" }],
 elliptic: [{ wallet: "0xf1b8...new", hs: 3.6, rl: "MEDIUM", wr: "Medium — wallet age < 24h", tr: "Medium — large inbound, no outbound", er: "Unknown", rf: ["New wallet + large transfer"], rt: 12 }]
 },
 M3: {
 persona: { status: "Passed", date: "Mar 22, 2024", idType: "French Passport + QC License", pep: "None" },
 plaid: { institution: "National Bank", accountType: "Chequing", nameScore: 97, emailScore: 91, phoneScore: 85, addressScore: 96, trustIndex: 79 },
 flinks: { incomeSource: "Consulting (FR + CA)", monthlyIncome: "$11,400 avg", frequency: "Irregular 3-6/mo", cashFlow: "Positive", liabilities: "$2,100/mo rent", largeDeposits: "€12.8K wire (Paris)", cryptoTransfers: "$15K to WS" },
 chainalysis: [{ wallet: "Bitstamp EU", risk: "LOW", score: 1.5, indirect: "0%" }],
 trm: [{ wallet: "Bitstamp EU", rl: "Low", riskScore: 1.2, ownership: "Bitstamp Ltd", counterparty: "Low", vasp: "Yes — MiCA", volume30d: "$15K", txCount: "1in" }],
 elliptic: [{ wallet: "Bitstamp EU", hs: 1.0, rl: "LOW", wr: "Low — known Bitstamp", tr: "Low — compliant inbound", er: "Bitstamp Ltd — MiCA VASP", rf: [], rt: 12 }]
 }
};
const NOW = new Date("2026-02-23T11:00:00-05:00");
const CUSTOMERS = {
  H1: { id: "H1", tier: "high", name: "Marcus Chen", age: 28, location: "Vancouver, BC", occupation: "Import/Export", accountOpened: "Jun 2025", riskScore: 87, typology: "Structuring", typologyTag: "STRUCT",
    summary: "Repeated CADD purchases structured below $10,000 LVCTR threshold with transfers to high-risk unhosted wallets. 30-day volume: $116,300.",
    slaAssigned: "2026-02-23T09:00:00-05:00", slaTier: "4h", qaStatus: null,
    calibration: { active: true, question: "Does the sub-$10K structuring pattern warrant STR given 62% indirect exposure to unlicensed exchange? Or LVCTR-only given no direct illicit exposure?", responses: [
      { analyst: "S. Patel", role: "Team Lead", decision: "File STR", confidence: "High", note: "62% unlicensed + sub-threshold = textbook structuring" },
      { analyst: "R. Nguyen", role: "Senior Analyst", decision: "File STR", confidence: "Medium", note: "Agree on STR, but indirect-only makes confidence moderate" },
      { analyst: "M. Abdullah", role: "Analyst", decision: null, confidence: null, note: null }
    ]},
    transactions: [
      { date: "Feb 1", type: "Buy CADD", amount: 9800, dir: "in", flag: false },{ date: "Feb 3", type: "Buy CADD", amount: 9500, dir: "in", flag: false },{ date: "Feb 5", type: "Transfer", amount: 9700, dir: "out", flag: true },{ date: "Feb 7-12", type: "Buy+Transfer \u00d74", amount: 38750, dir: "in", flag: true },{ date: "Feb 13", type: "Transfer", amount: 19200, dir: "out", flag: true },{ date: "Feb 15", type: "Buy CADD", amount: 9750, dir: "in", flag: false },{ date: "Feb 17", type: "Transfer", amount: 9700, dir: "out", flag: true },{ date: "Feb 19", type: "Buy CADD", amount: 9600, dir: "in", flag: false },{ date: "Feb 21", type: "Transfer", amount: 9550, dir: "out", flag: true }
    ],
    flags: ["Sub-$10K structuring (LVCTR avoidance)","Transfers to unhosted wallets","Volume inconsistent with income","Rapid sub-threshold pattern"],
    report: "STR (structuring) + 2x LVCTR",
    behavioral: { bp:"Jun\u2013Dec 2025", cp:"Feb 1\u201323, 2026", severity:"critical",
      metrics:[
        {label:"Monthly Volume",baseline:"$0",current:"$116,300",change:"New activity",dir:"up",sev:"critical"},
        {label:"Tx Frequency",baseline:"0/mo",current:"12 in 23 days",change:"New pattern",dir:"up",sev:"critical"},
        {label:"Destinations",baseline:"None",current:"2 unhosted wallets",change:"New",dir:"new",sev:"critical"}
      ],
      bd:"Feb 1, 2026", traj:[{d:"Jun 2025",l:"low"},{d:"Jan 2026",l:"medium"},{d:"Feb 1",l:"high"},{d:"Feb 13",l:"severe"}],
      confidence:"High", exp:"Immediate structuring below $10K threshold. Volume 2.3\u00d7 stated income."
    }
  },
  H2: { id: "H2", tier: "high", name: "Reza Mohammadi", age: 45, location: "Toronto, ON", occupation: "Software Engineer", accountOpened: "Feb 2024", riskScore: 92, typology: "Sanctions \u2014 Iran Directive", typologyTag: "SANCT",
    summary: "Previously low-risk customer whose CADD transfers trace 2 hops to Iran-nexus exchange services. Iran Ministerial Directive triggered.",
    slaAssigned: "2026-02-23T09:15:00-05:00", slaTier: "4h", qaStatus: null, calibration: null,
    transactions: [
      { date: "Feb 2", type: "Buy BTC", amount: 3200, dir: "in", flag: false },{ date: "Feb 5", type: "Transfer BTC", amount: 3200, dir: "out", flag: false },{ date: "Feb 9", type: "Buy USDC", amount: 5000, dir: "in", flag: false },{ date: "Feb 10", type: "Transfer USDC", amount: 5000, dir: "out", flag: false },{ date: "Feb 14", type: "Buy CADD", amount: 8000, dir: "in", flag: false },{ date: "Feb 15", type: "Transfer CADD", amount: 8000, dir: "out", flag: true },{ date: "Feb 18", type: "Buy CADD", amount: 12500, dir: "in", flag: false },{ date: "Feb 19", type: "Transfer CADD", amount: 12500, dir: "out", flag: true }
    ],
    flags: ["Iran Directive: ANY Iran nexus = STR (IR2020)","31% Iran-nexus exposure","Buy-and-transfer pass-through","Escalating $8K \u2192 $12.5K","Sudden behavioral change"],
    report: "STR (IR2020 Directive) + LVCTR ($12,500)",
    behavioral: { bp:"Feb 2024\u2013Jan 2026", cp:"Feb 1\u201323, 2026", severity:"critical",
      metrics:[
        {label:"Monthly Volume",baseline:"$1,200/mo",current:"$20,500 (9 days)",change:"17.1\u00d7",dir:"up",sev:"critical"},
        {label:"Tx Frequency",baseline:"1/month",current:"4 in 9 days",change:"4\u00d7",dir:"up",sev:"warning"},
        {label:"Hold Duration",baseline:"30+ days",current:"< 24 hours",change:"Pass-through",dir:"down",sev:"critical"},
        {label:"Destinations",baseline:"Cold storage",current:"0x91cc (Iran-nexus)",change:"New wallet",dir:"new",sev:"critical"}
      ],
      bd:"Feb 14, 2026", traj:[{d:"Feb 2024",l:"low"},{d:"Aug 2024",l:"low"},{d:"Jan 2026",l:"low"},{d:"Feb 14",l:"severe"}],
      confidence:"High", exp:"18mo passive holding \u2192 buy-and-transfer. New assets, new Iran-nexus destination. Matches sanctions evasion pass-through."
    }
  },
  H3: { id: "H3", tier: "high", name: "Mule Network", age: null, location: "Waterloo, ON", occupation: "Students \u2014 UW", accountOpened: "Nov-Dec 2025", riskScore: 95, typology: "Mule Network \u2014 Scam", typologyTag: "NETWORK",
    summary: "3 student accounts receiving CADD from same source wallet cluster, immediate conversion to CAD. Source has 78% pig butchering exposure.",
    slaAssigned: "2026-02-23T09:30:00-05:00", slaTier: "4h", qaStatus: "pending", calibration: null,
    linked: [{ name: "Sarah Park", age: 22, bank: "Simplii" },{ name: "James Liu", age: 23, bank: "Tangerine" },{ name: "Priya Sharma", age: 21, bank: "Simplii" }],
    transactions: [
      { date: "Feb 3", type: "Receive CADD \u00d73", amount: 13500, dir: "in", flag: true },{ date: "Feb 4", type: "Sell to CAD \u00d73", amount: 13500, dir: "out", flag: true },{ date: "Feb 10", type: "Receive CADD \u00d73", amount: 15300, dir: "in", flag: true },{ date: "Feb 11", type: "Sell to CAD \u00d73", amount: 15300, dir: "out", flag: true }
    ],
    flags: ["Same source wallet, same day","Immediate CAD conversion (mule cash-out)","Student mule recruitment","Pig butchering source"],
    report: "Consolidated STR (mule network / proceeds of fraud)",
    behavioral: { bp:"Nov\u2013Dec 2025 (dormant)", cp:"Feb 3\u201311, 2026", severity:"critical",
      metrics:[
        {label:"Account Activity",baseline:"Zero (2+ months dormant)",current:"Active \u2014 12 txns",change:"Dormant\u2192Active",dir:"up",sev:"critical"},
        {label:"Monthly Volume",baseline:"$0",current:"$44,300 combined",change:"From zero",dir:"up",sev:"critical"},
        {label:"Pattern",baseline:"None",current:"Synchronized receive\u2192sell\u2192withdraw",change:"Mule cash-out",dir:"new",sev:"critical"}
      ],
      bd:"Feb 3, 2026", traj:[{d:"Nov 2025",l:"low"},{d:"Dec 2025",l:"low"},{d:"Feb 3",l:"severe"}],
      confidence:"High", exp:"3 dormant accounts activated same day. Receive\u2192convert\u2192withdraw. Classic mule cash-out."
    }
  },
  M1: { id: "M1", tier: "medium", name: "David Thompson", age: 52, location: "Toronto, ON", occupation: "CFO \u2014 Tech company", accountOpened: "Sep 2023", riskScore: 35, typology: "Large Transaction", typologyTag: "LVCTR",
    summary: "$85,000 CADD purchase transferred to verified Coinbase institutional custody. Clean profile.",
    slaAssigned: "2026-02-23T09:00:00-05:00", slaTier: "24h", qaStatus: "approved", calibration: null,
    transactions: [{ date: "Feb 12", type: "Buy CADD", amount: 85000, dir: "in", flag: false },{ date: "Feb 12", type: "Transfer", amount: 85000, dir: "out", flag: false }],
    flags: ["LVCTR required \u2014 exceeds $10,000 threshold"], report: "LVCTR only",
    behavioral: { bp:"Sep 2023\u2013Jan 2026", cp:"Feb 12, 2026", severity:"info",
      metrics:[
        {label:"Monthly Volume",baseline:"$5K\u2013$10K/quarter",current:"$85,000 (single tx)",change:"8.5\u00d7",dir:"up",sev:"warning"},
        {label:"Destination",baseline:"Hold on platform",current:"Coinbase Custody",change:"New but verified",dir:"new",sev:"info"},
        {label:"Income Ratio",baseline:"Consistent",current:"$85K vs $38K/mo",change:"2.2\u00d7 monthly",dir:"up",sev:"info"}
      ],
      bd:"Feb 12, 2026", traj:[{d:"Sep 2023",l:"low"},{d:"2024",l:"low"},{d:"Feb 12",l:"medium"}],
      confidence:"Low", exp:"Volume spike but verified Coinbase destination. Proportional to income. Single transfer."
    }
  },
  M2: { id: "M2", tier: "medium", name: "Anika Okafor", age: 34, location: "Ottawa, ON", occupation: "Marketing Manager", accountOpened: "Aug 2024", riskScore: 48, typology: "Behavioral Change", typologyTag: "BEHAV",
    summary: "18-month DCA trader suddenly liquidated all holdings, bought $23,000 CADD, transferred to brand-new wallet.",
    slaAssigned: "2026-02-23T09:00:00-05:00", slaTier: "24h", qaStatus: null, calibration: null,
    transactions: [{ date: "Feb 8", type: "Sell BTC", amount: 15000, dir: "in", flag: false },{ date: "Feb 8", type: "Sell ETH", amount: 8000, dir: "in", flag: false },{ date: "Feb 9", type: "Buy CADD", amount: 23000, dir: "in", flag: false },{ date: "Feb 9", type: "Transfer", amount: 23000, dir: "out", flag: true }],
    flags: ["18-month DCA broken","Full liquidation","New wallet (0 history)"], report: "LVCTR + review",
    behavioral: { bp:"Aug 2024\u2013Jan 2026", cp:"Feb 8\u20139, 2026", severity:"warning",
      metrics:[
        {label:"Strategy",baseline:"DCA $800\u2013$1,200/mo",current:"Full liquidation + single buy",change:"Pattern break",dir:"new",sev:"warning"},
        {label:"Monthly Volume",baseline:"$1,000 avg",current:"$23,000 (1 day)",change:"23\u00d7",dir:"up",sev:"warning"},
        {label:"Asset Types",baseline:"BTC, ETH",current:"100% CADD",change:"Concentrated",dir:"new",sev:"warning"},
        {label:"Destination",baseline:"Hold on platform",current:"New wallet (< 24h)",change:"Unverified",dir:"new",sev:"warning"}
      ],
      bd:"Feb 8, 2026", traj:[{d:"Aug 2024",l:"low"},{d:"Jan 2026",l:"low"},{d:"Feb 8",l:"medium"}],
      confidence:"Medium", exp:"18mo DCA broken. Full liquidation to new wallet. Possible compromise or strategy change."
    }
  },
  M3: { id: "M3", tier: "medium", name: "Jean-Pierre Dubois", age: 40, location: "Montreal, QC", occupation: "Consultant (CA/FR)", accountOpened: "Mar 2024", riskScore: 42, typology: "Travel Rule Incomplete", typologyTag: "TRAVEL",
    summary: "$15,000 CADD from MiCA-regulated French exchange. Travel Rule incomplete. EFTR required for international EFT > $10,000.",
    slaAssigned: "2026-02-23T09:00:00-05:00", slaTier: "24h", qaStatus: null, calibration: null,
    transactions: [{ date: "Feb 16", type: "Receive CADD", amount: 15000, dir: "in", flag: false }],
    flags: ["Travel Rule incomplete","EFTR required (intl EFT > $10K)","Funds held"], report: "LVCTR + EFTR (international EFT)",
    behavioral: { bp:"Mar 2024\u2013Jan 2026", cp:"Feb 16, 2026", severity:"info",
      metrics:[
        {label:"Monthly Volume",baseline:"$2K\u2013$4K",current:"$15,000 (single inbound)",change:"3.8\u00d7",dir:"up",sev:"info"},
        {label:"Direction",baseline:"Mostly buys",current:"Inbound from EU",change:"First international",dir:"new",sev:"info"},
        {label:"Source",baseline:"Self-funded",current:"Bitstamp EU (MiCA)",change:"New but verified",dir:"new",sev:"info"}
      ],
      bd:"Feb 16, 2026", traj:[{d:"Mar 2024",l:"low"},{d:"2025",l:"low"},{d:"Feb 16",l:"low"}],
      confidence:"Low", exp:"Modest increase relative to income. MiCA-regulated source. Procedural issue, not behavioral."
    }
  },
  L1: { id: "L1", tier: "low", name: "Emily Watson", riskScore: 8, typologyTag: "AUTO", summary: "Weekly $200 CADD DCA \u2014 3 months consistent", resolution: "DCA matches income. On-platform only." },
  L2: { id: "L2", tier: "low", name: "Ahmed Hassan", riskScore: 12, typologyTag: "AUTO", summary: "$5K roundtrip \u2014 bought and sold within 20 min", resolution: "Platform testing. Small loss." },
  L3: { id: "L3", tier: "low", name: "Linda Nakamura", riskScore: 5, typologyTag: "AUTO", summary: "$500 CADD to verified family member", resolution: "Family transfer. Both verified." },
  L4: { id: "L4", tier: "low", name: "TechNova Solutions", riskScore: 15, typologyTag: "AUTO", summary: "Business receiving small CADD payments", resolution: "Registered business." },
  L5: { id: "L5", tier: "low", name: "Kyle Morrison", riskScore: 10, typologyTag: "AUTO", summary: "47 CADD/USDC swaps \u2014 all on-platform", resolution: "On-platform arbitrage." },
  L6: { id: "L6", tier: "low", name: "Maria Gonzalez", riskScore: 7, typologyTag: "AUTO", summary: "Bi-weekly USDC salary to CADD to CAD", resolution: "Payroll off-ramp." },
};
const LOGS = {
 H1: [
 {time:"09:00",date:"Feb 23",type:"alert",icon:"\ud83d\udd14",actor:"System",action:"Alert generated",detail:"Risk: 87 \u00b7 Structuring \u00b7 SLA: 4h"},
 {time:"09:05",date:"Feb 23",type:"view",icon:"\ud83d\udc41",actor:"V. Ariyarathnam",action:"Opened case \u00b7 reviewed intel"},
 {time:"09:30",date:"Feb 23",type:"calibration",icon:"\ud83d\udccb",actor:"S. Patel",action:"Calibration session started",detail:"STR vs LVCTR-only decision"},
 {time:"14:22",date:"Jan 28",type:"risk",icon:"\u26a0\ufe0f",actor:"System",action:"Risk score: 42 \u2192 87",detail:"Structuring pattern detected across 8 transactions"},
 {time:"10:15",date:"Jun 15, 2025",type:"account",icon:"\ud83c\udd95",actor:"System",action:"Account opened \u00b7 KYC verified",detail:"Initial risk: 18 (Low)"}
 ],
 H2: [
 {time:"09:15",date:"Feb 23",type:"alert",icon:"\ud83d\udd14",actor:"System",action:"Alert generated",detail:"Risk: 92 \u00b7 Sanctions\u2014Iran \u00b7 SLA: 4h"},
 {time:"09:17",date:"Feb 23",type:"view",icon:"\ud83d\udc41",actor:"V. Ariyarathnam",action:"Opened case \u00b7 reviewed all intel"},
 {time:"09:40",date:"Feb 23",type:"ai",icon:"\ud83e\udd16",actor:"V. Ariyarathnam",action:"Ran AI: Draft STR Narrative"},
 {time:"09:47",date:"Feb 23",type:"decision",icon:"\ud83d\udccb",actor:"V. Ariyarathnam",action:"Filed STR (IR2020 Directive)",detail:"Sent to QA queue"},
 {time:"09:52",date:"Feb 23",type:"qa",icon:"\u2705",actor:"S. Patel (Lead)",action:"QA approved STR",detail:"Clear Iran nexus. STR appropriate."},
 {time:"09:53",date:"Feb 23",type:"export",icon:"\ud83d\udce6",actor:"V. Ariyarathnam",action:"Exported case file"},
 {time:"14:22",date:"Feb 16",type:"risk",icon:"\u26a0\ufe0f",actor:"System",action:"Risk score: 12 \u2192 92",detail:"Chainalysis cluster reclassification LOW\u2192SEVERE"},
 {time:"10:30",date:"Feb 8, 2024",type:"account",icon:"\ud83c\udd95",actor:"System",action:"Account opened \u00b7 KYC verified",detail:"Initial risk: 12 (Low)"}
 ],
 H3: [
 {time:"09:30",date:"Feb 23",type:"alert",icon:"\ud83d\udd14",actor:"System",action:"Correlated alert \u2014 3 accounts",detail:"Risk: 95 \u00b7 Mule Network \u00b7 SLA: 4h"},
 {time:"09:35",date:"Feb 23",type:"view",icon:"\ud83d\udc41",actor:"V. Ariyarathnam",action:"Opened case"},
 {time:"09:45",date:"Feb 23",type:"ai",icon:"\ud83e\udd16",actor:"V. Ariyarathnam",action:"Ran AI: Draft STR Narrative"},
 {time:"09:50",date:"Feb 23",type:"decision",icon:"\ud83d\udccb",actor:"V. Ariyarathnam",action:"Filed consolidated STR",detail:"Mule network / proceeds of fraud. Sent to QA."},
 {time:"11:00",date:"Feb 3",type:"risk",icon:"\u26a0\ufe0f",actor:"System",action:"Pattern correlation detected",detail:"3 accounts linked to same source wallet cluster"},
 {time:"14:00",date:"Nov 8, 2025",type:"account",icon:"\ud83c\udd95",actor:"System",action:"Sarah Park account opened",detail:"Initial risk: 8 (Low)"}
 ],
 M1: [
 {time:"09:00",date:"Feb 23",type:"alert",icon:"\ud83d\udd14",actor:"System",action:"Alert generated",detail:"Risk: 35 \u00b7 LVCTR \u00b7 SLA: 24h"},
 {time:"09:10",date:"Feb 23",type:"view",icon:"\ud83d\udc41",actor:"V. Ariyarathnam",action:"Opened case"},
 {time:"09:12",date:"Feb 23",type:"decision",icon:"\ud83d\udccb",actor:"V. Ariyarathnam",action:"Filed LVCTR",detail:"Clean profile. Routine large transaction."},
 {time:"09:15",date:"Feb 23",type:"qa",icon:"\u2705",actor:"S. Patel (Lead)",action:"QA approved LVCTR"},
 {time:"15:00",date:"Sep 5, 2023",type:"account",icon:"\ud83c\udd95",actor:"System",action:"Account opened \u00b7 KYC verified",detail:"Initial risk: 10 (Low)"}
 ],
 M2: [
 {time:"09:00",date:"Feb 23",type:"alert",icon:"\ud83d\udd14",actor:"System",action:"Alert generated",detail:"Risk: 48 \u00b7 Behavioral Change \u00b7 SLA: 24h"},
 {time:"09:42",date:"Feb 23",type:"view",icon:"\ud83d\udc41",actor:"V. Ariyarathnam",action:"Opened case"},
 {time:"09:48",date:"Feb 23",type:"ai",icon:"\ud83e\udd16",actor:"V. Ariyarathnam",action:"Ran AI: Investigation Summary"},
 {time:"10:30",date:"Feb 9",type:"risk",icon:"\u26a0\ufe0f",actor:"System",action:"Behavioral anomaly detected",detail:"18-month DCA pattern broken. Full liquidation."},
 {time:"11:00",date:"Aug 14, 2024",type:"account",icon:"\ud83c\udd95",actor:"System",action:"Account opened \u00b7 KYC verified",detail:"Initial risk: 12 (Low)"}
 ],
 M3: [
 {time:"09:00",date:"Feb 23",type:"alert",icon:"\ud83d\udd14",actor:"System",action:"Alert generated",detail:"Risk: 42 \u00b7 Travel Rule \u00b7 SLA: 24h"},
 {time:"10:05",date:"Feb 23",type:"view",icon:"\ud83d\udc41",actor:"V. Ariyarathnam",action:"Opened case"},
 {time:"09:00",date:"Feb 16",type:"risk",icon:"\u26a0\ufe0f",actor:"System",action:"Travel Rule hold — EFTR required",detail:"International EFT > $10K"},
 {time:"14:00",date:"Mar 22, 2024",type:"account",icon:"\ud83c\udd95",actor:"System",action:"Account opened \u00b7 KYC verified",detail:"Initial risk: 15 (Low)"}
 ]
};

const SYS_PROMPT = "You are Sentinel, an AI compliance assistant for Wealthsimple AML operations. You analyze intelligence from Persona, Plaid, Flinks, Chainalysis, TRM Labs, Elliptic, and sanctions/PEP screening. You understand FINTRAC filing requirements including STRs, LVCTRs, EFTRs, and Travel Rule. CRITICAL: You NEVER decide whether to file. For STR narratives use WHO/WHAT/WHEN/WHERE/WHY/HOW. Include IR2020 for Iran cases.";

async function callClaude(caseData, intel, action) {
 const prompts = { summary: "Generate a concise investigation summary synthesizing all 7 intelligence systems.", str: "Draft a FINTRAC STR narrative using WHO/WHAT/WHEN/WHERE/WHY/HOW with specific amounts and dates.", typology: "Identify matching FINTRAC ML/TF indicators with confidence ratings." };
 try {
 const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: SYS_PROMPT, messages: [{ role: "user", content: prompts[action] + "\n\nCASE:\n" + JSON.stringify(caseData) + "\n\nINTEL:\n" + JSON.stringify(intel) }] }) });
 const d = await r.json(); return d.content?.map(b => b.text || "").join("\n") || "Unable to generate.";
 } catch (e) { return "API Error: " + e.message; }
}

const riskColor = s => s >= 70 ? "var(--risk-high)" : s >= 30 ? "var(--risk-med)" : "var(--risk-low)";
const riskBg = s => s >= 70 ? "var(--risk-high-bg)" : s >= 30 ? "var(--risk-med-bg)" : "var(--risk-low-bg)";
const Score = ({ score, small }) => <span className="score" style={{ background: riskBg(score), color: riskColor(score), fontSize: small ? 10 : 11, padding: small ? "1px 6px" : "2px 8px" }}>{score}</span>;
const Tag = ({ tag }) => { const m = { STRUCT: "high", SANCT: "high", NETWORK: "high", LVCTR: "med", BEHAV: "med", TRAVEL: "med", AUTO: "low" }; return <span className={`tag tag-${m[tag] || "low"}`}>{tag}</span>; };
const IR = ({ label, value, warn }) => <div className="irow"><span className="irow-label">{label}</span><span className={`irow-val${warn ? " irow-warn" : ""}`}>{value}</span></div>;

function getSlaRemaining(assigned, tier) {
 const hrs = tier === "4h" ? 4 : 24;
 const deadline = new Date(new Date(assigned).getTime() + hrs * 3600000);
 const diff = deadline - NOW;
 if (diff <= 0) return { text: Math.abs(Math.floor(diff / 60000)) + "m overdue", color: "var(--risk-high)", pct: 0, breached: true };
 const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000);
 const pct = diff / (hrs * 3600000);
 const color = pct > 0.5 ? "var(--risk-low)" : pct > 0.25 ? "var(--risk-med)" : "var(--risk-high)";
 return { text: h > 0 ? h + "h " + m + "m" : m + "m", color, pct, breached: false };
}

function exportCaseFile(c, intel) {
 let t = "SENTINEL CASE FILE\n" + "=".repeat(50) + "\n" + c.id + " | " + c.name + " | Risk: " + c.riskScore + " | " + c.typology + "\n";
 if(c.transactions) c.transactions.forEach(tx=>{t+=tx.date+" "+tx.type+" $"+tx.amount.toLocaleString()+(tx.flag?" FLAG":"")+"\n";});
 if(c.flags) {t+="\nINDICATORS:\n";c.flags.forEach(f=>{t+="* "+f+"\n";});}
 t+="\nFILING: "+c.report+"\n";
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t]));a.download="Sentinel-"+c.id+".txt";a.click();
}

function PersonaPanel({ d }) { return d ? <div className="ipanel"><div className="ipanel-grid"><IR label="Status" value={d.status + " (" + d.date + ")"} /><IR label="ID Type" value={d.idType} /><IR label="Selfie Match" value={typeof d.selfieMatch === "number" ? d.selfieMatch + "%" : d.selfieMatch} /><IR label="Name" value={d.nameMatch} /><IR label="Address" value={d.addr} /></div><div className="ipanel-divider" /><div className="ipanel-grid"><IR label="Watchlist" value={d.watchlist} /><IR label="PEP" value={d.pep} /><IR label="Adverse Media" value={d.adverseMedia} /><IR label="Tamper" value={d.tamperChecks} /></div><div className="ipanel-divider" /><div className="ipanel-grid"><IR label="Behavioral" value={d.behavioral} warn={d.behavioral?.includes("\u26a0")} /><IR label="IP" value={d.ip} /><IR label="Device" value={d.device} /></div></div> : null; }

function PlaidPanel({ d }) {
 if (!d) return null;
 return <div className="ipanel"><div className="ipanel-grid"><IR label="Institution" value={d.institution} /><IR label="Account" value={d.accountType} /><IR label="Balance" value={d.balance} /></div><div className="ipanel-divider" /><div className="ipanel-grid"><IR label="Name Match" value={d.nameScore} /><IR label="Email Match" value={d.emailScore} /><IR label="Phone Match" value={d.phoneScore} /><IR label="Addr Match" value={d.addressScore} /></div><div className="ipanel-divider" /><div className="ipanel-grid"><IR label="Trust Index" value={d.trustIndex} warn={typeof d.trustIndex==="number"&&d.trustIndex<65} />{d.networkSignals&&<IR label="Network" value={d.networkSignals} warn={d.networkSignals?.includes("\u26a0")} />}</div></div>;
}

function FlinksPanel({ d }) { return d ? <div className="ipanel"><div className="ipanel-grid"><IR label="Income" value={d.incomeSource} /><IR label="Monthly" value={d.monthlyIncome} /><IR label="Frequency" value={d.frequency} /><IR label="Cash Flow" value={d.cashFlow} /></div><div className="ipanel-divider" /><div className="ipanel-grid"><IR label="Liabilities" value={d.liabilities} /><IR label="NSF" value={d.nsf} /><IR label="Large Deposits" value={d.largeDeposits} warn={d.largeDeposits?.includes("\u26a0")} /><IR label="Crypto" value={d.cryptoTransfers} /></div>{d.anomaly && <div className={`ipanel-alert ${d.anomaly.includes("CRITICAL") ? "alert-critical" : "alert-warn"}`}>{d.anomaly}</div>}</div> : null; }

function ChainPanel({ d }) { return d?.length ? <div className="ipanel">{d.map((w,i) => <div key={i} className={`chain-intel level-${w.risk==="SEVERE"?3:w.risk==="HIGH"?2:w.risk==="MEDIUM"?1:0}`}><div className="ci-header"><span className="mono" style={{fontWeight:600,fontSize:12}}>{w.wallet}</span><span className={`ci-badge ci-${w.risk.toLowerCase()}`}>{w.risk}</span></div><div className="ipanel-grid" style={{marginTop:8}}><IR label="Alert" value={w.alertType} /><IR label="Direct" value={w.direct} /><IR label="Indirect" value={w.indirect} warn={parseFloat(w.indirect)>10} /><IR label="Categories" value={w.categories} warn /><IR label="Counterparty" value={w.counterparty} /><IR label="Cross-Chain" value={w.crossChain} warn={w.crossChain!=="None"} /><IR label="Cluster" value={w.cluster} /></div>{i<d.length-1&&<div className="ipanel-divider"/>}</div>)}</div> : null; }

function TRMPanel({ d }) { return d?.length ? <div className="ipanel">{d.map((w,i) => <div key={i}><div className="ci-header"><span className="mono" style={{fontWeight:600,fontSize:12}}>{w.wallet}</span><span className={`ci-badge ci-${w.rl.toLowerCase()}`}>{w.rl} ({w.riskScore})</span></div><div className="ipanel-grid" style={{marginTop:8}}><IR label="Ownership" value={w.ownership} /><IR label="Counterparty" value={w.counterparty} warn={w.counterparty?.includes("High")||w.counterparty?.includes("Severe")} /><IR label="Indirect" value={w.indirect} /><IR label="VASP" value={w.vasp} /><IR label="Volume 30d" value={w.volume30d} /><IR label="Risk Vol %" value={w.riskVolPct} warn={parseFloat(w.riskVolPct)>20} /><IR label="Cross-Chain" value={w.crossChain} warn={w.crossChain!=="None"} /></div>{i<d.length-1&&<div className="ipanel-divider"/>}</div>)}</div> : null; }

function EllipticPanel({ d }) { return d?.length ? <div className="ipanel">{d.map((w,i) => <div key={i} className={`chain-intel level-${w.rl==="SEVERE"?3:w.rl==="HIGH"?2:w.rl==="MEDIUM"?1:0}`}><div className="ci-header"><span className="mono" style={{fontWeight:600,fontSize:12}}>{w.wallet}</span><span className={`ci-badge ci-${w.rl.toLowerCase()}`}>Holistic {w.hs}</span></div><div className="ipanel-grid" style={{marginTop:8}}><IR label="Wallet Risk" value={w.wr} warn={w.wr?.includes("Severe")||w.wr?.includes("High")} /><IR label="Tx Risk" value={w.tr} warn={w.tr?.includes("Severe")} /><IR label="Entity Risk" value={w.er} warn={w.er?.includes("Unknown")} /><IR label="Cross-Chain" value={w.crossChain} warn={w.crossChain!=="None"&&!w.crossChain?.includes("None")} /><IR label="Nexus Entities" value={w.ne} /></div>{w.rf?.length>0&&<><div className="ipanel-divider"/><p className="label-sm" style={{marginBottom:4}}>Rules Fired ({w.rf.length}/{w.rt})</p>{w.rf.map((r,ri)=><div key={ri} className="elliptic-rule">{"⚑ "+r}</div>)}</>}{i<d.length-1&&<div className="ipanel-divider" style={{margin:"10px 0"}}/>}</div>)}</div> : null; }

function ScreeningPanel({ d }) { return d ? <div className="ipanel"><div className="ipanel-grid"><IR label="Sanctions" value={d.sanctions} warn={!d.sanctions?.includes("None")} /><IR label="Lists" value={d.lists} /><IR label="PEP" value={d.pep} warn={!d.pep?.includes("Not")} /><IR label="Adverse Media" value={d.adverseMedia} /><IR label="Last Screened" value={d.lastScreened} /><IR label="Monitoring" value={d.monitoring} /></div></div> : null; }

const TABS = [
 { key: "persona", label: "Persona", sub: "Identity" },
 { key: "plaid", label: "Plaid", sub: "Bank" },
 { key: "flinks", label: "Flinks", sub: "Banking Data" },
 { key: "chainalysis", label: "Chainalysis", sub: "On-Chain" },
 { key: "trm", label: "TRM Labs", sub: "Screening" },
 { key: "elliptic", label: "Elliptic", sub: "Analytics" },
 { key: "screening", label: "Sanctions", sub: "PEP / Lists" },
];

function IntelTabs({ intel }) {
 const [tab, setTab] = useState("persona");
 if (!intel) return null;
 const panels = { persona: <PersonaPanel d={intel.persona} />, plaid: <PlaidPanel d={intel.plaid} />, flinks: <FlinksPanel d={intel.flinks} />, chainalysis: <ChainPanel d={intel.chainalysis} />, trm: <TRMPanel d={intel.trm} />, elliptic: <EllipticPanel d={intel.elliptic} />, screening: <ScreeningPanel d={intel.screening} /> };
 return <section className="intel-section"><p className="section-label">Intelligence Sources</p><div className="intel-tabs">{TABS.map(t => <button key={t.key} className={`intel-tab ${tab===t.key?"active":""}`} onClick={()=>setTab(t.key)}><span className="it-label">{t.label}</span><span className="it-sub">{t.sub}</span></button>)}</div><div className="intel-content">{panels[tab]}</div></section>;
}

function Queue({ cases, sel, onSel, showR, setShowR }) {
 const active = cases.filter(c => c.tier !== "low"), resolved = cases.filter(c => c.tier === "low");
 return <nav className="queue">
 <button className={`queue-header ${sel===null?"queue-header-active":""}`} onClick={()=>onSel(null)}><span className="queue-title">{sel===null?"◉ Overview":"← Overview"}</span><span className="queue-count">{active.length} active</span></button>
 <div className="queue-list">
 {active.map(c => { const sla = c.slaTier ? getSlaRemaining(c.slaAssigned, c.slaTier) : null; return <button key={c.id} className={`queue-item ${sel===c.id?"active":""}`} onClick={()=>onSel(c.id)}>
 <div className="qi-top"><span className="qi-name">{c.name}{c.qaStatus==="pending"&&<span className="qa-badge qa-pending">⏳</span>}{c.qaStatus==="approved"&&<span className="qa-badge qa-approved">✓</span>}{c.calibration?.active&&<span className="qa-badge qa-calib">📋</span>}</span><Score score={c.riskScore} small /></div>
 <div className="qi-bottom"><Tag tag={c.typologyTag} /><span className="qi-type">{c.typology}</span></div>
 {sla&&<div className="sla-row"><span className="sla-icon" style={{color:sla.color}}>{sla.breached?"⚠":"⏱"}</span><span className="sla-text" style={{color:sla.color}}>{sla.text}{sla.breached?"":" remaining"}</span></div>}
 </button>; })}
 <button className="queue-divider" onClick={()=>setShowR(!showR)}><span className="qd-dot"/><span>Auto-resolved · {resolved.length}</span><span className="qd-arrow">{showR?"−":"+"}</span></button>
 {showR && resolved.map(c => <button key={c.id} className={`queue-item resolved ${sel===c.id?"active":""}`} onClick={()=>onSel(c.id)}><div className="qi-top"><span className="qi-name">{c.name}</span><Score score={c.riskScore} small /></div><div className="qi-sub">{c.summary}</div></button>)}
 </div>
 </nav>;
}

function BehavioralDelta({ c }) {
 if (!c?.behavioral) return null;
 const b = c.behavioral;
 const sevColors = { critical:"var(--risk-high)", warning:"var(--risk-med)", info:"var(--text-secondary)" };
 const sevBgs = { critical:"var(--risk-high-bg)", warning:"var(--risk-med-bg)", info:"var(--surface)" };
 const levelColors = { low:"var(--risk-low)", medium:"var(--risk-med)", high:"var(--risk-med)", severe:"var(--risk-high)" };
 return <section className="delta-section" style={{borderLeftColor:sevColors[b.severity]||"var(--text-tertiary)",background:sevBgs[b.severity]||"var(--surface)"}}>
 <div className="delta-header"><span className="delta-icon">{b.severity==="critical"?"\u26a1":b.severity==="warning"?"\u26a0":"\u2713"}</span><span className="delta-title">{b.severity==="info"?"Behavior Consistent":"Behavioral Change Detected"}</span><span className="delta-period">{b.cp}</span></div>
 <div className="delta-grid">{b.metrics.map((m,i)=><div key={i} className="delta-row"><span className="delta-label">{m.label}</span><span className="delta-baseline">{m.baseline}</span><span className="delta-arrow">\u2192</span><span className="delta-current">{m.current}</span><span className={`delta-change delta-${m.sev}`}>{m.dir==="up"?"\u25b2":m.dir==="down"?"\u25bc":m.dir==="new"?"\u25c6":""} {m.change}</span></div>)}</div>
 <div className="delta-trajectory"><span className="delta-traj-label">Risk Trajectory</span><div className="delta-traj-bar">{b.traj.map((t,i)=><div key={i} className="delta-traj-point"><div className="delta-dot" style={{background:levelColors[t.l]}}/><span className="delta-dot-label">{t.d}</span><span className="delta-dot-level" style={{color:levelColors[t.l]}}>{t.l.toUpperCase()}</span></div>)}</div></div>
 <div className="delta-footer"><span className="delta-conf">Confidence: <strong>{b.confidence}</strong></span><span className="delta-break">Pattern break: {b.bd}</span></div>
 <p className="delta-explain">{b.exp}</p>
 </section>;
}

function CaseView({ c, intel, role }) {
 const [exported, setExported] = useState(false);
 if (!c) return <div className="case-empty">Select a case</div>;
 if (c.tier === "low") return <div className="case-scroll"><div className="case-pad"><header className="case-header"><div><h2 className="case-name">{c.name}</h2><p className="case-resolved-label">Auto-resolved by Sentinel</p></div><Score score={c.riskScore} /></header><div className="resolved-card"><span className="resolved-icon">✓</span><div><p className="label-sm">AI Resolution</p><p className="body-text">{c.resolution}</p></div></div><div className="info-card"><p className="label-sm">Original Alert</p><p className="body-text muted">{c.summary}</p></div></div></div>;

 const sla = c.slaTier ? getSlaRemaining(c.slaAssigned, c.slaTier) : null;
 const doExport = () => { exportCaseFile(c, intel); setExported(true); setTimeout(()=>setExported(false), 2000); };

 return <div className="case-scroll"><div className="case-pad">
 <header className="case-header"><div><h2 className="case-name">{c.name}</h2><p className="case-meta">{c.age?c.age+" · ":""}{c.location} · Opened {c.accountOpened}</p>{sla&&<p className="sla-header" style={{color:sla.color}}>{sla.breached?"⚠ SLA BREACHED":"⏱ SLA"}: {sla.text}{sla.breached?"":" remaining"}</p>}</div><div style={{display:"flex",alignItems:"flex-start",gap:8}}><button className={`export-btn ${exported?"exported":""}`} onClick={doExport}>{exported?"✓ Exported":"↓ Export"}</button><div style={{textAlign:"right"}}><Score score={c.riskScore}/><p className="case-meta" style={{marginTop:4}}>{c.typology}</p></div></div></header>

 {c.linked&&<div className="network-card"><p className="label-sm" style={{color:"var(--risk-high)"}}>Network Detected — 3 Linked Accounts</p><div className="network-grid">{c.linked.map((a,i)=><div key={i} className="network-person"><div className="np-avatar">{a.name.split(" ").map(n=>n[0]).join("")}</div><div><p className="np-name">{a.name}</p><p className="np-detail">{a.age}y · {a.bank}</p></div></div>)}<div className="network-line" style={{textAlign:"center",padding:"8px 0",fontSize:10,color:"var(--risk-high)",fontFamily:"var(--mono)"}}>↕ Source: 0xaaaa...1111 (142-address cluster)</div></div></div>}

 <div className="summary-card"><p className="label-sm" style={{color:"var(--gold-dark)"}}>AI Assessment</p><p className="body-text">{c.summary}</p></div>
 <BehavioralDelta c={c} />
 <IntelTabs intel={intel} />

 {c.transactions&&<section><p className="section-label">Transaction Timeline</p><div className="tx-table-wrap"><table className="tx-table"><thead><tr><th>Date</th><th>Type</th><th style={{textAlign:"right"}}>Amount</th><th>Dir</th></tr></thead><tbody>{c.transactions.map((t,i)=><tr key={i} className={t.flag?"flagged":""}><td className="mono">{t.date}</td><td>{t.type}</td><td className="mono" style={{textAlign:"right",fontWeight:600}}>${t.amount.toLocaleString()}</td><td><span className={`dir ${t.dir}`}>{t.dir==="in"?"↓":"↑"}</span></td></tr>)}</tbody></table></div></section>}

 {c.flags&&<section><p className="section-label">FINTRAC Indicators</p><div className="flags-list">{c.flags.map((f,i)=><div key={i} className="flag-item"><span className="flag-icon">⚑</span><span>{f}</span></div>)}</div></section>}
 {c.report&&<div className="report-card"><p className="label-sm">Filing Requirement</p><p style={{fontWeight:600,fontSize:14}}>{c.report}</p></div>}
 <ActivityLog caseId={c.id} logs={LOGS[c.id]} />
 </div></div>;
}

function ActivityLog({ caseId, logs, extraEntries }) {
 const [open, setOpen] = useState(true);
 const allLogs = [...(logs || []), ...(extraEntries || [])];
 if (!allLogs.length) return null;
 const today = allLogs.filter(l => l.date === "Feb 23");
 const earlier = allLogs.filter(l => l.date !== "Feb 23");
 return <section className="alog-section">
 <button className="alog-toggle" onClick={() => setOpen(!open)}><span className="alog-title">\ud83d\udcdc Case Activity Log</span><span className="alog-count">{allLogs.length} events</span><span>{open ? "\u25b2" : "\u25bc"}</span></button>
 {open && <div className="alog-list">
 {today.length > 0 && <><div className="alog-date-sep">Feb 23, 2026</div>{today.map((l,i) => <div key={"t"+i} className={`alog-entry alog-${l.type}`}><span className="alog-time">{l.time}</span><span className="alog-icon">{l.icon}</span><div className="alog-content"><span className="alog-action"><strong>{l.actor}</strong> {l.action}</span>{l.detail && <span className="alog-detail">{l.detail}</span>}</div></div>)}</>}
 {earlier.length > 0 && <><div className="alog-date-sep">Earlier</div>{earlier.map((l,i) => <div key={"e"+i} className={`alog-entry alog-${l.type}`}><span className="alog-time">{l.date} {l.time}</span><span className="alog-icon">{l.icon}</span><div className="alog-content"><span className="alog-action"><strong>{l.actor}</strong> {l.action}</span>{l.detail && <span className="alog-detail">{l.detail}</span>}</div></div>)}</>}
 </div>}
 </section>;
}

function AIPanel({ c, intel }) {
 const [loading, setLoading] = useState(false); const [resp, setResp] = useState(""); const [active, setActive] = useState(null); const ref = useRef(null);
 useEffect(()=>{setResp("");setActive(null);},[c?.id]); useEffect(()=>{ref.current&&(ref.current.scrollTop=ref.current.scrollHeight);},[resp]);
 if (!c || c.tier==="low") return null;
 const run = async(action)=>{ setLoading(true);setActive(action);setResp(""); const result = await callClaude(c,intel,action); for(let i=0;i<result.length;i+=4){await new Promise(r=>setTimeout(r,6));setResp(result.slice(0,i+4));} setResp(result);setLoading(false); };
 return <div className="ai-panel"><p className="section-label" style={{padding:"0 0 8px"}}>AI Investigation Assistant</p><div className="ai-buttons">{[["summary","Investigation Summary"],["str","Draft STR Narrative"],["typology","FINTRAC Typology"]].map(([k,l])=><button key={k} className={`ai-btn ${active===k?"active":""}`} onClick={()=>run(k)} disabled={loading}>{loading&&active===k?"Analyzing…":l}</button>)}</div>{(resp||loading)&&<div ref={ref} className="ai-response">{loading&&!resp&&<span className="ai-loading">Synthesizing intelligence from all 7 systems…</span>}{resp}</div>}</div>;
}

function DecisionBar({ c, role }) {
 const [picked, setPicked] = useState(null); const [qaAction, setQaAction] = useState(null); const [qaNotes, setQaNotes] = useState("");
 useEffect(()=>{setPicked(null);setQaAction(null);setQaNotes("");},[c?.id]);
 if (!c || c.tier==="low") return null;
 if (role==="lead"&&c.qaStatus==="pending") return <div className="decision-bar qa-review-bar"><div className="decision-top"><span className="decision-dot" style={{background:"var(--gold)"}}/><span className="decision-label">QA Review</span></div><div className="qa-info"><span className="qa-info-text">Analyst: V. Ariyarathnam · Decision: <strong>File STR</strong> · Feb 23 at 9:47 AM</span></div><div className="decision-buttons"><button className={`decision-btn qa-approve ${qaAction==="approve"?"picked":""}`} onClick={()=>setQaAction("approve")}>✓ Approve</button><button className={`decision-btn qa-return ${qaAction==="return"?"picked":""}`} onClick={()=>setQaAction("return")}>↩ Return</button><button className={`decision-btn qa-override ${qaAction==="override"?"picked":""}`} onClick={()=>setQaAction("override")}>✗ Override</button></div>{qaAction&&<><textarea className="qa-notes" placeholder="QA notes..." value={qaNotes} onChange={e=>setQaNotes(e.target.value)} rows={2}/><div className="decision-confirm">{qaAction==="approve"?"✓ Approved — STR proceeds to filing.":qaAction==="return"?"↩ Returned to V. Ariyarathnam.":"✗ Decision overridden."}</div></>}</div>;
 const acts=[{k:"str",label:"File STR",msg:"STR draft queued."},{k:"lvctr",label:"File LVCTR",msg:"LVCTR form pre-filled."},{k:"eftr",label:"File EFTR",msg:"EFTR form pre-filled — 5 day deadline."},{k:"dismiss",label:"Dismiss",msg:"Case archived."},{k:"escalate",label:"Escalate",msg:"Sent to Team Lead."}];
 return <div className="decision-bar"><div className="decision-top"><span className="decision-dot"/><span className="decision-label">Human Decision Required</span></div><div className="decision-buttons">{acts.map(a=><button key={a.k} className={`decision-btn ${a.k} ${picked===a.k?"picked":""}`} onClick={()=>setPicked(a.k)}>{a.label}</button>)}</div>{picked&&<div className="decision-confirm">✓ {acts.find(a=>a.k===picked).msg}{picked!=="dismiss"?" Pending QA.":""}</div>}</div>;
}

function CalibrationOverlay({ c, onClose }) {
 const [myD, setMyD] = useState(null); const [conf, setConf] = useState(50);
 if (!c?.calibration?.active) return null;
 const cal=c.calibration,resp=cal.responses.filter(r=>r.decision),cons=resp.reduce((a,r)=>{a[r.decision]=(a[r.decision]||0)+1;return a;},{}),top=Object.entries(cons).sort((a,b)=>b[1]-a[1])[0];
 return <div className="calib-overlay" onClick={onClose}><div className="calib-modal" onClick={e=>e.stopPropagation()}>
 <div className="calib-header"><span>📋</span><span className="calib-title">Calibration — {c.id}: {c.name}</span><button className="calib-close" onClick={onClose}>×</button></div>
 <div className="calib-body">
 <div className="calib-question"><p className="label-sm">Question</p><p className="calib-q-text">{cal.question}</p></div>
 <div className="calib-my"><p className="label-sm">Your Recommendation</p><div className="calib-options">{["File STR","LVCTR only","Dismiss","Escalate"].map(d=><button key={d} className={`calib-opt ${myD===d?"active":""}`} onClick={()=>setMyD(d)}>{d}</button>)}</div></div>
 <div className="calib-responses"><p className="label-sm">Team ({resp.length}/{cal.responses.length})</p>{cal.responses.map((r,i)=><div key={i} className={`calib-resp ${r.decision?"":"pending"}`}><div className="calib-resp-top"><span className="calib-resp-name">{r.analyst} ({r.role})</span><span className="calib-resp-status">{r.decision||"Pending…"}</span></div>{r.note&&<p className="calib-resp-note">{r.note}</p>}</div>)}</div>
 {top&&<div className="calib-consensus">Consensus: <strong>{top[0]}</strong> ({top[1]}/{resp.length})</div>}
 </div>
 <div className="calib-footer"><button className="calib-btn-close" onClick={onClose}>Close</button><button className="calib-btn-apply" onClick={onClose} disabled={!myD}>Apply</button></div>
 </div></div>;
}

function Overview({ cases, onSelect }) {
 const all=Object.values(cases); const high=all.filter(c=>c.tier==="high"),med=all.filter(c=>c.tier==="medium"),low=all.filter(c=>c.tier==="low");
 const typo={}; all.filter(c=>c.tier!=="low").forEach(c=>{typo[c.typology||"Other"]=(typo[c.typology||"Other"]||0)+1;});
 const flagVol=all.filter(c=>c.transactions).reduce((s,c)=>s+c.transactions.reduce((s2,t)=>s2+t.amount,0),0);
 const pendQA=all.filter(c=>c.qaStatus==="pending").length; const slaBr=all.filter(c=>c.slaTier&&getSlaRemaining(c.slaAssigned,c.slaTier).breached).length;
 return <div className="case-scroll"><div className="case-pad">
 <div className="ov-header"><div><h2 className="ov-title">Daily Brief</h2><p className="case-meta">February 23, 2026 · Shift start 9:00 AM EST</p></div><div className="ov-badge-row"><span className="ov-badge critical">{high.length} Critical</span><span className="ov-badge review">{med.length} Review</span><span className="ov-badge resolved">{low.length} Resolved</span></div></div>
 <div className="ov-metrics">{[[all.length,"Total",""],[low.length,"Auto-Resolved","ov-green"],[high.length+med.length,"Pending","ov-amber"],["$"+(flagVol/1000).toFixed(0)+"K","Flagged Vol",""],[(slaBr),`SLA Breaches`,slaBr===0?"ov-green":"ov-red"]].map(([v,l,c],i)=><div key={i} className="ov-metric"><span className={`ov-metric-num ${c}`}>{v}</span><span className="ov-metric-label">{l}</span></div>)}</div>
 <div className="ov-grid">
 <div className="ov-section"><p className="section-label">Alert Breakdown</p><div className="ov-typo-list">{Object.entries(typo).map(([name,count])=>{const total=high.length+med.length;const pct=Math.round((count/total)*100);const isH=high.some(c=>c.typology===name);return <div key={name} className="ov-typo-row"><div className="ov-typo-info"><span className={`ov-typo-dot ${isH?"dot-high":"dot-med"}`}/><span className="ov-typo-name">{name}</span><span className="ov-typo-count">{count}</span></div><div className="ov-typo-bar-track"><div className={`ov-typo-bar-fill ${isH?"fill-high":"fill-med"}`} style={{width:pct+"%"}}/></div></div>;})}<div className="ov-typo-row"><div className="ov-typo-info"><span className="ov-typo-dot dot-low"/><span className="ov-typo-name">Auto-Resolved</span><span className="ov-typo-count">{low.length}</span></div><div className="ov-typo-bar-track"><div className="ov-typo-bar-fill fill-low" style={{width:Math.round((low.length/all.length)*100)+"%"}}/></div></div></div></div>
 <div className="ov-section"><p className="section-label">FINTRAC Filings</p><div className="ov-filings">{[["STR","str-type",3,"Suspicious Transaction Reports"],["LVCTR","lvctr-type",4,"Large Virtual Currency"],["EFTR","eftr-type",1,"Electronic Funds Transfer"],["Travel Rule","travel-type",1,"Incomplete originator/beneficiary"]].map(([t,cls,n,d])=><div key={t} className="ov-filing"><div className="ov-filing-top"><span className={`ov-filing-type ${cls}`}>{t}</span><span className="ov-filing-count">{n}</span></div><p className="ov-filing-desc">{d}</p></div>)}</div></div>
 </div>
 <div className="ov-grid">
 <div className="ov-section"><p className="section-label">SLA Status</p><div className="ov-sla-list">{all.filter(c=>c.slaTier).map(c=>{const sla=getSlaRemaining(c.slaAssigned,c.slaTier);return <div key={c.id} className="ov-sla-row"><span className="ov-sla-dot" style={{background:sla.color}}/><span className="ov-sla-name">{c.id}: {c.name}</span><span className="ov-sla-tier">({c.slaTier})</span><span className="ov-sla-time" style={{color:sla.color}}>{sla.breached?"⚠ ":""}{sla.text}</span></div>;})}</div></div>
 <div className="ov-section"><p className="section-label">QA Pipeline</p><div className="ov-qa-grid">{[[pendQA,"Pending","var(--risk-med)"],[1,"Approved","var(--risk-low)"],[0,"Returned",""],[`18m`,"Avg Time",""]].map(([v,l,c],i)=><div key={i} className="ov-qa-stat"><span className="ov-qa-num" style={{color:c||"inherit"}}>{v}</span><span className="ov-qa-label">{l}</span></div>)}</div>{all.filter(c=>c.calibration?.active).length>0&&<><div className="ipanel-divider" style={{margin:"12px 0"}}/><p className="label-sm">Active Calibrations</p>{all.filter(c=>c.calibration?.active).map(c=><div key={c.id} className="ov-calib-card"><p className="ov-calib-name">{c.id}: {c.name}</p><p className="ov-calib-q">{c.calibration.question.slice(0,80)}…</p><p className="ov-calib-status">{c.calibration.responses.filter(r=>r.decision).length}/{c.calibration.responses.length} responded</p></div>)}</>}</div>
 </div>
 <div className="ov-section" style={{marginTop:4}}><p className="section-label">Priority Cases</p><div className="ov-priority-list">{high.map(c=><button key={c.id} className="ov-priority-card" onClick={()=>onSelect(c.id)}><div className="ov-pc-left"><Score score={c.riskScore}/><div><p className="ov-pc-name">{c.name}</p><p className="ov-pc-type">{c.typology}</p></div></div><div className="ov-pc-right"><p className="ov-pc-summary">{c.summary}</p><span className="ov-pc-arrow">→</span></div></button>)}</div></div>
 </div></div>;
}

function LoginScreen({ onLogin }) {
 const [email, setEmail] = useState("v.ariyarathnam@wealthsimple.com");
 const [pass, setPass] = useState("");
 const [loading, setLoading] = useState(false);
 const doLogin = () => { setLoading(true); setTimeout(() => onLogin(), 1200); };
 return <div className="login-bg">
  <div className="login-card">
   <div className="login-logo"><div className="logo-mark" style={{width:40,height:40}}><span style={{fontSize:20}}>S</span></div><div><span className="logo-text" style={{fontSize:22}}>Sentinel</span><span className="logo-sub" style={{fontSize:13,display:"block",marginLeft:0}}>by Wealthsimple Compliance</span></div></div>
   <div className="login-fields">
    <label className="login-label">Email<input className="login-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="analyst@wealthsimple.com"/></label>
    <label className="login-label">Password<input className="login-input" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&doLogin()}/></label>
    <div className="login-row"><label className="login-check"><input type="checkbox" defaultChecked /> Remember me</label><span className="login-forgot">Forgot password?</span></div>
    <button className={`login-btn ${loading?"login-loading":""}`} onClick={doLogin} disabled={loading}>{loading?"Authenticating...":"Sign in"}</button>
   </div>
   <div className="login-footer">
    <div className="login-sso"><span className="login-divider-text">or continue with</span></div>
    <div className="login-sso-btns"><button className="login-sso-btn" onClick={doLogin}>Okta SSO</button><button className="login-sso-btn" onClick={doLogin}>Microsoft AD</button></div>
    <p className="login-legal">Protected by Wealthsimple Information Security. All sessions are monitored and logged under FINTRAC compliance requirements.</p>
   </div>
  </div>
  <div className="login-env">COMPLIANCE ENVIRONMENT · FINTRAC REGULATED · AML/ATF</div>
 </div>;
}

export default function Sentinel() {
 const [loggedIn, setLoggedIn] = useState(false);
 const [sel, setSel] = useState(null);
 const [showR, setShowR] = useState(false);
 const [role, setRole] = useState("analyst");
 const [showCalib, setShowCalib] = useState(false);
 const c = sel ? CUSTOMERS[sel] : null;
 const intel = sel ? INTEL[sel] : null;

 if (!loggedIn) return <><LoginScreen onLogin={() => setLoggedIn(true)} /><style>{`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap');
  :root{--bg:#FFF;--surface:#F9F9F7;--surface2:#F3F2EF;--border:#ECEAE6;--text:#32302F;--text-secondary:#807D78;--text-tertiary:#A8A5A0;--gold:#D4A843;--gold-bg:#FBF6EA;--gold-dark:#8B7230;--font:'DM Sans',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;}
  *{box-sizing:border-box;margin:0;padding:0;}
  .login-bg{font-family:var(--font);height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(145deg,#F9F9F7 0%,#F3F2EF 50%,#ECEAE6 100%);-webkit-font-smoothing:antialiased;}
  .login-card{background:white;border-radius:20px;padding:40px;width:420px;box-shadow:0 8px 40px rgba(50,48,47,0.08),0 1px 3px rgba(50,48,47,0.06);}
  .login-logo{display:flex;align-items:center;gap:14px;margin-bottom:32px;}
  .logo-mark{width:40px;height:40px;border-radius:10px;background:var(--text);display:grid;place-items:center;}.logo-mark span{color:var(--gold);font-weight:700;}
  .logo-text{font-weight:700;letter-spacing:-0.4px;}.logo-sub{color:var(--text-tertiary);font-weight:400;}
  .login-fields{display:flex;flex-direction:column;gap:16px;}
  .login-label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:600;color:var(--text-secondary);letter-spacing:0.3px;}
  .login-input{padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-family:var(--font);font-size:14px;outline:none;transition:border 0.15s;color:var(--text);}.login-input:focus{border-color:var(--text);}
  .login-row{display:flex;justify-content:space-between;align-items:center;font-size:12px;}
  .login-check{display:flex;align-items:center;gap:6px;color:var(--text-secondary);font-weight:400;cursor:pointer;}.login-check input{accent-color:var(--text);}
  .login-forgot{color:var(--gold-dark);font-weight:500;cursor:pointer;}.login-forgot:hover{text-decoration:underline;}
  .login-btn{padding:14px;border-radius:10px;border:none;background:var(--text);color:white;font:600 14px var(--font);cursor:pointer;transition:all 0.15s;letter-spacing:0.2px;}.login-btn:hover{opacity:0.92;transform:translateY(-1px);}.login-btn:disabled{opacity:0.7;cursor:wait;}
  .login-loading{background:var(--text-secondary);}
  .login-footer{margin-top:24px;text-align:center;}
  .login-sso{position:relative;margin-bottom:16px;}.login-divider-text{font-size:11px;color:var(--text-tertiary);background:white;padding:0 12px;position:relative;z-index:1;}.login-sso::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:var(--border);}
  .login-sso-btns{display:flex;gap:8px;margin-bottom:20px;}
  .login-sso-btn{flex:1;padding:10px;border-radius:8px;border:1px solid var(--border);background:white;font:500 12px var(--font);color:var(--text-secondary);cursor:pointer;transition:all 0.15s;}.login-sso-btn:hover{background:var(--surface);border-color:var(--text-tertiary);}
  .login-legal{font-size:10px;color:var(--text-tertiary);line-height:1.5;}
  .login-env{position:fixed;bottom:20px;font-size:10px;font-weight:700;letter-spacing:2px;color:var(--text-tertiary);opacity:0.5;}
  `}</style></>;

 return (<div className="app">
 <header className="topbar">
 <div className="topbar-left"><button className="logo-btn" onClick={() => setSel(null)}><div className="logo-mark"><span>S</span></div><span className="logo-text">Sentinel</span><span className="logo-sub">Compliance</span></button></div>
 <div className="topbar-right">
 <div className="status-pill"><span className="status-dot" />Bill C-15 monitoring</div>
 {c?.calibration?.active && <button className="calib-trigger" onClick={() => setShowCalib(true)}>📋 Calibration</button>}
 <div className="role-switcher">
 <button className={`role-opt ${role === "analyst" ? "active" : ""}`} onClick={() => setRole("analyst")}>V. Ariyarathnam · Analyst</button>
 <button className={`role-opt ${role === "lead" ? "active" : ""}`} onClick={() => setRole("lead")}>S. Patel · Lead</button>
 </div>
 </div>
 </header>
 <div className="body">
 <Queue cases={Object.values(CUSTOMERS)} sel={sel} onSel={setSel} showR={showR} setShowR={setShowR} />
 <main className="main">{sel ? (<><CaseView c={c} intel={intel} role={role} /><AIPanel c={c} intel={intel} /><DecisionBar c={c} role={role} /></>) : (<Overview cases={CUSTOMERS} onSelect={setSel} />)}</main>
 </div>
 {showCalib && <CalibrationOverlay c={c} onClose={() => setShowCalib(false)} />}
 <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap');:root{--bg:#FFF;--surface:#F9F9F7;--surface2:#F3F2EF;--border:#ECEAE6;--border-subtle:#F3F2EF;--text:#32302F;--text-secondary:#807D78;--text-tertiary:#A8A5A0;--gold:#D4A843;--gold-bg:#FBF6EA;--gold-dark:#8B7230;--risk-high:#C0392B;--risk-high-bg:#FDF2F1;--risk-med:#B7841A;--risk-med-bg:#FDF8EE;--risk-low:#2D8653;--risk-low-bg:#F1F9F4;--eftr:#2C6FAD;--eftr-bg:#EDF4FC;--font:'DM Sans',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;}*{box-sizing:border-box;margin:0;padding:0;}.app{font-family:var(--font);background:var(--bg);color:var(--text);height:100vh;display:flex;flex-direction:column;overflow:hidden;-webkit-font-smoothing:antialiased;}.topbar{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:56px;border-bottom:1px solid var(--border);flex-shrink:0;}.topbar-left{display:flex;align-items:center;gap:10px;}.logo-btn{display:flex;align-items:center;gap:10px;border:none;background:none;cursor:pointer;font-family:var(--font);padding:0;}.logo-btn:hover .logo-mark{opacity:0.85;}.logo-mark{width:30px;height:30px;border-radius:8px;background:var(--text);display:grid;place-items:center;}.logo-mark span{color:var(--gold);font-size:15px;font-weight:700;}.logo-text{font-size:17px;font-weight:700;letter-spacing:-0.4px;}.logo-sub{font-size:12px;color:var(--text-tertiary);font-weight:400;margin-left:-2px;}.topbar-right{display:flex;align-items:center;gap:12px;}.status-pill{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-tertiary);font-weight:500;}.status-dot{width:6px;height:6px;border-radius:50%;background:var(--risk-low);}.role-switcher{display:flex;background:var(--surface);border-radius:20px;padding:2px;border:1px solid var(--border);}.role-opt{padding:5px 14px;border-radius:18px;border:none;background:none;font:600 11px var(--font);color:var(--text-secondary);cursor:pointer;transition:all 0.15s;white-space:nowrap;}.role-opt.active{background:var(--text);color:white;}.calib-trigger{padding:5px 12px;border-radius:8px;border:1px solid var(--gold);background:var(--gold-bg);font:600 11px var(--font);color:var(--gold-dark);cursor:pointer;}.calib-trigger:hover{background:var(--gold);color:white;}.body{display:flex;flex:1;overflow:hidden;}.queue{width:280px;min-width:280px;border-right:1px solid var(--border);display:flex;flex-direction:column;}.queue-header{display:flex;width:100%;justify-content:space-between;align-items:baseline;padding:20px 20px 14px;border:none;background:transparent;cursor:pointer;font-family:var(--font);transition:background 0.12s;}.queue-header:hover{background:var(--surface);}.queue-header-active{background:var(--surface);border-left:3px solid var(--gold)!important;}.queue-title{font-size:13px;font-weight:700;}.queue-count{font-size:11px;color:var(--text-tertiary);}.queue-list{flex:1;overflow-y:auto;}.queue-item{display:block;width:100%;text-align:left;padding:14px 20px 10px;border:none;background:transparent;cursor:pointer;border-bottom:1px solid var(--border-subtle);font-family:var(--font);transition:background 0.12s;border-left:3px solid transparent;}.queue-item:hover{background:var(--surface);}.queue-item.active{background:var(--surface);border-left-color:var(--text);}.queue-item.resolved{padding:10px 20px;opacity:0.75;}.queue-item.resolved.active{opacity:1;border-left-color:var(--risk-low);}.qi-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}.qi-name{font-size:13px;font-weight:600;display:flex;align-items:center;gap:5px;}.qi-bottom{display:flex;align-items:center;gap:8px;}.qi-type{font-size:11px;color:var(--text-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;}.qi-sub{font-size:11px;color:var(--text-tertiary);line-height:1.4;margin-top:2px;}.queue-divider{display:flex;width:100%;align-items:center;gap:8px;padding:10px 20px;border:none;background:var(--surface2);cursor:pointer;font-family:var(--font);font-size:11px;color:var(--risk-low);font-weight:600;}.qd-dot{width:5px;height:5px;border-radius:50%;background:var(--risk-low);}.qd-arrow{margin-left:auto;color:var(--text-tertiary);}.qa-badge{font-size:10px;margin-left:2px;}.qa-pending{color:var(--risk-med);}.qa-approved{color:var(--risk-low);}.qa-calib{font-size:9px;}.sla-row{display:flex;align-items:center;gap:4px;margin-top:4px;}.sla-icon{font-size:10px;}.sla-text{font-size:10px;font-weight:600;}.sla-header{font-size:11px;font-weight:600;margin-top:4px;}.score{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:0.3px;font-family:var(--mono);}.tag{display:inline-block;padding:1px 6px;border-radius:3px;font-size:9px;font-weight:700;letter-spacing:0.8px;}.tag-high{background:var(--risk-high-bg);color:var(--risk-high);}.tag-med{background:var(--risk-med-bg);color:var(--risk-med);}.tag-low{background:var(--risk-low-bg);color:var(--risk-low);}.main{flex:1;display:flex;flex-direction:column;overflow:hidden;}.case-scroll{flex:1;overflow-y:auto;}.case-pad{padding:24px 28px;}.case-empty{display:grid;place-items:center;height:100%;color:var(--text-tertiary);font-size:14px;}.case-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border-subtle);}.case-name{font-size:20px;font-weight:700;letter-spacing:-0.5px;}.case-meta{font-size:12px;color:var(--text-tertiary);margin-top:3px;}.case-resolved-label{font-size:12px;color:var(--risk-low);font-weight:600;margin-top:4px;}.label-sm{font-size:10px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:var(--text-tertiary);margin-bottom:4px;}.export-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--border);background:white;font:600 11px var(--font);color:var(--text-secondary);cursor:pointer;white-space:nowrap;}.export-btn:hover{background:var(--surface);}.export-btn.exported{background:var(--risk-low-bg);color:var(--risk-low);border-color:var(--risk-low);}.network-card{background:var(--risk-high-bg);border-radius:12px;padding:16px;margin-bottom:16px;}.network-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px;}.network-person{display:flex;align-items:center;gap:10px;background:white;border-radius:10px;padding:10px 12px;border:1px solid #F9D5D3;}.np-avatar{width:32px;height:32px;border-radius:50%;background:var(--risk-high);color:white;font-size:11px;font-weight:700;display:grid;place-items:center;flex-shrink:0;opacity:0.85;}.np-name{font-size:12px;font-weight:600;}.np-detail{font-size:10px;color:var(--text-tertiary);}.network-line{grid-column:1/-1;}.summary-card{background:var(--gold-bg);border-radius:12px;padding:16px;margin-bottom:20px;border-left:3px solid var(--gold);}.body-text{font-size:13px;line-height:1.6;}.body-text.muted{color:var(--text-secondary);}.section-label{font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:var(--text-tertiary);margin-bottom:10px;}.resolved-card{display:flex;gap:14px;background:var(--risk-low-bg);border-radius:12px;padding:18px;margin-bottom:16px;align-items:flex-start;}.resolved-icon{font-size:18px;color:var(--risk-low);flex-shrink:0;}.info-card{background:var(--surface);border-radius:12px;padding:16px;}.tx-table-wrap{max-height:180px;overflow-y:auto;border-radius:10px;border:1px solid var(--border);margin-bottom:20px;}.tx-table{width:100%;border-collapse:collapse;font-size:12px;}.tx-table thead{position:sticky;top:0;z-index:1;}.tx-table th{background:var(--surface);padding:8px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--text-tertiary);border-bottom:1px solid var(--border);}.tx-table td{padding:7px 12px;border-bottom:1px solid var(--border-subtle);}.tx-table tr.flagged{background:var(--risk-high-bg);}.mono{font-family:var(--mono);}.dir{font-weight:700;font-size:14px;}.dir.in{color:var(--risk-low);}.dir.out{color:var(--risk-high);}.flags-list{display:flex;flex-direction:column;gap:6px;margin-bottom:20px;}.flag-item{display:flex;gap:8px;font-size:12px;line-height:1.5;padding:8px 12px;background:var(--risk-high-bg);border-radius:8px;color:var(--risk-high);}.flag-icon{flex-shrink:0;}.report-card{background:var(--surface);border-radius:10px;padding:14px 16px;margin-bottom:16px;}.intel-section{margin-bottom:20px;}.intel-tabs{display:flex;gap:0;background:var(--surface2);border-radius:10px 10px 0 0;overflow-x:auto;}.intel-tab{flex:1;min-width:0;padding:10px 8px;border:none;background:none;cursor:pointer;font-family:var(--font);text-align:center;transition:all 0.15s;border-bottom:2px solid transparent;}.intel-tab:hover{background:var(--surface);}.intel-tab.active{background:var(--surface);border-bottom-color:var(--text);}.it-label{display:block;font-size:11px;font-weight:600;}.it-sub{display:block;font-size:9px;color:var(--text-tertiary);margin-top:1px;}.intel-content{background:var(--surface);border-radius:0 0 10px 10px;padding:14px;max-height:280px;overflow-y:auto;}.ipanel-grid{display:flex;flex-direction:column;gap:4px;}.ipanel-divider{height:1px;background:var(--border);margin:10px 0;}.irow{display:flex;gap:8px;font-size:12px;line-height:1.5;padding:2px 0;}.irow-label{min-width:110px;flex-shrink:0;font-size:10px;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;color:var(--text-tertiary);padding-top:1px;}.irow-val{font-weight:400;}.irow-warn{color:var(--risk-high);font-weight:500;}.ipanel-alert{padding:10px 14px;border-radius:8px;font-size:12px;font-weight:500;line-height:1.5;margin-top:10px;}.alert-warn{background:var(--risk-med-bg);color:var(--risk-med);border-left:3px solid var(--risk-med);}.alert-critical{background:var(--risk-high-bg);color:var(--risk-high);border-left:3px solid var(--risk-high);}.chain-intel{border-radius:10px;padding:12px;margin-bottom:8px;border-left:3px solid;}.chain-intel.level-0{background:var(--risk-low-bg);border-color:var(--risk-low);}.chain-intel.level-1{background:var(--surface);border-color:var(--risk-med);}.chain-intel.level-2{background:var(--risk-med-bg);border-color:var(--risk-med);}.chain-intel.level-3{background:var(--risk-high-bg);border-color:var(--risk-high);}.ci-header{display:flex;justify-content:space-between;align-items:center;}.ci-badge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;}.ci-severe{background:var(--risk-high);color:white;}.ci-high{background:var(--risk-high-bg);color:var(--risk-high);}.ci-medium{background:var(--risk-med-bg);color:var(--risk-med);}.ci-low{background:var(--risk-low-bg);color:var(--risk-low);}.elliptic-rule{font-size:11px;color:var(--risk-high);padding:2px 0;font-weight:500;}.ai-panel{border-top:1px solid var(--border);padding:16px 24px;}.ai-buttons{display:flex;gap:8px;margin-bottom:10px;}.ai-btn{flex:1;padding:9px 12px;border-radius:8px;border:1px solid var(--border);background:white;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);}.ai-btn:hover{background:var(--surface);}.ai-btn.active{background:var(--text);color:white;border-color:var(--text);}.ai-btn:disabled{opacity:0.5;cursor:wait;}.ai-response{background:var(--surface);border-radius:10px;padding:16px;max-height:260px;overflow-y:auto;font-size:12px;line-height:1.7;white-space:pre-wrap;}.ai-loading{color:var(--text-tertiary);font-style:italic;}.decision-bar{border-top:2px solid var(--text);padding:14px 24px;background:var(--surface);}.decision-top{display:flex;align-items:center;gap:8px;margin-bottom:10px;}.decision-dot{width:8px;height:8px;border-radius:50%;background:var(--text);}.decision-label{font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;}.decision-buttons{display:flex;gap:8px;}.decision-btn{flex:1;padding:10px;border-radius:8px;border:1px solid var(--border);background:white;font:600 12px var(--font);cursor:pointer;transition:all 0.15s;}.decision-btn:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,0.06);}.decision-btn.str{color:var(--risk-high);}.decision-btn.lvctr{color:var(--risk-med);}.decision-btn.eftr{color:var(--eftr);}.decision-btn.dismiss{color:var(--text-secondary);}.decision-btn.escalate{color:var(--text);}.decision-btn.picked{border-width:2px;}.decision-btn.str.picked{background:var(--risk-high-bg);border-color:var(--risk-high);}.decision-btn.lvctr.picked{background:var(--risk-med-bg);border-color:var(--risk-med);}.decision-btn.eftr.picked{background:var(--eftr-bg);border-color:var(--eftr);}.decision-btn.dismiss.picked{background:var(--surface);border-color:var(--text-secondary);}.decision-btn.escalate.picked{background:var(--surface2);border-color:var(--text);}.decision-confirm{margin-top:10px;padding:10px 14px;background:var(--risk-low-bg);border-radius:8px;font-size:12px;color:var(--risk-low);font-weight:500;}.qa-review-bar{border-top-color:var(--gold);}.qa-info{margin-bottom:10px;}.qa-info-text{font-size:12px;color:var(--text-secondary);}.qa-approve{color:var(--risk-low)!important;}.qa-approve.picked{background:var(--risk-low-bg)!important;border-color:var(--risk-low)!important;}.qa-return{color:var(--risk-med)!important;}.qa-return.picked{background:var(--risk-med-bg)!important;border-color:var(--risk-med)!important;}.qa-override{color:var(--risk-high)!important;}.qa-override.picked{background:var(--risk-high-bg)!important;border-color:var(--risk-high)!important;}.qa-notes{width:100%;margin-top:10px;padding:10px;border:1px solid var(--border);border-radius:8px;font-family:var(--font);font-size:12px;resize:none;outline:none;}.qa-notes:focus{border-color:var(--text-tertiary);}.eftr-type{background:var(--eftr-bg);color:var(--eftr);}.flow-meta strong{font-size:12px;font-weight:700;}.flow-change.up{color:var(--risk-low);}.flow-change.down{color:var(--risk-high);}.flow-flag.hot{color:var(--risk-high);}.ov-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border-subtle);}.ov-title{font-size:22px;font-weight:700;letter-spacing:-0.6px;}.ov-badge-row{display:flex;gap:6px;}.ov-badge{font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;}.ov-badge.critical{background:var(--risk-high-bg);color:var(--risk-high);}.ov-badge.review{background:var(--risk-med-bg);color:var(--risk-med);}.ov-badge.resolved{background:var(--risk-low-bg);color:var(--risk-low);}.ov-metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:24px;}.ov-metric{background:var(--surface);border-radius:12px;padding:16px;text-align:center;}.ov-metric-num{display:block;font-size:26px;font-weight:700;font-family:var(--mono);}.ov-metric-num.ov-green{color:var(--risk-low);}.ov-metric-num.ov-amber{color:var(--risk-med);}.ov-metric-num.ov-red{color:var(--risk-high);}.ov-metric-label{display:block;font-size:10px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:var(--text-tertiary);margin-top:4px;}.ov-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;}.ov-section{background:var(--surface);border-radius:12px;padding:18px 20px;}.ov-typo-list{display:flex;flex-direction:column;gap:12px;margin-top:4px;}.ov-typo-row{display:flex;flex-direction:column;gap:4px;}.ov-typo-info{display:flex;align-items:center;gap:8px;}.ov-typo-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}.dot-high{background:var(--risk-high);}.dot-med{background:var(--risk-med);}.dot-low{background:var(--risk-low);}.ov-typo-name{font-size:12px;font-weight:500;flex:1;}.ov-typo-count{font-size:12px;font-weight:700;font-family:var(--mono);}.ov-typo-bar-track{height:4px;background:var(--border);border-radius:2px;overflow:hidden;}.ov-typo-bar-fill{height:100%;border-radius:2px;}.fill-high{background:var(--risk-high);}.fill-med{background:var(--risk-med);}.fill-low{background:var(--risk-low);}.ov-filings{display:flex;flex-direction:column;gap:10px;margin-top:4px;}.ov-filing{background:white;border-radius:10px;padding:14px;border:1px solid var(--border);}.ov-filing-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;}.ov-filing-type{font-size:11px;font-weight:700;letter-spacing:0.5px;padding:2px 8px;border-radius:4px;}.str-type{background:var(--risk-high-bg);color:var(--risk-high);}.lvctr-type{background:var(--risk-med-bg);color:var(--risk-med);}.travel-type{background:var(--surface2);color:var(--text-secondary);}.ov-filing-count{font-size:18px;font-weight:700;font-family:var(--mono);}.ov-filing-desc{font-size:12px;font-weight:500;}.ov-priority-list{display:flex;flex-direction:column;gap:8px;}.ov-priority-card{display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 18px;border-radius:12px;border:1px solid var(--border);background:white;cursor:pointer;font-family:var(--font);text-align:left;transition:all 0.15s;}.ov-priority-card:hover{background:var(--surface);transform:translateY(-1px);box-shadow:0 2px 12px rgba(50,48,47,0.06);}.ov-pc-left{display:flex;align-items:center;gap:14px;}.ov-pc-name{font-size:14px;font-weight:600;}.ov-pc-type{font-size:11px;color:var(--text-tertiary);margin-top:1px;}.ov-pc-right{display:flex;align-items:center;gap:14px;flex:1;justify-content:flex-end;}.ov-pc-summary{font-size:12px;color:var(--text-secondary);line-height:1.4;max-width:400px;text-align:right;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}.ov-pc-arrow{font-size:16px;color:var(--text-tertiary);}.ov-sla-list{display:flex;flex-direction:column;gap:8px;margin-top:4px;}.ov-sla-row{display:flex;align-items:center;gap:8px;font-size:12px;}.ov-sla-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}.ov-sla-name{font-weight:500;flex:1;}.ov-sla-tier{font-size:10px;color:var(--text-tertiary);}.ov-sla-time{font-weight:600;font-family:var(--mono);font-size:11px;}.ov-qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px;}.ov-qa-stat{background:white;border-radius:8px;padding:12px;text-align:center;border:1px solid var(--border);}.ov-qa-num{display:block;font-size:20px;font-weight:700;font-family:var(--mono);}.ov-qa-label{display:block;font-size:10px;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;color:var(--text-tertiary);margin-top:2px;}.ov-calib-card{background:white;border-radius:8px;padding:10px;margin-top:8px;border:1px solid var(--gold);border-left:3px solid var(--gold);}.ov-calib-name{font-size:12px;font-weight:600;}.ov-calib-status{font-size:10px;color:var(--gold-dark);font-weight:600;margin-top:4px;}.calib-overlay{position:fixed;inset:0;background:rgba(50,48,47,0.5);display:grid;place-items:center;z-index:100;}.calib-modal{background:white;border-radius:16px;width:520px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.2);}.calib-header{display:flex;align-items:center;gap:8px;padding:16px 20px;border-bottom:1px solid var(--border);}.calib-title{font-size:14px;font-weight:700;flex:1;}.calib-close{width:28px;height:28px;border-radius:6px;border:none;background:none;cursor:pointer;font-size:18px;color:var(--text-tertiary);}.calib-close:hover{background:var(--surface);}.calib-body{padding:20px;overflow-y:auto;flex:1;}.calib-question{background:var(--gold-bg);border-radius:10px;padding:14px;margin-bottom:16px;border-left:3px solid var(--gold);}.calib-q-text{font-size:13px;line-height:1.5;margin-top:4px;}.calib-my{margin-bottom:16px;}.calib-options{display:flex;gap:6px;margin-top:6px;}.calib-opt{padding:8px 14px;border-radius:8px;border:1px solid var(--border);background:white;font-family:var(--font);font-size:12px;font-weight:500;cursor:pointer;}.calib-opt:hover{background:var(--surface);}.calib-opt.active{background:var(--text);color:white;border-color:var(--text);}.calib-responses{margin-bottom:12px;}.calib-resp{background:var(--surface);border-radius:8px;padding:10px 12px;margin-top:6px;}.calib-resp.pending{opacity:0.6;}.calib-resp-top{display:flex;justify-content:space-between;font-size:12px}.calib-resp-name{font-weight:600;flex:1;}.calib-resp-status{font-size:11px;color:var(--text-secondary);}.calib-resp-note{font-size:11px;color:var(--text-secondary);margin-top:4px;font-style:italic;}.calib-consensus{background:var(--risk-low-bg);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--risk-low);font-weight:500;}.calib-footer{display:flex;justify-content:flex-end;gap:8px;padding:16px 20px;border-top:1px solid var(--border);}.calib-btn-close{padding:8px 16px;border-radius:8px;border:1px solid var(--border);background:white;font:600 12px var(--font);cursor:pointer;}.calib-btn-close:hover{background:var(--surface);}.calib-btn-apply{padding:8px 16px;border-radius:8px;border:none;background:var(--text);color:white;font:600 12px var(--font);cursor:pointer;}.calib-btn-apply:hover{opacity:0.9;}.calib-btn-apply:disabled{opacity:0.4;}.delta-section{border-radius:12px;padding:16px;margin-bottom:20px;border-left:3px solid;}.delta-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;}.delta-icon{font-size:14px;}.delta-title{font-size:12px;font-weight:700;letter-spacing:0.3px;text-transform:uppercase;flex:1;}.delta-period{font-size:10px;color:var(--text-tertiary);}.delta-grid{display:flex;flex-direction:column;gap:6px;margin-bottom:12px;}.delta-row{display:flex;align-items:center;gap:8px;font-size:12px;padding:4px 8px;background:rgba(255,255,255,0.6);border-radius:6px;}.delta-label{width:110px;flex-shrink:0;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;color:var(--text-tertiary);}.delta-baseline{color:var(--text-secondary);min-width:80px;}.delta-arrow{color:var(--text-tertiary);font-size:10px;}.delta-current{font-weight:600;min-width:80px;}.delta-change{margin-left:auto;font-size:10px;font-weight:700;white-space:nowrap;}.delta-critical{color:var(--risk-high);}.delta-warning{color:var(--risk-med);}.delta-info{color:var(--text-secondary);}.delta-trajectory{margin-bottom:10px;}.delta-traj-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;color:var(--text-tertiary);display:block;margin-bottom:8px;}.delta-traj-bar{display:flex;align-items:flex-start;gap:0;position:relative;}.delta-traj-bar::before{content:'';position:absolute;top:5px;left:5px;right:5px;height:2px;background:var(--border);z-index:0;}.delta-traj-point{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;position:relative;z-index:1;}.delta-dot{width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px var(--border);}.delta-dot-label{font-size:9px;color:var(--text-tertiary);}.delta-dot-level{font-size:9px;font-weight:700;}.delta-footer{display:flex;gap:16px;margin-bottom:6px;font-size:11px;color:var(--text-secondary);}.delta-footer strong{color:var(--text);}.delta-explain{font-size:11px;line-height:1.5;color:var(--text-secondary);margin-top:4px;}.alog-section{margin-top:20px;border-top:1px solid var(--border);padding-top:16px;}.alog-toggle{display:flex;width:100%;align-items:center;gap:8px;padding:8px 0;border:none;background:none;cursor:pointer;font-family:var(--font);}.alog-title{font-size:12px;font-weight:700;letter-spacing:0.3px;}.alog-count{font-size:10px;color:var(--text-tertiary);flex:1;text-align:left;margin-left:4px;}.alog-list{display:flex;flex-direction:column;gap:0;margin-top:8px;}.alog-date-sep{font-size:10px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.5px;text-transform:uppercase;padding:8px 0 4px;border-bottom:1px solid var(--border-subtle);margin-bottom:4px;}.alog-entry{display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-left:2px solid var(--border-subtle);padding-left:12px;margin-left:4px;}.alog-entry.alog-alert{border-left-color:var(--risk-med);}.alog-entry.alog-decision{border-left-color:var(--risk-high);}.alog-entry.alog-qa{border-left-color:var(--risk-low);}.alog-entry.alog-risk{border-left-color:var(--risk-high);}.alog-entry.alog-account{border-left-color:var(--text-tertiary);}.alog-time{font-size:10px;font-family:var(--mono);color:var(--text-tertiary);min-width:40px;flex-shrink:0;padding-top:1px;}.alog-icon{font-size:12px;flex-shrink:0;}.alog-content{display:flex;flex-direction:column;gap:1px;}.alog-action{font-size:12px;line-height:1.4;}.alog-detail{font-size:10px;color:var(--text-secondary);}.ov-act-row:hover{background:var(--surface2);}.ov-act-case:hover{background:var(--border);color:var(--text);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}button{font-family:var(--font);}`}</style>
 </div>);
}
