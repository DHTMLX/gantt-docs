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
The property is readonly.

- "resize" - the mode when the user drags a task bar to change its duration.
- "progress" - the mode when the user drags the progress knob of a task bar.
- "move" - the mode when the user drags a task bar to replace it.
- "ignore" - the service mode which restricts the drag-and-drop action.