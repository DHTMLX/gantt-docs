---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "Wird ausgelöst, wenn ein Benutzer eine neue Verknüpfung zwischen Aufgaben erstellt"
---

# onLinkCreated

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine neue Verknüpfung zwischen Aufgaben erstellt

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (erforderlich) *Link* - das Objekt eines neuen Links

### Returns
- ` result` - (boolean) - Die Rückgabe von `false` wird die Erstellung eines neuen Links abbrechen, die Rückgabe von `true` wird die Standardverarbeitung fortsetzen

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Ereignis wird ausgelöst, bevor ein neuer Link angezeigt wird, wodurch Sie die Erstellung eines Links **abbrechen** können.

### Change log
- hinzugefügt in v6.2.2