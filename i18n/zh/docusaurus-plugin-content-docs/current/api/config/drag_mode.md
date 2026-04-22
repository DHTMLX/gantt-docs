---
sidebar_label: drag_mode
title: drag_mode 配置
description: "存储可用拖拽模式的类型"
---

# drag_mode

### Description

@short: 存储可用拖拽模式的类型

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

你不应更改现有拖拽模式的名称。否则，该功能将无法工作。但如果你想实现自定义行为，可以添加新的属性。
如果你想禁用某个特定的拖拽模式，最好使用 [drag_move](api/config/drag_move.md)、[drag_resize](api/config/drag_resize.md)、[drag_progress](api/config/drag_progress.md) 配置。

- **resize** - (*string*) - 当用户拖动任务条以改变其持续时间时的模式。
- **progress** - (*string*) - 当用户拖动任务条的进度旋钮时的模式。
- **move** - (*string*) - 当用户拖动任务条以替换它时的模式。
- **ignore** - (*string*) - 限制拖拽操作的服务模式。