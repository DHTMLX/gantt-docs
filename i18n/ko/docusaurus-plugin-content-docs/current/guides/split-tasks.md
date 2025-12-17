---
title: "작업 분할"
sidebar_label: "작업 분할"
---

작업 분할
=================

:::info
이 기능은 PRO 에디션에서만 사용 가능합니다.
:::

연속적이지 않고 일시 중지 및 재개가 가능한 대규모 작업이 있는 경우, 해당 작업을 여러 부분으로 나눌 수 있습니다. 생성할 수 있는 부분의 수에는 제한이 없습니다.

데이터 레벨에서는 이러한 작업이 요약 작업(프로젝트)과 하위 작업으로 표현되며, 각 하위 작업은 메인 작업의 개별 세그먼트에 해당합니다.

![Summary task](/img/split_task_inside.png)

이들은 하나의 행에 표시되어 하나의 작업처럼 보일 수 있습니다:

![Split task](/img/split_task.png)

프로젝트를 분할 작업으로 표시하려면 **render** 속성을 *split*으로 설정하세요:

~~~js
{id: 1, text: "Task #2", start_date: "03-04-2018 00:00", type: "project", 
    render:"split", parent: 0},  /*!*/
{id: 2, text: "Task #2.1", start_date: "03-04-2018 00:00", duration: 1, 
    parent: 1},
{id: 3, text: "Task #2.2", start_date: "05-04-2018 00:00", duration: 2, 
    parent: 1},
{id: 4, text: "Task #2.3", start_date: "08-04-2018 00:00", duration: 1, 
    parent: 1}
~~~

여기서 "Task#2"는 "Task#2.1", "Task#2.2", "Task#2.3" 작업으로 분할되어 표시되며, 이들 모두는 완전히 상호작용할 수 있습니다.


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


분할 작업의 일반적인 트리 보기(프로젝트와 하위 작업으로 표시)로 다시 전환하려면 **task.render** 속성을 변경하고 gantt를 다시 렌더링하면 됩니다:

~~~js
// 'split' 모드로 작업을 다시 그리기
task.render = "split";
gantt.render();

// 일반(트리) 모드로 작업을 다시 그리기
task.render = "";
gantt.render();
~~~

예를 들어, lightbox 내부에 **task.render** 속성과 연결된 컨트롤을 추가하여 분할 및 계층적 보기를 동적으로 전환할 수 있습니다. 아래에 예시가 제공되어 있습니다.


### 분할 모드 동적 전환

lightbox를 구성하여 작업에 대해 분할 모드를 켜거나 끌 수 있습니다. 이를 위해 프로젝트 유형 작업에 대한 설정([**gantt.config.lightbox.project_sections**](guides/task-types.md#specificlightboxpertasktype))을 업데이트하여 체크박스가 포함된 새로운 섹션을 추가하고, 새 섹션에 라벨을 지정하세요:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

이렇게 하면 다음과 같은 인터페이스가 생성됩니다:

![Split task checkbox](/img/split_task_checkbox.png)

체크박스가 선택 해제된 경우, 분할 작업은 하위 작업이 포함된 프로젝트로 표시됩니다.



[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## 작업이 분할되었는지 감지하기

작업이 분할되었는지 확인하려면 [isSplitTask](api/method/issplittask.md) 메서드를 사용하세요. 이 메서드는 작업 객체를 받아 해당 작업이 분할되었으면 true를 반환합니다.

~~~js
var task = gantt.getTask(1);
if(gantt.isSplitTask(task)){
  ...
}
~~~

## 분할 작업 확장 및 축소

그리드에서 직접 분할 작업을 확장하거나 축소하려면 관련 구성 옵션이 있습니다. 이 옵션은 [open_split_tasks](api/config/open_split_tasks.md) 이며, 이 동작을 활성화 또는 비활성화하기 위해 boolean 값을 사용합니다.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Expanding split task](/img/expand_split_task.png)

## 분할 작업 필터링

Gantt 차트에 표시될 분할 작업의 하위 작업을 필터링하려면 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 이벤트를 사용하세요. 반환값은 다음과 같습니다:

- *true* : 하위 작업 표시
- *false* : 하위 작업 숨김

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

스타일링
-------------------

분할 작업은 상위 항목의 하위 작업이며, 뒤의 연한 초록색 막대는 상위 항목의 막대를 추가 스타일로 나타냅니다.

분할 작업이 축소되어 한 행에 표시될 때, 상위 항목의 연한 초록색 막대는 위치를 유지하지만 불투명도와 z-index 값이 조정됩니다.

![](/img/split_task_style.png)


[Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)


상위 항목의 막대 색상은 [timeline](guides/css-overview.md#stylingtimeline)에서 다른 막대와 마찬가지로 커스터마이즈할 수 있으며, CSS로 완전히 숨길 수도 있습니다:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~




분할 작업이 하나만 있을 때는 요약 항목(type="“project”)이" 분할 작업에 완전히 가려져 보이지 않게 됩니다. 분할 하위 작업이 없으면 요약 항목은 기본 날짜와 기간을 사용합니다.

### 개별 분할 작업 스타일링

v8.0부터 분할 작업은 템플릿 함수 내에서 *task.$rendered_at* 속성을 포함하며, 이는 분할 작업이 렌더링된 행의 ID를 보유합니다. 이를 통해 [task_class](api/template/task_class.md) 템플릿을 사용하여 특정 행에 표시된 분할 작업을 개별적으로 스타일링할 수 있습니다:

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~

