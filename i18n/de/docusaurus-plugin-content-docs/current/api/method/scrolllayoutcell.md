---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell-Methode
description: "scrollt die Layout-Ansicht an die angegebene Position"
---

# scrollLayoutCell

### Description

@short: Scrollt die Layout-Ansicht an die angegebene Position

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (erforderlich) *string* - der Name der Layout-Ansicht
- `x` - (erforderlich) *number | null* - optional, der Wert des horizontalen Scrolls oder 'null' (falls die Scroll-Position nicht geändert werden soll)
- `y` - (erforderlich) *number | null* - optional, der Wert des vertikalen Scrolls oder 'null' (falls die Scroll-Position nicht geändert werden soll)

### Example

~~~jsx
// scrollt die Layout-Ansicht nur horizontal
gantt.scrollLayoutCell("resourceTimeline", 50);

// scrollt die Layout-Ansicht nur vertikal
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// scrollt die Layout-Ansicht sowohl horizontal als auch vertikal
gantt.scrollLayoutCell("resourceTimeline", 100, 100);
~~~

### Details

:::note
sample: [Beispiele: Öffentliche Methoden zum Abrufen der Layout-Zellansichten und zum Scrollen](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related API
- [scrollTo](api/method/scrollto.md)