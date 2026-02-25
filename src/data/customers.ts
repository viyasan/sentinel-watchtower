import type { CustomersMap } from '../types/index.js';

export const CUSTOMERS: CustomersMap = {
  H1: { id: "H1", tier: "high", name: "Marcus Chen", age: 28, location: "Vancouver, BC", occupation: "Import/Export", accountOpened: "Jun 2025", riskScore: 87, typology: "Structuring", typologyTag: "STRUCT",
    summary: "Repeated CADD purchases structured below $10,000 LVCTR threshold with transfers to high-risk unhosted wallets. 30-day volume: $116,300.",
    slaAssigned: "2026-02-23T09:00:00-05:00", slaTier: "4h", qaStatus: null,
    calibration: { active: true, question: "Does the sub-$10K structuring pattern warrant STR given 62% indirect exposure to unlicensed exchange? Or LVCTR-only given no direct illicit exposure?", responses: [
      { analyst: "S. Patel", role: "Team Lead", decision: "File STR", confidence: "High", note: "62% unlicensed + sub-threshold = textbook structuring" },
      { analyst: "R. Nguyen", role: "Senior Analyst", decision: "File STR", confidence: "Medium", note: "Agree on STR, but indirect-only makes confidence moderate" },
      { analyst: "M. Abdullah", role: "Analyst", decision: null, confidence: null, note: null }
    ]},
    transactions: [
      { date: "Feb 1", type: "Buy CADD", amount: 9800, dir: "in", flag: false },{ date: "Feb 3", type: "Buy CADD", amount: 9500, dir: "in", flag: false },{ date: "Feb 5", type: "Transfer", amount: 9700, dir: "out", flag: true },{ date: "Feb 7-12", type: "Buy+Transfer \u00D74", amount: 38750, dir: "in", flag: true },{ date: "Feb 13", type: "Transfer", amount: 19200, dir: "out", flag: true },{ date: "Feb 15", type: "Buy CADD", amount: 9750, dir: "in", flag: false },{ date: "Feb 17", type: "Transfer", amount: 9700, dir: "out", flag: true },{ date: "Feb 19", type: "Buy CADD", amount: 9600, dir: "in", flag: false },{ date: "Feb 21", type: "Transfer", amount: 9550, dir: "out", flag: true }
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
      confidence:"High", exp:"Immediate structuring below $10K threshold. Volume 2.3\u00D7 stated income."
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
        {label:"Monthly Volume",baseline:"$1,200/mo",current:"$20,500 (9 days)",change:"17.1\u00D7",dir:"up",sev:"critical"},
        {label:"Tx Frequency",baseline:"1/month",current:"4 in 9 days",change:"4\u00D7",dir:"up",sev:"warning"},
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
      { date: "Feb 3", type: "Receive CADD \u00D73", amount: 13500, dir: "in", flag: true },{ date: "Feb 4", type: "Sell to CAD \u00D73", amount: 13500, dir: "out", flag: true },{ date: "Feb 10", type: "Receive CADD \u00D73", amount: 15300, dir: "in", flag: true },{ date: "Feb 11", type: "Sell to CAD \u00D73", amount: 15300, dir: "out", flag: true }
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
        {label:"Monthly Volume",baseline:"$5K\u2013$10K/quarter",current:"$85,000 (single tx)",change:"8.5\u00D7",dir:"up",sev:"warning"},
        {label:"Destination",baseline:"Hold on platform",current:"Coinbase Custody",change:"New but verified",dir:"new",sev:"info"},
        {label:"Income Ratio",baseline:"Consistent",current:"$85K vs $38K/mo",change:"2.2\u00D7 monthly",dir:"up",sev:"info"}
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
        {label:"Monthly Volume",baseline:"$1,000 avg",current:"$23,000 (1 day)",change:"23\u00D7",dir:"up",sev:"warning"},
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
        {label:"Monthly Volume",baseline:"$2K\u2013$4K",current:"$15,000 (single inbound)",change:"3.8\u00D7",dir:"up",sev:"info"},
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
