onCircularLinkError
=============

@short:
	fires when the circular reference has been detected and auto scheduling is not possible

@params:

- link 			Link			the link object
- group			object 			a group of tasks and links connected in a loop

@example:
gantt.attachEvent("onCircularLinkError",function(link, group){
	// any custom logic here
});

@template:	api_event
@descr:

The **group** parameter presents an object which includes a group of tasks and links connected in a loop.

~~~js
{ 
	tasks: [//ids of tasks connected in a loop], 
    links: [//ids of links connected in a loop]
}
~~~

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
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:pro

@changelog:
The **group** parameter is added in version 4.1.