---
title: "Динамическая загрузка (по требованию)"
sidebar_label: "Динамическая загрузка (по требованию)"
---

Динамическая загрузка (по требованию)
=========================================

:::info
Эта функция доступна только в редакции PRO.
:::

По умолчанию dhtmlxGantt загружает все данные сразу, что может быть затруднительно при большом количестве задач.

В таких случаях можно использовать режим динамической загрузки, чтобы загружать данные по ветвям (подпроекты), уровень за уровнем, по мере их раскрытия пользователем.

Как это работает
----------------

Когда динамическая загрузка [включена](#enablingdynamicloading), вызов [gantt.load("url")](api/method/load.md) отправляет GET-запрос по указанному URL и ожидает, что в ответе будут только задачи верхнего уровня, а все вложенные ветви изначально будут закрыты.

Когда пользователь нажимает на иконку раскрытия, Gantt автоматически вызывает метод [load](api/method/load.md), отправляя на сервер id выбранной задачи:

~~~js
gantt.load("url?parent_id="123"");
~~~

Ожидается, что сервер вернёт подзадачи раскрытого элемента.

:::note
Событие [onBeforeBranchLoading](api/event/onbeforebranchloading.md) можно использовать для изменения URL запроса или добавления дополнительных параметров.
:::

## Включение динамической загрузки {#enablingdynamicloading}

<span id="enabledynload">Чтобы включить динамическую загрузку в Gantt</span>, требуется настройка как на клиентской, так и на серверной стороне.

- На клиенте (используйте опцию [branch_loading](api/config/branch_loading.md)):

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- На сервере:

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
  

[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


Как правило, на клиентской стороне нет информации о дочерних элементах отображаемых задач, так как эти дочерние элементы изначально не загружаются с сервера.

Чтобы предоставить такую информацию, можно использовать специальное свойство данных '$has_child' (его можно настроить с помощью [branch_loading_property](api/config/branch_loading_property.md)), чтобы указать количество дочерних элементов у задачи.

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


[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


Формат данных для динамической загрузки 
-----------------------

Формат данных для динамической загрузки выглядит следующим образом:

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

Это тот же JSON-формат, который используется для обычной загрузки данных; для сравнения см. статью [Поддерживаемые форматы данных](guides/supported-data-formats.md).

Главное отличие - свойство **$has_child**, которое определяет, будет ли задача отображаться как "лист" (без переключателя раскрытия) или как раскрываемый узел:

- если свойство *$has_child* присутствует и содержит ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) значение (например, ненулевое число, true или непустую строку), у элемента появится переключатель раскрытия/сворачивания. При раскрытии будет отправлен Ajax-запрос на сервер;
- если *$has_child* отсутствует или содержит ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) значение (например, 0, false, NaN, undefined, пустую строку или null), элемент будет отображаться без переключателя, что означает отсутствие дочерних задач.

Если в запросе присутствует параметр *parent_id*, в ответе должны быть дочерние задачи задачи с этим id. Если *parent_id* не указан, в ответе должны быть задачи корневого уровня:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузить корневой уровень</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>[Формат динамической загрузки](#dynamicloadingformatofdata)</td>
  </tr>
  <tr>
  <td>загрузить дочерние задачи</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>[Формат динамической загрузки](#dynamicloadingformatofdata)</td>
  </tr>

</table>

## Динамическая загрузка задач

Динамическая загрузка задач также может быть реализована так, чтобы новые задачи подгружались при прокрутке к последней видимой задаче. Подробнее см. статью [How to load tasks dynamically](guides/how-to.md#howtoloadtasksdynamically).

