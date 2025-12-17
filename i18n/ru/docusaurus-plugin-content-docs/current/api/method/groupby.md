---
sidebar_label: groupBy
title: groupBy method
description: "организация задач на основе конкретного свойства задачи"
---

# groupBy
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Организация задач на основе конкретного свойства задачи

@signature: groupBy: (config: GroupConfig | boolean) =\> void

### Parameters

- `config` - (required) *GroupConfig | boolean* -         объект конфигурации для группировки или false для отключения группировки

### Example

~~~jsx
// группировка одного уровня
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
    ],
    group_id: "key",
    group_text: "label",
    save_tree_structure: true
});

// многоуровневая группировка
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // вложенные группы
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});

// использование предопределённых коллекций
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

// отключение группировки
gantt.groupBy(false);
~~~

### Related samples
- [Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

### Details
:::note
 Этот метод является частью расширения **grouping**, поэтому плагин [grouping](guides/extensions-list.md#grouping) должен быть включён. Подробнее см. статью [Группировка задач](guides/grouping.md). 
:::


Объект конфигурации группировки включает в себя следующие свойства:

- **relation_property** - (*string*) - свойство задачи, по которому происходит группировка.
- **groups** - (*СollectionItem[]*) - массив элементов групп (сводных элементов). Каждый элемент должен содержать свойства, указанные в **group_id** и **group_text** (по умолчанию *key* и *label*).
- **group_id?** - (*string*) - необязательный идентификатор групп. По умолчанию 'key'.
- **group_text?** - (*string*) - необязательная метка групп. По умолчанию 'label'.
- **delimiter?** - (*string*) - необязательный разделитель, используется для автоматического создания групп для задач с несколькими ресурсами. По умолчанию ",".
- **default_group_label?** - (*string*) - необязательная метка для группы по умолчанию. По умолчанию 'None'.
- **save_tree_structure?** - (*boolean*) - необязательный параметр, определяющий, сохраняет ли Gantt исходную древовидную структуру внутри групп. Если не указано или false, задачи отображаются как плоский список.


Обратите внимание:

- Каждый объект группы должен иметь как минимум два свойства: идентификатор и текстовую метку, определённые через 'group_id' и 'group_text' соответственно. По умолчанию это *key* и *label*. Можно использовать другие имена, кроме "id", при условии, что они присутствуют в массиве групп. 

:::note
Свойство "id" не разрешено, так как Gantt создаёт виртуальные групповые задачи и вставляет в них свойства 'group_id' и 'group_text'. Это означает, что сгруппированные задачи по умолчанию будут иметь свойства 'key' и 'value'. Поскольку у каждой задачи уже есть свойство 'id', изменение этих стандартных идентификаторов может нарушить структуру дерева. 
:::

- Исходные задачи типа 'project' не отображаются в режиме группировки, но остаются доступными через API.
- Элементы групп добавляются как задачи типа 'project' с установленным флагом 'readonly'. Их можно идентифицировать по свойству '$virtual' и обрабатывать как обычные задачи:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- Группа по умолчанию содержит задачи, не относящиеся к другим группам. Она исключает задачи, у которых **relation_property** задано как <i>string|number</i>.<br> 

:::note
sample [Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html) 
:::

### Related Guides
- [Группировка задач](guides/grouping.md)

### Change log
- опция **save_tree_structure** была добавлена в версии v8.0
