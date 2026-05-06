---
title: "Раскрашивание и стилизация связей"
sidebar_label: "Раскрашивание и стилизация связей"
---

# Раскрашивание и стилизация связей

Вы можете изменить стиль связей между задачами, чтобы получить нужный вид диаграммы Ганта.
Раскрашивание зависимостей-связей в различных цветах позволяет визуально различать их для пользователей.

![coloring_links](/img/coloring_links.png)

Чтобы задать пользовательский стиль для связей, можно воспользоваться одним из следующих подходов:

1. [Переопределить шаблон ссылки по умолчанию](guides/colouring-lines.md#redefiningthelinkstemplate)
2. [Задать значения стилей в свойствах объекта связи](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

Сначала давайте рассмотрим элементы структуры связи, чтобы понять логику их позиционирования, размера, функциональности и стилей по умолчанию.

## Структура DOM-элемента связи {#structureofthelinkdomelement}

DOM-элемент связи имеет следующую структуру:

- **.gantt_task_link**  - статическое позиционирование, нулевой размер
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - абсолютное позиционирование
        - **.gantt_link_line_down(/up/right/left)** - статическое позиционирование внутри элемента-обертки
  
DOM выглядит следующим образом:

~~~html
<div class="gantt_task_link" link_id="3">
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_left_down"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_down"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_down_right"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_right"></div>
      </div>
    <div class="gantt_link_arrow gantt_link_arrow_right"></div>
</div>
~~~

где: 

- **gantt_task_link** - элемент с нулевой шириной и статическим позиционированием. Он используется как общий родитель для всех частей связи, например, чтобы применить стили:

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~


Вы можете применять классы из шаблона [link_class](api/template/link_class.md) к этому элементу. 

#### Критические связи

Стилизование критических связей определяется добавлением класса **gantt_critical_link** к элементу **gantt_task_link**.

- **gantt_line_wrapper** отвечает за положение и размер связи. Он прозрачен, имеет абсолютное позиционирование и немного больше самой линии связи, что делает выбор связи мышью более удобным. 

Ширина этого элемента определяется конфигурационным свойством [link_wrapper_width](api/config/link_wrapper_width.md).

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow** - стрелка связи. Она абсолютно позиционирована. В зависимости от направления, в которое указывает стрелка, элемент может иметь соответствующий дополнительный класс: 
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up**, или
    - **gantt_link_arrow_down**.

Сейчас используются только **gantt_link_arrow_right** и **gantt_link_arrow_down**.

Размер элемента **gantt_link_arrow** определяется конфигурационным свойством [link_arrow_size](api/config/link_arrow_size.md).

~~~js
gantt.config.link_arrow_size = 8;
~~~


- **gantt_link_line_(dir)** - видимая часть связи. Используйте **left/right/up/down** вместо части имени элемента **dir**.

Ширина этого элемента может быть изменена через конфигурационное свойство [link_line_width](api/config/link_line_width.md):

~~~js
gantt.config.link_line_width = 3;
~~~

- **gantt_link_corner** - скругленный угол линии связи. Радиус угла определяется [link_radius](api/config/link_radius.md):

~~~js
gantt.config.link_radius = 2;
~~~

Установка **gantt.config.link_radius = 1** удалит скругления.


## Переопределение шаблона связи {#redefiningthelinkstemplate}

Чтобы стилизовать зависимости-связи, используйте шаблон [link_class](api/template/link_class.md). Например, чтобы окрасить связи в зависимости от типа зависимости, используйте код как в:

**Раскрашивание связей в зависимости от типа зависимости**
~~~js
gantt.templates.link_class = function(link){
    var types = gantt.config.links;
    switch (link.type){
        case types.finish_to_start:
            return "finish_to_start";
            break;
        case types.start_to_start:
            return "start_to_start";
            break;
        case types.finish_to_finish:
            return "finish_to_finish";
            break;
        case types.start_to_finish:
            return "start_to_finish";
            break;
    }
};
~~~


[Стили связей](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


:::note
Чтобы стилизовать другие элементы зависимых связей, используйте шаблоны, перечисленные в статье [Templates of Dependency Links](guides/dependency-templates.md).
:::

Аналогичный подход можно применить и к задачам. Подробнее об этом [здесь](guides/colouring-tasks.md#redefiningthetaskstemplate).


## Задание цвета в свойстве объекта связи {#specifyingcolorinthepropertiesofthelinkobject}

Чтобы задать пользовательский цвет для зависимости-связи, можно добавить дополнительное свойство к объекту данных:

- **color** - цвет связи 

![link_color_property](/img/link_color_property.png)

:::note
Примечание: это особое свойство. По умолчанию Gantt проверяет наличие этого свойства и, если оно есть, применяет соответствующее значение к связке. В противном случае применяется заданный по умолчанию цвет.
:::

**Установка цвета связи в объекте данных**
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, parent:1}
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, /*!*/
     {id:2, source:2, target:3, type:"0", color:"blue"},/*!*/
     {id:3, source:3, target:4, type:"0", color:"blue"},/*!*/
     {id:4, source:2, target:5, type:"2", color:"green"}/*!*/
  ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getLink(4).color = "green";
~~~

**Связанный пример** [Цвета ссылок из свойства color](https://snippet.dhtmlx.com/e5utei5g)

:::note
Добавление пользовательского цвета через свойство **color** сопровождается добавлением встроенного стиля, который имеет наивысший приоритет среди прочих стилей. В результате критический путь не будет подсвечиваться, и любой пользовательский стиль, который вы добавляли для изменения цвета связи, не будет применяться.
:::

Чтобы сделать связи выглядеть критическими, можно использовать следующий код:

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~

**Связанный пример** [Раскрашивание критических задач и связей](https://snippet.dhtmlx.com/xipdml7a)

Если по крайней мере одно свойство объекта связи задано, связка получает дополнительный класс **"gantt_link_inline_color"**. Вы можете использовать этот класс, чтобы переопределить некоторые другие стили для связки:

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

Свойства могут иметь любое допустимое значение цвета CSS, например, все приведённые ниже нотации являются корректными:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~

Подобный подход можно применить и к задачам. Подробнее об этом [здесь](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject).