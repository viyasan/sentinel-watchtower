interface IRProps {
  label: string;
  value: string | number | undefined;
  warn?: boolean;
}

export function IR({ label, value, warn }: IRProps) {
  return (
    <div className="irow">
      <span className="irow-label">{label}</span>
      <span className={`irow-val${warn ? " irow-warn" : ""}`}>{value}</span>
    </div>
  );
}
