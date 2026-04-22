---
sidebar_label: auto_scheduling
title: auto_scheduling config
description: "enables auto scheduling"
---

# auto_scheduling

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 자동 스케줄링 활성화

@signature: auto_scheduling: AutoSchedulingConfig | boolean

### Example

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    gap_behavior: "compress"
};

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [자동 스케줄링 확장](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 구성은 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [Auto Scheduling](guides/auto-scheduling.md) 문서를 참조하십시오.
:::

`auto_scheduling` 구성을 불리언으로 설정하는 것도 가능하지만, 객체 정의를 사용하는 것이 자동 스케줄링 동작을 구성하는 권장 방법입니다.

객체로 설정할 때 사용 가능한 옵션은 다음과 같습니다:

#### enabled

**타입**: boolean

**기본값**: `false`

자동 스케줄링을 켜거나 끕니다(직접 불리언 값을 사용하는 것과 동일합니다).

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

#### apply_constraints

**타입**: boolean

**기본값**: `true`

자동 스케줄링에서 시간 제약의 사용 여부를 활성화하거나 비활성화합니다.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

값을 `false`로 설정하면 제약 조건을 무시하는 모드로 자동 스케줄링이 전환되고, 작업 간의 의존성에만 스케줄링이 의존하게 됩니다.

이 속성은 더 이상 사용되지 않는 [](api/config/auto_scheduling_compatibility.md) 설정을 대체합니다.

- Basic Scheduling
- Constraint Scheduling

<span id="gapbehavior"></span>

#### gap_behavior

**타입**: 문자열

**허용 값**: `"preserve"`|`"compress"`

**기본값**: `"preserve"`

스케줄링 중 의존 관계가 있는 작업들 간의 간격을 Gantt가 처리하는 방식을 정의합니다.

- **"preserve"** - 충돌이 없으면 현재 위치에 작업을 유지
- **"compress"** - 제약 가능 시점에 가장 이른 날짜로(또는 `schedule_from_end`가 활성화된 경우 가장 늦은 날짜로) 이동

기본적으로 현재 날짜가 제약 조건이나 의존성을 위반할 때만 재스케줄됩니다.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

<span id="descendantlinks"></span>

#### descendant_links

**타입**: boolean

**기본값**: `false`

상위 작업(프로젝트)과 하위 작업 간의 링크 생성을 허용하거나 금지합니다.

기본적으로 이러한 링크는 생성될 수 없습니다.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    descendant_links: true
};
~~~

#### schedule_on_parse

**타입**: boolean

**기본값**: `true`

데이터 로딩/파싱 시 자동 스케줄링을 수행할지 여부를 정의합니다.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: false
};
~~~

#### move_projects

**타입**: boolean

**기본값**: `true`

기본적으로(속성이 *true*로 설정된 경우), 자동 스케줄링 중 전체 프로젝트가 이동합니다. 이는 프로젝트 내 모든 작업이 서로의 위치와 프로젝트 시작 위치를 기준으로 제자리에 남아 있음을 의미합니다.

![moving_project_true](/img/moving_project_true.png)

*move_projects* 속성이 *false*로 설정되면, 자동 스케줄링은 프로젝트 내부의 개별 작업을 이동시킵니다. 이로 인해 일부 작업은 이동하고 다른 작업은 제자리에 남아 있습니다.

![moving_project_false](/img/moving_project_false.png)

:::note
제약 조건 스케줄링(*apply_constraints: true*)을 사용하는 경우, `gap_behavior` 속성이 "preserve"로 설정될 때에만 *move_projects* 구성이 활성화됩니다:

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: true,
    move_projects: true,
    gap_behavior: "preserve"
};
~~~
:::

#### use_progress

**타입**: boolean

**기본값**: `false`

완료된 작업이 스케줄링 및 중요 경로 계산에 영향을 미치도록 할지 여부를 지정합니다.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
~~~

해당 속성이 활성화되면, MS Project에서와 유사하게 작업 진행률 값을 고려하여 임계 경로, 여유 시간, 자동 스케줄링 알고리즘이 동작합니다. 구체적으로는:

1) 완료된 작업(진행률이 100%인 작업)은 항상 여유 시간이 0입니다.

2) 완료된 작업은 자동 스케줄링 계산에서 제외되며, 선행 작업에서 완료된 작업으로 연결되는 관계는 무시됩니다.

3) 완료된 작업은 중요 경로의 구성요소가 될 수 없습니다.

- [Use progress for auto-scheduling, critical path and slack calculations](https://snippet.dhtmlx.com/ju3km1uy)

#### schedule_from_end

**타입**: boolean

**기본값**: `false`

역방향 스케줄링을 활성화합니다.

이 구성을 `true`로 설정하면 auto scheduling이 `as late as possible` 모드로 전환됩니다.

해당 값은 [](api/config/project_end.md)도 함께 지정된 경우에만 적용됩니다.

~~~jsx
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

- [Backward Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

#### project_constraint

**타입**: boolean

**기본값**: `false`

작업이 상위 프로젝트의 제약 유형을 상속받을지 여부를 정의합니다.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

기본적으로 상위 프로젝트의 제약 유형은 하위 작업의 제약 유형에 영향을 주지 않습니다.

구성을 *true*로 설정하면(자체 제약 유형이 있는 작업은 예외), 자식 작업은 상위 프로젝트와 같은 제약 유형을 갖게 됩니다(예: **finish no later than**).

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

#### show_constraints

**타입**: boolean

**기본값**: `false`

Gantt 차트에서 작업 제약 조건의 표시를 제어합니다. 제약 조건을 표시하려면 `true`, 숨기려면 `false`를 설정합니다.

예를 들어 자동 스케줄링을 활성화하되 작업 제약 조건의 표시를 비활성화하려면:

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    show_constraints: false
};
gantt.init("gantt_here");
~~~

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Related API
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [constraint_types](api/config/constraint_types.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 버전 9.1부터 `auto_scheduling`에 객체 설정을 사용하는 것이 권장됩니다.
- 버전 9.0부터 객체로 설정할 수 있습니다.