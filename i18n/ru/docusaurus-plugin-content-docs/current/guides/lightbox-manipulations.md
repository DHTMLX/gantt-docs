---
title: "Работа с элементами Lightbox"
sidebar_label: "Работа с элементами Lightbox"
---

# Работа с элементами Lightbox

## Получение/установка значения элемента управления Lightbox

Чтобы получить/установить значение элемента управления Lightbox, используйте метод [getLightboxSection](api/method/getlightboxsection.md) как показано:

~~~js
//to get the value
var value = gantt.getLightboxSection('description').getValue();

//to set the value
gantt.getLightboxSection('description').setValue('abc');
~~~

## Проверка того, открыт ли Lightbox

Чтобы проверить, открыт ли lightbox в данный момент или закрыт, используйте свойство **lightbox** объекта состояния, возвращаемого методом [getState](api/method/getstate.md).

 Если lightbox открыт - метод вернет id
 открытого задания, в противном случае 'null' или 'undefined'

~~~js
if (gantt.getState().lightbox){
    //the code for the opened lighbox
} else {
    //the code for the closed lighbox
}
~~~

## Отображение данных в секциях Lightbox

Чтобы связать свойство данных с секцией Lightbox, используйте атрибут **map_to** объекта секции:

~~~js
//assigns the "holders" section to a data property with the name "holder" 
gantt.config.lightbox.sections = [
    {name:"description",height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## setting default value for a lightbox's control

Чтобы задать значение по умолчанию для секции Lightbox, используйте свойство **default_value** объекта секции.

Например, вы добавили в Lightbox пользовательский раздел — “Priority” — который отображает приоритет задачи. 
Когда пользователь создаёт новое событие, поле будет пустым. Чтобы исправить такое поведение и задать значение по умолчанию, например, низкий приоритет,
укажите Lightbox, как показано:

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
Свойство **default_value** устанавливает значение по умолчанию для секции Lightbox, а не для нового события, т.е. новое событие получает указанное значение только после того, как пользователь откроет Lightbox и сохранит событие.
:::

Чтобы напрямую задать значение по умолчанию для новых событий, используйте событие [onTaskCreated](api/event/ontaskcreated.md):

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## Сделать секцию скрытой для некоторых событий

Чтобы скрыть секцию для конкретных событий, переопределите её метод **set_value** следующим образом:

~~~js
gantt.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // editor area
    node.previousSibling.style.display="style;" //section header
    gantt.resizeLightbox(); //correct size of lightbox
}
~~~

## Разместить секцию и её подпись на одной линии

Вы можете разместить секции Lightbox на одной линии с их ярлыками, установив конфигурацию [wide_form](api/config/wide_form.md) в значение *true*:

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

**Решение-пример** [Aligning Lightbox] 

## Кнопка в заголовке секции

Можно добавить настраиваемую кнопку в заголовке секции. Чтобы добавить кнопку в заголовок секции, выполните следующие шаги:

- Укажите свойство **button** в объекте секции:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- Установите ярлык для кнопки:

~~~js
//'help' is the value of the 'button' property
gantt.locale.labels.button_help="Help label";
~~~

- Укажите обработчик кликов по кнопке:

~~~
gantt.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // any custom logic
}
~~~
где:

- **index** - (*number*) индекс секции. Нумерация начинается с нуля
- **button** - (*HTMLElement*) HTML-элемент кнопки
- **shead** - (*HTMLElement*) HTML-элемент заголовка секции
- **sbody** - (*HTMLElement*) HTML-элемент тела секции

Вы можете определить изображение, используемое для кнопки, через следующий CSS-класс:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~