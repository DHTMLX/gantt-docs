---
sidebar_label: resource_cell_value
title: resource_cell_value template
description: "legt den HTML-Inhalt für Zellen im Resource-Timeline fest"
---

# resource_cell_value
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Legt den HTML-Inhalt für Zellen im Resource-Timeline fest

@signature: resource_cell_value: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - Startdatum der Skalen-Zelle  
- `end_date` - (required) *Date* - Enddatum der Skalen-Zelle
- `resource` - (required) *object* - das Ressourcenobjekt
- `tasks` - (required) *Array* - &lt;Task&gt;            Tasks, die der angegebenen Ressource zugewiesen sind und sich mit den Start-/Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Ressourcenzuweisungen, die den angegebenen Start-/Enddaten des Tasks zugeordnet sind

### Returns
- ` html` - (string | number | void) - einen HTML-String, der in das innerHTML der Zelle eingefügt wird

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
 Das Argument "assignments" ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist. 
:::

- Legt den HTML-Inhalt für Zellen innerhalb der Resource-Timeline fest.
- Die Resource-Timeline verbindet Tasks mit Ressourcen über die [resource_property](api/config/resource_property.md) Eigenschaft im Task-Objekt.
- Dieses Template wird nicht für Zellen ohne Tasks ausgelöst, es sei denn, [resource_render_empty_cells](api/config/resource_render_empty_cells.md) ist aktiviert.
- Tasks des [Projekt-Typs](api/config/types.md) sind ausgeschlossen und werden nicht an das `tasks` Argument übergeben.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_class](api/template/resource_cell_class.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)

### Change log
- der **assignments** Parameter wurde in Version 7.1 hinzugefügt

