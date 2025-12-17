---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll config
description: "Steuert, ob der Gantt-Container das Mousewheel-Event blockieren oder es zum Window-Element weiterleiten soll"
---

# prevent_default_scroll

### Description

@short: Steuert, ob der Gantt-Container das Mousewheel-Event blockieren oder es zum Window-Element weiterleiten soll

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note
 Diese Eigenschaft ist veraltet. 
:::

Diese Einstellung ist praktisch, wenn der Gantt irgendwo in der Mitte der Seite platziert ist und sich anderer Content darum herum befindet.

Wenn deaktiviert, bleibt die Scrollbar innerhalb des Gantt sichtbar. Um andere Bereiche der Seite zu scrollen, muss der Nutzer außerhalb des Gantt-Bereichs klicken.

### Change log
- veraltet ab Version 5.0
