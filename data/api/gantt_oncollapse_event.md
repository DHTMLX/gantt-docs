onCollapse
=============

@short:
	fires when gantt went back to normal mode from the full screen mode

@params:


@example:
gantt.attachEvent("onCollapse", function (){
    // any custom logic here
});

@template:	api_event
@descr:

{{note This event is defined in the **ext/dhtmlxgantt_fullscreen.js** extension, so you need to include it on the page. Read the details in the desktop/fullscreen_mode.md article.}}




@related:

desktop/fullscreen_mode.md

@relatedsample:

02_extensions/11_full_screen.html


@relatedapi:

- api/gantt_onexpand_event.md
- api/gantt_onbeforecollapse_event.md
- api/gantt_onbeforeexpand_event.md
- api/gantt_collapse.md
- api/gantt_expand.md
