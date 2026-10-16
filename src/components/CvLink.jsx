import { CV } from "../siteConfig";
import { useAssetExists } from "../hooks";
import Roll from "./Roll";

// Discreet download link. Renders nothing until the PDF actually exists, so it can never be broken.
export default function CvLink({ className = "" }) {
  const available = useAssetExists(CV.href, "pdf");
  if (!available) return null;
  return (
    <a className={`cv-link ${className}`} href={CV.href} download={CV.filename}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />
      </svg>
      <Roll>Download CV</Roll>
    </a>
  );
}
