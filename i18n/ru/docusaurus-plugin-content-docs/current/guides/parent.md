---
title: "Родительский контрол"
sidebar_label: "Родительский контрол"
---

Родительский контрол
=====================

Этот контрол предоставляет выпадающий список для изменения родителя задачи. Он загружает все задачи, отображаемые на диаграмме Gantt, с возможностью применения правил фильтрации и настройки отображения значений. Помимо этих функций, он работает так же, как и контрол [Select Control](guides/select.md).

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


Инициализация 
-----------------

Чтобы добавить контрол **parent** в lightbox, необходимо:

1) Добавить секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) Определить метку для секции:

~~~js
gantt.locale.labels["section_parent"] = "Родительская задача";
~~~
  

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)
  


Свойства
----------------

Ниже приведены основные свойства, которые часто используются с контролом **parent** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **height** - (*number*) высота секции
- **map_to** - (*string*) имя свойства данных, сопоставленного с этой секцией
- **type** - (*string*) [тип контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, секция получит фокус при открытии lightbox
- **allow_root** - (*boolean*) если "true", в список опций включается возможность выбрать корневой уровень как родительскую задачу; используется вместе с **root_label**
- **root_label** - (*string*) метка для опции выбора корневого уровня; используется с **allow_root**
- **filter** - (*function*) [функция фильтрации опций для выбора](guides/parent.md#optionsfiltering). Получает id задачи и объект задачи в качестве аргументов
- **sort** - (*function*) [функция сортировки опций для выбора](guides/parent.md#optionssorting)
- **template** - (*function*) функция-шаблон для настройки отображения опций выбора
  

Фильтрация опций
-----------------------

Чтобы управлять тем, какие опции отображаются в контроле **parent**, используйте свойство **filter**:

**Фильтрация. Отображение только задач 1-го уровня**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  filter:function(id, task){ /*!*/
         if(task.$level > 1){         /*!*/
            return false;     /*!*/
        }else{  /*!*/
            return true; /*!*/
        } /*!*/
    }},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


Функция **filter** получает два параметра:

- **id**  - (*string, number*) id задачи
- **task** - (*object*) объект задачи

и возвращает:

- *true* - чтобы включить задачу в список опций
- *false* - чтобы исключить задачу из списка


Сортировка опций
------------------

Чтобы задать порядок опций в контроле **parent**, используйте свойство **sort**:

**Сортировка задач по длине названия**
~~~js
function sortByLength(a,b){
    a = a.text.length();
    b = b.text.length();
    return a>b?1:(a<b?-1:0);
};
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  sort:sortByLength}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Функция **sort** сравнивает пары соседних элементов и возвращает:

- 1 - первый элемент должен идти перед вторым
- -1 - второй элемент должен идти перед первым
- 0 - порядок элементов не меняется

Шаблон для опций
-------------------------

Чтобы настроить отображение опций в контроле **parent**, используйте свойство **template**:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  template(start,end,ev){/*!*/
        var title = ev.id+"."+ev.text;/*!*/
        return title;/*!*/
    }}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Функция **template** принимает три параметра: 

- **start** - (*Date*) дата начала события
- **end** - (*Date*) дата окончания события
- **ev** - (*object*) объект события

и возвращает отформатированную опцию для контрола.


:::note
Если свойство 'template' не задано, опции будут форматироваться согласно шаблону [task_text](api/template/task_text.md).
:::

