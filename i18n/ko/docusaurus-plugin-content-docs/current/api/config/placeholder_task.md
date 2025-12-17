---
sidebar_label: placeholder_task
title: placeholder_task config
description: "작업 목록 끝에 빈 행을 추가하여 키보드로 작업 편집을 더 쉽게 만듭니다."
---

# placeholder_task

### Description

@short: 작업 목록 끝에 빈 행을 추가하여 키보드로 작업 편집을 더 쉽게 만듭니다.

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// 또는
gantt.config.placeholder_task = {
   // 새 작업 추가 후 placeholder 작업에 포커스를 이동합니다.
   focusOnCreate: true
};
~~~

**Default value:** false

### Related samples
- [Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- 작업 목록 끝에 빈 placeholder 작업이 자동으로 추가됩니다.
- UI를 통해 placeholder를 편집하고 **gantt.updateTask()**가 호출되면, 새 작업이 목록 끝에 추가됩니다.
- type 속성을 확인하여 placeholder를 식별할 수 있습니다:

~~~js
if(task.type == gantt.config.types.placeholder){
   // 작업 수행
}
~~~

- placeholder가 추가될 때 Gantt는 [onTaskCreated](api/event/ontaskcreated.md) 및 [onAfterTaskAdd](api/event/onaftertaskadd.md) 이벤트를 트리거합니다.
- [gantt.dataProcessor](guides/server-side.md)는 placeholder에 대해 **onBeforeUpdate** 이벤트를 발생시키지만 백엔드 요청은 보내지 않습니다.

### Related Guides
- [그리드에서 인라인 편집](guides/inline-editing.md#inlineeditingmodes)

