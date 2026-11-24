---
title: "Inactive Tasks and Links"
sidebar_label: "Inactive Tasks and Links"
description: "Exclude tasks, project branches and dependencies from scheduling while keeping them in the project"
---

# Inactive Tasks and Links

Set `active: false` on a task or link to keep it in the project while excluding it from
[auto scheduling](guides/auto-scheduling.md). Gantt applies an inactive style to the task row,
bar or dependency line. Set `active: true` or omit the field to allow the item to participate.

## Deactivate a task or link

Include `active: false` when you load or add the item. For an item already loaded, change its
property and call the corresponding update method:

~~~js
const task = gantt.getTask(taskId);
task.active = false;
gantt.updateTask(taskId);

const link = gantt.getLink(linkId);
link.active = false;
gantt.updateLink(linkId);
~~~

Use the update methods to synchronize the change with scheduling and rendering. If you save the
project to a server, store `active` with the task or link data.

To change a dependency's activity from the timeline, use **Activate link** or **Deactivate link**
in the built-in [context menu](guides/context-menu.md).

## How Gantt determines activity

- A task is inactive if its own `active` field or that of any ancestor is `false`. Deactivating
  a summary task leaves its descendants' stored flags intact.
- A link is inactive if its own `active` field is `false` or either endpoint is inactive.
  In a chain A → B → C, deactivating B removes both dependencies from scheduling. Gantt does
  not create a dependency from A to C.

Use [isTaskActive](api/method/istaskactive.md) and [isLinkActive](api/method/islinkactive.md) to
check the effective state:

~~~js
const taskParticipates = gantt.isTaskActive(taskId);
const linkParticipates = gantt.isLinkActive(linkId);
~~~

## Effects on the project

- Inactive tasks keep their dates. The scheduler skips them, and they do not drive their
  successors or appear on the [critical path](guides/critical-path.md).
- An active summary skips inactive children when deriving its dates and calculating subtask
  duration. It also skips them in rollup bars and split-task displays. An inactive summary
  still derives its span from its children.
- In the built-in [resource panel](guides/resource-management.md), inactive tasks do not
  contribute to resource load.

## Customize the inactive style

| CSS variable | Affects |
|---|---|
| `--dhx-gantt-inactive-background` | Task bar background |
| `--dhx-gantt-inactive-color` | Task bar text |
| `--dhx-gantt-inactive-border` | Task bar border, dashed by default |
| `--dhx-gantt-inactive-opacity` | Grid row and link opacity |

The matching CSS classes are `gantt_task_inactive` on the task bar, `gantt_row_inactive` on
the grid row, `gantt_task_row_inactive` on the timeline row, and `gantt_link_inactive` on the
link.

The `samples/02_extensions/30_inactive_tasks.html` example shows an Active checkbox in the
grid, a link you can deactivate, and a complete inactive project branch.
