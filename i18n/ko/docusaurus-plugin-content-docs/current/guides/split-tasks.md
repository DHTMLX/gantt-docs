---
title: "분할 작업"
sidebar_label: "분할 작업"
---

# 분할 작업

:::note
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

연속적이지 않고 중단될 수 있는 대형 작업이 있는 경우, 이를 여러 부분으로 나눌 수 있습니다. 필요한 만큼 많은 부분으로 나눌 수 있습니다.

데이터 수준에서 이러한 작업은 하위작업을 가진 요약 작업(프로젝트)으로 표현될 수 있으며, 각 서브작업은 주요 작업의 격리된 부분을 정의합니다.

![요약 작업](/img/split_task_inside.png)

다음처럼 한 행에 하나의 작업으로 표시될 수도 있습니다:

![분할 작업](/img/split_task.png)

프로젝트를 분할 작업으로 표시하려면 `render` 속성을 `split`으로 설정해야 합니다:

~~~js
const tasks = [
    { id: 1, text: "Task #2", start_date: "03-04-2027 00:00", type: "project", render: "split" },
    { id: 2, text: "Stage #1", start_date: "03-04-2027 00:00", duration: 1, parent: 1 },
    { id: 3, text: "Stage #2", start_date: "05-04-2027 00:00", duration: 2, parent: 1 },
    { id: 4, text: "Stage #3", start_date: "08-04-2027 00:00", duration: 1, parent: 1 }
];
~~~

작업 "Task #2"는 분할되며, "Stage #1", "Stage #2", "Stage #3"의 세트로 렌더링되며, 이들은 완전히 상호 작용 가능합니다.

**관련 예제**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

일반적인 트리 모드(프로젝트와 하위작업으로 표시)를 보려면, `task.render` 속성의 값을 변경하고 Gantt를 다시 렌더링하면 됩니다:

~~~js
const task = gantt.getTask(1);

// 'split' 모드로 다시 칠하기
task.render = "split";
gantt.render();

// 일반(트리) 모드로 다시 칠하기
task.render = "";
gantt.render();
~~~

예를 들어, 분할 및 계층 뷰 간 동적으로 전환하기 위해 라이트박스에 `task.render` 속성에 매핑된 컨트롤을 추가할 수 있습니다. 아래 섹션의 예제를 확인해 보십시오.

### 동적으로 분할 모드 전환

라이트박스를 구성하여 작업의 split 모드를 켜고 끌 수 있도록 설정할 수 있습니다. 이를 위해 작업의 프로젝트 유형에 대한 구성 설정 [`gantt.config.lightbox.project_sections`](guides/task-types.md#specificlightboxpertasktype)을 변경하고 새 섹션에 대한 레이블을 추가합니다:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    {
        name: "split",
        type: "checkbox",
        map_to: "render",
        options: [
            { key: "split", label: "Split Task" }
        ]
    },
    { name: "time", type: "duration", readonly: true, map_to: "auto" }
];
~~~

결과는 다음과 같습니다:

![Split task checkbox](/img/split_task_checkbox.png)

체크박스가 선택 해제되면, 분할 작업은 서브태스크가 있는 프로젝트로 렌더링됩니다.

**관련 예제**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

## 작업이 분할되었는지 확인

[`isSplitTask()`](api/method/issplittask.md) 메서드를 사용하면 작업이 분할되었는지 확인할 수 있습니다. 이 메서드는 작업 객체를 인수로 받아 작업이 분할되었으면 `true`를 반환합니다.

~~~js
const task = gantt.getTask(1);

if (gantt.isSplitTask(task)) {
    // ...
}
~~~

## 분할 작업 확장/접기 {#expandingcollapsingsplittasks}

그리드 인터페이스에서 바로 분할 작업을 확장/접기하고 싶다면, 이를 도와줄 특수 구성 옵션이 있습니다. 이는 [`open_split_tasks`](api/config/open_split_tasks.md)라고 불리며, 분할 작업을 확장 가능하게 만들기 위한 불리언 값을 받습니다.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Expanding split task](/img/expand_split_task.png)

## 자식별 분할 하위작업의 배치

기본적으로 분할 하위작업은 부모가 축소될 때 부모 행에 인라인으로 렌더링되고, 부모 행이 확장될 때 하위 행으로 이동됩니다. 부모 행의 상태에 따라 필요한 모드의 분할 작업을 사용하여 각 자식에 대해 이 동작을 제어할 수 있습니다:

- 부모 행이 축소될 때:
    - `split_placement: "auto" (default)` - 서브태스크가 부모 행에 렌더링됩니다
    - `split_placement: "inline"` - 서브태스크가 부모 행에 렌더링됩니다
    - `split_placement: "subrow"` - 서브태스크가 보이지 않습니다
- 부모 행이 확장될 때:
    - `split_placement: "auto" (default)` - 서브태스크가 하위 행으로 렌더링됩니다
    - `split_placement: "inline"` - 서브태스크가 부모 행에 렌더링됩니다
    - `split_placement: "subrow"` - 서브태스크가 하위 행으로 렌더링됩니다

~~~js
const tasks = [
    // 부모 행이 렌더링 시 확장됩니다
    { id: 10, text: "Creative Production", start_date: "01-04-2027", render: "split", duration: 35, parent: 1 },
    // 서브태스크가 부모 행에 렌더링됩니다
    { id: 11, text: "Photo Shoot", start_date: "03-04-2027", split_placement: "inline", duration: 3, parent: 10 },
    // 서브태스크가 하위 행으로 렌더링됩니다
    { id: 12, text: "Video Editing", start_date: "08-04-2027", split_placement: "subrow", duration: 10, parent: 10 },
    // 서브태스크가 기본값으로 부모 행에 렌더링됩니다
    { id: 13, text: "Copywriting", start_date: "04-04-2027", duration: 7, parent: 10 }
];
~~~

**관련 예제**: [Per-child placement of split subtasks](https://docs.dhtmlx.com/gantt/samples/04_customization/26_custom_child_split_tasks.html)

## 분할 작업 필터링

그리드에 렌더링된 분할 작업의 서브태스크를 필터링하려면 [`onBeforeSplitTaskDisplay`](api/event/onbeforesplittaskdisplay.md) 이벤트를 적용하고 다음을 반환합니다:

- 표시하려는 서브태스크에 대해 *true*
- 표시하지 않으려는 서브태스크에 대해 *false*

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", (id, task, parent) => {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

## Styling

분할 작업은 부모 항목의 서브태스크로 정의되며, 배경의 연한 녹색 막대는 해당 부모 항목의 막대이고, 추가 스타일이 적용됩니다.

분할 작업이 축소되어 단일 행으로 표시될 때도 부모 항목의 연한 녹색 막대는 동일한 위치에 렌더링되지만 불투명도와 z-index 값이 달라집니다.

![](/img/split_task_style.png)

**관련 예제**: [Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)

부모 항목의 막대 색상은 [timeline](guides/css-overview.md#styling-timeline)에서 모든 막대를 스타일링하는 방법과 동일하게 변경하거나 CSS를 통해 완전히 숨길 수 있습니다:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~

**관련 예제**: [Hide transparent parent bar of the split tasks](https://snippet.dhtmlx.com/svgo5vfn)

하나의 분할 작업만 있는 경우, 요약 항목(`type="project"`)은 분할 작업에 의해 완전히 가려져 보이지 않게 되므로 보이지 않습니다. 분할 하위작업이 없으면 요약 항목은 기본 날짜와 기간을 가집니다.

### 분할 작업의 개별 스타일링

버전 8.0부터, 분할 작업은 `task.$rendered_at` 속성을 포함하는 템플릿 함수로 제공되며, 이는 분할 작업이 렌더링된 행의 id를 포함합니다. 따라서 표시되는 행에 따라 특정 분할 작업의 스타일링을 원하면 [`task_class`](api/template/task_class.md) 템플릿을 사용할 수 있습니다:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.$rendered_at) {
        if (gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~