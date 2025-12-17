---
title: "Решения"
sidebar_label: "Решения"
---

Решения
==================================

## Как переключать грид/диаграмму {#howtotogglegridchart}

При использовании стандартной конфигурации макета, переключение грида или диаграммы выполняется изменением параметров [show_grid](api/config/show_grid.md) или [show_chart](api/config/show_chart.md), после чего необходимо вызвать метод [render()](api/method/render.md) для обновления отображения.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~


**Related example:** [Gantt. Переключение грида (стандартный макет)](https://snippet.dhtmlx.com/gnloz505)


~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~


**Related example:** [Gantt. Переключение временной шкалы (стандартный макет)](https://snippet.dhtmlx.com/kqe1hqp2)

 
Для пользовательских макетов необходимо создать отдельные макеты с гридом и без него или с временной шкалой и без неё. Переключение между ними осуществляется обновлением параметра [gantt.config.layout](api/config/layout.md) и инициализацией через метод [init()](api/method/init.md):

~~~js
let showGrid = true;
function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // макет с гридом и временной шкалой
    }
    else {
        gantt.config.layout = onlyChart; // макет только с временной шкалой

    }
    gantt.init("gantt_here");
}
~~~


**Related example:** [Gantt. Переключение грида (пользовательский макет)](https://snippet.dhtmlx.com/omk98l0x)


~~~js
let showChart = true;
function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // макет с гридом и временной шкалой
    }
    else {
        gantt.config.layout = onlyGrid; // макет только с гридом

    }
    gantt.init("gantt_here");
}
~~~


**Related example:** [Gantt. Переключение временной шкалы (пользовательский макет)](https://snippet.dhtmlx.com/aukjyqc8)


## Как переключать представление ресурсов {#howtotoggletheresourceview}

Аналогично переключению грида или временной шкалы, необходимо подготовить несколько макетов с ресурсами и без них. Для переключения между ними обновите параметр [gantt.config.layout](api/config/layout.md) и вызовите метод [init()](api/method/init.md) для применения изменений:

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


**Related example:** [Gantt. Переключение диаграммы загрузки ресурсов](https://snippet.dhtmlx.com/vbaczl07)


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


**Related example:** [Gantt. Переключение гистограммы ресурсов](https://snippet.dhtmlx.com/isn2ger4)


Другой подход - динамическое формирование макета с использованием layout views и повторная инициализация Gantt для обновления отображения:


**Related example:** [Gantt. Генерация макета](https://snippet.dhtmlx.com/3dnzfhit)


## Как реализовать бесконечную прокрутку временной шкалы {#howtohaveaninfinitescrollinthetimeline}

Бесконечная прокрутка может быть реализована разными способами, но обычно это связано с изменением отображаемого диапазона дат через параметры [gantt.config.start_date](api/config/start_date.md) и [gantt.config.end_date](api/config/end_date.md):

### При использовании полосы прокрутки

Отслеживая [позицию прокрутки](api/event/onganttscroll.md), можно расширять диапазон дат при приближении пользователя к краям шкалы. Чтобы избежать проблем с производительностью, перерисовку Gantt рекомендуется выполнять с задержкой через timeout:

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


**Related example:** [Gantt. Бесконечная прокрутка с полосой прокрутки](https://snippet.dhtmlx.com/4u52p5g3)


### При перетаскивании временной шкалы

Определяя текущую позицию прокрутки при перетаскивании временной шкалы, можно расширять диапазон дат, если прокрутка приближается к началу или концу шкалы:

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


**Related example:** [Gantt. Бесконечная прокрутка при перетаскивании временной шкалы](https://snippet.dhtmlx.com/zqob7lz5)


### При перетаскивании задачи

Если диапазон дат не задан явно, вызов метода [render()](api/method/render.md) при перетаскивании задачи к краям временной шкалы позволяет сохранять видимость диапазона:

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


**Related example:** [Gantt. Бесконечная прокрутка при перетаскивании задачи (стандартные настройки диапазона)](https://snippet.dhtmlx.com/44qcunjc)


Если [диапазон дат](api/config/start_date.md) задан явно, его необходимо обновлять при перетаскивании задач к краям:

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


**Related example:** [Gantt. Бесконечная прокрутка при перетаскивании задачи (явные настройки диапазона)](https://snippet.dhtmlx.com/3lrm0wyp)


## Как загружать задачи динамически {#howtoloadtasksdynamically}

Определяя момент, когда прокрутка достигает последней видимой задачи с помощью события [onGanttScroll](api/event/onganttscroll.md), можно динамически загружать дополнительные задачи методом [parse()](api/method/parse.md):

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


**Related example:** [Gantt. Динамическая загрузка данных](https://snippet.dhtmlx.com/39l7o0rm)


## Как развернуть/свернуть все задачи по кнопке {#howtoexpandcollapsealltaskswithabutton}

Методы [open()](api/method/open.md) и [close()](api/method/close.md) позволяют разворачивать или сворачивать отдельные задачи. Для применения ко всем задачам можно использовать их совместно с функцией [eachTask()](api/method/eachtask.md). Обертывание операции в [batchUpdate()](api/method/batchupdate.md) гарантирует, что диаграмма будет перерисована только один раз:

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


**Related example:** [Gantt. Кнопки свернуть/развернуть в заголовке Gantt](https://snippet.dhtmlx.com/z7o5qt9s)


**Related example:** [Gantt. Свернуть/развернуть все задачи](https://snippet.dhtmlx.com/72zahagy)


## Как отобразить несколько строк в ячейке/заголовке грида {#howtodisplayseverallinesinthegridcellheader}

Для отображения многострочного текста в заголовках или ячейках грида необходимо применить специальные CSS-стили.

Для заголовка грида:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~


**Related example:** [Gantt. Многострочный текст в заголовке грида](https://snippet.dhtmlx.com/lx70v5hw)


Для ячеек грида:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~


**Related example:** [Gantt. Многострочный текст в ячейках грида и временной шкале](https://snippet.dhtmlx.com/55uy7ibo)


**Related example:** [Gantt. Многострочный текст в ячейках столбца грида](https://snippet.dhtmlx.com/bwil9sxs)


## Как добавить пользовательский столбец в грид {#howtoaddacustomcolumninthegrid}

Чтобы добавить пользовательский столбец, измените параметр [gantt.config.columns](api/config/columns.md). Если указать свойство **name**, Gantt отобразит соответствующее значение свойства задачи. Также можно использовать функцию [template()](guides/specifying-columns.md#datamappingandtemplates), чтобы возвращать кастомные данные или HTML-элементы.

~~~js
gantt.config.columns = [
    /*
    другие столбцы
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    другие столбцы
    */
];
~~~


**Related example:** [Gantt. Пользовательский столбец с шаблоном для прогресса задачи](https://snippet.dhtmlx.com/t5ba0gzu)


**Related example:** [Gantt. Пользовательский столбец с шаблоном для кнопок действий](https://snippet.dhtmlx.com/gfsdp121)


## Как добавить пользовательскую кнопку добавления (+) {#howtoaddacustomaddbutton}

Создать пользовательскую кнопку добавления можно через определение пользовательского столбца в параметре [gantt.config.columns](api/config/columns.md). Имя столбца не должно быть *add*, чтобы не активировать стандартный столбец добавления. С помощью функции [template](guides/specifying-columns.md#datamappingandtemplates) можно вернуть любой HTML-контент, например, кнопку, и назначить обработчик события для добавления задачи.

~~~js
gantt.config.columns = [
    /*
    другие столбцы
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~


**Related example:** [Gantt. Пользовательские столбцы с шаблонами для кнопок добавления (+)](https://snippet.dhtmlx.com/o36jnko3)


## Как добавить пользовательскую шкалу {#howtoaddacustomscale}

Чтобы добавить пользовательскую шкалу, начните с создания [пользовательской единицы шкалы времени](guides/configuring-time-scale.md#customtimeunits) и реализуйте логику вычисления дат.

Пример пользовательской шкалы, отображающей рабочие смены (06:30, 18:30):

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


Еще один пример - пользовательская шкала, где вместо дней используются числа:

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


Пример пользовательской шкалы для 5-дневных рабочих недель:

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


Пример пользовательской шкалы, отображающей недели года, где номер недели начинается с первого дня года:

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


## Как копировать и вставлять задачи {#howtocopyandpastetasks}

Метод [copy()](api/method/copy.md) можно использовать для создания глубокой копии объекта задачи. После копирования вы можете назначить склонированной задаче новый ID и добавить ее с помощью методов [addTask()](api/method/addtask.md) или [createTask()](api/method/createtask.md).

Ниже приведен пример добавления кнопки для клонирования задачи:

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


Следующий пример иллюстрирует клонирование задачи вместе со всеми ее подзадачами и связями:

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


Еще один пример показывает, как реализовать копирование через горячие клавиши: выберите задачи, нажмите *Ctrl + C* для копирования и *Ctrl + V* для вставки в качестве подзадач выбранной задачи:

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


## Как добавить диаграмму ресурсов или пользовательские стили в экспортируемый PDF-файл {#howtoaddresourcechartorcustomstylesintheexportedpdffile}

Чтобы добавить пользовательские стили или диаграммы ресурсов в экспортируемый PDF, экспортируйте данные в [raw](guides/export.md#exportingcustommarkupandstyles) режиме и добавьте стили через параметры [header](guides/export.md#customstylefortheoutputfile) или [footer](guides/export.md#customstylefortheoutputfile) функции экспорта.

Например, вы можете сохранить стили в переменной и включить эту переменную в параметр [header](guides/export.md#customstylefortheoutputfile):

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


Или получить содержимое элемента &lt;style&gt; на странице и добавить его так:

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


Пример экспорта диаграммы Gantt с легендой:


**Related example:** [Gantt. Export Gantt with legend to PDF](https://snippet.dhtmlx.com/gz4ddlnl)


Примеры экспорта диаграммы загрузки ресурсов и гистограммы:


**Related example:** [Gantt. Export Gantt with resource load diagram to PDF](https://snippet.dhtmlx.com/lw5xcm31)


**Related example:** [Gantt. Export Gantt with resource histogram to PDF](https://snippet.dhtmlx.com/i9me4oxl)


## Как рассчитать прогресс задачи в зависимости от дочерних задач {#howtocalculatetaskprogressdependingonchildtasks}

Один из простых способов - обновлять прогресс родительской задачи сразу после изменения дочерней задачи. Для обхода родительских задач удобно использовать метод [eachParent()](api/method/eachparent.md).

В примере ниже прогресс родительских задач рассчитывается только на основе прогресса их дочерних задач:

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


В следующем примере прогресс родительских задач рассчитывается с учетом как прогресса, так и длительности дочерних задач:

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


## Как вертикально менять порядок задач на временной шкале {#howtoverticallyreordertasksinthetimeline}

Метод [addTaskLayer()](api/method/addtasklayer.md) позволяет добавлять пользовательские HTML-элементы на временную шкалу и поддерживает их вертикальное и горизонтальное перемещение.

В примере ниже показано, как можно менять порядок задач по вертикали на временной шкале, аналогично тому, как задачи можно менять местами в гриде:


**Related example:** [Gantt. Reorder tasks vertically in timeline](https://snippet.dhtmlx.com/fla78m0y)


В другом примере показано, как менять порядок разделённых задач и размещать задачи на одной строке:


**Related example:** [Gantt. Reorder split tasks vertically in timeline](https://snippet.dhtmlx.com/usfulweq)


## Как зафиксировать столбцы в гриде {#howtofreezefixcolumnsinthegrid}

Такого эффекта можно добиться с помощью CSS. Столбец, который нужно зафиксировать, должен иметь позицию 'relative'. Свойство 'left' должно соответствовать текущей позиции скроллбара. Для актуализации значения можно добавить обработчик события на скроллбар и изменять CSS-переменную:

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

Дополнительно добавьте следующие CSS-стили:

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


В качестве альтернативы можно настроить [несколько представлений грида](guides/layout-config.md), однако такой подход не очень хорошо работает с встроенными редакторами:

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


## Как добавить легенду в Gantt {#howtoaddlegendtothegantt}

В Gantt нет встроенной функции для добавления легенды. Ближайший вариант - [Overlay extension](guides/baselines.md#extraoverlayforthechart), но это не совсем то же самое и возможности настройки ограничены.

Тем не менее, добавить легенду достаточно просто. Можно создать элемент легенды в HTML и вставить его в контейнер Gantt следующим образом:

~~~js
gantt.$root.appendChild(legend);
~~~

Ниже приведён живой пример, где легенда появляется после нажатия кнопки "Toggle legend" над Gantt:


**Related example:** [Gantt. Add information legend](https://snippet.dhtmlx.com/1ui0lim5)

))

Чтобы добавить интерактивность, можно навешивать обработчики событий прямо на элемент легенды или обрабатывать события на корневом элементе Gantt с помощью делегирования:

~~~js
gantt.event(gantt.$root, "click", function(e){
    var closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~

