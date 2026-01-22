import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InfoSectionItem = { title: string; content: string };

function getRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function parseExampleInfo(input: string | null | undefined): {
  coreComponents: InfoSectionItem[];
  customizationTips: InfoSectionItem[];
} | null {
  if (!input) return null;

  try {
    const parsed: unknown = JSON.parse(input);

    const candidate =
      Array.isArray(parsed) ? parsed[0] : getRecord(parsed)?.exampleInfo ?? parsed;

    const normalized = Array.isArray(candidate) ? candidate[0] : candidate;
    const normalizedRecord = getRecord(normalized);
    if (!normalizedRecord) return null;

    const coreComponents = normalizedRecord.coreComponents;
    const customizationTips = normalizedRecord.customizationTips;

    return {
      coreComponents: Array.isArray(coreComponents) ? coreComponents : [],
      customizationTips: Array.isArray(customizationTips) ? customizationTips : [],
    };
  } catch {
    return null;
  }
}

export function ExampleIntroduction({
  exampleName,
  exampleInfo,
}: {
  exampleName: string;
  exampleInfo: string;
}) {
  const info = parseExampleInfo(exampleInfo);
  if (!info) return null;

  const hasAny =
    info.coreComponents.length > 0 || info.customizationTips.length > 0;
  if (!hasAny) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-base">About this example: {exampleName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        {info.coreComponents.length > 0 && (
          <section>
            <h3 className="font-semibold mb-2">Core components</h3>
            <ul className="space-y-2">
              {info.coreComponents.map((item, idx) => (
                <li key={idx}>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground">{item.content}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {info.customizationTips.length > 0 && (
          <section>
            <h3 className="font-semibold mb-2">Customization tips</h3>
            <ul className="space-y-2">
              {info.customizationTips.map((item, idx) => (
                <li key={idx}>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground">{item.content}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </CardContent>
    </Card>
  );
}

