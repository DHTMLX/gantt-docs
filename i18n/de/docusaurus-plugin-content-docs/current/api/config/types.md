---
sidebar_label: types
title: types config
description: "Speichert die Namen der Lightbox-Strukturen (verwendet für verschiedene Aufgabentypen)"
---

# types

### Description

@short: Speichert die Namen der Lightbox-Strukturen (verwendet für verschiedene Aufgabentypen)

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Default value:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

:::note
 Diese Funktionalität ist in der PRO-Edition verfügbar.
:::

Das 'types'-Objekt besteht aus den Paaren des **"type programmatic name"**: **"type identifier"**-Paaren:


  Der Typ-Programmiername beeinflusst nichts. Der einzige Zweck davon ist, die Arbeit mit Typen lesbarer zu machen.
  Der Typ-Identifier wird in der Datenbank gespeichert. Er muss innerhalb des Typs-Objekts eindeutig sein. Falls erforderlich, kann der Typ-Identifier auf jeden gewünschten Wert geändert werden:
~~~js
{"task":0,"project":1,"milestone":2}
~~~
  


Die erwarteten Typen sind:

- **task** - (*string | number*) - der Name des Task-Typs.
- **project** - (*string | number*) - der Name des Projekt-Typs.
- **milestone** - (*string | number*) - der Name des Meilenstein-Typs.
- **placeholder** - (*string | number*) - der Name des Platzhalter-Typs.
- **[typeName: string]** - (*string | number | undefined*) - der Name des benutzerdefinierten Typs.


Gantt wird die Lightbox abhängig vom Task-Typ verwenden:

~~~js
types: {
    'task':'task',            // eine Lightbox für reguläre Tasks
    'project':'project',      // eine Lightbox für Projekttasks
    'milestone':'milestone'   // eine Lightbox für Meilensteine
}
~~~

### Related Guides
- [Aufgabentypen](guides/task-types.md)