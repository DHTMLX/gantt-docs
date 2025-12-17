---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox event
description: "Wird unmittelbar ausgelöst, bevor die Lightbox (Bearbeitungsformular) geöffnet wird"
---

# onBeforeLightbox

### Description

@short: Wird unmittelbar ausgelöst, bevor die Lightbox (Bearbeitungsformular) geöffnet wird

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

- Dieses Event kann blockiert werden. Wird *false* zurückgegeben, verhindert dies das Öffnen der Lightbox.
- Es ist eine praktische Möglichkeit, um vor dem Erscheinen der Lightbox individuelle Anpassungen vorzunehmen.
