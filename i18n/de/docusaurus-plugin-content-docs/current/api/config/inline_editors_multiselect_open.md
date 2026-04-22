---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open Konfiguration
description: "Definiert, ob der Inline-Editor nach einem einzelnen Klick auf eine Aufgabe geöffnet werden soll, wenn die Mehrfachauswahl von Aufgaben aktiviert ist"
---

# inline_editors_multiselect_open

### Description

@short: Definiert, ob der Inline-Editor nach einem einzelnen Klick auf eine Aufgabe geöffnet werden soll, wenn die Mehrfachauswahl von Aufgaben aktiviert ist

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Standardwert:** undefined

### Details

Im Einzelauswahlmodus öffnet Gantt den Inline-Editor, nachdem Sie auf eine Aufgabe geklickt haben.

Im Mehrfachauswahlmodus wird beim ersten Klick auf eine noch nicht ausgewählte Aufgabe diese ausgewählt; beim zweiten Klick auf die Aufgabe öffnet sich der Inline-Editor.
Wenn Sie möchten, dass Gantt den Inline-Editor nach dem ersten Klick öffnet, aktivieren Sie die Konfiguration **inline_editors_multiselect_open**.

### Related Guides
- [Inline Editing im Grid](guides/inline-editing.md)
- [Mehrfachauswahl von Aufgaben](guides/multiselection.md)

### Change log
- hinzugefügt in v7.1.13