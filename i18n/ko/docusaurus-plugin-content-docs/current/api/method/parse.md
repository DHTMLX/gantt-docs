---
sidebar_label: parse
title: parse 메서드
description: "클라이언트 측 리소스에서 데이터를 로드합니다."
---

# parse

### Description

@short: 클라이언트 측 리소스에서 데이터를 로드합니다.

@signature: parse: (data: string | DataToLoad1 | DataToLoad2, type?: string) =\> void

### Parameters

- `data` - (required) *string | DataToLoad* - 문자열 또는 [data](guides/loading.md#dataproperties)를 나타내는 객체
- `type`	-	(optional) *string*	- (<i>'json', 'xml'</i>) 데이터 타입. 기본값은 <i>'json'</i>

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

Gantt는 *작업 배열*의 이름이 반드시 **data** 또는 **tasks** 중 하나로 지정되고, *링크 배열*의 이름은 **links**로 지정되기를 기대합니다.

다음은 예상되는 속성의 목록입니다:

- **data** - (*[] | NewTask[]*) - 작업 데이터 배열
- **links?** - (*Link[]*) - 링크 데이터 배열
- **resources?** - (*NewResourceItem[]*) - 리소스 데이터 배열
- **assignments?** - (*NewAssignmentItem[]*) - 배정 데이터 배열
- **collections?** - (*Сollections*) - 커스텀 데이터를 담는 배열들을 가지는 객체

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


데이터의 **data** 또는 **tasks** 배열은 **NewTask** 객체를 기대합니다. 이 객체는 **Task** 객체와 다를 수 있습니다. 문자열이나 빈 객체일 수 있습니다. [**Task** 객체](guides/task-properties.md)와 동일한 속성을 가질 수 있으며, 여기에 임의의 커스텀 속성을 추가할 수 있습니다. 차이점은 **Task** 객체의 일부 속성이 *\$* 기호로 시작하는 경우 무시되고 날짜는 문자열 타입으로 허용될 수 있다는 점입니다. 타입 설명은 다음과 같습니다:

- **NewTask** - (*string | {} | object*) - Gantt에 추가될 작업 객체. 아래 속성을 포함할 수 있습니다:
    - **_id?_** - (*string | number*) - 선택적, 작업 ID. 설정되지 않으면 자동 생성됩니다.
    - **_start_date?_** - (*string | Date*) - 선택적, 작업 시작 예정일.
    - **_duration?_** - (*number*) - 선택적, 작업 지속 기간.
    - **_end_date?_** - (*string | Date*) - 선택적, 작업 완료 예정일.
    - **_text?_** - (*string*) - 선택적, 작업 이름.
    - **_open?_** - (*boolean*) - 선택적, 로드 시에 자식 작업을 표시할지 여부.
    - **_parent?_** - (*string | number*) - 선택적, 상위 작업의 ID.
    - **_constraint_date?_** - (*string | Date*) - 선택적, 작업 제약 날짜.
    - **_[customProperty: string]_** - (*any*) - 추가하고 싶은 임의의 속성, [**Task** 객체](guides/task-properties.md)의 속성도 포함 가능

다음은 가능한 작업 속성의 전체 목록이 아닙니다. 자세한 내용은 [이 기사](guides/task-properties.md)를 참조하십시오.

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
    ]
})
~~~


---

**The** **links** 배열은 [**Link** 객체](guides/link-properties.md)를 기대합니다.

~~~js
gantt.parse({
    data: [],
    links: [
        { id: "1", source: "1", target: "2", type: "0" },
    ]
})
~~~

---

다음은 **resources** 배열이 아래 속성들을 가질 수 있는 **NewResourceItem** 객체를 기대합니다:

- **NewResourceItem** - (*object*) - Gantt에 추가될 리소스 아이템 객체. 아래 속성을 가질 수 있습니다:
    - **_id?_** - (*string | number*) - 선택적, 리소스 ID. 설정되지 않으면 자동 생성됩니다
    - **_parent?_** - (*string | number*) - 선택적, 상위 리소스의 ID
    - **_text?_** - (*string*) - 선택적, 리소스 이름
    - **_open?_** - (*boolean*) - 선택적, 로드 시 리소스를 펼칠지 여부
    - **_unit?_** - (*string | number*) - 선택적, 리소스 할당의 단위
    - **_default_value?_** - (*string | number*) - 선택적, 라이트박스 섹션의 배정 기본값
    - **_[customProperty: string]_** - (*any*) - 추가하고 싶은 임의의 속성

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

The **assignments** 배열은 아래 속성들을 가질 수 있는 **NewAssignmentItem** 객체를 기대합니다:

- **NewAssignmentItem** - (*object*) - Gantt에 추가될 배정 아이템 객체. 아래 속성을 가질 수 있습니다:
    - **_id?_** - (*string | number*) - 선택적, 배정 ID. 설정되지 않으면 자동 생성됩니다
    - **_task_id_** - (*string | number*) - 리소스가 배정된 작업의 ID
    - **_resource_id_** - (*string | number*) - 작업에 배정된 리소스의 ID
    - **_value_** - (*number | string*) - 선택적, 배정 값
    - **_mode?_** - (*string*) - 선택적, 리소스 배정 시점의 계산 모드: "default"|"fixedDates"|"fixedDuration"
    - **_delay?_** - (*number*) - 선택적, 배정 시작일과 작업 시작일의 차이
    - **_start_date?_** - (*string | Date*) - 선택적, 배정 시작일
    - **_duration?_** - (*number*) - 선택적, 배정 지속 기간
    - **_end_date?_** - (*string | Date*) - 선택적, 배정 종료일
    - **_[customProperty: string]_** - (*any*) - 추가하고 싶은 임의의 속성

~~~js
gantt.parse({
    data: [],
    assignments: [
      { task_id: "1", resource_id: "1", value: "8" },
    ]
})
~~~

---

The **collections** 객체는 임의의 커스텀 데이터를 로드할 수 있습니다. 속성의 이름은 임의로 지을 수 있으며, 값은 컬렉션 아이템들을 담은 배열이어야 합니다:

- **[collectionName: string]** - (*[] | СollectionItem[]*) - 커스텀 데이터 아이템 배열

The **СollectionItem**은 임의의 속성을 가질 수 있는 객체입니다. 속성의 타입은 아래와 같습니다:

- **[itemProperty: string]** - (*any*) - 커스텀 컬렉션 아이템 속성

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

