drag_mode
=============
@short:stores the types of available drag-and-drop modes
	

@type:object 
@default:
{
	"resize":"resize",
	"progress":"progress",
	"move":"move",
	"ignore":"ignore"
}
	
@example:
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    const modes = gantt.config.drag_mode;
    switch (mode){
        case modes.move:
        
        break;
        case modes.resize:
        
        break;
        case modes.progress:
        
        break;
    
    }
    //...
});

@template:	api_config
@descr:
You shouldn't change the existing names of the drag modes. Otherwise, that functionality will stop working. But you can add new properties if you want to implement custom behavior.
If  you want to disable the specific drag mode, it is better to use the [drag_move](api/gantt_drag_move_config.md), [drag_resize](api/gantt_drag_resize_config.md), [drag_progress](api/gantt_drag_progress_config.md) configs.

- <span class=subproperty>**resize**</span> - (*string*) - the mode when the user drags a task bar to change its duration.
- <span class=subproperty>**progress**</span> - (*string*) - the mode when the user drags the progress knob of a task bar.
- <span class=subproperty>**move**</span> - (*string*) - the mode when the user drags a task bar to replace it.
- <span class=subproperty>**ignore**</span> - (*string*) - the service mode which restricts the drag-and-drop action.

