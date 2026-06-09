# DHTMLX Gantt Documentation

Documentation for the DHTMLX Gantt library lives here.

Always read/write files as UTF-8 without BOM.

Do not run `docusaurus build` to verify docs unless directly asked or unless it is clearly necessary. The build process may take up to 10-15 minutes. You can build a specific locale using the `--locale` parameter with a language code, e.g. `docusaurus build --locale en`.

For cross-article links in docs, use markdown file paths relative to the `docs` folder, not URL paths or paths relative to the current article, e.g. `[copyright](guides/copyright.md)`. These links are transformed to URL path links during build (`local_modules/dhx-md-data-parser/index.js`). For pages stored as `index.md`, do not include `/index.md`; use the generated article path format expected by the parser - e.g. bad: `[react](integrations/react/index.md)`, good: `[react](integrations/react.md)`.

If a page is deleted or its slug changes, add redirects from the old URL to `docker/redirects.conf` for the English version and all translations.

When editing docs/specs/prose, preserve the existing structure and wording unless the requested change requires otherwise. Prefer small targeted patches over full rewrites.

`llms.txt` and the markdown version of the documentation are generated from the content of `docs` during build and are located in the `static` folder. Do not modify `static/llms-md` and `static/llms.txt` directly. To modify `llms.txt` or the markdown version of docs, refer to the `gantt-docs\plugins\dhx-llms-plugin\index.js` plugin.

Translations live in the `i18n` folder. They are updated on a semi-regular basis and can be modified directly; direct changes are not expected to be lost during re-translation.
