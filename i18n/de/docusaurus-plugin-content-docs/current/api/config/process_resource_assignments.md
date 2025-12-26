---
sidebar_label: process_resource_assignments
title: process_resource_assignments config
description: "Aktiviert oder deaktiviert das Parsen von Ressourcen-Zuweisungen"
---

# process_resource_assignments
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Aktiviert oder deaktiviert das Parsen von Ressourcen-Zuweisungen

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Wenn Ressourcen einem bestimmten Zeitpunkt innerhalb einer Aufgabe zugewiesen werden, muss die Eigenschaft **process_resource_assignments** aktiviert sein.
Dies liegt daran, dass diese Eigenschaft das Parsen der Werte aus [gantt.config.resource_property](api/config/resource_property.md) der Aufgaben in interne Ressourcen-Zuweisungsobjekte übernimmt.

Dadurch können Sie mit Ressourcen-Zuweisungen über das DataStore-Objekt arbeiten, z. B. Zuweisungsobjekte abrufen oder aktualisieren.


Wenn das Ziel lediglich darin besteht, Ressourcen Aufgaben zuzuweisen, ohne spezifische Zeiten oder Dauern für die Zuweisungen festzulegen, können Sie das Parsen der Zuweisungen mit dieser Einstellung deaktivieren:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md#managingresourceassignments)

### Change log
- hinzugefügt in v7.1

