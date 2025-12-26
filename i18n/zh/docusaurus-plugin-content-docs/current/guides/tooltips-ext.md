---
title: "工具提示扩展"
sidebar_label: "工具提示扩展"
---

# 工具提示扩展

有关工具提示扩展的更多信息，请参见文章 [Gantt 요소의 툴팁](guides/tooltips.md)。

## Tooltip 对象

Tooltip 对象可通过 **gantt.ext.tooltips.tooltip** 访问。它提供了控制工具提示位置、内容和可见性的方法:

- <span class="submethod">**getNode (): HTMLElement**</span> - 返回工具提示的 HTML 元素  
- <span class="submethod">**setViewport (node): object**</span> - 限制工具提示在指定 HTML 元素边界内显示  
    - **_node_** - (*HTMLElement*) - 用于约束工具提示的 HTML 元素  
- <span class="submethod">**show (config, top): object**</span> - 在指定坐标处显示工具提示（相对于 document.body）。该方法根据期望的位置接受不同的参数。若要在特定坐标显示工具提示，请提供 x 和 y 的值。若要在鼠标事件位置显示，请传入 Event 对象。*tooltip_offset_x/y* 和 viewport 设置会自动应用。  
    - **_config?_** - (*number | Event*) - x 坐标或鼠标事件对象  
    - **_top?_** - (*number*) - y 坐标  
- <span class="submethod">**hide (): object**</span> - 隐藏工具提示  
- <span class="submethod">**setContent (html): object**</span> - 设置工具提示中的 HTML 内容  
    - **_html_** - (*string*) - 在工具提示中显示的 HTML 字符串  

## 方法

提供了多种方法用于管理悬停在 DOM 元素上的工具提示行为。

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - 以详细配置方式绑定工具提示。它接受一个参数:  
    - **_config_** - (*object*) - 工具提示的配置对象，包括:  
        - **_selector_** - (*string*) - 需要监听鼠标事件的元素的 CSS 选择器  
        - **_onmouseenter_** - (*Function*): void - 鼠标进入元素时调用，参数包括:  
            - **_event_** - (*MouseEvent*) - 原生鼠标事件  
            - **_node_** - (*HTMLElement*) - 目标 HTML 节点  
        - **_onmousemove?_** - (*Function*): void - （可选）鼠标在元素内移动时调用，参数包括:  
            - **_event_** - (*MouseEvent*) - 原生鼠标事件  
            - **_node_** - (*HTMLElement*) - 目标 HTML 节点  
        - **_onmouseleave_** - (*Function*): void - 鼠标离开元素时调用，参数包括:  
            - **_event_** - (*MouseEvent*) - 原生鼠标事件  
            - **_node_** - (*HTMLElement*) - 目标 HTML 节点  
        - **_global?_** - (*boolean*) - （可选）若为 true，则监听整个页面的鼠标事件；若为 false，则只在 gantt 元素内监听。默认为 *false*。  
  
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

- <span class="submethod">**tooltipFor (config): void**</span> - 为特定 Gantt 元素添加工具提示。这是 **attach()** 的简化替代方法。它接受一个参数:  
    - **_config_** - (*object*) - 配置对象，包括:  
        - **_selector_** - (*string*) - 需要绑定工具提示的 Gantt 元素的 CSS 选择器  
        - **_html_** - (*Function*): HTMLElement | string | number | void - 返回工具提示内容的函数。接收参数:  
            - **_event_** - (*Event*) - 原生鼠标事件  
            - **_node_** - (*HTMLElement*) - HTML 节点，并返回包含工具提示内容的字符串  
        - **_global?_** - (*boolean*) - （可选）若为 true，则监听整个页面；若为 false，则只在 gantt 元素内监听。默认为 *false*。  
  
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

- <span class="submethod">**detach (selector): void**</span> - 移除指定元素的工具提示。它接受一个参数:  
    - **_selector_** - (*string*) - Gantt 元素的 CSS 选择器
