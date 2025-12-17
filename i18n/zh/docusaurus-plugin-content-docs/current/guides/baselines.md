---
title: "时间线区域中的自定义元素"
sidebar_label: "时间线区域中的自定义元素"
---

时间线区域中的自定义元素
==========================================

:::info
此功能仅在 PRO 版本中可用
:::

dhtmlxGantt 默认包含了[内置功能](guides/inbuilt-baselines.md)，可以渲染诸如基线、截止日期和任务约束等额外元素。如果你希望扩展或调整这些功能，可以按照下述方法手动向时间线添加自定义元素。

添加额外元素通常涉及创建一个显示层，并使用绝对定位将自定义元素对齐到对应的任务上。

**要为时间线区域添加额外层**，请使用 [addTaskLayer](api/method/addtasklayer.md) 方法。该方法接收一个函数作为参数，该函数:

- 接收一个任务对象；
- 返回用于显示的 DOM 元素，或者在需要隐藏该任务元素时返回 *false*。

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // your code
    return el;
});
~~~

[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


注意:

1. 调用该方法后，dhtmlxGantt 会在时间线区域添加一个容器。
2. 渲染数据时，[addTaskLayer](api/method/addtasklayer.md) 方法会针对每个任务调用，并将返回的 DOM 元素追加到容器中。
3. 你可以使用标准的绝对定位来放置元素。
4. 当 Gantt 任务被更新时，所有层（包括自定义层）都会被更新（该函数会针对更新的任务再次调用，并替换相关的 DOM 元素）。
5. dhtmlxGantt 提供了一个用于计算任务位置和尺寸的方法--[getTaskPosition](api/method/gettaskposition.md)。你可以用它来确定自定义元素的位置和尺寸。

*关于提升自定义元素渲染性能的建议，请参阅 [addTaskLayer](api/method/addtasklayer.md) 文章。*

:::note
如果你希望在每个时间线单元格中显示自定义内容，更简单高效的方式是直接使用 [timeline_cell_content](api/template/timeline_cell_content.md) 模板将 HTML 插入到单元格中。
:::

使用示例
--------------------------

以下是一个使用该功能的示例:假设你希望同时展示任务的计划时间和实际时间。

![baselines](/img/baselines.png)

### 步骤 1. 减小任务高度并将任务条上移

最初，任务显示如下:

![baselines_start](/img/baselines_start.png)

为了在任务条下方留出基线空间，将任务条高度减少到大约行高的一半:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

然后，使用如下 CSS 将任务条移动到行顶端:

~~~css
.gantt_task_line, .gantt_line_wrapper {
    margin-top: -9px;
}
.gantt_side_content {
    margin-bottom: 7px;
}
.gantt_task_link .gantt_link_arrow {
    margin-top: -12px
}
.gantt_side_content.gantt_right {
    bottom: 0;
}
~~~

结果如下:

![baselines_task_height](/img/baselines_task_height.png)

### 步骤 2. 添加额外数据属性

接下来，在任务对象中添加额外的数据属性，如 'planned_start' 和 'planned_end'。

![baseline_task_object](/img/baseline_task_object.png)

### 步骤 3. 将新增的数据属性转换为 Date 对象

dhtmlxGantt 会自动识别并解析 'start_date' 和 'end_date' 为 Date 对象。其他日期属性则需要手动解析。


要让 'planned_start' 和 'planned_end' 能被 dhtmlxGantt 使用，可以在 [onTaskLoading](api/event/ontaskloading.md) 事件处理器中，使用 parseDate() 方法进行解析。

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
    task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
    return true;
});
~~~

### 步骤 4. 为计划时间显示自定义元素

然后，使用 [addTaskLayer](api/method/addtasklayer.md) 方法，为每个任务（从 'planned_start' 到 'planned_end'）显示计划时间。

~~~js
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        var el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.width = sizes.width + 'px';
        el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
        return el;
    }
    return false;
});
~~~

### 步骤 5. 为新增元素指定 CSS 样式

最后，为你的新元素添加 CSS 样式:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255,153,0);
}
~~~

### 步骤 6. 允许在弹窗中编辑新增的数据属性

为了让用户能够通过界面编辑新添加的属性，需要相应地重新定义 lightbox 的结构。

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", height: 72, map_to: "auto", type: "duration"},
    {name: "baseline", height: 72, map_to: { 
        start_date: "planned_start", end_date: "planned_end"}, type: "duration"}
];
gantt.locale.labels.section_baseline = "Planned";
~~~

你可以在相关示例中找到完整的代码示例。


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


自定义内容示例
----------------

以下是一些示例，展示了如何使用 [addTaskLayer()](api/method/addtasklayer.md) 方法，为 Gantt 图时间线增强多种自定义元素:

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


自定义元素的拖放
----------------------------------

如果你希望为自定义元素启用拖放功能，需要了解 DHTMLX Gantt 并未内置该功能，但你可以通过一些简单的步骤手动实现。

基本思路是监听三个 DOM 事件（**mousedown**、**mousemove**、**mouseup**），并通过几个标志变量在这些事件之间跟踪拖放状态。

1. **mousedown** 事件表示可能开始拖放。但这也可能只是正常点击的开始，不应触发拖拽。此时设置标志表示请求拖拽，并保存初始鼠标位置及其他相关数据。

~~~js
var dndRequested = false;
var dndActivated = false;
var startPosition = null;
var startTimestamp = null
var taskId = null;
var domUtils = gantt.utils.dom;
// 在本示例中，我们将在 `gantt.$task_data` 容器内拖动 `.baseline` 元素
gantt.event(gantt.$task_data, 'mousedown', function(e) {
  // 使用 element.closest 或 gantt.utils.dom.closest 定位可拖拽元素
  var draggableElement = domUtils.closest(e.target, '.baseline');
 
  if (draggableElement) {
    // 此时还无法确定用户是要拖拽还是仅点击
    // 先存储事件信息，稍后在 'mousemove' 中判断
    dndRequested = true;
    startTimestamp = Date.now();
    startPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    taskId = draggableElement.getAttribute("data-task");
  }
});
~~~

注意，事件处理器是通过 [gantt.event](api/method/event.md) 而不是原生 [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 附加的。这是因为当 Gantt 实例被 **gantt.destructor** 销毁时，所有通过 **gantt.event** 添加的处理器会自动清理。使用原生事件监听器则需要手动移除以避免内存泄漏。

2. 真正的拖放过程在 **mousemove** 事件中启动。不是在鼠标按下时立即开始拖动，而是将当前鼠标位置与之前保存的位置进行比较。只有当鼠标移动超过一定阈值时，才认为开始拖拽。你也可以判断鼠标按下的时间是否超过正常点击的时长。

拖动开始后，**mousemove** 处理器会更新被拖动元素的位置。对于通过 `gantt.addTaskLayer` 添加的元素，建议更新关联的任务数据，并通过 [gantt.refreshTask](api/method/refreshtask.md) 刷新任务，而不是直接操作 DOM。

~~~js
gantt.event(window, 'mousemove', function(e) {
  if (dndRequested && gantt.isTaskExists(taskId)) {
    // 捕获到 'mousemove'，且之前有 'mousedown' 事件
    var currentPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    if (!dndActivated) {
      // 'mousemove' 可能只是普通点击过程的一部分，
      // 不希望在普通点击时触发拖放
      // 检查鼠标位置是否有显著变化，或按下时间是否超过正常点击
      if(Math.abs(
          currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp
        ) > 500) {
          // 满足条件则认为开始拖拽
          dndActivated = true;
      }
    }
    if (dndActivated) {
      // 这里可以更新被拖动元素的位置
      // 对于通过 `gantt.addTaskLayer` 添加的元素，
      // 建议更新任务对象并通过 `gantt.refreshTask` 重绘
      // 也可以获取时间轴对应的日期：
      var pointerDate = gantt.dateFromPos(currentPosition.x);
      gantt.getTask(taskId).baseline_date = pointerDate;
      gantt.refreshTask(taskId);
    }
  }
 
});
~~~

3. 最后监听 **mouseup** 事件。如果发生了拖拽，则通过日期取整、调用 [gantt.updateTask](api/method/updatetask.md) 等操作完成变更，并重置所有临时标志变量。

~~~js
gantt.event(window, 'mouseup', function(e) {
  // 如果正在拖拽，则应用变更
  if (dndActivated) {
    // 校验并最终确定变更
    var task = gantt.getTask(taskId);
    task.baseline_date = gantt.roundDate({
      date: task.baseline_date,
      unit: "hour",
      step: 1    
    });
    // 调用 gantt.updateTask 以触发数据更新    
    gantt.updateTask(taskId);
  }
  // 清除之前设置的所有标志
  dndRequested = false;
  dndActivated = false;
  startPosition = null;
  startTimestamp = null;
  taskId = null;
});
~~~

为图表添加额外覆盖层
----------------

dhtmlxGantt 允许你在图表上添加额外图层，以放置自定义内容。该覆盖层可以是 div 容器、HTML canvas 或其他元素。你可以使用任何第三方库在其中渲染内容。

例如，你可以添加 S 曲线覆盖层，常用于可视化项目中的费用增长、材料消耗或整体进度。

要添加覆盖层，请按照以下两步操作:

- 通过 [gantt.plugins](api/method/plugins.md) 方法启用 **overlay** 扩展:

~~~js
gantt.plugins({
    overlay: true
});
~~~

- 使用 **gantt.ext.overlay** 对象的 **addOverlay()** 方法，传入一个用于向覆盖层容器添加自定义内容的函数。该函数接收容器元素作为参数。参考下方示例。

以下示例演示如何利用 [ChartJS](https://www.chartjs.org/) 库，在覆盖层中添加代表目标与实际项目进展的 S 曲线:

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        // 完整的图表配置
    });
});
~~~

**gantt.ext.overlay.addOverlay()** 方法会返回新覆盖层的数字 id。


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


### Overlay 扩展 API

**dhtmlxgantt_overlay** 扩展通过 **gantt.ext.overlay** 对象提供一组 API 方法，用于操作覆盖层。

#### addOverlay

向 Gantt 图添加一个新覆盖层并返回其 id。你需要提供一个接收自定义内容容器的函数。

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

#### deleteOverlay

根据 id 移除覆盖层。

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### getOverlaysIds 

返回图表中所有覆盖层的 id 数组。

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

#### refreshOverlay

根据 id 重绘指定的覆盖层。

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### showOverlay

根据 id 显示覆盖层。

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### hideOverlay

根据 id 隐藏覆盖层。

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### isOverlayVisible

检查指定覆盖层是否可见。如果可见，返回 *true*。

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

