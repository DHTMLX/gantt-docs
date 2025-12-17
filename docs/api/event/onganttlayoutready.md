---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady event
description: "fires after the Gantt layout is ready, but before it is rendered"
---

# onGanttLayoutReady

### Description

@short: Fires after the Gantt layout is ready, but before it is rendered

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // any custom logic here
});
~~~
