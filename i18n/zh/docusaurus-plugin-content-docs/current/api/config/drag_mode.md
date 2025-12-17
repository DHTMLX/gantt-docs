---
sidebar_label: drag_mode
title: drag_mode config
description: "包含不同类型的拖放模式"
---

# drag_mode

### Description

@short: 包含不同类型的拖放模式

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

**Default value:** \{
  "resize":"resize",
  "progress":"progress",
  "move":"move",
  "ignore":"ignore"
\}

### Details

重要的是不要更改现有的drag_mode名称，因为这样会破坏相关功能。不过，如果需要支持自定义行为，可以添加新的属性。
如果需要禁用特定的drag_mode，建议使用[drag_move](api/config/drag_move.md)、[drag_resize](api/config/drag_resize.md)或[drag_progress](api/config/drag_progress.md)设置。

- **resize** - (*string*) - 该模式允许用户拖动任务条以调整其持续时间。
- **progress** - (*string*) - 该模式允许用户拖动任务条上的进度控制点。
- **move** - (*string*) - 该模式允许拖动任务条以重新定位它。
- **ignore** - (*string*) - 一种特殊模式，禁用拖放操作。

