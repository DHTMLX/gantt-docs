---
sidebar_label: plugins
title: plugins method
description: "aktiviert die angegebenen Extensions"
---

# plugins

### Description

@short: Aktiviert die angegebenen Erweiterungen

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` - (optional) *GanttPlugins* - ein Objekt mit den Namen der Erweiterungen, die aktiviert werden müssen

### Returns
- `activatedPlugins` - (GanttPlugins) - ein Objekt der aktivierten Erweiterungen

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md)

### Change log
- Das **export_api** Plugin wurde in die Liste der Plugins in v8.0 aufgenommen. Um den Export-Service in früheren Versionen zu aktivieren, müssen Sie die **https://export.dhtmlx.com/gantt/api.js** Datei auf Ihrer Seite einbinden. Lesen Sie den [Migration](migration.md#71---80) Artikel.
- In v7.0 hinzugefügt