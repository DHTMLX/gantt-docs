onQuickInfo
=============
    
@short:
	fires when the pop-up edit form appears

@params:
- taskId		string			the task id

@example:
gantt.attachEvent("onQuickInfo",function(taskId){
    // your code here
});

@template:	api_event
@descr:

{{note This event is defined in the **ext/dhtmlxgantt_quick_info.js** extension, so you need to include it on the page.}}



@descr:
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
api/gantt_onafterquickinfo_event.md
