---
title: "작업 유형"
sidebar_label: "작업 유형"
---

# 작업 유형

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

간트 차트에 표시할 수 있는 3가지 미리 정의된 작업 유형이 있습니다([you can also add a custom type](guides/task-types.md#creating-a-custom-type)):

1. [일반 작업(기본값)](guides/task-types.md#regular-tasks).
2. [프로젝트 작업](guides/task-types.md#project-tasks).
3. [마일스톤](guides/task-types.md#milestones).


![task_types](/img/task_types.png)


작업의 유형을 설정하려면 데이터 아이템의 [type](guides/loading.md#dataproperties) 속성을 사용합니다(*값은 [`types`](api/config/types.md) 객체에 저장됩니다*):

~~~jsx title="Specifying the type of a task in the data set"
const data = {
    tasks: [
        { id: 1, text: "Project #1", type: "project", open: true },
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 },
        { id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
    ],
    links: [
        { id: 1, source: "1", target: "2", type: "1" },
        { id: 2, source: "2", target: "3", type: "0" },
        { id: 3, source: "3", target: "4", type: "0" },
    ],
};
~~~

**관련 샘플**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## 일반 작업

기본적으로, dhtmlxGantt는 일반 작업(타입이 **type="task"**)의 생성을 제공합니다.

![type_task](/img/type_task.png)

~~~jsx title="Specifying regular tasks"
const data = { 
    tasks: [
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 }, 
    ],
    links: [],
};
//or
const data = {
    tasks: [
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1, type: "task" }, 
    ],
    links: [],
};
~~~

**관련 샘플**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


타입이 **type="task"**인 작업은 다음과 같이 특징지어질 수 있습니다:

- 상위 작업은 1개만 가질 수 있고 자식 작업은 아무 수도 가질 수 있습니다.
- 드래그 및 크기 조정이 가능합니다. 
- 자식 작업에 의존하지 않으며, 예를 들어 사용자가 일반 작업의 자식 작업을 드래그하면 해당 작업의 지속 기간이나 진행률이 각각 변경되지 않습니다.
- 상위 프로젝트에 표시될 수 있습니다. 자세한 내용은 [details](guides/milestones.md#rolluptasksandmilestones)를 참조하십시오.
- 타임라인에서 숨길 수 있습니다. 자세한 내용은 [details](guides/milestones.md#hiding-tasks-and-milestones)를 참조하십시오.


## 프로젝트 작업

프로젝트 작업은 가장 이른 자식 작업이 시작될 때 시작되고 가장 늦은 자식이 끝날 때 끝나는 작업입니다.

:::note
프로젝트 작업과 일반 작업의 차이점은 프로젝트 작업의 지속 기간이 자식에 의존하며 이에 따라 변경된다는 점입니다.
:::

![type_project](/img/type_project.png)

~~~jsx title="Specifying project tasks"
const data = {
    tasks: [
        { id: 1, text: "Project #1", type: "project", open: true }, 
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 },
        { id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
    ],
    links: [],
};
~~~

**관련 샘플**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


타입이 **type="project"**인 작업은 다음과 같이 특징지어질 수 있습니다:

- 상위 작업 1개와 자식 작업의 아무 수도 가질 수 있습니다.
- 드래그 및 크기 조정은 [drag_project](api/config/drag_project.md) 설정을 통해 명시적으로 활성화되지 않는 한 불가능합니다.
- 자식 작업에 의존합니다. 예를 들어 사용자가 프로젝트 작업의 자식 작업을 드래그하면 해당 작업의 지속 기간이 변경됩니다.
- 시작 날짜(start_date), 끝 날짜(end_date), 지속 기간(duration) 속성은 무시됩니다.
- 자식 작업이 없으면 드래그할 수 없습니다.
- 프로젝트의 진행률(progress)은 기본적으로 명시적으로 지정되며 하위 작업에 의존하지 않습니다. 자동으로 계산되길 원하면 이를 위한 코드 작성이 필요합니다. [예제 확인](guides/how-to.md#how-to-calculate-task-progress-depending-on-child-tasks).

:::note
프로젝트 작업을 추가할 수 있는 가능성을 제공하려면 문서 [Milestone](guides/milestones.md)를 읽으십시오. 마일스톤을 추가할 수 있는 가능성은 최종 사용자가 프로젝트 작업도 추가할 수 있도록 보장합니다.
:::

## Milestones {#milestones}

[마일스톤](guides/milestones.md) 은 프로젝트의 중요한 날짜를 표시하기 위해 사용되는 지속 시간이 0인 작업입니다([자세한 내용](guides/milestones.md)).

![type_milestone](/img/type_milestone.png)

~~~jsx title="Specifying milestones"
const data = {
    tasks: [
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 }, 
    ],
    links: [],
};
~~~

**관련 샘플**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


타입이 **type="milestone"**인 작업은 다음과 같이 특징지어질 수 있습니다:

- 상위 작업 1개와 자식 작업의 아무 수도 가질 수 있습니다.
- 드래그 및 크기 조정이 불가능합니다.
- 지속 시간이 0이며 언제나 유지됩니다.
- end_date, duration, progress 속성을 무시합니다.
- 상위 프로젝트에 표시될 수 있습니다. 자세한 내용은 [details](guides/milestones.md#rolluptasksandmilestones)를 참조하십시오.
- 타임라인에서 숨길 수 있습니다. 자세한 내용은 [details](guides/milestones.md#hiding-tasks-and-milestones)를 참조하십시오.

:::note
마일스톤을 추가할 수 있는 가능성을 제공하려면 문서 [Milestone](guides/milestones.md)를 읽으십시오.
:::

## 작업 유형별 특정 라이트박스 {#specificlightboxpertasktype}

각 작업 유형은 고유한 특성을 가지고 있습니다. 따라서 유형별로 세부 정보 양식(라이트박스)의 개별 구성이 정의될 수 있습니다.
모든 구성은 [lightbox](api/config/lightbox.md) 객체에 저장됩니다.

다음과 같이 구분됩니다:

- **gantt.config.lightbox.sections** - 일반 작업용.
- **gantt.config.lightbox.project_sections** - 프로젝트 작업용.
- **gantt.config.lightbox.milestone_sections** - 마일스톤용.

기본 구성 설정은 아래와 같습니다:

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "time", type: "duration", map_to: "auto" }
];

gantt.config.lightbox.project_sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "duration", map_to: "auto", readonly: true }
];

gantt.config.lightbox.milestone_sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "duration", map_to: "auto", single_date: true }
];
~~~

사용자가 관련 선택에서 작업의 유형을 변경하면 해당 구성은 라이트박스 팝업에 적용되고 동적으로 업데이트됩니다.

맞춤형 유형을 추가하고 해당 유형에 대한 적절한 라이트박스 구성을 지정할 수도 있습니다([creating-a-custom-type](guides/task-types.md#creating-a-custom-type)).

라이트박스 구성에 대한 자세한 내용은 [Configuring Edit Form](guides/edit-form.md) 장을 참조하십시오.


## 사용자 정의 유형 만들기

모든 작업 유형은 [types](api/config/types.md) 객체에 정의되어 있습니다. 

일반적으로 사용자 정의 작업 유형을 추가하려면 다음이 필요합니다:

1. [types](api/config/types.md) 객체에 새 값을 추가합니다.
2. 새 유형에 대한 개별 설정을 정의합니다.

예를 들어 새로운 작업 유형 - **meeting** 를 추가하고자 한다고 가정합니다.
**Meeting**  은 일반 작업이지만 다른 색상으로 표시되고 라이트박스의 입력 항목이 다르게 구성될 것입니다.

![custom_task_type](/img/custom_task_type.png)


이름이 **meeting**인 새 유형을 정의하고 해당 유형에 대한 개별 라이트박스를 지정하려면 다음 기법을 사용하십시오:

[types](api/config/types.md) 객체에 새 유형을 추가합니다:

~~~jsx
gantt.config.types.meeting = "type_id";
~~~

여기서 "meeting" 은 유형의 프로그래밍적 이름입니다. 아무 것도 영향을 주지 않습니다. 프로그래밍적 유형 이름의 유일한 목적은 유형 작업을 더 읽기 쉽게 만드는 것입니다.
"type_id" 는 데이터베이스에 저장될 유형 식별자입니다. 유형 식별자는 [types](api/config/types.md) 객체 내에서 고유해야 합니다.

새 유형의 레이블을 "typeselect" 컨트롤에 설정합니다:

~~~jsx
gantt.locale.labels.type_meeting = "Meeting";
~~~

새로 만든 유형에 대해 라이트박스의 새 구조를 지정합니다:

~~~jsx
gantt.config.lightbox.meeting_sections = [
    { name: "title", type: "textarea", map_to: "text", height: 20, focus: true },
    { name: "details", type: "textarea", map_to: "details", height: 70 },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "time", map_to: "auto", height: 72 }
];

gantt.locale.labels.section_title = "Subject";
gantt.locale.labels.section_details = "Details";
~~~

새 유형에 대한 스타일을 정의하고 [task_class](api/template/task_class.md) 템플릿을 사용하여 적용합니다:

~~~css
.meeting_task{
    border:2px solid #BFC518;
    color:#6ba8e3;
    background: #F2F67E;
}

.meeting_task .gantt_task_progress{
    background:#D9DF29;
}
~~~

~~~jsx
gantt.templates.task_class = (start, end, task) => {
    return task.type === gantt.config.types.meeting 
        ? "meeting_task" 
        : "";
};
~~~

"meeting" 작업의 텍스트를 위한 템플릿을 [task_text](api/template/task_text.md) 템플릿으로 설정합니다:


~~~jsx
gantt.templates.task_text = (start, end, task) =>
    task.type === gantt.config.types.meeting
        ? `Meeting: <b>${task.text}</b>`
        : task.text;
~~~

**관련 샘플**: [Custom task type](https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html)


## 작업 유형별 사용자 정의 표시

기존 작업 유형의 모양을 사용자 정의하려면 [type_renderers](api/config/type_renderers.md) 옵션을 사용합니다. 이 옵션은 페이지에서 서로 다른 작업 유형을 표시하는 함수를 재정의하도록 허용합니다.

![custom_look](/img/custom_look.png)

~~~jsx
gantt.config.type_renderers["project"] = (task, defaultRender) => {
    const taskBar = document.createElement("div");
    taskBar.setAttribute(gantt.config.task_attribute, task.id);
    taskBar.className = "custom-project";

    const taskSize = gantt.getTaskPosition(task);
    taskBar.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');

    taskBar.style.left = `${taskSize.left}px`;
    taskBar.style.top = `${taskSize.top + 7}px`;
    taskBar.style.width = `${taskSize.width}px`;

    return taskBar;
};
~~~

**관련 샘플**: [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)