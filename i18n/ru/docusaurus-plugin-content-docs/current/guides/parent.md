---
title: "Родительский контрол"
sidebar_label: "Родительский контрол"
---

# Контроль родителя

Выпадающий список для изменения родителя задачи. Контроль загружает все задачи, отображаемые в Gantt диаграмме, но вы можете задать правила фильтрации и шаблон отображаемых значений.
Всё остальное идентично [Select Control](guides/select.md).

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Выбор родителя](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)

## Инициализация

Чтобы добавить **parent** контроль в lightbox, выполните следующие шаги:

1) Добавьте раздел в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) Установите метку для раздела:

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~


[Выбор родителя](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)

## Свойства

Следующие свойства наиболее важны и обычно устанавливаются для **parent** control (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя раздела
- **height** - (*number*) высота раздела
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено с разделом
- **type** - (*string*) [тип управления раздела](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, раздел получает фокус при открытии lightbox
- **allow_root** - (*boolean*) если установлено в "true", в списке опций будет дополнительная опция, которая позволит пользователю установить корневой уровень в качестве родителя задач. Используется вместе с свойством **root_label**
- **root_label** - (*string*) устанавливает метку для родителя верхнего уровня. Используется вместе с свойством **allow_root**
- **filter** - (*function*) задаёт функцию фильтрации для опций выбора [фильтрации опций](guides/parent.md#options-filtering). Принимает идентификатор задачи и сам объект задачи
- **sort** - (*function*) задаёт функцию сортировки для опций выбора [сортировки опций](guides/parent.md#options-sorting)
- **template** - (*function*) задаёт шаблон опций выбора

## Фильтрация опций

Чтобы отфильтровать опции, представляемые в **parent** control, используйте свойство **filter**:

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

[Выбор родителя](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)

Свойство **filter** задаёт функцию фильтрации, принимающую 2 параметра:

- **id**  - (*string, number*) идентификатор задачи
- **task** - (*object*) объект задачи

и возвращает:

- *true*, для задачи, которая должна быть отображена
- *false*, для задачи, которую нужно удалить из списка опций


## Сортировка опций

Чтобы отсортировать опции, представляемые в **parent** control, используйте свойство **sort**:

**Сортировка задач по длине заголовка**
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

Свойство **sort** задаёт функцию сортировки, которая вызывается для каждой пары соседних значений и возвращает 1,-1 или 0:

- 1 - объект с первым значением пары должен идти перед вторым
- -1 - второй объект идет перед первым
- 0 - порядок двух объектов не меняется

## Шаблон опций

Чтобы задать шаблон опций в **parent** control, используйте свойство **template**:

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

Свойство **template** задаёт функцию, принимающую 3 параметра: 

- **start** - (*Date*)  дата начала события
- **end** - (*Date*)  дата окончания события
- **ev** - (*object*)  объект события

и возвращает шаблон опций в контроле.


:::note
Если свойство 'template' не указано, формат опций будет определяться шаблоном [task_text](api/template/task_text.md).
:::