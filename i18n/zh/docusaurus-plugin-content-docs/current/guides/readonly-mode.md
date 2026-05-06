---
title: "只读模式"
sidebar_label: "只读模式"
---

# 只读模式

在本部分中，我们将从两个情景来考虑只读模式：

1. [适用于整个甘特图的只读模式](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [特定任务/链接的只读模式](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)

## 适用于整个甘特图的只读模式 {#readonlymodefortheentiregantt}

要将整个甘特图设为只读，请将 [readonly](api/config/readonly.md) 选项设为 *true*。

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

请注意，只读模式仅影响用户通过 UI 可以执行的内置操作。这意味着当整个甘特图不可编辑时，用户不能打开灯箱或内联编辑器，不能垂直或水平拖拽任务，或调整任务大小。

但 [readonly](api/config/readonly.md) 属性并不会阻止通过 API 方法实现的操作。因此，如果使用 Gantt API，则需要在回调函数中手动检查只读模式是否已启用。例如，下面演示如何通过单击自定义按钮来阻止添加任务的功能：

~~~js
gantt.config.readonly = true;

gantt.config.columns = [
    { name: "text", label: "Task name", width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" },
    { name: "add", label: "1", width: 44 },
    {
        name: "add_custom", label: "2", width: 44, template: function (task) {
          return "<div class='custom_add' onclick='customAdd(" + task.id + ")';></div>"
        }
    }
];

function customAdd(parentId) { /*!*/
    if (gantt.config.readonly){ /*!*/
        return; /*!*/
    }/*!*/
}/*!*/
~~~

要让特定任务/链接在只读甘特图中可编辑，请在其数据对象中添加 'editable' 属性并将其设为 *true*：

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

默认情况下，前述行为绑定到任务/链接的 editable 属性。您可以使用 [editable_property](api/config/editable_property.md) 配置选项来改变目标属性：

~~~js
gantt.config.editable_property = "property_name";
~~~

## 特定任务/链接的只读模式 {#readonlymodeforspecifictaskslinks}

要让特定的任务或链接变为只读，请向数据对象中添加 readonly 属性并将其设为 true：

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
默认情况下，甘特会检查任务/链接是否具有该属性且其值为非负值，然后将其设为只读。否则——保持可编辑。
:::

当任务/链接处于只读时，它不会对点击、双击做出反应，也不可拖动或以任何方式进行编辑。

如果您想为只读任务显示灯箱，可以通过以下方式手动调用 [gantt.showLightbox(id)](api/method/showlightbox.md)：

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

默认情况下只读行为绑定到任务/链接的 'readonly' 属性。但您也可以使用 [readonly_property](api/config/readonly_property.md) 配置选项来改变目标属性：

~~~js
gantt.config.readonly_property = "property_name";
~~~

## editable_property 配置选项的详细信息

'editable_property' 指向任务数据对象的属性，而不是灯箱部分或左侧网格的列：

~~~js
{
    tasks:[
        {id:1, text:"Project #2", start_date:"01-04-2020", duration:18,order:10, 
            progress:0.4, parent:0, editable:false},
        {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, order:10, 
            progress:0.6, parent:1, editable:true},
        {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, order:20, 
            progress:0.6, parent:1, editable:true}
    ],
    links:[...]
}
~~~

如果您想让它可以从灯箱中设置，请将 'editable_property' 设置为与控件映射到的同一个属性：

~~~js
gantt.config.lightbox.sections = [ 
    {
        name:"description", 
        height:38, 
        map_to:"some_property", 
        type:"textarea", 
        focus:true
    },
    ....
]
gantt.config.editable_property = "some_property";
~~~

## 基于多个属性设置事件只读性的详细信息

如果您希望基于一组属性有条件地使事件可编辑，可以：

- 手动管理它们的可编辑性，例如通过阻止 [onBeforeLightbox](api/event/onbeforelightbox.md) 和 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件
- 每次加载、添加或更新任务时动态更新 'editable_property'（[onTaskLoading](api/event/ontaskloading.md)、[onTaskCreated](api/event/ontaskcreated.md)、[onAfterTaskUpdate](api/event/onaftertaskupdate.md)）：

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~