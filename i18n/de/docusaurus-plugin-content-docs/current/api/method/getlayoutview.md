---
sidebar_label: getLayoutView
title: getLayoutView method
description: "Ruft das Layout-View-Objekt anhand seines Namens ab"
---

# getLayoutView

### Description

@short: Ruft das Layout-View-Objekt anhand seines Namens ab

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - der Name des Layout-Views

### Returns
- ` view` - (object) - das Layout-View-Objekt

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// gibt 210 zurück

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// gibt 08. Juni 2025 zurück
~~~

### Details

Diese Methode ermöglicht den Zugriff auf das Layout-View-Objekt und somit die Nutzung mehrerer nützlicher Methoden. Dazu gehören:

- [dateFromPos](api/method/datefrompos.md) - ruft das Datum ab, das einer bestimmten horizontalen Position innerhalb des Views entspricht
- [posFromDate](api/method/posfromdate.md) - ermittelt die relative horizontale Position für ein gegebenes Datum im View
- [getScale](api/method/getscale.md) - holt die Konfigurationsdetails der Zeitskala des Views

Um den View zu einer bestimmten Position zu verschieben, kann die Methode [scrollLayoutCell](api/method/scrolllayoutcell.md) verwendet werden.

:::note
Sample: [Öffentliche Methoden zum Abrufen der Layout-Cell-Views und zum Scrollen derselben](https://snippet.dhtmlx.com/0v4mmoxu) 
:::

### Related Guides
- ["Gantt-Layout"](guides/layout-config.md)

