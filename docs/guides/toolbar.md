---
sidebar_label: Toolbar
title: Toolbar
description: "Add and customize the built-in Gantt toolbar."
---

# Toolbar

Use the toolbar to put common Gantt actions and your own controls above the chart.

## Add a toolbar

Enable the [toolbar plugin](api/method/plugins.md) before initializing Gantt.

~~~js
gantt.plugins({ toolbar: true });
gantt.init("gantt_here");
~~~

Gantt adds a row above the chart. To choose a different position, include a `view: "toolbar"` cell in your [layout](guides/layout-config.md). Set [`gantt.config.toolbar`](api/config/toolbar.md) to an item array or to an object with `items` and an optional `css` class. Omit the setting or set it to `true` for the default preset. Set it to `false` to skip the default toolbar row.

For example, move the toolbar below the current layout before initializing Gantt:

~~~js
const chartLayout = gantt.config.layout;
gantt.config.layout = {
    rows: [chartLayout, { view: "toolbar", id: "toolbar", height: 44 }]
};
~~~

## Built-in items

The default preset lists items in this order:

~~~js
[
    "add_task", "|", "undo", "redo", "|",
    "zoom_in", "zoom_out", "zoom_level", "|",
    "critical_path", "expand_all", "collapse_all", "spacer", "theme", "fullscreen"
]
~~~

| Item | Action or requirement |
| --- | --- |
| `add_task` | Opens the editor for a new task. Hidden in read-only mode. |
| `undo`, `redo` | Undo or redo a change. Require the [undo plugin](guides/undo-redo.md). |
| `zoom_in`, `zoom_out`, `zoom_level` | Change the scale. Require [configured zoom levels](guides/zoom.md). |
| `critical_path` | Toggles critical-path highlighting. Requires the [critical path plugin](guides/critical-path.md). |
| `expand_all`, `collapse_all` | Open or close all branches. |
| `theme` | Switches [skins](guides/skins.md). See [Theme selector](#theme-selector). |
| `fullscreen` | Toggles [fullscreen mode](guides/fullscreen-mode.md). Requires the `fullscreen` plugin. |
| `today` | Scrolls to the current date. Add it explicitly when needed. |
| `"\|"`, `separator`, `spacer` | Add a divider or a flexible gap. |

The toolbar plugin is available in Community and paid browser editions. Each built-in action follows its feature's availability. For example, Undo, Redo and Critical Path require a paid edition. Gantt hides items whose requirements are unavailable.

The **Built-in toolbar** sample is included in the paid packages at `samples/02_extensions/31_toolbar.html`.

## Configure items

Use a string for a built-in item. To customize its appearance while retaining its action, use an object with the same `id`.

~~~js
gantt.plugins({ toolbar: true, undo: true });
gantt.config.toolbar = {
    css: "project-toolbar",
    items: [
        "add_task",
        { id: "undo", label: "Undo change", icon: null },
        "spacer",
        { id: "theme", comp: "menu" }
    ]
};
~~~

| Item property | Use |
| --- | --- |
| `id` | String or number that identifies the item in events and runtime calls. |
| `comp` | `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `label`, `separator` or `spacer`. When omitted on a custom item, Gantt infers `menu` from `items`, `combo` from `options`, or uses `button`. |
| `label`, `tooltip`, `icon`, `variant` | Caption, tooltip, icon CSS class and button style. Variants are `primary`, `outline`, `danger` and `link`. A standalone `comp: "label"` displays static text. |
| `items`, `options` | Menu items or an array of `{ key, label, icon? }` options for a combo or segmented control. |
| `value`, `pressed`, `placeholder` | Initial field value, initial toggle state or input placeholder. |
| `width`, `ariaLabel` | Input width in pixels and accessible name for combo, text, stepper and datepicker items. Omit `width` to use the compact default. A visible input `label` is associated with the input. Use `ariaLabel` to give each field a specific name when the toolbar uses a shared visible caption. |
| `config` | Options passed to the input control, such as `min`, `max` and `step` for a stepper. |
| `disabled`, `hidden` | Disable or hide the item. |

~~~js
gantt.config.toolbar = [
    { comp: "label", label: "Displayed date range" },
    { id: "start", comp: "datepicker", ariaLabel: "Start date", width: 132 },
    { id: "end", comp: "datepicker", ariaLabel: "End date", width: 132 },
    { id: "refresh", label: "Refresh chart" }
];

gantt.attachEvent("onToolbarItemClick", function (id) {
    if (id === "refresh") gantt.render();
    return true;
});

gantt.attachEvent("onToolbarItemChange", function (id, value) {
    if (id === "start" && value instanceof Date) gantt.showDate(value);
    return true;
});
~~~

Put handlers on [onToolbarItemClick](api/event/ontoolbaritemclick.md) and [onToolbarItemChange](api/event/ontoolbaritemchange.md) when configuring the toolbar through Gantt. These events fire before built-in actions. Return `false` to cancel the action. A menu click reports the selected leaf's ID.

### Theme selector

The theme item uses a toggle by default. It switches between the first regular light and dark options. Set `comp: "menu"` or `comp: "segmented"` to show the full list. The default list contains Terrace, Dark, Contrast White, Contrast Black and Auto. Auto follows the operating system's current color preference.

~~~js
gantt.config.toolbar = [
    "add_task",
    "spacer",
    { id: "theme", comp: "menu", remember: true }
];
~~~

Use `themes` to supply an array of `{ id, label?, mode?, contrast?, icon? }` options. Use a hyphenated skin ID such as `contrast-black` and a mode of `"light"`, `"dark"` or `"auto"`. With `remember: true`, Gantt stores the choice in `localStorage["gantt_theme"]`. To restore it at startup, apply the stored skin before initializing Gantt. The toolbar's selection follows choices made through the item. An external call to `setSkin()` can change the chart without updating the item.

## Change a mounted toolbar

Use `gantt.ext.toolbar` after the toolbar has mounted.

| Method | What it does |
| --- | --- |
| `setItems(items)` | Replaces the displayed items. |
| `updateItem(id, patch)` | Updates item properties such as `width`, `ariaLabel` or `disabled`. |
| `getItem(id)` | Returns the item or `null`. |
| `getValue(id)`, `setValue(id, value)` | Read or set a control value. |
| `show()`, `hide()` | Show or hide the toolbar layout cell. |
| `refresh()` | Reads the item list from `gantt.config.toolbar` again. |
| `getToolbar()` | Returns the mounted toolbar widget or `null`. |

~~~js
gantt.ext.toolbar.updateItem("end", { width: 160, ariaLabel: "Finish date" });
gantt.ext.toolbar.updateItem("refresh", { disabled: true });
~~~

### Mount a toolbar outside the chart

Use the standalone `Toolbar` export when the toolbar belongs in your application's header or another container. Pass the Gantt instance to the constructor. Standalone items can define `onClick` or `onChange` directly.

~~~js
import { gantt, Toolbar } from "@dhx/gantt";

const toolbar = new Toolbar({
    gantt,
    items: [
        "add_task",
        { id: "refresh", label: "Refresh chart", onClick: () => gantt.render() }
    ]
});
toolbar.mount(document.getElementById("app-header"));
~~~

The standalone widget also exposes `getControl(id)` for access to a mounted input, as well as the item and value methods shown above.

## Keyboard and styling

With [keyboard navigation](guides/keyboard-navigation.md) enabled when the toolbar mounts, Tab enters the toolbar and the arrow keys move between its enabled items. Home and End move to the first and last item. With Gantt keyboard navigation off, Tab and Shift+Tab reach each enabled item in the browser's normal tab order. Inside a menu, use the arrow keys to navigate and Escape to close it.

The `css` option adds a class to the `.dhx_ui_toolbar` element. To change the toolbar's height, colors or segmented control track, see [Toolbar theme variables](guides/custom-skins.md#toolbar-theme-variables). The selected segmented option is drawn as a raised chip. Labelled toggles display a switch with a thumb that mirrors in a right-to-left container. Items wrap onto another line when the available width is too small.

Use locale labels such as `ui_toolbar_label`, `ui_toolbar_add_task` and the `ui_theme_*` keys to customize built-in text. See [Localization](guides/localization.md).
