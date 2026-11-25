---
sidebar_label: onBeforeAutoScheduleConflictResolve
title: onBeforeAutoScheduleConflictResolve event
description: "Lets an application replace the constraint conflict resolution dialog."
---

# onBeforeAutoScheduleConflictResolve

:::info
This event requires the Gantt PRO `auto_scheduling` plugin and [prompt mode](api/config/auto_scheduling.md#resolve_constraint_conflicts).
:::

### Description

@short: Fires before Gantt presents choices for a new constraint conflict introduced by a user edit

@signature: onBeforeAutoScheduleConflictResolve: (conflicts: AutoScheduleConflict[], resolve: (choice: AutoScheduleConflictChoice) =\> void, resolutions: AutoScheduleConflictResolution[]) =\> boolean;

### Parameters

- `conflicts` describes the affected tasks, constraints, required and actual dates, and the driving dependency IDs when available. Each conflict in this event has `kind: "constraint-violation"`.
- `resolve` accepts one offered choice or `"cancel"`.
- `resolutions` contains the offered choices. Each entry has `choice` and localized `text`, and can include the task IDs or link IDs affected by the choice.

### Returns

Return `false` to replace the built-in dialog. Call `resolve` with the choice from your dialog, or with `"cancel"` to revert the edit. Any other return allows Gantt to show its dialog.

### Details

The callback can be called later, after the user makes a choice. An unavailable choice throws an error. If Gantt can no longer deactivate the proposed links, for example because a link update is vetoed, it can offer an updated set of choices. Use [onAfterAutoScheduleConflictResolve](api/event/onafterautoscheduleconflictresolve.md) to handle the final decision.

### Related guides

- [Resolving constraint conflicts](guides/auto-scheduling.md#resolving-constraint-conflicts)
- [ext.autoScheduling](api/other/autoscheduling-ext.md)

### Change log

- Added in v10.1.
