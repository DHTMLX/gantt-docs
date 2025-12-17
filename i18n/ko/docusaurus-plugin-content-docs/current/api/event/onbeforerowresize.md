---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "사용자가 드래그 앤 드롭으로 행 높이 조절을 시작하기 직전에 트리거됩니다."
---

# onBeforeRowResize

### Description

@short: 사용자가 드래그 앤 드롭으로 행 높이 조절을 시작하기 직전에 트리거됩니다.

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` param` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중지될지(<b>false</b>)를 나타냅니다.

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

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 행 높이 변경이 중지됩니다.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- v7.1에 추가됨

