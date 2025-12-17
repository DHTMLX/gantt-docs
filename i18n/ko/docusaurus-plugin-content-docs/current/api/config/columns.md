---
sidebar_label: columns
title: columns config
description: "테이블 내 columns 설정"
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

배열의 각 항목은 하나의 column을 정의합니다. 객체는 다음 속성을 포함할 수 있습니다:

- **align?** - (*string*) - column 헤더의 수평 정렬을 제어합니다. 옵션은 *'left'*, *'center'*, 또는 *'right'* 입니다;
- **hide?** - (*boolean*) - column의 표시 여부를 토글합니다 (PRO);
- **label?** - (*string | number | any*) - column 헤더의 제목을 설정합니다;
- **max_width?** - (*number*) - 크기 조정 시 column의 최대 너비를 제한합니다;
- **min_width?** - (*number*) - 크기 조정 시 column의 최소 너비를 설정합니다;
- **name?** - (*string | number*) - column을 식별합니다. 'add'를 사용하면 '+' 버튼이 있는 column을 생성합니다;
- **resize?** - (*boolean*) - 경계를 드래그하여 column 크기 조정을 허용합니다 (PRO);
- **sort? (task1, task2): number** - (*boolean | string | Function*) - column 헤더 클릭 시 정렬 동작을 설정합니다. *false*로 설정하면 정렬이 비활성화됩니다. 문자열로 task 속성을 지정하거나 사용자 정의 정렬 함수를 제공할 수 있습니다.
    - **_task1_** - (*Task*) - 정렬 대상 첫 번째 작업 객체.
    - **_task2_** - (*Task*) - 정렬 대상 두 번째 작업 객체.
- **template? (task): any** - column 데이터에 대한 템플릿을 정의합니다.
    - **_task_** - (*Task*) - Task 객체.
- **tree?** - (*boolean*) - 트리 구조를 표시할 column임을 표시합니다;
- **width?** - (*number | string*) - column 너비를 설정합니다;
- **onrender? (task, node): any** - 셀 렌더링을 커스터마이징하는 선택적 콜백입니다. task 객체와 셀의 DOM 요소를 전달받으며, 프레임워크 컴포넌트를 반환할 수 있습니다. 자세한 내용은 [여기](guides/specifying-columns.md#modifyingcellsafterrendering)를 참고하세요;
    - **_task_** - (*Task*) - Task 객체.
    - **_node_** - (*HTMLElement*) - 그리드 셀의 HTML 요소.
- **editor?** - (*object*) - 인라인 에디터 설정.
    - **_type_** - (*string*) - 에디터 유형.
    - **_map_to_** - (*string*) - 에디터가 업데이트할 task 속성.
    - **_min?_** - (*Date | number*) - 날짜 및 기간 에디터의 최소값.
    - **_max?_** - (*Date | number*) - 날짜 및 기간 에디터의 최대값.
    - **_options?_** - (*Array &lt;any&gt;*) - select 에디터용 옵션 배열.
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - 날짜 및 선행 작업 에디터용 포매터.

<br>

그리드 columns의 전체 너비는 각 column의 **width** 속성과 [grid_width](api/config/grid_width.md) 모두에 따라 결정됩니다. 이 두 너비가 일치하지 않으면 Gantt가 하나를 조정합니다.

- [gantt.init()](api/method/init.md)로 gantt를 초기화할 때는 column의 **width**가 우선합니다. <br>
:::note

**Related example:** [초기화 시 column 너비가 grid 너비보다 우선](https://snippet.dhtmlx.com/itnvg6z9)

:::
- [gantt.render()](api/method/render.md)로 gantt를 렌더링할 때는 [grid_width](api/config/grid_width.md)가 우선합니다. <br>
:::note

**Related example:** [렌더링 시 grid 너비가 column 너비보다 우선](https://snippet.dhtmlx.com/4nb67z61)

:::
- [gantt.init()](api/method/init.md)로 초기화할 때 column 너비가 없거나 **'*'**로 설정된 경우 [grid_width](api/config/grid_width.md)가 우선합니다. <br>
:::note

**Related example:** [초기화 시 column 너비가 정의되지 않았거나 '*'인 경우 grid 너비가 우선](https://snippet.dhtmlx.com/qej8w5ix)

:::

<br>

**template** 속성은 데이터 항목을 받아 표시할 내용을 반환하는 함수입니다. 이를 통해 column 내용의 유연한 커스터마이징이 가능합니다.

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
- [컬럼 지정하기](guides/specifying-columns.md)
- [How-tos](guides/how-to.md#howtoaddacustomcolumninthegrid) (그리드에 커스텀 column 추가 방법)
- [How-tos](guides/how-to.md#howtoaddacustomaddbutton) (커스텀 add(+) 버튼 추가 방법)

### Change log
- **onrender** 속성은 v7.1에 도입되었습니다

