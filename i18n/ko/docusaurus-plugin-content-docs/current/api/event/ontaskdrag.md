---
sidebar_label: onTaskDrag
title: onTaskDrag event
description: "사용자가 작업을 드래그할 때 발생함"
---

# onTaskDrag

### Description

@short: 사용자가 작업을 드래그할 때 발생함

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `mode` - (required) *string* - 드래그 모드 ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - 현재(드래그 중인) 작업 객체
- `original` - (required) *Task* - 원본(초기) 작업 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    //여기에 커스텀 로직 작성
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

이 이벤트는 사용자가 타임라인 영역 내에서 마우스를 드래그하여 작업을 이동, 크기 조절하거나 작업 진행 상황을 업데이트할 때마다 발생합니다. 드래그 유형은 두 번째 인자인 **mode**로 표시됩니다. 가능한 모든 드래그 모드 값은 [drag_mode](api/config/drag_mode.md) 파일에서 확인할 수 있습니다.

요약하면, 프로세스는 다음과 같습니다:

1. 사용자가 드래그 동작을 시작합니다.
2. dhtmlxGantt가 새로운 위치를 기준으로 작업 날짜를 재계산합니다.
3. dhtmlxGantt가 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 트리거합니다.
4. dhtmlxGantt가 간트 차트에서 작업 표시를 업데이트합니다.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [타임라인 내에서 작업 드래그하기](guides/dnd.md#preventingdraggingtasksoutsidecertaindates)
- [How-tos](guides/how-to.md#howtohaveaninfinitescrollinthetimeline)

