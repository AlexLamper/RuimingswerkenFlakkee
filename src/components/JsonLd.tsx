// Rendert structured data (JSON-LD) in een script-tag. Schema.org-data helpt
// Google de inhoud te begrijpen en kan rich results opleveren.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify levert veilige output; geen user input betrokken.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
