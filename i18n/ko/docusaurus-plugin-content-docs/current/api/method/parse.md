---
sidebar_label: parse
title: parse method
description: "클라이언트 측 리소스에서 데이터를 로드합니다"
---

# parse

### Description

@short: 클라이언트 측 리소스에서 데이터를 로드합니다

@signature: parse: (data: string | GanttData, type?: string) => void

### Parameters

- `data` - (필수) *string | GanttData* - [data](guides/loading.md#dataproperties)을 나타내는 문자열 또는 객체
- `type` - (선택) *string* - 선택적, (`'json'`, `'xml'`) 데이터 타입. 기본값은 `'json'`입니다

### Example

~~~jsx
gantt.parse({
    tasks: [
        { id: 1, text: "Project #2", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, progress: 0.6, parent: 1 },
        { id: 3, text: "Task #2", start_date: "2026-04-11", duration: 8, progress: 0.6, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
});
~~~

### Related samples

- [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Details

`parse()` 메서드는 최상위 [GanttData](guides/data-model.md#ganttdata) 객체를 인수로 받습니다.

Gantt는 작업 배열의 이름이 `data` 또는 `tasks`이고, 링크 배열의 이름이 `links`일 것으로 예상합니다.

지원되는 속성 목록은 다음과 같습니다.

- `tasks` 또는 `data` - (`(SerializedTask | Task)[]`) 작업 데이터 배열
- `links?` - (`(SerializedLink | Link)[]`) 링크 데이터 배열
- `resources?` - (`Partial<ResourceItem>[]`) 자원 데이터 배열
- `assignments?` - (`(SerializedResourceAssignment | ResourceAssignment)[]`) 할당 데이터 배열
- `baselines?` - (`(SerializedBaseline | Baseline)[]`) 베이스라인 데이터 배열
- `collections?` - (`Record<string, Array<Record<string, unknown>>>`) 사용자 정의 컬렉션 객체

~~~js
gantt.parse({
    tasks: [
        { id: 1, start_date: "2026-04-01", duration: 42, text: "House Construction" },
        { id: 2, start_date: "2026-04-20", duration: 60, text: "Interior Works" }
    ],
    links: [
        { id: "1", source: "1", target: "2", type: "0" }
    ],
    resources: [
        { id: 1, text: "Anna, Architect", unit: "hours/day", default_value: 8, type: "work" }
    ],
    assignments: [
        { task_id: "1", resource_id: "1", value: "8" },
        {
            task_id: "2",
            resource_id: "1",
            value: "8",
            mode: "fixedDates",
            start_date: "2026-04-20",
            end_date: "2026-04-22",
            duration: 4,
            delay: 2
        },
        {
            task_id: "2",
            resource_id: "1",
            value: "8",
            start_date: new Date("2026-04-20T00:00:00"),
            end_date: new Date("2026-04-23T00:00:00")
        }
    ],
    baselines: [
        {
            id: "b1",
            task_id: 1,
            start_date: "2026-03-28",
            duration: 42,
            end_date: "2026-05-09"
        }
    ]
});
~~~

`data`와 `tasks`은 동일한 작업 배열에 대한 대체 키입니다. 새 코드에서는 `tasks`를 선호합니다.

코드에서 생성된 JavaScript 객체에서 데이터를 로드하는 경우 `Task`, `ResourceAssignment` 및 기타 런타임 객체에 `Date` 필드가 포함될 수 있습니다. 서버와 JSON 형식으로 데이터를 교환할 때 날짜 필드는 문자열이어야 합니다. 날짜 형식(및 선택적 `id`)을 모두 허용하는 관대한 입력 형식은 [`TaskInput`](guides/data-model.md#taskinput)입니다.

### 레거시 호환성 이름

기존 API 문서 및 타입 정의에서는 여전히 여러 호환성 별칭을 사용하고 있습니다.

- `DataToLoad1`, `DataToLoad2`
- `NewTask` - legacy alias of [`TaskInput`](guides/data-model.md#taskinput)
- `NewResourceItem`
- `NewAssignmentItem`

이러한 이름은 하위 호환성을 위해 유지됩니다. 허용되는 형태에 대한 표준 개요는 [데이터 모델](guides/data-model.md) 문서에 있습니다.

### Collections

`collections` 객체를 사용하면 편집기 및 컨트롤에서 사용하는 사용자 지정 목록을 로드할 수 있습니다. 속성 이름은 임의로 지정할 수 있으며, 각 값은 컬렉션 항목의 배열이어야 합니다.

~~~js
gantt.parse({
    tasks: [
        { id: "1", text: "Task #1", priority: 1, start_date: "2026-04-01", duration: 1 },
        { id: "2", text: "Task #2", priority: 2, start_date: "2026-04-02", duration: 1 },
        { id: "3", text: "Task #3", priority: 3, start_date: "2026-04-03", duration: 1 },
        { id: "4", text: "Task #4", priority: 1, start_date: "2026-04-04", duration: 1 }
    ],
    links: [],
    collections: {
        task_priority: [
            { key: 1, label: "High" },
            { key: 2, label: "Normal" },
            { key: 3, label: "Low" }
        ]
    }
});
~~~

### 빈 작업 배열

작업 정보가 포함되지 않은 데이터를 로드하려면 빈 작업 배열을 정의해야 합니다.

~~~js
gantt.parse({
    tasks: [],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
});
~~~

### Related API

- [load](api/method/load.md)

### Related Guides

- [데이터 모델](guides/data-model.md)
- [데이터 로딩](guides/loading.md)
- [지원되는 데이터 형식](guides/supported-data-formats.md)