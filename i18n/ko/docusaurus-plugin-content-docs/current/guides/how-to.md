---
title: "실습 방법"
sidebar_label: "실습 방법"
---

# 실습 방법

## 그리드/차트 전환 방법

기본 레이아웃 구성(default layout configuration)을 사용하는 경우, [show_grid](api/config/show_grid.md) 또는 [show_chart](api/config/show_chart.md) 매개변수를 변경하고 [render()](api/method/render.md) 메서드를 사용하여 변경 사항을 다시 렌더링할 수 있습니다.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~

**관련 샘플** [Gantt. Toggle grid (default layout)](https://snippet.dhtmlx.com/gnloz505)

~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~

**관련 샘플** [Gantt. Toggle timeline (default layout)](https://snippet.dhtmlx.com/kqe1hqp2)
 
사용자 정의 레이아웃 구성(custom layout configuration)을 사용하는 경우, 그리드/타임라인이 있는 구성과 없는 구성을 각각 만들어야 합니다. 이들 사이를 전환하려면 [gantt.config.layout](api/config/layout.md) 매개변수를 수정하고 변경 사항을 확인하기 위해 [init()](api/method/init.md) 메서드를 적용해야 합니다:

~~~js
let showGrid = true;

function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // 그리드와 타임라인이 포함된 레이아웃
    }
    else {
        gantt.config.layout = onlyChart; // 타임라인만 있는 레이아웃
    }
    gantt.init("gantt_here");
}
~~~

**관련 샘플** [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x)

~~~js
let showChart = true;

function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // 그리드와 타임라인이 포함된 레이아웃
    }
    else {
        gantt.config.layout = onlyGrid; // 그리드만 있는 레이아웃
    }
    gantt.init("gantt_here");
}
~~~

**관련 샘플** [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)

## 리소스 뷰를 토글하는 방법

앞선 사용 사례와 마찬가지로, 리소스 뷰가 있는 구성과 없는 구성을 여러 개 만들어야 합니다. 이를 전환하려면 [gantt.config.layout](api/config/layout.md) 매개변수를 수정하고 변경 사항을 확인하기 위해 [init()](api/method/init.md) 메서드를 적용해야 합니다:

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

**관련 샘플** [Gantt. Toggle resource load diagram](https://snippet.dhtmlx.com/vbaczl07)

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

**관련 샘플** [Gantt. Toggle resource histogram](https://snippet.dhtmlx.com/isn2ger4)

또는 레이아웃 뷰(layout views)를 사용하고 Gantt를 다시 초기화하여 변경 사항을 확인하도록 레이아웃을 생성할 수도 있습니다:

**관련 샘플** [Gantt. Generate layout](https://snippet.dhtmlx.com/3dnzfhit)

## 타임라인에서 무한 스크롤을 구현하는 방법

무한 스크롤을 구현하는 방법은 여러 가지가 있습니다. 그러나 대부분의 경우 표시되는 날짜 범위를 수정해야 합니다([gantt.config.start_date](api/config/start_date.md)와 [gantt.config.end_date](api/config/end_date.md) 매개변수).

### 스크롤바를 사용할 때

현재 스크롤 위치를 얻고 날짜 범위를 늘려야 합니다. 다만, Gantt의 재페인팅(repainting)을 너무 자주 수행하면 성능에 영향을 미치므로 타임아웃 후에 이를 수행해야 합니다:

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

**관련 샘플** [Gantt. Infinite scroll while using scrollbar](https://snippet.dhtmlx.com/4u52p5g3)

### 타임라인을 끌 때

현재 스크롤 위치를 확인하고 타임라인 시작이나 끝에 가까워지면 표시되는 날짜 범위를 늘려야 합니다:

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

**관련 샘플** [Gantt. Infinite scroll while dragging the timeline](https://snippet.dhtmlx.com/zqob7lz5)

### 작업을 끌 때

날짜 범위가 설정되어 있지 않으면 작업이 타임라인의 시작이나 끝 근처로 드래그될 때마다 [render()] 메서드를 호출할 수 있습니다:

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

**관련 샘플** [Gantt. Infinite scroll while dragging a task (default range settings)](https://snippet.dhtmlx.com/44qcunjc)

만약 [date range](api/config/start_date.md)이 설정되어 있다면 이를 수정해야 합니다:

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

**관련 샘플** [Gantt. Infinite scroll while dragging a task (explicit range settings)](https://snippet.dhtmlx.com/3lrm0wyp)

## 작업을 동적으로 로드하는 방법

스크롤하여 마지막으로 보이는 작업에 도달했는지 onGanttScroll 이벤트에서 감지하고 [parse()](api/method/parse.md) 메서드를 사용해 새 작업을 로드할 수 있습니다:

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

**관련 샘플** [Gantt. Load data dynamically](https://snippet.dhtmlx.com/39l7o0rm)

## 버튼으로 모든 작업 확장/축소하는 방법

[open()](api/method/open.md) 및 [close()](api/method/close.md) 메서드를 사용해 특정 작업을 열고 닫을 수 있습니다. 차트의 모든 작업에서 이를 수행하려면 [eachTask()](api/method/eachtask.md) 함수 안에서 해당 메서드를 사용해야합니다. 변경 사항을 한 번에만 다시 그리려면 [batchUpdate()](api/method/batchupdate.md) 메서드로 래핑하면 됩니다:

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

**관련 샘플** [Gantt. Add collapse/expand buttons into Gantt header](https://snippet.dhtmlx.com/z7o5qt9s)

**관련 샘플** [Gantt. Collapse/expand all tasks](https://snippet.dhtmlx.com/72zahagy)

## 그리드 셀/헤더에 여러 줄 표시 방법

스타일 규칙을 조금 추가하면 이를 달성할 수 있습니다.

그리드 헤더의 경우:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~

**관련 샘플** [Gantt. Multiline text in the grid header](https://snippet.dhtmlx.com/lx70v5hw)

그리드 셀의 경우:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~

**관련 샘플** [Gantt. Multiline text in Grid cells and Timeline](https://snippet.dhtmlx.com/55uy7ibo)

**관련 샘플** [Gantt. Multiline text in cells of a Grid column](https://snippet.dhtmlx.com/bwil9sxs)

## 그리드에 사용자 정의 열 추가 방법

사용자 정의 열을 추가하려면 [gantt.config.columns](api/config/columns.md) 매개변수를 수정해야 합니다. **name** 매개변수를 지정하면 Gantt는 동일한 이름의 작업 속성 값을 반환합니다. 또한 [template()](guides/specifying-columns.md#datamappingandtemplates) 함수를 사용해 임의의 날짜나 HTML 요소를 반환할 수 있습니다.

~~~js
gantt.config.columns = [
    /*
    다른 열들
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    다른 열들
    */
];
~~~

**관련 샘플** [Gantt. Custom column with template for task progress](https://snippet.dhtmlx.com/t5ba0gzu)

**관련 샘플** [Gantt. Custom column with template for action buttons](https://snippet.dhtmlx.com/gfsdp121)

## 커스텀 add(+) 버튼 추가 방법

[l gantt.config.columns] 매개변수를 통해 커스텀 열을 만들어야 합니다. 해당 열에 원하는 이름을 아무렇게나 설정할 수 있지만, *add* 이름은 예외적으로 사용할 수 없습니다. 그렇지 않으면 Gantt가 기본적인 *add* 열을 추가합니다. 그리드 열에서 HTML 요소를 반환하기 위해 [template] 함수를 사용할 수 있습니다. 즉, 버튼을 반환하고 작업 추가를 위한 커스텀 함수에 클릭 이벤트를 연결할 수 있습니다.

~~~js
gantt.config.columns = [
    /*
    다른 열들
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~

**관련 샘플**  [Gantt. Custom columns with templates for add (+) buttons](https://snippet.dhtmlx.com/o36jnko3)

## 커스텀 눈금 추가 방법

[custom scale unit](guides/configuring-time-scale.md#customtimeunits)를 만들고 날짜를 계산하는 로직을 추가해야 합니다.

작업 교대 시간(06:30, 18:30)을 사용하는 커스텀 눈금 예시:

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

**관련 샘플** [Gantt. Custom work shift hours on the scale](https://snippet.dhtmlx.com/0l49yvp2)

일수가 아닌 숫자로 된 커스텀 눈금 예시:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~

**관련 샘플** [Gantt. Numbers of days on the scale](https://snippet.dhtmlx.com/06bp4wdl)

5일 근무 주가 있는 커스텀 눈금 예시:

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

**관련 샘플** [5-day work weeks on the scale](https://snippet.dhtmlx.com/eq70o558)

연도 주 단위 눈금의 예시(해당 주의 번호는 연초부터 시작):

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

**관련 샘플** [Gantt. Weeks of the year on the scale](https://snippet.dhtmlx.com/gbowxpmr)

## 작업 복사 및 붙여넣기 방법

작업 객체의 깊은 복사본을 만들기 위해 [copy()](api/method/copy.md) 메서드를 사용할 수 있습니다. 그런 다음 복제된 작업의 ID를 바꾼 뒤 [addTask()](api/method/addtask.md) 또는 [createTask()](api/method/createtask.md) 메서드를 사용해 복제된 작업을 추가하면 됩니다.

다음은 작업을 복제하기 위한 버튼을 추가하는 방법입니다:

~~~js
function clone_task(id) {
    const task = gantt.getTask(id);
    const clone = gantt.copy(task);
    clone.id = +(new Date());
    gantt.addTask(clone, clone.parent, clone.$index)
}

gantt.config.columns = [
    /*
    다른 열들
    */
    {
        name: "clone", label: "clone", width: 44, template: function (task) {
            return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
        }
    }
];
~~~

**관련 샘플** [Gantt. Clone a task](https://snippet.dhtmlx.com/ii9u6wbe)

다음 예제는 모든 하위 작업과 링크를 포함해 작업을 복제하는 방법을 보여줍니다:

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
  다른 열들
  */
  {
    name: "clone", label: "clone", width: 44, template: function (task) {
      return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
    }
  }
];
~~~

**관련 샘플** [Gantt. Clone a task with all its subtasks and links](https://snippet.dhtmlx.com/b33jfmws)

다음 예시는 키 네비게이션으로 복사를 구현하는 방법을 보여줍니다(작업을 선택하고, 단축키 Ctrl + C로 복사하고, Ctrl + V로 선택한 작업의 자식으로 붙여넣기):

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

**관련 샘플** [Gantt. Copy and paste tasks via Ctrl+C, Ctrl+V](https://snippet.dhtmlx.com/kck3pnmh)

## 내보낸 PDF 파일에 리소스 차트나 커스텀 스타일 추가 방법

데이터를 [raw] 모드로 내보내고 export 함수의 [header](guides/export.md#customstylefortheoutputfile) 또는 [footer](guides/export.md#customstylefortheoutputfile) 매개변수에 스타일을 포함해야 합니다.

예를 들어, 커스텀 스타일을 변수에 저장한 후 [header] 매개변수에 해당 변수를 추가할 수 있습니다:

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

**관련 샘플** [Gantt. Export Gantt to PDF (styles from a variable)](https://snippet.dhtmlx.com/51ds6zwa)

또는 페이지에서 \<style\> 요소를 찾아 그 내용을 아래와 같이 header에 삽입할 수 있습니다:

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

**관련 샘플** [Gantt. Export Gantt to PDF (styles from &lt;style&gt; element)](https://snippet.dhtmlx.com/6qwzclr2)

**관련 샘플** [Gantt. Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/2lqhkfhh)

작업에 대한 범례를 내보내는 예시:

**관련 샘플** [Gantt. Export Gantt with legend to PDF](https://snippet.dhtmlx.com/gz4ddlnl)

리소스 로드 다이어그램과 히스토그램을 내보내는 예시들:

**관련 샘플** [Gantt. Export Gantt with resource load diagram to PDF](https://snippet.dhtmlx.com/lw5xcm31)

**관련 샘플** [Gantt. Export Gantt with resource histogram to PDF](https://snippet.dhtmlx.com/i9me4oxl)

## 자식 작업에 따라 작업 진행률 계산 방법

간단한 구현 방법은 자식 작업을 업데이트한 뒤 부모 작업의 진행률을 계산하는 것입니다. 부모 작업을 순회하려면 [eachParent()](api/method/eachparent.md) 메서드를 사용할 수 있습니다.

다음 예제에서는 부모 작업의 진행률이 자식 작업의 진행률에만 의존합니다:

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

**관련 샘플** [Gantt. Calculate progress of a parent task dynamically](https://snippet.dhtmlx.com/xuicd1q7)

다음 예제에서는 부모 작업의 진행률이 자식 작업의 진행률과 지속 시간에 따라 달라집니다:

~~~js
function calculateSummaryProgress(task) {
    if (task.type !== gantt.config.types.project) return task.progress;

    let totalToDo = 0;
    let totalDone = 0;

    gantt.eachTask(child => {
        if (child.type !== gantt.config.types.project) {
            totalToDo += child.duration;
            totalDone += (child.progress || 0) * child.duration;
        }
    }, task.id);

    return totalToDo ? totalDone / totalToDo : 0;
}

function refreshSummaryProgress(id, submit) {
    if (!gantt.isTaskExists(id)) return;

    const task = gantt.getTask(id);
    const newProgress = calculateSummaryProgress(task);

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

gantt.attachEvent("onParse", () => {
    gantt.eachTask(task => {
        task.progress = calculateSummaryProgress(task);
    });
});

gantt.attachEvent("onAfterTaskUpdate", id => {
    refreshSummaryProgress(gantt.getParent(id), true);
});

gantt.attachEvent("onTaskDrag", id => {
    refreshSummaryProgress(gantt.getParent(id), false);
});

gantt.attachEvent("onAfterTaskAdd", id => {
    refreshSummaryProgress(gantt.getParent(id), true);
});

(() => {
    let idParentBeforeDeleteTask = 0;

    gantt.attachEvent("onBeforeTaskDelete", id => {
        idParentBeforeDeleteTask = gantt.getParent(id);
    });

    gantt.attachEvent("onAfterTaskDelete", () => {
        refreshSummaryProgress(idParentBeforeDeleteTask, true);
    });
})();

gantt.config.auto_types = true;

gantt.templates.progress_text = (start, end, task) =>
    `<span style='text-align:left;'>${Math.round(task.progress * 100)}% </span>`;

gantt.templates.task_class = (start, end, task) =>
    task.type === gantt.config.types.project ? "hide_project_progress_drag" : "";
~~~


[Calculate Progress of Summary Tasks](https://docs.dhtmlx.com/gantt/samples/08_api/16_dynamic_progress.html)


## 타임라인에서 작업을 수직으로 재배열하는 방법

타임라인에 커스텀 HTML 요소를 표시하고 이를 수직 및 수평으로 드래그할 수 있게 하려면 [addTaskLayer()](api/method/addtasklayer.md) 메서드를 사용할 수 있습니다.

다음 예제에서는 그리드에서의 일반적인 작업 재배열처럼 작동합니다:

**관련 샘플** [Gantt. Reorder tasks vertically in timeline](https://snippet.dhtmlx.com/fla78m0y)

다음 예제에서는 분할 작업을 재배열하고 같은 행에 작업을 배치할 수 있습니다:

**관련 샘플** [Gantt. Reorder split tasks vertically in timeline](https://snippet.dhtmlx.com/usfulweq)

## 그리드의 열을 고정하는 방법

CSS를 사용하여 고정해야 하는 열에 대해 'relative' 위치를 설정하면 됩니다. 'left' 매개변수는 스크롤바 위치와 동일한 값을 가지도록 설정해야 하므로 스크롤바 이벤트 핸들러를 추가하고 CSS 변수를 업데이트해야 합니다:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener("scroll", () => {
            document.documentElement.style.setProperty(
                "--gantt-frozen-column-scroll-left",
                `${el.scrollLeft}px`
            );
        });
    }
});

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true, editor: textEditor },
    { name: "start_date", align: "center", width: 120, resize: true,
        editor: startDateEditor },
    { name: "end_date", label: "End Time", align: "center", width: 120, resize: true,
        editor: endDateEditor },
    { name: "duration", align: "center", width: 80, resize: true,
        editor: durationEditor },
    { name: "progress", label: "Progress", width: 80, align: "center", resize: true },
    { name: "custom", label: "Custom", width: 180, align: "center", resize: true,
        template: task => Math.round(Math.random() * 100) },
    { name: "add", width: 44 }
];

gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "grid", scrollable: true, scrollX: "scrollHor1",
                    scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor1", croll: "x", group: "hor" }
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor", scroll: "x", group: "hor" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

그리고 CSS 스타일 추가:

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

**관련 샘플** [Gantt. Frozen column in Grid (via CSS)](https://snippet.dhtmlx.com/jbiplpjz)

다른 방법으로는 [several grid views](guides/layout-config.md)를 추가하는 것이지만, 인라인 편집기와는 잘 맞지 않습니다:

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
            rows: [
                {
                    group: "gantt",
                    cols: [
                        {
                            rows: [
                                { view: "grid", config: fixedColumn, bind: "task",
                                    scrollY: "gridScrollY" }
                            ]
                        },
                        {
                            rows: [
                                { view: "grid", bind: "task", scrollX: "gridScrollX",
                                    scrollable: true, scrollY: "gridScrollY" },
                                { view: "scrollbar", id: "gridScrollX" }
                            ]
                        },
                        { view: "scrollbar", id: "gridScrollY" }
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
                                { view: "timeline", scrollX: "scrollHor",
                                    scrollY: "scrollVer" },
                                { view: "scrollbar", id: "scrollHor" }
                            ]
                        },
                        { view: "scrollbar", id: "scrollVer" }
                    ]
                }
            ]
        }
    ]
};
~~~

**관련 샘플** [Gantt. Fixed column in Grid (several grid views)](https://snippet.dhtmlx.com/8dg2r8m9)

## Gantt에 범례를 추가하는 방법

Gantt에 범례를 표시하는 내장 메서드는 없으며, 가장 가까운 것은 [Overlay 확장 기능](guides/baselines.md#extra-overlay-for-the-chart)이지만 완전히 동일하지는 않으며 쉽게 커스터마이즈하기 어렵습니다.

다만 범례는 비교적 간단하게 구현할 수 있습니다. HTML로 범례 요소를 코드로 작성한 뒤 이를 Gantt 노드에 주입하면 됩니다:

~~~js
gantt.$root.appendChild(legend);
~~~

다음은 범례를 표시하는 라이브 예시로, 상단의 "Toggle legend" 버튼을 누르면 범례가 표시됩니다:

**관련 샘플** [Gantt. Add information legend](https://snippet.dhtmlx.com/1ui0lim5)

인터랙티비티를 추가하려면 DOM 이벤트 리스너를 직접 범례 요소에 추가하거나, 루트 레벨에서 DOM 이벤트를 수신하는 방식(event delegation)을 사용할 수 있습니다:

~~~js
gantt.event(gantt.$root, "click", function(e){
    const closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~