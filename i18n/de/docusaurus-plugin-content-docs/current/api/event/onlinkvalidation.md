---
sidebar_label: onLinkValidation
title: onLinkValidation Event
description: "löst aus, wenn der Benutzer einen neuen Link hinzufügt und dhtmlxGantt prüft, ob der Link gültig ist"
---

# onLinkValidation

### Description

@short: Löst aus, wenn der Benutzer einen neuen Link hinzufügt und dhtmlxGantt prüft, ob der Link gültig ist

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - das Link-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

:::note
Das Event wird in der Methode [isLinkAllowed](api/method/islinkallowed.md) ausgelöst.
:::

Das Event wird ausgelöst, wenn der Benutzer eine neue Verknüpfung zwischen Aufgaben per Drag-and-Drop mit der Maus erstellt.

Wenn der Event-Handler `false` zurückgibt, wird der runde Handler der Zielaufgabe rot eingefärbt und der Link wird nicht hinzugefügt. Zurückgegebenes `true` hebt den runden Handler in Orange hervor und erlaubt die Erstellung eines Links.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)