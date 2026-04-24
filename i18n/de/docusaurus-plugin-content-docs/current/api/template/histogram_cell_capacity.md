---
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity Vorlage
description: "bestimmt die Höhe der Linie, die die verfügbare Kapazität der Ressource definiert"
---

# histogram_cell_capacity
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Definiert die Höhe der Linie, die die verfügbare Kapazität einer Ressource darstellt

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) => number | void;

### Parameters

- `start_date` - (required) *Date* - Startdatum der Skalenzelle  
- `end_date` - (required) *Date* - Enddatum der Skalenzelle
- `resource` - (required) *object* - das Ressourcenobjekt
- `tasks` - (required) *Array* - &lt;Task&gt;        Aufgaben, die dem angegebenen Ressourcenobjekt zugewiesen sind und sich mit Start- bzw. Enddatum der Zelle überschneiden
- `assignments` - (required) *array* - Ressourcenzuordnungen, die dem angegebenen Start- bzw. Enddatum der Aufgabe zugewiesen sind

### Returns
- `height` - (number | void) - die Höhe der Linie, die die verfügbare Kapazität der Ressource definiert

### Example

~~~jsx
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
};
~~~

### Related samples
- [Ressourcen-Histogramm](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Arbeitslast in Prozent zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Ressourcenwerte bestimmten Tagen zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Der "assignments"-Parameter ist nur verfügbar, wenn die [](api/config/process_resource_assignments.md) Konfiguration aktiviert ist.
:::

Der Wert der Vorlage kann von -1 bis maxCapacity festgelegt werden. Werte kleiner als 0 rendern die Linie nicht.

**Definition von maxCapacity**

Wenn jede Zeile des Histogramms als Balkendiagramm betrachtet wird, ist maxCapacity die Höhe der Y-Skala dieses Diagramms. Im untenstehenden Bild entspricht maxCapacity = 24:

![maxCapacity](/img/maxcapacity.png)

Standardmäßig ist **maxCapacity** für alle Ressourcen 24. Das bedeutet, dass, wenn Sie den Wert größer als 24 in der *histogram_cell_capacity*-Vorlage zurückgeben, die Zahlen korrekt berechnet werden, aber der Bereich der Zellen des Ressourcenpanels möglicherweise nicht so ausgefüllt wird, wie Sie es erwarten.

![filled_capacity](/img/filled_capacity.png)

Aber es gibt die Möglichkeit, **maxCapacity** für alle Histogramme auf einmal und für jede Ressource separat zu konfigurieren. Sehen Sie unten das Beispiel:

:::note
  https://snippet.dhtmlx.com/glnqcsgq Konfigurieren von maxCapacity 
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md#resourceviewpanel)

### Change log
- der Parameter **assignments** wurde in Version 7.1 hinzugefügt

