import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";

// Build-time only (see scripts/postbuild.mjs): static HTML of a route for crawlers that don't run JS.
export async function render(url) {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  return new Response(prelude).text();
}
