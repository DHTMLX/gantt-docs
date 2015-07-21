onCircularLinkError
=============

@short:
	fires when the circular reference has been detected and auto scheduling is not possible

@params:

- link 			object			the link object

@example:
gantt.attachEvent("onCircularLinkError",function(link){
	// any custom logic here
});

@template:	api_event
@descr:

@related:
desktop/auto_scheduling.md

@relatedsample:

02_extensions/12_auto_scheduling.html

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md