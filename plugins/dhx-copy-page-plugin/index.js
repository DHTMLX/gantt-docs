const fs = require('fs');
const path = require('path');

const OUT_SUBDIR = path.join('static', 'llms-md');
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n+/;

function stripFrontmatter(md) {
  return md.replace(FRONTMATTER_RE, '');
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

module.exports = function dhxCopyPagePlugin(context) {
  const { siteDir, siteConfig } = context;
  const { locales, defaultLocale } = siteConfig.i18n;

  return {
    name: 'dhx-copy-page-plugin',

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
          console.warn(`[dhx-copy-page-plugin] could not clear ${outRoot}: ${err.code || err.message}`);
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
    },
  };
};
