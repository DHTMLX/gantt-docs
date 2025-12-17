---
sidebar_label: onMouseMove
title: onMouseMove event
description: "当鼠标在甘特图容器上移动时触发"
---

# onMouseMove

### Description

@short: 当鼠标在甘特图容器上移动时触发

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 当前鼠标悬停的任务的id
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // 在这里编写您的自定义逻辑
});
~~~

### Details

此事件是绑定到 **gantt.$root** 元素的原生 [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) 事件监听器的别名。

如果事件目标是任务元素的一部分，则第一个参数将是该任务的id。
如果不是，则第一个参数为null。


~~~js
gantt.message({
    expire: -1,
    text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
    const helper = gantt.utils.dom;
    if(helper.isChildOf(e.target, gantt.$task_data)){
          const textContainer = document.querySelector("#pointer-date");
        const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
        const pointerDate = gantt.dateFromPos(pos.x);
        textContainer.innerText = formatDate(pointerDate);
    }
});
~~~
:::note
Sample: [获取鼠标光标下的日期时间](https://snippet.dhtmlx.com/3rn86wwq) 
:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- [操作指南](guides/how-to.md)

