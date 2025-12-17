---
sidebar_label: parse
title: parse method
description: "클라이언트 측 리소스에서 데이터를 로드합니다"
---

# parse

### Description

@short: 클라이언트 측 리소스에서 데이터를 로드합니다

@signature: parse: (data: string | DataToLoad1 | DataToLoad2, type?: string) =\> void

### Parameters

- `data` - (required) *string | DataToLoad* -     문자열 또는 [데이터](https://docs.dhtmlx.com/gantt/desktop__loading.html#dataproperties)를 나타내는 객체
- `type` - (optional) *string* - 선택 사항, (<i>'json', 'xml'</i>) 데이터 타입 지정. 기본값은 <i>'json'</i>

### Example

~~~jsx
gantt.parse({
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2023", duration:18},
        {id:2, text:"Task #1",    start_date:"02-04-2023", duration:8,
            progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2023", duration:8,
            progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Details

Gantt는 tasks 배열이 **data** 또는 **tasks**로 명명되어야 하며, 링크 배열은 **links**로 명명되어야 합니다.

데이터 구조는 다음과 같습니다:

- **data** - (*[] | NewTask[]*) - 작업 데이터가 포함된 배열
- **links?** - (*Link[]*) - 링크 데이터가 포함된 배열
- **resources?** - (*NewResourceItem[]*) - 리소스 데이터가 포함된 배열
- **assignments?** - (*NewAssignmentItem[]*) - 할당 데이터가 포함된 배열
- **collections?** - (*Сollections*) - 사용자 정의 데이터를 담는 배열을 포함하는 객체

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
        { id: 2, start_date: "2025-12-02", duration: 60, 
            text: "House Construction" },
    ],
    "links": [
        { id: "1", source: "1", target: "2", type: "0" },
    ],
    "resources": [
        { id: 1, text: "Anna, Architect", unit: "hours/day", 
            default_value: 8, type: "work" },
    ],
    "assignments": [
      { task_id: "1", resource_id: "1", value: "8" },
      { task_id: "2", resource_id: "1", value: "8", 
            mode: "fixedDates", start_date: "2025-09-23", 
            end_date: "2025-09-25", duration: 4, delay: 2,  },
      { task_id: "2", resource_id: "1", value: "8", 
            start_date: new Date("2025-09-23 00:00:00"), 
            end_date: new Date("2025-09-26 00:00:00"), },
    ]
})
~~~

**data** 또는 **tasks** 배열은 **NewTask** 객체들을 포함해야 하며, 이는 **Task** 객체와 다릅니다. NewTask는 문자열이나 빈 객체일 수 있습니다. 이 객체들은 [**Task** 객체](guides/task-properties.md)와 동일한 속성을 가질 수 있으며, 사용자 정의 속성도 추가할 수 있습니다. **Task** 객체와 달리 *$*로 시작하는 속성은 무시되며, 날짜는 문자열일 수 있습니다.

속성 설명:

- **NewTask** - (*string | {} | object*) - Gantt에 추가되는 작업 객체. 가능한 속성:
    - **_id?_** - (*string | number*) - 선택 사항, 작업 ID, 없으면 자동 생성됨
    - **_start_date?_** - (*string | Date*) - 선택 사항, 작업 시작일
    - **_duration?_** - (*number*) - 선택 사항, 작업 기간
    - **_end_date?_** - (*string | Date*) - 선택 사항, 작업 종료일
    - **_text?_** - (*string*) - 선택 사항, 작업 이름
    - **_open?_** - (*boolean*) - 선택 사항, 로드 시 작업이 확장되어 있는지 여부
    - **_parent?_** - (*string | number*) - 선택 사항, 상위 작업 ID
    - **_constraint_date?_** - (*string | Date*) - 선택 사항, 제약 날짜
    - **_[customProperty: string]_** - (*any*) - 기타 모든 속성, [**Task** 객체](guides/task-properties.md)의 속성 포함

전체 작업 속성 목록은 [이 문서](guides/task-properties.md)를 참고하세요.

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
    ]
})
~~~

---

**links** 배열은 [**Link** 객체](guides/link-properties.md)를 포함해야 합니다.

~~~js
gantt.parse({
    data: [],
    links: [
        { id: "1", source: "1", target: "2", type: "0" },
    ]
})
~~~

---

**resources** 배열은 **NewResourceItem** 객체들을 포함해야 하며, 주요 속성은 다음과 같습니다:

- **NewResourceItem** - (*object*) - Gantt에 추가되는 리소스 항목. 포함할 수 있는 속성:
    - **_id?_** - (*string | number*) - 선택 사항, 리소스 ID, 없으면 자동 생성됨
    - **_parent?_** - (*string | number*) - 선택 사항, 상위 리소스 ID
    - **_text?_** - (*string*) - 선택 사항, 리소스 이름
    - **_open?_** - (*boolean*) - 선택 사항, 로드 시 리소스가 확장되어 있는지 여부
    - **_unit?_** - (*string | number*) - 선택 사항, 리소스 할당 단위
    - **_default_value?_** - (*string | number*) - 선택 사항, 라이트박스에 표시되는 기본 할당 값
    - **_[customProperty: string]_** - (*any*) - 기타 모든 속성

~~~js
gantt.parse({
    data: [],
    resources: [
        { id: 1, text: "Anna, Architect", unit: "hours/day", 
            default_value: 8, type: "work" },
    ]
})
~~~

---

**assignments** 배열은 **NewAssignmentItem** 객체들을 포함해야 하며, 주요 속성은 다음과 같습니다:

- **NewAssignmentItem** - (*object*) - Gantt에 추가되는 할당 항목. 포함할 수 있는 속성:
    - **_id?_** - (*string | number*) - 선택 사항, 할당 ID, 없으면 자동 생성됨
    - **_task_id_** - (*string | number*) - 할당된 작업 ID
    - **_resource_id_** - (*string | number*) - 할당된 리소스 ID
    - **_value_** - (*number | string*) - 선택 사항, 할당 값
    - **_mode?_** - (*string*) - 선택 사항, 계산 모드: "default"|"fixedDates"|"fixedDuration"
    - **_delay?_** - (*number*) - 선택 사항, 할당 시작과 작업 시작 간 차이
    - **_start_date?_** - (*string | Date*) - 선택 사항, 할당 시작일
    - **_duration?_** - (*number*) - 선택 사항, 할당 기간
    - **_end_date?_** - (*string | Date*) - 선택 사항, 할당 종료일
    - **_[customProperty: string]_** - (*any*) - 기타 모든 사용자 정의 속성

~~~js
gantt.parse({
    data: [],
    assignments: [
      { task_id: "1", resource_id: "1", value: "8" },
    ]
})
~~~

---

**collections** 객체는 사용자 정의 데이터를 로드할 때 사용됩니다. 속성 이름은 자유롭고, 값은 컬렉션 아이템을 담은 배열입니다:

- **[collectionName: string]** - (*[] | СollectionItem[]*) - 컬렉션 아이템 배열

각 **СollectionItem**은 임의의 속성을 가진 객체입니다:

- **[itemProperty: string]** - (*any*) - 임의의 사용자 정의 속성

~~~js
gantt.parse({
    data: [
        { "id": "1", "text": "Task #1", "priority": 1, 
            "start_date": "02-04-2019", "duration": 1, },
        { "id": "2", "text": "Task #2", "priority": 2,  
            "start_date": "01-04-2019", "duration": 1, },
        { "id": "3", "text": "Task #3", "priority": 3,  
            "start_date": "02-04-2019", "duration": 1, },
        { "id": "4", "text": "Task #4", "priority": 1,  
            "start_date": "03-04-2019", "duration": 1, },
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

---

만약 데이터에 작업이 포함되어 있지 않다면, 빈 tasks 배열이라도 정의해야 합니다:

~~~js
gantt.parse({
    tasks:[],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

<br>
v8.0부터는 **parse()** 메서드를 사용해 작업과 링크뿐 아니라 리소스 및 리소스 할당도 함께 로드할 수 있습니다:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2024 00:00",
                    end_date: "05-04-2024 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

자세한 내용은 [여기](guides/resource-management.md#loadingresourcesandresourceassignments)에서 확인할 수 있습니다.

### Related API
- [load](api/method/load.md)

### Related Guides
- [데이터 로딩](guides/loading.md)
- [지원되는 데이터 형식](guides/supported-data-formats.md)
- [지원되는 데이터 형식](guides/supported-data-formats.md#jsonwithcollections) (JSON with Collections 로드 방법 참고)

