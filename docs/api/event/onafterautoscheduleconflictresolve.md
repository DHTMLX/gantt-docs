---
sidebar_label: onAfterAutoScheduleConflictResolve
title: onAfterAutoScheduleConflictResolve event
description: "Reports the result of a constraint conflict resolution."
---

# onAfterAutoScheduleConflictResolve

:::info
This event requires the Gantt PRO `auto_scheduling` plugin and [prompt or adjust mode](api/config/auto_scheduling.md#resolve_constraint_conflicts).
:::

### Description

@short: Fires after Gantt completes an interactive or automatic constraint conflict resolution

@signature: onAfterAutoScheduleConflictResolve: (choice: AutoScheduleConflictChoice, conflicts: AutoScheduleConflict[], changedTaskIds: Id[], changedLinkIds: Id[]) =\> void;

### Parameters

- `choice` is `"adjust"`, `"deactivate"`, `"remove"`, `"keep"` or `"cancel"`.
- `conflicts` describes the constraint conflicts that led to the resolution.
- `changedTaskIds` lists the tasks whose constraints were adjusted or removed.
- `changedLinkIds` lists the links that were deactivated.

### Details

The two ID arrays describe the changes made by the selected remedy. Both arrays are empty for `"cancel"`.

### Related API

- [onBeforeAutoScheduleConflictResolve](api/event/onbeforeautoscheduleconflictresolve.md)
- [Resolving constraint conflicts](guides/auto-scheduling.md#resolving-constraint-conflicts)
- [ext.autoScheduling](api/other/autoscheduling-ext.md)

### Change log

- Added in v10.1.
