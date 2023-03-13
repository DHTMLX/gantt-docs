onBeforeAutoSchedule
=============

@short:
	fires before auto scheduling 

@params:
- taskId		string,number		the root task id

@returns:  
- result     	boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
	// any custom logic here
    return true;
});

@template:	api_event

@descr:
{{pronote This functionality is available in the PRO edition only.}}
{{note This event is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin. Read the details in the desktop/auto_scheduling.md article.}}


The event is blockable. Returning *false* will cancel further processing.


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
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:
pro