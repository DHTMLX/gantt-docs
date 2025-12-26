---
sidebar_label: addTaskLayer
title: addTaskLayer method
description: "在时间线区域显示带有自定义任务元素的额外图层"
---

# addTaskLayer
:::info
 此功能仅在PRO版中可用。 
:::
### Description

@short: 在时间线区域显示带有自定义任务元素的额外图层

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (required) *TaskLayerRender | TaskLayerConfig* -       一个渲染函数或配置对象

### Returns
- ` layerId` - (string) - 一个将显示在图层中的DOM元素

### Example

~~~jsx
gantt.init("gantt_here");
gantt.addTaskLayer(function draw_deadline(task) {
    if (task.deadline) {
        var el = document.createElement('div');
        el.className = 'deadline';
        var sizes = gantt.getTaskPosition(task, task.deadline);

        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';

        el.setAttribute('title', gantt.templates.task_date(task.deadline));
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

参数可以是以下类型之一:

- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - 一个函数，接收任务对象并返回一个要显示在图层中的DOM元素。
    - **_task_** - (*Task*) - 任务对象
    - **_timeline?_** - (*any*) - 时间线视图
    - **_config?_** - (*GanttConfigOptions*) - Gantt配置对象
    - **_viewport?_** - (*LayerViewport*) - 视口对象

- **taskLayerConfig** - (*object*) - 额外任务图层的配置对象，包含:
    - **_id?_** - (*string | number*) - 可选的图层ID
    - **_renderer_** - (*object*) - 必需，负责渲染图层元素的对象
        - **_render_** - (*TaskLayerRender*) - 返回要渲染的HTML元素的函数
        - **_update?_** - (*Function*): void - 可选，用于更新已渲染HTML元素的函数
            - **_task_** - (*Task*) - 任务对象
            - **_node_** - (*HTMLElement*) - 渲染节点的容器
            - **_timeline?_** - (*any*) - 时间线视图
            - **_config?_** - (*GanttConfigOptions*) - Gantt配置对象
            - **_viewport?_** - (*LayerViewport*) - 视口对象
        - **_onrender?_** - (*Function*): void - 可选，渲染完成后调用，适合渲染原生组件（例如使用 `ReactDOM.render`）
            - **_task_** - (*Task*) - 任务对象
            - **_node_** - (*HTMLElement*) - 渲染节点的容器
            - **_view?_** - (*any*) - 添加图层的布局单元（默认是时间线）
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - 可选，返回视口矩形的坐标
            - **_task_** - (*Task*) - 任务对象
            - **_view?_** - (*any*) - 添加图层的布局单元（默认是时间线）
            - **_config?_** - (*GanttConfigOptions*) - Gantt配置对象
            - **_gantt?_** - (*GanttStatic*) - Gantt对象
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - 可选，返回可见范围对象
            - **_gantt?_** - (*GanttStatic*) - Gantt对象
            - **_view?_** - (*any*) - 添加图层的布局单元（默认是时间线）
            - **_config?_** - (*GanttConfigOptions*) - Gantt配置对象
            - **_datastore?_** - (*any*) - 任务数据存储对象
            - **_viewport?_** - (*LayerViewport*) - 视口对象
    - **_container?_** - (*HTMLElement*) - 可选，图层的容器元素
    - **_topmost?_** - (*boolean*) - 可选，若为true，元素将显示在任务之上
    - **_filter?_** - (*Function*): boolean - 可选，接收任务对象，返回false时跳过该任务的渲染
        - **_task_** - (*Task*) - 任务对象

图层视口包含以下属性:

- **viewport** -  (*object*) - 图层的视口对象
    - **_x_** - (*number*) - 矩形左边位置
    - **_x_end_** - (*number*) - 矩形右边位置
    - **_y_** - (*number*) - 矩形顶部位置
    - **_y_end_** - (*number*) - 矩形底部位置
    - **_width_** - (*number*) - 矩形宽度
    - **_height_** - (*number*) - 矩形高度

- 请注意，自定义图层会在下一次调用 [gantt.init](api/method/init.md) 后被清除。
- 同时，调用 [gantt.resetLayout()](api/method/resetlayout.md) 会重置自定义图层。若要保持自定义图层可见，需要在调用 [resetLayout](api/method/resetlayout.md) 后重新定义 **gantt.addTaskLayer**。

## 自定义图层的智能渲染

[智能渲染](guides/performance.md#zhinengxuanran)旨在仅显示用户可见的HTML元素，避免渲染被滚动条遮挡的元素。

然而，对于[自定义图层](guides/baselines.md)，Gantt本身并不知道自定义元素的位置，因为渲染逻辑完全由用户控制。

为了解决这个问题，智能渲染假设自定义元素位于其关联任务的同一行。只有当任务所在行在屏幕上可见时，自定义元素才会被添加到DOM中。在此方式下，Gantt忽略水平滚动条的位置，因此自定义元素可能存在于标记中，但如果水平滚动超出视野，则不可见。

这种方法通常效果良好，但如果你有很多图层，可能需要通过提供自定义元素的精确位置来进一步优化渲染。

为此，请使用 *addTaskLayer()* 方法的对象参数，并向 **renderer** 对象提供以下方法:

- **render** - 渲染函数
- **getRectangle** - 返回自定义元素坐标的函数

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

自定义元素的渲染流程如下:

1\. 当水平滚动位置变化时，智能渲染获取当前可见区域的坐标。 <br>
2\. dhtmlxGantt 调用 **getRectangle** 获取每个任务/链接的自定义元素精确坐标。 <br>
3\. 若 **getRectangle** 返回 null，则跳过调用 **render**，不显示自定义元素。<br>
4\. 若 **getRectangle** 返回的坐标与当前视口重叠，则调用 **render** 显示自定义元素。<br>

~~~js
gantt.addTaskLayer({
    renderer: {
      render: function draw_planned(task) {
        if (task.planned_start && task.planned_end) {
          var sizes = gantt.getTaskPosition(task,task.planned_start,task.planned_end);
          var el = document.createElement('div');
          el.className = 'baseline';
          el.style.left = sizes.left + 'px';
          el.style.width = sizes.width + 'px';
          el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
          return el;
        }
        return false;
      },
      // 定义 getRectangle 使图层接入智能渲染
      getRectangle: function(task, view){
        return gantt.getTaskPosition(task, task.planned_start, task.planned_end);
      }
    }
});
~~~

## 渲染自定义元素的可见部分

*addTaskLayer()* 中的 **renderer** 对象还支持通过 **update** 方法更新节点标记，仅显示自定义元素的可见部分:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        update: function(task, node, timeline, viewport){
            ...
            // 更新节点内部HTML以显示当前可见部分
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

- **update** - 允许刷新自定义元素的内部HTML，例如隐藏不可见部分，仅显示可见部分

**update** 方法会在 [onGanttScroll](api/event/onganttscroll.md) 事件后触发，提供由 **render** 创建的任务节点及当前视口。

## 渲染可见的任务行

从v7.1.8开始，**renderer** 对象支持 **getVisibleRange** 函数，用于指定任务行的可见范围:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getVisibleRange: function(){
            ...
            return { 
                  start: indexStart,
                  end: indexEnd
            }
        }
    }
});     
~~~

- **getVisibleRange** - 返回一个对象，包含可见任务行的起始和结束索引。范围外的任务不会渲染额外图层。

如果 **getVisibleRange** 返回 *false* 而非对象，Gantt 会假设所有任务均可见，并为所有任务渲染额外图层。

## 元素渲染回调

**renderer** 对象还包含一个 **onrender** 回调:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        onrender: function(item, node, view){
            console.log("render", item, node)
        }
    }
});
~~~

**onrender** 函数在每次数据项渲染到DOM时调用，提供对数据项、生成的DOM元素以及触发渲染的视图（grid或timeline）的访问。

此回调可用于渲染后修改DOM元素，或在渲染元素内初始化第三方控件。

### Related API
- [getTaskPosition](api/method/gettaskposition.md)
- [removeTaskLayer](api/method/removetasklayer.md)
- [layer_attribute](api/config/layer_attribute.md)

### Related Guides
- [时间线区域中的自定义元素](guides/baselines.md)
- [操作指南](guides/how-to.md) （解释了如何在时间线上垂直重新排序任务）

