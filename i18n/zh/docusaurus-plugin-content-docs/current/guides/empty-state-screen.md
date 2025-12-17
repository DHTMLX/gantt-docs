---
title: "空状态屏幕"
sidebar_label: "空状态屏幕"
---

空状态屏幕
================

自 8.0 版本起，该库支持在甘特图未加载任何数据时，在网格中显示一个占位元素的空屏幕（"空状态"）。

![empty screen tip](/img/empty_screen.png)

默认情况下，占位元素是隐藏的。要启用它，请进行如下配置:

~~~js
gantt.config.show_empty_state = true;
~~~


[Show empty state screen](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)


## EmptyStateElement 对象

"空状态"功能通过 [emptyStateElement](guides/empty-state-element-ext.md) 扩展提供多种 API 方法。

空状态不仅会在甘特图没有加载任务时显示，也会在任务已加载但被过滤后页面上不可见时显示。要处理这种情况，可以使用 **isEnabled()** 方法:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~

如果你希望在时间轴区域而不是网格中显示空状态，可以使用 **getContainer()** 方法:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

如需自定义空状态下显示的内容，可以重写 **renderContent()** 方法:

~~~js
gantt.ext.emptyStateElement.renderContent = function (container) {
    const placeholderTextElement = `<div class='gantt_empty_state_text'>
    <div class='gantt_empty_state_text_link' data-empty-state-create-task>
       ${gantt.locale.labels.empty_state_text_link}</div>
    <div class='gantt_empty_state_text_description'>
       ${gantt.locale.labels.empty_state_text_description}</div>
    </div>`;
    const placeholderImageElement = "<div class='gantt_empty_state_image'></div>";

    const placeholderContainer = `<div class='gantt_empty_state'>
       ${placeholderImageElement}${placeholderTextElement}</div>`;
    container.innerHTML = placeholderContainer;
}
~~~
