---
sidebar_label: histogram_cell_class
title: histogram_cell_class template
description: "definiert die CSS-Klasse, die auf eine Zelle im Resource-Panel angewendet wird"
---

# histogram_cell_class
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert die CSS-Klasse, die auf eine Zelle im Resource-Panel angewendet wird

@signature: histogram_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - Startdatum der Skalen-Zelle  
- `end_date` - (required) *Date* - Enddatum der Skalen-Zelle
- `resource` - (required) *object* - das Resource-Objekt
- `tasks` - (required) *Array* - &lt;Task&gt;        Tasks, die der angegebenen Resource zugewiesen sind und sich mit den Start-/Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Resource-Zuweisungen, die mit den angegebenen Start-/Enddaten des Tasks verknüpft sind

### Returns
- ` className` - (string | void) - eine CSS-Klasse für die Zelle der Histogramm-Timeline

### Example

~~~jsx
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks,
    assignments){
    return "";
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Das Argument "assignments" wird nur bereitgestellt, wenn die Konfiguration [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

### Related API
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md#resourceviewpanel)

### Change log
- Der Parameter **assignments** wurde in Version 7.1 eingeführt

