---
sidebar_label: getLayoutView
title: getLayoutView method
description: "returns the object of the layout view by its name"
---

# getLayoutView

### Description

@short: Returns the object of the layout view by its name

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - the name of the layout view

### Returns
- ` view` - (object) - the object of the layout view

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// returns 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// returns 08 June, 2025
~~~

### Details

The method allows applying some methods to the returned object of the layout view. The methods are:

- [dateFromPos](api/method/datefrompos.md) - gets the date of the specified horizontal position in the view
- [posFromDate](api/method/posfromdate.md) - gets the relative horizontal position of the specified date in the view
- [getScale](api/method/getscale.md) - returns the configuration of the time scale of the view

To scroll the view to the specified position, apply the [scrollLayoutCell](api/method/scrolllayoutcell.md) method.

:::note
sample: [Public methods to get the layout cell views and scroll them](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related Guides
- [Gantt Layout](guides/layout-config.md)

