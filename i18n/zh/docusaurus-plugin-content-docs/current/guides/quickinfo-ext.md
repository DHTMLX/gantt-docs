---
title: "quickInfo 扩展"
sidebar_label: "quickInfo 扩展"
---

# quickInfo 扩展

请阅读关于 quickInfo 扩展的详细信息，参见 [Quick Info (Touch Support)](guides/quick-info.md) 文章。

The *quickInfo* 对象具有以下 API：

## 方法

- <span class="submethod">**show (id): void**</span> - 显示指定元素的快速信息弹出框
    - **_id_** - (*number | string*) - 任务 ID
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span>  - 在特定坐标显示快速信息弹出框
    - **_x_** - (*number | string*) - 水平坐标
    - **_y_** - (*number | string*) - 垂直坐标

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - 隐藏快速信息弹出框。当 **gantt.config.quick_info_detached** 设置为 *false* 时，快速信息不会立即消失，而是在短暂动画后消失。提供 *true* 作为参数将取消动画并立即移除弹出框。
    - **_force?_** - (*boolean*) - 定义是否在没有动画的情况下立即隐藏快速信息弹出框


~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// 在短暂动画后隐藏弹出框
gantt.ext.quickInfo.hide();
 
// 立即隐藏弹出框
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - 设置将显示快速信息的容器。如果未指定自定义容器，QuickInfo 将被放置在找到的节点中的第一个节点：**gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - 容器元素或其 ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - 返回快速信息弹出框的 HTMLElement。若快速信息未初始化，则返回 *null*

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

显示的快速信息返回的 DOM 元素看起来像：

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - 将内容放入快速信息中
    - **_config?_** - (*object*) - 可选，快速信息的配置对象，可以包含下列属性:
        - **_taskId?_** - (*string | number*) - 可选，快速信息操作按钮所连接的任务的 ID
        - **_header?_** - (*object*) - 可选，弹出式编辑表单的头部，可能包含:
            - **_title?_** - (*string*) - 可选，弹出式编辑表单的标题
            - **_date?_** - (*string*) - 可选，弹出式编辑表单的日期
        - **_content?_** - (*string*) - 可选，弹出式编辑表单的内容
        - **_buttons?_** - (*string[]*) - 可选，放置在弹出式编辑表单中的按钮
  


如果未指定 header 也未指定 buttons，快速信息弹出框的相关区域将被隐藏。

以下是 **setContent** 方法的配置对象可以如何书写：

~~~js
const quickInfo = gantt.ext.quickInfo;
var task = gantt.getTask(10);
quickInfo.show(task.id);
quickInfo.setContent({
    taskId: task.id,
    header: {
        title: gantt.templates.quick_info_title(task.start_date, task.end_date, task),
        date: gantt.templates.quick_info_date(task.start_date, task.end_date, task)
    },
    content: gantt.templates.quick_info_content(task.start_date, task.end_date, task),
    buttons: gantt.config.quickinfo_buttons
});
~~~

或

你也可以创建一个没有 header 和 buttons 的自定义弹出框：

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~