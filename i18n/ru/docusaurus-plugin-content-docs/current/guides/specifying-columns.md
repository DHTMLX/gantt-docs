---
title: "Указание колонок"
sidebar_label: "Указание колонок"
---

## Определение колонок

Колонки грида настраиваются параметром [columns](api/config/columns.md).

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

Вы можете посмотреть видеогид, который описывает, как указать колонки грида.

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Обзор

По умолчанию в гриде содержатся 4 колонки:

1. Название задачи
2. Дата начала
3. Длительность 
4. '+' колонка. Особая колонка с name="add", которая отображает знак '+' и позволяет пользователю добавлять подпорядкованные задачи к задаче.

:::note
Обратите внимание: задавать параметр [columns](api/config/columns.md) не требуется, чтобы отобразить колонки по умолчанию в гриде.
:::

Параметр [columns](api/config/columns.md) представляет собой массив, каждый объект которого задаёт одну колонку. 
Так, например, чтобы определить 5 колонок в гриде: 'Task', 'Start Date', 'End Date', 'Holder', 'Progress', задайте параметр [columns](api/config/columns.md) как в примере ниже:

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

где 'text', 'holder', 'start_date', 'end_date', 'progress' являются [именами свойств данных](guides/specifying-columns.md#datamappingandtemplates).


## Отображение даты окончания задач

Когда объекты данных задач содержат даты начала и окончания в формате "%Y-%m-%d" или "%d-%m-%Y" (то есть без части часов), даты в формате по умолчанию могут иметь значения, которые не ожидаются. Чтобы узнать больше о форматировании дат окончания, смотрите статью [Отображение даты окончания задачи и включительные даты окончания](guides/loading.md#taskenddatedisplayampinclusiveenddates).


## Скрытие кнопки "Add" для некоторых задач

Очень простой способ предотвратить добавление подпорядкованных задач к определённым задачам — скрыть кнопку 'Add' с помощью CSS.




Сначала назначьте CSS‑класс для каждой строки задачи, используя шаблон [grid_row_class](api/template/grid_row_class.md):

~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
Затем скройте кнопку 'Add' для таких строк:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

**Связанный пример**: [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Ширина

Чтобы задать ширину колонки, используйте атрибут [width](api/config/columns.md) в соответствующем объекте колонки:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Используйте значение '*' для того, чтобы колонка занимала всё оставшееся пространство.
:::

**Примечание**, что ширина колонок грида зависит от двух атрибутов: [width] самой колонки и [grid_width]. Если сумма ширин колонок не равна ширине грида, Gantt изменит один из параметров.

- При инициализации Gantt через [gantt.init()](api/method/init.md) приоритет имеет [width] колонки. 

 
**Связанный пример**: [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)

- При отрисовке Gantt через [gantt.render()](api/method/render.md) приоритет имеет [grid_width](api/config/grid_width.md). 

 
**Связанный пример**: [Grid width priority over column width during rendering](https://snippet.dhtmlx.com/4nb67z61)

- При инициализации Gantt через [gantt.init()](api/method/init.md) и если ширина колонки не указана или стоит на `'*'`, приоритет имеет [grid_width](api/config/grid_width.md). 

**Связанный пример**: [Grid width priority when column width is undefined or set to `'*'` at initialization](https://snippet.dhtmlx.com/qej8w5ix)

### Минимальная/максимальная ширина колонки

Свойства **min_width** и **max_width** можно использовать для ограничения ширины колонки при операциях изменения размера:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150, max_width: 300 },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Свойство **min_width** колонки имеет приоритет над свойством [min_grid_column_width](api/config/min_grid_column_width.md) у Gantt.
:::

### Минимальная ширина грида при изменении размера

Минимальная ширина, до которой может быть изменён размер грида, определяется опцией [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md). Эта опция задаёт минимальную ширину, до которой можно изменить размер каждой колонки при изменении размера грида:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // грид можно изменить до 90 px

gantt.init("gantt_here");
~~~

**Связанный пример**: [Minimal grid width](https://snippet.dhtmlx.com/zdza8tws)

Обратите внимание, что минимальная ширина грида при изменении размера также зависит от минимальной ширины колонки 'add' (по умолчанию 44). Чтобы можно было изменить размер грида на значение менее 44 px, укажите опцию [min_width](api/config/columns.md) в объекте колонки 'add':

~~~js
{ name: "add", label: "", min_width: 1 }
~~~


## Data mapping and templates {#datamappingandtemplates}

По умолчанию dhtmlxGantt заполняет грид свойствами данных, соответствующими именам колонок.
Например, если вы зададите **name:"holder"** для колонки, dhtmlxGantt будет искать такое свойство данных во входном JSON‑данных и, если оно существует, загрузит его в колонку.

#### Использование шаблонов для данных колонки

Если вы хотите отобразить сочетание нескольких свойств данных в колонке, вы можете использовать любое имя для колонки, но задать шаблон данных через атрибут **template** параметра [columns](api/config/columns.md).
Например, можно задать **name:"staff"** для колонки и определить функцию шаблона, которая вернёт свойства данных *holder* и *progress*, чтобы загрузить их в колонку.

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


## Выравнивание текста

Чтобы задать горизонтальное выравнивание текста в колонке, используйте атрибут [align](api/config/columns.md) в соответствующем объекте колонки:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~


## WBS код {#wbscode}

Вы можете добавить колонку, которая будет отображать нумерацию outline задач (их WBS‑код). Для этого в шаблоне колонки используйте метод [getWBSCode](api/method/getwbscode.md).

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40,  template: gantt.getWBSCode }, 
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


**Связанный пример**: [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### Получение WBS‑кода задачи

Метод [getWBSCode](api/method/getwbscode.md) возвращает WBS‑код необходимой задачи. Например, загрузим в gantt следующие задачи:

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

и хотим получить WBS‑код задачи с id="3." Для этого передаём объект задачи в качестве параметра методу [getWBSCode](api/method/getwbscode.md). Он вернёт строку с WBS‑кодом задачи:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> returns "1.2"
~~~


### Получение задачи по WBS‑коду

Также можно получить объект задачи, передав его WBS‑код в метод [getWBSCode](api/method/gettaskbywbscode.md):

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## Временные ограничения для задач {#timeconstraintsfortasks}

Можно добавить отдельные колонки грида, которые позволят устанавливать тип [time constraint](guides/auto-scheduling.md#timeconstraintsfortasks) для задачи и дату ограничения, если она требуется выбранным типом.
Эти колонки имеют имена "constraint_type" и "constraint_date" соответственно. 

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

Колонки связаны с объектами inline редакторов, которые позволяют выбрать необходимый тип ограничения для задачи и редактировать её дату прямо в гриде.

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


**Связанный пример**: [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Изменение размера колонок {#resizing}

:::info
Эта функциональность доступна только в версии PRO
:::

Чтобы дать пользователям возможность изменять размер колонки перетаскиванием правой границы колонки, используйте атрибут [resize](api/config/columns.md) в соответствующем объекте колонки:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 'resize' active
    { name: "start_date", resize: true, min_width: 100 }, // limited by 'min_width'
    { name: "duration",   align: "center" },              // no resize
    { name: "add",        width: "44" }
];
~~~


**Связанный пример**: [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


Чтобы заставить весь грид быть изменяемым по перетаскиванию границы, используйте опцию [gantt.config.layout](api/config/layout.md) и внутри укажите объекты grid и resizer с необходимой конфигурацией.

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


Чтобы сохранить размер грида при изменении размера колонок, установите опцию [keep_grid_width](api/config/keep_grid_width.md) в *true*:

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


**Связанный пример**: [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### События

dhtmlxGantt предоставляет 6 событий для обработки поведения изменения размера:

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - срабатывает до того, как пользователь начнёт перетаскивать границу колонки для изменения её размера
- [onColumnResize](api/event/oncolumnresize.md) - срабатывает, когда пользователь перетаскивает границу колонки для изменения её размера
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - срабатывает после того, как пользователь закончил перетаскивать границу колонки для изменения её размера
- [onGridResizeStart](api/event/ongridresizestart.md) - срабатывает до того, как пользователь начнёт перетаскивать границу грида для изменения его размера
- [onGridResize](api/event/ongridresize.md) - срабатывает, когда пользователь перетаскивает границу грида для изменения его размера
- [onGridResizeEnd](api/event/ongridresizeend.md) - срабатывает после того, как пользователь закончил перетаскивать границу грида для изменения его размера


## Видимость {#visibility}

Чтобы управлять видимостью колонки, используйте атрибут [hide](api/config/columns.md) в соответствующем объекте колонки.

Видимость может динамично переключаться, путём изменения значения свойства 'hide' и обновления диаграммы Gantt:

~~~jsx title="Переключение между базовым и детальным видом"
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


**Связанный пример**: [Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)


Вы можете посмотреть видеогид, который демонстрирует, как управлять видимостью колонок в гриде.

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Изменение содержимого ячеек после рендеринга {#modifyingcellsafterrendering}

В некоторых случаях может понадобиться изменить внешний вид или поведение ячейки грида после её рендеринга. 

Н since v7.1 библиотека предоставляет атрибут **onrender** параметра [columns](api/config/columns.md), который поможет вам изменить ячейку после рендеринга, например:

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


Способ использования колбэка **onrender** — внедрение внешних компонентов в ячейки грида. Например, вы используете DHTMLX Gantt с React и хотите внедрить компонент React в ячейки грида Gantt. Ниже приведён пример кода, который демонстрирует, как это реализовать:

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

Чтобы это работало и отображался компонент React, необходимо определить конфигурацию [gantt.config.external_render](api/config/external_render.md):

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


Логика следующая:

- Во‑первых, возвращаемый объект 콜бэка **onrender** будет передан в функцию **isElement** для проверки, является ли он объектом, который может быть отрисован используемым вами фреймворком/библиотекой.
- Если **isElement** возвращает true, объект будет передан в **renderElement**, который должен инициализировать объект компонента внутри DOM‑элемента ячейки.


## Горизонтальная полоса прокрутки

Вы можете сделать Grid прокручиваемым с помощью свойства **scrollable** конфигурационной опции layout. 
[Узнать о привязке представлений макета к полосе прокрутки](guides/layout-config.md#scrollbar).

Наличие горизонтальной полосы прокрутки в гриде позволяет Gantt автоматически подстраивать ширину колонок при изменении ширины грида. [Подробнее о включении этой функциональности](api/config/grid_elastic_columns.md).

Помимо атрибута **scrollable**, нужно добавить в макет *горизонтальную полосу прокрутки* и связать её с гридом следующим образом:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // добавление горизонтальной полосы прокрутки к гриду через атрибут scrollX
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


Так как вы будете отображать отдельные полосы прокрутки для грида и временной шкалы, возможно, стоит синхронизировать их видимость, чтобы обе полосы прокрутки были видимы или скрыты одновременно. 


![scrollable_grid](/img/scrollable_grid.png)

Это можно сделать, назначив обе полосы прокрутки одной и той же *visibility group*:

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
                // горизонтальная полоса прокрутки для грида
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } 
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // горизонтальная полоса прокрутки для временной шкалы
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } 
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

Если хотя бы одна из полос прокрутки, отнесённых к одной и той же группе, видима, то будут видимы все полосы прокрутки этой группы.

**Связанный пример**: [Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## Стилизация

Для информации о стилизации ячеек грида смотрите [Work with Gantt Styles](guides/styling-guide.md#styling-grid).