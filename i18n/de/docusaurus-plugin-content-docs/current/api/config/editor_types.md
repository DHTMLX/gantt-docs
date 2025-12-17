---
sidebar_label: editor_types
title: editor_types config
description: "ein Objekt, das Definitionen für Inline-Editoren enthält"
---

# editor_types

### Description

@short: Ein Objekt, das Definitionen für Inline-Editoren enthält

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// benutzerdefinierte Editor-Logik}
~~~

### Details

Diese Konfiguration wird verwendet, um benutzerdefinierte Editoren zu erstellen (wie im obigen Beispiel gezeigt).

Es stehen mehrere eingebaute Inline-Editoren zur Verfügung:

- **text** - (*InlineEditor*) - wird zum Bearbeiten von Textfeldern verwendet, z.B. Aufgabennamen
- **number** - (*InlineEditor*) - wird zum Bearbeiten numerischer Felder verwendet, wie z.B. Aufgabendauer oder Reihenfolge
- **duration** - (*InlineEditor*) - zum Bearbeiten von Dauerfeldern, also der Aufgabendauer.
Dies funktioniert nur, wenn die ***map_to:"duration"*** Konfiguration angewendet wird und der [Editor-Typ](guides/inline-editing.md#typesofeditors) auf **"duration"** gesetzt ist
- **date** - (*InlineEditor*) - zum Bearbeiten von Datumsfeldern, wie z.B. Start- und Enddatum der Aufgabe
- **select** - (*InlineEditor*) - zum Auswählen einer Option aus einer Dropdown-Liste
- **predecessor** - (*InlineEditor*) - zum Zuweisen einer Vorgängeraufgabe zur aktuellen Aufgabe. Dieser Editor verwendet [WBS-Codes](guides/specifying-columns.md#wbscode), um die Vorgängeraufgabe zu verknüpfen
- **[customEditorName: string]** - (*InlineEditor | undefined*) - zum Definieren benutzerdefinierter Inline-Editoren

Hier definierte Editoren können Spalten im gantt zugewiesen werden:

~~~js
const textEditor = {type: "text", map_to: "text"};
const dateEditor =  {type: "date", map_to: "start_date",
    min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};

gantt.config.columns = [
    {name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
    {name: "start_date", label: "Start time", align: "center", editor: dateEditor}
];

~~~

### Related Guides
- ["Inline-Bearbeitung im Grid"](guides/inline-editing.md#typesofeditors)
