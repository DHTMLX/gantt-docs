---
title: "在时间轴中拖动任务"
sidebar_label: "在时间轴中拖动任务"
---

# 在时间轴中拖动任务

拖动功能可以轻松调整任务的开始或结束日期，以及任务的持续时间。


默认情况下，拖拽功能是启用的，允许用户在时间轴的行内移动任务。

如需定制拖拽行为，可以使用以下事件:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - 用于阻止特定任务的拖动
- [onTaskDrag](api/event/ontaskdrag.md) - 用于限制拖动区域或在任务拖动过程中应用自定义逻辑
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - 用于处理任务被移动后的操作

以下是一些常见的自定义拖动行为的场景:

1. [阻止特定任务被拖动](#denyingdraggingofspecifictasks)。
2. [防止任务被拖动到特定日期范围之外](#denyingdraggingtasksoutofspecificdates)。
3. [拖动父任务时同时拖动子任务](#draggingchildrentogetherwiththeparent)。
4. [拖动项目时同时拖动其子任务](#draggingprojectswithsubtasks)。
5. [设置任务的最小持续时间](#settingminimaltaskduration)。
6. [拖动任务时启用自动滚动](#autoscrollduringtasksdragging)。

## 阻止特定任务被拖动

要禁用某些任务的拖动，可以使用 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(gantt.getGlobalTaskIndex(id)%2==0){
        return false;      // 如果全局任务索引为偶数，则阻止拖动
    }
    return true;           // 如果全局任务索引为奇数，则允许拖动
});
~~~

## 防止任务被拖动到特定日期范围之外

如需限制任务只能在指定日期范围内拖动，可以使用 [onTaskDrag](api/event/ontaskdrag.md) 事件。

<p style="margin-top: 20px; font-weight: bold;"> onTaskDrag 事件说明: </p>

<ul style="margin-top:5px;">
  <li>每当用户在时间轴中拖动、调整大小或更新任务进度时都会触发。</li>
  <li>拖动操作的类型作为第二个参数 <b>mode</b> 提供。</li> 
  <li>所有可能的拖动模式在 [drag_mode](api/config/drag_mode.md) 属性中有列出。</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">简要流程如下:</p>

<ol style="margin-top:5px;">
  <li>用户拖动任务。</li>
  <li>dhtmlxGantt 根据新位置重新计算任务日期。</li>
  <li>dhtmlxGantt 触发 [onTaskDrag](api/event/ontaskdrag.md) 事件。</li>
  <li>dhtmlxGantt 在图表中重绘任务。<i>由于 [onTaskDrag](api/event/ontaskdrag.md) 事件在重新计算之后触发，可以放心地在事件处理器中为被拖动的任务设置自定义值，无需担心被覆盖。这样可以确保任务显示在您希望的位置。</i></li>
</ol>


例如，要防止用户将任务拖动到 **"2020年3月31日 - 2020年4月11日"** 之外的范围:

![custom_dnd](/img/custom_dnd.png)

可以使用如下代码:

[限制任务拖动区间 - [31.03.2020, 11.04.2020]](限制任务拖动区间 - [31.03.2020, 11.04.2020])
~~~js
var leftLimit = new Date(2020, 2 ,31), rightLimit = new Date(2020, 3 ,12);

gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move || mode == modes.resize){
    
        var diff = original.duration*(1000*60*60*24);
       
        if(+task.end_date > +rightLimit){
            task.end_date = new Date(rightLimit);
            if(mode == modes.move)
                task.start_date = new Date(task.end_date - diff);
            }
        if(+task.start_date < +leftLimit){
            task.start_date = new Date(leftLimit);
            if(mode == modes.move)
                task.end_date = new Date(+task.start_date + diff);
        }
    }
});
~~~


[Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)


## 拖动父任务时同时拖动子任务

如需在父任务被移动时同时拖动其所有子任务，可以使用 [onTaskDrag](api/event/ontaskdrag.md) 事件（该事件的详细说明见[上文](guides/dnd.md#fangzhirenwubeituodongdaotedingriqifanweizhiwai)）:

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move){
        var diff = task.start_date - original.start_date;
        gantt.eachTask(function(child){
            child.start_date = new Date(+child.start_date + diff);
            child.end_date = new Date(+child.end_date + diff);
            gantt.refreshTask(child.id, true);
        },id );
    }
});
// 将子任务位置对齐到当前刻度
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
        var state = gantt.getState();
        gantt.eachTask(function(child){          
            child.start_date = gantt.roundDate({
                date:child.start_date, 
                unit:state.scale_unit, 
                step:state.scale_step
              });            
              child.end_date = gantt.calculateEndDate(child.start_date, 
                child.duration, gantt.config.duration_unit);
              gantt.updateTask(child.id);
        },id );
    }
});
~~~

## 拖动项目时同时拖动其子任务

:::info
此功能仅在 Gantt PRO 版本中可用。
:::

默认情况下，被标记为 [project type](api/config/types.md) 的任务无法被拖动。
可以通过设置 [drag_project](api/config/drag_project.md) 选项来启用项目拖动:

~~~js
gantt.config.drag_project = true;
~~~


[Draggable projects](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)


## 与独立任务一起拖动依赖任务

有多种方法可以将任务与其依赖任务一起移动。
详细信息请参见专门的文章:[종속 작업과 함께 작업 드래그하기](guides/dragging-dependent-tasks.md)。

## 设置任务的最小持续时间

可以通过 [min_duration](api/config/min_duration.md) 设置来指定任务的最小持续时间。

该选项定义了任务在调整大小时允许的最小尺寸，防止任务持续时间为零。

该值以毫秒为单位定义:
~~~js
// 1天
gantt.config.min_duration = 24*60*60*1000;

//或

// 1小时
gantt.config.min_duration = 60*60*1000;
~~~

## 拖动任务时自动滚动

在处理大型甘特图时，拖动任务到较远的位置或在相距较远的任务之间创建链接可能会比较困难。

**自动滚动** 功能可以在拖动过程中自动滚动图表。该功能默认启用，但可以通过 [autoscroll](api/config/autoscroll.md) 选项进行控制。

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

你也可以通过 [autoscroll_speed](api/config/autoscroll_speed.md) 属性以毫秒为单位调整自动滚动的速度:

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
 
gantt.init("gantt_here");
~~~

## 禁止特定任务调整大小

如需防止某些任务被调整大小，有两种方法:

1. 通过 CSS 隐藏 UI 中的调整大小手柄。
使用 **task_class** 模板为特定任务添加自定义 CSS 类:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.no_resize) { // no_resize 为演示用自定义属性
        return "no_resize";
    }
    return "";
~~~

然后通过如下 CSS 隐藏调整大小手柄:

~~~css
.no_resize .gantt_task_drag{
   display: none !important;
}
~~~

2. 通过 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件在代码中阻止调整大小。
在处理函数中返回 *false* 即可阻止调整大小:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize" && gantt.getTask(id).no_resize){
        return false;
    }
    return true;
});
~~~

## 识别任务被调整的是哪一端

在拖拽中，"resize" 模式表示用户正在更改任务的开始或结束日期。

要检测正在修改哪一端，可以检查 **gantt.getState().drag_from_start** 标志:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
            // 正在更改开始日期
        } else {
            // 正在更改结束日期
        }
    }
    return true;
});
~~~

## 禁用任务开始或结束日期的调整大小

调整大小手柄可通过以下选择器定位:

- .gantt_task_drag[data-bind-property="start_date"]
- .gantt_task_drag[data-bind-property="end_date"]

如需禁用开始日期的调整大小，可使用如下 CSS:

~~~css
.gantt_task_drag[data-bind-property="start_date"]{
   display: none !important;
}
~~~

同理，如需禁用结束日期的调整大小:

~~~css
.gantt_task_drag[data-bind-property="end_date"]{
   display: none !important;
}
~~~

或者，也可以通过 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件阻止调整大小。
在处理函数中返回 *false* 即可阻止调整大小:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
             return false;
        } else {
             // 允许调整结束日期
        }
    }
    return true;
});
~~~

