---
title: "Окрашивание задач"
sidebar_label: "Окрашивание задач"
---

# Окрашивание задач


Окрашивание задач помогает выделить определённые задачи, что облегчает привлечение к ним внимания.

![coloring_tasks](/img/coloring_tasks.png)

Существует несколько способов кастомизации стиля задач:

1. [Переопределение шаблона задачи](guides/colouring-tasks.md#redefiningthetaskstemplate)
2. [Указание стиля напрямую в свойствах объекта задачи](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
3. [Динамическая генерация стилей на основе данных](guides/colouring-tasks.md#loadingcolorswithdata)

## Переопределение шаблона задачи {#redefiningthetaskstemplate}


Для изменения стиля задачи с помощью шаблона используется шаблон [task_class](api/template/task_class.md). Например, чтобы окрасить задачи в зависимости от их приоритета, можно использовать следующий код:

**Окрашивание задач в зависимости от их приоритета**
~~~css
<style>

    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }

</style>
~~~

~~~js
gantt.templates.task_class  = function(start, end, task){
    switch (task.priority){
        case "1":
            return "high";
            break;
        case "2":
            return "medium";
            break;
        case "3":
            return "low";
            break;
    }
};
~~~

[Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


:::note
Для стилизации других частей задач ознакомьтесь с шаблонами, перечисленными в статье [Шаблоны области временной шкалы](guides/timeline-templates.md).
:::

Похожий способ можно использовать и для связей. Подробнее см. [здесь](guides/colouring-lines.md#redefiningthelinkstemplate).

## Указание стиля в свойствах объекта задачи {#specifyingstyleinthepropertiesofataskobject}


Вы можете настроить внешний вид задачи, добавив до трёх специальных свойств в объект данных задачи:

- **color** - задаёт цвет фона полосы задачи
- **textColor** - задаёт цвет текста внутри полосы задачи (не влияет на задачи типа "milestone")
- **progressColor** - задаёт цвет полосы прогресса (по умолчанию полоса прогресса - немного более тёмный оттенок цвета задачи, оформленный как 'background-color: rgb(54, 54, 54); opacity: 0.2')

![task_color_properties](/img/task_color_properties.png)

:::note
Эти свойства обрабатываются особым образом. Gantt автоматически применяет их значения, если они присутствуют у задачи; в противном случае используются стандартные цвета.
:::

**Указание цвета задачи в объекте данных**
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
         duration:8, color:"blue", parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2013", 
         duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTask(1).color = "red";
~~~


[Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


:::note
Когда вы добавляете пользовательский цвет с помощью свойства **color**, применяется inline-стиль, который перекрывает другие стили. Это значит, что выделение критического пути и любые другие пользовательские стили фона или цвета текста применяться не будут.
:::

Чтобы выделить задачи как критические, можно использовать следующий CSS:

~~~css
.gantt_critical_task {
  --dhx-gantt-task-background: #e63030 !important;
}
~~~


**Related example:** [Окрашивание критических задач и связей](https://snippet.dhtmlx.com/xipdml7a)


Если одно из этих свойств задано у задачи, задача получает дополнительный класс **"gantt_task_inline_color"**. 


Этот класс можно использовать для переопределения других стилей, например с помощью селектора "*.gantt_task_line.gantt_task_inline_color*":

~~~css
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
    background-color: rgb(54, 54, 54);
    opacity: 0.2;
}
~~~

Эти свойства принимают любые корректные значения цвета CSS, например:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~

Аналогичный подход можно применять и к связям. Подробнее см. [здесь](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject).

## Загрузка цветов вместе с данными {#loadingcolorswithdata}


Когда цвета задач поступают из данных бэкенда - например, если цвета связаны со стадиями или ресурсами, назначенными задачам, и не могут быть жёстко заданы в коде - полезно генерировать стили динамически на основе ваших данных.

Предположим, у вас есть список пользователей, которых можно назначать на задачи, и у каждого пользователя свои цвета:

~~~js
[
    {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
    {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
    {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
    {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

В этом случае пользователи и их цвета управляются отдельно, и Gantt заранее не знает их идентификаторов или цветов.

Вот как можно это реализовать:

- Определите именованный serverList для этой коллекции:

~~~js
gantt.serverList("people");
~~~

- Загрузите опции на страницу, либо [используя формат данных Gantt](guides/supported-data-formats.md#jsonwithcollections), либо с помощью кастомного XHR-запроса.

- После загрузки опций сгенерируйте CSS-стили на основе данных:

~~~js
gantt.attachEvent("onLoadEnd", function(){
    // используйте произвольный id для элемента стилей
    var styleId = "dynamicGanttStyles";
    
    // если опции с цветами перезагружаются, используйте уже существующий элемент стилей
    
    var element = document.getElementById(styleId);
    if(!element){
        element = document.createElement("style");
        element.id = styleId;
        document.querySelector("head").appendChild(element);
    }
    var html = [];
    var resources = gantt.serverList("people");

    // создайте CSS-стили для каждой опции и вставьте их в style-элемент
    
    resources.forEach(function(r){
        if(r.backgroundColor && r.textColor){
            html.push(".gantt_task_line.gantt_resource_" + r.key + "{" +
                "--dhx-gantt-task-background:"+r.backgroundColor+"; " +
                "--dhx-gantt-task-color:"+r.textColor+"; " +
            "}");

        }
    });
    element.innerHTML = html.join("");
});
~~~

Если вы используете [ресурсное хранилище данных](api/config/resource_store.md), используйте *r.id* вместо *r.key* для идентификатора ресурса.

- После этого вы можете назначить сгенерированные классы задачам через шаблон task_class:

~~~js
gantt.templates.task_class = function (start, end, task) {
    var css = [];

    if(task.owner_id){
        css.push("gantt_resource_" + task.owner_id);
    }

    return css.join(" ");
};
~~~


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)

