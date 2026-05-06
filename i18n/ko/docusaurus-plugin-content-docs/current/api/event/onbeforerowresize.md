---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize 이벤트
description: "사용자가 드래그 앤 드롭으로 행 높이를 크기 조정하기 시작하기 전에 발생합니다"
---

# onBeforeRowResize

### Description

@short: 사용자가 드래그 앤 드롭으로 행 높이 조정 시작하기 전에 발생합니다

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` param` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소됩니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResize", function (task) {
    gantt.message(`Start resizing <b>${task.text}</b>`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

이벤트는 차단 가능합니다. *false*를 반환하면 행 높이가 조정되지 않습니다.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- v7.1에서 추가됨