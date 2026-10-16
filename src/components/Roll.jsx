// Text that "rolls" on hover of its parent link (CSS only, see .roll in site.css).
export default function Roll({ children }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}
