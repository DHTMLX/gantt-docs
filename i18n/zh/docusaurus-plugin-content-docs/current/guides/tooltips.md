---
title: "甘特图元素的工具提示"
sidebar_label: "甘特图元素的工具提示"
---

# 甘特图元素的工具提示

工具提示可帮助你为用户添加额外信息，而不会让屏幕因文本过多而溢出。默认情况下，工具提示会添加到甘特图任务上。

![task_tooltip](/img/task_tooltip.png)

你可以通过相应的 API 为任何甘特图元素添加工具提示，详见 [为不同元素添加工具提示](#tooltipsfordifferentelements)。

## 启用

要为任务激活工具提示，请使用 [gantt.plugins](api/method/plugins.md) 方法来启用 **tooltip** 插件：

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~

[工具提示](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

扩展启用后，工具提示将使用默认设置自动显示。

## 自定义文本

默认情况下，工具提示显示任务的 3 个属性：

1. 任务的开始日期。
2. 任务的结束日期。
3. 任务名称。

要为工具提示设置自定义文本，请使用 [tooltip_text](api/template/tooltip_text.md) 模板：

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~

## 工具提示 API {#tooltipapi}

### 工具提示对象

你可以通过 **gantt.ext.tooltips.tooltip** 访问工具提示对象。该对象允许通过一组方法来控制工具提示的位置、内容和可见性：

- **getNode()** - 返回工具提示的 HTML 元素  
- **setViewport()** - 将工具提示的位置锁定在指定 HTML 元素的边界内
    - **node** - (*HTMLElement*) 目标 HTML 元素
- **show()** - 在特定坐标处显示工具提示（相对于 document.body）。该方法可以根据你希望在哪个位置显示工具提示来传入不同的参数：
    - 要在特定坐标处显示工具提示（相对于 document.body），传入：
        - **left** - (*number*) X 坐标
        - **top** - (*number*) Y 坐标 
    - 要在鼠标事件坐标处显示工具提示（会考虑 *tooltip_offset_x/y* 和视口），传入：
        - **event** - (*Event*) 鼠标事件对象  
- **hide()** - 隐藏工具提示元素
- **setContent()** - 将 HTML 内容放入工具提示。参数为：
    - **html** - (*string*) 用于工具提示的 HTML 内容字符串


### 方法

有若干方法可以在悬停 DOM 元素时控制工具提示的行为。

#### gantt.ext.tooltips.attach() {#attach}

添加带有扩展配置的工具提示。该方法接收一个包含工具提示设置的对象作为参数。可以通过该方法调整的设置如下：

- **selector** - (*string*) 定义用于监听鼠标事件的元素的 CSS 选择器
- **onmouseenter** - (*function*) 当鼠标指针进入元素时调用的处理程序。参数为：
     - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) HTML 节点
- **onmousemove** - (*function*) 当鼠标指针在元素内移动时调用的处理程序。参数为：
    - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) HTML 节点
- **onmouseleave** - (*function*) 当鼠标指针离开元素时调用的处理程序。参数为：
    - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) HTML 节点
- **global** - (*boolean*) 定义模块是在整页监听鼠标事件 (*true*) 还是仅在甘特图元素内监听 (*false*)。默认值为 *false*。

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

为指定的甘特图元素添加工具提示。它是对 **attach()** 方法的简化版本。该方法接收一个包含工具提示详细信息的对象作为参数。该对象具有以下属性：

- **selector** - (*string*) 要添加工具提示的甘特图元素的 CSS 选择器
- **html** - (*function*) 工具提示的模板。模板函数依次接收两个参数：
    - **event** - (*Event*) 原生鼠标事件
    - **node** -  (*HTMLElement*) HTML 节点
  并返回一个带模板的字符串。
- **global** - (*boolean*) 可选，定义模块是在整页监听鼠标事件 (*true*) 还是仅在甘特图元素内监听 (*false*)。默认值为 *false*。

#### gantt.ext.tooltips.detach() {#detach}

移除工具提示。作为参数，该方法接收：

- **selector** - (*string*) 甘特图元素的 CSS 选择器

#### gantt.ext.tooltips.delayShow() {#delayShow}

在由 [tooltip_timeout](api/config/tooltip_timeout.md) 设置的延迟后显示工具提示。如果未设置该配置，将使用一个较小的默认延迟。

该方法是**防抖**的，意味着在延迟窗口内重复调用会重置计时器，工具提示仅显示一次。

作为参数，该方法接收：

- **event** - (*Event*) 用于定位工具提示的原生鼠标事件
- **tooltipText** - (*string*) 以 innerHTML 渲染的工具提示文本

#### gantt.ext.tooltips.delayHide() {#delayHide}

在由 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 设置的延迟后隐藏当前显示的工具提示。如果未设置该配置，将使用一个较小的默认延迟。

## 不同元素的工具提示 {#tooltipsfordifferentelements}

默认情况下，工具提示只添加到甘特图任务上，但你也可以为其他任何甘特图元素设置工具提示。例如，为资源标记：

![资源标记工具提示](/img/resource_marker_tooltip.png)

在本 API 中有两个相应的方法来实现此目的：

- [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) 方法

例如，下面的代码展示了如何为时间轴刻度的单元格添加工具提示：

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper .getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

请注意，**gantt.ext.tooltips.tooltipFor()**(#tooltipfor) 方法必须在 Gantt 完成初始化后再调用。例如，你可以在 [onGanttReady](api/event/onganttready.md) 事件处理器内指定该方法，如下所示：

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

或者，你也可以像下面这样使用：

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

**相关示例** [Gantt. 自定义单元格工具提示](https://snippet.dhtmlx.com/6kb5gm39)

以这种方式添加的工具提示将跟随鼠标指针并使用设置 *[tooltip_offset_x](api/config/tooltip_offset_x.md)*、*[tooltip_offset_y](api/config/tooltip_offset_y.md)*、*[tooltip_timeout](api/config/tooltip_timeout.md)*、[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 的值。

- [**gantt.ext.tooltips.attach()**](#attach) 方法

该方法允许添加带有扩展配置的工具提示，以便将工具提示行为调整为随着鼠标指针的移动而变化。

## 自定义工具提示行为

有一种方式可以修改工具提示的默认行为。可以通过移除内置的工具提示处理程序并添加自定义的来实现：

- 使用 [**gantt.ext.tooltips.detach**](#detach) 方法从任务上移除内置的工具提示处理程序：

~~~js
// 从任务上移除内置工具提示处理程序
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- 通过 [**gantt.ext.tooltips.attach()**](#attach) 方法添加所需的工具提示行为。在下面的示例中，工具提示仅显示在表格上方：

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event) => {
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


## 超时

可以通过相关设置配置工具提示显示和隐藏的时间。

要指定在任务的工具提示出现前的毫秒时间，请使用 [tooltip_timeout](api/config/tooltip_timeout.md)：

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

要定义在用户将光标移动到另一个位置后工具提示显示的持续时间（毫秒），请使用 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 属性：

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~


## 位置

可以通过改变默认位置的偏移量来配置工具提示的位置，使用以下两个配置属性：

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - 设置工具提示位置的水平偏移量
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - 设置工具提示位置的垂直偏移量

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~


## 显示区域

在 6.1 版本之前，工具提示仅显示在时间线区域内。自 6.1 版本发布后，工具提示的显示不再受限，且工具提示会跟随鼠标指针移动。

如有需要，可以在 Gantt 初始化之前使用下面的代码恢复到先前的行为：

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~