---
sidebar_label: onTaskDrag
title: onTaskDrag event
description: "사용자가 작업을 드래그할 때 발생합니다"
---

# onTaskDrag

### Description

@short: 사용자가 작업을 드래그할 때 발생합니다

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `mode` - (required) *string* - 드래그 모드("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - 현재(드래그 중인) 태스크 객체
- `original` - (required) *Task* - 원래(초기) 태스크 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    // 여기에 코드 작성
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

The event:

- 타임라인 영역에서 마우스로 드래그 동작을 할 때마다 발생합니다: 태스크를 이동시키거나 크기를 조정하거나 진행률을 변경합니다.
- 드래그 동작의 유형은 두 번째 인수 - **mode** 로 전달됩니다.
- 드래그 동작 유형의 모든 값은 [drag_mode](api/config/drag_mode.md) 속성에 저장됩니다.


간단히 말하면 전체 흐름은 다음 순서로 진행됩니다:

1. 사용자가 이동합니다.
2. dhtmlxGantt가 새 위치에 따라 태스크의 날짜를 재계산합니다.
3. dhtmlxGantt가 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 발생시킵니다.
4. dhtmlxGantt가 간트 차트에서 태스크를 다시 렌더링합니다.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md#denying-dragging-tasks-out-of-specific-dates)
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)