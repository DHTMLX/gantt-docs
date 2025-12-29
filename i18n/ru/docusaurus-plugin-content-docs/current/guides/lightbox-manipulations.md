---
title: "Работа с элементами Lightbox"
sidebar_label: "Работа с элементами Lightbox"
---

# Работа с элементами Lightbox

## Получение/установка значения контрола

Чтобы получить или изменить значение контрола lightbox, используйте метод [getLightboxSection](api/method/getlightboxsection.md) следующим образом:

~~~js
// получить значение
var value = gantt.getLightboxSection('description').getValue();

// установить значение
gantt.getLightboxSection('description').setValue('abc');
~~~

## Проверка, открыт ли lightbox

Чтобы узнать, открыт ли lightbox в данный момент, проверьте свойство **lightbox** объекта состояния, возвращаемого методом [getState](api/method/getstate.md).

 Если lightbox открыт, метод вернет id открытой задачи; в противном случае - 'null' или 'undefined'.

~~~js
if (gantt.getState().lightbox){
    // код для случая, когда lightbox открыт
} else {
    // код для случая, когда lightbox закрыт
}
~~~

## Связывание свойств данных с секциями lightbox

Чтобы связать свойство данных с секцией lightbox, используйте атрибут **map_to** в объекте секции:

~~~js
// связывает секцию "holders" со свойством данных "holder"
gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## Установка значения по умолчанию для контрола lightbox

Чтобы задать значение по умолчанию для секции lightbox, используйте свойство **default_value** в объекте секции.

Например, если вы добавили в lightbox пользовательскую секцию "Priority", которая отображает приоритет задачи, это поле будет пустым при создании нового события. Чтобы задать значение по умолчанию, например, низкий приоритет, настройте lightbox так:

~~~js
var opts = [
    { key:1, label: "High" },                                            
    { key:2, label: "Normal" },                                         
    { key:3, label: "Low" }                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text",    focus:true},
    {name:"priority",      height:22, type:"select",      map_to:"priority",  /*!*/  
    options:opts, default_value:3},      /*!*/                                                                
    {name:"time",          height:72, type:"duration", map_to:"auto"}
];
~~~

:::note
Свойство **default_value** задает начальное значение только для секции lightbox. Это означает, что новое событие получит это значение только после того, как пользователь откроет lightbox и сохранит событие.
:::

Если вы хотите присвоить значение по умолчанию непосредственно при создании новых событий, используйте событие [onTaskCreated](api/event/ontaskcreated.md):

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## Скрытие секции для некоторых событий

Чтобы скрыть секцию для определённых событий, переопределите её метод **set_value** следующим образом:


~~~js
gantt.form_blocks.textarea.set_value = function(node, value, ev){
    node.firstChild.value = value || "";
    var style = ev.some_property ? "" : "none";
    node.style.display = style; // область редактора
    node.previousSibling.style.display = style; // заголовок секции
    gantt.resizeLightbox(); // корректировка размера lightbox
}
~~~

## Размещение секции и её заголовка в одной строке

Секции и их заголовки можно разместить в одной строке, включив опцию [wide_form](api/config/wide_form.md):

~~~js
gantt.config.wide_form = true; /*!*/

gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_status = "Status";


gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "status", height:22, map_to: "status", type: "select", options: [         
        {key:1, label: "New"},                                                       
          {key:2, label: "Open"},                                                     
          {key:3, label: "Done"}                                                      
    ]},                                                                            
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
~~~


**Related example:** [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)


## Кнопка в заголовке секции

Можно добавить пользовательскую кнопку в заголовок секции, выполнив следующие шаги:

- Добавьте свойство **button** в объект секции:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- Задайте метку для кнопки:

~~~js
//'help' соответствует значению свойства 'button'
gantt.locale.labels.button_help = "Help label";
~~~

- Реализуйте обработчик нажатия на кнопку:

~~~
gantt.form_blocks.textarea.button_click = function(index, button, shead, sbody){
    // пользовательская логика
}
~~~
Параметры:

- **index** - (*number*) индекс секции, начиная с нуля
- **button** - (*HTMLElement*) сама кнопка
- **shead** - (*HTMLElement*) элемент заголовка секции
- **sbody** - (*HTMLElement*) элемент тела секции

Чтобы задать изображение кнопки, используйте следующий CSS-класс:

~~~js
.dhx_custom_button_help{
    background-image: url(imgs/but_help.gif);
}
~~~

