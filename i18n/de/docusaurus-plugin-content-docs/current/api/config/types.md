---
sidebar_label: types
title: types config
description: "speichert die Namen der Lightbox-Strukturen (verwendet für verschiedene types von Aufgaben)"
---

# types

### Description

@short: Speichert die Namen der Lightbox-Strukturen (verwendet für verschiedene types von Aufgaben)

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Default value:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

:::note
 Diese Funktionalität ist nur in der PRO Edition verfügbar. 
:::

Das 'types' Objekt besteht aus Paaren von **"programmatischem Typnamen"** und **"Typ-Identifier"**:


- Der programmatische Name dient hauptsächlich der Übersichtlichkeit und erleichtert die Arbeit mit types.
- Der Typ-Identifier wird in der Datenbank gespeichert. Er muss innerhalb des types Objekts eindeutig sein. Falls nötig, kann der Identifier auf einen beliebigen Wert geändert werden:
~~~js
    {"task":0,"project":1,"milestone":2}
~~~

Hier sind die üblichen types:

- **task** - (*string | number*) - der Identifier für den Typ Aufgabe.
- **project** - (*string | number*) - der Identifier für den Typ Projekt.
- **milestone** - (*string | number*) - der Identifier für den Typ Meilenstein.
- **placeholder** - (*string | number*) - der Identifier für den Typ Platzhalter.
- **[typeName: string]** - (*string | number | undefined*) - Identifier für beliebige benutzerdefinierte types.

Gantt wählt die Lightbox basierend auf dem Aufgabentyp aus:

~~~js
types: {
    'task':'task',            // Lightbox für reguläre Aufgaben
    'project':'project',      // Lightbox für Projektaufgaben
    'milestone':'milestone'   // Lightbox für Meilensteine
}
~~~

### Related Guides
- [Task Types](guides/task-types.md)
