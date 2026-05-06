---
title: "Группировка задач"
sidebar_label: "Группировка задач"
---

# Группировка задач

:::info
Эта функциональность доступна только в редакции PRO
:::

Библиотека предоставляет расширение **grouping**, которое позволяет группировать задачи по любому атрибуту задачи.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>


:::note
Чтобы начать использовать расширение, включите его с помощью метода [gantt.plugins](api/method/plugins.md).
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
    //your code will be here
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Группировка задач {#groupingtasks}

Чтобы группировать задачи по какому-либо критерию, используйте метод [groupBy](api/method/groupby.md): 

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

где: 

- **relation_property** - (*обязательный*) свойство объекта задачи, которое будет использоваться для группировки элементов. Например:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

Свойство можно также использовать для организации групп в многоуровневую структуру:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //multi level groups
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*обязательный*) массив групповых элементов (итогов). 

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

Пожалуйста, обратите внимание:

1. Каждый объект 'group' должен содержать как минимум 2 свойства (но может содержать любое количество дополнительных): идентификатор и текстовое описание, задаваемые параметрами 'group_id' и 'group_text' соответственно. По умолчанию эти параметры имеют значения *key* и *label* соответственно. Вы можете использовать любые другие значения для этих параметров (**за исключением "id"**), при условии, что они указаны в массиве групп. 
:::note
Значение "id" не допускается, поскольку при группировке задач Gantt создаёт виртуальные задачи групп и добавляет параметры 'group_id' и 'group_text' в эти задачи. 
Это означает, что по умолчанию сгруппированные задачи будут иметь свойства 'key' и 'value'. В то же время у каждой задачи уже есть свойство 'id', и изменение значений id по умолчанию приведет к нарушению структуры дерева.
:::

2. Элементы групп добавляются в набор данных как элементы типа 'project' с включенным свойством 'readonly'. Их можно распознавать по свойству '$virtual' и обрабатывать как обычные элементы данных:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. Задачи типа 'project' из исходного набора данных не будут отображаться в режиме группировки, однако они будут доступны через API.


- **group_id** - (*необязательный*) идентификатор группы. Значение по умолчанию - 'key'. 
- **group_text** - (*необязательный*) подпись группы. Значение по умолчанию - 'label'.  
- **delimiter** - (*необязательный*) разделитель, используется для автоматического создания групп для задач с несколькими ресурсами. По умолчанию ','.
- **default_group_label** - (<i>string</i>) имя группы по умолчанию. Необязательно. Значение по умолчанию - 'None'.
- **save_tree_structure** - (<i>boolean</i>) задаёт, сохранять ли древовидную структуру в группах. Если не указано или установлено в *false*, задачи будут отображаться в виде плоского списка.

Обратите внимание, что группа по умолчанию включает задачи, которые не входят в другие группы. Группа по умолчанию не включает задачи, если у них значение **relation_property** задано как <i>string|number</i>.
 

## Разгруппировка задач

Чтобы сбросить группировку, вызовите метод [groupBy](api/method/groupby.md) и передайте *false* в качестве параметра:

**Сброс текущей группировки**
~~~js
gantt.groupBy(false);
~~~

## Использование коллекций для задания групп

Обычно группы используются несколькими элементами на странице, и для избежания повторов можно представить группы как именованную коллекцию.

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


## Сохранение исходной иерархии задач внутри групп

В режиме группировки исходная структура дерева Gantt по умолчанию не отображается, и все задачи появляются как потомки первого уровня внутри соответствующих групп.

Чтобы сохранить исходную структуру подзадач внутри групп, используйте настройку **save_tree_structure**:

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