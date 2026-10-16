import { TLink } from "../components/TLink";

export default function NotFound() {
  return (
    <div className="container page">
      <p className="eyebrow eyebrow--blue">404</p>
      <h1>Page not found.</h1>
      <p className="page__lead">The page you’re looking for doesn’t exist or has moved.</p>
      <TLink to="/" className="link-arrow">← Back to home</TLink>
    </div>
  );
}
