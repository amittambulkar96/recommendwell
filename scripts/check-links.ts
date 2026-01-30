import fs from "fs";
import path from "path";

const appDir = path.join(process.cwd(), "app");
const exts = new Set([".ts", ".tsx"]);

type RoutePattern = {
  pattern: RegExp;
  display: string;
};

function normalizeSegment(segment: string): string {
  if (segment.startsWith("(") && segment.endsWith(")")) {
    return "";
  }
  if (segment.startsWith("[...") && segment.endsWith("]")) {
    return "(.+)";
  }
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return "([^/]+)";
  }
  return segment;
}

function buildRoutePatterns(): RoutePattern[] {
  const patterns: RoutePattern[] = [];

  function walk(currentDir: string, segments: string[] = []) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, [...segments, entry.name]);
      } else if (entry.isFile() && entry.name === "page.tsx") {
        const pathSegments = segments
          .map(normalizeSegment)
          .filter((segment) => segment.length > 0);
        const routePath = `/${pathSegments.join("/")}`.replace(/\/$/, "");
        const display = routePath === "" ? "/" : routePath;
        const pattern = new RegExp(`^${display.replace(/\//g, "\\/")}$`);

        const dynamicPattern = new RegExp(
          `^${display.replace(/\//g, "\\/")
            .replace(/\(\.\+\)/g, ".+")
            .replace(/\(\[\^\/\]\+\)/g, "[^/]+")}$`
        );

        const finalPattern = display.includes("(") ? dynamicPattern : pattern;
        patterns.push({ pattern: finalPattern, display });
      }
    }
  }

  walk(appDir);

  return patterns.map(({ display }) => {
    const regex = display
      .replace(/\//g, "\\/")
      .replace(/\(\.\+\)/g, ".+")
      .replace(/\(\[\^\/\]\+\)/g, "[^/]+");
    return {
      pattern: new RegExp(`^${regex}$`),
      display,
    };
  });
}

function collectFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else if (entry.isFile() && exts.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function isInternalLink(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("http")) return false;
  if (href.startsWith("mailto:")) return false;
  if (href.startsWith("tel:")) return false;
  if (href.startsWith("#")) return false;
  return href.startsWith("/");
}

function normalizeHref(href: string): string {
  return href.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
}

function linkMatchesRoute(href: string, routes: RoutePattern[]): boolean {
  const normalized = normalizeHref(href);
  return routes.some((route) => route.pattern.test(normalized));
}

const routePatterns = buildRoutePatterns();
const filesToScan = collectFiles(path.join(process.cwd(), "app")).concat(
  collectFiles(path.join(process.cwd(), "components"))
);

const missingLinks: Array<{ file: string; href: string }> = [];

for (const file of filesToScan) {
  const content = fs.readFileSync(file, "utf8");
  const matches = content.matchAll(/href=\{?["']([^"']+)["']\}?/g);
  for (const match of matches) {
    const href = match[1];
    if (!isInternalLink(href)) continue;
    if (!linkMatchesRoute(href, routePatterns)) {
      missingLinks.push({ file, href });
    }
  }
}

if (missingLinks.length > 0) {
  console.error("Missing internal routes:");
  for (const link of missingLinks) {
    console.error(`- ${link.href} (in ${path.relative(process.cwd(), link.file)})`);
  }
  process.exit(1);
}

console.log("Link check passed.");
