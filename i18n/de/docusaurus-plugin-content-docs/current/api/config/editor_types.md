---
sidebar_label: editor_types
title: editor_types config
description: "ein Objekt, das Definitionen von Inline-Editoren enthält"
---

# editor_types

### Description

@short: Ein Objekt, das Definitionen von Inline-Editoren enthält

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// benutzerdefinierte Editor-Logik}
~~~

### Details

Die Konfiguration kann verwendet werden, um benutzerdefinierte Editoren zu erstellen (siehe obiges Beispiel).

Es gibt mehrere vordefinierte Inline-Editoren:

- **text** - (*InlineEditor*) - zum Bearbeiten von Textspalten, z. B. Aufgabenname
- **number** - (*InlineEditor*) - zum Bearbeiten von Zahlen-Spalten, z.B. Dauer der Aufgabe, Reihenfolge, usw.
- **duration** - (*InlineEditor*) - zum Bearbeiten von Dauer-Spalten, d.h. der Aufgaben-Dauer. Funktioniert nur, wenn die ***map_to:"duration"*** Konfiguration verwendet wird und [der Editor-Typ](guides/inline-editing.md#types-of-editors) auf den **"duration"** Typ gesetzt ist
- **date** - (*InlineEditor*) - zum Bearbeiten von Datums-Spalten, d.h. Start- und Enddatum der Aufgabe
- **select** - (*InlineEditor*) - zur Auswahl einer Option aus einer Liste
- **predecessor** - (*InlineEditor*) - zum Festlegen des Task-Vorgängers für die aktuell bearbeiteten Aufgabe. Dieser Editor erhält die [WBS-Codes der Aufgaben](guides/specifying-columns.md#wbscode), um die Verbindung zur Vorgängeraufgabe herzustellen
- **[customEditorName: string]** - (*InlineEditor | undefined*) - benutzerdefinierte Inline-Editoren


In diesem Objekt definierte Editoren können an Gantt-Spalten angehängt werden:

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
- [Inline-Bearbeitung im Grid](guides/inline-editing.md#types-of-editors)