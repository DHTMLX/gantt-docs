---
sidebar_label: getLayoutView
title: getLayoutView-Methode
description: "liefert das Objekt der Layout-Ansicht anhand des Namens"
---

# getLayoutView

### Description

@short: Liefert das Objekt der Layout-Ansicht anhand seines Namens

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - der Name der Layout-Ansicht

### Returns
- ` view` - (object) - das Objekt der Layout-Ansicht

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
 // returns 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
 // returns 08 June, 2025
~~~

### Details

Die Methode ermöglicht das Anwenden einiger Methoden auf das zurückgegebene Objekt der Layout-Ansicht. Die Methoden sind:

- [dateFromPos](api/method/datefrompos.md) - erhält das Datum der angegebenen horizontalen Position im View
- [posFromDate](api/method/posfromdate.md) - erhält die relative horizontale Position des angegebenen Datums im View
- [getScale](api/method/getscale.md) - gibt die Konfiguration der Zeitachse der View zurück

Um die Ansicht an die angegebene Position zu scrollen, wende die Methode [scrollLayoutCell](api/method/scrolllayoutcell.md) an.

:::note
sample: [Öffentliche Methoden zum Abrufen der Layout-Zellenansichten und zum Scrollen dieser](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related Guides
- [Gantt-Layout](guides/layout-config.md)