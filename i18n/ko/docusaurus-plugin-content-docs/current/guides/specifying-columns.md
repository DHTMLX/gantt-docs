---
title: "컬럼 지정하기"
sidebar_label: "컬럼 지정하기"
---

# 컬럼 지정하기

그리드 컬럼은 [columns](api/config/columns.md) 파라미터를 사용하여 설정합니다.

![gantt_left](/img/gantt_left.png)

~~~js
// 기본 컬럼 정의
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];
~~~

그리드 컬럼을 설정하는 방법을 다루는 동영상 가이드도 제공됩니다.

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 개요 {#overview}

기본적으로 그리드는 4개의 컬럼을 보여줍니다:

1. Task name
2. Start date
3. Duration 
4. '+' 컬럼. 이 특수 컬럼(<code>name="add"</code>)은 사용자가 하위 작업을 추가할 수 있도록 '+' 기호를 표시합니다.

:::note
참고: 기본 컬럼을 그리드에 표시하려면 [columns](api/config/columns.md) 파라미터를 반드시 지정할 필요는 없습니다.
:::

[columns](api/config/columns.md) 파라미터는 각 객체가 하나의 컬럼을 정의하는 배열입니다.  
예를 들어, 'Task', 'Start Date', 'End Date', 'Holder', 'Progress'라는 5개의 컬럼을 정의하려면 다음과 같이 설정합니다:

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

여기서 'text', 'holder', 'start_date', 'end_date', 'progress'는 [데이터 속성명](guides/specifying-columns.md#datamappingandtemplates)과 일치합니다.

## 작업의 종료일 표시 {#displayingenddateoftasks}

작업 데이터 객체에 시작일과 종료일이 "%Y-%m-%d" 또는 "%d-%m-%Y" (시, 분 없이) 형식으로 포함된 경우, 기본 포맷으로 표시되는 종료일이 예상과 다를 수 있습니다. 종료일 포맷에 대한 자세한 내용은 [작업 종료일 표시 및 종료일 포함](guides/loading.md#taskenddatedisplayampinclusiveenddates) 문서를 참고하세요.

## 특정 작업에서 "Add" 버튼 숨기기 {#hidingtheaddbuttonforcertaintasks}

특정 작업에 하위 작업 추가를 막으려면 CSS를 이용해 'Add' 버튼을 숨길 수 있습니다.

1. 먼저, [grid_row_class](api/template/grid_row_class.md) 템플릿을 사용하여 각 작업 행에 CSS 클래스를 지정합니다:
~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
2. 그런 다음, 해당 행의 'Add' 버튼을 CSS로 숨깁니다:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~


[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 컬럼 너비 설정 {#width}

컬럼의 너비는 해당 컬럼의 설정 객체에서 [width](api/config/columns.md) 속성으로 지정합니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
width에 '*'를 지정하면 해당 컬럼이 남은 모든 공간을 차지합니다.
:::

그리드 컬럼의 너비는 컬럼의 [width](api/config/columns.md)와 전체 [grid_width](api/config/grid_width.md) 두 설정에 따라 달라집니다. 전체 컬럼 너비 합이 그리드 너비와 일치하지 않을 경우, Gantt가 이 값들 중 하나를 조정합니다.

- [gantt.init()](api/method/init.md)로 gantt를 초기화할 때는 컬럼의 [width](api/config/columns.md)가 우선 적용됩니다. 

 

**Related example:** [초기화 시 컬럼 너비 우선](https://snippet.dhtmlx.com/itnvg6z9)

- [gantt.render()](api/method/render.md)로 gantt를 렌더링할 때는 [grid_width](api/config/grid_width.md)가 우선 적용됩니다. 

 

**Related example:** [렌더링 시 그리드 너비 우선](https://snippet.dhtmlx.com/4nb67z61)

- [gantt.init()](api/method/init.md)로 초기화할 때 컬럼 너비가 없거나 **'*'**로 설정된 경우 [grid_width](api/config/grid_width.md)가 우선 적용됩니다. 


**Related example:** [초기화 시 컬럼 너비가 없거나 '*'일 때 그리드 너비 우선](https://snippet.dhtmlx.com/qej8w5ix)


### 컬럼 최소/최대 너비

컬럼 리사이징 시 너비 제한을 위해 **min_width** 및 **max_width** 속성을 사용할 수 있습니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150,
        max_width: 300
    },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
컬럼의 **min_width** 속성은 gantt의 [min_grid_column_width](api/config/min_grid_column_width.md) 설정보다 우선합니다.
:::

### 리사이징 시 최소 그리드 너비

그리드의 최소 리사이즈 너비는 [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md)로 설정할 수 있습니다. 이 옵션은 그리드 리사이즈 시 각 컬럼이 가질 수 있는 최소 너비를 정의합니다:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // 그리드는 최소 90px까지 리사이즈 가능

gantt.init("gantt_here");
~~~


**Related example:** [최소 그리드 너비](https://snippet.dhtmlx.com/zdza8tws)


또한, 리사이즈 시 최소 그리드 너비는 'add' 컬럼의 최소 너비(기본값 44)에 따라 달라집니다. 44px보다 작게 리사이즈하려면 'add' 컬럼에 [min_width](api/config/columns.md)를 다음과 같이 설정하세요:

~~~js
{ name: "add", label: "", min_width: 1 }
~~~

## 데이터 매핑과 템플릿 {#datamappingandtemplates}

기본적으로 dhtmlxGantt는 컬럼 이름과 일치하는 데이터 속성을 사용하여 그리드를 채웁니다. 예를 들어, 컬럼에 **name:"holder"**가 있으면 dhtmlxGantt는 JSON 데이터에서 'holder' 속성을 찾아 해당 컬럼에 표시합니다.

#### 컬럼 데이터에 템플릿 사용

여러 데이터 속성의 조합을 컬럼에 표시하고 싶다면, 컬럼 이름을 임의로 지정하고 [columns](api/config/columns.md) 파라미터의 **template** 속성에 데이터 템플릿을 설정할 수 있습니다.

예를 들어, 컬럼 이름을 **name:"staff"**로 하고, *holder*와 *progress* 속성을 조합하여 반환하는 템플릿 함수를 만들 수 있습니다:

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

## 텍스트 정렬  {#textalignment}

컬럼 내 텍스트를 수평 정렬하려면 해당 컬럼의 설정에서 [align](api/config/columns.md) 속성을 사용하세요:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~

## WBS 코드  {#wbscode}

작업의 개요 번호(WBS 코드)를 표시하는 컬럼을 추가할 수 있습니다. 이를 위해 해당 컬럼의 템플릿에 [getWBSCode](api/method/getwbscode.md) 메서드를 사용하세요.

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40, template: gantt.getWBSCode }, /*!*/
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


[Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### 작업의 WBS 코드 가져오기

[getWBSCode](api/method/getwbscode.md) 메서드는 특정 작업의 WBS 코드를 반환합니다. 예를 들어, 다음과 같이 작업을 gantt에 로드하고:

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

id="3인" 작업의 WBS 코드를 얻으려면 해당 작업 객체를 [getWBSCode](api/method/getwbscode.md)에 전달하면 됩니다. 반환값은 WBS 코드 문자열입니다:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> "1.2" 반환
~~~

### WBS 코드로 작업 가져오기

WBS 코드를 [getTaskByWBSCode](api/method/gettaskbywbscode.md) 메서드에 제공하여 작업 객체를 가져올 수 있습니다:

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~



## 작업의 시간 제약 조건 {#timeconstraintsfortasks}

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

특정 [시간 제약 조건](guides/auto-scheduling.md#timeconstraintsfortasks) 유형과, 선택한 유형에 따라 필요한 경우 제약 날짜를 설정할 수 있는 그리드 컬럼을 추가할 수 있습니다. 이 컬럼들의 이름은 각각 "constraint_type"과 "constraint_date"입니다.

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

이 컬럼들은 인라인 에디터 객체와 연결되어 있어, 작업의 제약 조건 유형을 선택하고 그 날짜를 그리드 내에서 직접 수정할 수 있습니다.

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


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)




## 크기 조정 {#resizing}

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

사용자가 컬럼의 오른쪽 경계를 드래그하여 크기를 조정할 수 있도록 하려면, 해당 컬럼 설정에서 [resize](api/config/columns.md) 속성을 활성화하세요:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 'resize' 활성화
    { name: "start_date", resize: true, min_width: 100 }, // 'min_width'로 제한
    { name: "duration",   align: "center" },              // 크기 조정 비활성화
    { name: "add",        width: "44" }
];
~~~


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


그리드 전체의 크기를 경계를 드래그하여 조정할 수 있도록 하려면, [gantt.config.layout](api/config/layout.md) 옵션을 사용하고 그리드 및 리사이저 객체를 적절히 설정하세요:

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

컬럼 크기를 조정할 때 그리드의 너비를 고정하려면, [keep_grid_width](api/config/keep_grid_width.md) 옵션을 *true*로 설정하세요:

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


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### 이벤트

dhtmlxGantt는 크기 조정과 관련된 6개의 이벤트를 제공합니다:

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - 사용자가 컬럼 경계 드래그를 시작하기 전에 발생
- [onColumnResize](api/event/oncolumnresize.md) - 사용자가 컬럼 경계를 드래그하는 동안 발생
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - 사용자가 컬럼 경계 드래그를 끝낸 후 발생




- [onGridResizeStart](api/event/ongridresizestart.md) - 사용자가 그리드 경계 드래그를 시작하기 전에 발생
- [onGridResize](api/event/ongridresize.md) - 사용자가 그리드 경계를 드래그하는 동안 발생
- [onGridResizeEnd](api/event/ongridresizeend.md) - 사용자가 그리드 경계 드래그를 완료한 후 발생



## 컬럼 가시성 {#visibility}

컬럼의 가시성을 제어하려면 컬럼 설정의 [hide](api/config/columns.md) 속성을 사용하세요.

 
가시성은 'hide' 속성을 동적으로 변경하고 Gantt 차트를 새로 고침하여 조정할 수 있습니다:

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

[기본/상세 보기 전환](기본/상세 보기 전환)
~~~
gantt.config.columns = [
    { name: "text",          label: "Task name", width: "*", tree: true, resize: true },
    { name: "start_date",    label: "Start time" },
    { name: "duration",      label: "Duration",      width: 60, hide: true }, /*!*/
    { name: "planned_start", label: "Planned start", width: 80, hide: true }, /*!*/
    { name: "planned_end",   label: "Planned end",   width: 80, hide: true }, /*!*/
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


[Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)


그리드에서 컬럼 가시성을 관리하는 방법을 보여주는 비디오 가이드도 제공됩니다.

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## 렌더링 후 셀 수정 {#modifyingcellsafterrendering}

때때로 그리드 셀이 렌더링된 후 셀의 모양이나 동작을 조정해야 할 수 있습니다.

버전 7.1부터 라이브러리에는 [columns](api/config/columns.md) 설정에 **onrender** 속성이 포함되어 있어, 예를 들어 셀 렌더링 후 다음과 같이 수정할 수 있습니다:

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




**onrender** 콜백의 또 다른 활용 예는 외부 컴포넌트를 그리드 셀에 삽입하는 것입니다. 예를 들어 DHTMLX Gantt를 React와 함께 사용하면서 그리드 셀에 React 컴포넌트를 삽입하려면 아래와 같이 할 수 있습니다:

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

React 컴포넌트 렌더링을 활성화하려면 [gantt.config.external_render](api/config/external_render.md) 설정을 지정해야 합니다:

~~~js
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.external_render = { 
    // 해당 요소가 React 요소인지 확인
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // React 요소를 DOM에 렌더링
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

처리 과정은 다음과 같습니다:

- **onrender** 콜백에서 반환된 객체는 프레임워크/라이브러리의 렌더링 가능한 객체인지 확인하기 위해 **isElement** 함수로 전달됩니다.
- **isElement**가 *true*를 반환하면, 해당 객체는 **renderElement**로 전달되어 셀의 DOM 엘리먼트 내부에 컴포넌트가 초기화됩니다.



## 수평 스크롤바 {#horizontalscrollbar}

그리드를 스크롤 가능하게 하려면 [layout](guides/layout-config.md) 설정에서 **scrollable** 속성을 활성화하면 됩니다. 
[레이아웃 뷰를 스크롤바에 바인딩하는 방법 자세히 알아보기](guides/layout-config.md#scrollbar).

그리드에 수평 스크롤바를 추가하면 Gantt가 그리드 크기 조정 시 컬럼 너비를 자동으로 조정할 수 있습니다. [이 기능 활성화에 대한 자세한 내용](api/config/grid_elastic_columns.md).

**scrollable** 속성 외에도, 레이아웃에 *수평 스크롤바 요소*를 추가하고 그리드에 연결해야 합니다:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // scrollX 속성을 통해 그리드에 수평 스크롤바 추가
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

그리드와 타임라인에 별도의 스크롤바를 사용하는 경우, 두 스크롤바의 가시성을 동기화하면 둘 다 동시에 나타나거나 숨겨집니다.

![scrollable_grid](/img/scrollable_grid.png)

이를 위해 두 스크롤바를 같은 *visibility group*에 할당할 수 있습니다:

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
                // 그리드용 수평 스크롤바
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // 타임라인용 수평 스크롤바
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } /*!*/
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

그룹 내 스크롤바 중 하나라도 보이면, 해당 그룹의 모든 스크롤바가 표시됩니다.


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)



## 스타일링 {#styling}

그리드 셀 스타일링에 대한 자세한 내용은 [Gantt 스타일 작업하기](guides/styling-guide.md#stylinggrid)를 참고하세요.

