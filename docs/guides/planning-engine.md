---
sidebar_label: PlanningEngine
title: "Using PlanningEngine with Gantt"
description: "Select a scheduling engine and use PlanningEngine for resource leveling, evaluation, and staffing."
---

# Using PlanningEngine with Gantt

:::info
Engine selection requires the Gantt PRO `auto_scheduling` plugin. The PlanningEngine adapter requires a bundle that exposes [Gantt.createPlanningEngine](api/other/gantt.md#createplanningengine).
:::

In v10.1, Gantt uses its built-in v2 engine by default. To extend scheduling with resource leveling, candidate evaluation and staffing, configure your chart to use DHTMLX PlanningEngine.

## Select a provider {#select-a-provider}

Load and initialize a compatible separate PlanningEngine module before creating the chart. It must expose the `Project` constructor accepted by [Gantt.createPlanningEngine](api/other/gantt.md#createplanningengine). Register the provider, enable auto scheduling and select its name in the chart's configuration before initialization.

~~~js
function initWithPlanningEngine(planningEngineModule, projectData) {
    Gantt.registerSchedulingEngine(
        "plen",
        () => Gantt.createPlanningEngine(planningEngineModule)
    );

    gantt.plugins({ auto_scheduling: true });
    gantt.config.auto_scheduling = { enabled: true, engine: "plen" };
    gantt.init("gantt_here");
    gantt.parse(projectData);
}
~~~

Registration is global. Each chart uses its own provider instance. Gantt creates the instance on first use and disposes it when replaced or when the chart is destroyed. Re-registering a name affects later provider instances. The built-in name `"v2"` is reserved. An unregistered name or an incompatible provider raises an error when first used.

### Load project data into Gantt

Pass your application's project data to Gantt in its usual [data format](guides/loading.md).
The module passed to `Gantt.createPlanningEngine()` supplies the engine. The project data goes
to `gantt.parse()`, or you can load it from a server with [gantt.load()](api/method/load.md).
For example, after loading the compatible PlanningEngine module:

~~~js
initWithPlanningEngine(planningEngineModule, {
    tasks: [
        { id: 1, text: "Design", start_date: new Date(2027, 3, 5), duration: 2,
            owner_id: [{ resource_id: 10, value: 8 }] },
        { id: 2, text: "Review", start_date: new Date(2027, 3, 7), duration: 1 }
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
    resources: [{ id: 10, text: "Maya", capacity: 8 }]
});
~~~

When you run a scheduling operation, Gantt builds a model from that chart's tasks,
dependencies, calendars, and scheduling settings. The adapter converts the model to
PlanningEngine's format and passes it to the engine's `Project` API. Calls that use resources
also read the chart's resources and assignments. You only load the project once, into Gantt.
`preview()` models a proposed change without writing it to the chart. `solve()` and `level()`
write the resulting updates to Gantt.

## Capabilities

| Capability | Built-in v2 | PlanningEngine adapter |
| --- | --- | --- |
| Scheduling, previews, slack and critical path | Yes | Yes |
| Resource leveling, load profiles and overload reporting | No | Yes |
| Candidate evaluation | No | Yes |
| Skill matching and assignment proposals | No | Yes |

A call requiring an unsupported capability raises an error. PlanningEngine also rejects unsupported chart settings, including week, month or year duration units, a duration step other than 1, per-weekday calendar hours that vary, and dates with seconds. Resource operations have additional assignment and capacity restrictions. Leveling supports forward scheduling only.

The selected engine supplies slack, critical path and cycle analysis. The legacy two-task [getSlack](api/method/getslack.md) call continues to use Gantt's own calculation. Results can differ between providers. If the PlanningEngine adapter detects a dependency cycle, slack and critical path analysis are unavailable for the chart. The adapter omits the dependency IDs for constraint conflicts, so the conflict dialog cannot offer to deactivate a dependency in that case.

## Resource scheduling {#resource-scheduling}

Use [ext.autoScheduling](api/other/autoscheduling-ext.md) to inspect or level resource load. Load
tasks, resources, and their assignments first. Keep
[process_resource_assignments](api/config/process_resource_assignments.md) enabled so resource
operations can read the assignment store, including when you only preview a change.

PlanningEngine checks the existing data when it reads the resource model. Assignments must use
`"default"` or `"fixedDuration"` mode. Calls can fail if an existing assignment uses
`"fixedDates"`, even if the call leaves that assignment unchanged. Resource capacity,
assignment value, delay, and fixed duration must be finite, nonnegative numbers when supplied.

~~~js
const scheduling = gantt.ext.autoScheduling;
const proposal = scheduling.preview(null, {
    level: { allowSplits: false },
    overallocations: true
});

const result = scheduling.level({ allowSplits: false });
~~~

`preview()` returns the proposed result without changing the chart. `level()` writes the new dates, delays and pauses using Gantt's scheduling events and groups the changes when the Undo plugin is enabled. It returns the remaining `overallocations` and the number of leveling passes in `rounds`. For more on saving the result, see [Resource Leveling and Paused Tasks](guides/resource-leveling.md).

| Leveling option | Meaning |
| --- | --- |
| `scope` | Restrict leveling to selected `resources`, `tasks` or overbooked periods between `from` and `to`. The dates select the overloads to address. A task can move outside that period. |
| `basis` | Use `"hour"` or `"day"` buckets. The default derives from the chart's duration unit. |
| `order` | Choose which tasks give way using `"id"`, `"priority"`, or the default `"standard"` order, which considers successors, slack, start date, then priority. |
| `withinSlackOnly` | Set to `true` to keep the project end date. Defaults to `false`. |
| `clearFirst` | Set to `false` to start from the existing delays and pauses. By default, Gantt clears them for movable tasks in scope before leveling. |
| `allowSplits` | Set to `false` to delay whole tasks. Defaults to `true`, which allows pauses within tasks. |
| `step` | Use `"skip"` to move past an entire overbooked interval at once. The default `"minimal"` uses the smallest step. |

Use `overallocations: true` with `solve()`, `analyze()` or `preview()` to report overbooked periods. Each result identifies a resource and its `windows`, including dates, capacity, peak, total overload and affected tasks. Leveling can also report why an overload remains.

Add `profile: { from, to, resources?, basis?, tasks? }` to `preview()` to return load and capacity for each bucket whose start lies in `[from, to)`. The optional `tasks` field is `"none"` by default. Use `"overallocated"` or `"all"` to include the contributing tasks. Load and capacity use the same unit as assignment values.

Assignment edits support `value` (default 8), `mode` (`"default"` or `"fixedDuration"`), `delay` (working time from task start, default 0), and `duration` (required for `"fixedDuration"`). See the [change set reference](api/other/autoscheduling-ext.md#scheduling-changes) for required IDs.

## Compare alternative plans

Pass an array of `{ id, changes }` candidates to `evaluate()`. Each candidate is compared independently against the current chart. Set `level: true` or pass leveling options to compare the leveled alternatives as well. Use `focus` to include metrics for specific task IDs. With leveling, `clearFirst: true` compares candidates from a baseline without the existing delays and pauses of movable tasks.

~~~js
const comparison = gantt.ext.autoScheduling.evaluate([
    { id: "extend-review", changes: { tasks: { update: [{ id: 5, duration: 4 }] } } },
    { id: "delay-handoff", changes: { links: { update: [{ id: 7, lag: 1 }] } } }
], { level: true, focus: [5] });
~~~

The result includes `baseline` metrics and a `candidates` array in the input order. A candidate can return an `error` instead of metrics. Compare the finish dates, overloads, conflicts and cycles in each candidate's `scheduled` or `leveled` result. Lower `cost` represents a better score according to this provider.

## Propose resource assignments

Use `slots(pool, requirements)` to identify eligible workers and existing assignments, then `suggestAssignments(slots, options?)` to propose a staffing change set. The pool has a `workers` array. Each worker has a chart `resource` ID and optional `skills` with `id` and `value`. Each requirement has a stable `id`, a `task` ID, and `matches` conditions. A condition has a `skill` ID, optional `value` (default 1) and optional `op` (`"at_least"` by default, `"no_more"` or `"equal"`). A requirement can also set `count` (default 1), `units` (default 8), and existing assignment IDs in `assignments`.

~~~js
const scheduling = gantt.ext.autoScheduling;
const slots = scheduling.slots({
    workers: [
        { resource: 2, skills: [{ id: "review", value: 2 }] },
        { resource: 3, skills: [{ id: "review", value: 1 }] }
    ]
}, [
    { id: "design-review", task: 5, matches: [{ skill: "review" }] }
]);

const proposal = scheduling.suggestAssignments(slots);
const preview = scheduling.preview(proposal.changes);
~~~

By default, the proposal fills empty slots. Set `targets` to include `"broken"` to replace ineligible assignments or `"valid"` to consider changes to eligible assignments. Use `fixed` to protect selected assignment IDs, `passes` to control optimization passes, and `newResourcePenalty` to account for bringing in new people. With `level`, the provider scores each proposed step after leveling. `clearFirst` with `level` also puts the removal of previous movable-task delays and pauses in the returned change set.

Review `steps`, `unfilled`, `invalid`, and the `baseline` and `proposed` metrics before writing the change set. Apply an accepted proposal with `scheduling.apply(proposal.changes)`. Include `{ level: true }` if the application should also write a leveled schedule.
