onAfterTaskAutoSchedule
=============

@short:
	fires for each task which has been autoscheduled

@params:
- task					Task					the task object
- start					Date					a new start date
- link					Link					the link object that creates the constraint 
- predecessor			Task					the predecessor task object


@example:

gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // any custom logic here
});

@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}
{{note This event is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin. Read the details in the desktop/auto_scheduling.md article.}}


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
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:
pro