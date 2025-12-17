---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated template
description: "spezifiziert die Höhe des ausgefüllten Abschnitts im resourceHistogram"
---

# histogram_cell_allocated
:::info
 Diese Funktion ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Spezifiziert die Höhe des ausgefüllten Abschnitts im resourceHistogram

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - Anfangsdatum der Skalen-Zelle  
- `end_date` - (required) *Date* - Enddatum der Skalen-Zelle
- `resource` - (required) *object* - das Ressourcenobjekt
- `tasks` - (required) *Array* - &lt;Task&gt;        den gegebenen Ressourcen zugewiesene Aufgaben, die sich mit den Start-/Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Ressourcenzuweisungen, die mit den angegebenen Start-/Enddaten der Aufgabe verknüpft sind

### Returns
- ` height` - (number | void) - die Höhe des ausgefüllten Abschnitts im resourceHistogram

### Example

~~~jsx
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks,
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
 Der Parameter "assignments" ist nur zugänglich, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist. 
:::

Der Rückgabewert der Template-Funktion kann von 0 bis zu *maxCapacity* reichen.

**maxCapacity erklärt**

Wenn jede Histogramm-Zeile als Balkendiagramm betrachtet wird, repräsentiert maxCapacity die Höhe der Y-Achse dieses Diagramms. Im Beispielbild unten entspricht maxCapacity dem Wert 24:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md#resourceviewpanel)

### Change log
- der **assignments** Parameter wurde in Version 7.1 eingeführt

