---
title: "只读模式"
sidebar_label: "只读模式"
---

只读模式
===================================

本文将介绍在两种场景下使用只读模式:

1. [整个甘特图的只读模式](guides/readonly-mode.md#zhenggegantetudezhidumoshi)
2. [特定任务的只读模式](guides/readonly-mode.md#tedingrenwulianjiedezhidumoshi)

## 整个甘特图的只读模式 {#readonlymodefortheentiregantt}

要将整个甘特图设置为只读，只需将 [readonly](api/config/readonly.md) 选项设置为 *true*。

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

请注意，只读模式仅会禁用用户通过界面进行的内置操作。这意味着当整个甘特图被锁定时，用户无法打开 lightbox 或内联编辑器，不能拖动任务或调整任务大小。

然而，[readonly](api/config/readonly.md) 属性不会阻止通过 API 调用进行的操作。因此，如果你在使用 Gantt API，需要在回调函数中手动检查只读模式是否开启。例如，以下代码演示了如何阻止通过自定义按钮添加任务:

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

如果希望在甘特图为只读时，仍然允许编辑特定任务或链接，可以在其数据对象中添加 'editable' 属性并设置为 *true*:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

默认情况下，此行为关联到任务或链接的 'editable' 属性。如果你想使用其他属性，可以通过 [editable_property](api/config/editable_property.md) 选项进行更改:

~~~js
gantt.config.editable_property = "property_name";
~~~

## 特定任务/链接的只读模式 {#readonlymodeforspecifictaskslinks}

要将某些任务或链接设置为只读，只需在其数据对象中添加 'readonly' 属性并设置为 true:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
默认情况下，gantt 会检查任务或链接是否设置了该属性且为真值，如果是，则将其设为只读。否则，仍可编辑。
:::

当任务或链接为只读时，其不会响应单击或双击，也无法拖动或编辑。

如果你希望为只读任务显示 lightbox，可以手动调用 [gantt.showLightbox(id)](api/method/showlightbox.md):

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

默认情况下，只读行为关联到任务或链接的 'readonly' 属性。但你可以通过 [readonly_property](api/config/readonly_property.md) 选项更改此属性:

~~~js
gantt.config.readonly_property = "property_name";
~~~

"editable_property" 配置选项详情
---------------------------

'editable_property' 指向任务数据对象本身的某个属性，而不是 lightbox 的 section 或左侧网格中的列:

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

如果你希望通过 lightbox 编辑此属性，请将 'editable_property' 设置为与控件映射的属性一致:

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

基于多个属性设置事件只读
-----------------------

如需根据多种条件设置事件可编辑性，你可以:

- 通过阻止 [onBeforeLightbox](api/event/onbeforelightbox.md) 和 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件，手动控制可编辑性
- 在任务加载、创建或更新时（使用 [onTaskLoading](api/event/ontaskloading.md)、[onTaskCreated](api/event/ontaskcreated.md)、[onAfterTaskUpdate](api/event/onaftertaskupdate.md)）动态更新 'editable_property':

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~

