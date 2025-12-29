---
title: "quickInfo 扩展"
sidebar_label: "quickInfo 扩展"
---

# quickInfo 扩展

关于 quickInfo 扩展的更多信息，请参见 [퀵 인포 (터치 지원)](guides/quick-info.md) 文章。


*quickInfo* 对象提供以下 API:

## 方法

- <span class="submethod">**show (id): void**</span> - 为指定元素打开 quick info 弹窗
    - **_id_** - (*number | string*) - 任务 ID

~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span> - 在指定坐标处打开 quick info 弹窗
    - **_x_** - (*number | string*) - 水平坐标
    - **_y_** - (*number | string*) - 垂直坐标

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - 关闭 quick info 弹窗。如果 **gantt.config.quick_info_detached** 设置为 *false*，弹窗将在短暂动画后消失。传递 *true* 作为参数则会跳过动画，立即移除弹窗。
    - **_force?_** - (*boolean*) - 是否立即隐藏弹窗（无动画）

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// 通过短暂动画隐藏弹窗
gantt.ext.quickInfo.hide();
 
// 立即隐藏弹窗
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - 指定 quick info 显示的容器。如果未提供容器，QuickInfo 会插入到以下节点中的第一个可用节点:**gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - 容器元素或其 ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - 获取 quick info 弹窗的 HTMLElement。如果 quick info 尚未初始化，则返回 *null*

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

显示的 quick info 的 DOM 元素如下所示:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - 填充 quick info 的内容
    - **_config?_** - (*object*) - quick info 的可选配置对象，可能包含:
        - **_taskId?_** - (*string | number*) - 可选，与 quick info 操作按钮关联的任务 id
        - **_header?_** - (*object*) - 可选，弹窗编辑表单的头部，可以包含:
            - **_title?_** - (*string*) - 可选，弹窗编辑表单的标题
            - **_date?_** - (*string*) - 可选，弹窗编辑表单的日期
        - **_content?_** - (*string*) - 可选，弹窗编辑表单的内容
        - **_buttons?_** - (*string[]*) - 可选，弹窗编辑表单中显示的按钮
  


如果 header 和 buttons 都未设置，quick info 弹窗对应的部分将被隐藏。

**setContent** 方法的配置对象示例:

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

另外，

可以创建不带 header 和按钮的自定义弹窗:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~
