---
title: "Решения"
sidebar_label: "Решения"
---

# Решения

## Как переключать грид и чарт

Если вы используете конфигурацию макета по умолчанию, вы можете изменить параметры [show_grid](api/config/show_grid.md) или [show_chart](api/config/show_chart.md) и использовать метод [render()](api/method/render.md) для перерисовки изменений.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~

**Связанный пример** [Gantt. Переключение грид (макет по умолчанию)](https://snippet.dhtmlx.com/gnloz505)

~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~

**Связанный пример** [Gantt. Переключение таймлайна (макет по умолчанию)](https://snippet.dhtmlx.com/kqe1hqp2)

Если вы используете пользовательскую конфигурацию макета, вам нужно создать несколько конфигураций макета — с гридом/таймлайном и без них. Чтобы переключаться между ними, необходимо изменить параметр [gantt.config.layout](api/config/layout.md) и применить метод [init()](api/method/init.md), чтобы увидеть изменения:

~~~js
let showGrid = true;

function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // макет с гридом и таймлайном
    }
    else {
        gantt.config.layout = onlyChart; // макет только с таймлайном

    }
    gantt.init("gantt_here");
}
~~~

**Связанный пример** [Gantt. Переключение грид (пользовательский макет)](https://snippet.dhtmlx.com/omk98l0x)

~~~js
let showChart = true;

function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // макет с гридом и таймлайном
    }
    else {
        gantt.config.layout = onlyGrid; // макет только с гридом

    }
    gantt.init("gantt_here");
}
~~~

**Связанный пример** [Gantt. Переключение таймлайна (пользовательский макет)](https://snippet.dhtmlx.com/aukjyqc8)

## Как переключать представление ресурсов

Как и в предыдущем случае использования, нужно создать несколько конфигураций макета — с представлениями ресурсов и без них. Чтобы переключаться между ними, необходимо изменить параметр [gantt.config.layout](api/config/layout.md) и применить метод [init()](api/method/init.md) для просмотра изменений:

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

**Связанный пример** [Gantt. Переключение диаграммы загрузки ресурсов](https://snippet.dhtmlx.com/vbaczl07)

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

**Связанный пример** [Gantt. Переключение гистограммы ресурсов](https://snippet.dhtmlx.com/isn2ger4)

Либо можно формировать макет, используя представления макета и повторно инициализировать Gantt, чтобы увидеть изменения:

**Связанный пример** [Gantt. Создание макета](https://snippet.dhtmlx.com/3dnzfhit)

## Как обеспечить бесконечную прокрутку в таймлайне

Существует несколько способов реализации бесконечной прокрутки. Но в большинстве случаев нужно изменить отображаемый диапазон дат ([gantt.config.start_date](api/config/start_date.md) и [gantt.config.end_date](api/config/end_date.md) параметры):

### При использовании полосы прокрутки

Необходимо получить положение прокрутки ([scroll position](api/event/onganttscroll.md)) и увеличить диапазон дат. Заметьте, что слишком частая переработка перерисовки Gantt может повлиять на производительность, поэтому её стоит выполнять после тайм-аута:

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

**Связанный пример** [Gantt. Бесконечная прокрутка при использовании полосы прокрутки]

### При перетаскивании таймлайна

Необходимо получить текущую позицию прокрутки и, если она близка к началу или концу таймлайна, увеличить отображаемый диапазон дат:

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

**Связанный пример** [Gantt. Бесконечная прокрутка при перетаскивании таймлайна]

### При перетаскивании задачи

Если диапазон дат не установлен, можно вызывать метод [render()](api/method/render.md) каждый раз, когда задача перетаскивается ближе к началу или концу таймлайна:

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

**Связанный пример** [Gantt. Бесконечная прокрутка при перетаскивании задачи (значения диапазона по умолчанию)](https://snippet.dhtmlx.com/44qcunjc)

Если [date range](api/config/start_date.md) установлен, необходимо будет изменить его:

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

**Связанный пример** [Gantt. Бесконечная прокрутка при перетаскивании задачи (явный диапазон)](https://snippet.dhtmlx.com/3lrm0wyp)

## Как динамически загружать задачи

Вы можете определить, что прокрутили до последней видимой задачи в событии [onGanttScroll](api/event/onganttscroll.md), и использовать метод [parse()](api/method/parse.md) для загрузки новых задач:

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

**Связанный пример** [Gantt. Динамическая загрузка данных](https://snippet.dhtmlx.com/39l7o0rm)

## Как добавить/развернуть все задачи при помощи кнопки

Можно использовать методы [open()](api/method/open.md) и [close()](api/method/close.md) для открытия и закрытия задачи. Чтобы выполнить это для всех задач на диаграмме, нужно использовать метод внутри функции [eachTask()](api/method/eachtask.md). Чтобы переработать изменения только один раз, можно обернуть функцию в метод [batchUpdate()](api/method/batchupdate.md):

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

**Связанный пример** [Gantt. Добавить кнопки сворачивания/разворачивания в заголовке Gantt](https://snippet.dhtmlx.com/z7o5qt9s)

**Связанный пример** [Gantt. Сворачивать/разворачивать все задачи](https://snippet.dhtmlx.com/72zahagy)

## Как отображать несколько строк в ячейке/заголовке грид

Это можно добиться добавлением некоторых правил стилей.

Для заголовка грида:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~  

**Связанный пример** [Gantt. Многострочный текст в заголовке грида](https://snippet.dhtmlx.com/lx70v5hw)

Для ячеек грида:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~  

**Связанный пример** [Gantt. Многострочный текст в ячейках грид и таймлайна](https://snippet.dhtmlx.com/55uy7ibo)

**Связанный пример** [Gantt. Многострочный текст в ячейках столбца Grid](https://snippet.dhtmlx.com/bwil9sxs)

## Как добавить пользовательский столбец в грид

Чтобы добавить пользовательский столбец, нужно изменить параметр [gantt.config.columns](api/config/columns.md). Если вы указываете параметр **name**, Gantt вернет значение свойства задачи с тем же именем. Также можно использовать функцию [template()](guides/specifying-columns.md#datamappingandtemplates), чтобы вернуть любое пользовательское значение даты или HTML-элементы.

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

**Связанный пример** [Gantt. Пользовательский столбец с шаблоном для прогресса задачи](https://snippet.dhtmlx.com/t5ba0gzu)

**Связанный пример** [Gantt. Пользовательский столбец с шаблоном для кнопок действий](https://snippet.dhtmlx.com/gfsdp121)

## Как добавить пользовательскую кнопку добавления (+)

Необходимо создать пользовательский столбец через параметр [gantt.config.columns](api/config/columns.md). Вы можете задать любое имя для этого столбца, кроме *add*. В противном случае Gantt автоматически добавит столбец по умолчанию *add*. Возможно вернуть любые HTML-элементы в столбец грида с помощью функции [template](guides/specifying-columns.md#datamappingandtemplates). Это означает, что вы можете вернуть кнопку и привязать к ней обработчик клика с вашей собственной функцией для добавления задач.

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

**Связанный пример**  [Gantt. Пользовательские столбцы с шаблонами для кнопок добавления (+)](https://snippet.dhtmlx.com/o36jnko3)

## Как добавить пользовательскую шкалу

Необходимо создать [пользовательскую единицу шкалы](guides/configuring-time-scale.md#customtimeunits) и добавить логику для расчета дат.

Пример пользовательской шкалы с часами рабочей смены (06:30, 18:30):

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

**Связанный пример** [Gantt. Пользовательские часы рабочей смены на шкале](https://snippet.dhtmlx.com/0l49yvp2)

Пример пользовательской шкалы с числами вместо дней:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~  

**Связанный пример** [Gantt. Числа дней на шкале](https://snippet.dhtmlx.com/06bp4wdl)

Пример пользовательской шкалы с пятидневной рабочей неделей:

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

**Связанный пример** [5-дневная рабочая неделя на шкале](https://snippet.dhtmlx.com/eq70o558)

Пример пользовательской шкалы с неделями года (номер недели начинается с первого дня года):

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

**Связанный пример** [Gantt. Недели года на шкале](https://snippet.dhtmlx.com/gbowxpmr)

## Как копировать и вставлять задачи

Можно использовать метод [copy()](api/method/copy.md) для создания глубокой копии объекта задачи. Затем можно изменить ID клонированной задачи. После этого можно добавить клонированную задачу с помощью методов [addTask()](api/method/addtask.md) или [createTask()](api/method/createtask.md).

Так можно добавить кнопку для клонирования задачи:

~~~js
function clone_task(id) {
    const task = gantt.getTask(id);
    const clone = gantt.copy(task);
    clone.id = +(new Date());
    gantt.addTask(clone, clone.parent, clone.$index)
}

gantt.config.columns = [
    /*
    другие столбцы
    */
    {
        name: "clone", label: "clone", width: 44, template: function (task) {
            return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
        }
    }
];
~~~  

**Связанный пример**  [Gantt. Клонирование задачи](https://snippet.dhtmlx.com/ii9u6wbe)

Следующий пример демонстрирует, как клонировать задачу со всеми её подзадачами и связями:

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
  другие столбцы
  */
  {
    name: "clone", label: "clone", width: 44, template: function (task) {
      return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
    }
  }
];
~~~  

**Связанный пример** [Gantt. Клон задачи и все её подзадачи и связи](https://snippet.dhtmlx.com/b33jfmws)

Еще один пример демонстрирует, как реализовать копирование через навигацию клавишами (выберите задачи, используйте сочетание клавиш Ctrl + C для копирования и Ctrl + V для вставки в качестве дочерних к выбранной задаче):

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

**Связанный пример** [Gantt. Копирование и вставка задач через Ctrl+C, Ctrl+V](https://snippet.dhtmlx.com/kck3pnmh)

## Как добавить диаграмму ресурсов или пользовательские стили в экспортируемый PDF

Необходимо экспортировать данные в режиме [raw](guides/export.md#exportingcustommarkupandstyles) и включить стили в параметры экспорта [header](guides/export.md#customstylefortheoutputfile) или [footer](guides/export.md#customstylefortheoutputfile) экспортной функции.

Например, можно сохранить пользовательские стили в переменную, а затем добавить переменную в параметр [header](guides/export.md#customstylefortheoutputfile)

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

**Связанный пример** [Gantt. Экспорт Gantt в PDF (стили из переменной)](https://snippet.dhtmlx.com/51ds6zwa)

Или можно найти элемент &lt;style&gt; на странице и добавить его содержимое, как в примере:

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

**Связанный пример** [Gantt. Экспорт Gantt в PDF (стили из элемента &lt;style&gt;)](https://snippet.dhtmlx.com/6qwzclr2)

**Связанный пример** [Gantt. Экспорт Gantt с пользовательскими иконками в PDF](https://snippet.dhtmlx.com/2lqhkfhh)

Пример экспорта Gantt с легендой:

**Связанный пример** [Gantt. Экспорт Gantt с легендой в PDF](https://snippet.dhtmlx.com/gz4ddlnl)

Примеры экспорта диаграммы загрузки ресурсов и гистограммы:

**Связанный пример** [Gantt. Экспорт Gantt с диаграммой загрузки ресурсов в PDF](https://snippet.dhtmlx.com/lw5xcm31)

**Связанный пример** [Gantt. Экспорт Gantt с ресурсной гистограммой в PDF](https://snippet.dhtmlx.com/i9me4oxl)

## Как рассчитывать прогресс задачи в зависимости от дочерних задач

Простой способ реализации — вычислять прогресс родительской задачи после обновления дочерней задачи. Чтобы пройтись по родительским задачам, можно использовать метод [eachParent()](api/method/eachparent.md).

В следующем примере прогресс родительских задач зависит только от прогресса дочерних задач:

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

**Связанный пример** [Gantt. Рассчитать прогресс родительской задачи динамически](https://snippet.dhtmlx.com/xuicd1q7)

В следующем примере прогресс родительских задач зависит от прогресса дочерних задач и их продолжительности:

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


## КакVertically reorder tasks in the timeline

You can use the [addTaskLayer()](api/method/addtasklayer.md) method to display custom HTML elements in the timeline and add functions to drag them vertically and horizontally.

В следующем примере это будет работать как обычная переработка задач в гриде:

**Связанный пример** [Gantt. Перемещение задач по вертикали в таймлайне](https://snippet.dhtmlx.com/fla78m0y)

В следующем примере можно переразместить разделенные задачи и разместить задачи на одной строке:

**Связанный пример** [Gantt. Перемещение разделённых задач по вертикали в таймлайне](https://snippet.dhtmlx.com/usfulweq)

## Как зафиксировать колонки в гриде

Это можно сделать с помощью CSS. Необходимо задать элементу с позицией 'relative' фиксируемую колонку. Параметр 'left' должен иметь такое же значение, как и положение полосы прокрутки, чтобы можно было повесить обработчик на прокрутку и обновлять CSS-переменную:

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

И добавить CSS-стили:

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

**Связанный пример** [Gantt. Зафиксированная колонка в Grid (несколько видов grid)](https://snippet.dhtmlx.com/jbiplpjz)

Другой подход — добавить несколько представлений грид, но это не очень хорошо работает с встроенными редакторами:

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

**Связанный пример** [Gantt. Зафиксированная колонка в Grid (несколько видов grid)](https://snippet.dhtmlx.com/8dg2r8m9)

## Как добавить легенду к Gantt

В Gantt нет встроенного метода отображения легенды, ближайшим к этому является расширение Overlay, но оно не совсем то же самое и не настраивается так же просто.

Однако легенды можно реализовать достаточно просто. Вы можете закодировать элемент легенды в HTML и затем просто внедрить его в узел gantt:

~~~js
gantt.$root.appendChild(legend);
~~~  

Вот работающий пример: чтобы показать легенду, нажмите кнопку "Toggle legend" над Gantt.

**Связанный пример** [Gantt. Добавить информационную легенду](https://snippet.dhtmlx.com/1ui0lim5)

Чтобы сделать легенду интерактивной, можно добавить слушателей DOM-событий непосредственно к элементу легенды, либо слушать DOM-события на уровне корня Gantt (делегирование событий):

~~~js
gantt.event(gantt.$root, "click", function(e){
    const closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~