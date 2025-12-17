---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open config
description: "Steuert, ob der inline Editor bei aktivierter Mehrfachauswahl durch einen einzelnen Klick auf eine Aufgabe geöffnet wird."
---

# inline_editors_multiselect_open

### Description

@short: Steuert, ob der inline Editor bei aktivierter Mehrfachauswahl durch einen einzelnen Klick auf eine Aufgabe geöffnet wird.

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Default value:** undefined

### Details

Im Einzel-Auswahlmodus erscheint der inline Editor direkt nach dem Klick auf eine Aufgabe.

Bei aktivierter Mehrfachauswahl wird die erste Auswahl eines noch nicht ausgewählten Tasks durch einen Klick vorgenommen, und erst der zweite Klick öffnet den inline Editor.
Um den inline Editor bereits beim ersten Klick auch im Mehrfachauswahlmodus zu öffnen, setzen Sie die Option **inline_editors_multiselect_open** auf true.

### Related Guides
- ["Inline-Bearbeitung im Grid"](guides/inline-editing.md)
- ["Multi-Task-Auswahl"](guides/multiselection.md)

### Change log
- hinzugefügt in v7.1.13
