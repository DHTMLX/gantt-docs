---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated Vorlage
description: "definiert die Höhe des ausgefüllten Bereichs im resourceHistogram"
---

# histogram_cell_allocated
:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Spezifiziert die Höhe des ausgefüllten Abschnitts im resourceHistogram

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (erforderlich) *Date* - Startdatum der Skalenzelle
- `end_date` - (erforderlich) *Date* - Enddatum der Skalenzelle
- `resource` - (erforderlich) *object* - das Ressourcenobjekt
- `tasks` - (erforderlich) *Array* - &lt;Task&gt;  Tasks, die dem angegebenen Ressourcenobjekt zugeordnet sind und die Start-/Enddaten der Zelle überschneiden
- `assignments` - (erforderlich) *array* - Ressourcenzuweisungen, die den angegebenen Start- bzw. Enddaten der Aufgabe zugeordnet sind

### Returns
- ` height` - (number | void) - die Höhe des ausgefüllten Bereichs im resourceHistogram

### Example

~~~jsx
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks,
    assignments){
     return tasks.length * 8;
};
~~~

### Related samples
- [Ressourcen-Histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Arbeitslast in Prozenten zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Ressourcenzuweisungen für bestimmte Tage](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Die "assignments"-Argument ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist. 
:::

Der Wert der Vorlage kann von 0 bis *maxCapacity* festgelegt werden.

**maxCapacity-Definition**

Wenn jede Zeile des Histogramms als Balkendiagramm betrachtet wird, entspricht maxCapacity der Höhe der Y-Skala dieses Diagramms. Im unten gezeigten Bild beträgt maxCapacity = 24:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md#resourceviewpanel)

### Change log
- der **assignments**-Parameter wurde in Version v7.1 hinzugefügt.