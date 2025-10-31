auto_scheduling
=============

@short:
	enables auto scheduling

@type: AutoSchedulingConfig | boolean
@default: object
@example:
gantt.config.auto_scheduling = {
  	enabled: true,
  	strict: true
};

gantt.init("gantt_here");


@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin. Read the details in the desktop/auto_scheduling.md article.}}


While `auto_scheduling` config can be set as a boolean, usage of the object definition is the recommended approach for configuring the auto-scheduling behavior. 


When set as an object, the following options are available:

<span id="enabled"></span>
###enabled

**Type**: boolean

**Default**: `false`

Turns auto-scheduling on or off (same as using a boolean value directly).

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

<span id="applyconstraints"></span>
###apply_constraints

**Type**: boolean

**Default**: `true`

Enables or disables usage of time constraints for auto scheduling.

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

Setting the value to `false` switches auto scheduling to the mode that ignores constraints associated with tasks (e.g. ASAP, ALAP, SNET, etc.) and scheduling depends solely on task dependencies.

This property replaces the deprecated api/gantt_auto_scheduling_compatibility_config.md setting.

{{editor	02_extensions/12_auto_scheduling.html		Basic Scheduling}}

{{editor	02_extensions/19_constraints_scheduling.html		Constraint Scheduling}}

<span id="gapbehavior"></span>
###gap_behavior

**Type**: String

**Allowed values**: `"preserve"`|`"compress"`

**Default**: `"preserve"`


Defines how Gantt handles gaps between dependent tasks during scheduling.

- **"preserve"** - keeps tasks in their current positions if there are no conflicts
- **"compress"** - moves tasks to the earliest allowed date (or latest if `schedule_from_end` is enabled)

By default, tasks are only rescheduled when their current date violates a constraint or dependency. 

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

<span id="descendantlinks"></span>
###descendant_links###


**Type**: boolean

**Default**: `false`

Allows or forbids creating links between parent tasks (projects) and their subtasks.

By default, such links can't be created.

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    descendant_links: true
};
~~~

<span id="scheduleonparse"></span>
###schedule_on_parse


**Type**: boolean

**Default**: `true`

Defines whether Gantt will do auto-scheduling on data loading/parsing.

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: false
};
~~~

<span id="moveprojects"></span>
###move_projects

**Type**: boolean

**Default**: `true`

By default (when the property is set to *true*), the whole project is moved during auto scheduling. It means that all tasks in the project remain on their places
relative to each other and the beginning of the project.

<img src="api/moving_project_true.png">

If the *move_projects* property is set to *false*, auto scheduling will move separate tasks inside of the project. Thus, some tasks will be moved, others will
remain on their places.

<img src="api/moving_project_false.png">

<br>
**Note**, if you use the constraint scheduling (*apply_constraints: true*), the *move_projects* config will be active only when the `gap_behavior` property is set to "preserve"`:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: true,
    move_projects: true,
    gap_behavior: "preserve"
};
~~~

<span id="useprogress"></span>
###use_progress

**Type**: boolean

**Default**: `false`

Specifies whether completed tasks should affect scheduling and critical path calculations.

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
~~~

When the property is enabled, the critical path, slack, and auto scheduling algorithms will take the value of the task progress into account, similar to how these methods work in MS Project, namely:

1) Completed tasks (completed tasks - the tasks with 100% progress) always have zero slack;

2) Completed tasks are excluded from the auto scheduling calculations. Relations that connect predecessors to completed tasks are ignored;

3) Completed tasks can't be critical.

{{editor	https://snippet.dhtmlx.com/ju3km1uy		Use progress for auto-scheduling, critical path and slack calculations}}

<span id="schedulefromend"></span>
###schedule_from_end

**Type**: boolean

**Default**: `false`

Enables backward scheduling.

Setting this config to `true` will switch auto scheduling to the `as late as possible` mode.

The value will be only applied if api/gantt_project_end_config.md is specified as well. 

~~~js
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

{{editor	02_extensions/20_backwards_scheduling.html		Backward Scheduling}}

<span id="projectconstraint"></span>
###project_constraint

**Type**: boolean

**Default**: `false`

Defines whether tasks should inherit the constraint type from their parent project.

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

By default, the constraint type of the parent project doesn't affect the constraint type of its nested tasks.

If you set the config to *true*, the child tasks (except for tasks with their own constraint type) will have the same constraint type as their parent project (for example, **finish no later than**).

{{editor	02_extensions/19_constraints_scheduling.html		Constraint Scheduling}}

<span id="showconstraints"></span>
###show_constraints

**Type**: boolean

**Default**: `false`

Controls the display of task constraints on the Gantt chart.
Set to `true` to display constraints or `false` to hide them.

For example, to enable auto-scheduling but disable the display of task constraints:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    show_constraints: false
};
gantt.init("gantt_here");
~~~

{{editor	02_extensions/19_constraints_scheduling.html		Constraints Scheduling }}

@related:
desktop/auto_scheduling.md

@relatedsample:

02_extensions/12_auto_scheduling.html

@relatedapi:
- api/gantt_project_start_config.md
- api/gantt_project_end_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_project_constraint_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_auto_scheduling_use_progress_config.md
- api/gantt_constraint_types_config.md
- api/gantt_findcycles.md
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:pro

@changelog:
- since v9.1, using the object configuration for `auto_scheduling` is the recommended approach
- сan be set as an object since v9.0
