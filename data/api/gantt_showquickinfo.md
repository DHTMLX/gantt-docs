showQuickInfo
=============
@short:displays the pop-up task form for the specified task
	
@params: 
- id	string, number 	the task id

@example: 
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

window.setTimeout(function(){
	gantt.showQuickInfo(10);	
},1);	


@template:	api_method
@descr:

{{note This method is defined in the **ext/dhtmlxgantt_quick_info.js** extension, so you need to include it on the page.}}


@relatedapi:
	api/gantt_hidequickinfo.md
    api/gantt_quick_info_detached_config.md
    api/gantt_quickinfo_buttons_config.md
    api/gantt_onquickinfo_event.md
    api/gantt_onafterquickinfo_event.md
    
@related:
desktop/extensions_list.md#quickinfo

@relatedsample:
02_extensions/01_quickinfo.html