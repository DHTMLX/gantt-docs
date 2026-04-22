---
sidebar_label: resource_cell_value
title: resource_cell_value Vorlage
description: "definiert den HTML-Inhalt der Ressourcen-Timeline-Zellen"
---

# resource_cell_value
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Legt den HTML-Inhalt für Zellen im Resource-Timeline fest

@signature: resource_cell_value: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (erforderlich) *Date* - Startdatum der Skalenzelle  
- `end_date` - (erforderlich) *Date* - Enddatum der Skalenzelle
- `resource` - (erforderlich) *object* - das Ressourcen-Objekt
- `tasks` - (erforderlich) *Array* - &lt;Task&gt;  Aufgaben, die dem angegebenen Ressourcenobjekt zugewiesen sind und sich mit Start- bzw. Enddatum der Zelle überschneiden
- `assignments` - (erforderlich) *Array* - Ressourcen-Zuweisungen, die dem angegebenen Start-/Enddatum der Aufgabe zugeordnet sind

### Retruns
- `html` - (string | number | void) - ein HTML-String, der in das innerHTML der Zelle eingefügt wird

### Example

~~~jsx
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    return "<div>" + tasks.length * 8 + "</div>";
};
~~~

### Related samples
- [Ressourcen-Auslastungsdiagramm](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Vorlagen des Ressourcen-Diagramms](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Mehrere Eigentümer einer Aufgabe zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Arbeits- und Materialressourcen](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
Das Argument **assignments** ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md)-Konfiguration aktiviert ist. 
:::

- Definiert den HTML-Inhalt der Ressourcen-Timeline-Zellen.
- Die Ressourcen-Timeline verknüpft Aufgaben mit einer Ressource über die Eigenschaft [resource_property] des Aufgaben-Objekts.
- Die Vorlage wird nicht für Zellen aufgerufen, in denen sich keine Aufgaben befinden, es sei denn, [resource_render_empty_cells](api/config/resource_render_empty_cells.md) ist aktiviert.
- Aufgaben des [project type](api/config/types.md) werden nicht gezählt und nicht an das `tasks`-Argument übergeben.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_class](api/template/resource_cell_class.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md)

### Change log
- der **assignments** Parameter wurde in Version 7.1 hinzugefügt

