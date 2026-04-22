---
sidebar_label: resource_cell_class
title: resource_cell_class шаблон
description: "определяет имена CSS-классов ячеек в таймлайне ресурсов"
---

# resource_cell_class
:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Определяет имена CSS-классов ячеек в таймлайне ресурсов

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата шкалы ячейки  
- `end_date` - (required) *Date* - конечная дата шкалы ячейки
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt; задачи, назначенные указанному ресурсу и пересекающие даты начала/окончания ячейки
- `assignments` - (required) *array* - назначения ресурсов, которые назначаются на указанные даты начала/окончания задачи

### Returns
- `className` - (string | void) - строка, которая будет добавлена к атрибуту className элемента ячейки

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
- [Диаграмма загрузки ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Шаблоны диаграммы ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Назначение нескольких владельцев задаче](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Ресурсы по труду и материалам](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
Параметр "assignments" доступен только когда включена конфигурация [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

- Определяет имена CSS-классов ячеек в таймлайне ресурсов.
- Таймлайн ресурсов связывает задачи с ресурсом по свойству [resource_property](api/config/resource_property.md) объекта задачи.
- Шаблон не вызывается для ячеек, в которых нет задач, если не включено [resource_render_empty_cells](api/config/resource_render_empty_cells.md).
- Задачи типа [тип проекта](api/config/types.md) не учитываются и не передаются в аргумент `tasks`.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- параметр **assignments** добавлен в версии v7.1