---
title: "Окрашивание и стилизация связей"
sidebar_label: "Окрашивание и стилизация связей"
---

Окрашивание и стилизация связей
================================

Вы можете настраивать внешний вид связей между задачами, чтобы добиться желаемого оформления вашего Gantt. Использование различных цветов для связей зависимостей помогает пользователям легко различать их.

![coloring_links](/img/coloring_links.png)

Существует несколько способов задать пользовательские стили для связей:

1. [Переопределение шаблона связи по умолчанию](guides/colouring-lines.md#redefiningthelinkstemplate)
2. [Указание стиля непосредственно в свойствах объекта связи](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

Давайте сначала рассмотрим структуру DOM-элемента связи, чтобы понять, как её части позиционируются, масштабируются, функционируют и стилизуются по умолчанию.

## Структура DOM-элемента связи {#structureofthelinkdomelement}
----------------------

DOM-элемент связи имеет следующую структуру:

- **.gantt_task_link**  - имеет статическое позиционирование и нулевой размер
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - абсолютное позиционирование
        - **.gantt_link_line_down(/up/right/left)** - статическое позиционирование внутри wrapper
  
DOM выглядит так:

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

Назначение каждой части:

- **gantt_task_link** - Этот элемент имеет нулевой размер и статическое позиционирование, выступая в роли общего родителя для всех частей связи, что облегчает применение стилей:

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~

Также вы можете применять классы из шаблона [link_class](api/template/link_class.md) к этому элементу.

#### Критические связи

Критические связи получают свой стиль путём добавления класса **gantt_critical_link** к элементу **gantt_task_link**.

- **gantt_line_wrapper** управляет позицией и размером связи. Он прозрачный, абсолютно позиционирован и немного больше самой линии связи, что улучшает точность выделения мышью.

Ширина этого элемента контролируется свойством [link_wrapper_width](api/config/link_wrapper_width.md):

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow** отображает стрелку на связи. Абсолютное позиционирование; в зависимости от направления может иметь дополнительные классы: 
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up** или
    - **gantt_link_arrow_down**.

В данный момент используются только **gantt_link_arrow_right** и **gantt_link_arrow_down**.

Размер стрелки задаётся свойством [link_arrow_size](api/config/link_arrow_size.md):

~~~js
gantt.config.link_arrow_size = 8;
~~~

- **gantt_link_line_(dir)** - видимая часть линии связи. Вместо **dir** подставьте **left**, **right**, **up** или **down**.

Ширину линии можно изменить с помощью свойства [link_line_width](api/config/link_line_width.md):

~~~js
gantt.config.link_line_width = 3;
~~~

- **gantt_link_corner** - скруглённый угол линии связи. Радиус угла задаётся через [link_radius](api/config/link_radius.md):

~~~js
gantt.config.link_radius = 2;
~~~

Если задать **gantt.config.link_radius = 1**, скругления будут убраны.

## Переопределение шаблона связи {#redefiningthelinkstemplate}
-----------------------------------------

Для настройки связей зависимостей используется шаблон [link_class](api/template/link_class.md). Например, чтобы окрашивать связи в зависимости от приоритета задачи, можно использовать следующий код:

**Окрашивание связей в зависимости от типа зависимости**
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


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


:::note
Для стилизации других частей связей зависимостей смотрите шаблоны в статье [Шаблоны связей зависимостей](guides/dependency-templates.md).
:::

Аналогичный способ можно применить и к задачам. Подробнее об этом читайте [здесь](guides/colouring-tasks.md#redefiningthetaskstemplate).

## Указание цвета в свойстве объекта связи {#specifyingcolorinthepropertiesofthelinkobject}
-----------------------------------------------------

Можно также назначить пользовательский цвет для связи, добавив соответствующее свойство в объект данных:

- **color** - определяет цвет связи

![link_color_property](/img/link_color_property.png)

:::note
Это специальное свойство. Gantt проверяет наличие этого свойства у связи и применяет его значение. Если оно отсутствует, используется цвет по умолчанию.
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


**Related example:** [Link colors from the "color" property](https://snippet.dhtmlx.com/e5utei5g)


:::note
При добавлении пользовательского цвета через свойство **color** добавляется inline-стиль, который перекрывает другие стили. Это означает, что критический путь не будет выделен, и любые пользовательские стили для изменения цвета связи не будут применяться.
:::

Чтобы выделить связи как критические, используйте следующий CSS:

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~


**Related example:** [Окрашивание критических задач и связей](https://snippet.dhtmlx.com/xipdml7a)


Если у объекта связи задано какое-либо свойство, связь получает дополнительный класс **"gantt_link_inline_color"**. Этот класс можно использовать для переопределения других стилей для данной связи:

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

Свойство color принимает любое допустимое CSS-значение цвета, например:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~

Аналогичный подход можно использовать и для задач. Подробнее читайте [здесь](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject).

