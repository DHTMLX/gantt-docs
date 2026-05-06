---
sidebar_label: placeholder_task
title: placeholder_task config
description: "키보드로 작업 편집을 간소화하기 위해 작업 목록 끝에 빈 행을 추가합니다"
---

# placeholder_task

### Description

@short: 키보드로 작업 편집을 간소화하기 위해 작업 목록 끝에 빈 행을 추가합니다

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// or
gantt.config.placeholder_task = {
   // moves focus to the placeholder task after adding a new task
   focusOnCreate: true
};
~~~

**Default value:** false

### Related samples
- [Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- 자리 표시 태스크는 작업 목록 끝에 자동으로 추가됩니다.
- UI에서 수정되고 **gantt.updateTask()** 호출을 받으면 목록의 끝에 새 태스크가 추가됩니다.
- 자리 표시 태스크는 type 값으로 감지할 수 있습니다:

~~~js
if(task.type == gantt.config.types.placeholder){
   // do something
}
~~~


- Gantt가 삽입될 때 [onTaskCreated](api/event/ontaskcreated.md) 및 [onAfterTaskAdd](api/event/onaftertaskadd.md) 이벤트를 발행합니다.
- [gantt.dataProcessor](guides/server-side.md)가 자리 표시 아이템에 대해 **onBeforeUpdate** 이벤트를 발행하지만 백엔드 요청은 발생시키지 않습니다.

### Related Guides
- [Inline Editing in Grid](guides/inline-editing.md#inline-editing-modes)