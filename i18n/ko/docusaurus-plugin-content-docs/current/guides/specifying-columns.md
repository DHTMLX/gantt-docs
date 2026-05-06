---
title: "컬럼 지정"
sidebar_label: "컬럼 지정"
---

# 컬럼 지정

Grid의 열은 [columns](api/config/columns.md) 매개변수로 구성됩니다. 

![gantt_left](/img/gantt_left.png)

~~~js
// default columns definition
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];
~~~

그리드의 열을 지정하는 방법을 설명하는 비디오 가이드를 확인해 볼 수 있습니다.

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 개요

기본적으로 그리드에는 4개의 열이 있습니다:

1. 작업 이름
2. 시작 날짜
3. 기간 
4. '+' 열. <code>name="add"</code>가 지정된 특별한 열로, '+' 기호를 표시하여 사용자가 작업에 대한 자식을 추가할 수 있도록 합니다.

:::note
참고: 기본 열을 그리드에 표시하려면 [columns](api/config/columns.md) 매개변수를 지정할 필요가 없습니다.
:::

[columns](api/config/columns.md) 매개변수는 각 객체가 하나의 열을 나타내는 배열입니다. 예를 들어 그리드에 5개의 열을 정의하려면: 'Task', 'Start Date', 'End Date', 'Holder', 'Progress'를 정의하고 [columns](api/config/columns.md) 매개변수를 아래와 같이 지정합니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  tree: true, width: "*" },
    { name: "holder",     label: "Holder",     align: "center" },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "end_date",   label: "End date",   align: "center" },
    { name: "progress",   label: "Progress",   align: "center" }
];

gantt.init("gantt_here");
~~~

여기서 'text', 'holder', 'start_date', 'end_date', 'progress'는 [데이터 속성의 이름](guides/specifying-columns.md#datamappingandtemplates)입니다.


## 작업의 종료 날짜 표시

작업 데이터 객체에 시작 날짜와 종료 날짜가 "%Y-%m-%d" 또는 "%d-%m-%Y" 형식으로 포함되어 있는 경우(예: 시·분 부분이 없는 경우), 기본 형식으로 표시된 결과 날짜가 예상과 다를 수 있습니다. 종료 날짜 형식에 대한 자세한 내용은 [작업 종료 날짜 표시 및 포함 종료 날짜](guides/loading.md#taskenddatedisplayampinclusiveenddates) 문서를 참조하세요.


## 특정 작업에 대한 "Add" 버튼 숨기기

특정 작업에 하위 작업을 추가하는 것을 방지하려면 CSS를 통해 'Add' 버튼을 숨기는 가장 쉬운 방법이 있습니다.

먼저 [grid_row_class](api/template/grid_row_class.md) 템플릿을 사용하여 각 작업 행에 CSS 클래스를 지정합니다:

~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
그런 행에 대해 'Add' 버튼을 숨깁니다:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

**관련 샘플**: [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 너비

열의 너비를 설정하려면 관련 열 객체의 속성 [width](api/config/columns.md)을 사용합니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
'*' 값을 사용하면 열이 남은 모든 공간을 차지합니다.
:::

참고로 그리드 열의 너비는 두 속성에 의존합니다: 열의 [width](api/config/columns.md)와 [grid_width](api/config/grid_width.md). 열 너비의 합이 그리드의 너비와 같지 않으면 Gantt가 두 매개변수 중 하나를 조정합니다.

- [gantt.init()](api/method/init.md)로 초기화할 때는 열의 [width](api/config/columns.md)가 우선순위입니다. 

 
**관련 샘플**: [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)

- [gantt.render()](api/method/render.md)로 렌더링할 때는 [grid_width](api/config/grid_width.md)가 우선순위입니다. 

 
**관련 샘플**: [Grid width priority over column width during rendering](https://snippet.dhtmlx.com/4nb67z61)

- [gantt.init()](api/method/init.md)으로 초기화하고 열 너비가 지정되지 않았거나 `'*'`로 설정된 경우에는 [grid_width](api/config/grid_width.md)가 우선합니다. 

**관련 샘플**: [Grid width priority when column width is undefined or set to `'*'` at initialization](https://snippet.dhtmlx.com/qej8w5ix)

### 최소/최대 열 너비

**min_width/max_width** 속성은 리사이즈 작업에서 열 너비를 제한하는 데 사용할 수 있습니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150, max_width: 300 },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
열의 **min_width** 속성은 Gantt의 [min_grid_column_width](api/config/min_grid_column_width.md) 속성보다 우선합니다.
:::

### 리사이징 중 최소 그리드 너비

그리드를 리사이즈할 수 있는 최소 너비는 [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md) 옵션으로 정의됩니다. 이 옵션은 그리드를 리사이즈하는 동안 각 열을 리사이즈할 수 있는 최소 너비를 정의합니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // the grid can be resized to 90 px

gantt.init("gantt_here");
~~~

**관계된 샘플**: [Minimal grid width](https://snippet.dhtmlx.com/zdza8tws)

참고로 리사이징 중 그리드의 최소 너비는 기본값 44인 'add' 열의 최소 너비에도 의존합니다. 그리드를 44px보다 작게 리사이즈하려면 'Add' 열 객체에 [min_width](api/config/columns.md) 옵션을 지정하세요:

~~~js
{ name: "add", label: "", min_width: 1 }
~~~


## 데이터 매핑 및 템플릿 {#datamappingandtemplates}

기본적으로, dhtmlxGantt는 열 이름에 해당하는 데이터 속성으로 그리드를 채웁니다.
예를 들어 열에 **name:"holder"**를 설정하면, dhtmlxGantt는 들어오는 JSON 데이터에서 해당 속성을 찾고, 그러한 속성이 존재하면 그 열에 로드합니다.

#### 열 데이터용 템플릿 사용

하나의 열에 여러 데이터 속성을 혼합해 표시하려면 열의 이름은 임의로 사용할 수 있지만 [columns](api/config/columns.md) 매개변수의 **template** 속성을 통해 데이터 템플릿을 설정합니다.
예를 들어 열에 **name:"staff"**를 지정하고 열에 로드될 *holder*와 *progress* 데이터 속성을 반환하는 템플릿 함수를 정의할 수 있습니다. 

~~~js
gantt.config.columns = [
    { name: "text",        label: "Task name",  tree: true, width: "*" },
    { name: "start_date",  label: "Start time", align: "center" },
    { name: "staff",       label: "Holder(s)", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~


## 텍스트 정렬 

열의 텍스트를 수평으로 정렬하려면 관련 열 객체의 [align](api/config/columns.md) 속성을 사용하세요:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~


## WBS 코드 {#wbscode}

작업의 개요 번호(WBS 코드)를 표시하는 열을 추가할 수 있습니다. 이를 위해 열 템플릿에서 [getWBSCode](api/method/getwbscode.md) 메서드를 사용해야 합니다.

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40,  template: gantt.getWBSCode }, 
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


**관련 샘플**: [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### 작업의 WBS 코드 얻기

[getWBSCode](api/method/getwbscode.md) 메서드는 필요한 작업의 WBS 코드를 반환합니다. 예를 들어 아래와 같은 작업들을 gantt에 불러옵니다:

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project", start_date: "28-03-2025", duration: 5, open: true },
        { id: 2, text: "Task #1", start_date: "01-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Task #2", start_date: "02-04-2025", duration: 4, parent: 1 }
    ],
    links: []
});
~~~

그리고 id="3"인 작업의 WBS 코드를 얻고자 합니다. 이를 위해 작업 객체를 [getWBSCode](api/method/getwbscode.md) 메서드의 매개변수로 전달합니다. 그러면 해당 작업의 WBS 코드 문자열이 반환됩니다:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> returns "1.2"
~~~

### WBS 코드로 작업 얻기

WBS 코드로 [getWBSCode](api/method/gettaskbywbscode.md) 메서드에 작업 객체를 전달하여 얻을 수도 있습니다:

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## 작업의 시간 제약 {#timeconstraintsfortasks}

작업에 대해 시간 제약의 유형을 설정하고 필요한 경우 제약 날짜를 지정할 수 있도록, 별도의 그리드 열을 추가할 수 있습니다. 이 열들은 각각 "constraint_type"과 "constraint_date" 이름을 가집니다. 

~~~js
gantt.config.columns = [
    { name: "constraint_type", align: "center", width: 100, resize: true,
        editor: constraintTypeEditor, template: (task) => { //template logic }
    },
    { name: "constraint_date", align: "center", width: 120, resize: true,
        editor: constraintDateEditor, template: (task) => { //template logic }
    },
    ...
];
~~~

열은 작업에 필요한 제약 유형을 선택하고 그 날짜를 그리드에서 바로 편집할 수 있게 하는 인라인 편집기의 객체에 연결됩니다.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        { key: "snlt", label: gantt.locale.labels.snlt },
        { key: "fnet", label: gantt.locale.labels.fnet },
        { key: "fnlt", label: gantt.locale.labels.fnlt },
        { key: "mso", label: gantt.locale.labels.mso },
        { key: "mfo", label: gantt.locale.labels.mfo }
    ]
};

const constraintDateEditor = {
    type: "date", 
    map_to: "constraint_date", 
    min: new Date(2025, 0, 1), 
    max: new Date(2030, 0, 1)
};
~~~


**관련 샘플**: [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 열 크기 조정 {#resizing}

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

사용자가 열의 오른쪽 경계를 드래그하여 열의 크기를 조정할 수 있도록 하려면 관련 열 객체의 [resize](api/config/columns.md) 속성을 사용하십시오:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 'resize' active
    { name: "start_date", resize: true, min_width: 100 }, // limited by 'min_width'
    { name: "duration",   align: "center" },              // no resize
    { name: "add",        width: "44" }
];
~~~


**관련 샘플**: [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


그리드의 경계를 드래그하여 전체 그리드를 리사이즈하려면 [gantt.config.layout](api/config/layout.md) 옵션을 사용하고 필요한 구성 내에 그리드 및 리사이저 객체를 지정합니다.

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                { view: "grid", id: "grid", scrollX: "scrollHor",
                    scrollY: "scrollVer"
                },
                { resizer: true, width: 1 },
                { view: "timeline", id: "timeline", scrollX: "scrollHor",
                    scrollY: "scrollVer"
                },
                { view: "scrollbar", id: "scrollVer", scroll: "y" }
            ]
        },
        { view: "scrollbar", id: "scrollHor", scroll: "x", height: 20 }
    ]
};

gantt.init("gantt_here");
~~~

리사이징 중 그리드의 크기를 유지하려면 [keep_grid_width](api/config/keep_grid_width.md) 옵션을 *true*로 설정하십시오:

~~~js
gantt.config.columns = [
    { name: "text",       width: "*", tree: true, resize: true },
    { name: "start_date", width: 100, align: "center" },
    { name: "duration",   width: 70, align: "center" },
    { name: "add",        width: 44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");
~~~


**관련 샘플**: [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### 이벤트

dhtmlxGantt는 크기 조정 동작을 처리하기 위한 6개의 이벤트를 제공합니다: 

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - 사용자가 열의 경계를 드래그하여 열을 크기 조정하기 시작하기 전에 발동됩니다
- [onColumnResize](api/event/oncolumnresize.md) - 사용자가 열의 경계를 드래그하여 열을 크기 조정하는 동안 발동됩니다
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - 사용자가 열의 경계를 드래그하여 열을 크기 조정하는 것을 마친 후 발동됩니다
- [onGridResizeStart](api/event/ongridresizestart.md) - 사용자가 그리드 경계를 드래그하여 그리드를 크기 조정하기 시작하기 전에 발동됩니다
- [onGridResize](api/event/ongridresize.md) - 사용자가 그리드 경계를 드래그하여 그리드를 크기 조정하는 동안 발동됩니다
- [onGridResizeEnd](api/event/ongridresizeend.md) - 사용자가 그리드를 크기 조정하는 경계를 드래그하는 것을 마친 후 발동됩니다


## 가시성 {#visibility}

열의 가시성을 제어하려면 관련 열 객체의 [hide](api/config/columns.md) 속성을 사용하십시오.

가시성은 'hide' 속성 값을 변경하고 Gantt 차트를 새로 고침하여 동적으로 토글할 수 있습니다:

~~~jsx title="Switching between basic and detailed view"
gantt.config.columns = [
    { name: "text",          label: "Task name", width: "*", tree: true, resize: true },
    { name: "start_date",    label: "Start time" },
    { name: "duration",      label: "Duration",      width: 60, hide: true }, 
    { name: "planned_start", label: "Planned start", width: 80, hide: true }, 
    { name: "planned_end",   label: "Planned end",   width: 80, hide: true },
    { name: "add",           label: "",              width: 36 }
];

const showDetails = false;

function toggleView() {
    showDetails = !showDetails;
    gantt.getGridColumn("duration").hide = !showDetails;
    gantt.getGridColumn("planned_start").hide = !showDetails;
    gantt.getGridColumn("planned_end").hide = !showDetails;

    if (showDetails) {
        gantt.config.grid_width = 600;
    } else {
        gantt.config.grid_width = 300;
    }

    gantt.render();
};

gantt.init("gantt_here");
~~~


**관련 샘플**: [Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)


그리드에서 열의 가시성을 관리하는 방법을 보여주는 비디오 가이드를 확인해 보세요.

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 렌더링 후 셀 수정 {#modifyingcellsafterrendering}

일부 경우에는 렌더링 후 그리드 셀의 모양이나 동작을 변경해야 할 수 있습니다. 

버전 7.1부터 라이브러리는 렌더링 후 셀을 수정하는 데 도움이 되는 [columns](api/config/columns.md) 매개변수의 **onrender** 속성을 제공합니다. 예를 들면:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: "*", resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration",   align: "center", onrender: (task, node) => {
        node.setAttribute("title", task.text);
    } },
    { name: "add", width: 44 }
];
~~~


또 다른 방법으로는 **onrender** 콜백을 사용하여 그리드 셀에 외부 컴포넌트를 주입하는 것입니다. 예를 들어 React와 함께 DHTMLX Gantt를 사용하고 그리드 셀에 React 컴포넌트를 주입해야 하는 경우 아래 코드 예시는 이를 구현하는 방법을 보여줍니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name", tree: true, width: "*" },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { 
        name: "external", label: "Element 1",  align: "center",
        onrender: (item, node) => {
            return <DemoButton
                text="Edit 1"
                onClick="{()" => alert("Element as React Component")}
            />
        }
    }
];
~~~

작동하고 React 컴포넌트를 표시하려면 [gantt.config.external_render](api/config/external_render.md) 구성이 정의되어 있어야 합니다:

~~~js
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.external_render = { 
    // checks the element is a React element
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // renders the React element into the DOM
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

다음과 같은 로직이 작동합니다:

- 우선, **onrender** 콜백의 반환 객체가 프레임워크/라이브러리에서 렌더링될 수 있는지 확인하기 위해 **isElement** 함수에 전달됩니다.
- 만약 **isElement**가 true를 반환하면 해당 객체가 **renderElement**로 전달되며, 이는 셀의 DOM 요소 안에 컴포넌트 객체를 초기화하는 역할을 합니다.


## 수평 스크롤바

그리드를 스크롤 가능하게 만들려면 레이아웃 구성 옵션의 **scrollable** 속성을 사용할 수 있습니다. 
[레이아웃 뷰를 스크롤바에 바인딩하는 방법 읽기](guides/layout-config.md#scrollbar).

그리드에 수평 스크롤바가 있으면 그리드의 너비를 조정하는 동안 열의 너비를 자동으로 조정할 수 있습니다. 이 기능을 활성화하는 방법에 대해서는 [도움말 읽기](api/config/grid_elastic_columns.md) 문서를 참조하세요. 

scrollable 속성 외에도 레이아웃에 *horizontal scrollbar element*를 추가하고 이를 그리드에 연결해야 합니다:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // adding horizontal scrollbar to the grid via the scrollX attribute
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollable: true, /*!*/
                    scrollY: "scrollVer" /*!*/
                }, /*!*/
                { view: "scrollbar", id: "gridScroll" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

그리드와 타임라인에 대해 별도의 스크롤바를 표시할 수 있기 때문에 두 스크롤바의 가시성을 동기화시켜두 스크롤바가 동시에 보이거나 숨겨지도록 할 수 있습니다. 

다음과 같이 동일한 그룹에 두 스크롤바를 배정하면 됩니다:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollable: true,
                    scrollY: "scrollVer"
                },
                // horizontal scrollbar for the grid
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } 
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // horizontal scrollbar for the timeline
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } 
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

이때 동일 그룹에 배정된 스크롤바 중 하나라도 보이면 그룹의 모든 스크롤바가 보입니다.

**관련 샘플**: [Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## 스타일링

그리드 셀의 스타일링에 대한 정보는 [Work with Gantt Styles](guides/styling-guide.md#styling-grid)를 참조하십시오.