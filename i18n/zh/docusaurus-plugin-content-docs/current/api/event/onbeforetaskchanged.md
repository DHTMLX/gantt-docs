---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "在用户完成拖拽并释放鼠标按钮后触发，但在任何更改应用之前触发"
---

# onBeforeTaskChanged

### Description

@short: 在用户完成拖拽并释放鼠标按钮后触发，但在任何更改应用之前触发

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务的ID
- `mode` - (required) *string* - 拖拽模式（"resize"、"progress"、"move"、"ignore"）
- `task` - (required) *Task* - 任务对象的原始状态副本（拖拽前的状态）

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

- 当任务在时间轴区域内被拖拽时触发该事件。
- 通过返回 *false* 可以阻止该事件，从而取消拖拽操作。
- 该事件在 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 事件之前触发。

**task** 参数表示任务的原始（未更改）对象，而通过 **gantt.getTask(id)** 访问的任务数据则反映了更新后的状态。
这使得可以比较以检测拖拽过程中发生了哪些变化，比如持续时间是增加还是减少，开始日期是向前还是向后移动。<br>
从该事件返回 *false* 会使甘特图中的任务恢复到原始任务值。

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)

