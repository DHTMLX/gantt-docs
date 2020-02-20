confirm
=============

@short:
	calls a confirm message box

@params:

- config		object			the confirm box's configuration


@returns:

- div			HTMLElement		the div container of the confirm box

@example:
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            gantt.message("Yes!");
        }else{
            gantt.message("No...");
        }
    }
});

@template:	api_method
@descr:
For details about supported configuration options of a confirm message box, see the desktop/message_boxes.md article.

@relatedapi:
- api/gantt_alert.md
- api/gantt_message.md
- api/gantt_modalbox.md

@related:desktop/message_boxes.md
@changelog:
added in version 4.0