---
sidebar_label: resource_cell_value
title: resource_cell_value template
description: "задаёт HTML-содержимое для ячеек в ресурсной временной шкале"
---

# resource_cell_value
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Задаёт HTML-содержимое для ячеек в ресурсной временной шкале

@signature: resource_cell_value: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;            задачи, назначенные указанному ресурсу, которые пересекаются с датами начала/конца ячейки
- `assignments` - (required) *array* - назначения ресурсов, назначенные на указанные даты начала/конца задачи

### Returns
- ` html` - (string | number | void) - HTML-строка, которая будет вставлена внутрь innerHTML ячейки

### Example

~~~jsx
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    return "<div>" + tasks.length * 8 + "</div>";
};
~~~

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Assign multiple owners to a task](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
 Аргумент "assignments" доступен только если включена конфигурация [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

- Задаёт HTML-содержимое для ячеек внутри ресурсной временной шкалы.
- Ресурсная временная шкала связывает задачи с ресурсами, используя свойство [resource_property](api/config/resource_property.md) в объекте задачи.
- Этот шаблон не вызывается для ячеек без задач, если не включена опция [resource_render_empty_cells](api/config/resource_render_empty_cells.md).
- Задачи типа [project](api/config/types.md) исключаются и не передаются в аргумент `tasks`.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_class](api/template/resource_cell_class.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- параметр **assignments** был добавлен в версии v7.1

