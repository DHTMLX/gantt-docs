---
sidebar_label: context_menu
title: context_menu config
description: "Configures the built-in context menu by zone"
---

# context_menu

### Description

@short: Configures the built-in context menu by zone

@signature: context_menu: boolean | IContextMenuConfig

### Example

~~~js
gantt.plugins({ context_menu: true });
gantt.config.context_menu = {
    task: ["edit", "|", "delete"],
    empty: false
};
gantt.init("gantt_here");
~~~

### Details

Enable the `context_menu` plugin to use this setting.

Omit the setting or set it to `true` to use the default menus. Set it to `false` to disable all built-in menus. The object form accepts `task`, `link`, `empty` and `header`. A zone's array replaces its default items. Set a zone to `false` to disable it, or omit it to keep its default.

See the [Context Menu guide](guides/context-menu.md) for item definitions, events and the runtime API.
