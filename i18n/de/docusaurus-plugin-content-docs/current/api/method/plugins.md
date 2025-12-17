---
sidebar_label: plugins
title: plugins method
description: "aktiviert die angegebenen Extensions"
---

# plugins

### Description

@short: Aktiviert die angegebenen Extensions

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters
- `ext` - (optional) *GanttPlugins* - ein Objekt, das die zu aktivierenden Extensions auflistet

### Returns
- ` activatedPlugins` - (GanttPlugins) - ein Objekt, das die aktivierten Extensions enthält

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md)

### Change log
- Ab Version 8.0 ist das **export_api** Plugin Teil der plugins-Liste. Für frühere Versionen muss das Script **https://export.dhtmlx.com/gantt/api.js** in die Seite eingebunden werden. Details finden Sie im [Migration](migration.md#71---80) Leitfaden.
- Eingeführt in Version 7.0
