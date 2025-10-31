auto_scheduling_project_constraint
=============

@short: defines whether tasks should inherit the constraint type from their parent project
	

@type: boolean
@default: false

@example:
gantt.config.auto_scheduling_project_constraint = true;

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin. Read the details in the desktop/auto_scheduling.md article.}}

By default, the constraint type of the parent project doesn't affect the constraint type of its nested tasks.

If you set the config to *true*, the child tasks (except for tasks with their own constraint type) will have the same constraint type as their parent project (for example, **finish no later than**).

@relatedsample: 
02_extensions/19_constraints_scheduling.html

@related: desktop/auto_scheduling.md

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_auto_scheduling_use_progress_config.md
- api/gantt_findcycles.md
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@changelog: added in v8.0

the property has been deprecated in v9.1

@deprecated: The property has been deprecated in v9.1, use `project_constraint` property of api/gantt_auto_scheduling_config.md#projectconstraint instead.


@edition:pro