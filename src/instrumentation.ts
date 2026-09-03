// Vangt server-side render/route-fouten voordat Next de melding in productie
// wegstript. De volledige message + stack belanden zo in de Vercel-logs.
// TIJDELIJK voor het debuggen van de /planning-crash.
export function onRequestError(
  error: unknown,
  request: {
    path?: string;
    method?: string;
    headers?: Record<string, string | string[] | undefined>;
  },
  context: unknown
) {
  const e = error as {
    message?: string;
    stack?: string;
    digest?: string;
    name?: string;
    cause?: unknown;
  };
  console.error("[onRequestError]", {
    path: request?.path,
    method: request?.method,
    name: e?.name,
    message: e?.message,
    digest: e?.digest,
    cause:
      e?.cause instanceof Error
        ? `${e.cause.name}: ${e.cause.message}`
        : e?.cause,
    stack: e?.stack,
    context,
  });
}
