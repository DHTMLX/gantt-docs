---
title: "Select Control"
sidebar_label: "Select Control"
---

# Контроль выбора

Выпадающий список.

![select_control](/img/select_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", options: [ /*!*/
        {key:1, label: "High"},                                               /*!*/
        {key:2, label: "Normal"},                                             /*!*/
        {key:3, label: "Low"}                                                 /*!*/
     ]},                                                                      /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_priority = "Priority";
~~~


[Контроль выбора](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## Инициализация

Чтобы добавить контроль **select** в lightbox, выполните следующие шаги:

1) Добавьте секцию в конфигурацию lightbox:

~~~js
var opts = [
    {key:1, label: "High"},                                            
    {key:2, label: "Normal"},                                         
    {key:3, label: "Low"}                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},      /*!*/                                                                 
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Установите подпись для секции:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
  
  

[Контроль выбора](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## Свойства

Следующие свойства наиболее важны и обычно устанавливаются для контроля **select** (полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **height** - (*number*) высота секции
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено секции
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, секция получит фокус при открытии lightbox
- **options** - (*array*) массив объектов. Определяет опции select-контрола (*используется для контролов **select**, **checkbox** и **radio***). Каждый объект в массиве задаёт одну опцию и имеет следующие свойства:
    - **key** - (*string*) идентификатор опции. Этот атрибут сравнивается со свойством данных задачи для назначения опций задачам
    - **label** - (*string*) метка опции
- **default_value** - (*any*) значение по умолчанию элемента управления секции. Применяется только если введённое значение неопределено
- **onchange** - (*function*) задаёт обработчик события onChange для элемента управления секции 


## Заполнение элемента управления данными

Обычно, чтобы задать значения для элемента управления **select**, используйте параметр [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [
    { name:"priority",height:22, map_to:"priority",type:"select",
      options: [ 
        {key:1, label: "High"},                                               
        {key:2, label: "Normal"},                                             
        {key:3, label: "Low"}                                                
    ]}                                                                    
];
~~~

Элементы в параметре [options](api/config/lightbox.md) имеют 2 обязательных свойства:

- **key** - идентификатор опции
- **label** - метка опции


## Заполнение элемента управления данными с сервера

Чтобы заполнить элемент управления данными с сервера, задайте параметр [options] значением, возвращаемым методом [serverList](api/method/serverlist.md):

~~~js
gantt.config.lightbox.sections = [
    {name:"description", ...},
    { name:"priority",map_to:"priority",type:"select",
        options:gantt.serverList("priority")}, /*!*/
    {name:"category", map_to:"category", type:"select", 
        options:gantt.serverList("category")}, /*!*/
    {name:"time", ...}
];
gantt.init("gantt_here");
gantt.load("/data");
~~~

Вывод URL **/data** имеет следующий вид:

~~~js
{
  "tasks":[
    {"id":1,"text":"Project #2","start_date":"01-04-2020","duration":18,"parent":0},
    {"id":2,"text":"Task #1","start_date":"02-04-2020","duration":8,"parent":1},
    {"id":3,"text":"Task #2","start_date":"11-04-2020","duration":8,"parent":1}
  ],
  "links":[
    {"id":1,"source":1,"target":2,"type":"1"},
    {"id":2,"source":2,"target":3,"type":"0"}
  ],
  "collections": { /*!*/
    "priority":[
        {"value":"1","label":"Low"},
        {"value":"2","label":"Medium"},
        {"value":"3","label":"High"}
    ],
    "category":[
        {"value":"1","label":"Simple"},
        {"value":"2","label":"Complex"},
        {"value":"3","label":"Unknown"}
    ]
  }
}
~~~

### Загрузка опций через dhtmlxConnector

Ниже приведён пример инициализации [dhtmlxConnector](integrations/php/howtostart-connector.md):

~~~php
//data.php
<?php
    include('connector-php/codebase/gantt_connector.php');
 
    $res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

    $list = new OptionsConnector($res);
    $list->render_table("priorities","id","id(value),name(label)");
    
    $gantt = new JSONGanttConnector($res);
    $gantt->set_options("priority", $list);
    $gantt->render_links("gantt_links","id","source_task(source),
                    target_task(target),type");    
    $gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,
                    sortorder,parent");
?>
~~~