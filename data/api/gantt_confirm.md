confirm
=============

@short:
	calls a confirm message box

@params:

- config		object			the confirm box's configuration


@example:
gantt.confirm({
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
@relatedapi:
- api/gantt_alert.md
- api/gantt_message.md
- api/gantt_modalbox.md
@related:desktop/message_boxes.md
@changelog:
added in version 4.0