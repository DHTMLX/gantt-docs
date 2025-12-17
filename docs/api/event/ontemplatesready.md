---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "fires when the dhtmlxGantt templates are initialized"
---

# onTemplatesReady

### Description

@short: Fires when the dhtmlxGantt templates are initialized

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    //any custom logic here
});
~~~

### Details

The event informs that templates of dhtmlxGantt are ready. The event is a good point for creating a custom view.

It's a good practice to write the code of custom view creation in the handler of the onTemplatesReady event. It will guarantee that the custom view's templates will be ready before grid initialization, 
and a custom view will be correctly rendered on the page.
