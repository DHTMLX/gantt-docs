---
sidebar_label: onMouseMove
title: onMouseMove 事件
description: "当鼠标移动到甘特图容器上时触发"
---

# onMouseMove

### Description

@short: 当鼠标在甘特图容器上移动时触发

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 鼠标移动到的任务的 id
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

此事件是绑定到 **gantt.$root** 元素的原生 [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) 事件监听器的别名。

当事件目标是任务元素的一个节点时，相应的任务 id 将作为第一个参数传入。否则，第一个参数将为 null。

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
sample: [在鼠标光标下获取日期时间](https://snippet.dhtmlx.com/3rn86wwq)
:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)