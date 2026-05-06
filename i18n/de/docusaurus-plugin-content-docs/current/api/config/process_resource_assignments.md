---
sidebar_label: process_resource_assignments
title: process_resource_assignments Konfiguration
description: "aktiviert/deaktiviert das Parsen der Ressourcenzuweisungen"
---

# process_resource_assignments

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

### Description

@short: Aktiviert/deaktiviert das Parsen der Ressourcenzuweisungen

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [Ressourcenwerte bestimmten Tagen zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

When you [assign resources to the specific time of a task](guides/resource-management.md#resourceassignmenttime), the functionality requires the **process_resource_assignments** property to be enabled.
Dies hängt damit zusammen, dass die Eigenschaft das Parsen der Werte aus [gantt.config.resource_property](api/config/resource_property.md) von Aufgaben in die internen Ressourcenzuweisungsobjekte ermöglicht. 

As a result, you are be able to manipulate the resource assignments via the DataStore object, for instance to get the necessary assignment object or update it.
Auf diese Weise können Sie die Ressourcenzuweisungen über das DataStore-Objekt manipulieren, z. B. um das notwendige Zuweisungsobjekt abzurufen oder es zu aktualisieren.

But if you only need to assign resources to the tasks without specifying time or duration of the assignment, you can disable parsing of the assignments using the config:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md)

### Change log
- hinzugefügt in v7.1