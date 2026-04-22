---
sidebar_label: resource_cell_class
title: resource_cell_class Vorlage
description: "definiert die CSS-Klassenamen der Zellen in der Ressourcen-Zeitleiste"
---

# resource_cell_class
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Definiert die CSS-Klassenamen der Zellen in der Ressourcen-Zeitleiste

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) => string | void;

### Parameters

- `start_date` - (required) *Date* - Anfangsdatum der Skalenzelle  
- `end_date` - (required) *Date* - Enddatum der Skalenzelle
- `resource` - (required) *object* - das Ressourcenobjekt
- `tasks` - (required) *Array* - &lt;Task&gt; Aufgaben, die dem angegebenen Ressourcenobjekt zugewiesen sind und die Start- bzw. Enddaten der Zelle überlappen
- `assignments` - (required) *array* - Ressourcenzuweisungen, die den angegebenen Start- bzw. Enddaten der Aufgabe zugewiesen sind

### Returns
- ` className` - (string | void) - eine Zeichenkette, die dem className-Attribut des Zellen-Elements angehängt wird

### Example

~~~jsx
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks,
    assignments){
    if (tasks.length <= 1) {
        return "workday_ok";
    } else {
        return "workday_over";
    }
};
~~~

### Related Examples
- [Ressourcen-Auslastungsdiagramm](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Vorlagen des Ressourcen-Diagramms](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Mehrere Eigentümer einer Aufgabe zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Arbeits- und Materialressourcen](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
Das "assignments"-Argument ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist.
:::

- Definiert die CSS-Klassenamen der Zellen in der Ressourcen-Zeitleisten-Ansicht.
- Die Ressourcen-Zeitleiste verknüpft Aufgaben mit einer Ressource über die Eigenschaft [resource_property](api/config/resource_property.md) des Aufgabenobjekts.
- Die Vorlage wird nicht für Zellen aufgerufen, in denen sich keine Aufgaben befinden, es sei denn, [resource_render_empty_cells](api/config/resource_render_empty_cells.md) ist aktiviert.
- Aufgaben des [project type](api/config/types.md) werden nicht gezählt und nicht an das `tasks`-Argument übergeben.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md)

### Change log
- Der Parameter **assignments** wurde in Version 7.1 eingeführt

