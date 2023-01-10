show_unscheduled
=============


@short:
	enables showing unscheduled tasks 

@type: boolean
@default:true
@example:
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
@template:	api_config
@descr:
Note, that by default, the unscheduled tasks are displayed as an empty row. To display them in the timeline area, you need to set the value of the **show_unscheduled** property to *false*.
This may be confusing to you, but we will fix the inconsistency between the name of the property and its values in one of the future versions.

@related:
desktop/crud_task.md#addingunscheduledtasks

@relatedsample:
01_initialization/19_tasks_without_dates.html

@relatedapi:

api/gantt_task_unscheduled_time_template.md