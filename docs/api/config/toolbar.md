---
sidebar_label: toolbar
title: toolbar config
description: "Configures the built-in toolbar"
---

# toolbar

### Description

@short: Configures the built-in toolbar

@signature: toolbar: boolean | UIToolbarItemDef[] | UIToolbarConfig

### Example

~~~js
gantt.plugins({ toolbar: true, undo: true });
gantt.config.toolbar = {
    items: ["add_task", "|", "undo", "redo", "spacer", "theme"],
    css: "project-toolbar"
};
gantt.init("gantt_here");
~~~

### Details

Enable the `toolbar` plugin to use this setting.

- Omit the setting or set it to `true` to use the default items.
- Pass an array of item definitions or an object with an `items` array to choose the displayed items.
- Use `css` in the object form to add a class to the toolbar element.
- Set `toolbar` to `false` to skip the default toolbar row. An explicit toolbar layout cell still determines its own place in the layout.

See the [Toolbar guide](guides/toolbar.md) for the built-in items, item definitions and runtime API.
