---
sidebar_label: resource_cell_class
title: resource_cell_class template
description: "definiert die CSS-Klassennamen für Zellen in der Resource-Timeline-Ansicht"
---

# resource_cell_class
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert die CSS-Klassennamen für Zellen in der Resource-Timeline-Ansicht

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - Startdatum der Skalen-Zelle  
- `end_date` - (required) *Date* - Enddatum der Skalen-Zelle
- `resource` - (required) *object* - das Resource-Objekt
- `tasks` - (required) *Array* - &lt;Task&gt;        Tasks, die der angegebenen Resource zugewiesen sind und sich mit den Start- und Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Resource-Zuweisungen, die mit den angegebenen Start- und Enddaten der Task verknüpft sind

### Returns
- ` className` - (string | void) - ein String, der dem className-Attribut des Zellen-Elements hinzugefügt wird

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
 Der Parameter "assignments" ist nur verfügbar, wenn die Konfiguration [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

- Steuert die CSS-Klassennamen, die auf Zellen in der Resource-Timeline angewendet werden.
- Die Resource-Timeline verbindet Tasks mit Resources basierend auf der Eigenschaft, die in [resource_property](api/config/resource_property.md) definiert ist.
- Diese Template-Funktion wird nicht für Zellen ohne Tasks ausgelöst, es sei denn, [resource_render_empty_cells](api/config/resource_render_empty_cells.md) ist aktiviert.
- Tasks des [Projekt-Typs](api/config/types.md) sind ausgeschlossen und werden nicht im Parameter `tasks` enthalten sein.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)

### Change log
- Der Parameter **assignments** wurde in Version 7.1 eingeführt

