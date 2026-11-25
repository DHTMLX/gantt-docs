---
sidebar_label: Context Menu
title: Context Menu
description: "Enable and customize context menus for tasks, dependencies and grid columns."
---

# Context Menu

Enable the `context_menu` plugin to show Gantt actions when users right-click a supported part of the chart.

~~~js
gantt.plugins({ context_menu: true });
gantt.init("gantt_here");
~~~

The plugin is available in Community and paid browser editions. Actions that depend on a feature appear when that feature is available.

## Zones and default menus

| Zone | Where it opens | Default items |
| --- | --- | --- |
| `task` | A grid row or timeline bar | Edit, Add, Convert to milestone or task, Indent, Outdent, Delete |
| `link` | A dependency link | Deactivate or Activate link, Delete link |
| `empty` | Empty space in the grid or timeline | Add task, Expand all, Collapse all |
| `header` | A grid column header | Sort ascending, Sort descending, Hide column, Columns |

Sorting requires [`gantt.config.sort`](api/config/sort.md) and a sortable column. The header menu shows column-visibility actions if column hiding is available. The timeline scale, resource panels, resizers and scrollbars keep the browser's context menu.

## Customize a zone

Set [`gantt.config.context_menu`](api/config/context_menu.md) before or after initialization. Gantt reads the configuration each time a context menu is requested. Set a zone to an array to replace its items or to `false` to disable it. An omitted zone uses the default items. Set the entire configuration to `false` to disable all zones.

~~~js
gantt.config.context_menu = {
    task: [
        "edit",
        "add",
        "|",
        { id: "mark_review", label: "Needs review", checked: false },
        "delete"
    ],
    empty: false,
    header: ["sort_asc", "sort_desc", "|", "columns"]
};

gantt.attachEvent("onBeforeContextMenu", function (context) {
    if (context.zone === "task" && context.task) {
        const item = context.items.find(item => item.id === "mark_review");
        if (item) item.checked = Boolean(context.task.needs_review);
    }
    return true;
});

gantt.attachEvent("onContextMenuItemClick", function (id, item, context) {
    if (id === "mark_review" && context.task) {
        context.task.needs_review = Boolean(item.checked);
        gantt.updateTask(context.task.id);
    }
    return true;
});
~~~

The config accepts a built-in string or a menu item object. Item fields include `id`, `label`, `icon`, `disabled`, `separator`, `checked`, `radio` and nested `items`. Set `checked` to `true` or `false` to make a checkbox item. Selecting it toggles the check without closing the menu by default. An action such as the custom task update above can still close it by causing the chart to re-render. Use `radio: true` and `checked` for mutually exclusive items. Nested entries can refer to built-in actions by ID.

### Built-in action IDs

| Zone | IDs |
| --- | --- |
| Task editing | `edit`, `add`, `add_child`, `add_before`, `add_after`, `add_predecessor`, `add_successor`, `convert_to_milestone`, `indent`, `outdent`, `delete` |
| Task clipboard | `cut`, `copy`, `paste_child`, `paste_after`, `clear_clipboard` |
| Task appearance | `split`, `unsplit`, `complete`, `rollup`, `hide_bar` |
| Link | `deactivate_link`, `delete_link` |
| Empty space | `add_task`, `expand_all`, `collapse_all`, `clear_clipboard` |
| Header | `sort_asc`, `sort_desc`, `hide_column`, `columns` |
| Any supported zone | `theme` |
| Divider | `"\|"` or `separator` |

`add` opens a submenu with the five `add_*` task actions. `deactivate_link` toggles the link's own [active state](guides/link-properties.md). A split needs a date under the pointer in the timeline. Split and rollup actions also require their respective features. Read-only mode hides task and link editing actions.

Copy copies a branch and links whose endpoints are both in that branch. Cut moves the branch on paste. A cut branch cannot be pasted into its own subtree. Clear Clipboard appears when there is something to clear.

## Events and context

[onBeforeContextMenu](api/event/onbeforecontextmenu.md) fires after Gantt resolves the items. Use the event to edit `context.items` or to cancel. If it returns `false` or leaves the item list empty, Gantt leaves the browser context menu available.

[onContextMenuItemClick](api/event/oncontextmenuitemclick.md) fires for custom and built-in items. Return `false` to cancel the built-in action. The existing [onContextMenu](api/event/oncontextmenu.md) event still receives the native right-click.

| Context field | Value |
| --- | --- |
| `zone`, `id` | The zone and the task or link ID, or `null` where there is no item ID. |
| `task`, `link` | The task or link object when applicable. |
| `area`, `date`, `column` | Chart area (`"grid"` or `"timeline"`), a date under the pointer if available, or the column name in the header zone. |
| `items` | The resolved menu item array. |
| `event`, `x`, `y` | The native event for a pointer request and the menu coordinates. A programmatic request has no originating event. |

A task action operates on the task that opened the menu. When task selection is enabled, opening on an unselected task selects it and clears an existing multiselection. Scroll, data re-render, outside click or Escape closes the menu. Once open, the menu supports arrow keys, Enter and Escape. Opening uses a right-click or a platform gesture that dispatches a context-menu event.

## Open a menu from code

Use `gantt.ext.contextMenu.open(request)` to open a zone menu at a position. The request accepts `zone` and optional `id`, `x`, `y`, `area`, `column` and `items`. Explicit `items` bypass built-in action resolution.

~~~js
gantt.ext.contextMenu.open({ zone: "task", id: 5, x: 300, y: 120 });
~~~

Use `close()` to close the menu, `isOpen()` to check its state and `getMenu()` to access its widget. Customize built-in captions through [locale labels](guides/localization.md), such as `gantt.locale.labels.ui_menu_add_task`.

The **Built-in context menu** sample is included in the source examples at `samples/04_customization/10_context_menu.html`.
