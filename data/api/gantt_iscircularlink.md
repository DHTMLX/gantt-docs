isCircularLink
=============


@short:
	checks whether the link is circular

@params:

- link			Link		the link object

@returns:

- state			boolean		true, if the link is circular, otherwise false


@example:

var isCircular = gantt.isCircularLink(link);

@template:	api_method
@descr:

{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin to be activated.}}

@related:
desktop/auto_scheduling.md

@relatedsample:
02_extensions/12_auto_scheduling.html

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_project_constraint_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_auto_scheduling_use_progress_config.md
- api/gantt_findcycles.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_onautoschedulecircularlink_event.md
- api/gantt_oncircularlinkerror_event.md

@edition:pro

@changelog:
added in version 4.1