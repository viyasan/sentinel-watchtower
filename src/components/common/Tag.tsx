const TAG_LEVELS: Record<string, string> = {
  STRUCT: "high",
  SANCT: "high",
  NETWORK: "high",
  LVCTR: "med",
  BEHAV: "med",
  TRAVEL: "med",
  AUTO: "low",
};

interface TagProps {
  tag: string;
}

export function Tag({ tag }: TagProps) {
  const level = TAG_LEVELS[tag] || "low";
  return <span className={`tag tag-${level}`}>{tag}</span>;
}
