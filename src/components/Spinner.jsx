export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="spinner" role="status" aria-live="polite" aria-label={label}>
      <div className="dot" /><div className="dot" /><div className="dot" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
