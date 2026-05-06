---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox event
description: "在用户打开 lightbox（编辑表单）之前立即触发"
---

# onBeforeLightbox

### Description

@short: 在用户打开 lightbox（编辑表单）之前立即触发

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务 ID

### Returns
- ` result` - (boolean) - 定义事件的默认行为是否会被触发（<b>true</b>）或取消（<b>false</b>）

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

- 该事件是可阻塞的。返回 *false* 以取消默认处理（打开 lightbox）。
- 使用此事件是自定义 lightbox 中某些内容的一个好方法。