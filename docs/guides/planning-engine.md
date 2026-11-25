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
Gantt.registerSchedulingEngine(
    "plen",
    () => Gantt.createPlanningEngine(planningEngineModule)
);

gantt.plugins({ auto_scheduling: true });
gantt.config.auto_scheduling = { enabled: true, engine: "plen" };
gantt.init("gantt_here");
~~~


Registration is global. Each chart uses its own provider instance. Gantt creates the instance on first use and disposes it when replaced or when the chart is destroyed. Re-registering a name affects later provider instances. The built-in name `"v2"` is reserved. An unregistered name or an incompatible provider raises an error when first used.

## Where scheduling data comes from {#scheduling-data}

PlanningEngine schedules the data loaded into the chart. You do not pass project data to the provider or to the [ext.autoScheduling](api/other/autoscheduling-ext.md) methods.

- Load tasks, links, resources and assignments into Gantt in its usual [data format](guides/loading.md), with [gantt.parse()](api/method/parse.md) or [gantt.load()](api/method/load.md).
- Each call reads the chart as it is at that moment: its tasks, links, calendars and scheduling settings. Calls that use resources also read the chart's resources and assignments. Later edits and reloads are used by the next call without any extra step.
- The methods take options and, where supported, a [change set](api/other/autoscheduling-ext.md#scheduling-changes). A change set adds, updates or removes tasks, links and assignments relative to the chart. Use it to schedule a proposed change without loading it.
- `preview()`, `analyze()`, `evaluate()`, `slots()` and `suggestAssignments()` write nothing. `solve()`, `level()` and `apply()` write to the chart.

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Design", start_date: new Date(2027, 3, 5), duration: 2,
            owner_id: [{ resource_id: 10, value: 8 }] },
        { id: 2, text: "Review", start_date: new Date(2027, 3, 7), duration: 1 }
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
    resources: [{ id: 10, text: "Maya", capacity: 8 }]
});

const scheduling = gantt.ext.autoScheduling;
const changes = {
    tasks: { add: [{ id: 3, text: "QA", start_date: new Date(2027, 3, 8), duration: 1 }] },
    links: { add: [{ source: 2, target: 3 }] }
};

// The chart plus the new task, scheduled. Nothing is written.
const proposal = scheduling.preview(changes);

// Write the task and link, then schedule the chart.
scheduling.apply(changes, { solve: true });
~~~

With auto scheduling enabled, Gantt schedules the data when it is parsed. See [schedule_on_parse](api/config/auto_scheduling.md#schedule_on_parse). A `preview()` result shows the dates that the change set would produce. Only `apply()` adds the task and link to the chart. A `solve()` call without changes schedules the chart as loaded, so it would not include task 3.

### Schedule data that is not in the chart {#separate-dataset}

To schedule a dataset without adding it to your chart, load it into a separate Gantt instance. For example, use this for a scenario from your server or a project you plan to import. Without a `container`, [Gantt.getGanttInstance()](guides/multiple-gantts.md) initializes the instance without rendering it. Give it the same plugin, provider, working time, calendars and duration unit as your chart. Then call the scheduling methods on that instance, read the result with [serialize()](api/method/serialize.md), and release the instance with [destructor()](api/method/destructor.md).

~~~js
function levelDataset(dataset, datasetCalendars) {
    const scratch = Gantt.getGanttInstance({
        plugins: { auto_scheduling: true },
        config: {
            work_time: gantt.config.work_time,
            duration_unit: gantt.config.duration_unit,
            auto_scheduling: { enabled: true, engine: "plen" }
        },
        calendars: datasetCalendars // the calendars that the dataset uses
    });

    try {
        scratch.parse(dataset);
        const result = scratch.ext.autoScheduling.level({ allowSplits: false });
        return { result, data: scratch.serialize() };
    } finally {
        scratch.destructor();
    }
}
~~~

Calls on the separate instance read and write only that instance. Your chart and its data processor are not affected. The instance gets its own provider instance, which Gantt disposes with it.

## Capabilities

| Capability | Built-in | PlanningEngine adapter |
| --- | --- | --- |
| Scheduling | Yes | Yes |
| Previews | Yes | Yes |
| Slack | Yes | Yes |
| Critical path | Yes | Yes |
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
