---
title: "clickDrag 扩展"
sidebar_label: "clickDrag 扩展"
---

# clickDrag 扩展

关于 clickDrag 扩展的更多信息，请参阅文章 [DnD로 작업 생성/선택하기](guides/advanced-dnd.md)。

## 配置对象

要启用高级拖放功能，需要设置 [click_drag](api/config/click_drag.md) 配置选项，并在其对象中包含下列所需属性:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - 为选中的元素应用自定义 CSS 类
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - 事件附加和选择发生的元素
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - 控制渲染过程中是否使用 requestAnimationFrame
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - 鼠标按钮释放时触发的函数。它接收 6 个参数:
    - **_startPoint?_** - (*object*) - 包含以下属性:
        - **_absolute_** - (*object*) - 相对于文档左上角的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
        - **_relative_** - (*object*) - 相对于 viewPort 元素左上角的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
    - **_endPoint?_** - (*object*) - 与 startPoint 结构相同，表示拖动结束位置
        - **_absolute_** - (*object*) - 相对于文档左上角的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
        - **_relative_** - (*object*) - 相对于 viewPort 元素左上角的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
    - **_startDate?_** - (*Date*) - 与 startPoint 对应的日期
    - **_endDate?_** - (*Date*) - 与 endPoint 对应的日期
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - 起止日期之间的任务
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - 在起止坐标之间垂直选中的任务
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - 若为 true，则选择仅限于高度与任务匹配的单行
- <span class="subproperty">**ignore?**</span> - (*string*) - 不应激活拖放的元素的 CSS 选择器
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - 仅在按住指定的修饰键时才激活拖放。支持的键有:"ctrlKey"、"shiftKey"、"metaKey"、"altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - 返回拖动过程中显示的元素的函数。它接收两个参数:
    - **_startPoint?_** - (*object*) - 包含:
        - **_absolute_** - (*object*) - 相对于文档左上角的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
        - **_relative_** - (*object*) - 相对于 viewPort 元素左上角的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
    - **_endPoint?_** - (*object*) - 与 startPoint 结构相同，表示当前拖动位置
        - **_absolute_** - (*object*) - 相对于文档的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置
        - **_relative_** - (*object*) - 相对于 viewPort 元素的坐标
            - **_left_** - (*number*) - 水平位置
            - **_top_** - (*number*) - 垂直位置


## 事件

以下事件可以绑定到用作 viewPort 的元素上（默认是 gantt.$task_data，即包含任务条的时间线区域）:

- **onBeforeDrag** - 鼠标按钮按下后、拖动开始前触发
- **onDrag** - 拖动过程中、鼠标按钮释放前持续触发
- **onBeforeDragEnd** - 鼠标按钮释放后、拖动渲染元素移除和选中任务识别前触发
- **onDragEnd** - 拖动元素移除并找到选中任务后、但在回调函数调用前（如果有）触发

