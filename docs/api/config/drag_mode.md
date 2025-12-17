---
sidebar_label: drag_mode
title: drag_mode config
description: "stores the types of available drag-and-drop modes"
---

# drag_mode

### Description

@short: Stores the types of available drag-and-drop modes

@signature: drag_mode: \{ resize?: string; progress?: string; move?: string; ignore?: string; \}

### Example

~~~jsx
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
~~~

**Default value:**\{
	"resize":"resize",
	"progress":"progress",
	"move":"move",
	"ignore":"ignore"
\}

### Details

You shouldn't change the existing names of the drag modes. Otherwise, that functionality will stop working. But you can add new properties if you want to implement custom behavior.
If you want to disable a particular drag mode, it is better to use the [drag_move](api/config/drag_move.md), [drag_resize](api/config/drag_resize.md), [drag_progress](api/config/drag_progress.md) configs.

- **resize** - (*string*) - the mode when the user drags a task bar to change its duration.
- **progress** - (*string*) - the mode when the user drags the progress knob of a task bar.
- **move** - (*string*) - the mode when the user drags a task bar to replace it.
- **ignore** - (*string*) - the service mode which restricts the drag-and-drop action.

