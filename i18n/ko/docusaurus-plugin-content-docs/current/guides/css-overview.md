---
title: "CSS 문서"
sidebar_label: "CSS 문서"
---

# CSS 문서

이 문서는 Gantt 차트 요소의 기본 색상 설정을 사용자가 정의한 색상으로 재정의하는 방법을 보여줍니다. 본 문서는 Gantt의 주요 클래스 선택자와 스타일링에 사용되는 템플릿을 다루며, 다음 부분들을 커스텀 색상으로 스타일링하는 방법을 다룹니다: [Grid 영역](guides/css-overview.md#styling-grid), [Timeline 영역](guides/css-overview.md#styling-timeline), [Resource 패널](guides/css-overview.md#resource-panel).

## Grid 스타일링

이 섹션에서는 [grid 영역](guides/table.md)의 주요 요소를 스타일링하기 위한 CSS 선택자를 찾을 수 있습니다.

![grid_area](/img/grid_area.png)

다음은 그리드 DOM 요소의 전반적인 구조를 보여줍니다:

~~~js
- .gantt_grid
    - .gantt_grid_scale
        - .gantt_grid_head_cell
    - .gantt_grid_data
        - .gantt_row.odd
        - .gantt_row
        - .gantt_row.gantt_row_task
        - .gantt_row.gantt_row_project
        - .gantt_row.gantt_row_milestone
            - gantt_cell.gantt_cell_tree
                - .gantt_tree_indent
                - .gantt_tree_icon.gantt_close
                - .gantt_tree_icon.gantt_open
                - .gantt_tree_content
            - gantt_cell
                - .gantt_tree_content
~~~

### Grid 헤더

`.gantt_grid_scale` 클래스 선택자를 통해 Grid 헤더 요소의 스타일을 변경할 수 있습니다.

다음은 Grid와 Timeline의 헤더에 공통 배경색과 글자 색상을 적용하는 예시입니다:

~~~css
.gantt_grid_scale, .gantt_task_scale, .gantt_task_vscroll {
    background-color: #eee;
}
.gantt_grid_scale, .gantt_task_scale,
.gantt_task .gantt_task_scale .gantt_scale_cell,
.gantt_grid_scale .gantt_grid_head_cell {
    color: #000;
    font-size: 12px;
    border-bottom: 1px solid #cecece;
}
~~~

![grid_header](/img/grid_header.png)

**관련 샘플**: [Styling grid and timeline headers](https://snippet.dhtmlx.com/akr9tz4h)

### Scale 높이 {#scale_height}

그리드 헤더와 시간 축의 높이를 CSS로 변경하지 마십시오.

스케일의 높이는 Gantt의 [scale_height](api/config/scale_height.md) 구성 속성을 통해 설정되어야 합니다:

~~~js
gantt.config.scale_height = 50;
~~~

### 그리드 헤더의 셀 {#grid_header_cell}

그리드 헤더의 셀에 대해 커스텀 스타일을 `.gantt_grid_head_cell`로 적용할 수 있습니다.

셀을 스타일링하기 위한 선택자는 아래와 같습니다:

- `.gantt_grid_head_cell[data-column-id="columnName"]` - 특정 열의 셀을 선택합니다;

**columnName**은 [열](guides/specifying-columns.md)의 **name** 속성 값과 일치합니다:

~~~css
<style>
    .gantt_grid_head_cell[data-column-id="columnName"] {
        background-color: #ededed;
        color: black;
    }
</style>
~~~

~~~js
gantt.config.columns = [
    ...
    { name: "columnName", align: "center" },
    ...
];
~~~

![header_cell](/img/header_cell.png)

**관련 샘플**: [Styling a particular cell in the grid header](https://snippet.dhtmlx.com/pf5q56kl)

- `.gantt_grid_head_cell[data-column-index="1"]` - 특정 열을 인덱스로 선택합니다;

- `.gantt_grid_head_cell[data-column-name="start_date"]` - 이름으로 특정 열을 선택합니다.

### Grid 본문

CSS 스타일을 `.gantt_grid_data` 선택자에 적용하여 Grid 본문 요소에 커스텀 색상을 추가할 수 있습니다.

![grid_body](/img/grid_body.png)

### Grid 행 스타일링 {#styling_grid_rows}

그리드 행의 스타일은 `.gantt_row`를 통해 수정됩니다.

![grid_row](/img/grid_row.png)

#### 홀수/짝수 행

그리드의 홀수 행을 색상화하려면 `.gantt_row.odd` 선택자에 CSS 스타일을 지정해야 합니다. 예를 들면:

~~~css
.gantt_row.odd {
    background-color: #f4f4fb;
}
~~~

![odd_row_style](/img/odd_row_style.png)

**관련 샘플**: [Styling every other row in grid](https://snippet.dhtmlx.com/ayr3sgov)

짝수 행이 화면에 강조 표시되고 홀수 행에는 적용되지 않는 것을 확인할 수 있습니다. 그러나 [행 인덱스](api/method/gettaskindex.md)를 확인하면 홀수 인덱스(1, 3, 5 등)에 스타일이 적용된다는 것을 알 수 있습니다.

#### 선택된 행

그리드에서 선택된 행은 `.gantt_row.gantt_selected` 선택자를 통해 스타일링할 수 있습니다:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
~~~

**관련 샘플**: [Styling selected row](https://snippet.dhtmlx.com/c177qsgx)

#### 작업 행, 프로젝트 행, 마일스톤 행

작업, 프로젝트 또는 마일스톤의 행을 스타일링하려면 다음 선택기를 사용합니다:

- `.gantt_row.gantt_row_task`
- `.gantt_row.gantt_row_project`
- `.gantt_row.gantt_row_milestone`

예:

~~~css
.gantt_row.gantt_row_project {
    background-color: #fafafa;
    font-weight: bold;
}
~~~

**관련 샘플**: [Styling rows of project tasks](https://snippet.dhtmlx.com/g5oxrq5v)

#### 특정 행

특정 행에 커스텀 클래스를 추가하려면 아래와 같이 [grid_row_class] 템플릿을 적용합니다:

~~~css
<style>
    .highlighted_task.gantt_row {
        background-color: #ff9668;
        border-color: rgba(0,0,0,0.3);
    }
</style>
~~~

~~~js {3}
gantt.templates.grid_row_class = (startDate, endDate, task) => {
    if (task.highlight) {
        return "highlighted_task";
    }
    return "";
};
~~~

**관련 샘플**: [Styling a particular row in the grid](https://snippet.dhtmlx.com/9o8pbq8z)

#### 행 높이

행 높이는 구성 설정인 [row_height](api/config/row_height.md)로 변경할 수 있습니다:

~~~js
gantt.config.row_height = 40;
~~~

또는 작업의 [row_height](guides/resizing-rows.md#setting-the-row-height) 속성으로도 설정할 수 있습니다:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2028", duration: 8, row_height: 40 },
~~~

CSS로 행 높이를 변경하려고 시도하면 레이아웃이 깨지므로 피하십시오.

### Grid의 셀/열 스타일링 {#styling_grid_cells}

그리드의 셀이나 열은 `.gantt_row .gantt_cell`를 통해 스타일링할 수 있습니다.

특정 열을 두 가지 방식으로 스타일링할 수 있습니다:

- 열의 이름으로 열을 정의하는 `.gantt_row .gantt_cell[data-column-name="columnName"]` 선택자를 사용하여 스타일링합니다. 예:

~~~css
.gantt_grid_head_cell[data-column-id="start_date"],
.gantt_row .gantt_cell[data-column-name="start_date"] {
    background-color: #ededed;
    color: black;
}
~~~

**관련 샘플**: [Styling a column in grid](https://snippet.dhtmlx.com/hq5q2hpz)

참고로 `.gantt_grid_head_cell`와 `.gantt_cell`은 서로 다른 데이터 속성(`data-column-id`와 `data-column-name`)을 사용합니다. Gantt의 이 불일치는 향후 버전에서 CSS 규칙으로 수정될 예정입니다.

- 또는 동일한 결과를 얻기 위해 `.gantt_row .gantt_cell[data-column-index="1"]` 선택자를 사용할 수도 있습니다.

## Timeline 스타일링

"Styling Timeline" 섹션은 [타임라인 영역](guides/time-scale.md) 요소들의 기본 스타일을 변경하는 데 적용할 수 있는 CSS 선택자들을 안내합니다.

![timeline](/img/timeline.png)

타임라인 영역의 DOM 요소의 전반적인 구조는 아래와 같습니다:

~~~js
- .gantt_task
    - .gantt_task_scale
        - .gantt_scale_line
            - .gantt_scale_cell
    - .gantt_data_area
        - .gantt_task_bg
            - .gantt_task_row
            - .gantt_task_row.odd
                - .gantt_task_cell
        - .gantt_links_area
            - .gantt_task_link
        - .gantt_bars_area
            - .gantt_task_line
                - .gantt_task_progress_wrapper
                    - .gantt_task_progress
                - .gantt_task_progress_drag
                - .gantt_task_content
                - .gantt_task_drag.task_start_date
                - .gantt_task_drag.task_end_date
                - .gantt_link_control.task_start_date
                - .gantt_link_control.task_end_date
                    - .gantt_link_point
        - div - custom layers
~~~

### 타임 스케일

타임 스케일의 DOM 요소 구조는 다음과 같습니다:

~~~js
- .gantt_task_scale
    - .gantt_scale_line
        - .gantt_scale_cell
~~~

### Time scale 컨테이너 {#time_scale_container}

`.gantt_task_scale` 선택자는 시간 축 컨테이너에 커스텀 CSS를 적용하는 데 사용됩니다.

예를 들어 시간 축의 글자 색상과 경계를 바꾸면 아래와 같습니다:

~~~css
.gantt_grid_scale, .gantt_task_scale {
    border-bottom: 1px solid #0e0e0e;
}

.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #000;
}

.gantt_grid_scale .gantt_grid_head_cell {
    color: #000;
}
~~~

**관련 샘플**: [Styling text and borders of the time scale](https://snippet.dhtmlx.com/qt0ttw64)

### Time scales {#time_scales}

`.gantt_scale_line` 선택자는 전체 시간 축의 색상을 지정하는 데 사용됩니다. 순서별 특정 시간 축을 대상으로 하려면 `.gantt_scale_line:nth-child(n)` 선택자를 사용하면 됩니다.

다음은 시간 축의 배경색을 설정하는 예시입니다:

~~~css
.gantt_scale_line:nth-child(1) {
    font-weight: bold;
    background-color: #eee;
}

.gantt_scale_line:nth-child(2) {
    background-color: #fff;
}
~~~

**관련 샘플**: [Background color of the time scale](https://snippet.dhtmlx.com/jl1k7kxr)

기본적으로 단위별로 시간 축을 타겟팅하는 CSS 클래스가 제공되지는 않지만, [scale_row_class](api/template/scale_row_class.md) 템플릿을 사용하여 이러한 클래스를 추가할 수 있습니다.

다음은 **month**, **week**, **day** 스케일에 서로 다른 스타일을 적용하는 예시입니다:

~~~css
<style>
    .gantt_scale_line.month_scale {
        font-weight: bold;
        background-color: #ddd;
    }

    .gantt_scale_line.week_scale {
        background-color: #e1e1e1;
    }

    .gantt_scale_line.day_scale {
        background-color: #efefef;
    }
</style>
~~~

~~~js
gantt.templates.scale_row_class = (scaleConfig) => `${scaleConfig.unit}_scale`;
~~~

**관련 샘플**: [Styling different time scales](https://snippet.dhtmlx.com/g6ogfvvb)

### Time scale 셀 {#timescale_cells}

시간 축의 셀에 커스텀 스타일을 추가하려면 `.gantt_scale_cell` 선택자를 사용합니다.
예를 들어 셀의 글자 색상과 경계선을 변경할 수 있습니다:

~~~css
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #a6a6a6;
    border-right: 1px solid #ebebeb;
}
~~~

**관련 샘플**: [Styling text and borders of the scale cells](https://snippet.dhtmlx.com/dcfo1yek)

시간 축의 특정 날짜를 색상으로 표시하려면, [gantt.config.scales](api/config/scales.md) 객체의 **css** 속성을 사용합니다. 아래 예시와 같이 설정합니다:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, format: "%Y %M" },
    { unit: "day", step: 1, format: "%l, %F %d", css: (date) => {
        if (!gantt.isWorkTime({ date: date, unit: "day" })) {
            return "weekend";
        }
        return "";
    } }
];
~~~

~~~css
<style>
    .gantt_scale_cell.weekend {
        background-color: #F5F5F5;
    }
</style>
~~~

**관련 샘플**: [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

필요 시 시간 축의 전체 열을 색칠하려면 아래와 같이 설명된대로 **timeline_cell_class** 템플릿을 사용합니다.

### 데이터 영역 {#data_area}

데이터 영역의 DOM 요소 구조는 아래와 같습니다:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
    - .gantt_links_area
        - .gantt_task_link
    - .gantt_bars_area
        - .gantt_task_line
            - .gantt_task_progress_wrapper
                - .gantt_task_progress
            - .gantt_task_progress_drag
            - .gantt_task_content
            - .gantt_task_drag.task_start_date
            - .gantt_task_drag.task_end_date
            - .gantt_link_control.task_start_date
            - .gantt_link_control.task_end_date
                - .gantt_link_point
    - div - custom layers
~~~

### Task {#task}

#### Task 바

작업 바의 모양을 바꾸려면 `.gantt_task_line` 선택자에 커스텀 스타일을 선언해야 합니다.

가장자 리 스타일을 변경하는 예시는 아래와 같습니다:

~~~css
.gantt_task_line {
    border-radius: 14px;
}
~~~

**관련 샘플**: [Styling borders of the task bars](https://snippet.dhtmlx.com/c24kdh89)

작업 바의 색상을 변경하려면 다음 두 가지 단계를 수행합니다:

1. 작업 바에 적용된 커스텀 색상과 일치하도록 경계선과 진행 바의 스타일을 재정의합니다:

~~~css
.gantt_task_line {
    border-color: rgba(0, 0, 0, 0.25); /* Black color with 25% alpha/opacity */
}

.gantt_task_line .gantt_task_progress {
    background-color: rgba(0, 0, 0, 0.25);
}
~~~

2. 작업 바와 바 안의 콘텐츠에 필요한 색상을 적용합니다:

~~~css
.gantt_task_line {
    background-color: #03A9F4;
}

.gantt_task_line.gantt_task_content {
    color: #fff;
}
~~~

다양한 색상으로 경계선과 진행 바를 적용하는 일반적인 예시는 [Task Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate) 문서의 예제를 참조하십시오.

특정 작업 바에 색상을 적용하려면 [gantt.templates.task_class](api/template/task_class.md) 템플릿을 사용하여 해당 작업에 커스텀 클래스를 할당해야 합니다:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.highlight) {
        return "highlighted_task";
    }
    return "";
};
~~~

그리고 이 커스텀 클래스를 셀렉터에서 사용합니다:

~~~css
.highlighted_task.gantt_task_line {
    background-color: #ff9668;
    border-color: rgba(0,0,0,0.3);
}

.highlighted_task .gantt_task_progress {
    text-align: center;
    z-index: 0;
    background: rgba(0,0,0,0.3);
}
~~~

**관련 샘플**: [Styling particular task bars](https://snippet.dhtmlx.com/yyoe31vo)

#### Task 바 내 영역 강조

작업 바 내부의 특정 영역을 강조하려면, [gantt.templates.task_text](api/template/task_text.md) 템플릿을 사용해 바에 추가 요소를 주입해야 합니다:

~~~js
gantt.templates.task_text = (startDate, endDate, task) => `
    <div class="custom_progress warm_up" style="width: 20%"></div>
    <div class="custom_progress in_progress" style="width: 60%">${task.text}</div>
    <div class="custom_progress cool_down" style="width: 20%"></div>
`;
~~~

그리고 CSS를 적용합니다:

~~~css
.custom_progress {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    height: 100%;
}

.custom_progress.nearly_done {
    background-color: #4CC259;
}

.custom_progress.in_progress {
    background-color: #88BFF5;
}

.custom_progress.idle {
    background-color: #d96c49;
}
~~~

**관련 샘플**: [Custom html content (Stackbar)](https://docs.dhtmlx.com/gantt/samples/04_customization/09_html_content.html)

### Link {#link}

링크의 DOM 요소 구조는 아래와 같습니다:

~~~js
- .gantt_task_link
    - .gantt_line_wrapper
    - .gantt_link_line_right
    - .gantt_link_line_left
    - .gantt_link_line_up
    - .gantt_link_line_down
- .gantt_link_arrow.gantt_link_arrow_right
- .gantt_link_arrow.gantt_link_arrow_left
~~~

다음은 의존성 링크의 요소들을 색상화하는 예시입니다:

~~~css
.gantt_line_wrapper div {
    background-color: #ffa011;
}
.gantt_link_arrow_right {
    border-left-color: #ffa011;
}
.gantt_link_arrow_left {
    border-right-color: #ffa011;
}
.gantt_task_link:hover .gantt_line_wrapper div {
    box-shadow: 0 0 5px 0 #ffa011;
}
~~~

**관련 샘플**: [Styling links](https://snippet.dhtmlx.com/unlr4jbw)

링크 선의 두께는 [gantt.config.link_line_width](api/config/link_line_width.md) 설정으로 제어합니다.

### Resizer {#resizer}

다음 선택자를 사용하여 Resizer의 DOM 요소를 스타일링할 수 있습니다:

- `.gantt_task_drag`
- `.gantt_task_drag.task_start_date`
- `.gantt_task_drag.task_end_date`

시작일 Resizer를 비활성화하는 예시는 아래와 같습니다:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_start_date {
    display: none;
}
~~~

**관련 샘플**: [Disabling resizer of the start date](https://snippet.dhtmlx.com/x8lpcu2d)

종료일 Resizer를 비활성화하는 예시는 아래와 같습니다:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_end_date {
    display: none;
}
~~~

**관련 샘플**: [Disabling resizer of the end date](https://snippet.dhtmlx.com/9gtsg4s8)

### Link 제어 {#link_control}

시작(종료) 시점의 원형 핸들 요소에 스타일을 적용하기 위해 사용할 수 있는 선택자들:

- `.gantt_link_control .gantt_link_point`
- `.gantt_link_control.task_start_date .gantt_link_point`
- `.gantt_link_control.task_end_date .gantt_link_point`

### Background grid {#background_grid}

Backgrond grid의 DOM 요소 구조는 아래와 같습니다:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
~~~

#### Background 행들

배경 행의 기본 스타일 설정을 변경하려면 `.gantt_task_row` 선택자에 맞춰 스타일을 추가합니다. 예를 들면:

~~~css
.gantt_row,
.gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

홀수 배경 행에 색상을 적용하려면 `.gantt_task_row.odd` 선택자에 CSS를 정의합니다.

선택된 행의 색상을 지정하는 예시는 다음과 같습니다:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
.gantt_task_row.gantt_selected .gantt_task_cell {
    border-right-color: #ffec6e;
}
~~~

**관련 샘플**: [Styling selected row](https://snippet.dhtmlx.com/y393xnmv)

#### Background 셀

배경 셀의 기본 스타일 설정을 변경하려면 `.gantt_task_cell` 선택자에 커스텀 스타일을 지정합니다.

배경 열을 색상으로 표시하려면 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿을 사용합니다:

~~~js
gantt.templates.timeline_cell_class = (task, date) => {
    if (!gantt.isWorkTime({ date: date, unit: "day", task: task })) {
        return "weekend";
    }
    return "";
};
~~~

그리고 CSS를 적용합니다:

~~~css
.gantt_task_cell.weekend {
    background-color: #F5F5F5;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
    background-color: #F8EC9C;
}
~~~

**관련 샘플**: [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

## Resource 패널

[Resource 패널](guides/resource-management.md#resourceviewpanel)은 메인 그랜트 영역과 유사한 그리드와 타임라인으로 구성됩니다.

기본적으로, 리소스 뷰의 그리드와 타임라인은 전역 템플릿과 구성(config)을 사용합니다. 레이아웃 설정에 이를 전달하여 리소스 패널에 대해 다른 구성 및 템플릿을 사용할 수 있습니다( [layout config](guides/layout-config.md#configs-and-templates-of-views) 참조).

적절한 뷰 이름을 CSS 선택자에 사용하여 리소스 그리드와 타임라인을 타깃팅할 수 있습니다:

~~~css
.resourceGrid_cell .gantt_row,
.resourceHistogram_cell .gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

리소스 패널의 DOM 요소의 전반적인 구조는 아래와 같습니다:

~~~js
- .gantt_layout_root
    - .grid_cell
    - .timeline_cell
    - .resourceGrid_cell
    - .resourceHistogram_cell
    - .resourceTimeline_cell
~~~

`.gantt_layout_root` 아래의 클래스 이름은 레이아웃 설정에서 가져오며, 레이아웃 셀의 **view** 속성 값과 일치합니다:

~~~js {6,14,16}
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                { view: "grid", group: "grids", scrollY: "scrollVer" },
                ...
            ]
        },
        ...
        {
            id: "resources",
            cols: [
                { view: "resourceGrid", group: "grids", scrollY: "resourceVScroll" },
                ...
                { view: "resourceHistogram", capacity: 24, scrollX: "scrollHor",
                    scrollY: "resourceVScroll" },
                ...
            ]
        },
        ...
    ]
};
~~~

### Resource 그리드 {#resource_grid}

![resource_grid](/img/resource_grid.png)

작업 그리드와 동일한 선택자를 사용할 수 있습니다. 최상위 선택자는 `.resourceGrid_cell`입니다:

~~~css
.resourceGrid_cell .gantt_row,
.resourceGrid_cell .gantt_row.odd {
    background-color: rgba(232, 232, 232, 0.6);
}
~~~

### Resource 히스토그램 {#resource_histogram}

![resource_histogram_css](/img/resource_histogram_css.png)

Resource 히스토그램은 메인 타임라인과 동일한 요소를 가집니다. 기본적으로 메인 타임라인을 타깃팅하는 모든 선택자는 레이아웃 셀 클래스(`.timeline_cell`, `.resourceHistogram_cell`)를 선택자에 사용하지 않는 한 리소스 타임라인에도 적용됩니다. 

리소스 히스토그램을 타깃팅하는 선택자는 다음과 같습니다: `.resourceHistogram_cell`.

리소스 히스토그램의 DOM 요소 구조는 아래와 같습니다:

~~~js
- .gantt_task_bg
- .gantt_bars_area
    - div
        - .gantt_histogram_fill
        - .gantt_histogram_cell
    - div
        - .gantt_histogram_hor_bar
        - .gantt_histogram_vert_bar
~~~

다음은 히스토그램 요소의 색상을 바꾸는 예시입니다:

~~~css
.gantt_histogram_cell {
    color: #000;
}

.gantt_histogram_label {
    font-weight: 700;
    font-size: 13px;
}

.gantt_histogram_fill {
    background-color: rgba(41,157,180,.2);
}
~~~

특정 셀의 색상을 바꾸려면 [gantt.templates.histogram_cell_class](api/template/histogram_cell_class.md) 템플릿을 사용합니다:

~~~js
gantt.templates.histogram_cell_class = (startDate, endDate, resource, resourceTasks) => {
    if (getAllocatedValue(resourceTasks, resource) > getCapacity(startDate, resource)) {
        return "column_overload";
    }
};
~~~

그리고 CSS를 적용합니다:

~~~css
.column_overload .gantt_histogram_fill {
    background-color: #ffa9a9;
}
~~~

히스토그램 선의 색상을 바꾸려면 아래 클래스 선택자에 커스텀 CSS를 적용합니다:

- `.gantt_histogram_hor_bar`
- `.gantt_histogram_vert_bar`

히스토그램 선의 색상을 바꾸는 예시는 아래와 같습니다:

~~~css
.gantt_histogram_hor_bar, .gantt_histogram_vert_bar {
    background: #299db4;
}
~~~

### Resource 다이어그램 {#resource_diagram}

![resource_diagram](/img/resource_diagram.png)

Resource 다이어그램은 메인 타임라인과 동일한 요소를 가집니다. 기본적으로 타깃팅하는 모든 선택자는 리소스 타임라인에도 적용됩니다. 레이아웃 셀 클래스(`.timeline_cell`, `.resourceTimeline_cell`)를 선택자에 사용하면 됩니다.

다음 선택자를 사용하여 리소스 다이어그램의 라벨 스타일링을 할 수 있습니다:

~~~css
.gantt_resource_marker div {
    background: #51c185;
    width: 28px;
    height: 28px;
    line-height: 29px;
    display: inline-block;
    color: #FFF;
    margin: 3px;
}
~~~

특정 마커의 스타일을 바꾸려면 [gantt.templates.resource_cell_class](api/template/resource_cell_class.md) 템플릿을 사용합니다:

~~~css
<style>
    .resource_marker.workday_over div {
        border-radius: 3px;
        background: #ff8686;
    }
~~~

~~~js
gantt.templates.resource_cell_class = (startDate, endDate, resource, resourceTasks) => {
    const cssClasses = [];
    cssClasses.push("resource_marker");
    if (resourceTasks.length <= 1) {
        cssClasses.push("workday_ok");
    } else {
        cssClasses.push("workday_over");
    }
    return cssClasses.join(" ");
};
~~~

**관련 샘플**: [Styling resource markers](https://snippet.dhtmlx.com/yyoe31vo)