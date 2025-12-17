---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox event
description: "fires immediately before the user opens the lightbox (edit form)"
---

# onBeforeLightbox

### Description

@short: Fires immediately before the user opens the lightbox (edit form)

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

### Example

~~~jsx
gantt.attachEvent("onBeforeLightbox", function(id) {
      const task = gantt.getTask(id);
       task.my_template = `<span id='title1'>Holders: </span>${task.users}
    <span id='title2'>Progress: </span>${task.progress*100}%`;
    return true;
});
~~~

### Related samples
- [Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

- The event is blockable. Return *false* to cancel the default processing (opening of the lightbox).
- Using this event is a good way to customize something in the lightbox.
