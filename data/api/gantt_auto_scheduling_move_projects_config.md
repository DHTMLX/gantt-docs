auto_scheduling_move_projects
=============

@short:
	defines whether the whole project will be moved (see the details below)

@type: boolean
@example:

gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");

@default:true

@template:	api_config
@descr:
added in version 4.1

By default (when the property is set to *true*), the whole project is moved during auto scheduling. It means that all tasks in the project remain on their places
relative to each other and the beginning of the project.

<img src="api/moving_project_true.png">

If the *auto_scheduling_move_projects* is set to *false*, auto scheduling will move separate tasks inside of the project. Thus, some tasks will be moved, others will
remain on their places.

<img src="api/moving_project_false.png">

@related:
desktop/auto_scheduling.md

@relatedsample:

02_extensions/12_auto_scheduling.html

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_initial_config.md
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
