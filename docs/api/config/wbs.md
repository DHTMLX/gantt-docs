---
sidebar_label: wbs
title: wbs config
description: "configures the stored WBS codes extension"
---

# wbs

### Description

@short: Configures the stored WBS codes extension

@signature: wbs: WBSConfig

### Example

~~~js
gantt.config.wbs = {
    fields: { code: "wbs_code", locked: "wbs_locked" },
    update_policy: "preserve",
    generate_on_create: true,
    generate_on_parse: false,
    mask: null
};
gantt.plugins({ wbs: true });
~~~

### Details

Set the configuration before activating the `wbs` extension. The extension is available in paid editions.

| Property | Type | Default | Effect |
| --- | --- | --- | --- |
| `fields` | `{ code: string; locked: string }` | `{ code: "wbs_code", locked: "wbs_locked" }` | Names the task fields that store the code and lock flag. Use different non-empty names. Names beginning with `$` or `_` and reserved fields such as `id`, `parent` and `start_date` are invalid. |
| `update_policy` | `"preserve" \| "reparent" \| "structure"` | `"preserve"` | Controls how structural edits affect stored codes. |
| `generate_on_create` | `boolean` | `false` | Assigns a code when a task is added without one. |
| `generate_on_parse` | `boolean` | `false` | Fills missing codes after Gantt loads tasks. |
| `mask` | `WBSMask \| null` | `null` | Defines the prefix and numbering sequence for each level. The default generates numeric segments separated by periods. |

Use `gantt.ext.wbs.setMask(mask)` to validate and change the mask after activation.

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md)
