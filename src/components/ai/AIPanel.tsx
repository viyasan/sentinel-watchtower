import { useState, useEffect, useRef } from 'react';
import type { Customer, CaseIntel, AIAction } from '../../types/index.js';
import { streamMockResponse } from '../../utils/ai.js';

interface AIPanelProps {
  c: Customer;
  intel: CaseIntel | undefined;
}

export function AIPanel({ c }: AIPanelProps) {
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState("");
  const [active, setActive] = useState<AIAction | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setResp(""); setActive(null); }, [c?.id]);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [resp]);

  if (!c || c.tier === "low") return null;

  const run = async (action: AIAction) => {
    setLoading(true);
    setActive(action);
    setResp("");
    await streamMockResponse(c.id, action, (text) => setResp(text));
    setLoading(false);
  };

  const buttons: [AIAction, string][] = [
    ["summary", "Investigation Summary"],
    ["str", "Draft STR Narrative"],
    ["typology", "FINTRAC Typology"],
  ];

  return (
    <div className="ai-panel">
      <p className="section-label" style={{ padding: "0 0 8px" }}>AI Investigation Assistant</p>
      <div className="ai-buttons">
        {buttons.map(([k, l]) => (
          <button
            key={k}
            className={`ai-btn ${active === k ? "active" : ""}`}
            onClick={() => run(k)}
            disabled={loading}
          >
            {loading && active === k ? "Analyzing\u2026" : l}
          </button>
        ))}
      </div>
      {(resp || loading) && (
        <div ref={ref} className="ai-response">
          {loading && !resp && <span className="ai-loading">Synthesizing intelligence from all 7 systems\u2026</span>}
          {resp}
        </div>
      )}
    </div>
  );
}
