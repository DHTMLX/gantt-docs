---
title: "时间线区域中的自定义元素"
sidebar_label: "时间线区域中的自定义元素"
---

# 时间线区域中的自定义元素

:::info
此功能仅在 PRO 版中可用
:::

dhtmlxGantt 提供了 [内置功能](guides/inbuilt-baselines.md)，默认情况下允许呈现基线、截止日期和任务约束等额外元素。若需要扩展或修改默认特性，可以按下文所述手动将自定义元素添加到时间线中。

通常通过创建一个可显示的图层并将自定义元素放置在该处来显示附加元素
（使用绝对定位将自定义元素放到与相关任务相邻的位置）。

**要向时间线区域再添加一层**，请使用 [`addTaskLayer()`](api/method/addtasklayer.md) 方法。作为参数，该方法接收一个函数，该函数：

- 以一个任务对象作为参数；
- 返回一个将要显示的 DOM 元素，或返回 *false*（该任务的元素应隐藏）。

~~~js
gantt.addTaskLayer((task) => {
    const layerElement = document.createElement('div');
    // 你的代码
    return layerElement;
});
~~~

**相关示例**： [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

注：

1. 调用该方法后，dhtmlxGantt 会向时间线区域添加一个容器。
2. 当 dhtmlxGantt 渲染数据时，会为每个任务调用 [`addTaskLayer()`](api/method/addtasklayer.md)，并将返回的 DOM 元素追加到该容器中。
3. 放置元素时，可以使用常规的绝对定位。
4. 当 Gantt 的任务被更新时，所有图层（包括自定义图层）也会更新（会对更新的任务再次调用该函数，并用相关的 DOM 元素替换）。
5. dhtmlxGantt 提供了用于计算任务位置和大小的方法 - [`getTaskPosition()`](api/method/gettaskposition.md)。你也可以用它来计算自定义元素的位置和大小。

*如需了解如何提高呈现自定义元素的性能，请阅读 [`addTaskLayer()`](api/method/addtasklayer.md#smart-rendering-for-custom-layers) 文章。*

:::note
如果你需要在时间线的所有单元格中显示自定义内容，请直接在单元格中放置 HTML，使用 [`timeline_cell_content`](api/template/timeline_cell_content.md) 模板。此方法实现起来更简单、性能也更高。
:::

## 使用示例

为了理解如何应用此功能，我们通过一个示例来说明：你为任务设计了计划时间和实际时间，需要同时显示两者。

![baselines](/img/baselines.png)

### 第一步。减小任务高度并将任务线向上移动

初始状态下任务看起来是这样的：

![baselines_start](/img/baselines_start.png)

首先，你需要为基线腾出一些空间。为此需要将任务栏高度用 `gantt.config.bar_height` 调整，并将其设为大约与 `gantt.config.row_height` 定义的行高的一半左右：

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

并通过如下 CSS 将任务线移到行的顶部：

~~~css
.gantt_task_line,
.gantt_line_wrapper {
    margin-top: -9px;
}

.gantt_task_link .gantt_link_arrow {
    margin-top: -10px;
}

.gantt_task_link .gantt_link_corner {
    margin-top: -9px;
}
~~~

效果如下：

![baselines_task_height](/img/baselines_task_height.png)

### 第二步。添加附加数据属性

接下来，需要向任务对象中添加附加数据属性。将它们命名为：`planned_start` 和 `planned_end`。

![baseline_task_object](/img/baseline_task_object.png)

### 第三步。将新增的数据属性转换为 Date 对象

dhtmlxGantt 仅识别 `start_date` 和 `end_date` 数据属性，并会自动将它们解析为 Date 对象。其他日期属性需要额外处理。为了让新增的 `planned_start` 和 `planned_end` 属性被 dhtmlxGantt 识别，需要在 [`onTaskLoading`](api/event/ontaskloading.md) 事件处理程序中使用 `parseDate()` 方法将它们解析为 Date 对象。

~~~js
gantt.attachEvent("onTaskLoading", (task) => {
    task.planned_start = gantt.date.parseDate(task.planned_start, gantt.config.date_format);
    task.planned_end = gantt.date.parseDate(task.planned_end, gantt.config.date_format);
    return true;
});
~~~

### 第四步。为计划时间显示自定义元素

然后，调用 [`addTaskLayer()`](api/method/addtasklayer.md) 方法，以显示由 `planned_start` 和 `planned_end` 属性定义的计划时间。

~~~js
gantt.addTaskLayer((task) => {
    if (task.planned_start && task.planned_end) {
        const taskPosition = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        const baselineElement = document.createElement('div');
        baselineElement.className = 'baseline';
        baselineElement.style.left = taskPosition.left + 'px';
        baselineElement.style.width = taskPosition.width + 'px';
        baselineElement.style.top = taskPosition.top + gantt.config.task_height + 13 + 'px';
        return baselineElement;
    }
    return false;
});
~~~

### 第五步。为新增元素指定 CSS 规则

接下来，为新元素添加样式：

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255, 153, 0);
}
~~~

### 第六步。在轻量级对话框中为新增数据属性添加编辑能力

最后，如果你希望从 UI 提供编辑新添加的属性的可能性，请重新定义 `lightbox` 结构。

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" },
    {
        name: "baseline",
        height: 72,
        map_to: {
            start_date: "planned_start",
            end_date: "planned_end"
        },
        type: "duration"
    }
];
gantt.locale.labels.section_baseline = "Planned";
~~~

此示例的完整代码可以在相关示例中查看。

**相关示例**： [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

## 自定义内容示例

下列示例演示了将 [`addTaskLayer()`](api/method/addtasklayer.md) 方法应用于时间线的不同自定义元素，以丰富 Gantt 图的时间线：

- [自定义基线](https://snippet.dhtmlx.com/wv23be05)
- [高亮显示超时的单元格](https://snippet.dhtmlx.com/bk5m6his) 
- [高亮显示逾期任务](https://snippet.dhtmlx.com/p74m3du2)
- [显示整个项目错过的截止日期](https://snippet.dhtmlx.com/cuc7d4vn)
- [显示任务进度值](https://snippet.dhtmlx.com/bpupkrce)
- [为任务添加自定义元素](https://snippet.dhtmlx.com/quqe9s2o)
- [可拖拽的基线](https://snippet.dhtmlx.com/pmuy0lj8)
- [带有可拖拽进度旋钮的基线](https://snippet.dhtmlx.com/38h66bni)
- [自定义里程碑](https://snippet.dhtmlx.com/70kqo4do)
- [周期性任务](https://snippet.dhtmlx.com/5/7faa7b03a) 


## 自定义元素的拖放

如果我们探讨为自定义元素启用拖放功能，可能对你有帮助。问题在于 DHTMLX Gantt 中并没有用于实现自定义拖放的内置函数，但也可以通过相对简单的方式手动实现。

在这里你需要捕获三个 DOM 事件：`mousedown`、`mousemove` 和 `mouseup`，并定义一对标志来在这些事件之间存储拖放的状态。

1. `mousedown` 事件表示拖放开始。然而，这也可能是常规 `click` 事件的第一步，不应触发拖放。在这一阶段，你需要设置一个标志，表示请求进行拖放，并记录初始鼠标位置以及后续可能需要的其他数据。

~~~js
let dndRequested = false;
let dndActivated = false;
let startPosition = null;
let startTimestamp = null;
let taskId = null;
const domUtils = gantt.utils.dom;
// 在本示例中，我们将拖动 `.baseline` 元素，放在 `gantt.$task_data` 容器内
gantt.event(gantt.$task_data, 'mousedown', (event) => {
    // 使用 element.closest 或 gantt.utils.dom.closest 定位可拖动元素
    const draggableElement = domUtils.closest(event.target, '.baseline');

    if (draggableElement) {
        // 目前还不知道用户是否会拖动该元素还是只是点击它
        // 存储事件信息，我们将在 'mousemove' 时进行检查
        dndRequested = true;
        startTimestamp = Date.now();
        startPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        taskId = draggableElement.getAttribute("data-task");
    }
});
~~~

请注意，事件处理程序是使用 [`gantt.event()`](api/method/event.md) 而不是本地的 [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 添加的。之所以这样，是因为 Gantt 可以通过 `gantt.destructor()` 方法销毁，且所有通过 `gantt.event()` 绑定的事件都会自动清除。如果你使用原生方法并执行 `gantt.destructor()`，可能需要手动清除事件处理程序以避免内存泄漏。

2. 实际的拖放将在 `mousemove` 处理程序中开始。与其在用户点击鼠标时直接启动拖放，不如将当前鼠标位置与在 `mousedown` 保存的初始位置进行比较。这样只有在当前位置与初始位置有足够差异时才开始拖放。如果你不想设置拖放的最小阈值，也可以估算自 `mousedown` 起经过的时间。

一旦确定拖放已开始，你就可以使用 `mousemove` 事件处理程序来更新屏幕上被拖动元素的位置。如果拖动的是通过 `gantt.addTaskLayer` 添加的自定义图层元素，推荐的刷新方式是修改底层对象并通过 Gantt API（[`gantt.refreshTask()`](api/method/refreshtask.md)）重新绘制，而不是直接修改 DOM 元素。

~~~js
gantt.event(window, 'mousemove', (event) => {
    if (dndRequested && gantt.isTaskExists(taskId)) {
        // 在 'mousedown' 事件之后捕获了 'mousemove'
        const currentPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        if (!dndActivated) {
            // 'mousemove' 可能是常规点击过程的一部分，
            // 我们不想在常规点击上触发拖放
            // 检查鼠标位置是否有显著变化，或用户按下鼠标的时间是否超过常规点击
            if (Math.abs(currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp) > 500) {
                // 如果是，则认为拖放已开始
                dndActivated = true;
            }
        }
        if (dndActivated) {
            // 在此处可以更新被拖动元素的位置
            // 当拖动的是通过 `gantt.addTaskLayer` 添加的图层元素时，
            // 最好的刷新方式是更新任务对象并通过 `gantt.refreshTask` 重新绘制
            // 你也可以获取时间刻度的相应日期：
            const pointerDate = gantt.dateFromPos(currentPosition.x);
            gantt.getTask(taskId).baseline_date = pointerDate;
            gantt.refreshTask(taskId);
        }
    }
});
~~~

3. 最后，需捕获 `mouseup` 事件。如果已开始拖放，请对移动的对象应用更改，如有需要调用 [`gantt.updateTask()`](api/method/updatetask.md) 方法，并清除所有临时标志。

~~~js
gantt.event(window, 'mouseup', (event) => {
    // 如果拖放正在进行，则应用更改
    if (dndActivated) {
        // 如有需要，进行校验并最终化更改
        const task = gantt.getTask(taskId);
        task.baseline_date = gantt.roundDate({
            date: task.baseline_date,
            unit: "hour",
            step: 1
        });
        // 调用 gantt.updateTask 以触发数据更新
        gantt.updateTask(taskId);
    }
    // 清除前面阶段设置的所有标志
    dndRequested = false;
    dndActivated = false;
    startPosition = null;
    startTimestamp = null;
    taskId = null;
});
~~~

## 图表的额外覆盖层

dhtmlxGantt 提供了在甘特图上方添加额外图层以放置自定义内容的可能性。作为覆盖层，你可以使用一个 div 容器、HTML 画布等。绘制覆盖层内容时，可以使用任意第三方库。

例如，你可以在额外覆盖层中添加一个 S 形曲线。通常，S 曲线用于显示费用的增长、材料供应的减少等，并用于跟踪项目任务执行的总体进度。

要在 Gantt 中添加覆盖层，需要完成两步：

- 使用 [`gantt.plugins()`](api/method/plugins.md) 方法启用 `overlay` 扩展

~~~js
gantt.plugins({
    overlay: true
});
~~~

- 使用 `gantt.ext.overlay` 对象的 `addOverlay()` 方法，并传入一个包含向覆盖层中添加内容逻辑的函数。该函数接受一个包含自定义内容的容器作为参数。见下方示例。

下面的示例演示了如何添加一个画布覆盖层，用 S 曲线显示项目的目标和实际进度（使用 [ChartJS](https://www.chartjs.org/) 库实现）：

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    const chartContext = canvas.getContext("2d");
    const progressChart = new Chart(chartContext, {
        type: "line",
        // 完整图表配置
    });
});
~~~

`gantt.ext.overlay.addOverlay()` 方法返回新覆盖层的 id，类型为数字。

**相关示例**： [Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

### Overlay extension API

**dhtmlxgantt_overlay** 扩展包含一组用于处理覆盖层的 API 方法。通过 `gantt.ext.overlay` 对象可用。

#### `addOverlay()`

向甘特图添加一个新的覆盖层并返回其 id。参数是包含自定义内容的容器。

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {});
~~~

#### `deleteOverlay()`

按其 id 删除一个覆盖层。

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### `getOverlaysIds()`

返回一个包含添加到图表的覆盖层的 id 的数组。

~~~js
const overlayIds = gantt.ext.overlay.getOverlaysIds();
~~~

#### `refreshOverlay()`

重新绘制指定的覆盖层。参数为覆盖层的 id。

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### `showOverlay()`

按其 id 显示一个覆盖层。参数为覆盖层的 id。

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### `hideOverlay()`

按其 id 隐藏一个覆盖层。

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### `isOverlayVisible()`

检查指定覆盖层是否可见。若可见则返回 `true`。

~~~js
const isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~