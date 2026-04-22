---
sidebar_label: groupBy
title: groupBy method
description: "Группирует задачи по указанному атрибуту задачи"
---

# groupBy

:::info
Эта функциональность доступна только в PRO-издании.
:::

### Description

@short: Группирует задачи по указанному атрибуту задачи

@signature: groupBy: (config: GroupConfig | boolean) =\> void

### Parameters

- `config` - (required) *GroupConfig | boolean* - объект конфигурации группировки, или false для снятия группировки задач

### Example

~~~jsx
// one-level grouping
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

//multi-level grouping
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // multi level groups
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});

// using collections
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

// ungrouping tasks
gantt.groupBy(false);
~~~

### Related samples
- [Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

### Details

:::note
Этот метод определён в расширении **grouping**, поэтому необходимо активировать плагин [grouping](guides/extensions-list.md#grouping). Прочитайте детали в статье [Grouping Tasks](guides/grouping.md).
:::

Объект конфигурации группировки имеет следующие свойства:

- **relation_property** - (*string*) - свойство объекта задачи, которое будет использоваться для группировки элементов.
- **groups** - (*СollectionItem[]*) - массив групп (summary) элементов. Каждый элемент должен иметь свойства, заданные параметрами **group_id** и **group_text** (по умолчанию *key* и *label*).
- **group_id?** - (*string*) - необязательный, идентификатор группы. Значение по умолчанию: 'key'.
- **group_text?** - (*string*) - необязательный, подпись группы. Значение по умолчанию: 'label'.
- **delimiter?** - (*string*) - необязательный, разделитель, используется для автоматического создания групп для задач с несколькими ресурсами. Значение по умолчанию: ",".
- **default_group_label?** - (*string*) - необязательный, имя дефолтной группы. По желанию. Значение по умолчанию: 'None'.
- **save_tree_structure?** - (*boolean*) - необязательный, определяет, следует ли сохранять структуру дерева внутри групп. Если не указано или установлено в *false*, задачи gantt будут отображаться в виде плоского списка.

Пожалуйста, обратите внимание:

- Каждый объект 'group' должен содержать как минимум 2 свойства (но может содержать любое количество дополнительных): идентификатор и текстовое описание, заданные параметрами **group_id** и **group_text** соответственно. По умолчанию эти параметры имеют значения *key* и *label* соответственно. Вы можете использовать любые другие значения для этих параметров (кроме "id"), при условии, что они указаны в массиве group.

:::note
Значение "id" не допускается, поскольку при группировке задач Gantt создаёт виртуальные задачи группы и добавляет параметры 'group_id' и 'group_text' в эти задачи. Это означает, что по умолчанию сгруппированные задачи будут иметь свойства 'key' и 'value'. При этом каждая задача уже имеет свойство 'id', и изменение значений id задач по умолчанию приведёт к нарушению структуры дерева.
:::

- Задачи типа 'project' из исходного набора данных не будут отображаться в режиме группировки, однако будут доступны через API.
- Элементы группирования добавляются в набор данных как элементы типа 'project' с включенным свойством 'readonly'. Их можно определить по свойству '$virtual' и обрабатывать как обычные элементы данных:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- По умолчанию группа включает задачи, которые не входят в другие группы. Эта дефолтная группа не включает задачи, если у них значение **relation_property** задано как строка|число.

:::note
[Сохранение структуры дерева при группировке задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)
::: 

### Related Guides
- [Grouping Tasks](guides/grouping.md)

### Change log
- параметр **save_tree_structure** был добавлен в версии v8.0