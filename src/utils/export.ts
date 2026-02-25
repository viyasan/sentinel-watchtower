import type { Customer, CaseIntel } from '../types/index.js';

export function exportCaseFile(c: Customer, _intel: CaseIntel | undefined): void {
  let t = "WATCHTOWR CASE FILE\n" + "=".repeat(50) + "\n" + c.id + " | " + c.name + " | Risk: " + c.riskScore + " | " + ('typology' in c ? c.typology : 'Auto-resolved') + "\n";
  if ('transactions' in c && c.transactions) {
    c.transactions.forEach(tx => {
      t += tx.date + " " + tx.type + " $" + tx.amount.toLocaleString() + (tx.flag ? " FLAG" : "") + "\n";
    });
  }
  if ('flags' in c && c.flags) {
    t += "\nINDICATORS:\n";
    c.flags.forEach(f => { t += "* " + f + "\n"; });
  }
  if ('report' in c) {
    t += "\nFILING: " + c.report + "\n";
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([t]));
  a.download = "WatchTowr-" + c.id + ".txt";
  a.click();
}
