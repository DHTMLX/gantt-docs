---
title: "타임라인에서의 작업 드래그"
sidebar_label: "타임라인에서의 작업 드래그"
---

# 타임라인에서의 작업 드래그

드래그를 사용하면 사용자가 작업의 시작일(종료일)과 기간을 빠르게 변경할 수 있습니다.
기본적으로 드래그 앤 드롭이 활성화되어 있으며 사용자는 타임라인의 해당 행에서 작업을 드래그할 수 있습니다.

드래그 앤 드롭 동작을 커스터마이즈하려면 아래 이벤트를 사용하십시오:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - 특정 작업의 드래그를 거부하기 위함
- [onTaskDrag](api/event/ontaskdrag.md) - 드래그 영역을 제한하거나 사용자가 작업을 드래그할 때 다른 로직을 제공하기 위함
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - 새로운 위치로 드래그된 후 작업을 후처리하기 위함

기본 드래그 동작을 커스터마이즈해야 하는 일반적인 경우를 살펴보겠습니다:

1. [특정 작업의 드래그 거부](#denying-dragging-of-specific-tasks)
2. [특정 날짜에서 벗어난 드래그 금지](#denying-dragging-tasks-out-of-specific-dates)
3. [부모와 함께 자식 드래그하기](#dragging-children-together-with-the-parent)
4. [서브태스크를 가진 프로젝트 드래그하기](#draggingprojectswithsubtasks)
5. [최소 작업 지속 시간 설정](#setting-minimal-task-duration)
6. [작업 드래그 중 자동 스크롤](#autoscrollduringtasksdragging)

## 특정 작업의 드래그 거부

특정 작업의 드래그를 거부하려면 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 사용합니다:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (gantt.getGlobalTaskIndex(taskId) % 2 === 0) {
        return false; // 글로벌 작업 인덱스가 짝수인 경우 드래그 거부
    }
    return true; // 글로벌 작업 인덱스가 홀수인 경우 드래그 허용
});
~~~

## 특정 날짜에서 벗어난 드래그 금지

특정 날짜에서 벗어나 드래그하는 것을 거부하려면 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 사용합니다.

<p style="margin-top: 20px; font-weight: bold;"> The onTaskDrag 이벤트: </p>

<ul style="margin-top:5px;">
  <li>타임라인 영역에서 마우스로 드래그 동작을 수행할 때마다 발생합니다: 이동, 작업 크기 조정 또는 진행률 변경 등</li>
  <li>드래그 동작의 유형은 두 번째 인자 - <b>mode</b> 로 전달됩니다.</li>
  <li>드래그 동작 유형의 모든 값은 [drag_mode](api/config/drag_mode.md) 속성에 저장되어 있습니다.</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">간단히 말해, 전체 흐름은 아래 순서로 진행됩니다:</p>

<ol style="margin-top:5px;">
    <li>사용자가 이동합니다.</li>
    <li>dhtmlxGantt가 새 위치에 따라 작업의 날짜를 재계산합니다.</li>
    <li>dhtmlxGantt가 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 발생시킵니다.</li>
    <li>dhtmlxGantt가 Gantt 차트에서 작업을 다시 렌더링합니다. <br><i> [onTaskDrag](api/event/ontaskdrag.md) 이벤트가 재계산 후에 발생하므로 핸들러에서 dragged 작업의 임의의 값을 지정해도 덮어씌워지지 않습니다. 그 결과 작업은 원하는 위치에 렌더링됩니다.</i></li>
</ol>

다음과 같이 **"2028년 3월 31일 - 2028년 4월 11일"** 간격에서 벗어나 드래그하는 것을 금지하고자 한다고 가정해 봅시다.

![custom_dnd](/img/custom_dnd.png)

다음과 같이 코드를 사용할 수 있습니다:

~~~js
const leftLimit = new Date(2028, 2, 31);
const rightLimit = new Date(2028, 3, 12);
const millisecondsInDay = 24 * 60 * 60 * 1000;

gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move || dragMode === dragModes.resize) {
        const taskDuration = originalTask.duration * millisecondsInDay;

        if (+task.end_date > +rightLimit) {
            task.end_date = new Date(rightLimit);
            if (dragMode === dragModes.move) {
                task.start_date = new Date(task.end_date - taskDuration);
            }
        }

        if (+task.start_date < +leftLimit) {
            task.start_date = new Date(leftLimit);
            if (dragMode === dragModes.move) {
                task.end_date = new Date(+task.start_date + taskDuration);
            }
        }
    }
});
~~~

## 부모와 함께 자식 드래그하기

부모 작업을 드래그할 때 자식도 함께 드래그되도록 하려면 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 사용합니다(위의 이벤트에 대해 더 자세히 보려면 참조):

~~~js
gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const dateShift = task.start_date - originalTask.start_date;
        gantt.eachTask((child) => {
            child.start_date = new Date(+child.start_date + dateShift);
            child.end_date = new Date(+child.end_date + dateShift);
            gantt.refreshTask(child.id, true);
        }, taskId);
    }
});

// 자식 아이템의 위치를 스케일에 맞게 반올림
gantt.attachEvent("onAfterTaskDrag", (taskId, dragMode, event) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const ganttState = gantt.getState();
        gantt.eachTask((child) => {
            child.start_date = gantt.roundDate({
                date: child.start_date,
                unit: ganttState.scale_unit,
                step: ganttState.scale_step
            });
            child.end_date = gantt.calculateEndDate(
                child.start_date,
                child.duration,
                gantt.config.duration_unit
            );
            gantt.updateTask(child.id);
        }, taskId);
    }
});
~~~

<em>관련 샘플</em>: [자식이 있는 부모 작업 드래그](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)

## 서브태스크를 가진 프로젝트 드래그하기 {#draggingprojectswithsubtasks}

:::info
이 기능은 Gantt PRO 에디션에서만 사용할 수 있습니다.
:::

프로젝트 타입의 작업은 기본적으로 드래그가 불가능합니다.
drag_project 구성으로 프로젝트의 드래그 앤 드롭을 활성화할 수 있습니다:

~~~js
gantt.config.drag_project = true;
~~~

<em>관련 샘플</em>: [드래그 가능한 프로젝트](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)

## 의존 작업을 독립 작업과 함께 드래그하기

의존 작업을 함께 이동시키는 여러 가지 방법이 있습니다.
이 모든 방법에 대해서는 별도의 기사 [Dragging Tasks Together with Their Dependent Tasks]에서 확인할 수 있습니다. (guides/dragging-dependent-tasks.md)

## 최소 작업 지속 시간 설정

최소 작업 지속 시간은 [min_duration](api/config/min_duration.md) 설정으로 지정할 수 있습니다.

이 옵션은 크기 조정 중에 설정될 수 있는 작업의 최소 크기를 정의하며, 사용자가 0 길이를 설정하는 것을 방지하는 데 사용할 수 있습니다.

값은 밀리초 단위로 설정됩니다:
~~~js
// 1일
gantt.config.min_duration = 24 * 60 * 60 * 1000;

// OR

// 1시간
gantt.config.min_duration = 60 * 60 * 1000;
~~~

## 작업 드래그 중 자동 스크롤 {#autoscrollduringtasksdragging}

Gantt 차트에 큰 데이터세트가 있는 경우, 작업을 멀리 떨어진 위치로 드래그하거나 상당한 거리의 작업 간에 링크를 설정해야 할 때가 자주 있습니다.

이 경우 자동 스크롤(autoscroll) 기능이 큰 도움이 됩니다. 기본적으로 활성화되어 있지만, [autoscroll](api/config/autoscroll.md) 구성 옵션을 통해 이 동작을 관리할 수 있습니다.

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

또한 자동 스크롤 속도를 밀리초 단위로 조정하려면 해당 속성 - [autoscroll_speed](api/config/autoscroll_speed.md)를 사용합니다:

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

## 특정 작업의 크기 조정 비활성화

특정 작업의 크기 조정을 방지하고 싶다면 두 가지 방법이 있습니다:

1) UI에서 CSS를 통해 작업의 리사이즈 핸들을 제거합니다.
이 방법을 사용하려면 필요한 항목에 추가 CSS 클래스를 할당할 수 있도록 **task_class** 템플릿을 사용합니다:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.no_resize) { // no_resize는 예시를 위한 커스텀 속성
        return "no_resize";
    }
    return "";
};
~~~

다음 CSS로 리사이즈 핸들을 숨길 수 있습니다:

~~~css
.no_resize .gantt_task_drag {
    display: none !important;
}
~~~

2) 코드에서 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 사용해 드래그를 방지합니다.
핸들러에서 false를 반환하면 리사이징이 방지됩니다:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize" && gantt.getTask(taskId).no_resize) {
        return false;
    }
    return true;
});
~~~

## 어느 쪽에서 크기 조정이 이루어지는가

드래그 앤 드롭의 ["resize"](api/event/onbeforetaskdrag.md) 모드는 사용자가 시작일(start_date) 또는 종료일(end_date)에서 작업의 크기를 조정한다는 뜻입니다.

리사이즈로 사용자가 어떤 날짜를 수정하는지 알아내려면 gantt.getState().drag_from_start 플래그를 사용할 수 있습니다:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize") {
        if (gantt.getState().drag_from_start === true) {
            // 작업의 시작 날짜를 변경
        } else {
            // 작업의 종료 날짜를 변경
        }
    }
    return true;
});
~~~

## 시작 날짜 또는 종료 날짜의 크기 조정 비활성화

크기 조정 핸들을 아래 선택자로 찾을 수 있습니다:

- `.gantt_task_drag[data-bind-property="start_date"]`
- `.gantt_task_drag[data-bind-property="end_date"]`

시작 날짜의 크기 조정을 비활성화하려면 다음 CSS를 사용할 수 있습니다:

~~~css
.gantt_task_drag[data-bind-property="start_date"] {
    display: none !important;
}
~~~

마찬가지로 종료 날짜의 크기 조정을 방지하는 방식은 이와 같습니다:

~~~css
.gantt_task_drag[data-bind-property="end_date"] {
    display: none !important;
}
~~~

또 다른 방법으로는 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 사용하는 것입니다.
핸들러에서 false를 반환하면 크기 조정이 방지됩니다:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize") {
        if (gantt.getState().drag_from_start === true) {
            return false;
        } else {
            // 작업의 종료 날짜를 변경
        }
    }
    return true;
});
~~~