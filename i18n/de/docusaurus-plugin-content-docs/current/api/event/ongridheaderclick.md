---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "Wird ausgelöst, wenn der Benutzer auf die Kopfzeile des Grids klickt"
---

# onGridHeaderClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf die Kopfzeile des Grids klickt

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (erforderlich) *string* - der Name des Attributs der Spalte, deren Header der Benutzer anklickt
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Wenn false zurückgegeben wird, wird der Standard-Handler abgebrochen (das Hinzufügen einer neuen Aufgabe beim Klicken auf den 'Plus'-Button oder das Sortieren einer Spalte)