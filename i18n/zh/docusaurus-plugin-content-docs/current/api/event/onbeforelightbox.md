---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox event
description: "在 lightbox（编辑表单）打开之前触发"
---

# onBeforeLightbox

### Description

@short: 在 lightbox（编辑表单）打开之前触发

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务的 ID

### Returns
- ` result` - (boolean) - 决定是否继续执行默认事件动作（<b>true</b>）或阻止执行（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeLightbox", function(id) {
      const task = gantt.getTask(id);
       task.my_template = `<span id='title1'>Holders: </span>${task.users}
    <span id='title2'>Progress: </span>${task.progress*100}%`;
    return true;
});
~~~

### Related samples
- [Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

- 该事件可以被阻止。返回 *false* 将阻止 lightbox 打开。
- 这是在 lightbox 显示之前进行自定义调整的便捷方式。
