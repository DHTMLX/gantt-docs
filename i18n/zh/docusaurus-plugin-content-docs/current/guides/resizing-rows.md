---
title: "调整网格中的行高"
sidebar_label: "调整网格中的行高"
---

# 调整网格中的行高


可以调整网格中单独某一行的高度。


dhtmlxGantt 库提供了两种方式来控制行高:

- 通过为特定任务对象设置行高和任务条高度；
- 通过拖动网格行底部边缘进行调整。

:::note
此功能自 7.1 版本开始提供。
:::

## 设置行高


你可以根据需要自定义某一行的高度。

:::note
目前，单独行高与 [static background rendering](api/config/static_background.md) 不兼容。
:::

![row_height](/img/row_height.png)

为此，只需在数据集中对应的任务对象中重定义 **row_height** 和 **bar_height** 属性即可:

**在数据集中指定任务的类型**
~~~js
gantt.parse({
    data: [
        { id: 11, text: "Project #1", type: "project", progress: 0.6, open: true, 
            row_height: 70, bar_height: 60 }, /*!*/
        { id: 12, text: "Task #1", start_date: "03-04-2018", duration: "5", 
            parent: "11", progress: 1, open: true },
        { id: 13, text: "Task #2", start_date: "03-04-2018", type: "project", 
            parent: "11", progress: 0.5, open: true }
    ],
    links: []
});
~~~

你也可以动态设置这些属性:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// 重新渲染甘特图以应用更改
gantt.render();
~~~

如果 **row_height** 和 **bar_height** 属性未设置或为空（默认情况），将会使用 [gantt.config.row_height](api/config/row_height.md) 和 [gantt.config.bar_height](api/config/bar_height.md) 的配置值。

## 通过拖拽调整行高


![resize_row](/img/resize_row.png)

要允许用户通过拖动行底部边框来调整行高，需要启用 [gantt.config.resize_rows](api/config/resize_rows.md) 选项:

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


你可以通过 [gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) 选项设置调整时允许的最小行高:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### 事件

通过拖拽调整行高时，可以使用以下四个事件进行管理:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - 用户开始拖动调整行高前触发
- [onRowResize](api/event/onrowresize.md) - 用户拖动边框调整行高时持续触发
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - 在调整操作即将结束时触发
- [onAfterRowResize](api/event/onafterrowresize.md) - 行高调整完成后触发

