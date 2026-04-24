---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd 이벤트
description: "행 높이가 완료되기 전에 크기 조정 이벤트가 발생합니다"
---

# onBeforeRowResizeEnd

### Description

@short: 행 높이의 크기 조정이 완료되기 전에 발생합니다

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (필수) *number | string* - 작업 ID
- `task` - (필수) *Task* - 작업 객체
- `newHeight` - (필수) *number* - 행의 새 높이

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> is now <b>${newHeight}px</b> height`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onRowResize](api/event/onrowresize.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- v7.1에 추가됨