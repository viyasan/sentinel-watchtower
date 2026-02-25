import { riskColor, riskBg } from '../../utils/risk.js';

interface ScoreProps {
  score: number;
  small?: boolean;
}

export function Score({ score, small }: ScoreProps) {
  return (
    <span
      className="score"
      style={{
        background: riskBg(score),
        color: riskColor(score),
        fontSize: small ? 10 : 11,
        padding: small ? "1px 6px" : "2px 8px",
      }}
    >
      {score}
    </span>
  );
}
