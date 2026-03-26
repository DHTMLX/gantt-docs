#!/usr/bin/env node

/**
 * Export Docusaurus docs into a single text file for ChatGPT Project Sources.
 *
 * Output format:
 *
 * # Documentation structure
 * - Category
 *   - doc/id
 *
 * # Pages
 *
 * docs/path/to/file.md
 *
 * <content>
 *
 * Usage:
 *   node scripts/export-knowledge.cjs
 *   node scripts/export-knowledge.cjs --exclude-api
 *   node scripts/export-knowledge.cjs --include-unlisted
 *   node scripts/export-knowledge.cjs --out ./tmp/gantt-guides.txt
 *   node scripts/export-knowledge.cjs --keep-frontmatter
 *
 * Recommended:
 *   node scripts/export-knowledge.cjs --exclude-api --out ./tmp/gantt-guides.txt
 *   node scripts/export-knowledge.cjs --api-only --out ./tmp/gantt-api.txt
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = {
    root: process.cwd(),
    sidebar: "docs",
    docsDir: "docs",
    out: "chatgpt-knowledge.txt",
    excludeApi: false,
    apiOnly: false,
    includeUnlisted: false,
    keepFrontmatter: false,
    keepMdxImports: false,
    keepHtmlComments: false,
    verbose: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--root") {
      args.root = path.resolve(argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg === "--sidebar") {
      args.sidebar = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--docs-dir") {
      args.docsDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--out") {
      args.out = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--exclude-api") {
      args.excludeApi = true;
      continue;
    }

    if (arg === "--api-only") {
      args.apiOnly = true;
      continue;
    }

    if (arg === "--include-unlisted") {
      args.includeUnlisted = true;
      continue;
    }

    if (arg === "--keep-frontmatter") {
      args.keepFrontmatter = true;
      continue;
    }

    if (arg === "--keep-mdx-imports") {
      args.keepMdxImports = true;
      continue;
    }

    if (arg === "--keep-html-comments") {
      args.keepHtmlComments = true;
      continue;
    }

    if (arg === "--verbose") {
      args.verbose = true;
      continue;
    }
  }

  if (args.excludeApi && args.apiOnly) {
    throw new Error("Use either --exclude-api or --api-only, not both.");
  }

  return args;
}

function normalizeSlashes(value) {
  return value.replace(/\\/g, "/");
}

function walkFiles(directoryPath) {
  const results = [];
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkFiles(absolutePath));
      continue;
    }

    if (entry.isFile()) {
      results.push(absolutePath);
    }
  }

  return results;
}

function buildDocIndex(docsRoot) {
  const files = walkFiles(docsRoot).filter((absolutePath) => {
    return absolutePath.endsWith(".md") || absolutePath.endsWith(".mdx");
  });

  const docIndex = new Map();

  for (const absolutePath of files) {
    const relativePath = normalizeSlashes(path.relative(docsRoot, absolutePath));
    const withoutExtension = relativePath.replace(/\.(md|mdx)$/i, "");

    docIndex.set(withoutExtension, absolutePath);

    // Optional convenience alias:
    // docs/foo/index.md => doc id "foo"
    if (withoutExtension.endsWith("/index")) {
      const alias = withoutExtension.slice(0, -"/index".length);
      if (alias) {
        docIndex.set(alias, absolutePath);
      }
    }
  }

  return docIndex;
}

function isApiDoc(docId, absolutePath, docsRoot) {
  if (docId === "api" || docId.startsWith("api/")) {
    return true;
  }

  const relativePath = normalizeSlashes(path.relative(docsRoot, absolutePath));
  if (relativePath === "api" || relativePath.startsWith("api/")) {
    return true;
  }

  return false;
}

function resolveSidebar(sidebarsPath, sidebarName) {
  const sidebars = require(sidebarsPath);

  if (!sidebars[sidebarName]) {
    const available = Object.keys(sidebars).join(", ");
    throw new Error(
      `Sidebar "${sidebarName}" not found in ${sidebarsPath}. Available sidebars: ${available}`
    );
  }

  return sidebars[sidebarName];
}

function stripFrontmatter(sourceText) {
  if (!sourceText.startsWith("---")) {
    return sourceText;
  }

  const frontmatterMatch = sourceText.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!frontmatterMatch) {
    return sourceText;
  }

  return sourceText.slice(frontmatterMatch[0].length);
}

function cleanMdx(sourceText, options) {
  let text = sourceText.replace(/^\uFEFF/, "");

  if (!options.keepFrontmatter) {
    text = stripFrontmatter(text);
  }

  if (!options.keepMdxImports) {
    text = text.replace(/^\s*import\s+[^\n]+$/gm, "");
    text = text.replace(/^\s*export\s+[^\n]+$/gm, "");
  }

  if (!options.keepHtmlComments) {
    text = text.replace(/<!--[\s\S]*?-->/g, "");
  }

  // Normalize excessive empty lines.
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

function extractTitleFromFrontmatter(sourceText) {
  const frontmatterMatch = sourceText.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/^\s*title:\s*(.+)\s*$/m);
  if (!titleMatch) {
    return null;
  }

  return titleMatch[1].replace(/^["']|["']$/g, "").trim();
}

function collectFromSidebar(items, context) {
  for (const item of items) {
    collectSidebarItem(item, context, 0);
  }
}

function collectSidebarItem(item, context, depth) {
  if (typeof item === "string") {
    addDocItem(item, context, depth);
    return;
  }

  if (!item || typeof item !== "object") {
    return;
  }

  if (item.type === "doc") {
    addDocItem(item.id, context, depth, item.label);
    return;
  }

  if (item.type === "category") {
    const categoryLabel = item.label || "(unnamed category)";
    context.structureLines.push(`${"  ".repeat(depth)}- ${categoryLabel}`);

    if (item.link && item.link.type === "doc" && item.link.id) {
      addDocItem(item.link.id, context, depth + 1, `(category link) ${item.link.id}`);
    }

    const nestedItems = Array.isArray(item.items) ? item.items : [];
    for (const nestedItem of nestedItems) {
      collectSidebarItem(nestedItem, context, depth + 1);
    }
  }
}

function addDocItem(docId, context, depth, displayLabel) {
  const absolutePath = context.docIndex.get(docId);

  if (!absolutePath) {
    context.missingDocs.push(docId);
    context.structureLines.push(`${"  ".repeat(depth)}- ${displayLabel || docId} [missing]`);
    return;
  }

  const apiDoc = isApiDoc(docId, absolutePath, context.docsRoot);

  if (context.args.excludeApi && apiDoc) {
    return;
  }

  if (context.args.apiOnly && !apiDoc) {
    return;
  }

  context.structureLines.push(`${"  ".repeat(depth)}- ${displayLabel || docId}`);

  if (context.seenDocIds.has(docId)) {
    return;
  }

  context.seenDocIds.add(docId);
  context.orderedDocs.push({
    docId,
    absolutePath,
  });
}

function appendUnlistedDocs(context) {
  const extraDocs = [];

  for (const [docId, absolutePath] of context.docIndex.entries()) {
    // Skip alias ids like "foo" when "foo/index" exists and points to same file.
    const relativePath = normalizeSlashes(path.relative(context.docsRoot, absolutePath));
    const canonicalId = relativePath.replace(/\.(md|mdx)$/i, "");

    if (docId !== canonicalId) {
      continue;
    }

    if (context.seenDocIds.has(docId)) {
      continue;
    }

    const apiDoc = isApiDoc(docId, absolutePath, context.docsRoot);

    if (context.args.excludeApi && apiDoc) {
      continue;
    }

    if (context.args.apiOnly && !apiDoc) {
      continue;
    }

    extraDocs.push({
      docId,
      absolutePath,
    });
  }

  extraDocs.sort((left, right) => left.docId.localeCompare(right.docId));

  if (extraDocs.length > 0) {
    context.structureLines.push("");
    context.structureLines.push("- Unlisted docs");
  }

  for (const entry of extraDocs) {
    context.structureLines.push(`  - ${entry.docId}`);
    context.seenDocIds.add(entry.docId);
    context.orderedDocs.push(entry);
  }
}

function renderOutput(context) {
  const lines = [];

  lines.push("# Documentation structure");
  lines.push("");
  lines.push(...context.structureLines.filter(Boolean));
  lines.push("");
  lines.push("# Pages");
  lines.push("");

  for (const entry of context.orderedDocs) {
    const originalText = fs.readFileSync(entry.absolutePath, "utf8");
    const cleanedText = cleanMdx(originalText, context.args);
    const relativeFilePath = normalizeSlashes(path.relative(context.root, entry.absolutePath));
    const title = extractTitleFromFrontmatter(originalText);

    lines.push(relativeFilePath);
    lines.push("");

    // Optional metadata line can help retrieval without carrying full frontmatter noise.
    lines.push(`doc_id: ${entry.docId}`);
    if (title) {
      lines.push(`title: ${title}`);
    }
    lines.push("");

    lines.push(cleanedText);
    lines.push("");
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root);
  const docsRoot = path.resolve(root, args.docsDir);
  const sidebarsPath = path.resolve(root, "sidebars.js");
  const outputPath = path.resolve(root, args.out);

  if (!fs.existsSync(docsRoot)) {
    throw new Error(`Docs directory not found: ${docsRoot}`);
  }

  if (!fs.existsSync(sidebarsPath)) {
    throw new Error(`sidebars.js not found: ${sidebarsPath}`);
  }

  const docIndex = buildDocIndex(docsRoot);
  const sidebarItems = resolveSidebar(sidebarsPath, args.sidebar);

  const context = {
    args,
    root,
    docsRoot,
    docIndex,
    orderedDocs: [],
    seenDocIds: new Set(),
    missingDocs: [],
    structureLines: [],
  };

  collectFromSidebar(sidebarItems, context);

  if (args.includeUnlisted) {
    appendUnlistedDocs(context);
  }

  const outputText = renderOutput(context);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, outputText, "utf8");

  console.log(`Written: ${outputPath}`);
  console.log(`Docs exported: ${context.orderedDocs.length}`);

  if (context.missingDocs.length > 0) {
    console.log("");
    console.log("Missing sidebar doc ids:");
    for (const docId of context.missingDocs) {
      console.log(`- ${docId}`);
    }
  }

  if (args.verbose) {
    console.log("");
    console.log("Exported doc ids:");
    for (const entry of context.orderedDocs) {
      console.log(`- ${entry.docId}`);
    }
  }
}

main();