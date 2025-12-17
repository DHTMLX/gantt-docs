---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell method
description: "verschiebt die Layout-Ansicht an die angegebene Position"
---

# scrollLayoutCell

### Description

@short: Verschiebt die Layout-Ansicht an die angegebene Position

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (required) *string* - der Name der Layout-Ansicht
- `x` - (required) *number | null* -    optionale horizontale Scroll-Position oder 'null' (wenn die horizontale Position nicht geändert werden soll)
- `y` - (required) *number | null* -    optionale vertikale Scroll-Position oder 'null' (wenn die vertikale Position nicht geändert werden soll)

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
Sample: [Öffentliche Methoden zum Zugriff auf Layout-Cell-Views und zur Steuerung deren Scrollens](https://snippet.dhtmlx.com/0v4mmoxu) 
:::

### Related API
- [scrollTo](api/method/scrollto.md)

