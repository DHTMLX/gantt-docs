--- 
title: "工具提示扩展"
sidebar_label: "工具提示扩展"
---

# 工具提示扩展

请参阅文章 [甘特图元素的工具提示](guides/tooltips.md) 了解关于 Tooltips 扩展的详细信息。

## Tooltip 对象

您可以通过 **gantt.ext.tooltips.tooltip** 访问工具提示对象。该对象通过一组方法允许对工具提示的位置、内容和可见性进行操作：

- <span class="submethod">**getNode (): HTMLElement**</span> - 返回工具提示的 HTML 元素  
- <span class="submethod">**setViewport (node): object**</span> - 将工具提示的位置锁定在指定 HTML 元素的边界内  
    - **_node_** - (*HTMLElement*) - 对应的 HTML 元素
- <span class="submethod">**show (config, top): object**</span> - 在特定坐标处显示工具提示（相对于 document.body）。该方法能接受不同的参数，具体取决于你希望在哪个位置显示工具提示。若要在相对于 document.body 的特定坐标处显示工具提示，请传入 x,y 坐标。若要在鼠标事件坐标处显示，请传入 Event 对象。_tooltip_offset_x/y_ 和视口将被考虑在内。
    - **_config?_** - (*number | Event*) - X 坐标或鼠标事件对象
    - **_top?_** - (*number*) - Y 坐标 
- <span class="submethod">**hide (): object**</span> - 隐藏工具提示元素
- <span class="submethod">**setContent (html): object**</span> - 将 HTML 内容放入工具提示。参数为：
    - **_html_** - (*string*) - 工具提示的 HTML 内容字符串

## 方法

有若干方法可在悬停 DOM 元素时控制工具提示的行为。

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - 使用扩展配置添加工具提示。该方法只有一个参数：
    - **_config_** - (*object*) - 一个包含工具提示设置的对象。设置包括：
        - **_selector_** - (*string*) - 定义要监听鼠标事件的元素的 CSS 选择器
        - **_onmouseenter_** - (*Function*): void - 当鼠标指针进入元素时调用的处理程序。参数为：
            - **_event_** - (*MouseEvent*) - 原生鼠标事件
            - **_node_** -  (*HTMLElement*) - HTML 节点
        - **_onmousemove?_** - (*Function*): void - 可选，当鼠标指针在元素内移动时调用的处理程序。参数为：
            - **_event_** - (*MouseEvent*) - 原生鼠标事件
            - **_node_** -  (*HTMLElement*) - HTML 节点
        - **_onmouseleave_** - (*Function*): void - 当鼠标指针离开元素时调用的处理程序。参数为：    
            - **_event_** - (*MouseEvent*) - 原生鼠标事件
            - **_node_** -  (*HTMLElement*) - HTML 节点
        - **_global?_** - (*boolean*) - 可选，定义模块是在整个页面监听鼠标事件（*true*）还是仅在一个 gantt 元素内监听（*false*）。默认设定为 *false*。
  
~~~js
gantt.ext.tooltips.attach({
    selector: ".gantt_task_cell",
    onmouseenter: function (e, node) {
        const id = node.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);

        if (typeof task.text == "string") {
            gantt.ext.tooltips.tooltip.setContent(task.text);
            gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
        }
    },
    onmousemove: function (e, node) {
        gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
    },
    onmouseleave: function (e, node) {
        gantt.ext.tooltips.tooltip.hide()
    },
})
~~~  

### gantt.ext.tooltips.tooltipFor()

- <span class="submethod">**tooltipFor (config): void**</span> - 为指定的 Gantt 元素添加工具提示。它是对 **attach()** 方法的一个更简化版本。该方法只有一个参数：
    - **_config_** - (*object*) - 一个包含工具提示设置的对象。设置包括：
        - **_selector_** - (*string*) - 为其添加工具提示的 Gantt 元素的 CSS 选择器
        - **_html_** - (*Function*): HTMLElement | string | number | void - 工具提示的模板。模板函数依次接受两个参数：
            - **_event_** - (*Event*) - 原生鼠标事件
            - **_node_** -  (*HTMLElement*) - HTML 节点并返回一个模板字符串。
        - **_global?_** - (*boolean*) - 可选，定义模块是在整个页面监听鼠标事件（*true*）还是仅在一个 gantt 元素内监听（*false*）。默认设定为 *false*。 
  
~~~js
gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: function (e, domElement) {
        const id = domElement.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~  

### gantt.ext.tooltips.detach()

- <span class="submethod">**detach (selector): void**</span> - 移除工具提示。作为参数，该方法接收：
    - **_selector_** - (*string*) - Gantt 元素的 CSS 选择器