---
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity template
description: "definiert die Höhe der Linie, die die verfügbare Kapazität einer Ressource darstellt"
---

# histogram_cell_capacity
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert die Höhe der Linie, die die verfügbare Kapazität einer Ressource darstellt

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - das Startdatum der Skalen-Zelle  
- `end_date` - (required) *Date* - das Enddatum der Skalen-Zelle
- `resource` - (required) *object* - das Ressourcenobjekt selbst
- `tasks` - (required) *Array* - &lt;Task&gt;        den der Ressource zugewiesenen Aufgaben, die sich mit den Start-/Enddaten der Zelle überschneiden
- `assignments` - (required) *array* - Ressourcenzuweisungen, die mit den angegebenen Start-/Enddaten der Aufgabe verknüpft sind

### Returns
- ` height` - (number | void) - die Höhe der Linie, die die verfügbare Kapazität der Ressource anzeigt

### Example

~~~jsx
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Der Parameter "assignments" ist nur zugänglich, wenn die Konfiguration [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist. 
:::

Der Rückgabewert der template-Funktion kann von -1 bis maxCapacity reichen. Werte unter 0 verhindern die Darstellung der Linie.

**maxCapacity erklärt**

Man kann sich jede Histogramm-Zeile als Balkendiagramm vorstellen; maxCapacity repräsentiert die Y-Achsen-Höhe dieses Diagramms. Im folgenden Bild ist maxCapacity gleich 24:

![maxCapacity](/img/maxcapacity.png)

Standardmäßig ist **maxCapacity** für alle Ressourcen auf 24 gesetzt. Ein Rückgabewert über 24 im *histogram_cell_capacity* Template wird zwar korrekt berechnet, jedoch füllen die Zellenbereiche im Ressourcen-Panel möglicherweise nicht wie erwartet.

![filled_capacity](/img/filled_capacity.png)

Es gibt außerdem eine Möglichkeit, **maxCapacity** global für das gesamte Histogramm oder individuell für jede Ressource zu konfigurieren. Siehe folgendes Beispiel:

:::note
Sample: [Konfiguration von maxCapacity ](https://snippet.dhtmlx.com/glnqcsgq)
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Resource Management](guides/resource-management.md#resourceviewpanel)

### Change log
- der Parameter **assignments** wurde in Version 7.1 hinzugefügt

