---
title: "Документация по CSS"
sidebar_label: "Документация по CSS"
---

# Документация по CSS

Эта статья показывает способы переопределения настроек цвета по умолчанию для элементов Gantt с использованием пользовательских значений. В статье рассмотрены основные селекторы классов и шаблоны для стилизации следующих частей Gantt: [Grid area](guides/css-overview.md#styling-grid), [Timeline area](guides/css-overview.md#styling-timeline), [Resource panel](guides/css-overview.md#resource-panel).

## Стилизация грида

В этом разделе вы найдете CSS-селекторы для стилизации основных элементов [ Grid area ].

![grid_area](/img/grid_area.png)

Общая структура DOM-элемента грида приведена ниже:

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

### Заголовок грида

Вы можете изменить стиль элемента Заголовок грида через селектор класса `.gantt_grid_scale`.

Ниже приведён пример применения общего фонового цвета и цвета шрифта для заголовков грида и таймлайна:

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

**Связанный пример**: [Styling grid and timeline headers](https://snippet.dhtmlx.com/akr9tz4h)

### Высота шкалы {#scale_height}

Не изменяйте высоту заголовка грида и шкалы времени через CSS.

Высота шкалы должна задаваться через конфигурационное свойство Gantt: [scale_height](api/config/scale_height.md):

~~~js
gantt.config.scale_height = 50;
~~~

### Ячейка заголовка грида {#grid_header_cell}

Вы можете применить пользовательский стиль к ячейке заголовка грида через `.gantt_grid_head_cell`.

Селекторы для стилизации ячейки приведены ниже:

- `.gantt_grid_head_cell[data-column-id="columnName"]` - выбирает ячейку конкретного столбца;

**columnName** совпадает со значением свойства **name** у [столбца](guides/specifying-columns.md):

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

**Связанный пример**: [Styling a particular cell in the grid header](https://snippet.dhtmlx.com/pf5q56kl)

- `.gantt_grid_head_cell[data-column-index="1"]` - выбирает конкретный столбец по индексу;

- `.gantt_grid_head_cell[data-column-name="start_date"]` - выбирает конкретный столбец по имени.

### Грид-тело

Вы можете добавить собственный цвет элементу тела грида, применив CSS-стили к селектору `.gantt_grid_data`.

![grid_body](/img/grid_body.png)

### Стилизация строк грида {#styling_grid_rows}

Стиль строки грида настраивается через `.gantt_row`.

![grid_row](/img/grid_row.png)

#### Каждая вторая строка

Чтобы окрасить каждую вторую строку грида, необходимо задать стили CSS для селектора `.gantt_row.odd`, например:

~~~css
.gantt_row.odd {
    background-color: #f4f4fb;
}
~~~

![odd_row_style](/img/odd_row_style.png)

**Связанный пример**: [Styling every other row in grid](https://snippet.dhtmlx.com/ayr3sgov)

Вы можете увидеть, что даже строки подсвечиваются на экране, а не нечетные. Но если посмотреть индексы строк (см. gettaskindex), стиль применяется к строкам с нечетными индексами (1, 3, 5 и т.д.).

#### Выбранная строка

Вы можете стилизовать выбранную строку грида с помощью селектора `.gantt_row.gantt_selected`:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
~~~

**Связанный пример**: [Styling selected row](https://snippet.dhtmlx.com/c177qsgx)

#### Задачи, строки проектов и вехи

Для стилизации строк задач, проектов или вех используйте следующие селекторы:

- `.gantt_row.gantt_row_task`
- `.gantt_row.gantt_row_project`
- `.gantt_row.gantt_row_milestone`

Например:

~~~css
.gantt_row.gantt_row_project {
    background-color: #fafafa;
    font-weight: bold;
}
~~~

**Связанный пример**: [Styling rows of project tasks](https://snippet.dhtmlx.com/g5oxrq5v)

#### Частные строки

Если вы хотите добавить пользовательские классы к конкретной строке, можно применить шаблон [grid_row_class](api/template/grid_row_class.md) следующим образом:

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

**Связанный пример**: [Styling a particular row in the grid](https://snippet.dhtmlx.com/9o8pbq8z)

#### Высота ряда

Высоту ряда можно изменить либо с помощью конфигурации [row_height](api/config/row_height.md):

~~~js
gantt.config.row_height = 40;
~~~

или через свойство [row_height](guides/resizing-rows.md#setting-the-row-height) задачи:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2028", duration: 8, row_height: 40 },
~~~

Не пытайтесь изменять высоту ряда через CSS, это может сломать верстку.

### Стилизация ячеек/столбцов грида {#styling_grid_cells}

Стилизацию ячеек или столбцов грида можно осуществлять через `.gantt_row .gantt_cell`.

Вы можете применять CSS-стили к конкретному столбцу двумя способами:

- через селектор `.gantt_row .gantt_cell[data-column-name="columnName"]`, который определяет столбец по его имени, например:

~~~css
.gantt_grid_head_cell[data-column-id="start_date"],
.gantt_row .gantt_cell[data-column-name="start_date"] {
    background-color: #ededed;
    color: black;
}
~~~

**Связанный пример**: [Styling a column in grid](https://snippet.dhtmlx.com/hq5q2hpz)

Обратите внимание, что `.gantt_grid_head_cell` и `.gantt_cell` используют разные дата-атрибуты: `data-column-id` и `data-column-name` соответственно. Это несоответствие в правилах CSS Gantt будет исправлено в одной из будущих версий.

- или же можно добиться того же результата, применив селектор `.gantt_row .gantt_cell[data-column-index="1"]`, который определяет столбец по индексу.

## Стилизация таймлайна

Раздел "Styling Timeline" приведёт вас через CSS-селекторы, которые можно применить, чтобы изменить стиль по умолчанию элементов [таймлайна](guides/time-scale.md).

![timeline](/img/timeline.png)

Общая структура DOM-элемента области таймлайна приведена ниже:

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

### Шкала времени

DOM-элемент шкалы времени имеет следующую структуру:

~~~js
- .gantt_task_scale
    - .gantt_scale_line
        - .gantt_scale_cell
~~~

### Контейнер шкалы времени {#time_scale_container}

Селектор `.gantt_task_scale` используется для применения пользовательского CSS к контейнеру шкалы времени.

Например, изменение цвета шрифта и границ шкалы времени выглядит так:

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

**Связанный пример**: [Styling text and borders of the time scale](https://snippet.dhtmlx.com/qt0ttw64)

### Шкалы времени {#time_scales}

Селектор `.gantt_scale_line` используется для раскрашивания всей шкалы времени. Чтобы нацелиться на конкретную шкалу по её порядку, просто используйте селектор `.gantt_scale_line:nth-child(n)`.

Пример установки цвета фона шкалы времени:

~~~css
.gantt_scale_line:nth-child(1) {
    font-weight: bold;
    background-color: #eee;
}

.gantt_scale_line:nth-child(2) {
    background-color: #fff;
}
~~~

**Связанный пример**: [Background color of the time scale](https://snippet.dhtmlx.com/jl1k7kxr)

По умолчанию CSS-классов для таргетинга шкал по единицам нет, но такие классы можно добавить с помощью шаблона [scale_row_class](api/template/scale_row_class.md).

Ниже приведён пример задания различных стилей для шкал месяцев, недель и дней:

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

**Связанный пример**: [Styling different time scales](https://snippet.dhtmlx.com/g6ogfvvb)

### Ячейки шкалы времени {#timescale_cells}

Вы можете добавлять собственные стили к ячейкам шкалы времени через селектор `.gantt_scale_cell`.
Например, можно изменить цвет шрифта и границы ячеек:

~~~css
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #a6a6a6;
    border-right: 1px solid #ebebeb;
}
~~~

**Связанный пример**: [Styling text and borders of the scale cells](https://snippet.dhtmlx.com/dcfo1yek)

Чтобы окрасить конкретные даты, используйте свойство **css** объекта [gantt.config.scales](api/config/scales.md), как показано ниже:

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

**Связанный пример**: [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

Если нужно закрасить всю колонку, используйте шаблон timeline_cell_class, как описано ниже.

### Область данных {#time_area?}

Структура DOM-элемента области данных имеет следующую форму:

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

### Задача {#task}

#### Панель задачи

Чтобы изменить внешний вид панели задачи, нужно объявить пользовательский стиль в селекторе `.gantt_task_line`.

Пример изменения границы панели приведён ниже:

~~~css
.gantt_task_line {
    border-radius: 14px;
}
~~~

**Связанный пример**: [Styling borders of the task bars](https://snippet.dhtmlx.com/c24kdh89)

Чтобы изменить цвет панелей задач, выполните следующие два шага:

1. Переопределите стили границ и полей прогресса так, чтобы их цвета совпали с любым пользовательским цветом, применяемым к панели задачи:

~~~css
.gantt_task_line {
    border-color: rgba(0, 0, 0, 0.25); /* Черный цвет с 25%-ной непрозрачностью */
}

.gantt_task_line .gantt_task_progress {
    background-color: rgba(0, 0, 0, 0.25);
}
~~~

2. Примените необходимый цвет к самой панели задачи и к содержимому внутри панели задачи:

~~~css
.gantt_task_line {
    background-color: #03A9F4;
}

.gantt_task_line.gantt_task_content {
    color: #fff;
}
~~~

Вы можете найти пример применения общего цвета для границ и индикаторов прогресса на панелях задач с разными цветами в статье [Task Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).

Чтобы окрасить ряды [задач](guides/task-types.md#regular-tasks), [проектов](guides/task-types.md#project-tasks) или [вех](guides/task-types.md#milestones), нужно добавить пользовательский CSS к соответствующему селектору класса:

- `.gantt_task_line.gantt_bar_task`
- `.gantt_task_line.gantt_bar_project`
- `.gantt_task_line.gantt_bar_milestone`

Пример стилизации выбранной панели:

~~~css
.gantt_task_line.gantt_selected {
    box-shadow: 0 2px 5px #000;
}

.gantt_task_line.gantt_bar_project.gantt_selected {
    box-shadow: 0 2px 5px #000;
}
~~~

**Связанный пример**: [Styling selected bar](https://snippet.dhtmlx.com/9c6w6o78)

Задачи [пользовательского типа](guides/task-types.md#creating-a-custom-type) будут иметь соответствующее имя класса:

~~~js {3}
{ id: 2, text: "Task #1", start_date: "02-04-2028", duration: 8, type: "custom_type" },
~~~

Панель задачи получит CSS-класс `.gantt_task_line.gantt_bar_custom_type`.

#### Разделённые задачи

[Split tasks](guides/split-tasks.md) определяются как подзадачи родительского элемента, а светло-зеленая полоса на заднем плане является полосой этого родительского элемента с дополнительными стилями.

![](/img/split_parent_css.png)

**Связанный пример**: [Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)

Если открыть [пример](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html) и развернуть "Task #2", вы увидите зеленую полосу сводного элемента "Task #2".

Когда разделённые задачи отображаются в одной строке, эта зеленая полоса всё равно рисуется в той же позиции, но с изменённой непрозрачностью и значениями z-index.

Её можно оформить так же, как и все полосы в [таймлайне](guides/css-overview.md#styling-timeline), и полностью скрыть с помощью следующего CSS:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~

Когда у вас есть только одна разделённая задача, сводный элемент (`type: "project"`) становится невидимым, потому что полностью перекрывается разделённой задачей. Если разделённых подзадач нет, сводный элемент имеет заданную по умолчанию дату и продолжительность.

#### Полоса прогресса

Следующие селекторы можно использовать для задания цвета полосы прогресса:

- `.gantt_task_progress` - чтобы изменить цвет заполнения полосы прогресса;
- `.gantt_task_progress_drag` - чтобы стилизовать ручку перетаскивания прогресса.

Вы можете изменить внешний вид задач и полос прогресса, применив CSS-правила следующим образом:

- пример изменения фонового, переднего цвета и цветов прогресса:

~~~css
/* задача */

/* фоновый цвет панелей задач */
.gantt_task_line {
    background-color: #3db9d3;
    border: 1px solid #2898b0;
}

/* цвет текста */
.gantt_task_line .gantt_task_content {
    color: #fff;
}

/* заливка прогресса */
.gantt_task_progress {
    background: #299cb4;
}
~~~

- пример стилизации Project(Summary) bars:

~~~css
/* project */
/* фоновый цвет бара проекта */
.gantt_task_line.gantt_bar_project {
    background-color: #65c16f;
    border: 1px solid #3c9445;
}

/* прогресс бара проекта */
.gantt_task_line.gantt_bar_project .gantt_task_progress {
    background-color: #46ad51;
}
~~~

- пример стилизации Milestone bars:

~~~css
/* milestone */
.gantt_task_line.gantt_milestone {
    background-color: #d33daf;
    border: 0 solid #61164f;
}
~~~

**Связанный пример**: [Background, foreground, and progress colors. Styling Project and Milestone bars.](https://snippet.dhtmlx.com/f2rmc1oc)

#### Пользовательский цвет для конкретных панелей задач

Если вам нужно задать цвет для отдельных панелей задач, необходимо присвоить им пользовательский класс, используя шаблон [gantt.templates.task_class](api/template/task_class.md):

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.highlight) {
        return "highlighted_task";
    }
    return "";
};
~~~

и применить этот пользовательский класс в селекторе:

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

**Связанный пример**: [Styling particular task bars](https://snippet.dhtmlx.com/yyoe31vo)

#### Выделение области внутри панели задачи

Если вы хотите выделить определённые области внутри панели задачи, вам нужно внедрить дополнительные элементы в саму панель с использованием шаблона [gantt.templates.task_text](api/template/task_text.md):

~~~js
gantt.templates.task_text = (startDate, endDate, task) => `
    <div class="custom_progress warm_up" style="width: 20%"></div>
    <div class="custom_progress in_progress" style="width: 60%">${task.text}</div>
    <div class="custom_progress cool_down" style="width: 20%"></div>
`;
~~~

и применить CSS:

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

**Связанный пример**: [Custom html content (Stackbar)](https://docs.dhtmlx.com/gantt/samples/04_customization/09_html_content.html)

### Связь {#link}

Структура DOM-элемента связи приведена ниже:

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

Ниже пример того, как можно окрасить элементы зависимых связей:

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

**Связанный пример**: [Styling links](https://snippet.dhtmlx.com/unlr4jbw)

Толщина линии связи устанавливается через конфигурацию [gantt.config.link_line_width](api/config/link_line_width.md) конфигурацию.

### Резайзер {#resizer}

Ниже приведены селекторы, которые можно применить для стилизации DOM-элемента резайзера:

- `.gantt_task_drag`
- `.gantt_task_drag.task_start_date`
- `.gantt_task_drag.task_end_date`

Пример отключения резайзера для даты начала:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_start_date {
    display: none;
}
~~~

**Связанный пример**: [Disabling resizer of the start date](https://snippet.dhtmlx.com/x8lpcu2d)

Пример отключения резайзера для даты конца:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_end_date {
    display: none;
}
~~~

**Связанный пример**: [Disabling resizer of the end date](https://snippet.dhtmlx.com/9gtsg4s8)

### Контроль связи {#link_control}

Следующие селекторы можно использовать для применения стилей к элементу круглой ручки в начале (конце) задачи:

- `.gantt_link_control .gantt_link_point`
- `.gantt_link_control.task_start_date .gantt_link_point`
- `.gantt_link_control.task_end_date .gantt_link_point`

### Фоновый грид {#background_grid}

Структура DOM-элемента фоновой сетки имеет вид:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
~~~

#### Фоновые строки:

Чтобы изменить настройки стиля по умолчанию для фоновых строк, добавьте пользовательский стиль к селектору `.gantt_task_row`. Например:

~~~css
.gantt_row,
.gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Чтобы окрасить каждую вторую фоновую строку, нужно определить пользовательские свойства CSS в селекторе `.gantt_task_row.odd`.

Вы можете легко задать пользовательские цвета для выбранной строки, например:

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

**Связанный пример**: [Styling selected row](https://snippet.dhtmlx.com/y393xnmv)

#### Фоновые ячейки

Чтобы изменить настройки стиля по умолчанию для фоновых ячеек, следует задать стиль в селекторе `.gantt_task_cell`.

Чтобы окрасить фоновый столбец, используйте шаблон [timeline_cell_class](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = (task, date) => {
    if (!gantt.isWorkTime({ date: date, unit: "day", task: task })) {
        return "weekend";
    }
    return "";
};
~~~

и примените CSS:

~~~css
.gantt_task_cell.weekend {
    background-color: #F5F5F5;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
    background-color: #F8EC9C;
}
~~~

**Связанный пример**: [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

## Панель ресурсов

[Панель ресурсов](guides/resource-management.md#resourceviewpanel) состоит из гридов и таймлайнов, аналогичных основной зоне Gantt.

По умолчанию гриды и таймлайны ресурсного вида используют глобальные шаблоны и конфигурации. Вы можете использовать разные конфигурации и шаблоны для панели ресурсов, передав их в конфигурацию раскладки ([layout config](guides/layout-config.md#configs-and-templates-of-views)).

Вы можете нацелить ресурсную сетку и таймлайн, используя соответствующее имя вида в CSS-селекторе:

~~~css
.resourceGrid_cell .gantt_row,
.resourceHistogram_cell .gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Общая структура DOM-элемента панели ресурсов приведена ниже:

~~~js
- .gantt_layout_root
    - .grid_cell
    - .timeline_cell
    - .resourceGrid_cell
    - .resourceHistogram_cell
    - .resourceTimeline_cell
~~~

Имена классов под `.gantt_layout_root` берутся из конфигурации раскладки и соответствуют значению свойства **view** у ячейки раскладки:

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

### Ресурсная грид {#resource_grid}

![resource_grid](/img/resource_grid.png)

Вы можете использовать те же селекторы, что и для задачи грида; верхний уровень селектора — `.resourceGrid_cell`:

~~~css
.resourceGrid_cell .gantt_row,
.resourceGrid_cell .gantt_row.odd {
    background-color: rgba(232, 232, 232, 0.6);
}
~~~

### Ресурсная гистограмма {#resource_histogram}

![resource_histogram_css](/img/resource_histogram_css.png)

Ресурсная гистограмма имеет те же элементы, что и основная временная шкала. По умолчанию все селекторы, нацеленные на основную временную шкалу, будут нацелены и на ресурсную шкалу, если только вы не используете класс ячейки раскладки (`.timeline_cell`, `.resourceHistogram_cell`) в своих селекторах.

Вы можете нацелить ресурсную гистограмму с помощью следующего селектора: `.resourceHistogram_cell`.

Общая структура DOM-элемента ресурсной гистограммы:

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

Пример изменения цвета элементов гистограммы:

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

Чтобы изменить цвет конкретных ячеек, используйте шаблон [gantt.templates.histogram_cell_class](api/template/histogram_cell_class.md):

~~~js
gantt.templates.histogram_cell_class = (startDate, endDate, resource, resourceTasks) => {
    if (getAllocatedValue(resourceTasks, resource) > getCapacity(startDate, resource)) {
        return "column_overload";
    }
};
~~~

и примените CSS:

~~~css
.column_overload .gantt_histogram_fill {
    background-color: #ffa9a9;
}
~~~

Чтобы окрасить линию гистограммы, можно применить пользовательский CSS к следующим классам селекторов:

- `.gantt_histogram_hor_bar`
- `.gantt_histogram_vert_bar`

Изменение цвета линии гистограммы выглядит так:

~~~css
.gantt_histogram_hor_bar, .gantt_histogram_vert_bar {
    background: #299db4;
}
~~~

### Рисунок ресурса {#resource_diagram}

![resource_diagram](/img/resource_diagram.png)

Рисунок ресурса имеет те же элементы, что и основная временная шкала. По умолчанию все селекторы, нацеленные на основную временную шкалу, будут нацелены и на ресурсную шкалу, если только вы не используете класс ячейки раскладки (`.timeline_cell`, `.resourceTimeline_cell`) в своих селекторах.

Вы можете нацелить ресурсную диаграмму с помощью следующего селектора: `.resourceTimeline_cell`.

Общая структура DOM-элемента ресурсной диаграммы:

~~~js
- .gantt_task_bg
- .gantt_bars_area
    - div
        - .gantt_resource_marker
            - div
~~~

Верхний уровень селектора — `.resourceTimeline_cell`.

Пример стиля для меток ресурсной диаграммы:

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

Чтобы изменить стиль конкретных маркеров, используйте шаблон [gantt.templates.resource_cell_class](api/template/resource_cell_class.md):

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