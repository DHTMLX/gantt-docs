auto_scheduling_use_progress
=============

@short:
	sets the way the scheduling algorithms process completed tasks 

@type: boolean
@default:false
@example:
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This config is defined either in the **auto_scheduling** or **critical_path** extension, so you need to activate either the [auto_scheduling](desktop/extensions_list.md#autoscheduling) or [critical_path](desktop/extensions_list.md#criticalpath) plugin. Read the details in the desktop/auto_scheduling.md and desktop/critical_path.md articles.}}

When the property is enabled, the critical path, slack, and auto scheduling algorithms will take the value of the task progress into account, similar to how these methods work in MS Project, namely:

1) Completed tasks (completed tasks - the tasks with 100% progress) always have zero slack;

2) Completed tasks are excluded from the auto scheduling calculations. Relations that connect predecessors to completed tasks are ignored;

3) Completed tasks can't be critical.

{{editor	https://snippet.dhtmlx.com/ju3km1uy		Use progress for auto-scheduling, critical path and slack calculations}}


@related:
desktop/auto_scheduling.md
desktop/critical_path.md

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_project_constraint_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_findcycles.md
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:
pro

@changelog: added in v8.0