auto_scheduling_descendant_links
=============


@short: allows or forbids creation of links from parent tasks (projects) to their children
	

@type: boolean
@default: false
@example:
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");


@template:	api_config
@descr:
By default, links from parent tasks (projects) to their children can't be created.

@changelog:
added in version 4.0

@related:
desktop/auto_scheduling.md

@relatedsample:

02_extensions/12_auto_scheduling.html

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_move_projects_config.md
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