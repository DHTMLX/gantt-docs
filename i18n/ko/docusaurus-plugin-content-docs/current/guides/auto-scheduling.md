---
title: "자동 스케줄링"
sidebar_label: "자동 스케줄링"
---

# 자동 스케줄링


:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

라이브러리에는 **auto_scheduling** 확장 기능이 포함되어 있어, Gantt에서 작업 간의 관계를 기반으로 작업을 자동으로 스케줄할 수 있습니다.

![auto_scheduling](/img/auto_scheduling.png)

예를 들어, 두 작업이 종속성으로 연결되어 있고 두 번째 작업이 첫 번째 작업이 끝난 직후 시작하도록 설정되어 있다고 가정해 보겠습니다. 첫 번째 작업의 일정이 변경되면, 자동 스케줄링 기능은 두 번째 작업의 시작 날짜를 자동으로 업데이트합니다. 이렇게 하면 각 작업의 날짜를 수동으로 조정하지 않고도 작업 간의 관계를 정의하여 프로젝트 일정을 유지할 수 있습니다.

## 사용 방법 {#howtouse}


자동 스케줄링을 활성화하려면, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드로 활성화하세요:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

그 다음, **auto_scheduling** 속성을 *true*로 설정합니다:

~~~js
gantt.config.auto_scheduling = true;
~~~


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


자동 스케줄링이 켜져 있어도 필요하다면 작업을 수동으로 스케줄할 수 있습니다.

## 순방향/역방향 계획 {#forwardbackwardplanning}


### 프로젝트 계획 전략

작업 계획은 순방향(Forward) 또는 역방향(Backward) 중 한 가지 방식으로 수행할 수 있습니다. 이는 다음 설정에 따라 달라집니다:

- [schedule_from_end](api/config/schedule_from_end.md) - (*boolean*) 계획 전략 유형을 결정
- [project_start](api/config/project_start.md) - (*Date*) 프로젝트 시작일을 설정; 순방향 계획 시 기본 작업 시작일로 사용되며, 기본값은 *null*
- [project_end](api/config/project_end.md) - (*Date*) 프로젝트 종료일을 설정; 역방향 계획 시 기본 작업 종료일로 사용되며, 기본값은 *null*

### 순방향 계획

순방향 계획이 기본 모드이며, **gantt.config.schedule_from_end**가 *false*로 설정되어 있습니다.

~~~js
// 순방향 계획이 활성화됨
gantt.config.schedule_from_end = false;
~~~

이 모드에서는 프로젝트 시작일이나 가장 이른 작업 날짜부터 작업이 스케줄되며, 별도의 제약 조건이 없다면 가능한 한 빨리 작업을 시작하도록 합니다.

**gantt.config.project_start**를 사용하여 프로젝트 시작일을 선택적으로 정의할 수 있습니다:

~~~js
gantt.config.project_start = new Date(2019, 2, 1);
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### 역방향 계획

역방향 계획은 프로젝트 종료일로부터 작업을 스케줄합니다. 사용하려면 **gantt.config.schedule_from_end**를 *true*로 설정하고, **gantt.config.project_end**로 프로젝트 종료일을 지정하세요:

~~~js
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

이 경우, 작업은 가능한 한 늦게 끝나도록 스케줄되며, 마지막 작업이 프로젝트 종료일에 끝나게 됩니다.


[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)


## 작업의 시간 제약 조건 {#timeconstraintsfortasks}

dhtmlxGantt에서는 작업에 추가적인 시간 제약 조건을 적용할 수 있습니다.

:::note
시간 제약 조건은 작업과 [마일스톤](guides/milestones.md)에만 적용됩니다. 프로젝트에는 영향을 주지 않습니다.
:::

### 라이트박스에서 제약 조건 추가

작업의 라이트박스에서 [**Constraint** 컨트롤](guides/constraint.md)을 통해 제약 조건을 설정할 수 있습니다.

![Inbuilt datepicker for constraints](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" }, /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

### 인라인 에디터로 제약 조건 추가

제약 조건은 인라인 에디터가 있는 별도의 그리드 컬럼(제약 조건 유형 및 날짜)을 통해서도 지정할 수 있습니다.

![Constraints columns](/img/constraints_columns.png)

**constraint_type** 및 **constraint_date** 컬럼명을 사용하세요.

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
    min: new Date(2019, 0, 1),
    max: new Date(2020, 0, 1)
};

gantt.config.columns = [
    { // 이전 컬럼},
    {
        name:"constraint_type", align:"center", width:100, template:function (task){
            return gantt.locale.labels[gantt.getConstraintType(task)];
        }, resize: true, editor: constraintTypeEditor
    },
    {
        name:"constraint_date", align:"center", width:120, template:function (task) {
        //template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)



### 제약 조건 유형

여러 가지 시간 제약 조건이 제공됩니다:

1. **가능한 한 빨리(As soon as possible)** - 독립 작업이 **strict** 모드에서 활성화된 경우, 작업은 프로젝트 시작 시 시작합니다. **strict** 모드가 아니면 지정된 날짜에 시작합니다. 종속 작업의 경우, 모든 선행 작업이 끝나는 즉시 시작합니다.

2. **가능한 한 늦게(As late as possible)** - 독립 작업은 프로젝트 종료 시 끝납니다. 종속 작업은 바로 다음 작업이 시작될 때 끝납니다.

다른 제약 조건들은 작업 유형과 관계없이 적용됩니다:

3. **지정된 날짜 이후에 시작(Start no earlier than)** – 작업은 지정된 날짜 이후 또는 그 날짜에 시작합니다.

4. **지정된 날짜 이전에 시작(Start no later than)** – 작업은 지정된 날짜 이전 또는 그 날짜에 시작합니다.

5. **지정된 날짜 이후에 종료(Finish no earlier than)** – 작업은 지정된 날짜 이후 또는 그 날짜에 종료합니다.

6. **지정된 날짜 이전에 종료(Finish no later than)** – 작업은 지정된 날짜 이전 또는 그 날짜에 종료합니다.

7. **반드시 해당 날짜에 시작(Must start on)** – 작업이 정확히 지정된 날짜에 시작합니다.

8. **반드시 해당 날짜에 종료(Must finish on)** – 작업이 정확히 지정된 날짜에 종료합니다.

:::note
독립 작업이란, 선행 작업이나 후속 작업이 없는 작업(링크나 관계가 없거나, 부모 작업이 다른 작업과 연결되어 있지 않은 경우)을 의미합니다.
:::

## 작업 간 래그(Lag) 및 리드(Lead) 설정 {#settinglagandleadtimesbetweentasks}
 

래그와 리드는 작업 간 더 복잡한 종속성을 정의하는 데 사용됩니다.

래그는 선행 작업이 끝난 후 후속 작업이 시작되기까지의 지연입니다. 리드는 선행 작업이 끝나기 전에 후속 작업이 시작되는 중첩입니다.

후속 작업에는 두 가지 유형이 있습니다:

- 선행 작업이 끝나기 전에 시작하는 작업(리드). 예를 들어, 1일 리드는 후속 작업이 선행 작업이 끝나기 1일 전에 시작함을 의미합니다.

- 선행 작업이 끝난 후 일정 지연 후 시작하는 작업(래그). 예를 들어, 1일 래그는 후속 작업이 선행 작업이 끝난 후 1일 뒤에 시작함을 의미합니다.

래그와 리드 값은 링크 객체의 **link.lag** 속성에 설정합니다:

- 래그: 양의 정수
- 리드: 음수 래그 값

기본적으로 종속성 링크의 래그는 0입니다.

### UI에서 링크 값 편집

Gantt에는 래그 또는 기타 링크 속성 편집을 위한 기본 UI가 포함되어 있지 않지만, [관련 챕터](guides/crud-dependency.md#editinglinkvaluesfromui)의 안내에 따라 직접 구현할 수 있습니다.


**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)


## 특정 작업에 대한 자동 스케줄링 비활성화 {#disablingautoschedulingforspecifictasks}


특정 작업에 대해 자동 스케줄링을 끄고 수동으로 스케줄하려면, 해당 작업의 **auto_scheduling** 속성을 *false*로 설정하세요:

~~~js
var task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

또는 [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md) 이벤트 핸들러를 사용하여 작업의 자동 스케줄링을 차단할 수 있습니다:

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    if(task.completed) {
        return false;
    }
    return true;
});
~~~

## 완료된 작업 스케줄링 {#schedulingcompletedtasks}


기본적으로 자동 스케줄링은 완료된 작업(progress 값이 1인 작업)을 미완료 작업과 동일하게 처리합니다.

이 동작을 변경하려면 [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) 옵션을 활성화하세요:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

이 옵션을 활성화하면, 완료된 작업은 크리티컬 경로와 자동 스케줄링에서 제외됩니다.

자세한 내용은 [API 페이지](api/config/auto_scheduling_use_progress.md)에서 확인할 수 있습니다.


## API 개요 {#apioverview}

다음은 사용 가능한 메서드 및 속성 목록입니다:

- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### 활성화
[auto_scheduling](api/config/auto_scheduling.md) 속성을 true로 설정하여 자동 스케줄링을 활성화합니다:

~~~js
gantt.config.auto_scheduling = true;
~~~

### Strict 모드

기본적으로, 작업은 새로운 날짜가 제약 조건을 위반할 때만 다시 스케줄됩니다. 항상 가능한 가장 이른 날짜로 작업을 다시 스케줄하려면 [auto_scheduling_strict](api/config/auto_scheduling_strict.md) 속성을 활성화하세요:

~~~js
gantt.config.auto_scheduling_strict = true;
~~~

:::note
6.1.0 ~ 7.1.3 버전에서는 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 옵션이 활성화되어 있어야 이 설정이 동작합니다.
:::

### 초기 자동 스케줄링

[auto_scheduling_initial](api/config/auto_scheduling_initial.md) 속성은 데이터 로드 시 자동 스케줄링 실행 여부를 제어합니다. 기본값은 true입니다:

~~~js
gantt.config.auto_scheduling_initial = true;
~~~

### 프로젝트 제약 조건 상속

[auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) 속성은 제약 조건이 지정되지 않은 작업이 상위 프로젝트로부터 제약 조건을 상속받을지 여부를 결정합니다:

~~~js
gantt.config.auto_scheduling_project_constraint = true;
~~~

### 프로젝트 일정 재계산

전체 프로젝트 일정을 재계산하려면 [autoSchedule](api/method/autoschedule.md) 메서드를 사용하세요:

~~~js
gantt.autoSchedule();
~~~

특정 작업부터 재계산하려면 해당 작업의 id를 메서드에 전달하세요:

~~~js
gantt.autoSchedule(taskId);
~~~

### 작업이 스케줄되지 않았는지 확인

작업이 스케줄되지 않았는지 확인하려면, [isUnscheduledTask](api/method/isunscheduledtask.md) 메서드를 작업 객체와 함께 사용하세요:

~~~js
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### 순환 참조 감지

차트에서 모든 순환 참조를 찾으려면, [findCycles](api/method/findcycles.md) 메서드를 사용하세요:

~~~js
gantt.findCycles();
~~~

### 링크가 순환인지 확인

링크가 순환인지 확인하려면, [isCircularLink](api/method/iscircularlink.md) 메서드를 사용하세요:

~~~js
var isCircular = gantt.isCircularLink(link);
~~~

### 연결된 작업 및 링크 가져오기

특정 작업과 연결된 작업 및 링크 목록을 가져오려면, [getConnectedGroup](api/method/getconnectedgroup.md) 메서드를 사용할 수 있습니다:

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~


## 이벤트 목록  {#thelistofevents}


아래는 사용 가능한 이벤트 목록입니다:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// 자동 스케줄링 시작 전
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // 커스텀 로직
    return true;
});

// 자동 스케줄링 종료 후
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // 커스텀 로직
});

// 특정 작업이 다시 스케줄되기 전
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task,start,link,predecessor){
    // 커스텀 로직
    return true;
});

// 특정 작업이 다시 스케줄된 후
gantt.attachEvent("onAfterTaskAutoSchedule",function(task,start,link,predecessor){
    // 커스텀 로직
});

// 순환 참조가 감지되어 자동 스케줄링이 불가할 때
gantt.attachEvent("onCircularLinkError",function(link, group){
    // 커스텀 로직
});

// 자동 스케줄링 중 순환 링크가 발견되었을 때
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // 커스텀 로직
});
~~~

## 버전 호환성 {#versioncompatibility}

작업의 날짜가 마우스로 드래그하거나 라이트박스를 통해 변경될 때, 해당 작업은 자동으로 두 가지 제약 조건 중 하나를 받게 됩니다: 선택한 계획 방식에 따라 **start no earlier than+%start date%** 또는 **finish no later than+%end date%** 중 하나입니다.

즉, 작업은 UI를 통해 설정된 더 나중의 날짜보다 더 일찍 예약되지 않습니다. 이 동작은 제약 조건에 익숙하지 않은 사용자에게는 예상치 못한 것일 수 있습니다. 특히, 기본적으로 차트에 제약 조건이 표시되지 않기 때문입니다.

제약 조건을 표시하려면 [addTaskLayer](api/method/addtasklayer.md) 메서드를 사용하여 표시를 활성화할 수 있습니다.


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


이 동작은 **v6.1** 이전 gantt 버전의 자동 스케줄링 로직과 다르며, MS Project에서 자동 계획이 작동하는 방식과 일치하므로 올바른 동작으로 간주됩니다.

이전 동작을 선호한다면, 제약 조건을 비활성화하여 6.1 이전 자동 스케줄링 방식으로 되돌릴 수 있습니다:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
