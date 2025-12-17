---
title: "Gantt 元素的工具提示"
sidebar_label: "Gantt 元素的工具提示"
---

Gantt 元素的工具提示
===========================

工具提示可以在不让屏幕充满过多文本的情况下，显示额外的信息。默认情况下，工具提示会显示在 Gantt 任务上。

![task_tooltip](/img/task_tooltip.png)

你可以通过相应的 API [为任意 Gantt 元素添加工具提示](#tooltipsfordifferentelements)。

激活方式
---------------

要为任务启用工具提示，只需通过 [gantt.plugins](api/method/plugins.md) 方法开启 **tooltip** 插件:

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


当该扩展被激活后，工具提示会以默认设置自动显示。

自定义文本 
----------------

默认情况下，工具提示会显示任务的三个属性:

1. 任务的开始日期。
2. 任务的结束日期。
3. 任务的名称。

如果你想自定义工具提示文本，可以像这样使用 [tooltip_text](api/template/tooltip_text.md) 模板:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~

## 工具提示 API {#tooltipapi}

### Tooltip 对象

工具提示对象可以通过 **gantt.ext.tooltips.tooltip** 访问。它提供了用于控制工具提示位置、内容和可见性的方法:

- **getNode()** - 返回工具提示的 HTML 元素  
- **setViewport()** - 限制工具提示在指定 HTML 元素范围内显示
    - **node** - (*HTMLElement*) 用于限制工具提示的元素
- **show()** - 在指定坐标（相对于 document.body）显示工具提示。可根据需要传递不同参数:
    - 如果需要在具体坐标显示工具提示，传递: 
        - **left** - (*number*) X 坐标
        - **top** - (*number*) Y 坐标 
    - 如果需要在鼠标事件坐标显示（会考虑 *tooltip_offset_x/y* 和 viewport），传递:
        - **event** - (*Event*) 鼠标事件对象  
- **hide()** - 隐藏工具提示
- **setContent()** - 设置工具提示内部的 HTML 内容。参数为:
    - **html** - (*string*) HTML 内容字符串

### 方法

有几种方法可以帮助你在悬停 DOM 元素时控制工具提示的行为。

#### gantt.ext.tooltips.attach() {#attach}

添加带有扩展配置的工具提示。该方法接受一个包含以下设置的对象:

- **selector** - (*string*) 监听鼠标事件的元素的 CSS 选择器
- **onmouseenter** - (*function*) 鼠标进入元素时调用，参数如下:
     - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) 目标元素
- **onmousemove** - (*function*) 鼠标在元素内部移动时调用，参数如下:
    - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) 目标元素
- **onmouseleave** - (*function*) 鼠标离开元素时调用，参数如下:    
    - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) 目标元素
- **global** - (*boolean*) 是否监听整个页面（*true*）还是只在 gantt 元素内部（*false*），默认为 *false*。

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

为特定 Gantt 元素添加工具提示。该方法比 **attach()** 更简单。它接受一个包含工具提示详细信息的对象:

- **selector** - (*string*) 需要添加工具提示的 Gantt 元素的 CSS 选择器
- **html** - (*function*) 工具提示的模板函数，参数如下:
    - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) 目标元素
  返回一个字符串作为工具提示的 HTML
- **global** - (*boolean*) 可选，是否监听整个页面（*true*）还是只在 gantt 内部（*false*），默认为 *false*。

#### gantt.ext.tooltips.detach() {#detach} 

移除工具提示。参数如下:

- **selector** - (*string*) Gantt 元素的 CSS 选择器

为不同元素添加工具提示
-------------------------

默认情况下，工具提示只会添加到 Gantt 任务上，但你也可以将其应用到其他 Gantt 元素，例如资源标记:

![Resource marker tooltip](/img/resource_marker_tooltip.png)

这里可以用到 [tooltip API](#tooltipapi) 的两个方法:

- [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) 方法 

例如，为时间轴刻度单元格添加工具提示:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

请注意，要在 Gantt 初始化后调用 [gantt.ext.tooltips.tooltipFor()](#tooltipfor)。比如可以放在 [onGanttReady](api/event/onganttready.md) 事件处理函数中:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;

    tooltips.tooltipFor({
        selector: ".gantt_task_link",
        html: (event, node) => {
            // ...
        }
    });

    gantt.init("gantt_here");
});
~~~


[Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)


或如下方式:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: (event, domElement) => {
        const id = event.target.parentNode.getAttribute("task_id");
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~


**Related example:** [Gantt. Custom tooltips for cells](https://snippet.dhtmlx.com/6kb5gm39)


通过这种方式添加的工具提示会跟随鼠标指针，并遵循 *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*, *[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)* 等相关设置。

- [**gantt.ext.tooltips.attach()**](#attach) 方法 

该方法允许你通过更详细的配置来添加工具提示，从而更好地控制鼠标移动时的行为。

自定义工具提示行为
------------------------------

你可以通过移除内置处理器并添加自定义处理器来更改默认的工具提示行为:

- 使用 [**gantt.ext.tooltips.detach**](#detach) 从任务中移除默认的工具提示处理器:

~~~js
// 移除任务的内置工具提示处理器
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- 使用 [**gantt.ext.tooltips.attach()**](#attach) 添加自定义工具提示行为。例如，仅在表格上方显示工具提示:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event: MouseEvent) => {
        if (gantt.config.touch && !gantt.config.touch_tooltip) {
            return;
        }

        const targetTaskId = gantt.locate(event);
        if (gantt.isTaskExists(targetTaskId)) {
            const task = gantt.getTask(targetTaskId);
            return gantt.templates.tooltip_text(task.start_date, task.end_date, task);
        }

        return null;
    },
    global: false
});
~~~

延时设置
------------------

显示和隐藏工具提示的时间可以通过相关设置进行调整。

要设置任务工具提示出现前的延时时间（毫秒），请使用 [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

要控制鼠标移开后工具提示保持可见的时间（毫秒），请使用 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

位置设置
----------

你可以通过以下配置属性调整工具提示的位置偏移:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - 设置水平偏移
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - 设置垂直偏移

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~

显示区域
-------------

6.1 之前，工具提示只会在时间轴区域内显示。从 v6.1 起，工具提示可以出现在任意位置并跟随鼠标指针。

如果你想恢复之前的行为，可以在初始化 Gantt 前使用如下代码:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

