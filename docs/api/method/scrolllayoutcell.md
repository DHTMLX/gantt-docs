---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell method
description: "scrolls the layout view to the specified position"
---

# scrollLayoutCell

### Description

@short: Scrolls the layout view to the specified position

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (required) *string* - the name of the layout view
- `x` - (required) *number | null* -    optional, the value of the horizontal scroll or 'null' (if the scroll position shouldn't be changed)
- `y` - (required) *number | null* -     optional, the value of the vertical scroll or 'null' (if the scroll position shouldn't be changed)

### Example

~~~jsx
// scrolls layout view only horizontally
gantt.scrollLayoutCell("resourceTimeline", 50);

// scrolls layout view only vertically
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// scrolls layout view both horizontally and vertically 
gantt.scrollLayoutCell("resourceTimeline", 100, 100);
~~~

### Details

:::note
sample: [Public methods to get the layout cell views and scroll them ](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related API
- [scrollTo](api/method/scrollto.md)

