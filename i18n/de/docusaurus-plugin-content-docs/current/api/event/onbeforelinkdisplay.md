---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "wird ausgelöst, nachdem die Links in das Gantt-Diagramm geladen wurden, aber noch bevor sie auf dem Bildschirm erscheinen"
---

# onBeforeLinkDisplay

### Description

@short: Wird ausgelöst, nachdem die Links in das Gantt-Diagramm geladen wurden, aber noch bevor sie auf dem Bildschirm erscheinen

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die eindeutige Kennung des Links
- `link` - (required) *Link* - das Link-Objekt selbst

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird der Link nicht angezeigt.

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)

