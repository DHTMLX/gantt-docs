---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady-Ereignis
description: "Löst ein Ereignis aus, nachdem das Gantt-Layout bereit ist, aber bevor es gerendert wird"
---

# onGanttLayoutReady

### Description

@short: Wird ausgelöst, nachdem das Gantt-Layout bereit ist, aber bevor es gerendert wird

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~