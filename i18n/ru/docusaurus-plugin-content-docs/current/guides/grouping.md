---
title: "Группировка задач"
sidebar_label: "Группировка задач"
---

Группировка задач
=========================

:::note
Эта функция доступна только в редакции PRO
:::

Библиотека включает расширение **grouping**, которое позволяет организовывать задачи на основе любого атрибута задачи.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>

:::note
Чтобы начать работу с этим расширением, активируйте его с помощью метода [gantt.plugins](api/method/plugins.md).
:::

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({
        grouping: true
    });
    //ваш код будет здесь
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Группировка задач {#groupingtasks}

Чтобы сгруппировать задачи по определённому критерию, используйте метод [groupBy](api/method/groupby.md):

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] 
};

gantt.groupBy({
    relation_property: "priority",
    groups: [{key:1, label: "High"},{key:2, label: "Normal"},{key:3, label: "Low"}],
    group_id: "key",
    group_text: "label"
});
~~~

Подробности:

- **relation_property** - (*обязательно*) свойство объекта задачи, по которому выполняется группировка. Например:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

Это свойство также может использоваться для создания многоуровневых групповых структур:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //многоуровневые группы
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*обязательно*) массив групп (сводных элементов).

~~~js
gantt.groupBy({
    groups: [
        {key:1, label: "High"}, 
        {key:2, label: "Normal"},
        {key:3, label: "Low"}
    ],
    group_id: "key",
    group_text: "label"
});
~~~   

Важные замечания:

1. Каждый объект группы должен содержать как минимум два свойства (и любые дополнительные): идентификатор и текстовое описание, определяемые параметрами 'group_id' и 'group_text' соответственно. По умолчанию это *key* и *label*. Можно выбрать другие значения для этих параметров (**кроме "id"**), если они присутствуют в объектах групп. 
:::note
Свойство "id" запрещено, потому что Gantt создает виртуальные групповые задачи при группировке и назначает им свойства 'group_id' и 'group_text'. Это значит, что сгруппированные задачи по умолчанию будут иметь свойства 'key' и 'label'. Поскольку каждая задача уже содержит 'id', изменение этого свойства нарушит древовидную структуру.
:::

2. Групповые элементы добавляются в набор данных как элементы типа 'project' с установленным флагом 'readonly'. Их можно идентифицировать по свойству '$virtual' и обрабатывать как обычные элементы данных:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. Оригинальные задачи типа 'project' в наборе данных не отображаются в режиме группировки, но остаются доступными через API.

- **group_id** - (*необязательно*) свойство, используемое как идентификатор группы. По умолчанию 'key'.  
- **group_text** - (*необязательно*) свойство, используемое как название группы. По умолчанию 'label'.  
- **delimiter** - (*необязательно*) используется для автоматического создания групп для задач с несколькими ресурсами. По умолчанию ",".  
- **default_group_label** - (<i>string</i>) название группы по умолчанию. Необязательно, по умолчанию 'None'.  
- **save_tree_structure** - (<i>boolean</i>) определяет, сохраняет ли Gantt исходную древовидную структуру внутри групп. Если параметр не указан или установлен в *false*, задачи отображаются как плоский список.

Обратите внимание, что группа по умолчанию содержит задачи, которые не принадлежат ни к одной другой группе. Задачи с **relation_property**, указанным как <i>string|number</i>, не будут включены в группу по умолчанию.

 

Снятие группировки задач
------------------------------

Чтобы снять группировку, вызовите метод [groupBy](api/method/groupby.md) с аргументом *false*:

**Сброс текущей группировки**
~~~js
gantt.groupBy(false);
~~~

Использование коллекций для указания групп
------------------------------------------

Группы часто используются сразу в нескольких компонентах на странице. Чтобы избежать дублирования, группы можно определить как именованные коллекции.

~~~js
gantt.serverList("priority", [
    {key:1, label: "High"},
    {key:2, label: "Normal"},
    {key:3, label: "Low"}
]);
gantt.groupBy({
    groups: gantt.serverList("priority"),
    relation_property: "priority",
    group_id: "key",
    group_text: "label"
});
~~~


Сохранение исходной иерархии задач в группах
---------------------------------------

По умолчанию при включённой группировке исходная иерархия дерева Gantt не отображается - все задачи становятся прямыми потомками своих групп.

Чтобы сохранить исходную структуру подзадач внутри групп, установите **save_tree_structure** в true:

~~~js
gantt.groupBy({
    groups: [
        { key: 1, label: "Ilona" },
        { key: 2, label: "John" },
        { key: 3, label: "Mike" }
    ],
    relation_property: "owner",
    group_id: "key",
    group_text: "label",
    default_group_label: "Not Assigned",
    save_tree_structure: true /* ! */
});
~~~


[Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)

