---
title: "타임라인의 추가 요소"
sidebar_label: "타임라인의 추가 요소"
---

# 타임라인의 추가 요소

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::


기본적으로 dhtmlxGantt는 타임라인 영역의 요소를 레이어로 렌더링하며, 다음과 같은 순서로 표시합니다:

1. 타임라인의 그리드
2. 링크
3. 작업
4. 추가 요소들

Gantt는 기본 제공 요소로서 기준선(baselines), 마감 기한(deadlines) 및 시간 제약(time constraints)을 포함합니다. 기본 추가 요소 대신
[추가 레이어로 사용자 정의 요소를 생성](guides/baselines.md)할 수도 있습니다. 

## Baselines

Gantt 차트와 같은 프로젝트 관리 도구에서 기준선은 계획된 프로젝트 타임라인과 실제 진행 상황을 비교하는 데 필수적입니다. 
Gantt API는 기준선 엔티티에 대한 내장 지원을 제공하여 이 중요한 요소를 다루는 일을 크게 단순화합니다.

![내장된 기준선](/img/inbuilt_baselines.png)


[기준선 표시](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### 기준선 커스터마이즈

기본 기준선 기능이 프로젝트 요구사항에 맞지 않는 경우, [baselines](api/config/baselines.md) 구성 옵션을 사용하여 비활성화할 수 있습니다.

~~~js
gantt.config.baselines = false;
~~~

그 후에는 기준선 표시를 아래 중 하나의 방법으로 커스터마이즈할 수 있습니다:

1. **gantt.config.baselines** 구성 객체 사용

**baselines** 구성 옵션은 객체로 설정되었을 때 Gantt 차트에서 기준선을 렌더링하는 방식을 사용자 정의할 수 있습니다. 
객체 구성에는 다음 속성이 포함됩니다:

- **datastore** (*string*) - 기준선 항목을 저장하는 데 사용되는 데이터스토어의 이름입니다. 관련 기능은 `getDatastore` 메서드를 참조하십시오.
- **render_mode** (*boolean | string*) - 기준선이 표시되는 방식을 결정합니다:
    - `false` - 기준선은 표시되지 않습니다.
    - `"taskRow"` - 기준선이 작업 막대와 같은 행에 표시됩니다.
    - `"separateRow"` - 기준선이 별도의 하위 행에 표시되어 작업 행의 높이를 확장합니다.
    - `"individualRow"` - 각 기준선이 작업 아래의 자체 하위 행에 표시됩니다.
- **dataprocessor_baselines** (*boolean*) - 기준선 업데이트가 DataProcessor를 개별 항목으로 트리거하는지 여부를 지정합니다.
- **row_height** (*number*) - 기준선용 하위 행의 높이를 정의하며, `render_mode`가 `"separateRow"` 또는 `"individualRow"`로 설정된 경우에만 적용됩니다.
- **bar_height** (*number*) - 기준선 바의 높이를 설정합니다.

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

동적으로 **gantt.config.baselines** 설정을 수정하는 경우, 기준선 요소가 올바르게 표시되도록 [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) 메서드를 사용해야 합니다.

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. [타임라인에 추가하는 커스텀 기준선 요소 생성](guides/baselines.md) 

### 작업과 함께 로딩되는 기준선

기준선은 작업과 함께 직접 로드될 수 있습니다. 아래 예제를 확인하십시오:

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
    // Additional tasks...
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
    // Additional baselines... /*!*/
  ], /*!*/
});
~~~

일단 기준선이 로드되면 추가 구성 없이도 Gantt가 타임라인에 자동으로 표시합니다.

### 작업의 기준선 가져오기

특정 작업의 기준선을 얻으려면 [getTaskBaselines](api/method/gettaskbaselines.md) 메서드를 사용합니다. 

~~~js
gantt.getTaskBaselines(5);
~~~

이 메서드는 데이터스토어에서 지정된 작업의 기준선 객체 배열을 반환합니다.

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

### 라이트박스의 기준선

기준선은 라이트박스 컨트롤을 통해 관리할 수 있습니다. 작업 세부 정보에서 직접 기준선을 추가, 편집 및 삭제할 수 있습니다.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![Baseline lightbox](/img/baselines_lightbox.png)

### 기준선 렌더링 모드

Gantt는 기준선을 표시하기 위한 세 가지 모드를 제공합니다. 필요에 가장 알맞은 렌더링 모드를 선택하려면 **gantt.config.baselines.render_mode** 구성을 해당 값으로 설정하면 됩니다. 세 가지 모드가 있습니다:

- 작업과 같은 행에 표시됩니다("taskRow")

기준선은 작업 막대가 있는 동일한 행에 직접 표시됩니다:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![Task row mode](/img/baselines_task_row.png)

- 작업 아래의 별도 하위 행에 표시됩니다("separateRow")

모든 기준선이 각 작업 아래의 단일 하위 행에 렌더링됩니다:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![Subrow mode](/img/baselines_subrow.png)

- 개별 하위 행에 표시됩니다("individualRow")

각 기준선이 최대한 명확하게보기 위해 고유의 하위 행에 표시됩니다:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![Individual row mode](/img/baselines_individual_row.png)

### 기준선 텍스트 설정

기준선 요소 안에 표시될 텍스트를 지정하려면 [baseline_text](api/template/baseline_text.md) 템플릿을 사용하십시오:

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

## 마감 기한 및 제약

프로젝트 관리에서 마감 기한을 추적하고 작업 제약 조건을 이해하는 것은 제때에 Delivery를 달성하는 데 매우 중요합니다. 
DHTMLX Gantt는 마감 기한과 제약에 대한 내장 시각화를 제공하여 프로젝트 타임라인 관리 능력을 효과적으로 향상시킵니다.

![Deadlines](/img/deadlines.png)


[마감 기한 표시](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


### 마감 기한 시각화

Gantt는 **task.deadline** 필드를 지원합니다. 지정되면 차트에 시각적 표시가 나타나 작업 마감 기한을 추적하기가 더 쉬워집니다.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // April 10, 2025 /*!*/
    },
    // Additional tasks...
  ],
});
~~~

### 마감 기한 커스터마이즈

기본 마감 기한 기능이 프로젝트 요구사항에 맞지 않는 경우 [deadlines](api/config/deadlines.md) 구성 옵션을 사용하여 비활성화할 수 있습니다.

~~~js
gantt.config.deadlines = false;
~~~

그 후에는 타임라인에 마감 기한 요소를 추가하기 위한 커스텀 마감 기한 요소 생성 방법으로 마감 기한 표시를 사용자화할 수 있습니다.

gantt.config.deadlines 구성 옵션은 작업에 대한 마감 기한 요소의 표시를 활성화하거나 비활성화합니다. 활성화되면 Gantt는 **task.deadline** 속성을 확인하고 유효한 날짜가 포함되어 있으면 타임라인에 마감 기한 요소가 표시됩니다.

### 작업 제약

버전 9.0부터, 자동 스케줄링이 활성화되고 제약 모드에서 작동하는 경우([auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md)가 *false*로 설정되어 있을 때), Gantt는 차트에 제약 날짜를 자동으로 표시합니다.

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
    // Additional tasks
  ]
})
~~~

제약의 표시 여부는 [auto_scheduling](api/config/auto_scheduling.md) 구성의 `show_constraints` 옵션을 사용하여 제어할 수 있습니다. 
기본적으로 제약이 표시되지만, `false`로 설정하여 비활성화할 수 있습니다:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

