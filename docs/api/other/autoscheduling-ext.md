---
sidebar_label: ext.autoScheduling
title: ext.autoScheduling object
description: "Previews, analyzes, and applies scheduling changes."
---

# ext.autoScheduling

### Description

@short: Previews, analyzes and applies scheduling changes

:::info
This API requires Gantt PRO and the `auto_scheduling` plugin.
:::

~~~js
gantt.plugins({ auto_scheduling: true });
~~~

## Methods

| Method | Returns | Effect |
| --- | --- | --- |
| `solve(options?: AutoScheduleSolveOptions)` | `AutoScheduleResult \| null` | Recalculates and writes the schedule through the same event flow as [autoSchedule](api/method/autoschedule.md). |
| `preview(changes?: SchedulingChanges \| null, options?: AutoSchedulePreviewOptions)` | `AutoSchedulePreviewResult` | Models a change and returns its scheduling effects without writing data or firing events. |
| `analyze(options?: AutoScheduleAnalyzeOptions)` | `AutoScheduleAnalysis` | Reads the chart's slack, critical path and cycles without writing data or firing events. |
| `apply(changes: SchedulingChanges, options?: AutoScheduleApplyOptions)` | `AutoScheduleApplyResult` | Writes a change set through Gantt's task and link APIs, with optional scheduling. |
| `asUserEdit(id: Id, write: () => void)` | `AutoScheduleUserEditResult` | Runs a synchronous edit of one existing task through the [constraint conflict resolution](guides/auto-scheduling.md#resolving-constraint-conflicts) flow. |
| `level(options?: AutoScheduleLevelOptions)` | `AutoScheduleLevelResult \| null` | Writes a leveled schedule. Requires a provider with resource scheduling. |
| `evaluate(candidates: AutoScheduleCandidate[], options?: AutoScheduleEvaluateOptions)` | `AutoScheduleEvaluation` | Scores alternative change sets independently, without writing them. Requires candidate evaluation support. |
| `slots(pool: AutoScheduleSkillPool, requirements: AutoScheduleRequirement[])` | `AutoScheduleSlot[]` | Matches tasks' staffing requirements to eligible resources and existing assignments. Requires staffing support. |
| `suggestAssignments(slots: AutoScheduleSlot[], options?: AutoScheduleSuggestOptions)` | `AutoScheduleSuggestion` | Proposes a change set for staffing slots without writing it. Requires staffing support. |

`Id` is a string or number. See [PlanningEngine](guides/planning-engine.md) for resource scheduling options and provider requirements.

## Scheduling changes {#scheduling-changes}

A change set has optional `tasks`, `links` and `assignments` sections. Each section has optional `add`, `update` and `remove` arrays.

| Section | Add and update | Remove |
| --- | --- | --- |
| `tasks` | A record with `id` and the task fields to write. For an addition, provide `start_date` and either `duration` or `end_date`. Updates can change dates, duration, constraints, whether the task auto-schedules, and leveling fields. Task `text` can be written with `apply()`. | Task IDs. Removing a summary removes its subtree and affected links. |
| `links` | A new link needs `source` and `target`. It can include `id`, `type` and `lag`. An update needs `id` and can change the endpoints, type or lag. An omitted type on add defaults to finish-to-start. | Link IDs. |
| `assignments` | An addition requires `task_id` and `resource_id`. An update requires `id`. See the [resource scheduling options](guides/planning-engine.md#resource-scheduling). | Assignment IDs. |

A task addition can specify `parent`, `type`, `calendar_id`, and `progress`. Task updates cannot change `parent` or `unscheduled`. Use a unique ID for each new task. Gantt generates IDs for added links and assignments that omit an ID. Preview IDs are temporary. Use the IDs returned by `apply()` to identify the saved records.

## Options

- `solve()` accepts `subtree: { task, inclusive? }`. Omit `inclusive` to include the named task itself.
- `preview()` accepts the same subtree selection and can include `interactive: true` to model a user edit, or `analytics: { slack?, criticalPath? }` to calculate analytics for the proposed schedule. Omit the change set or pass `null` to preview scheduling the current chart.
- `analyze()` accepts the same `analytics` option. By default it calculates both slack and the critical path for the accepted chart.
- `apply()` accepts `solve: true` or a solve options object to schedule after writing. Use `level: true` or a leveling options object to level after writing. Choose either `solve` or `level`. With neither, the change set is written without running the scheduler.
- `apply(changes, { interactive: true })` accepts only task updates and schedules as a user edit. It cannot be combined with `solve` or `level`. Use [asUserEdit](guides/auto-scheduling.md#saving-a-custom-form) for a custom form that calls `updateTask()` itself.

With a resource-capable provider, `solve()`, `preview()` and `analyze()` can report `overallocations`. `preview()` also accepts `level` and `profile`. A leveling preview applies to the whole chart and cannot be combined with `subtree`. See [PlanningEngine](guides/planning-engine.md#resource-scheduling).

## Results

`AutoScheduleResult` contains `updates` in planning order, `conflicts`, `cycles` and `converged`. A cycle identifies the affected task and link IDs in `tasks` and `links`. The scheduler writes no dates while the plan contains a cycle. `solve()` and `level()` return `null` if `onBeforeAutoSchedule` cancels or a scheduling run is already in progress.

Each update has `id`, `kind` (`"task"`, `"summary"` or `"milestone"`), `start_date`, `end_date`, `constraint`, and `reason`. The reason's `kind` can be `"asap"`, `"alap"`, `"constraint"`, `"preferred"`, `"summary-translation"` or `"leveling"`. It identifies the driving link or summary when applicable. Summary dates describe the span Gantt derives from the children. Leveling updates can also contain `leveling_delay` and `pauses`.

A conflict has `kind: "constraint-violation"` with `task`, `constraint`, `violation`, `required`, `actual` and optional `links`, or `kind: "calendar-non-working"` with `task`, `proposed` and `snapped`. The calendar variant can occur with [strict_calendar](api/config/auto_scheduling.md#strict_calendar). Conflicts can be reported for a schedule that Gantt writes.

`AutoSchedulePreviewResult` adds:

- An `isNew` flag on each conflict and cycle. It identifies findings absent from the current chart's baseline plan.
- `summary.tasksAffected`, the number of task and milestone updates, and `summary.finishBefore` and `summary.finishAfter`, the latest task end before and after the preview. A chart with no tasks has a `null` finish.
- `analytics`, `profile` and `rounds` when requested by the corresponding preview options.

`AutoScheduleAnalysis` contains `cycles` and `analytics`. Analytics can contain `criticalPath: { tasks, links? }` and `slack: [{ task, total, free }]`. Slack uses [duration_unit](api/config/duration_unit.md). Providers can omit critical link IDs. When cycles prevent an analysis, `analytics.status` is `"invalid"` and the path and slack fields are absent.

`AutoScheduleApplyResult` reports what happened after Gantt validated the change set:

- `status: "applied"` means all writes succeeded. If requested, `scheduled` contains the result of the subsequent schedule or leveling run.
- `status: "stopped"` means a task or link event canceled a write. `stoppedAt` identifies its `section`, `action` and `id`. Earlier writes remain and Gantt skips later writes and scheduling.
- `applied` records the changes written, including generated IDs. An interactive edit can also return `resolution`, which is the final choice or `"pending"` while waiting for a user decision.

`asUserEdit()` returns an object with the same optional `resolution`. Wait for [onAfterAutoScheduleConflictResolve](api/event/onafterautoscheduleconflictresolve.md) if an edit returns `"pending"`.

## Invalid changes and timing

`preview()` rejects malformed changes, such as updates to unknown IDs or a new task without dates. It reports a proposed dependency cycle in the result. `apply()` validates the change set before writing and rejects a new cycle. It also rejects task deletes when [deleteAfterConfirmation](api/other/dataprocessor.md) is enabled.

Call `apply()` or `asUserEdit()` outside an active drag, a batch update, a scheduling run or another scheduling edit. An interactive edit also requires any pending conflict decision to finish first. If a handler throws during the write, the error is propagated and earlier writes can remain. With the Undo plugin enabled, the applied changes and any requested scheduling are grouped as one [undo](guides/undo-ext.md) step.

## Related guides

- [Auto Scheduling](guides/auto-scheduling.md#scheduling-api)
- [PlanningEngine](guides/planning-engine.md)
- [Resource Leveling and Paused Tasks](guides/resource-leveling.md)

### Change log

- Added in v10.1.
