---
sidebar_label: histogram_cell_class
title: histogram_cell_class Vorlage
description: "definiert die CSS-Klasse, die auf eine Zelle des Ressourcenpanels angewendet wird"
---

# histogram_cell_class
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Definiert die CSS-Klasse, die auf eine Zelle im Resource-Panel angewendet wird

@signature: histogram_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - Startdatum der Skalenzelle  
- `end_date` - (required) *Date* - Enddatum der Skalenzelle
- `resource` - (required) *object* - das Ressourcen-Objekt
- `tasks` - (required) *Array* - &lt;Task&gt; Aufgaben, die der angegebenen Ressource zugewiesen sind und die Start- bzw. Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Ressourcenzuweisungen, die den angegebenen Start- und Enddaten der Aufgabe zugewiesen sind

### Returns
- `className` - (string | void) - eine CSS-Klasse für die Histogramm-Timeline-Zelle

### Example

~~~jsx
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks,
    assignments){
    return "";
};
~~~

### Related samples
- [Ressourcen-Histogramm](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Arbeitsbelastung in Prozent zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Ressourcenzuweisungen für bestimmte Tage](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Die 'assignments'-Argument ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist. 
:::

### Related API
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Resource Management](guides/resource-management.md#resourceviewpanel)

### Change log
- Der Parameter **assignments** wurde in Version 7.1 eingeführt

