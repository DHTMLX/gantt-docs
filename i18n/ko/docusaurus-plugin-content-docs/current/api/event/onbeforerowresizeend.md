---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "행 높이 조정 프로세스가 완료되기 직전에 트리거됩니다."
---

# onBeforeRowResizeEnd

### Description

@short: 행 높이 조정 프로세스가 완료되기 직전에 트리거됩니다.

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number | string* - 작업 식별자
- `task` - (required) *Task* - 작업 객체 자체
- `newHeight` - (required) *number* - 업데이트된 행의 높이

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지(<b>true</b>) 중단할지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> 의 높이가 이제 <b>${newHeight}px</b> 입니다`);
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
- v7.1에서 도입됨

