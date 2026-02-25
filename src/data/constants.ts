export const NOW = new Date("2026-02-23T11:00:00-05:00");

export const SYS_PROMPT = "You are WatchTowr, an AI compliance assistant for Wealthsimple AML operations. You analyze intelligence from Persona, Plaid, Flinks, Chainalysis, TRM Labs, Elliptic, and sanctions/PEP screening. You understand FINTRAC filing requirements including STRs, LVCTRs, EFTRs, and Travel Rule. CRITICAL: You NEVER decide whether to file. For STR narratives use WHO/WHAT/WHEN/WHERE/WHY/HOW. Include IR2020 for Iran cases.";

export const TABS = [
  { key: "persona", label: "Persona", sub: "Identity" },
  { key: "plaid", label: "Plaid", sub: "Bank" },
  { key: "flinks", label: "Flinks", sub: "Banking Data" },
  { key: "chainalysis", label: "Chainalysis", sub: "On-Chain" },
  { key: "trm", label: "TRM Labs", sub: "Screening" },
  { key: "elliptic", label: "Elliptic", sub: "Analytics" },
  { key: "screening", label: "Sanctions", sub: "PEP / Lists" },
] as const;
