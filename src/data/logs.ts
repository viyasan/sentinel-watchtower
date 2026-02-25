import type { LogsMap } from '../types/index.js';

export const LOGS: LogsMap = {
  H1: [
    {time:"09:00",date:"Feb 23",type:"alert",icon:"\uD83D\uDD14",actor:"System",action:"Alert generated",detail:"Risk: 87 \u00B7 Structuring \u00B7 SLA: 4h"},
    {time:"09:05",date:"Feb 23",type:"view",icon:"\uD83D\uDC41",actor:"V. Ariyarathnam",action:"Opened case \u00B7 reviewed intel"},
    {time:"09:30",date:"Feb 23",type:"calibration",icon:"\uD83D\uDCCB",actor:"S. Patel",action:"Calibration session started",detail:"STR vs LVCTR-only decision"},
    {time:"14:22",date:"Jan 28",type:"risk",icon:"\u26A0\uFE0F",actor:"System",action:"Risk score: 42 \u2192 87",detail:"Structuring pattern detected across 8 transactions"},
    {time:"10:15",date:"Jun 15, 2025",type:"account",icon:"\uD83C\uDD95",actor:"System",action:"Account opened \u00B7 KYC verified",detail:"Initial risk: 18 (Low)"}
  ],
  H2: [
    {time:"09:15",date:"Feb 23",type:"alert",icon:"\uD83D\uDD14",actor:"System",action:"Alert generated",detail:"Risk: 92 \u00B7 Sanctions\u2013Iran \u00B7 SLA: 4h"},
    {time:"09:17",date:"Feb 23",type:"view",icon:"\uD83D\uDC41",actor:"V. Ariyarathnam",action:"Opened case \u00B7 reviewed all intel"},
    {time:"09:40",date:"Feb 23",type:"ai",icon:"\uD83E\uDD16",actor:"V. Ariyarathnam",action:"Ran AI: Draft STR Narrative"},
    {time:"09:47",date:"Feb 23",type:"decision",icon:"\uD83D\uDCCB",actor:"V. Ariyarathnam",action:"Filed STR (IR2020 Directive)",detail:"Sent to QA queue"},
    {time:"09:52",date:"Feb 23",type:"qa",icon:"\u2705",actor:"S. Patel (Lead)",action:"QA approved STR",detail:"Clear Iran nexus. STR appropriate."},
    {time:"09:53",date:"Feb 23",type:"export",icon:"\uD83D\uDCE6",actor:"V. Ariyarathnam",action:"Exported case file"},
    {time:"14:22",date:"Feb 16",type:"risk",icon:"\u26A0\uFE0F",actor:"System",action:"Risk score: 12 \u2192 92",detail:"Chainalysis cluster reclassification LOW\u2192SEVERE"},
    {time:"10:30",date:"Feb 8, 2024",type:"account",icon:"\uD83C\uDD95",actor:"System",action:"Account opened \u00B7 KYC verified",detail:"Initial risk: 12 (Low)"}
  ],
  H3: [
    {time:"09:30",date:"Feb 23",type:"alert",icon:"\uD83D\uDD14",actor:"System",action:"Correlated alert \u2014 3 accounts",detail:"Risk: 95 \u00B7 Mule Network \u00B7 SLA: 4h"},
    {time:"09:35",date:"Feb 23",type:"view",icon:"\uD83D\uDC41",actor:"V. Ariyarathnam",action:"Opened case"},
    {time:"09:45",date:"Feb 23",type:"ai",icon:"\uD83E\uDD16",actor:"V. Ariyarathnam",action:"Ran AI: Draft STR Narrative"},
    {time:"09:50",date:"Feb 23",type:"decision",icon:"\uD83D\uDCCB",actor:"V. Ariyarathnam",action:"Filed consolidated STR",detail:"Mule network / proceeds of fraud. Sent to QA."},
    {time:"11:00",date:"Feb 3",type:"risk",icon:"\u26A0\uFE0F",actor:"System",action:"Pattern correlation detected",detail:"3 accounts linked to same source wallet cluster"},
    {time:"14:00",date:"Nov 8, 2025",type:"account",icon:"\uD83C\uDD95",actor:"System",action:"Sarah Park account opened",detail:"Initial risk: 8 (Low)"}
  ],
  M1: [
    {time:"09:00",date:"Feb 23",type:"alert",icon:"\uD83D\uDD14",actor:"System",action:"Alert generated",detail:"Risk: 35 \u00B7 LVCTR \u00B7 SLA: 24h"},
    {time:"09:10",date:"Feb 23",type:"view",icon:"\uD83D\uDC41",actor:"V. Ariyarathnam",action:"Opened case"},
    {time:"09:12",date:"Feb 23",type:"decision",icon:"\uD83D\uDCCB",actor:"V. Ariyarathnam",action:"Filed LVCTR",detail:"Clean profile. Routine large transaction."},
    {time:"09:15",date:"Feb 23",type:"qa",icon:"\u2705",actor:"S. Patel (Lead)",action:"QA approved LVCTR"},
    {time:"15:00",date:"Sep 5, 2023",type:"account",icon:"\uD83C\uDD95",actor:"System",action:"Account opened \u00B7 KYC verified",detail:"Initial risk: 10 (Low)"}
  ],
  M2: [
    {time:"09:00",date:"Feb 23",type:"alert",icon:"\uD83D\uDD14",actor:"System",action:"Alert generated",detail:"Risk: 48 \u00B7 Behavioral Change \u00B7 SLA: 24h"},
    {time:"09:42",date:"Feb 23",type:"view",icon:"\uD83D\uDC41",actor:"V. Ariyarathnam",action:"Opened case"},
    {time:"09:48",date:"Feb 23",type:"ai",icon:"\uD83E\uDD16",actor:"V. Ariyarathnam",action:"Ran AI: Investigation Summary"},
    {time:"10:30",date:"Feb 9",type:"risk",icon:"\u26A0\uFE0F",actor:"System",action:"Behavioral anomaly detected",detail:"18-month DCA pattern broken. Full liquidation."},
    {time:"11:00",date:"Aug 14, 2024",type:"account",icon:"\uD83C\uDD95",actor:"System",action:"Account opened \u00B7 KYC verified",detail:"Initial risk: 12 (Low)"}
  ],
  M3: [
    {time:"09:00",date:"Feb 23",type:"alert",icon:"\uD83D\uDD14",actor:"System",action:"Alert generated",detail:"Risk: 42 \u00B7 Travel Rule \u00B7 SLA: 24h"},
    {time:"10:05",date:"Feb 23",type:"view",icon:"\uD83D\uDC41",actor:"V. Ariyarathnam",action:"Opened case"},
    {time:"09:00",date:"Feb 16",type:"risk",icon:"\u26A0\uFE0F",actor:"System",action:"Travel Rule hold \u2014 EFTR required",detail:"International EFT > $10K"},
    {time:"14:00",date:"Mar 22, 2024",type:"account",icon:"\uD83C\uDD95",actor:"System",action:"Account opened \u00B7 KYC verified",detail:"Initial risk: 15 (Low)"}
  ]
};
