export default function Loader({ size = 18 }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block animate-spin rounded-full border-2 border-accent/30 border-t-accent"
      style={{ width: size, height: size }}
    />
  );
}
