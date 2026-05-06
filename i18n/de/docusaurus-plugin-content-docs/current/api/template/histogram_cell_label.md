---
sidebar_label: histogram_cell_label
title: histogram_cell_label Vorlage
description: "definiert die Beschriftung in einer Zelle"
---

# histogram_cell_label
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Definiert die Beschriftung in einer Zelle

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (erforderlich) *Date* - Startdatum der Skalenzelle  
- `end_date` - (erforderlich) *Date* - Enddatum der Skalenzelle
- `resource` - (erforderlich) *object* - Das Ressourcenobjekt
- `tasks` - (erforderlich) *Array* - &lt;Task&gt;        Aufgaben, die dem angegebenen Ressourcenobjekt zugewiesen sind und Start-/Enddaten der Zelle überlappen
- `assignments` - (erforderlich) *array* - Ressourcenzuweisungen, die den angegebenen Start-/Enddaten der Aufgabe zugeordnet sind

### Returns
- ` label` - (string | number | void) - ein HTML-Text für die Beschriftung in einer Histogramm-Zelle

### Example

~~~jsx
gantt.templates.histogram_cell_label = function(start_date,end_date,resource,tasks,
    assignments){
    return tasks.length * 8;
};
~~~

### Related samples
- [Ressourcen-Histogramm](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Arbeitslast in Prozent zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Ressourcenwerte bestimmten Tagen zuordnen](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details
:::note
Der Parameter "assignments" ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist.
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md#resourceviewpanel)

### Change log
- der **assignments**-Parameter wurde in Version 7.1 eingeführt

