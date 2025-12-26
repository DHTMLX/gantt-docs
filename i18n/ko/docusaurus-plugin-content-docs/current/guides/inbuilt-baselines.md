---
title: "타임라인의 추가 요소"
sidebar_label: "타임라인의 추가 요소"
---

# 타임라인의 추가 요소

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

기본적으로 dhtmlxGantt는 타임라인 요소를 다음 순서로 레이어로 렌더링합니다:

1. 타임라인의 그리드
2. 링크
3. 작업(Task)
4. 추가 요소

Gantt에는 베이스라인, 마감일(Deadlines), 시간 제약(Constraints)과 같은 내장 요소가 포함되어 있습니다. 기본 제공되는 추가 요소 외에도 [사용자 정의 요소를 추가 레이어로 생성](guides/baselines.md)할 수 있습니다.

## 베이스라인(Baselines)

베이스라인은 Gantt 차트와 같은 프로젝트 관리 도구에서 계획된 일정과 실제 진행 상황을 비교할 수 있도록 해주는 중요한 역할을 합니다. Gantt API는 베이스라인을 기본적으로 지원하여 이 핵심 기능을 쉽게 사용할 수 있도록 합니다.

![내장 베이스라인](/img/inbuilt_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### 베이스라인 커스터마이징

기본 베이스라인 옵션이 프로젝트 요구에 맞지 않는 경우, [baselines](api/config/baselines.md) 설정 옵션을 사용하여 비활성화할 수 있습니다.

~~~js
gantt.config.baselines = false;
~~~

비활성화한 후에는 다음 방법 중 하나로 베이스라인의 표시 방식을 커스터마이즈할 수 있습니다:

1. **gantt.config.baselines** 설정 객체 사용

이 객체를 객체 형태로 지정하면 베이스라인의 렌더링 방식을 조정할 수 있습니다. 주요 속성은 다음과 같습니다:

- **datastore** (*string*) - 베이스라인 항목을 저장할 데이터스토어의 이름입니다. 관련 내용은 `getDatastore` 메서드를 참고하세요.
- **render_mode** (*boolean | string*) - 베이스라인 표시 방식을 제어합니다:
    - `false` - 베이스라인을 숨깁니다.
    - `"taskRow"` - 베이스라인이 작업 바와 같은 행에 표시됩니다.
    - `"separateRow"` - 베이스라인이 별도의 하위 행(subrow)에 표시되어 작업 행의 높이가 증가합니다.
    - `"individualRow"` - 각 베이스라인이 작업 아래에 별도의 하위 행에 표시됩니다.
- **dataprocessor_baselines** (*boolean*) - 베이스라인 업데이트 시 DataProcessor가 개별적으로 동작할지 여부를 나타냅니다.
- **row_height** (*number*) - 베이스라인용 하위 행의 높이입니다. `render_mode`가 `"separateRow"` 또는 `"individualRow"`일 때만 적용됩니다.
- **bar_height** (*number*) - 베이스라인 바의 높이입니다.

예시:

~~~js
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

**gantt.config.baselines**의 표시 설정을 동적으로 변경하는 경우, 베이스라인이 올바르게 표시되도록 [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) 메서드 사용을 권장합니다.

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. 타임라인에 [사용자 정의 베이스라인 요소 생성](guides/baselines.md)하여 추가

### 작업과 함께 베이스라인 불러오기

베이스라인은 다음과 같이 작업과 함께 불러올 수 있습니다:

~~~js
gantt.parse({
  tasks: [
    {
      id: 2,
      start_date: "2025-04-04 00:00:00",
      duration: 2,
      text: "Task #1",
      progress: 0.5,
      parent: 0,
      open: true,
      end_date: "2025-04-06 00:00:00",
    },
    // 추가 작업...
  ],
  links: [],
  baselines: [ /*!*/
    { /*!*/
      id: 2, /*!*/
      task_id: 2, /*!*/
      start_date: "2025-04-03 00:00:00", /*!*/
      duration: 2, /*!*/
      end_date: "2025-04-05 00:00:00", /*!*/
    }, /*!*/
    // 추가 베이스라인... /*!*/
  ], /*!*/
});
~~~

불러오면 Gantt가 별도의 추가 설정 없이 타임라인에 베이스라인을 자동으로 표시합니다.

### 작업의 베이스라인 가져오기

특정 작업에 대한 베이스라인은 [getTaskBaselines](api/method/gettaskbaselines.md) 메서드를 사용하여 가져올 수 있습니다.

~~~js
gantt.getTaskBaselines(5);
~~~

이 메서드는 데이터스토어에서 해당 작업과 연결된 베이스라인 객체 배열을 반환합니다.

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### 라이트박스에서 베이스라인 관리

베이스라인은 라이트박스 컨트롤을 통해 직접 관리할 수 있습니다. 작업 세부 정보에서 베이스라인을 추가, 편집, 삭제할 수 있습니다.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![베이스라인 라이트박스](/img/baselines_lightbox.png)

### 베이스라인 렌더링 모드

**gantt.config.baselines.render_mode** 옵션을 통해 베이스라인은 세 가지 방식으로 표시할 수 있습니다:

- 작업과 같은 행에 표시 ("taskRow")

베이스라인이 작업 바와 함께 같은 행에 표시됩니다:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![작업 행 모드](/img/baselines_task_row.png)

- 작업 아래 별도의 하위 행에 표시 ("separateRow")

모든 베이스라인이 각 작업 하위 행에 표시됩니다:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![하위 행 모드](/img/baselines_subrow.png)

- 각각의 베이스라인을 별도의 하위 행에 표시 ("individualRow")

각 베이스라인이 더 명확하게 구분되는 별도의 하위 행에 표시됩니다:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![개별 행 모드](/img/baselines_individual_row.png)

### 베이스라인 텍스트 설정

베이스라인 요소 내부에 사용자 지정 텍스트를 추가하려면 [baseline_text](api/template/baseline_text.md) 템플릿을 사용하세요:

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

## 마감일(Deadlines) 및 제약 조건(Constraints)

마감일과 작업 제약 조건을 관리하는 것은 프로젝트 성공에 매우 중요합니다. DHTMLX Gantt는 마감일과 제약 조건에 대한 내장 시각화 기능을 제공하여 프로젝트 타임라인 관리를 향상시킵니다.

![마감일](/img/deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


### 마감일 시각화

Gantt는 **task.deadline** 필드를 지원합니다. 이 필드가 설정되면 차트에 시각적 마커가 표시되어 마감일을 쉽게 모니터링할 수 있습니다.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // 2025년 4월 10일 /*!*/
    },
    // 추가 작업...
  ],
});
~~~

### 마감일 커스터마이징

기본 마감일 기능이 필요에 맞지 않으면 [deadlines](api/config/deadlines.md) 옵션을 사용해 비활성화할 수 있습니다.

~~~js
gantt.config.deadlines = false;
~~~

비활성화한 후에는 [사용자 정의 마감일 요소 생성](guides/baselines.md)으로 타임라인에 원하는 방식으로 표시할 수 있습니다.

**gantt.config.deadlines** 설정은 마감일 요소의 표시를 제어합니다. 활성화 시 Gantt는 **task.deadline** 속성을 확인하며, 유효한 날짜가 있으면 타임라인에 마감일 마커가 표시됩니다.

### 작업 제약 조건 (#taskconstraints)

v9.0부터 [자동 스케줄링](guides/auto-scheduling.md)이 활성화되고 Constraint 모드(즉, [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md)가 *false*로 설정)에서 동작할 때, Gantt는 차트에 제약 조건 날짜를 자동으로 표시합니다.

~~~js
gantt.parse({
  data: [
    { 
      id: 1, 
      text: "Task #1", 
      start_date: "2025-04-04", 
      duration: 4, 
      constraint_date: "2025-04-04", 
      constraint_type: "snet", 
      parent: 0
    },
    // 추가 작업
  ]
})
~~~

제약 조건의 표시 여부는 [auto_scheduling](api/config/auto_scheduling.md) 설정의 `show_constraints` 옵션으로 제어할 수 있습니다. 기본적으로 제약 조건은 표시되지만, `show_constraints`를 `false`로 설정하여 숨길 수 있습니다:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

