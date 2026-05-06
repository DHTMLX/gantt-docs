---
title: "Динамическая загрузка (по требованию)" 
sidebar_label: "Динамическая загрузка (по требованию)" 
---

# Динамическая загрузка (по требованию)

:::info
Эта функция доступна только в PRO-версии
:::

По умолчанию dhtmlxGantt загружает все данные сразу. Это может стать проблемой, если у вас большое количество задач.

В такой ситуации можно использовать режим динамической загрузки и загружать данные по веткам (подпроектам), по уровням по мере их открытия пользователем. 

## Как это работает

Когда динамическая загрузка [включена](#enablingdynamicloading), вызов [gantt.load("url")](api/method/load.md) отправит GET-запрос на указанный URL, ожидая, что ответ будет содержать только задачи верхнего уровня, а все вложенные ветви будут отображаться как закрытые.

Когда пользователь нажимает на значок Развернуть, Gantt автоматически вызывает метод [load](api/method/load.md), отправляя на сервер идентификатор нажатой задачи:

~~~js
gantt.load("url?parent_id="123"");
~~~ 

И ожидается, что ответ будет содержать подзадачи развернутого элемента.

:::note
Вы можете использовать событие [onBeforeBranchLoading](api/event/onbeforebranchloading.md) для изменения URL запроса или добавления дополнительных параметров к нему.
:::

## Включение динамической загрузки {#enablingdynamicloading}

Чтобы включить динамическую загрузку в диаграмме Gantt, необходимо настроить как клиентскую, так и серверную стороны.

- Клиентская сторона (используйте опцию [branch_loading](api/config/branch_loading.md)):

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- Серверная сторона:

~~~php
<?php

include ('config.php');

$gantt = new JSONGanttConnector($res, $dbtype);

$parent_id = isset($_GET["parent_id"]) ? $_GET["parent_id"] : 0;

$gantt->mix("open", 0);
$gantt->mix("deep", 1);

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,parent",
    "", 
    "parent"
);
~~~

**Связанный образец**: [Загрузка подпроектов по требованию (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

Обычно на клиентской стороне нет информации о дочерних элементах отображаемых данных (поскольку такие дети не были загружены с сервера). 

Чтобы передать эту информацию, можно использовать специальное свойство данных '$has_child' (его можно изменить с помощью [branch_loading_property](api/config/branch_loading_property.md), которое указывает количество дочерних элементов для задачи).

~~~php
function check_children($row){
 global $gantt;
 $task_id = $row->get_value('id');
 $sql = "SELECT COUNT(id) AS has_children FROM gantt_tasks WHERE parent='{$task_id}'";
 $children = $gantt->sql->query($sql);
    
 $child = $gantt->sql->get_next($children);
 $children_qty = $child['has_children'];

 $row->set_userdata('$has_child',$children_qty);
}
$gantt->event->attach("beforeRender","check_children");
~~~

**Связанный образец**: [Загрузка подпроектов по требованию (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


## Формат данных для динамической загрузки

Формат данных для динамической загрузки следующий:

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"Task #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
        "duration":4,
        "text":"Task #2",
        "progress":0.9,
        "parent":12,
        "open":0,
        "$has_child":4
    }],

    "links":[
        {"id":1,"source":1,"target":2,"type":"0"},
        {"id":2,"source":1,"target":3,"type":"0"},
        {"id":3,"source":1,"target":4,"type":"0"}
    ]

}
~~~ 

Как видно, это тот же JSON, что и используется для обычной загрузки данных. Чтобы сравнить, смотрите статью [Поддерживаемые форматы данных](guides/supported-data-formats.md).

Единственное различие — свойство **$has_child**, которое указывает, будет ли задача отображаться как «лист» (без переключателя «развернуть») или как разворачиваемый узел:

- если свойство *$has_child* задано и содержит истинное значение (ненуловое число, true, непустая строка и т. п.),
элемент будет отображаться с переключателем разворачивания/сворачивания. При разворачивании переключателя на сервер будет отправлен Ajax-запрос;
- если *$has_child* не задано или содержит ложное значение (0, false, NaN, undefined, пустая строка, null),
элемент будет отображаться без переключателя, как задача без дочерних элементов.

Если запрос имеет параметр *parent_id*, ответ должен содержать дочерние элементы задачи с указанным id. Если *parent_id* не указан, запрос должен содержать задачи корневого уровня:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка задач корневого уровня</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>Dynamic loading format</td>
  </tr>
  <tr>
  <td>загрузка дочерних задач для задачи</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>Dynamic loading format</td>
  </tr>

</table>

### Загрузка задач динамически

Вы можете реализовать динамическую загрузку задач так, чтобы новые задачи загружались после прокрутки до последней видимой задачи. Подробности смотрите в статье [Как загрузить задачи динамически](guides/how-to.md#how-to-load-tasks-dynamically).

### Связанные API

- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [onAfterBranchLoading](api/event/onafterbranchloading.md)