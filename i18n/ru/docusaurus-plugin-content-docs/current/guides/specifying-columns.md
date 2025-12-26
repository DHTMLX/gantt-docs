---
title: "Указание колонок"
sidebar_label: "Указание колонок"
---

# Указание колонок

Колонки грида настраиваются с помощью параметра [columns](api/config/columns.md).

![gantt_left](/img/gantt_left.png)

~~~js
// определение колонок по умолчанию
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];
~~~

Также доступна видеоинструкция по настройке колонок грида.

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Обзор {#overview}

По умолчанию в гриде отображаются 4 колонки:

1. Task name
2. Start date
3. Duration 
4. Специальная колонка '+'. Эта колонка с <code>name="add"</code> отображает знак '+', который позволяет пользователям добавлять подзадачи.

:::note
Обратите внимание, что вам не обязательно указывать параметр [columns](api/config/columns.md), чтобы отобразить стандартные колонки в гриде.
:::

Параметр [columns](api/config/columns.md) представляет собой массив, где каждый объект определяет одну колонку.
Например, чтобы задать 5 колонок с названиями 'Task', 'Start Date', 'End Date', 'Holder' и 'Progress', укажите параметр [columns](api/config/columns.md) следующим образом:

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

Здесь 'text', 'holder', 'start_date', 'end_date' и 'progress' соответствуют [названиям свойств данных](guides/specifying-columns.md#datamappingandtemplates).

## Отображение даты окончания задачи {#displayingenddateoftasks}

Если объекты данных задачи содержат даты начала и окончания в формате "%Y-%m-%d" или "%d-%m-%Y" (без часов и минут), отображаемые даты окончания в стандартном формате могут отличаться от ожидаемых. Подробнее о форматировании дат окончания смотрите в статье [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

## Скрытие кнопки "Add" для отдельных задач {#hidingtheaddbuttonforcertaintasks}

Простой способ запретить пользователям добавлять подзадачи к определённым задачам - скрыть кнопку 'Add' с помощью CSS.

1. Сначала присвойте CSS-класс каждой строке задачи с помощью шаблона [grid_row_class](api/template/grid_row_class.md):
~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
2. Затем скройте кнопку 'Add' в этих строках с помощью CSS:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~


[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Ширина {#width}

Чтобы управлять шириной колонки, используйте атрибут [width](api/config/columns.md) в её объекте конфигурации:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Использование '*' для ширины позволяет колонке занять всё оставшееся пространство.
:::

Имейте в виду, что ширина колонок грида зависит от двух настроек: параметра [width](api/config/columns.md) самой колонки и общей [grid_width](api/config/grid_width.md). Если суммарная ширина колонок не совпадает с шириной грида, Gantt скорректирует одно из этих значений.

- При инициализации gantt с помощью [gantt.init()](api/method/init.md) приоритет имеет [width](api/config/columns.md) колонки. 

 

**Related example:** [Приоритет ширины колонки над шириной грида при инициализации](https://snippet.dhtmlx.com/itnvg6z9)

- При рендеринге gantt с помощью [gantt.render()](api/method/render.md) приоритет получает [grid_width](api/config/grid_width.md). 

 

**Related example:** [Приоритет ширины грида над шириной колонки при рендеринге](https://snippet.dhtmlx.com/4nb67z61)

- При инициализации gantt через [gantt.init()](api/method/init.md), если ширина колонки не указана или равна **'*'**, приоритет получает [grid_width](api/config/grid_width.md). 


**Related example:** [Приоритет ширины грида, если ширина колонки не задана или равна '*' при инициализации](https://snippet.dhtmlx.com/qej8w5ix)


### Минимальная/максимальная ширина колонки

Вы можете использовать свойства **min_width** и **max_width** для ограничения ширины колонки при изменении размера:

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
Свойство **min_width** колонки перекрывает настройку gantt [min_grid_column_width](api/config/min_grid_column_width.md).
:::

### Минимальная ширина грида при изменении размера

Минимальная ширина, до которой можно уменьшить грид, задаётся с помощью [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md). Эта опция определяет минимальную ширину каждой колонки при изменении размера грида:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // грид можно уменьшить до 90 px суммарно

gantt.init("gantt_here");
~~~


**Related example:** [Минимальная ширина грида](https://snippet.dhtmlx.com/zdza8tws)


Также обратите внимание, что минимальная ширина грида при изменении размера зависит от минимальной ширины колонки 'add' (по умолчанию 44). Чтобы уменьшить грид меньше 44 px, задайте [min_width](api/config/columns.md) для колонки 'add' следующим образом:

~~~js
{ name: "add", label: "", min_width: 1 }
~~~

## Связь данных и шаблоны {#datamappingandtemplates}

По умолчанию dhtmlxGantt заполняет грид, используя свойства данных, совпадающие с именами колонок. Например, если колонка имеет **name:"holder"**, dhtmlxGantt ищет свойство 'holder' в JSON-данных и отображает его в этой колонке.

#### Использование шаблонов для данных колонки

Если вы хотите отобразить в колонке комбинацию нескольких свойств данных, можно выбрать любое имя для колонки и задать шаблон данных с помощью атрибута **template** в параметре [columns](api/config/columns.md).

Например, вы можете назвать колонку **name:"staff"** и создать функцию-шаблон, возвращающую объединённые значения *holder* и *progress*:

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

## Горизонтальное выравнивание текста {#textalignment}

Чтобы выровнять текст по горизонтали в колонке, используйте атрибут [align](api/config/columns.md) в её конфигурации:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~

## Код WBS {#wbscode}

Вы можете добавить колонку для отображения структурных номеров (WBS-кодов) задач. Для этого используйте метод [getWBSCode](api/method/getwbscode.md) в шаблоне колонки.

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


### Получение WBS-кода задачи

Метод [getWBSCode](api/method/getwbscode.md) возвращает WBS-код для конкретной задачи. Например, если вы загрузите в gantt следующие задачи:

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

и хотите получить WBS-код для задачи с id="3," передайте объект задачи в [getWBSCode](api/method/getwbscode.md). Метод вернёт строку с WBS-кодом:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> вернёт "1.2"
~~~

### Получение задачи по WBS-коду

Можно получить объект задачи, передав её WBS-код в метод [getTaskByWBSCode](api/method/gettaskbywbscode.md):

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## Ограничения по времени для задач {#timeconstraintsfortasks}

:::info
Эта функциональность доступна только в PRO-версии
:::

Вы можете добавить специальные колонки грида, которые позволяют указывать тип [ограничения по времени](guides/auto-scheduling.md#timeconstraintsfortasks) для задачи, а также дату ограничения, если выбранный тип этого требует. Эти колонки называются "constraint_type" и "constraint_date" соответственно.

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

Эти колонки связаны с объектами встроенного редактора, которые позволяют выбрать необходимый тип ограничения для задачи и изменить дату прямо в гриде.

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


## Изменение размера {#resizing}

:::info
Эта функциональность доступна только в PRO-версии
:::

Чтобы разрешить пользователям изменять ширину колонки путем перетаскивания её правой границы, включите атрибут [resize](api/config/columns.md) в настройках соответствующей колонки:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 'resize' включён
    { name: "start_date", resize: true, min_width: 100 }, // ограничено 'min_width'
    { name: "duration",   align: "center" },              // изменение размера отключено
    { name: "add",        width: "44" }
];
~~~


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


Чтобы сделать весь грид изменяемым по ширине путем перетаскивания его границы, используйте опцию [gantt.config.layout](api/config/layout.md) и определите объекты грида и разделителя с соответствующими настройками:

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

Чтобы зафиксировать ширину грида при изменении ширины колонок, установите опцию [keep_grid_width](api/config/keep_grid_width.md) в *true*:

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


### События

dhtmlxGantt предоставляет 6 событий, связанных с изменением размера:

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - возникает перед началом перетаскивания границы колонки для изменения её размера
- [onColumnResize](api/event/oncolumnresize.md) - возникает во время перетаскивания границы колонки для изменения её размера
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - возникает после завершения перетаскивания границы колонки


- [onGridResizeStart](api/event/ongridresizestart.md) - возникает перед началом перетаскивания границы грида для изменения его размера
- [onGridResize](api/event/ongridresize.md) - возникает во время перетаскивания границы грида для изменения его размера
- [onGridResizeEnd](api/event/ongridresizeend.md) - возникает после завершения перетаскивания границы грида


## Видимость {#visibility}

Для управления видимостью колонки используйте атрибут [hide](api/config/columns.md) в конфигурации колонки.

 
Видимость можно изменять динамически, обновляя свойство 'hide' и обновляя отображение Gantt:

:::info
Эта функциональность доступна только в PRO-версии
:::

**Переключение между базовым и детализированным видом**
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


Также доступно видео, демонстрирующее управление видимостью колонок в гриде.

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Модификация ячеек после рендера {#modifyingcellsafterrendering}

Иногда требуется скорректировать внешний вид или поведение ячейки грида после её отрисовки.

Начиная с версии 7.1, в библиотеке появился атрибут **onrender** в конфигурации [columns](api/config/columns.md), который позволяет модифицировать ячейку после рендера, например:

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


Другой вариант использования **onrender** - внедрение внешних компонентов в ячейки грида. Например, если вы используете DHTMLX Gantt с React и хотите вставить React-компонент в ячейку грида, следующий код демонстрирует, как это можно реализовать:

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

Чтобы включить рендеринг React-компонента, необходимо указать конфигурацию [gantt.config.external_render](api/config/external_render.md):

~~~js
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.external_render = { 
    // проверяет, является ли элемент React-элементом
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // рендерит React-элемент в DOM
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

Процесс работы следующий:

- Объект, возвращаемый из колбэка **onrender**, передаётся в функцию **isElement** для проверки, можно ли его отрендерить с помощью выбранного фреймворка или библиотеки.
- Если **isElement** возвращает *true*, объект передаётся в **renderElement**, который инициализирует компонент внутри DOM-элемента ячейки.


## Горизонтальный скроллбар {#horizontalscrollbar}

Грид можно сделать прокручиваемым, включив свойство **scrollable** в конфигурации [layout](guides/layout-config.md). 
[Подробнее о привязке представлений layout к скроллбару](guides/layout-config.md#scrollbar).

Добавление горизонтального скроллбара в грид позволяет Gantt автоматически подстраивать ширину колонок при изменении размера грида. [Подробнее о включении этой функции](api/config/grid_elastic_columns.md). 

Кроме установки атрибута **scrollable**, необходимо добавить *элемент горизонтального скроллбара* в layout и связать его с гридом, как показано ниже:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // добавление горизонтального скроллбара к гриду через атрибут scrollX
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

При использовании отдельных скроллбаров для грида и временной шкалы, синхронизация их видимости гарантирует, что оба будут показаны или скрыты одновременно.

![scrollable_grid](/img/scrollable_grid.png)

Это можно реализовать, присвоив обоим скроллбарам одну и ту же *группу видимости*:

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
                // горизонтальный скроллбар для грида
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // горизонтальный скроллбар для временной шкалы
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } /*!*/
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

Если любой из скроллбаров в группе видим, то будут показаны все скроллбары этой группы.


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## Стилизация {#styling}

Подробнее о стилизации ячеек грида смотрите в разделе [Работа со стилями Gantt](guides/styling-guide.md#stylinggrid).

