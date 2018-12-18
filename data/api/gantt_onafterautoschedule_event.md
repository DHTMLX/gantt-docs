onAfterAutoSchedule
=============

@short:
	fires when autoscheduling is done 

@params:
- taskId			string,number			the root task id
- updatedTasks		array					an array with the ids of rescheduled tasks


@example:
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
	// any custom logic here
});


@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This event is defined in the **ext/dhtmlxgantt_auto_scheduling.js** extension, so you need to include it on the page. Read the details in the desktop/auto_scheduling.md article.}}


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
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:
pro