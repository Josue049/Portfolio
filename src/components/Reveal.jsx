import { useEffect, useRef, useState } from "react";

export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (seen || !node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(node);
    return () => io.disconnect();
  }, [seen]);

  return <Tag ref={ref} className={`reveal${seen ? " is-in" : ""} ${className}`} {...rest}>{children}</Tag>;
}
