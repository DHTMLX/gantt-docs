quick_info_detached
=============

@short:defines whether the task form will appear from the left/right side of the screen or near the selected task
	

@require:quick_info
@type: boolean
@default:true (<i>the event form will appear  near the selected event</i>)
@example:
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");


@template:	api_config
@descr:

{{note This option is defined in the **Quick Info** extension, so you need to activate the [quick_info](desktop/extensions_list.md#quickinfo) plugin.}}




@related:
desktop/extensions_list.md#quickinfo

@relatedsample:
02_extensions/01_quickinfo.html

@relatedapi:
api/gantt_showquickinfo.md
api/gantt_hidequickinfo.md
api/gantt_quickinfo_buttons_config.md
api/gantt_onquickinfo_event.md
api/gantt_onafterquickinfo_event.md
