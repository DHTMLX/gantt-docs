onBeforeCollapse
=============

@short:
	 before gantt exits the fullscreen mode and goes back to normal mode

@params:

@example:
gantt.attachEvent("onBeforeCollapse",function(){
    // any custom logic here    
    return true;
});

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@template:	api_event
@descr:
The event is blockable. Returning *false* will cancel further processing.

{{note This event is defined in the **ext/dhtmlxgantt_fullscreen.js** extension, so you need to include it on the page. Read the details in the desktop/fullscreen_mode.md article.}}




@related:

desktop/fullscreen_mode.md

@relatedsample:

02_extensions/11_full_screen.html

@relatedapi:

- api/gantt_onbeforeexpand_event.md
- api/gantt_oncollapse_event.md
- api/gantt_onexpand_event.md
- api/gantt_collapse.md
- api/gantt_expand.md