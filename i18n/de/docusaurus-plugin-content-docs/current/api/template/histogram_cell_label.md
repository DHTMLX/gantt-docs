---
sidebar_label: histogram_cell_label
title: histogram_cell_label template
description: "definiert das Label, das innerhalb einer Zelle angezeigt wird"
---

# histogram_cell_label
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert das Label, das innerhalb einer Zelle angezeigt wird

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - das Startdatum der Skalierungszelle  
- `end_date` - (required) *Date* - das Enddatum der Skalierungszelle
- `resource` - (required) *object* - das Ressourcenobjekt, das mit der Zelle verknüpft ist
- `tasks` - (required) *Array* - &lt;Task&gt;        den angegebenen Ressourcen zugewiesene Aufgaben, die sich mit den Start- und Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Ressourcenzuweisungen, die mit den angegebenen Start-/Enddaten der Aufgaben verknüpft sind

### Returns
- ` label` - (string | number | void) - ein HTML-String oder eine Zahl, die als Label innerhalb einer Histogramm-Zelle verwendet wird

### Example

~~~jsx
gantt.templates.histogram_cell_label = function(start_date,end_date,resource,tasks,
    assignments){
    return tasks.length * 8;
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details


:::note
 Der Parameter "assignments" wird nur bereitgestellt, wenn die Konfiguration [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md#resourceviewpanel)

### Change log
- der **assignments**-Parameter wurde in Version 7.1 eingeführt

