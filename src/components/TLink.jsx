import { flushSync } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { prefersReducedMotion } from "../hooks";

// Wraps navigation in the View Transitions API when available; otherwise the
// router navigates normally. `vtName` morphs the project cover into the next page.
function useTransitionClick(to, vtName, onClick) {
  const navigate = useNavigate();
  return (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!document.startViewTransition || prefersReducedMotion()) return;
    e.preventDefault();
    if (vtName) {
      const cover = e.currentTarget.querySelector(".cover");
      if (cover) cover.style.viewTransitionName = vtName;
    }
    document.startViewTransition(() => flushSync(() => navigate(to)));
  };
}

export function TLink({ to, vtName, onClick, ...rest }) {
  const handle = useTransitionClick(to, vtName, onClick);
  return <Link to={to} onClick={handle} {...rest} />;
}

export function TNavLink({ to, onClick, ...rest }) {
  const handle = useTransitionClick(to, null, onClick);
  return <NavLink to={to} onClick={handle} {...rest} />;
}
