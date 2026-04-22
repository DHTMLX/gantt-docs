---
title: "자동 스케줄링"
sidebar_label: "자동 스케줄링"
---

# 자동 스케줄링

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

라이브러리는 Gantt가 작업 간 관계에 따라 작업을 자동으로 스케줄링할 수 있게 해주는 **auto_scheduling** 확장을 제공합니다.

![auto_scheduling](/img/auto_scheduling.png)

예를 들어 두 개의 작업이 의존성 링크로 연결되어 있고 두 번째 작업이 첫 번째 작업이 끝날 때 시작하며, 첫 번째 작업의 일정을 새 날짜로 옮겨야 한다고 가정합니다.

자동 스케줄링은 첫 번째 작업의 종료 날짜가 바뀔 때마다 두 번째 작업의 시작 날짜를 해당 종료 날짜에 맞춰 업데이트합니다. 이 기능을 사용하면 각 작업의 날짜를 수동으로 설정할 필요 없이 작업 간 관계를 지정하여 프로젝트 일정을 생성하고 유지할 수 있습니다.

## 사용 방법

auto scheduling 기능을 사용하려면 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화해야 합니다:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

그리고 **auto_scheduling** 구성의 **enabled** 속성을 *true*로 설정합니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

자동 스케줄링이 활성화되면 개별 작업은 여전히 수동으로도 일정이 잡힐 수 있습니다.

## Forward/backward planning {#forwardbackwardplanning}

### 프로젝트 계획 전략

프로젝트 내 작업을 계획하는 데에는 두 가지 전략이 있습니다: 전방 계획과 후방 계획. 이들은 구성 설정의 조합으로 정의됩니다:

- [gantt.config.auto_scheduling.schedule_from_end](api/config/auto_scheduling.md#schedule_from_end) - (*boolean*) 계획 전략의 종류를 정의합니다
- [project_start](api/config/project_start.md) - (*Date*) 프로젝트의 시작 날짜; 전방 계획이 적용되는 경우 기본적으로 작업의 시작 날짜로 사용되며, 기본값은 *null*입니다
- [project_end](api/config/project_end.md) - (*Date*) 프로젝트의 종료 날짜; 후방 계획이 사용되는 경우 작업의 기본 시간으로 사용되며, 기본값은 *null*입니다

### 전방 계획

작업의 전방 계획은 기본적으로 사용되며, 즉 **gantt.config.auto_scheduling.schedule_from_end**가 *false*로 설정되어 있습니다.

~~~js
// 전방 계획이 사용됩니다
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: false
};
~~~

이 경우 작업의 계획은 시작 날짜 또는 가장 이른 작업의 날짜부터 구현됩니다. 다른 제약 조건이 적용되지 않았다면 작업은 가능한 한 빨리 계획됩니다.

프로젝트의 시작 날짜는 선택적으로 **gantt.config.project_start** 구성으로 설정할 수 있습니다:

~~~js
gantt.config.project_start = new Date(2025, 2, 1);
~~~

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### 후방 계획 {#backwardscheduling}

프로젝트의 끝에서부터 작업을 계획하는 방법도 있습니다. 이를 위해서는 **gantt.config.auto_scheduling.schedule_from_end** 속성을 *true*로 설정하고, 프로젝트의 종료 날짜를 **gantt.config.project_end** 구성 옵션으로 지정해야 합니다:

~~~js
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

이 경우 작업은 가능한 한 늦게 계획됩니다. 마지막 작업은 프로젝트의 종료 날짜에 끝나야 합니다.

[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

## 작업에 대한 시간 제약 {#timeconstraintsfortasks}

dhtmlxGantt는 작업에 추가 시간 제약을 설정할 수 있는 기능을 제공합니다.

:::note
시간 제약은 작업과 [마일스톤](guides/milestones.md)에만 적용됩니다. 프로젝트에는 영향을 주지 않습니다.
:::

### 라이트박스에서 제약 조건 설정

작업의 라이트박스에서 [**Constraint** 컨트롤](guides/constraint.md)을 통해 제약 조건을 지정할 수 있습니다.

![Inbuilt datepicker for constraints](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    { name: "constraint", type: "constraint" }, /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

### 인라인 편집기를 통한 제약 조건 설정

그리드에서 제약 조건의 유형과 날짜를 위한 별도의 열을 지정하고(guide: guides/specifying-columns.md#timeconstraintsfortasks) 인라인 편집기를 사용해 작업의 제약 조건을 정의하는 것도 가능합니다.

![Constraints columns](/img/constraints_columns.png)

다음 열 이름을 각각 **constraint_type** 와 **constraint_date** 로 사용합니다.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        // more options
    ]
};

const constraintDateEditor = {
    type: "date",
    map_to: "constraint_date",
    min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1)
};

gantt.config.columns = [
    { /* previous column */ },
    {
        name: "constraint_type", align: "center", width: 100,
        template: task => gantt.locale.labels[gantt.getConstraintType(task)],
        resize: true, editor: constraintTypeEditor
    },
    {
        name: "constraint_date", align: "center", width: 120, template: (task) => {
            // template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### 제약 조건의 유형

다음은 시간 제약의 여러 유형입니다:

1. **가능한 한 빨리** - 이 제약 조건이 독립 작업에 설정되고 **strict** 모드가 활성화된 경우 작업은 프로젝트 시작과 동일한 시점에 시작합니다. 만약 **strict** 모드가 비활성화되면 작업은 지정된 날짜에 시작합니다.

   이 제약 조건이 종속 작업에 설정된 경우, 작업은 선행 작업이 종료되는 즉시 시작합니다.

2. **가능한 한 늦게** - 이 제약 조건이 독립 작업에 설정된 경우 작업은 프로젝트 시작과 동일한 시점에 끝납니다. 이 제약 조건이 종속 작업에 설정된 경우, 작업의 종료는
   직후의 즉시 후속 작업의 시작과 일치합니다.

다른 제약 조건 유형은 작업의 유형(종속 또는 독립)에 관계없이 작업에 영향을 미칩니다:

3. **다음 날짜 이후로 시작** - 작업은 지정된 날짜 또는 그 이후에 시작해야 합니다.

4. **다음 날짜 이전으로 시작** - 작업은 지정된 날짜 또는 그 이전에 시작해야 합니다.

5. **다음 날짜 이후로 끝남** - 작업은 지정된 날짜 또는 그 이후에 끝나야 합니다.

6. **다음 날짜 이전으로 끝남** - 작업은 지정된 날짜 또는 그 이전에 끝나야 합니다.

7. **반드시 시작해야 함** - 작업은 반드시 지정된 날짜에 정확히 시작해야 합니다.

8. **반드시 끝나야 함** - 작업은 반드시 지정된 날짜에 정확히 끝나야 합니다.

:::note
독립 작업은 다른 작업과 연결 고리나 후속 작업이 없는 작업을 의미합니다. 즉, 다른 작업과 연결되거나 부모와 연결되는 링크가 없는 작업들입니다.
:::

## 작업 간의 지연(lag) 및 선행(lead) 시간 설정 {#settinglagandleadtimesbetweentasks}

지연(lag) 및 선행(lead) 시간은 작업 간의 복잡한 관계를 만들 때 사용하는 특별한 값들입니다.

Lag는 의존성으로 연결된 작업들 사이의 지연이며, Lead는 의존성으로 연결된 작업들 간의 중첩입니다.

연결된 후속 작업의 두 가지 유형이 있을 수 있습니다:

- 선행 작업의 종료 전에 시작할 수 있는 작업(B가 A 종료 전에 시작)

예: 의존성 링크의 lead를 1일로 설정하면 작업 B는 작업 A가 종료되기 하루 전에 시작합니다.

- 선행 작업의 종료 후 일정 지연이 지나야 시작하는 작업(B가 A 종료 후 일정 시간 뒤에 시작)

예: 의존성 링크의 lag를 1일로 설정하면 작업 B는 작업 A가 종료된 다음 하루 뒤에 시작합니다.

Lag 및 lead 값은 링크 객체의 추가 속성 - **link.lag**에 설정됩니다:

- lag - 양의 정수 값
- lead - lag의 음수 값

기본적으로 각 의존성 링크의 lag 값은 0으로 설정되어 있습니다.

### UI에서 링크 값 편집

Gantt는 링크의 지연이나 다른 속성을 편집하기 위한 내장 UI를 제공하지 않습니다. 그러나 관련 챕터의 권장 방법에 따라 수동으로 구현할 수 있습니다
(관련 샘플 참조: [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)).

## 특정 작업에 대해 자동 스케줄링 비활성화

특정 작업에 대해 자동 스케줄링을 비활성화하고 수동으로 스케줄링되도록 하려면 작업 객체의 **auto_scheduling** 속성을 *false*로 설정합니다:

~~~js
const task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

또한 [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md) 핸들러를 사용하여 특정 작업의 자동 스케줄링을 방지할 수 있습니다:

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    return !task.completed;
});
~~~

## 완료된 작업의 스케줄링

기본적으로 자동 스케줄링 알고리즘이 완료된 작업(진행률이 1인 작업)과 미완료된 작업을 처리하는 방식에는 차이가 없습니다.

선택적으로 [auto_scheduling.use_progress](api/config/auto_scheduling.md#use_progress) 구성을 활성화하여 이 동작을 변경할 수 있습니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
 
gantt.init("gantt_here");
~~~

구성이 활성화되면 완료된 작업은 크리티컬 경로 및 자동 스케줄링에서 제외됩니다.

API 페이지에서 자세한 내용을 확인할 수 있습니다: [API 페이지](api/config/auto_scheduling_use_progress.md).

## API 개요

사용 가능한 메서드와 속성 목록:

- [auto_scheduling](api/config/auto_scheduling.md)
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### 활성화

Gantt 차트에서 자동 스케줄링을 활성화하려면 **auto_scheduling** 구성의 **enabled** 속성을 *true*로 설정합니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

### 엄격 모드

기본적으로 작업은 제약 조건이 위반될 때만 다시 스케줄링됩니다.
언제나 가장 이른 날짜로 재스케줄링하려면 [auto_scheduling.gap_behavior](api/config/auto_scheduling.md#gap_behavior) 속성을 사용합니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

:::note
버전 6.1.0 ~ 7.1.3에서는 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 옵션이 활성화될 때에만 구성이 작동한다는 점에 유의하십시오.
:::

### 초기 자동 스케줄링

[auto_scheduling.schedule_on_parse](api/config/auto_scheduling.md#schedule_on_parse) 속성은 데이터 로드 시 자동 스케줄링을 수행할지 여부를 정의합니다. 기본값은 *true*입니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: true
};
~~~

### 프로젝트 제약의 상속

[auto_scheduling.project_constraint](api/config/auto_scheduling.md#project_constraint) 속성은 특정 제약 유형이 지정되지 않은 작업이 부모 프로젝트로부터 제약 유형을 상속할지 여부를 정의합니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

### 프로젝트 재계산

전체 프로젝트의 일정을 재계산하려면 [autoSchedule](api/method/autoschedule.md) 메서드를 사용합니다:

~~~js
gantt.autoSchedule();
~~~

특정 작업에서 시작해 일정을 재계산하려면 작업의 ID를 [autoSchedule](api/method/autoschedule.md) 메서드에 인수로 전달합니다:

~~~js
gantt.autoSchedule(taskId);
~~~

### 작업이 미스케줄되었는지 확인

작업이 미스케줄되었는지 확인해야 하는 경우 작업 객체를 인수로 전달하여 [isUnscheduledTask](api/method/isunscheduledtask.md) 메서드를 사용합니다:

~~~js
const isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### 원형 참조 검색

차트의 모든 원형 참조를 찾으려면 [findCycles](api/method/findcycles.md) 메서드를 사용합니다:

~~~js
gantt.findCycles();
~~~

### 링크가 원형인지 확인

링크가 원형인지 확인해야 하는 경우 [isCircularLink](api/method/iscircularlink.md) 메서드를 사용할 수 있습니다:

~~~js
const isCircular = gantt.isCircularLink(link);
~~~

### 연결된 작업 및 링크 가져오기

작업이 연결된 다른 작업과 링크 목록을 얻으려면 [getConnectedGroup](api/method/getconnectedgroup.md) 메서드를 사용합니다:

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

## 이벤트 목록

다음과 같은 이벤트를 사용할 수 있습니다:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// 자동 스케줄링이 시작되기 전에
gantt.attachEvent("onBeforeAutoSchedule", (taskId) => {
    // 사용자 정의 로직
    return true;
});

// 자동 스케줄링이 끝난 후
gantt.attachEvent("onAfterAutoSchedule", (taskId, updatedTasks) => {
    // 사용자 정의 로직
});

// 특정 작업이 다시 일정이 조정되기 전에
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    // 사용자 정의 로직
    return true;
});

// 특정 작업이 다시 일정이 조정된 후
gantt.attachEvent("onAfterTaskAutoSchedule", (task, start, link, predecessor) => {
    // 사용자 정의 로직
});

// 원형 참조가 감지되어 자동 스케줄링이 불가한 경우
gantt.attachEvent("onCircularLinkError", (link, group) => {
    // 사용자 정의 로직
});

// 자동 스케줄링 중 원형 링크를 발견한 경우
gantt.attachEvent("onAutoScheduleCircularLink", (groups) => {
    // 사용자 정의 로직
});
~~~

## 버전 호환성

마우스 포인터로 작업의 날짜를 이동시키거나 라이트박스를 통해 날짜를 변경할 때, 작업은 자동으로 두 가지 제약 유형 중 하나를 받게 됩니다: **start no earlier than+%start date%** 또는 **finish no later than+%end date%**, 선택한 계획 전략에 따라 다릅니다.

따라서 UI에서 늦은 날짜가 설정되어 있는 경우 해당 작업이 가장 빠른 날짜로 스케줄링되지 않습니다. 이 점은 특히 차트에 기본적으로 제약 조건이 표시되지 않는 경우 준비되지 않은 사용자에게 혼란스러울 수 있습니다.

**v9.1** 부터는 [auto_scheduling.show_constraints](api/config/auto_scheduling.md#show_constraints) 속성을 사용해 제약 조건 표시를 활성화할 수 있습니다. 구 버전에서는 차트에 제약 조건을 추가하기 위해 [addTasklayer](api/method/addtasklayer.md) 메서드를 사용해야 합니다.

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

이 동작은 v6.1 이전의 auto scheduling 로직과 다르며 MS Project와 같은 방식으로 자동 계획이 작동하는 것이므로 올바른 동작으로 간주됩니다.

원치 않는 경우 아래와 같은 방법으로 6.1 이전 버전의 자동 스케줄링으로 되돌릴 수 있습니다. 제약 조건을 비활성화합니다:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

### 관련 API
- [auto_scheduling](api/config/auto_scheduling.md)