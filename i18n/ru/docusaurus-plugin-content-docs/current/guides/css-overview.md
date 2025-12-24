---
title: "Документация по CSS"
sidebar_label: "Документация по CSS"
---

# Документация по CSS


В этой статье объясняется, как переопределить стандартные цветовые настройки элементов диаграммы Gantt с помощью собственных стилей. Описаны основные CSS-селекторы и шаблоны для стилизации различных частей диаграммы Gantt: [Грид](guides/css-overview.md#stylinggrid), [Таймлайн](guides/css-overview.md#stylingtimeline) и [Панель ресурсов](guides/css-overview.md#resourcepanel).

## Стилизация грида {#stylinggrid}


Здесь приведены CSS-селекторы, используемые для стилизации основных элементов [грида](guides/table.md).

![grid_area](/img/grid_area.png)

DOM-структура элемента грида выглядит следующим образом:

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

<h3 id="grid_header"><b>Заголовок грида</b></h3>

Стиль заголовка грида можно изменить с помощью селектора класса **.gantt_grid_scale**.

Пример задания общего фона и цвета шрифта для заголовков грида и таймлайна:

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


**Related example:** [Styling grid and timeline headers](https://snippet.dhtmlx.com/akr9tz4h)


### Высота шкалы {#scale_height}

Избегайте изменения высоты заголовка грида и временной шкалы через CSS.

Вместо этого используйте свойство конфигурации [scale_height](api/config/scale_height.md) для Gantt:

~~~js
gantt.config.scale_height = 50;
~~~

### Ячейка заголовка грида {#grid_header_cell}

Для стилизации ячейки в заголовке грида используйте селектор **.gantt_grid_head_cell**.

Селекторы для выбора ячейки:

- **.gantt_grid_head_cell[data-column-id='columnName']** - выбирает ячейку определённой колонки;

Здесь **columnName** соответствует свойству **name** у [колонки](guides/specifying-columns.md):

~~~css
<style>
    .gantt_grid_head_cell[data-column-id='columnName'] {
        background-color: #ededed;
        color:black;
    }
</style>
~~~

~~~js
gantt.config.columns = [
    ...
    {name: "columnName", align: "center"},
    ...
];
~~~

![header_cell](/img/header_cell.png)


**Related example:** [Styling a particular cell in the grid header](https://snippet.dhtmlx.com/pf5q56kl)


- **.gantt_grid_head_cell[data-column-index='1']** - выбор колонки по индексу;

- **.gantt_grid_head_cell[data-column-name='start_date']** - выбор колонки по имени.

<h3 id="grid_body"><b>Тело грида</b></h3>

Вы можете изменить цвет фона тела грида, применяя стили к селектору **.gantt_grid_data**.

![grid_body](/img/grid_body.png)

### Стилизация строк грида {#styling_grid_rows}

Стиль строк грида можно изменить с помощью селектора **.gantt_row**.

![grid_row](/img/grid_row.png)

#### Каждая вторая строка

Чтобы стилизовать чередующиеся строки, используйте селектор **.gantt_row.odd**, например:

~~~css
.gantt_row.odd{
    background-color:#f4f4fb;
}
~~~

![odd_row_style](/img/odd_row_style.png)


**Related example:** [Styling every other row in grid](https://snippet.dhtmlx.com/ayr3sgov)


Хотя на экране выделяются чётные строки, стиль применяется к строкам с нечётными индексами (1, 3, 5 и т.д.), как указано в [индексах строк](api/method/gettaskindex.md).

#### Выделенная строка

Для стилизации выделенной строки в гриде используйте селектор **.gantt_row.gantt_selected**:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
~~~


**Related example:** [Styling selected row](https://snippet.dhtmlx.com/c177qsgx)


#### Строки задач, проектов и вех

Строки, представляющие задачи, проекты или вехи, можно стилизовать с помощью следующих селекторов:

- **.gantt_row.gantt_row_task**
- **.gantt_row.gantt_row_project**
- **.gantt_row.gantt_row_milestone**

Например:

~~~css
.gantt_row.gantt_row_project{
   background-color:#fafafa;
   font-weight: bold;
}
~~~


**Related example:** [Styling rows of project tasks](https://snippet.dhtmlx.com/g5oxrq5v)


#### Отдельные строки

Чтобы добавить собственные классы к определённым строкам, используйте шаблон [grid_row_class](api/template/grid_row_class.md) следующим образом:

~~~css
<style>
    .highlighted_task.gantt_row { 
        background-color: #ff9668;
        border-color: rgba(0,0,0,0.3);
    }    
</style>
~~~

~~~js
gantt.templates.grid_row_class = function(start, end, task){
    if(task.highlight){
        return "highlighted_task"; /*!*/
    }
    return "";
};
~~~


**Related example:** [Styling a particular row in the grid](https://snippet.dhtmlx.com/9o8pbq8z)


#### Высота строки

Высоту строки можно изменить, установив параметр конфигурации [row_height](api/config/row_height.md):

~~~js
gantt.config.row_height = 40;
~~~

или задав свойство [row_height](guides/resizing-rows.md#settingtherowheight) для задачи:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2018", 
    duration: 8, row_height:40, parent: 1 },
~~~

Не рекомендуется изменять высоту строки через CSS, так как это может нарушить верстку.

### Стилизация ячеек/колонок грида {#styling_grid_cells}

Ячейки или колонки грида можно стилизовать через **.gantt_row .gantt_cell**.

Для стилизации конкретной колонки используйте:

- **.gantt_row .gantt_cell[data-column-name='columnName']** - выбор колонки по имени, например:

~~~css
.gantt_grid_head_cell[data-column-id='start_date'],
.gantt_row .gantt_cell[data-column-name='start_date'] {
    background-color: #ededed;
    color:black;
}
~~~


**Related example:** [Styling a column in grid](https://snippet.dhtmlx.com/hq5q2hpz)


Обратите внимание, что **.gantt_grid_head_cell** и **.gantt_cell** используют разные data-атрибуты: `data-column-id` и `data-column-name` соответственно. Это несоответствие будет исправлено в будущих версиях.

- Также можно использовать **.gantt_row .gantt_cell[data-column-index='1']** для выбора колонки по индексу.

## Стилизация таймлайна {#stylingtimeline}


В этом разделе описаны CSS-селекторы для изменения стандартных стилей элементов [таймлайна](guides/time-scale.md).

![timeline](/img/timeline.png)

DOM-структура области таймлайна:

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

<h3 id="time_scale"><b>Временная шкала</b></h3>

DOM-структура временной шкалы:

~~~js
- .gantt_task_scale
    - .gantt_scale_line
        - .gantt_scale_cell
~~~

### Контейнер временной шкалы {#time_scale_container}

Селектор **.gantt_task_scale** применяется к контейнеру временной шкалы.

Например, для изменения цвета шрифта и границ временной шкалы:

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


**Related example:** [Styling text and borders of the time scale](https://snippet.dhtmlx.com/qt0ttw64)


### Временные шкалы {#time_scales}

Используйте селектор **.gantt_scale_line** для стилизации всей временной шкалы. Для выбора определённой шкалы по позиции используйте **.gantt_scale_line:nth-child(n)**.

Пример задания разных цветов фона для разных шкал:

~~~css
.gantt_scale_line:nth-child(1){
    font-weight:bold;
    background-color:#eee;
}
.gantt_scale_line:nth-child(2){
    background-color:#fff;
}
~~~


**Related example:** [Background color of the time scale](https://snippet.dhtmlx.com/jl1k7kxr)


По умолчанию нет CSS-классов для выбора шкал по их единицам времени, но вы можете добавить их через шаблон [scale_row_class](api/template/scale_row_class.md).

Пример стилизации различных шкал - **month**, **week**, **day**:

~~~css
<style>
    .gantt_scale_line.month_scale{
        font-weight:bold;
        background-color:#ddd;
    }
    .gantt_scale_line.week_scale{
        background-color:#e1e1e1;
    }  
  
    .gantt_scale_line.day_scale{
        background-color:#efefef;
    }
</style>
~~~

~~~js
gantt.templates.scale_row_class = function(scale){
    return scale.unit + "_scale";
};
~~~


**Related example:** [Styling different time scales](https://snippet.dhtmlx.com/g6ogfvvb)


### Ячейки временной шкалы {#timescale_cells}

Стилизация отдельных ячеек временной шкалы осуществляется с помощью селектора **.gantt_scale_cell**.

Например, изменение цвета шрифта и границ:

~~~css
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #a6a6a6;
    border-right: 1px solid #ebebeb;
}
~~~


**Related example:** [Styling text and borders of the scale cells](https://snippet.dhtmlx.com/dcfo1yek)


Чтобы [выделить определённые даты](guides/configuring-time-scale.md#styling) на временной шкале, используйте свойство **css** объекта [gantt.config.scales](api/config/scales.md) следующим образом:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%Y %M"},
    {unit: "day", step: 1, format: "%l, %F %d", css: function(date){
        if(!gantt.isWorkTime({date: date, unit: "day"})){
            return "weekend";
        }
        return "";
    }}
];
~~~

~~~css
<style>
    .gantt_scale_cell.weekend {
        background-color: #F5F5F5;
    }
</style>
~~~


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


Если требуется окрасить целый столбец, используйте шаблон **timeline_cell_class**, который будет рассмотрен далее.

<h3 id="data_area"><b>Область данных</b></h3>

DOM-структура области данных:

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

Чтобы настроить внешний вид панели задачи, определите собственный стиль для селектора **.gantt_task_line**.

Вот пример, который изменяет стиль границы панели:

~~~css
.gantt_task_line {
    border-radius: 14px;
}
~~~


**Related example:** [Styling borders of the task bars](https://snippet.dhtmlx.com/c24kdh89)


Чтобы изменить цвет панелей задач, выполните два шага:

1. Переопределите стили для границ и индикаторов прогресса, чтобы их цвета соответствовали любым пользовательским цветам, применённым к панели задачи:

~~~css
.gantt_task_line{
    border-color: rgba(0, 0, 0, 0.25); /* Чёрный цвет с 25% прозрачностью */
}
.gantt_task_line .gantt_task_progress {
    background-color: rgba(0, 0, 0, 0.25);
}
~~~

2. Задайте желаемый цвет для панели задачи и содержимого внутри неё:

~~~css
.gantt_task_line{
    background-color: #03A9F4;
}
.gantt_task_line.gantt_task_content {
    color: #fff;
}
~~~

Пример того, как применить совпадающие цвета границ и индикаторов прогресса для панелей задач с разными цветами, можно найти в статье [Task Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).


Чтобы окрасить строки для [задач](guides/task-types.md#regulartasks), [проектов](guides/task-types.md#projecttasks) или [вех](guides/task-types.md#milestones), добавьте пользовательский CSS для соответствующих классов-селекторов:

- **.gantt_task_line.gantt_bar_task**
- **.gantt_task_line.gantt_bar_project**
- **.gantt_task_line.gantt_bar_milestone**

Вот пример стилизации выбранной панели:

~~~css
.gantt_task_line.gantt_selected {
    box-shadow: 0 2px 5px #000;
}

.gantt_task_line.gantt_bar_project.gantt_selected {
    box-shadow: 0 2px 5px #000;
}
~~~


**Related example:** [Styling selected bar](https://snippet.dhtmlx.com/9c6w6o78)


Задачи [пользовательского типа](guides/task-types.md#creatingacustomtype) получают имя класса, отражающее этот тип:

~~~js
{ 
    id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
    type:"custom_type", parent: 1 /*!*/
},
~~~

Это соответствует селектору **.gantt_task_line.gantt_bar_custom_type**.

#### Разделённые задачи

[Разделённые задачи](guides/split-tasks.md) являются подзадачами родительского элемента. Светло-зелёная панель на заднем плане представляет панель родительского элемента, стилизованную иначе.

![](/img/split_parent_css.png)


[Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)


Если открыть [пример](https://docs.dhtmlx.com/gantt/samples/) и развернуть 'Task #2', вы увидите зелёную панель элемента 'Task #2' (суммарная задача).

Когда разделённые задачи отображаются в одной строке, эта зелёная панель остаётся на том же месте, но с изменённой прозрачностью и z-index.

Вы можете стилизовать её так же, как любую другую панель на [таймлайне](guides/css-overview.md#stylingtimeline), либо полностью скрыть с помощью следующего CSS:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~


Если существует только одна разделённая задача, суммарный элемент (type=""project")" становится невидимым, так как полностью перекрывается разделённой задачей. Если подзадачи отсутствуют, суммарный элемент сохраняет дату и длительность по умолчанию.

#### Индикатор прогресса

Используйте следующие селекторы для стилизации индикатора прогресса:

- **.gantt_task_progress** - чтобы изменить цвет заливки индикатора прогресса;
- **.gantt_task_progress_drag** - для стилизации элемента перетаскивания индикатора прогресса.

Примеры настройки панелей задач и индикаторов прогресса с помощью CSS:

- Изменение фона, цвета текста и прогресса:

~~~css
/* задача */

/* цвет фона панели задачи */
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

- Стилизация панелей проектов (суммарных задач):

~~~css
/* проект */
/* цвет фона панели проекта */
.gantt_task_line.gantt_bar_project {
    background-color: #65c16f;
    border: 1px solid #3c9445;
}

/* прогресс панели проекта */
.gantt_task_line.gantt_bar_project .gantt_task_progress {
    background-color: #46ad51;
}
~~~

- Стилизация панелей вех:

~~~css
/* веха */
.gantt_task_line.gantt_milestone {
    background-color: #d33daf;
    border: 0 solid #61164f;
}
~~~


**Related example:** [Background, foreground, and progress colors. Styling Project and Milestone bars.](https://snippet.dhtmlx.com/f2rmc1oc)


#### Пользовательский цвет для отдельных панелей задач

Чтобы назначить цвет определённым панелям задач, добавьте пользовательский класс через шаблон [gantt.templates.task_class](api/template/task_class.md):

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.highlight){
        return "highlighted_task";
    }
    return "";
};
~~~

Затем стилизуйте этот класс в CSS:

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


**Related example:** [Styling particular task bars](https://snippet.dhtmlx.com/yyoe31vo)


#### Подсветка области внутри панели задачи

Чтобы подсветить определённые области внутри панели задачи, добавьте дополнительные элементы в панель с помощью шаблона [gantt.templates.task_text](api/template/task_text.md):

~~~js
gantt.templates.task_text = function(start, end, task){
    return '<div class="custom_progress warm_up" style="width:20%"></div>' +
      '<div class="custom_progress in_progress" style="width:60%">'+task.text+'</div>'
      '<div class="custom_progress cool_down" style="width:20%"></div>';
};
~~~

Затем определите стили для этих элементов:

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


[Custom html content (Stackbar)](https://docs.dhtmlx.com/gantt/samples/04_customization/09_html_content.html)


### Связь {#link}

DOM-структура связи выглядит так:

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

Пример окраски элементов связи:

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


**Related example:** [Styling links](https://snippet.dhtmlx.com/unlr4jbw)


Толщина линии связи регулируется параметром [gantt.config.link_line_width](api/config/link_line_width.md).

### Изменение размера {#resizer}

Эти селекторы предназначены для элементов изменения размера:

- **.gantt_task_drag**
- **.gantt_task_drag.task_start_date**
- **.gantt_task_drag.task_end_date**

Чтобы отключить изменение размера для даты начала, используйте:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_start_date{
    display: none;
}
~~~


**Related example:** [Disabling resizer of the start date](https://snippet.dhtmlx.com/x8lpcu2d)


Чтобы отключить изменение размера для даты окончания, используйте:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_end_date{
    display: none;
}
~~~


**Related example:** [Disabling resizer of the end date](https://snippet.dhtmlx.com/9gtsg4s8)


### Контрол связи {#link_control}

Используйте эти селекторы для стилизации круглых элементов управления связью в начале или конце задачи:

- **.gantt_link_control .gantt_link_point**
- **.gantt_link_control.task_start_date .gantt_link_point**
- **.gantt_link_control.task_end_date .gantt_link_point**

### Фоновый грид {#background_grid}

DOM-структура фонового грида следующая:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
~~~


#### Фоновые строки:

Чтобы изменить стиль фоновых строк по умолчанию, добавьте свои стили к селектору **.gantt_task_row**. Например:

~~~css
.gantt_row,
.gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Чтобы окрасить каждую вторую фоновую строку иначе, определите пользовательские стили для **.gantt_task_row.odd**.

Также можно задать стили для выбранных строк следующим образом:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
.gantt_task_row.gantt_selected .gantt_task_cell{
    border-right-color: #ffec6e;
}
~~~


**Related example:** [Styling selected row](https://snippet.dhtmlx.com/y393xnmv)


#### Фоновые ячейки

Чтобы изменить стиль фоновых ячеек по умолчанию, определите собственный стиль с помощью селектора **.gantt_task_cell**.

Для окрашивания фоновых колонок используйте шаблон [timeline_cell_class](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if(!gantt.isWorkTime({date: date, unit: "day", task: task})){
        return "weekend";
    }
    return "";
};
~~~

Затем примените следующий CSS:

~~~css
.gantt_task_cell.weekend {
    background-color: #F5F5F5;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
    background-color: #F8EC9C;
}
~~~


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


## Панель ресурсов {#resourcepanel}


[Панель ресурсов](guides/resource-management.md#resourceviewpanel) включает гриды и временные шкалы, аналогичные тем, что используются в основной области Gantt.

По умолчанию гриды и временные шкалы в представлении ресурсов используют глобальные шаблоны и конфигурации. Для панели ресурсов можно назначить отдельные шаблоны и конфиги, передав их в [layout config](guides/layout-config.md#configsandtemplatesofviews).

Для стилизации грида и временной шкалы ресурсов используйте CSS-селекторы, нацеленные на соответствующие имена представлений:

~~~css
.resourceGrid_cell .gantt_row,
.resourceHistogram_cell .gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

DOM-структура панели ресурсов выглядит следующим образом:

~~~js
- .gantt_layout_root
    - .grid_cell 
    - .timeline_cell 
    - .resourceGrid_cell 
    - .resourceHistogram_cell 
    - .resourceTimeline_cell
~~~

Названия классов под **.gantt_layout_root** соответствуют значениям свойства **view** в layout config:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "grid", group:"grids", scrollY: "scrollVer"}, /*!*/
                ...
            ]
        },
        ...
        {
            id: "resources",
            cols: [
                { view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" }, /*!*/
                ...
                { view: "resourceHistogram", capacity:24, scrollX: "scrollHor", /*!*/ 
                    scrollY: "resourceVScroll" }, 
                ...
            ]
        },
        ...
    ]
};
~~~

### Грид ресурсов {#resource_grid}

![](//img/resource_grid.png)

Грид ресурсов использует те же селекторы, что и грид задач, с **.resourceGrid_cell** в качестве верхнего селектора:

~~~css
.resourceGrid_cell .gantt_row,
.resourceGrid_cell .gantt_row.odd{
    background-color: rgba(232, 232, 232, 0.6);
}
~~~

### Гистограмма ресурсов {#resource_histogram}

![](//img/resource_histogram_css.png)

Гистограмма ресурсов использует элементы основной временной шкалы. По умолчанию селекторы, нацеленные на основную временную шкалу, также применяются к временной шкале ресурсов, если селекторы не уточнены с помощью классов layout cell, таких как **.timeline_cell** или **.resourceHistogram_cell**.

Чтобы нацелить стиль именно на гистограмму ресурсов, используйте селектор **.resourceHistogram_cell**.

DOM-структура гистограммы ресурсов включает:

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

Пример стилизации элементов гистограммы:

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

Чтобы стилизовать отдельные ячейки, используйте шаблон [gantt.templates.histogram_cell_class](api/template/histogram_cell_class.md):

~~~js
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks) {
    if (getAllocatedValue(tasks, resource) > getCapacity(start_date, resource)) {
        return "column_overload"
    }
};
~~~

Примените CSS для выделения таких ячеек:

~~~css
.column_overload .gantt_histogram_fill {
    background-color: #ffa9a9;
}
~~~

Для настройки линий гистограммы используйте CSS для следующих селекторов:

- **.gantt_histogram_hor_bar**
- **.gantt_histogram_vert_bar**

Например, чтобы изменить их цвет:

~~~css
.gantt_histogram_hor_bar, .gantt_histogram_vert_bar {
    background: #299db4;
}
~~~

### Диаграмма ресурсов {#resource_diagram}

![](//img/resource_diagram.png)

Диаграмма ресурсов использует те же элементы, что и основная временная шкала. По умолчанию селекторы, нацеленные на основную временную шкалу, также применяются здесь, если не ограничены классами layout cell, такими как **.timeline_cell** или **.resourceTimeline_cell**.

Селектор **.resourceTimeline_cell** можно использовать для стилизации именно диаграммы ресурсов.

DOM-структура диаграммы ресурсов включает:

~~~js
- .gantt_task_bg
- .gantt_bars_area
    - div
        - .gantt_resource_marker
            - div
~~~

Верхний селектор - **.resourceTimeline_cell**.

Пример стиля для меток диаграммы ресурсов:

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

Для настройки стилей отдельных маркеров используйте шаблон [gantt.templates.resource_cell_class](api/template/resource_cell_class.md):

~~~css
<style>
    .resource_marker.workday_over div {
        border-radius: 3px;
        background: #ff8686;
    }
~~~

~~~js
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks){
    var css = [];
    css.push("resource_marker");
    if (tasks.length <= 1) {
        css.push("workday_ok");
    } else {
        css.push("workday_over");
    }
    return css.join(" ");
};
~~~

