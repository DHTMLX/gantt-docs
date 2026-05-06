---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox-Ereignis
description: "Löst unmittelbar aus, bevor der Benutzer das Lightbox-Fenster (Bearbeitungsformular) öffnet"
---

# onBeforeLightbox

### Description

@short: Wird unmittelbar ausgelöst, bevor der Benutzer die Lightbox (Bearbeitungsformular) öffnet

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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
- [Vorlagen-Steuerung](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)
- [Benutzerdefinierte Schaltfläche im Lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

- Das Event ist blockierbar. Gib *false* zurück, um die Standardverarbeitung (Öffnen der Lightbox) abzubrechen.
- Die Verwendung dieses Events ist eine gute Möglichkeit, etwas im Lightbox-Fenster anzupassen.