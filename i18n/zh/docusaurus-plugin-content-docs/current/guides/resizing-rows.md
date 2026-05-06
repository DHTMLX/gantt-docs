---
title: "网格中行高调整"
sidebar_label: "网格中行高调整"
---

# 网格中行高调整

可以修改网格中各个行的高度。

dhtmlxGantt 库提供两种方式来管理行高：

- 为需要的任务对象同时设置行高和任务条的高度；
- 通过拖动网格行的底部边框。

:::note
本功能在 v7.1 及以上版本可用。
:::

## 设置行高

您可以根据需要调整某一行的高度。

:::note
单独的行高目前与 [static background rendering](api/config/static_background.md) 不兼容。
:::

![row_height](/img/row_height.png)

为此，您需要在数据集中重新定义任务对象的 **row_height** 和 **bar_height** 属性：

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

或您也可以动态实现：

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// 重新渲染 Gantt 以应用更改
gantt.render();
~~~

如果任务对象的 **row_height** 和 **bar_height** 属性未指定或为空（默认状态），将使用 [gantt.config.row_height](api/config/row_height.md) 和 [gantt.config.bar_height](api/config/bar_height.md) 的值。

## 通过拖放调整行高

![resize_row](/img/resize_row.png)

为了让用户能够通过拖动行的底部边框来调整网格中的行高，请将 [gantt.config.resize_rows](api/config/resize_rows.md) 选项设置为 *true*：

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


[gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) 选项提供在调整大小时可为任务设置的最小行高：

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### 事件

有 4 个事件可用于处理通过拖放调整行高的行为：

- [onBeforeRowResize](api/event/onbeforerowresize.md) - 在用户开始通过拖拽调整行高之前触发
- [onRowResize](api/event/onrowresize.md) - 当用户拖动行边框以调整行高时触发
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - 在行高调整完成之前触发
- [onAfterRowResize](api/event/onafterrowresize.md) - 在行高调整完成之后触发