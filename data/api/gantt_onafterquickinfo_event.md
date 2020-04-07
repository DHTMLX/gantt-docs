onAfterQuickInfo
=============

@short:
	fires after the pop-up edit form is closed

@params:
- taskId		string			the task id

@example:
gantt.attachEvent("onAfterQuickInfo",function(taskId){
	// your code here
});

@template:	api_event
@descr:

{{note This event is defined in the **quick_info.js** extension, so you need to activate the [quick_info](desktop/extensions_list.md#quickinfo) plugin.}}


added in version 4.1

@related:
desktop/extensions_list.md#quickinfo

@relatedsample:
02_extensions/01_quickinfo.html

@relatedapi:
api/gantt_showquickinfo.md
api/gantt_hidequickinfo.md
api/gantt_quick_info_detached_config.md
api/gantt_quickinfo_buttons_config.md
api/gantt_onquickinfo_event.md