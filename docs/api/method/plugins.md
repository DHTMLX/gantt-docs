---
sidebar_label: plugins
title: plugins method
description: "activates the specified extensions"
---

# plugins

### Description

@short: Activates the specified extensions

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` -	(optional0 *GanttPlugins*	-	an object with the extensions' names that need to be activated

### Returns
- ` activatedPlugins` - (GanttPlugins) - an object of activated extensions

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- [Full List of Extensions](guides/extensions-list.md)

### Change log
- The **export_api** plugin was included into the list of plugins in v8.0. To activate export service in earlier versions, you need to include the **https://export.dhtmlx.com/gantt/api.js** file on your page. Check the [Migration](migration.md#71---80) article.
- Added in v7.0
