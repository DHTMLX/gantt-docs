---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete Ereignis
description: "Wird ausgelöst, bevor der Benutzer einen Link löscht"
---

# onBeforeLinkDelete

### Description

@short: Wird ausgelöst, bevor der Benutzer einen Link löscht

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Link-ID
- `link` - (required) *Link* - das Link-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Event ist blockierbar. Geben Sie false zurück, um das Löschen des Links abzubrechen.

### Related API
- [deleteLink](api/method/deletelink.md)