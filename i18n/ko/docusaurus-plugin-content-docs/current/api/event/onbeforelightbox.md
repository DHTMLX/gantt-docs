---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox 이벤트
description: "사용자가 lightbox(편집 양식)를 열기 직전에 바로 발생합니다"
---

# onBeforeLightbox

### Description

@short: 사용자가 lightbox(편집 양식)를 열기 직전에 바로 발생합니다

@signature: onBeforeLightbox: (id: string | number) => boolean;

### Parameters

- `id` - (필수) *string | number* - 작업 ID

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부 (<b>false</b>)

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

- 이 이벤트는 차단 가능합니다. 기본 처리(라이트박스 열기)를 취소하려면 *false*를 반환합니다.
- 이 이벤트를 사용하면 라이트박스에서 무언가를 커스터마이즈하는 좋은 방법입니다.