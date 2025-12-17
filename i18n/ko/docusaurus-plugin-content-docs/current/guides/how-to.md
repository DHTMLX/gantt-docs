---
title: "How-tos"
sidebar_label: "How-tos"
---

How-tos
==================================

## 그리드/차트 토글하는 방법 {#howtotogglegridchart}

기본 레이아웃 구성을 사용할 때, 그리드 또는 차트 토글은 [show_grid](api/config/show_grid.md) 또는 [show_chart](api/config/show_chart.md) 파라미터를 변경한 후 [render()](api/method/render.md) 메서드를 호출하여 화면을 갱신하면 됩니다.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~


**Related example:** [Gantt. Toggle grid (default layout)](https://snippet.dhtmlx.com/gnloz505)


~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~


**Related example:** [Gantt. Toggle timeline (default layout)](https://snippet.dhtmlx.com/kqe1hqp2)

 
커스텀 레이아웃 구성을 사용하는 경우, 그리드 또는 타임라인이 있는 레이아웃과 없는 레이아웃을 각각 만들어야 합니다. 이들 간의 전환은 [gantt.config.layout](api/config/layout.md) 파라미터를 변경하고 [init()](api/method/init.md) 메서드로 다시 초기화하여 적용합니다:

~~~js
let showGrid = true;
function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // 그리드와 타임라인이 있는 레이아웃
    }
    else {
        gantt.config.layout = onlyChart; // 타임라인만 있는 레이아웃

    }
    gantt.init("gantt_here");
}
~~~


**Related example:** [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x)


~~~js
let showChart = true;
function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // 그리드와 타임라인이 있는 레이아웃
    }
    else {
        gantt.config.layout = onlyGrid; // 그리드만 있는 레이아웃

    }
    gantt.init("gantt_here");
}
~~~


**Related example:** [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)


## 리소스 뷰 토글하는 방법 {#howtotoggletheresourceview}

그리드나 타임라인 뷰 토글과 유사하게, 리소스 뷰가 포함된 레이아웃과 포함되지 않은 레이아웃을 각각 준비해야 합니다. 이들 간 전환은 [gantt.config.layout](api/config/layout.md) 파라미터를 변경하고 [init()](api/method/init.md) 메서드를 호출하여 반영합니다:

~~~js
let resourceChart = true;

function layoutChange() {
    resourceChart = !resourceChart;
    if (resourceChart) {
        gantt.config.layout = resourceLayout;
    }
    else {
        gantt.config.layout = noresourceLayout;
    }
    gantt.init("gantt_here");
};
~~~


**Related example:** [Gantt. Toggle resource load diagram](https://snippet.dhtmlx.com/vbaczl07)


~~~js
let histogramView = true;

function layoutChange() {
    histogramView = !histogramView;
    if (histogramView) {
        gantt.config.layout = histogramLayout;
    }
    else {
        gantt.config.layout = simpleLayout;
    }
    gantt.init("gantt_here");
};
~~~


**Related example:** [Gantt. Toggle resource histogram](https://snippet.dhtmlx.com/isn2ger4)


또 다른 방법으로, 레이아웃 뷰를 동적으로 생성하고 Gantt를 다시 초기화하여 화면을 갱신할 수도 있습니다:


**Related example:** [Gantt. Generate layout](https://snippet.dhtmlx.com/3dnzfhit)


## 타임라인에서 무한 스크롤 구현 방법 {#howtohaveaninfinitescrollinthetimeline}

무한 스크롤은 여러 방식으로 구현할 수 있지만, 일반적으로 [gantt.config.start_date](api/config/start_date.md) 및 [gantt.config.end_date](api/config/end_date.md) 파라미터를 조정하여 표시되는 날짜 범위를 확장합니다.

### 스크롤바 사용 시

[스크롤 위치](api/event/onganttscroll.md)를 추적하여 사용자가 가장자리 근처로 스크롤할 때 날짜 범위를 확장할 수 있습니다. 성능 저하를 방지하기 위해, Gantt 차트의 리렌더링은 타임아웃을 두고 실행하는 것이 좋습니다:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.attachEvent("onGanttScroll", function (left, top) {
    const left_date = gantt.dateFromPos(left)
    const right_date = gantt.dateFromPos(left + gantt.$task.offsetWidth)

    gantt.config.start_date = gantt.config.start_date || gantt.getState().min_date;
    gantt.config.end_date = gantt.config.end_date || gantt.getState().max_date;

    const min_allowed_date = gantt.date.add(gantt.config.start_date, 1, "day");
    const max_allowed_date = gantt.date.add(gantt.config.end_date, -2, "day");

    let repaint = false;
    if (+left_date <= +min_allowed_date) {
        gantt.config.start_date = gantt.date.add(gantt.config.start_date, -2, "day");
        repaint = true;
    }
    if (+right_date >= +max_allowed_date) {
        gantt.config.end_date = gantt.date.add(gantt.config.end_date, 2, "day");
        repaint = true;
    }

    if (repaint) {
        setTimeout(function () {
            gantt.render()
            gantt.showDate(left_date)
        }, 20)
    }
});
~~~


**Related example:** [Gantt. Infinite scroll while using scrollbar](https://snippet.dhtmlx.com/4u52p5g3)


### 타임라인 드래그 시

타임라인을 드래그하는 동안 현재 스크롤 위치를 감지하여, 시작 또는 끝 근처로 이동하면 날짜 범위를 확장할 수 있습니다:

~~~js
gantt.attachEvent("onMouseMove", function (id, e) {
  if (!gantt.getState().drag_id && e.buttons == 1) {
    const left_date = gantt.dateFromPos(gantt.getScrollState().x);
    const right_date = gantt.dateFromPos(
      gantt.getScrollState().x + gantt.$task.offsetWidth - 1
    );
    if (left_date && +left_date <= +gantt.config.start_date) {
      gantt.config.start_date = gantt.date.add(gantt.config.start_date, -1, 'day');
      gantt.render();
    }
    if (right_date && +gantt.config.end_date < +gantt.date.add(right_date, 1, 'day')) {
      gantt.config.end_date = gantt.date.add(gantt.config.end_date, 1, 'day');
      gantt.render();
    }
  }
});
~~~


**Related example:** [Gantt. Infinite scroll while dragging the timeline](https://snippet.dhtmlx.com/zqob7lz5)


### 태스크 드래그 시

날짜 범위를 명시적으로 설정하지 않은 경우, 태스크가 타임라인 가장자리 근처로 드래그될 때마다 [render()](api/method/render.md) 호출을 통해 표시 범위를 유지할 수 있습니다:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (task.start_date <= gantt.getState().min_date ||
        task.end_date >= gantt.getState().max_date) {
        gantt.render()
    }
});
~~~


**Related example:** [Gantt. Infinite scroll while dragging a task (default range settings)](https://snippet.dhtmlx.com/44qcunjc)


[날짜 범위](api/config/start_date.md)를 명시적으로 지정한 경우, 태스크가 가장자리 근처로 이동할 때 범위를 업데이트해야 합니다:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.config.start_date = new Date(2025, 02, 28)
gantt.config.end_date = new Date(2025, 03, 10)
gantt.render();

gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (+task.start_date <= +gantt.config.start_date) {
        gantt.config.start_date = gantt.date.add(
            gantt.config.start_date, -1, gantt.config.duration_unit
        );
        gantt.render()
    }
    if (+task.end_date >= +gantt.config.end_date) {
        gantt.config.end_date = gantt.date.add(
            gantt.config.end_date, 1, gantt.config.duration_unit
        );
        gantt.render()
    }
});
~~~


**Related example:** [Gantt. Infinite scroll while dragging a task (explicit range settings)](https://snippet.dhtmlx.com/3lrm0wyp)


## 태스크를 동적으로 불러오는 방법 {#howtoloadtasksdynamically}

[onGanttScroll](api/event/onganttscroll.md) 이벤트를 통해 스크롤이 마지막으로 표시되는 태스크에 도달했는지 감지하여, [parse()](api/method/parse.md) 메서드로 추가 태스크를 동적으로 불러올 수 있습니다:

~~~js
gantt.attachEvent("onGanttScroll", function (left, top) {
    const visibleTasks = gantt.getVisibleTaskCount();
    const lastVisibleTask = gantt.getTaskByIndex(visibleTasks - 1)

    if (gantt.getTaskRowNode(lastVisibleTask.id)) {
        const tasks = load_tasks()
        gantt.parse(tasks);
    }
});
~~~


**Related example:** [Gantt. Load data dynamically](https://snippet.dhtmlx.com/39l7o0rm)


## 버튼으로 모든 태스크 확장/축소하기 {#howtoexpandcollapsealltaskswithabutton}

[open()](api/method/open.md) 및 [close()](api/method/close.md) 메서드는 개별 태스크를 확장 또는 축소하는 데 사용됩니다. 모든 태스크에 적용하려면 [eachTask()](api/method/eachtask.md) 함수와 함께 사용하면 효과적입니다. 이 연산을 [batchUpdate()](api/method/batchupdate.md)로 감싸면 차트가 한 번만 리페인팅됩니다:

~~~js
function collapseAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.close(task.id)
        })
    })
}

function expandAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.open(task.id)
        })
    })
}
~~~


**Related example:** [Gantt. Add collapse/expand buttons into Gantt header](https://snippet.dhtmlx.com/z7o5qt9s)



**Related example:** [Gantt. Collapse/expand all tasks](https://snippet.dhtmlx.com/72zahagy)


## 그리드 셀/헤더에 여러 줄 표시하는 방법 {#howtodisplayseverallinesinthegridcellheader}

그리드 헤더나 셀에 여러 줄의 텍스트를 표시하려면 CSS 스타일을 적용하면 됩니다.

그리드 헤더의 경우:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~


**Related example:** [Gantt. Multiline text in the grid header](https://snippet.dhtmlx.com/lx70v5hw)


그리드 셀의 경우:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~


**Related example:** [Gantt. Multiline text in Grid cells and Timeline](https://snippet.dhtmlx.com/55uy7ibo)



**Related example:** [Gantt. Multiline text in cells of a Grid column](https://snippet.dhtmlx.com/bwil9sxs)


## 그리드에 커스텀 컬럼 추가 방법 {#howtoaddacustomcolumninthegrid}

커스텀 컬럼을 추가하려면 [gantt.config.columns](api/config/columns.md) 파라미터를 수정합니다. **name** 속성을 지정하면 해당 태스크 속성값이 표시됩니다. 또는 [template()](guides/specifying-columns.md#datamappingandtemplates) 함수를 사용해 커스텀 데이터나 HTML 요소를 반환할 수 있습니다.

~~~js
gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    other columns
    */
];
~~~


**Related example:** [Gantt. Custom column with template for task progress](https://snippet.dhtmlx.com/t5ba0gzu)



**Related example:** [Gantt. Custom column with template for action buttons](https://snippet.dhtmlx.com/gfsdp121)


## 커스텀 추가(+) 버튼 만들기 {#howtoaddacustomaddbutton}

커스텀 추가 버튼은 [gantt.config.columns](api/config/columns.md) 파라미터를 통해 커스텀 컬럼을 정의하여 만들 수 있습니다. 컬럼 name은 *add*가 아니어야 하며, [template](guides/specifying-columns.md#datamappingandtemplates) 함수 내에서 버튼 등 HTML을 반환하고 클릭 이벤트로 태스크 추가를 처리할 수 있습니다.

~~~js
gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~


**Related example:** [Gantt. Custom columns with templates for add (+) buttons](https://snippet.dhtmlx.com/o36jnko3)


## 커스텀 스케일 추가 방법 {#howtoaddacustomscale}

커스텀 스케일을 추가하려면, 먼저 [커스텀 스케일 단위](guides/configuring-time-scale.md#customtimeunits)를 생성하고 날짜 계산 로직을 구현해야 합니다.

아래는 근무 교대 시간(06:30, 18:30)을 나타내는 커스텀 스케일 예시입니다:

~~~js
gantt.date.custom_scale_start = function (date) {
    return date;
};

gantt.date.add_custom_scale = function (date, inc) {
    let next = new Date(date)
    if (!next.getMinutes()) {
        gantt.date.day_start(next)
        next = gantt.date.add(next, 6, "hour");
        next = gantt.date.add(next, 30, "minute");
    }
    else {
        next = gantt.date.add(next, 12 * inc, "hour");
    }
    return next
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d" },
    { unit: "custom_scale", step: 1, date: "%H:%i" },
];
~~~


**Related example:** [Gantt. Custom work shift hours on the scale](https://snippet.dhtmlx.com/0l49yvp2)


다음은 일(day) 대신 숫자를 사용하는 커스텀 스케일 예시입니다:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~


**Related example:** [Gantt. Numbers of days on the scale](https://snippet.dhtmlx.com/06bp4wdl)


다음 예시는 5일 근무 주에 대한 커스텀 스케일을 보여줍니다:

~~~js
const weekScaleTemplate = function (date) {
    const dateToStr = gantt.date.date_to_str("%d");
    const endDate = gantt.date.add(gantt.date.add(date, 5, "day"), -1, "day");
    return dateToStr(date) + " - " + dateToStr(endDate);
};

gantt.date.five_days_start = function (date) {
    return date;
};

gantt.date.add_five_days = function (date, inc) {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return gantt.date.add(date, 1 * inc, "day");
    }
    gantt.date.week_start(date);
    return gantt.date.add(date, 5 * inc, "day");
};


gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "five_days", step: 1, format: weekScaleTemplate },
];

gantt.ignore_time = function (date) {
    return date.getDay() == 0 || date.getDay() == 6;
};
~~~


**Related example:** [5-day work weeks on the scale](https://snippet.dhtmlx.com/eq70o558)


아래는 연도의 첫날부터 주 번호가 시작되는 연간 주 단위 커스텀 스케일 예시입니다:

~~~js
gantt.date.custom_week_start = function (date) {
    return date;
};

gantt.date.add_custom_week = function (date, inc) {
    const year_start = new Date(date);
    gantt.date.year_start(year_start);
    const week_number = Math.round(gantt.calculateDuration(year_start, date) / 7);

    const next_week = gantt.date.add(year_start, week_number + 1, "week");
    if (next_week.getYear() != date.getYear()) {
        gantt.date.year_start(next_week)
    }
    return next_week;
};


const custom_week_template = function (date) {
    const year_start = gantt.date.year_start(new Date(date));
    const week_number = Math.round(gantt.calculateDuration(year_start, date) / 7) + 1;

    return "Week:" + week_number
}

gantt.config.scales = [
    { unit: 'custom_week', step: 1, template: custom_week_template },
    { unit: 'day', step: 1, format: "%d, %M" },
];
~~~


**Related example:** [Gantt. Weeks of the year on the scale](https://snippet.dhtmlx.com/gbowxpmr)


## 작업 복사 및 붙여넣기 방법 {#howtocopyandpastetasks}

[copy()](api/method/copy.md) 메서드를 사용하면 작업 객체의 깊은 복사본을 만들 수 있습니다. 복사 후에는 복제된 작업에 새로운 ID를 할당하고 [addTask()](api/method/addtask.md) 또는 [createTask()](api/method/createtask.md) 메서드로 추가할 수 있습니다.

아래는 작업을 복제하는 버튼을 추가하는 예시입니다:

~~~js
function clone_task(id) {
    const task = gantt.getTask(id);
    const clone = gantt.copy(task);
    clone.id = +(new Date());
    gantt.addTask(clone, clone.parent, clone.$index)
}

gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "clone", label: "clone", width: 44, template: function (task) {
            return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
        }
    }
];
~~~


**Related example:** [Gantt. Clone a task](https://snippet.dhtmlx.com/ii9u6wbe)


다음 예시는 작업과 모든 하위 작업 및 링크를 함께 복제하는 방법을 보여줍니다:

~~~js
let child_links;
let clone_original_ids_table;

function obtain_link_ids(id) {
  const task = gantt.getTask(id);
  const source_links = task.$source;
  for (let i = 0; i < source_links.length; i++) {
    child_links.push(source_links[i]);
  }
}

function create_clone_original_ids_table(original_id, clone_id) {
  clone_original_ids_table[original_id] = clone_id;
}

function clone_child_links() {
 for (let i = 0; i < child_links.length; i++) {
  const link = gantt.getLink(child_links[i]);
  if (clone_original_ids_table[link.source] && clone_original_ids_table[link.target]){
    const clone_link = {};
    clone_link.id = gantt.uid();
    clone_link.target = clone_original_ids_table[link.target];
    clone_link.source = clone_original_ids_table[link.source];
    clone_link.type = link.type;
    gantt.addLink(clone_link)
  }
 }
}

function clone_children(id, new_parent) {
  const children = gantt.getChildren(id)
  for (let i = 0; i < children.length; i++) {
    const child_original = gantt.getTask(children[i]);
    const child_clone = gantt.copy(child_original);
    child_clone.id = gantt.uid();
    child_clone.parent = new_parent;
    gantt.addTask(child_clone, child_clone.parent, child_clone.$index);

    obtain_link_ids(child_original.id);
    create_clone_original_ids_table(child_original.id, child_clone.id);

    if (gantt.hasChild(child_original.id)) clone_children(
      child_original.id, child_clone.id
    );
  }
}

function clone_task(id) {
  const task = gantt.getTask(id);
  const clone = gantt.copy(task);
  clone.id = gantt.uid();
  gantt.addTask(clone, clone.parent, clone.$index);

  child_links = [];
  obtain_link_ids(id);

  clone_original_ids_table = {};
  create_clone_original_ids_table(task.id, clone.id);

  if (gantt.hasChild(id)) {
    clone_children(id, clone.id)
  }

  clone_child_links()
}

gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.config.columns = [
  /*
  other columns
  */
  {
    name: "clone", label: "clone", width: 44, template: function (task) {
      return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
    }
  }
];
~~~


**Related example:** [Gantt. Clone a task with all its subtasks and links](https://snippet.dhtmlx.com/b33jfmws)


또 다른 예시로, 키보드 단축키를 통해 복사 기능을 구현할 수 있습니다. 작업을 선택한 후 *Ctrl + C*로 복사하고, *Ctrl + V*로 선택한 작업의 하위로 붙여넣을 수 있습니다:

~~~js
gantt.plugins({
    keyboard_navigation: true,
    multiselect: true,
})

let tasks_to_copy = [];

gantt.ext.keyboardNavigation.addShortcut("ctrl+c", function (e) {
    tasks_to_copy = [];
    gantt.eachSelectedTask(function (task_id) {
        tasks_to_copy.push(task_id);
    });
}, "taskRow");
gantt.ext.keyboardNavigation.addShortcut("ctrl+v", function (e) {
    const new_parent = gantt.getSelectedId();
    for (let i = 0; i < tasks_to_copy.length; i++) {
        const task = gantt.copy(gantt.getTask(tasks_to_copy[i]));
        task.id = +new Date() + '+' + Math.floor(Math.random() * 10);
        gantt.addTask(task, new_parent)
    }
    gantt.getTask(new_parent).$open = true;
    gantt.render()
}, "taskRow");
~~~


**Related example:** [Gantt. Copy and paste tasks via Ctrl+C, Ctrl+V](https://snippet.dhtmlx.com/kck3pnmh)


## 내보낸 PDF 파일에 리소스 차트 또는 커스텀 스타일 추가 방법 {#howtoaddresourcechartorcustomstylesintheexportedpdffile}

내보낸 PDF에 커스텀 스타일이나 리소스 차트를 포함하려면, [raw](guides/export.md#exportingcustommarkupandstyles) 모드로 데이터를 내보내고, export 함수의 [header](guides/export.md#customstylefortheoutputfile) 또는 [footer](guides/export.md#customstylefortheoutputfile) 파라미터에 스타일을 추가하세요.

예를 들어, 커스텀 스타일을 변수에 저장한 뒤, [header](guides/export.md#customstylefortheoutputfile) 파라미터에 해당 변수를 포함할 수 있습니다:

~~~js
const header = `
    .gantt_bar_task {
        background: orange;
    }

    .gantt_task_progress {
        background-color: rgba(33, 33, 33, 0.17);
    }
`

gantt.exportToPDF({
       header: "<style>" + header + "</style>"
});
~~~


**Related example:** [Gantt. Export Gantt to PDF (styles from a variable)](https://snippet.dhtmlx.com/51ds6zwa)


또는, 페이지 내 &lt;style&gt; 요소의 내용을 가져와 아래와 같이 추가할 수도 있습니다:

~~~js
gantt.exportToPDF({
    raw: true,
    header: "<style>" + document.getElementById("styles").innerHTML + "</style>"
});

<style id='styles'>
    .gantt_bar_task {
        background: orange;
    }

    .gantt_task_progress {
        background-color: rgba(33, 33, 33, 0.17);
    }
</style>
~~~


**Related example:** [Gantt. Export Gantt to PDF (styles from &lt;style&gt; element)](https://snippet.dhtmlx.com/6qwzclr2)



**Related example:** [Gantt. Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/2lqhkfhh)


아래는 범례(legend)가 포함된 간트 차트 내보내기 예시입니다:


**Related example:** [Gantt. Export Gantt with legend to PDF](https://snippet.dhtmlx.com/gz4ddlnl)


리소스 로드 다이어그램 및 히스토그램 내보내기 예시:


**Related example:** [Gantt. Export Gantt with resource load diagram to PDF](https://snippet.dhtmlx.com/lw5xcm31)



**Related example:** [Gantt. Export Gantt with resource histogram to PDF](https://snippet.dhtmlx.com/i9me4oxl)



## 하위 작업에 따라 작업 진행률 계산하기 {#howtocalculatetaskprogressdependingonchildtasks}

가장 간단한 방법 중 하나는 하위 작업이 변경될 때마다 상위 작업의 진행률을 업데이트하는 것입니다. 상위 작업을 반복하려면 [eachParent()](api/method/eachparent.md) 메서드를 사용할 수 있습니다.

아래 예제에서는 상위 작업의 진행률이 오직 하위 작업의 진행률만을 기준으로 계산됩니다:

~~~js
gantt.config.auto_types = true;

gantt.templates.progress_text = function (start, end, task) {
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) 
          + "% </span>";
};

gantt.init("gantt_here");
gantt.parse({
    "data": [
        ...
    ]
});

gantt.attachEvent("onAfterTaskUpdate", function (id, task) {
    parentProgress(id)
});
gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (mode == "progress") {
        parentProgress(id)
    }
});
gantt.attachEvent("onAfterTaskAdd", function (id) {
    parentProgress(id)
});
gantt.attachEvent("onAfterTaskDelete", function (id, task) {
    if (task.parent) {
        const siblings = gantt.getChildren(task.parent);
        if (siblings.length) {
            parentProgress(siblings[0])
        }
    }
});

function parentProgress(id) {
    gantt.eachParent(function (task) {
        const children = gantt.getChildren(task.id);
        let childProgress = 0;
        for (let i = 0; i < children.length; i++) {
            const child = gantt.getTask(children[i])
            childProgress += (child.progress * 100);
        }
        task.progress = childProgress / children.length / 100;
    }, id)
    gantt.render();
}
~~~


**Related example:** [Gantt. Calculate progress of a parent task dynamically](https://snippet.dhtmlx.com/xuicd1q7)


다음 예제에서는 상위 작업의 진행률이 하위 작업의 진행률과 기간을 모두 고려하여 계산됩니다:

~~~js
function calculateSummaryProgress(task) {
    if (task.type != gantt.config.types.project)
        return task.progress;
    var totalToDo = 0;
    var totalDone = 0;
    gantt.eachTask(function (child) {
        if (child.type != gantt.config.types.project) {
            totalToDo += child.duration;
            totalDone += (child.progress || 0) * child.duration;
        }
    }, task.id);
    if (!totalToDo) return 0;
    else return totalDone / totalToDo;
}

function refreshSummaryProgress(id, submit) {
    if (!gantt.isTaskExists(id))
        return;

    var task = gantt.getTask(id);
    var newProgress = calculateSummaryProgress(task);
    
    if (newProgress !== task.progress) {
        task.progress = newProgress;

        if (!submit) {
            gantt.refreshTask(id);
        } else {
            gantt.updateTask(id);
        }
    }

    if (!submit && gantt.getParent(id) !== gantt.config.root_id) {
        refreshSummaryProgress(gantt.getParent(id), submit);
    }
}


gantt.attachEvent("onParse", function () {
    gantt.eachTask(function (task) {
        task.progress = calculateSummaryProgress(task);
    });
});

gantt.attachEvent("onAfterTaskUpdate", function (id) {
    refreshSummaryProgress(gantt.getParent(id), true);
});

gantt.attachEvent("onTaskDrag", function (id) {
    refreshSummaryProgress(gantt.getParent(id), false);
});
gantt.attachEvent("onAfterTaskAdd", function (id) {
    refreshSummaryProgress(gantt.getParent(id), true);
});


(function () {
    var idParentBeforeDeleteTask = 0;
    gantt.attachEvent("onBeforeTaskDelete", function (id) {
        idParentBeforeDeleteTask = gantt.getParent(id);
    });
    gantt.attachEvent("onAfterTaskDelete", function () {
        refreshSummaryProgress(idParentBeforeDeleteTask, true);
    });
})();

...

gantt.config.auto_types = true;

gantt.templates.progress_text = function (start, end, task) {
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) 
          + "% </span>";
};

gantt.templates.task_class = function (start, end, task) {
    if (task.type == gantt.config.types.project)
        return "hide_project_progress_drag";
};
~~~


[Calculate Progress of Summary Tasks](https://docs.dhtmlx.com/gantt/samples/08_api/16_dynamic_progress.html)


## 타임라인에서 작업을 수직으로 재정렬하는 방법 {#howtoverticallyreordertasksinthetimeline}

[addTaskLayer()](api/method/addtasklayer.md) 메서드를 사용하면 타임라인에 사용자 정의 HTML 요소를 추가할 수 있으며, 이를 수직 및 수평으로 드래그하여 이동할 수 있습니다.

아래 예제는 타임라인에서 작업을 수직으로 재정렬하는 방법을 보여줍니다. 이는 그리드에서 작업을 재정렬하는 것과 유사합니다:


**Related example:** [Gantt. Reorder tasks vertically in timeline](https://snippet.dhtmlx.com/fla78m0y)


다른 예제에서는 분할된 작업을 재정렬하고 여러 작업을 동일한 행에 배치하는 방법을 보여줍니다:


**Related example:** [Gantt. Reorder split tasks vertically in timeline](https://snippet.dhtmlx.com/usfulweq)


## 그리드에서 열을 고정/고정 해제하는 방법 {#howtofreezefixcolumnsinthegrid}

이 효과는 CSS를 사용하여 구현할 수 있습니다. 고정하려는 열에 'relative' 포지션을 지정해야 하며, 'left' 속성은 스크롤바의 현재 위치와 일치해야 합니다. 이 값을 최신 상태로 유지하려면 스크롤바에 이벤트 리스너를 추가하고 CSS 변수를 동적으로 조정할 수 있습니다:

~~~js
gantt.attachEvent("onGanttReady", function () {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener('scroll', function () {
            document.documentElement.style.setProperty(
              '--gantt-frozen-column-scroll-left', el.scrollLeft + "px"
            );
        });
    }
});

const textEditor = { type: "text", map_to: "text" };
const start_dateEditor = { type: "date", map_to: "start_date" };
const end_dateEditor = { type: "date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };


gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true, editor: textEditor },
    { name: "start_date", align: "center", width: 120, resize: true, 
      editor: start_dateEditor },
    { name: "end_date", label: "End Time", align: "center", width: 120, 
      resize: true, editor: end_dateEditor },
    { name: "duration", align: "center", width: 80, resize: true, 
      editor: durationEditor },
    { name: "progress", label: "Progress", width: 80, align: "center", 
      resize: true },
    {
        name: "custom", label: "Custom", width: 180, align: "center", 
        resize: true, template: function (task) {
            return Math.round(Math.random() * 100)
        }
    },
    { name: "add", width: 44 }
];

gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                {
                    view: "grid", scrollable: true, 
                    scrollX: "scrollHor1", scrollY: "scrollVer"
                },
                {
                    view: "scrollbar", id: "scrollHor1",
                    scroll: 'x', group: 'hor'
                },
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                {
                    view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"
                },
                {
                    view: "scrollbar", id: "scrollHor",
                    scroll: 'x', group: 'hor'
                },
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
}
~~~

이를 보완하려면 다음과 같은 CSS 스타일을 추가하세요:

~~~css
:root {
    --gantt-frozen-column-scroll-left: 0px;
}

.gantt_cell:nth-child(1),
.gantt_grid_head_cell:nth-child(1) {
    background: Azure;
    position: relative;
    left: var(--gantt-frozen-column-scroll-left);
}

.gantt_grid_editor_placeholder[data-column-name="text"] {
    left: var(--gantt-frozen-column-scroll-left) !important;
}

.gantt_grid_head_cell:nth-child(1) {
    z-index: 1;
}
~~~


**Related example:** [Gantt. Frozen column in Grid (via CSS)](https://snippet.dhtmlx.com/jbiplpjz)


또는 [여러 개의 그리드 뷰](guides/layout-config.md)를 설정할 수도 있지만, 이 방법은 인라인 에디터와는 잘 호환되지 않습니다:

~~~js
gantt.config.columns = [
    { name: "start_date", align: "center", width: 80, resize: true },
    { name: "end_date", label: "End Date", align: "center", width: 80, resize: true },
    { name: "duration", width: 60, align: "center", resize: true },
    { name: "progress", label: "Progress", width: 60, align: "center", resize: true },
    { name: "add", width: 44 }
];


const fixedColumn = {
    columns: [
        { name: "text", tree: true, width: 200, resize: true },
    ]
};

gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      //min_width: 100,
      rows: [
        {
          group: "gantt",
          cols: [
            {
              rows: [
                { view: 'grid', config: fixedColumn, bind: "task", 
                  scrollY: 'gridScrollY' }
              ]
            },
            {
              rows: [
                { view: 'grid', bind: "task", scrollX: 'gridScrollX', 
                  scrollable: true, scrollY: 'gridScrollY' },
                { view: 'scrollbar', id: 'gridScrollX' }
              ]
            },
            { view: 'scrollbar', id: 'gridScrollY' }
          ]
        }
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        {
          group: "gantt",
          cols: [
            {
              rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor" }
              ]
            },
            { view: 'scrollbar', id: 'scrollVer' }
          ]
        }
      ]
    }
  ]
}
~~~


**Related example:** [Gantt. Fixed column in Grid (several grid views)](https://snippet.dhtmlx.com/8dg2r8m9)


## 간트에 범례(legend) 추가하는 방법 {#howtoaddlegendtothegantt}

Gantt에는 기본적으로 범례를 추가하는 기능이 내장되어 있지 않습니다. 가장 가까운 옵션은 [Overlay extension](guides/baselines.md#extraoverlayforthechart)이지만, 이 기능은 완전히 동일하지 않고 커스터마이징에 제한이 있습니다.

그럼에도 불구하고 범례를 추가하는 것은 매우 간단합니다. HTML로 범례 요소를 생성한 후, 다음과 같이 gantt 컨테이너에 삽입할 수 있습니다:

~~~js
gantt.$root.appendChild(legend);
~~~

아래의 실시간 예제에서는 gantt 위의 "Toggle legend" 버튼을 누르면 범례가 나타납니다:


**Related example:** [Gantt. Add information legend](https://snippet.dhtmlx.com/1ui0lim5)

))

인터랙티브한 기능을 추가하려면 이벤트 리스너를 범례 요소에 직접 연결하거나, gantt의 루트 요소에서 이벤트 위임을 사용할 수 있습니다:

~~~js
gantt.event(gantt.$root, "click", function(e){
    var closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~

