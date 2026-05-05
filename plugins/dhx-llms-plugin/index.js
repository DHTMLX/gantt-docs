const fs = require('fs');
const path = require('path');

const OUT_SUBDIR = path.join('static', 'llms-md');
const LLMS_TXT_PATH = path.join('static', 'llms.txt');
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n+/;
const FRONTMATTER_BLOCK_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

const SECTION_ORDER = ['_root', 'guides', 'integrations', 'api'];
const SECTION_NAMES = {
  _root: 'Overview',
  guides: 'Guides',
  integrations: 'Integrations',
  api: 'API Reference',
};

function stripFrontmatter(md) {
  return md.replace(FRONTMATTER_RE, '');
}

function readFrontmatter(content) {
  const m = content.match(FRONTMATTER_BLOCK_RE);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    fm[kv[1]] = val;
  }
  return fm;
}

function buildLlmsTxt({ siteConfig, sourceDir, mdUrlBase }) {
  const entries = walkMarkdown(sourceDir).map((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const fm = readFrontmatter(content);
    const rel = path.relative(sourceDir, file).replace(/\\/g, '/');
    const relMd = rel.replace(/\.mdx?$/, '.md');
    const title = fm.title || fm.sidebar_label || relMd.replace(/\.md$/, '');
    const description = (fm.description || '').replace(/\s+/g, ' ').trim();
    return { title, description, url: mdUrlBase + relMd, rel };
  });

  const grouped = {};
  for (const e of entries) {
    const top = e.rel.includes('/') ? e.rel.split('/')[0] : '_root';
    (grouped[top] ||= []).push(e);
  }

  const orderedKeys = [
    ...SECTION_ORDER.filter((k) => grouped[k]),
    ...Object.keys(grouped).filter((k) => !SECTION_ORDER.includes(k)).sort(),
  ];

  const lines = [];
  lines.push(`# ${siteConfig.title || 'Documentation'}`);
  lines.push('');
  if (siteConfig.tagline) {
    lines.push(`> ${siteConfig.tagline}`);
    lines.push('');
  }

  for (const key of orderedKeys) {
    const items = grouped[key].sort((a, b) => a.rel.localeCompare(b.rel));
    const name = SECTION_NAMES[key] || (key.charAt(0).toUpperCase() + key.slice(1));
    lines.push(`## ${name}`);
    lines.push('');
    for (const e of items) {
      lines.push(
        e.description
          ? `- [${e.title}](${e.url}): ${e.description}`
          : `- [${e.title}](${e.url})`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

function walkMarkdown(rootDir, acc = []) {
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const full = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      walkMarkdown(full, acc);
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function localeSourceDir(siteDir, locale, defaultLocale) {
  return locale === defaultLocale
    ? path.join(siteDir, 'docs')
    : path.join(siteDir, 'i18n', locale, 'docusaurus-plugin-content-docs', 'current');
}

module.exports = function dhxLlmsPlugin(context) {
  const { siteDir, siteConfig } = context;
  const { locales, defaultLocale } = siteConfig.i18n;

  return {
    name: 'dhx-llms-plugin',

    // Make the dev server send the same headers as the production Nginx
    // location ~* \.md$ block in docker/nginx.conf, so "View as Markdown"
    // opens inline in dev too.
    configureWebpack() {
      return {
        devServer: {
          headers: (req) => {
            if (req && req.url && /\.md(\?|$)/.test(req.url)) {
              return [
                { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
                { key: 'Content-Disposition', value: 'inline' },
              ];
            }
            return [];
          },
        },
      };
    },

    async loadContent() {
      const outRoot = path.join(siteDir, OUT_SUBDIR);
      if (fs.existsSync(outRoot)) {
        try {
          fs.rmSync(outRoot, {
            recursive: true,
            force: true,
            maxRetries: 5,
            retryDelay: 100,
          });
        } catch (err) {
          // On Windows, rmSync can race with file watchers / AV scanners and
          // throw ENOTEMPTY/EPERM. Falling through is fine — we overwrite
          // existing files below; only stale files would linger, and full
          // builds always start from a clean outDir anyway.
          console.warn(`[dhx-llms-plugin] could not clear ${outRoot}: ${err.code || err.message}`);
        }
      }
      fs.mkdirSync(outRoot, { recursive: true });

      const defaultDir = localeSourceDir(siteDir, defaultLocale, defaultLocale);
      const defaultFiles = fs.existsSync(defaultDir) ? walkMarkdown(defaultDir) : [];

      for (const locale of locales) {
        const localeDir = path.join(outRoot, locale);
        const sourceDir = localeSourceDir(siteDir, locale, defaultLocale);

        // Seed every locale with the default-locale content so untranslated
        // pages still resolve. Docusaurus falls back to the default locale's
        // source when an i18n translation is missing — the .md mirror needs
        // to mirror that fallback or the button will 404 on those pages.
        for (const file of defaultFiles) {
          const rel = path.relative(defaultDir, file).replace(/\\/g, '/');
          const destPath = path.join(localeDir, rel.replace(/\.mdx?$/, '.md'));
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, stripFrontmatter(fs.readFileSync(file, 'utf8')));
        }

        if (locale === defaultLocale || !fs.existsSync(sourceDir)) continue;

        // Overlay locale-specific translations on top of the default seed.
        for (const file of walkMarkdown(sourceDir)) {
          const rel = path.relative(sourceDir, file).replace(/\\/g, '/');
          const destPath = path.join(localeDir, rel.replace(/\.mdx?$/, '.md'));
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, stripFrontmatter(fs.readFileSync(file, 'utf8')));
        }
      }

      // Generate /llms.txt (llmstxt.org convention) for the default locale.
      // LLM crawlers expect a single canonical index at the site root; we
      // skip per-locale variants intentionally — they're rarely consumed and
      // would split crawler weight across translations.
      if (defaultFiles.length > 0) {
        const baseUrl = siteConfig.baseUrl.endsWith('/')
          ? siteConfig.baseUrl
          : `${siteConfig.baseUrl}/`;
        const siteOrigin = (siteConfig.url || '').replace(/\/+$/, '');
        const mdUrlBase = `${siteOrigin}${baseUrl}llms-md/${defaultLocale}/`;
        const llmsTxt = buildLlmsTxt({
          siteConfig,
          sourceDir: defaultDir,
          mdUrlBase,
        });
        fs.writeFileSync(path.join(siteDir, LLMS_TXT_PATH), llmsTxt);
      }
    },
  };
};
