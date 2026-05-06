---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll Konfiguration
description: "gibt an, ob der Gantt-Container das Mausrad-Ereignis blockieren soll oder ob es zum Fenster-Element weitergeleitet werden soll"
---

# prevent_default_scroll

:::warning
Die Eigenschaft ist veraltet.
::: 

### Description

@short: Gibt an, ob der Gantt-Container das Mausrad-Ereignis blockieren soll oder ob es an das Fenster-Element weitergeleitet werden soll

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**Standardwert:** false

### Details

Die Option ist nützlich in Fällen, in denen das Gantt-Diagramm mitten in der Seite eingefügt wird und außerhalb des Diagramms Inhalte vorhanden sind.

Wenn die Option deaktiviert ist, bleibt das Scrollen, das im Gantt aufgetreten ist, dort bestehen. Um andere Teile der Seite zu scrollen, muss der Benutzer außerhalb des Gantt klicken.

### Change log
- veraltet seit v5.0