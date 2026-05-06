---
title: "clickDrag 扩展"
sidebar_label: "clickDrag 扩展"
---

# clickDrag Extension

在文章 [创建/选择带拖拽的任务](guides/advanced-dnd.md) 中了解关于 clickDrag 扩展的详细信息。

## 配置对象

要启用高级拖拽，请指定 [click_drag](api/config/click_drag.md) 配置选项，并在其对象中从下列列表设置所需属性：

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - 为选定元素设置自定义 CSS 类
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - 要附加事件并用于选择的元素
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - 定义在渲染期间是否使用 requestAnimationFrame
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - 松开鼠标时将被调用的函数。共接收 6 个参数：
    - **_startPoint?_** - (*object*) - 一个包含以下属性的对象：
        - **_absolute_** - (*object*) - 文档左上角的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
        - **_relative_** - (*object*) - 作为 viewPort 使用的左上角元素的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
    - **_endPoint?_** - (*object*) - 一个包含以下属性的对象：
        - **_absolute_** - (*object*) - 文档左上角的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
        - **_relative_** - (*object*) - 作为 viewPort 使用的左上角元素的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
    - **_startDate?_** - (*Date*) - 对应起始点的日期
    - **_endDate?_** - (*Date*) - 对应结束点的日期
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - 起始日期与结束日期之间的任务数组
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - 在垂直方向上选中的起始点与结束点之间的任务数组
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - true 时仅在一个等于任务高度的行中添加选择
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS 选择器。匹配该选择器的元素将不触发拖放
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - 如果指定该属性，只有按下指定的修饰键时才启用拖放。支持的值有："ctrlKey"、"shiftKey"、"metaKey"、"altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - 在拖拽过程中创建并渲染的元素的函数。接收两个参数：
    - **_startPoint?_** - (*object*) - 一个包含以下属性的对象：
        - **_absolute_** - (*object*) - 文档左上角的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
        - **_relative_** - (*object*) - 作为 viewPort 使用的左上角元素的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
    - **_endPoint?_** - (*object*) - 一个包含以下属性的对象：
        - **_absolute_** - (*object*) - 文档左上角的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标
        - **_relative_** - (*object*) - 作为 viewPort 使用的左上角元素的坐标
            - **_left_** - (*number*) - 左坐标
            - **_top_** - (*number*) - 上坐标


## 事件

您可以将以下事件附加到作为 viewPort 传递的元素上（默认是 gantt.$task_data —— 带任务条时间线的一部分）：

- **onBeforeDrag** - 在按下鼠标按钮后、开始拖动之前触发
- **onDrag** - 在拖动开始后、鼠标按钮释放之前触发
- **onBeforeDragEnd** - 在释放鼠标按钮后但渲染的元素被删除并且搜索到被选中的任务之前触发
- **onDragEnd** - 在移除渲染的元素并找到被选中的任务后、但在调用回调函数（若指定）之前触发