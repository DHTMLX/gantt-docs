---
title: "Работа со стилями Gantt"
sidebar_label: "Работа со стилями Gantt"
---

# Работа со стилями Gantt


dhtmlxGantt предлагает широкий спектр возможностей для настройки внешнего вида. Вы можете [применить одну из предустановленных тем для изменения общего вида диаграммы Gantt](guides/skins.md) или настроить стили отдельных элементов, таких как задачи, связи, шкала, грид и другие.

В этом руководстве собраны общие инструкции по стилизации различных частей диаграммы Gantt, чтобы упростить навигацию по документации. Для получения подробной информации по каждому конкретному элементу обращайтесь к соответствующим статьям.

## Стилизация грида


Внешний вид области грида можно изменить с помощью [Шаблоны грида](guides/table-templates.md).

### Заголовки столбцов грида

Существует шаблон [grid_header_class](api/template/grid_header_class.md), который позволяет применять собственные стили к заголовкам столбцов грида. Например, вы можете изменить цвет фона определённых заголовков следующим образом:

~~~js
<style>
      .updColor{
        background-color:#ffeb8a!important;
      }
</style>
~~~

~~~js
gantt.templates.grid_header_class = function(columnName, column){
  if(columnName == 'duration' ||columnName == 'text')
    return "updColor";
};
~~~

![styling_columns_headers](/img/styling_columns_headers.png)


**Related example:** [Styling Headers of Grid Columns](https://snippet.dhtmlx.com/j01gqhtj)


### Пользовательские элементы в заголовке грида

Вы можете добавить пользовательские элементы, такие как кнопки, иконки или поля ввода, в заголовок грида. Для этого задайте HTML-элемент в качестве значения свойства **label** в опции конфигурации [**gantt.config.columns**](api/config/columns.md):

~~~js
gantt.config.columns = [
  {name:"add", label:"", width:50, align:"left" },
  {name:"text", label:"<div class='searchEl'>Task name <input id='search' type='text'"+   /*!*/
      "placeholder='Search tasks...'></div>", width:250, tree:true},                          /*!*/
    // другие столбцы
];
~~~

Вот как реализован поиск:

~~~js 
var inputEl = document.getElementById('search');

inputEl.oninput = function(){
  gantt.refreshData();
}

function hasSubstr(parentId){
  var task = gantt.getTask(parentId);
  if(task.text.toLowerCase().indexOf(inputEl.value.toLowerCase() ) !== -1)
    return true;

  var child = gantt.getChildren(parentId);
  for (var i = 0; i < child.length; i++) {
    if (hasSubstr(child[i]))
      return true;
  }
  return false;
}

gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
  if (hasSubstr(id))
    return true;
  
      return false;
});
~~~

![custom_elements_grid_header](/img/custom_elements_grid_header.png)


**Related example:** [Custom Elements in Grid Header](https://snippet.dhtmlx.com/8jilpcrg)


#### Иконки и изображения в заголовке грида

Чтобы добавить изображение или иконку в заголовок, вставьте их во внутренний HTML ячейки с помощью свойства **label**:

~~~js
var textLabel = [
    "<div class='gantt-text-label'>"+
    "<img src='http://docs.dhtmlx.com/scheduler/assets/index/icon1.png'>"+
    "<span>Text</span>" +
    "</div>"
].join("");

gantt.config.columns = [
    {name: "text", label:textLabel,tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~


**Related example:** [Images in Grid Header: Columns Config](https://snippet.dhtmlx.com/5/55086fc42)


В качестве альтернативы можно стилизовать ячейку заголовка с помощью CSS-селектора **.gantt_grid_head_<columnName>**:

~~~css
.gantt_grid_head_text  {
    background-image:url('http://docs.dhtmlx.com/scheduler/assets/index/icon1.png');
    background-repeat:no-repeat;  
}
~~~

![custom_elements_grid_header_image](/img/custom_elements_grid_header_image.png)


**Related example:** [Images in Grid Header:CSS](https://snippet.dhtmlx.com/5/e13d18a10)


### Многострочный текст в заголовке грида

См. пример в разделе [Как отобразить несколько строк в ячейке/заголовке грида](guides/how-to.md#howtodisplayseverallinesinthegridcellheader).

### Цвет фона строк грида

Вы можете задать индивидуальный цвет фона для всех или отдельных строк грида, содержащих задачи, с помощью шаблона [grid_row_class](api/template/grid_row_class.md). Например, чтобы изменить цвет фона определённой строки:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important;  
  }
</style>
~~~

~~~js
gantt.templates.grid_row_class = function(start, end, task){
 if(task.id == 12)
    return "updColor";
};
~~~

![grid_row_bg](/img/grid_row_bg.png)


**Related example:** [Coloring Grid Rows](https://snippet.dhtmlx.com/y0dbph4x)


### Цвет строки грида при наведении

Чтобы подсветить строку грида при наведении, примените следующие правила стилей:

~~~js
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected{
    background-color: cyan; 
}
~~~

![grid_row_hover_color](/img/grid_row_hover_color.png)


**Related example:** [Coloring Grid Rows on Hover](https://snippet.dhtmlx.com/730ig4ck)


### Настройка столбцов грида {#customizationgridcolumns}

dhtmlxGantt позволяет настраивать внешний вид столбцов грида с помощью атрибута **template** в опции конфигурации [**gantt.config.columns**](api/config/columns.md).

Атрибут **template** - это функция, которая получает объект данных и возвращает итоговое содержимое. Это позволяет создавать практически любую кастомизацию содержимого. Например, вы можете изменить цвет текста в строках грида или использовать пользовательские элементы в столбцах грида.

#### Цвет текста в строках грида

Чтобы задать определённый цвет текста для задач в зависимости от их приоритета, выполните следующее:

~~~js
gantt.config.columns="["
    {name:"text",       label:"Task name",  tree:true, width:230, template:myFunc },   /*!*/
    {name:"start_date", label:"Start time", align: "center" },
    {name:"duration",   label:"Duration",   align: "center" }
];

function myFunc(task){
    if(task.priority ==1)
        return "<div class='important'>"+task.text+" ("+task.users+") </div>";
    return task.text+" ("+task.users+")";
};
~~~

![columns_text_color](/img/columns_text_color.png)


[Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)


#### Пользовательские элементы в столбцах грида

Чтобы добавить пользовательские элементы, такие как кнопки или поля ввода, в столбцы грида, задайте HTML-элемент в качестве атрибута **template** столбца:

~~~js
var colContent = function (task) {
    return ('<i class="fa gantt_button_grid gantt_grid_edit fa-pencil"'+
                'onclick="clickGridButton(' + task.id + ', 'edit')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_add fa-plus"'+
                'onclick="clickGridButton(' + task.id + ', 'add')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_delete fa-times"'+
                'onclick="clickGridButton(' + task.id + ', 'delete')"></i>');
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true},
    {name: "duration", align: "center"},
    {name: "buttons", label: colHeader, width: 75, template: colContent}  /*!*/
];
~~~

![custom_elements_grid_columns](/img/custom_elements_grid_columns.png)


[Custom Buttons in a Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/07_custom_buttons.html)


#### Обрезка длинного текста с многоточием в столбцах грида

Gantt автоматически сокращает длинный текст в строках грида.

Начиная с версии 7.0, вы можете обрезать длинное содержимое в строках грида с помощью многоточия, переопределив соответствующий CSS-класс - **.gantt_tree_content**:

~~~js
<style>
.gantt_tree_content {
    overflow:hidden;
    text-overflow: ellipsis;
}
</style>

gantt.init("gantt_here");
~~~

![truncate_text](/img/truncate_text.png)


**Related example:** [Truncate long text with ellipsis](https://snippet.dhtmlx.com/d82twxd8)


#### Многострочный текст в ячейках грида

См. примеры в разделе [Как отобразить несколько строк в ячейке/заголовке грида](guides/how-to.md#howtodisplayseverallinesinthegridcellheader).

## Стилизация шкалы


Внешний вид шкалы управляется с помощью соответствующих [шаблонов области временной шкалы](guides/timeline-templates.md).

### Строка шкалы

Вы можете стилизовать строку шкалы с помощью шаблона **scale_row_class**. Например, чтобы задать цвет фона:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important      
  }
</style>
~~~

~~~js
gantt.templates.scale_row_class = function(scale){           
    return "updColor";
}
~~~

![color_scale_row](/img/color_scale_row.png)
 

**Related example:** [Styling Row of the Scale](https://snippet.dhtmlx.com/7ngm6yzk)


### Ячейки шкалы

Также можно стилизовать отдельные ячейки шкалы с помощью шаблона **scale_cell_class**. Например, чтобы выделить выходные в области временной шкалы:

~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "updColor";
    }
};
~~~

![styling_scale_cells](/img/styling_scale_cells.png)


**Related example:** [Styling Separate Cells on the Scale](https://snippet.dhtmlx.com/emdjgwln)


Подробнее см. в [Настройка шкалы](guides/configuring-time-scale.md#settingthescalesstyle) и [Выделение временных слотов](guides/highlighting-time-slots.md).

### Подшкала

Новый стиль можно назначить шкале через атрибут **css** свойства [scales](api/config/scales.md). Например, чтобы выделить выходные другим цветом:

~~~js
<style type="text/css">
    .weekend{
        background: #F0DFE5 !important;
    }
</style>
~~~

~~~js
var daysStyle = function(date){
    var dateToStr = gantt.date.date_to_str("%D");
    if (dateToStr(date) == "Sun"||dateToStr(date) == "Sat")  return "weekend";

    return "";
};

gantt.config.scales = [
    {unit:"day", format:"%D", css:daysStyle }
];
~~~

![styling_subscale](/img/styling_subscale.png)


[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


## Стилизация задач


Стилизация задач настраивается с помощью соответствующих [шаблонов области временной шкалы](guides/timeline-templates.md).

### Полоса задачи

Вы можете переопределить шаблон [task_class](api/template/task_class.md) для изменения стилей задач. Подробнее см. в [Окрашивание задач](guides/colouring-tasks.md#redefiningthetaskstemplate).

~~~js
gantt.templates.task_class = function(start, end, task){return "";};
~~~

![coloring_tasks](/img/coloring_tasks.png)


[Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


Шаблоны поддерживают динамическую стилизацию. Например, можно менять цвета в зависимости от прогресса задачи:

~~~js
gantt.templates.task_class = function(start,end,task){
    if(task.progress > 0.5){
        return "";
    }else{
        return "important";
    }
};
~~~

![dynamic_styling](/img/dynamic_styling.png)


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


### Текст на полосе задачи

Шаблон [task_text](api/template/task_text.md) позволяет применять инлайн-стилизацию к тексту на полосе задачи:

~~~js
gantt.templates.task_text = function(start, end, task){
  if(task.id == 12)
    return "<span style='color:red'>"+task.text+"</span>";
  
  return task.text;
};
~~~

![inline_styling_task_text](/img/inline_styling_task_text.png)


**Related example:** [Inline Styling of the Task Text](https://snippet.dhtmlx.com/us1g45wg)


#### Многострочный текст

См. [пример](https://snippet.dhtmlx.com/55uy7ibo) в разделе [Как отобразить несколько строк в ячейке/заголовке грида](guides/how-to.md#howtodisplayseverallinesinthegridcellheader).

### Пользовательские элементы в полосах задач

Можно также добавить пользовательские элементы внутрь полос задач с помощью шаблона [task_text](api/template/task_text.md). Например, так можно вставить кнопки:

~~~js
gantt.templates.task_text = function(start, end, task){  
  return task.text+" <button>Text</button>";    
};
~~~

![custom_elements_task_bars](/img/custom_elements_task_bars.png)


**Related example:** [Custom Elements in Task Bars](https://snippet.dhtmlx.com/fahpyr58)


### Задание стиля через свойства объекта задачи

Вы можете настроить цвет задачи, добавив дополнительные свойства в конфигурацию объекта задачи. Доступные свойства: **color**, **textColor**, и **progressColor**.

~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
        duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getTask(1).color = "red"
~~~

Подробнее смотрите в соответствующем разделе статьи [Окрашивание задач](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject).

### Стилизация полос задач через lightbox

Вы можете задать список предопределённых цветов и добавить их в качестве опций в конфигурацию lightbox. Это позволит назначать цвет текста или фона для задач:

~~~js
var colors = [
    {key:"", label:"Default"},
    {key:"#4B0082",label:"Indigo"},
    {key:"#FFFFF0",label:"Ivory"},
    {key:"#F0E68C",label:"Khaki"}
    // more colors
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"color", type:"select", options:colors},
    {name:"textColor", height:22, map_to:"textColor", type:"select", options:colors},
    {name:"time", type:"duration", map_to:"auto"}
];
~~~

![task_style_property](/img/task_style_property.png)


[Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


### Строки области временной шкалы

Шаблон [task_row_class](api/template/task_row_class.md) позволяет изменять цвет строк временной шкалы за задачами Gantt.

~~~js
gantt.templates.task_row_class = function(start, end, task){
  if(task.id == 12)
      return "updColor";
};
~~~

![styling_timeline_row](/img/styling_timeline_row.png)


**Related example:** [Styling Rows of the Timeline Area](https://snippet.dhtmlx.com/33jfmwsp)


[Custom tree formatting](https://docs.dhtmlx.com/gantt/samples/04_customization/02_custom_tree.html)


### Подсветка ячеек временной шкалы

Вы можете выделять определённые ячейки временной шкалы в зависимости от дня недели с помощью шаблона **timeline_cell_class**. Эта функция перебирает ячейки и применяет CSS-класс к выбранным. Например, так можно подсветить выходные:

~~~js
<style>
    .weekend{
        background: #f4f7f4;
    }    
</style>
~~~

~~~js
gantt.templates.timeline_cell_class = function(item,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend"
    }
};
~~~

![styling_timeline_cells](/img/styling_timeline_cells.png)


[Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


Подробнее см. в статье [Выделение временных слотов](guides/highlighting-time-slots.md).

### Отображение внешних элементов (базовые линии, дедлайны и др.)

:::note
Эта функциональность доступна только в PRO-редакции.
:::

Вы можете добавить дополнительные элементы, такие как базовые линии или маркеры дедлайна, на диаграмму Gantt. Для этого создайте новый слой отображения с помощью метода [addTaskLayer](api/method/addtasklayer.md) и добавьте туда свои элементы. Метод принимает функцию, которая получает объект задачи и возвращает DOM-элемент для отображения или *false*, чтобы скрыть элемент для данной задачи:

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // your code
    return el;
});
~~~

Примеры таких внешних элементов:

- базовые линии

![show_baselines](/img/show_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


- дедлайны

![show_deadlines](/img/show_deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Дополнительные сведения - в статье [Пользовательские элементы в области временной шкалы](guides/baselines.md).

### Тултипы для задач

Тултипы позволяют компактно отображать детали задачи.

![default_task_tooltip](/img/default_task_tooltip.png)

По умолчанию тултипы появляются для задач при включении плагина [tooltip](guides/extensions-list.md#tooltip).

#### Пользовательский текст тултипа

Для настройки текста тултипа используйте шаблон [tooltip_text](api/template/tooltip_text.md):

~~~js
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"

<b>Duration:</b> " + task.duration;
};
~~~

Подробнее о тултипах читайте в статье [Тултипы для элементов Gantt](guides/tooltips.md).

## Стилизация связей


Вы можете настроить внешний вид связей между задачами с помощью ресурсов [Шаблоны связей зависимостей](guides/dependency-templates.md).

### Линии связей

Шаблон [link_class](api/template/link_class.md) позволяет изменять цвет линий связей.

~~~js
gantt.templates.link_class = function(link){
    return "";
};
~~~

![coloring_links](/img/coloring_links.png)


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


Дополнительная информация - в статье [Окрашивание и стилизация связей](guides/colouring-lines.md).

### Цвет связей через свойство объекта связи

Можно определить пользовательский цвет для связи, добавив свойство **color** к объекту связи:

~~~js
var tasks = {
  data:[
     // tasks configuration
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, 
     {id:2, source:2, target:3, type:"0", color:"blue"}
  ]
};
 
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getLink(2).color = "blue";
~~~

Подробнее см. в разделе [Окрашивание и стилизация связей](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject).

### Цвет связи при наведении

Вы можете изменить цвет связи при наведении с помощью CSS:

~~~js
.gantt_task_link:hover .gantt_line_wrapper div{
    box-shadow: 0 0 5px 0 yellowgreen;
    background: yellowgreen
}
  
.gantt_task_link:hover .gantt_link_arrow_left,
.gantt_task_link:hover .gantt_link_arrow_right{
    border-left-color: yellowgreen !important;
    border-right-color: yellowgreen !important;
}
~~~


**Related example:** [Link color on hover](https://snippet.dhtmlx.com/z3friavt)


![link_hover_color](/img/link_hover_color.png)

Подробнее - в статье [Окрашивание и стилизация связей](guides/colouring-lines.md).

### Всплывающие окна связей

Шаблон [drag_link_class](api/template/drag_link_class.md) позволяет стилизовать всплывающее окно, отображаемое при перетаскивании линии связи между задачами. Например, можно изменить фон и цвет текста всплывающего окна:

~~~js
<style>
  .gantt_link_tooltip{color:red; background-color:yellow} 
</style> 
~~~

~~~js
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    return "gantt_link_tooltip" ;
};
~~~

![styling_link_popup](/img/styling_link_popup.png)


**Related example:** [Styling the Popup of Dependency Link](https://snippet.dhtmlx.com/7o5f261z)


Подробнее - в статье [Шаблоны связей зависимостей](guides/dependency-templates.md).

### Редактирование значений связей из интерфейса

Хотя для редактирования и стилизации полос задач доступны lightbox-формы, встроенного интерфейса для редактирования связей нет. Однако вы можете создать свой собственный интерфейс, следуя подходу, описанному в 
[отдельной статье](guides/crud-dependency.md#editinglinkvaluesfromui).

![link_edit_ui](/img/link_edit_ui.png)


**Related example:** [Custom UI for Editing Link Values](https://snippet.dhtmlx.com/2208ic0t)


## Стилизация Quick Info Popup


Стилизация всплывающего окна Quick Info управляется через шаблоны [Шаблоны расширения 'Quick Info' (Поддержка Touch)](guides/touch-templates.md).

Вы можете применить стили к форме редактирования popup с помощью шаблона [quick_info_class](api/template/quick_info_class.md). Например, чтобы стилизовать Quick Info popup для определённых задач:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important;
  }
  .updColor .gantt_cal_qi_title{
      background-color:#ffeb8a!important;
  }
</style>
~~~

~~~js
gantt.templates.quick_info_class = function(start, end, task){ 
  if(task.id == "12")
    return "updColor";
  
      return ""
};
~~~

![styling_quick_info](/img/styling_quick_info.png)


**Related example:** [Styling Quick Info Popup](https://snippet.dhtmlx.com/b92gyqwu)

