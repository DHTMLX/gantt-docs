onAfterTaskAutoSchedule
=============

@short:
	fires for each task which has been autoscheduled

@params:
- task					object					the task object
- start					Date					a new start date
- link					object					the link object that creates the constraint 
- predecessor			object					the predecessor task object


@example:

gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // any custom logic here
});

@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}

@related:
desktop/auto_scheduling.md

@relatedsample:
02_extensions/12_auto_scheduling.html

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_findcycles.md
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:
pro