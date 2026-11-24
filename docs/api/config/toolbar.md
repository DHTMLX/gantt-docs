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
    css: "project-toolbar",
    collapseWidth: 480
};
gantt.init("gantt_here");
~~~

### Details

Enable the `toolbar` plugin to use this setting.

- Omit the setting or set it to `true` to use the default items.
- Pass an array of item definitions or an object with an `items` array to choose the displayed items.
- Use `css` in the object form to add a class to the toolbar element.
- Use `overflow` to choose how the toolbar handles a narrow width: `"menu"` (default) keeps one row and moves items that do not fit into a "More" menu, `"collapse"` puts all non-pinned items in one burger menu, and `"wrap"` lets items wrap onto more lines. Items accept `overflow` too (`"auto"`, `"never"` or `"always"`). See [Narrow screens](guides/toolbar.md#narrow-screens).
- Use `collapseWidth` to set a width in CSS px. With `overflow: "menu"`, the toolbar collapses into one menu when it is narrower than this value. The width is the toolbar's own width, not the viewport width.
- Set `toolbar` to `false` to skip the default toolbar row. An explicit toolbar layout cell still determines its own place in the layout.

See the [Toolbar guide](guides/toolbar.md) for the built-in items, item definitions and runtime API.
