---
sidebar_label: resource_cell_value
title: resource_cell_value шаблон
description: "определяет HTML-содержимое ячеек временной шкалы ресурсов"
---

# resource_cell_value
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Определяет HTML-содержимое ячеек временной шкалы ресурсов

@signature: resource_cell_value: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (обязательный) *Date* - начальная дата ячейки шкалы
- `end_date` - (обязательный) *Date* - конечная дата ячейки шкалы
- `resource` - (обязательный) *object* - объект ресурса
- `tasks` - (обязательный) *Array* - &lt;Task&gt; задачи, назначенные указанному ресурсу и перекрывающие даты начала/конца ячейки
- `assignments` - (обязательный) *array* - назначения ресурсов, которые назначаются на указанные даты начала/конца задачи

### Returns
- `html` - (string | number | void) - HTML-строка, которая будет вставлена в innerHTML ячейки

### Example

~~~jsx
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    return "<div>" + tasks.length * 8 + "</div>";
};
~~~

### Related samples
- [Диаграмма загрузки ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Шаблоны диаграммы ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Назначить нескольким владельцам задачу](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Рабочие и материальные ресурсы](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
Аргумент "assignments" доступен только при включенной конфигурации [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

- Определяет HTML-содержимое ячеек временной шкалы ресурсов.
- Временная шкала ресурсов связывает задачи с ресурсом по свойству [resource_property](api/config/resource_property.md) объекта задачи.
- Шаблон не вызывается для ячеек, в которых нет задач, если не включена опция [resource_render_empty_cells](api/config/resource_render_empty_cells.md).
- Задачи типа [project type](api/config/types.md) не учитываются и не будут переданы в аргумент `tasks`.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_class](api/template/resource_cell_class.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- параметр **assignments** добавлен в версии v7.1