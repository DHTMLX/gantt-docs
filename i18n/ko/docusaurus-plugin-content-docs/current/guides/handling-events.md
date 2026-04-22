---
title: "이벤트 처리"
sidebar_label: "이벤트 처리"
---

# 이벤트 처리

이벤트는 사용자와의 상호작용을 촉진하고 페이지에 인터랙티브함을 더합니다.

사용자가 간트 차트에서 어떤 동작을 수행하면 dhtmlxGantt가 이벤트를 발생시킵니다. 이 이벤트를 사용하여 해당 동작을 감지하고 원하는 코드를 실행할 수 있습니다.

## 이벤트 연결

이벤트를 연결하려면 [`attachEvent()`](api/method/attachevent.md) 메서드를 사용하세요.

~~~js
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
~~~

**관련 샘플**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**참고:**

- 이벤트의 이름은 대소문자를 구분하지 않습니다.
- 같은 이벤트에 여러 핸들러를 연결할 수 있습니다.

## 이벤트 해제

이벤트 핸들러를 해제하려면 [`detachEvent()`](api/method/detachevent.md) 메서드를 사용하세요:

~~~jsx {6} title="일반적인 이벤트 핸들러 연결/해제 방법"
 // 이벤트를 연결하려면
const eventId = gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
 // 이벤트를 해제하려면
gantt.detachEvent(eventId);
~~~

다음 로직을 사용하면 한 번에 모든 핸들러를 해제할 수 있습니다:

~~~js {13}
// 이벤트를 연결할 때 핸들러 ID를 저장합니다
const eventIds = [];

// 예시로 여러 이벤트를 연결
eventIds.push(gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
}));
eventIds.push(gantt.attachEvent("onTaskDblClick", (id, e) => {
    alert(`You've just double clicked an item with id=${id}`);
}));

// 저장된 모든 이벤트를 해제
while (eventIds.length) {
    gantt.detachEvent(eventIds.pop());
}
~~~

## 핸들러 존재 여부 확인

특정 이벤트에 핸들러가 연결되어 있는지 확인하려면 [`checkEvent()`](api/method/checkevent.md) 메서드를 사용하세요:

~~~js {5}
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked a task with id=${id}`);
});

gantt.checkEvent("onTaskClick"); // true를 반환
~~~

## 취소 가능한 이벤트

앞에 오는 접두사 'onbefore'가 붙은 모든 이벤트는 취소할 수 있습니다.

일부 이벤트를 취소하려면 해당 이벤트 핸들러에서 **false**를 반환하세요.

~~~jsx {6} title="이벤트 핸들러 취소"
gantt.attachEvent("onBeforeTaskChanged", (id, mode, oldTask) => {
    const task = gantt.getTask(id);
    if (mode === gantt.config.drag_mode.progress) {
        if (task.progress < oldTask.progress) {
            dhtmlx.message(`${task.text} progress can't be undone!`);
            return false;
        }
    }
    return true;
});
~~~

**관련 샘플**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

## 핸들러 내부에서의 gantt 객체 접근

이벤트 핸들러 내부에서는 키워드 `this`를 통해 gantt 객체에 접근할 수 있습니다.

~~~jsx title="이벤트 핸들러 내부에서의 참조"
gantt.attachEvent("onTaskClick", function(id, e) {
    const parentId = this.getTask(id).parent;
});
~~~