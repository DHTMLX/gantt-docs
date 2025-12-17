---
sidebar_label: resource_cell_class
title: resource_cell_class template
description: "определяет CSS классы для ячеек в представлении resource timeline"
---

# resource_cell_class
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет CSS классы для ячеек в представлении resource timeline

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные указанному ресурсу и пересекающиеся с периодом ячейки (start_date - end_date)
- `assignments` - (required) *array* - назначения ресурсов, связанные с указанными датами начала и конца задачи

### Returns
- ` className` - (string | void) - строка, которая будет добавлена в атрибут className элемента ячейки

### Example

~~~jsx
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks,
    assignments){
    if (tasks.length <= 1) {
        return "workday_ok";
    } else {
        return "workday_over";
    }
};
~~~

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Assign multiple owners to a task](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
Параметр "assignments" доступен только при включенной конфигурации [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

- Управляет CSS классами, применяемыми к ячейкам в resource timeline.
- Resource timeline связывает задачи с ресурсами на основе свойства, определённого в [resource_property](api/config/resource_property.md).
- Этот шаблон не вызывается для ячеек без задач, если не включена настройка [resource_render_empty_cells](api/config/resource_render_empty_cells.md).
- Задачи типа [project](api/config/types.md) исключаются и не входят в параметр `tasks`.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- параметр **assignments** был добавлен в версии v7.1

