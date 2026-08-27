interface JsonLdProps {
  /** One schema.org object, or several to emit as a single block. */
  data: object | object[];
}

/**
 * Renders structured data for search engines. Everything passed in is authored
 * in `src/lib/seo.ts` — no user input reaches it — but `<` is still escaped so a
 * stray value can never close the script tag early.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
