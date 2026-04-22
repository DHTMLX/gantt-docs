---
sidebar_label: columns
title: columns config
description: "표의 컬럼 구성을 설정합니다"
---

# columns

### Description

@short: 테이블 내 columns 설정

@signature: columns: GridColumn[]

### Example

~~~jsx
// 기본 columns 정의
gantt.config.columns = [
    { name: "text",       label: "작업 이름",  width: "*", tree: true },
    { name: "start_date", label: "시작 시간", align: "center" },
    { name: "duration",   label: "기간",       align: "center" },
    { name: "add",        label: "",           width: 44 }
];

gantt.init("gantt_here");
~~~

### Related samples
- [Progress lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_progress_lightbox.html)

### Details

배열의 각 객체는 단일 열을 나타냅니다. 객체는 다음 속성을 가질 수 있습니다:

- **align?** - (*string*) - 수평 제목 정렬을 설정합니다. 가능한 값: *'left'*, *'center'*, 또는 *'right'*;
- **hide?** - (*boolean*) - 열을 숨기거나 표시합니다 (PRO);
- **label?** - (*string | number | any*) - 열의 제목을 지정합니다;
- **max_width?** - (*number*) - 리사이즈 작업 시 최대 열 너비를 설정합니다;
- **min_width?** - (*number*) - 리사이즈 작업 시 최소 열 너비를 설정합니다;
- **name?** - (*string | number*) - 열의 ID를 정의합니다. 이름이 'add'인 경우 '+' 기호로 열을 추가할 수 있습니다;
- **resize?** - (*boolean*) - 열의 경계를 끌어 열 크기를 조정하는 기능을 활성화합니다( PRO );
- **sort? (task1, task2): number** - (*boolean | string | Function*) - 열 머리글을 클릭한 후 정렬 구성을 설정합니다. 속성이 *false*로 설정되면 정렬이 비활성화됩니다. 또한 *string*으로 다른 작업 속성을 지정하여 열을 정렬하거나 사용자 정의 정렬 함수를 사용할 수 있습니다.
    - **_task1_** - (*Task*) - 정렬될 첫 번째 Task 객체
    - **_task2_** - (*Task*) - 정렬될 두 번째 Task 객체
- **template? (task): any** - 데이터 템플릿을 설정합니다.
    - **_task_** - (*Task*) - Task 객체.
- **tree?** - (*boolean*) - 관련 열에 트리를 표시할지 여부를 나타냅니다;
- **width?** - (*number | string*) - 열의 너비를 정의합니다;
- **onrender? (task, node): any** - 선택적으로, 셀을 DOM에 렌더링하기 위한 콜백 함수입니다. 이 함수는 Task 객체와 그리드 셀의 DOM 요소를 매개변수로 받아 프레임워크의 컴포넌트를 반환할 수 있습니다. 자세한 내용은 여기 참조하십시오;
    - **_task_** - (*Task*) - Task 객체.
    - **_node_** - (*HTMLElement*) - Grid 셀의 HTML 요소.
- **editor?** - (*object*) - 첨부된 inline editor.
    - **_type_** - (*string*) - inline editor의 타입.
    - **_map_to_** - (*string*) - inline editor로 업데이트될 Task의 속성을 지정합니다.
    - **_min?_** - (*Date | number*) - 날짜 및 지속 시간 타입의 최소 값.
    - **_max?_** - (*Date | number*) - 날짜 및 지속 시간 타입의 최대 값.
    - **_options?_** - (*Array &lt;any&gt;*) - 선택형 타입의 옵션 배열.
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - 날짜 및 선행 타입의 포맷터.

그리드 열의 너비는 두 속성에 따라 달라집니다: 열의 **width** 와 [grid_width](api/config/grid_width.md). 열 너비의 합이 그리드의 너비와 같지 않으면, Gantt는 둘 중 하나의 매개변수를 변경합니다.

- [gantt.init()](api/method/init.md) 로 Gantt를 초기화할 때, 열의 **width**가 우선순위입니다.

:::note
 [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)
:::

- [gantt.render()](api/method/render.md) 로 렌더링할 때, [grid_width](api/config/grid_width.md)가 우선순위입니다.

:::note
sample: [Grid width priority over column width during rendering ](https://snippet.dhtmlx.com/4nb67z61)
:::
- [gantt.init()](api/method/init.md) 로 초기화할 때 열의 너비가 명시되지 않았거나 '*'로 설정된 경우, [grid_width](api/config/grid_width.md)가 우선순위입니다. 

:::note
sample: [Grid width priority when column width is undefined or set to '*' at initialization](https://snippet.dhtmlx.com/qej8w5ix)
:::


템플릿 속성은 데이터 아이템 객체를 매개변수로 받아 최종 데이터 템플릿을 반환하는 함수입니다. 함수 정의는 거의 모든 콘텐츠를 표현할 수 있도록 허용합니다.

~~~js
gantt.config.columns = [
    { name: "text",        label: "작업 이름",  tree: true, width: "*" },
    { name: "start_date",  label: "시작 시간", align: "center" },
    { name: "staff",       label: "담당자", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~

### Related Guides
- [Specifying Columns](guides/specifying-columns.md)
- [How-tos](guides/how-to.md#how-to-add-a-custom-column-in-the-grid) (read how to add a custom column in the grid)
- [How-tos](guides/how-to.md#how-to-add-a-custom-add-button) (read how to add a custom add(+) button)

### Change log
- the **onrender** attribute has been added in v7.1