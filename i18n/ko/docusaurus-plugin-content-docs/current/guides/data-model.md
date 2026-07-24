---
title: "데이터 모델"
sidebar_label: "데이터 모델"
description: "Gantt 데이터 모델 개요: 로딩 및 저장을 위한 직렬화된 타입, 차트 내부에서 사용되는 런타임 타입, 및 레거시 호환성 별칭."
---

# 데이터 모델

Gantt는 작업(Task) 및 링크(Link) 데이터의 두 가지 주요 표현으로 동작합니다:

- **Serialized**: 문자열 날짜를 가진 JSON-호환 형태로, 서버 응답, 저장된 JSON, 및 DataProcessor 교환에 사용됩니다.
- **Runtime**: 날짜 필드를 가진 클라이언트 측 객체와 계산된 `$`-접두사 속성으로 구성되며, [gantt.getTask()](api/method/gettask.md) 및 [gantt.getLink()](api/method/getlink.md)와 같은 메서드에서 반환됩니다.

Gantt에 데이터를 *제공*할 때(반대로 읽지 않는 경우), 날짜 필드는 `Date` 이거나 `string`일 수 있습니다. [`TaskInput`](#taskinput) 타입은 이 관대한 입력 형태를 포착하므로, 데이터 작성자나 애플리케이션 상태에 보유한 데이터를 위해 `Task` 또는 `SerializedTask`에 꼭 맞춰야 할 필요가 없습니다.

[gantt.parse()](api/method/parse.md)에 전달되는 표준 최상위 페이로드는 `GanttData`입니다.

핵심 런타임 및 직렬화 타입은 `@dhx/gantt`에서 export됩니다. 래퍼 패키지는 이러한 타입을 재-export하고 공개 API에서 사용하지만, 정확한 속성 표면은 래퍼마다 다릅니다.

## 데이터 수명주기

데이터는 두 가지 변환을 거칩니다:

1. **Loading**: 직렬화된 작업 및 링크 데이터가 `gantt.parse()` 또는 `gantt.load()`에 전달됩니다. Gantt는 날짜 문자열을 `Date` 객체로 파싱하고 계산된 `$`-접두사 속성을 추가하여 런타임 `Task` 및 `Link` 객체를 생성합니다.
2. **Saving**: 변경사항이 DataProcessor를 통해 서버로 전송될 때, 날짜가 다시 문자열로 직렬화되고 임시 `$`-접두사 필드가 제거됩니다.

동작 세부 정보는 [Data Loading](guides/loading.md) 및 [Server-Side Integration](guides/server-side.md)를 참조하십시오.

## SerializedTask

JSON-호환 가능한 작업 형태입니다. 날짜 필드는 문자열이므로 이 객체는 안전하게 `JSON.stringify()` / `JSON.parse()`를 통해 전달될 수 있습니다.

~~~ts
interface SerializedTask {
    id?: string | number;
    start_date?: string;
    end_date?: string;
    duration?: number;
    text?: any;
    type?: string;
    parent?: string | number;
    progress?: number;
    open?: boolean;

    auto_scheduling?: boolean;
    unscheduled?: boolean;
    constraint_date?: string;
    constraint_type?: string;
    deadline?: string;

    color?: string;
    textColor?: string;
    progressColor?: string;
    bar_height?: number;
    row_height?: number;
    hide_bar?: boolean;

    baselines?: SerializedBaseline[];
    calendar_id?: string | number;
    editable?: boolean;
    readonly?: boolean;
    render?: string;
    resource?: string[];
    rollup?: boolean;
    target?: string;

    [customProperty: string]: any;
}
~~~

의미 있는 일정 Task를 직렬화된 JSON으로 만들려면 아래의 하나의 유효한 스케줄링 조합을 제공하십시오:

- `start_date` + `duration`
- `start_date` + `end_date`
- `duration` + `end_date`

If `unscheduled: true`, 날짜는 생략할 수 있습니다.

자세한 속성 설명은 [Task Properties](guides/task-properties.md)를 참조하십시오.

## SerializedLink

~~~ts
interface SerializedLink {
    id: string | number;
    source: string | number;
    target: string | number;
    type: string;
    lag?: number;
    readonly?: boolean;
    editable?: boolean;

    [customProperty: string]: any;
}
~~~

자세한 속성 설명은 [Link Properties](guides/link-properties.md)를 참조하십시오.

## 런타임 Task 및 Link

로딩 후, Gantt는 작업을 런타임 `Task` 객체로 저장합니다.

SerializedTask와의 주요 차이점은 다음과 같습니다:

- 작업의 날짜 필드(`start_date`, `end_date`, `constraint_date`, `deadline`)는 자바스크립트 `Date` 객체입니다
- 계산된 `$`-접두사 필드가 클라이언트에 추가되고 유지됩니다

일반적인 런타임 전용 작업 필드:

| 속성 | 타입 | 설명 |
|----------|------|-------------|
| `$index` | number | 보이는 목록의 전역 세로 위치 |
| `$level` | number | 작업 계층 구조의 중첩 깊이 |
| `$open` | boolean | 현재 브랜치가 확장되었는지 여부 |
| `$source` | Array | 작업에서 나가는 링크의 ID |
| `$target` | Array | 작업으로 들어오는 링크의 ID |
| `$has_child` | boolean | 작업에 하위 작업이 있는지 여부 |

런타임 `Link` 객체는 `SerializedLink`와 동일한 필드 세트를 가지지만, `gantt.getLink()` 같은 메서드가 반환하는 클라이언트 측 객체입니다.

전체 런타임 목록은 [Task Properties](guides/task-properties.md#dynamic-properties) 및 [Link Properties](guides/link-properties.md)를 참조하십시오.

## TaskInput

Gantt에 Task 데이터를 *제공*할 때 — [gantt.parse()](api/method/parse.md), [gantt.addTask()](api/method/addtask.md), `tasks` 구성/속성 또는 자체 애플리케이션 저장소 — `TaskInput`을 사용합니다. 이는 날씬한 입력 형태입니다: 날짜 필드는 `Date` 또는 `string` 중 하나를 허용하고, 모든 필드(예: `id`)는 선택적이며, 공급되지 않으면 Gantt가 ID를 생성합니다.

~~~ts
type TaskInput = Partial<SerializedTask> | Partial<Task>;
~~~

`TaskInput`은 애플리케이션에서 작성하거나 상태에 보유한 데이터에 사용하세요. Gantt의 자체 객체를 메서드들로 읽을 때는 런타임의 `Task`(`Date` 날짜, `$`-접두사 필드)로 사용하고, 서버와 JSON으로 교환할 때는 문자열 날짜만 사용하는 `SerializedTask`로 사용하세요.

~~~ts
// 애플리케이션 소유의 데이터가 Gantt에 전달될 때 - 두 날짜 형식 중 하나를 허용합니다:
const tasks: TaskInput[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 },
    { id: 2, text: "Task #2", start_date: "2026-04-02", duration: 3 }
];
~~~

`TaskInput[]`로 애플리케이션 상태를 저장하는 것이 `SerializedTask[]` 또는 `Task[]`로 타입을 지정하는 것보다 바람직합니다. seed 데이터가 `Date` 객체를 사용하는데 타입이 문자열을 기대하는 경우(또는 그 반대)의 불일치를 피할 수 있습니다. 날짜 표현이 고정된 경계에서만 `Task` / `SerializedTask`를 선택하세요.

## 보조 타입

### Baseline 및 SerializedBaseline

~~~ts
interface Baseline {
    id: string | number;
    task_id: string | number;
    start_date: Date;
    duration: number;
    end_date: Date;
    [customProperty: string]: any;
}

interface SerializedBaseline {
    id?: string | number;
    task_id?: string | number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceAssignment 및 SerializedResourceAssignment

~~~ts
interface ResourceAssignment {
    id: string | number;
    task_id: string | number;
    resource_id: string | number;
    value: number | string;
    delay: number;
    start_date: Date;
    end_date: Date;
    duration: number;
    mode: string;
    [customProperty: string]: any;
}

interface SerializedResourceAssignment {
    id?: string | number;
    task_id: string | number;
    resource_id: string | number;
    value?: number | string;
    mode?: string;
    delay?: number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceItem

~~~ts
interface ResourceItem {
    id: string | number;
    text?: string;
    parent?: string | number;
    open?: boolean;
    unit?: string | number;
    default_value?: string | number;
    [customProperty: string]: any;
}
~~~

자세한 기능별 내용은 [Inbuilt Baselines](guides/inbuilt-baselines.md) 및 [Resource Management](guides/resource-management.md)를 참조하십시오.

## GanttData

[gantt.parse()](api/method/parse.md)에 전달되는 객체:

~~~ts
type GanttData =
  | {
      data: (SerializedTask | Task)[];
      tasks?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    }
  | {
      tasks: (SerializedTask | Task)[];
      data?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    };
~~~

작업 배열에 대해 `tasks`와 `data` 키 모두를 허용합니다. 새 코드에서는 `tasks`가 선호됩니다.

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project #1", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "0" }
    ]
});
~~~

## 레거시 호환성 별칭

이전 API 문서 및 타입 정의에서는 여전히 여러 호환 이름을 사용합니다:

- `DataToLoad1`, `DataToLoad2`: `GanttData`의 더 이상 권장되지 않는 키별 변형
- `NewTask`: [`TaskInput`](#taskinput)의 레거시 별칭(정의는 `TaskInput | string | {}`)으로, 후방 호환성을 위해 유지됩니다. 새 코드에서는 `TaskInput`을 선호합니다.
- `NewResourceItem`: `Partial<ResourceItem>`에 대한 더 이상 권장되지 않는 호환 별칭
- `NewAssignmentItem`: `SerializedResourceAssignment | ResourceAssignment`에 대한 더 이상 권장되지 않는 호환 별칭

이 이름들은 이전 버전과의 호환성을 위해 유지되지만, `GanttData`, `TaskInput`, `SerializedTask`, `SerializedLink`, `Task`, 및 `Link`는 이 가이드에서의 표준 개념으로 사용됩니다.

## 날짜 규칙

- 서버와 JSON을 교환할 때 날짜 필드에는 문자열을 사용합니다
- JavaScript 객체를 직접 만들어 `gantt.parse()`에 전달하면 런타임의 작업 및 할당 객체에 `Date`가 포함될 수 있습니다
- 로딩 후, Gantt는 런타임 `Task`의 날짜를 `Date` 객체로 저장합니다
- v9.1.3부터 Gantt는 ISO 8601 날짜 문자열을 자동으로 감지합니다

자세한 내용과 예제는 [Data Loading - Loading Task Dates](guides/loading.md#loadingtaskdates)를 참조하십시오.

## 사용자 정의 속성 {#custom-properties}

모든 데이터 타입은 `[customProperty: string]: any`를 통한 사용자 정의 속성을 지원합니다. 로딩 후 클라이언트 측에서 사용자 정의 속성은 보존되며 템플릿, 열, 편집기 및 백엔드 저장소에서 사용할 수 있습니다.

~~~js
gantt.parse({
    tasks: [
        {
            id: 1,
            text: "Task #1",
            start_date: "2026-04-01",
            duration: 10,
            priority: "high",
            owner: "John"
        }
    ],
    links: []
});

const task = gantt.getTask(1);
console.log(task.priority); // "high"
~~~

## 작업 순서

Gantt는 `tasks` 배열에 나타난 순서대로 작업을 표시합니다. 배열에서 각 항목의 위치와 `parent` 계층 구조가 클라이언트에서의 시각적 순서를 결정하는 유일한 요소입니다. 런타임의 `$index` 속성은 이 배열 위치에서 계산되며 저장되지 않습니다.

즉 데이터 소스가 표시 순서를 제어합니다. 사용자가 UI에서 작업의 순서를 드래그-앤-드롭으로 재정렬할 수 있다면, 이후 로드에서 올바른 순서로 작업을 반환하기 위해 데이터 소스가 새 순서를 기억하는 방법이 필요합니다.

표준 접근 방식은 백엔드 저장소에 숫자형 `sortorder` 열을 두는 것입니다. 데이터 소스는 반환하기 전에 이 열로 작업을 정렬합니다. `sortorder`는 백엔드 전용 개념이며, Gantt는 클라이언트에서 이를 읽거나 해석하지 않습니다. 페이로드에 포함되면 [custom property](#custom-properties)로 전달되지만, 내장된 효과는 없습니다.

사용자가 UI에서 작업의 순서를 재배열하면, Gantt는 DataProcessor를 통해 서버로 전송되는 작업 객체의 `target` 속성을 채웁니다. 이 값은 형제 간의 상대 위치를 나타냅니다:

- `target="taskId"` - 주어진 id를 가진 작업 앞에 이 작업을 배치합니다
- `target="next:taskId"` - 주어진 id를 가진 작업의 다음에 이 작업을 배치합니다

백엔드는 이 값을 사용하여 영향을 받는 작업들의 `sortorder`를 재계산합니다.

전체 구현 패턴—데이터베이스 스키마, 초기 값, 재정렬 로직—은 Server-Side Integration 가이드의 [Storing the Order of Tasks](guides/server-side.md#storingtheorderoftasks)를 참조하십시오. 클라이언트 측 드래그 앤 드롭 구성은 [Reordering Tasks](guides/reordering-tasks.md)를 참조하십시오.