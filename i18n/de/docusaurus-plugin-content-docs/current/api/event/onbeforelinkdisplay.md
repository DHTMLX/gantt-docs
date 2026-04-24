---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "Wird ausgelöst, nachdem die Links in das Gantt-Diagramm geladen wurden, bevor sie angezeigt werden"
---

# onBeforeLinkDisplay

### Description

@short: Wird ausgelöst, nachdem die Links in das Gantt-Diagramm geladen wurden, bevor sie angezeigt werden

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Link-ID
- `link` - (required) *Link* - das Link-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDisplay", function(id, link){
    if (link.type == gantt.config.links.finish_to_start){
        return true;
    }
    return false;
});
~~~

### Details

Das Ereignis ist blockierbar. Wenn false zurückgegeben wird, wird der Link nicht angezeigt

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)