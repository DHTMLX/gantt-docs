---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady event
description: "wird ausgelöst, sobald das Gantt-Layout eingerichtet ist, jedoch unmittelbar bevor es gerendert wird"
---

# onGanttLayoutReady

### Description

@short: Wird ausgelöst, sobald das Gantt-Layout eingerichtet ist, jedoch unmittelbar bevor es gerendert wird

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // hier kann benutzerdefinierte Logik eingefügt werden
});
~~~
