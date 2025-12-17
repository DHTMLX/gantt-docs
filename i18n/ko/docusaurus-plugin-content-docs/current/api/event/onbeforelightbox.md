---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox event
description: "라이트박스(편집 폼)가 열리기 직전에 트리거됩니다."
---

# onBeforeLightbox

### Description

@short: 라이트박스(편집 폼)가 열리기 직전에 트리거됩니다.

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업(task) ID

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 진행할지(<b>true</b>) 중단할지(<b>false</b>) 결정합니다.

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

- 이 이벤트는 차단할 수 있습니다. *false*를 반환하면 라이트박스가 열리는 것을 막습니다.
- 라이트박스가 나타나기 전에 커스텀 조정을 할 수 있는 편리한 방법입니다.
