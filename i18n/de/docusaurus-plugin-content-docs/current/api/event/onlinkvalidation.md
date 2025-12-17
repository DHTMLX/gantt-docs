---
sidebar_label: onLinkValidation
title: onLinkValidation event
description: "Wird ausgelöst, wenn ein neuer Link vom Benutzer hinzugefügt wird und dhtmlxGantt überprüft, ob der Link gültig ist."
---

# onLinkValidation

### Description

@short: Wird ausgelöst, wenn ein neuer Link vom Benutzer hinzugefügt wird und dhtmlxGantt überprüft, ob der Link gültig ist.

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - Das Link-Objekt

### Returns
- ` result` - (boolean) - Gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    //beliebige eigene Logik hier
});
~~~

### Details

:::note
 Das Event wird innerhalb der Methode [isLinkAllowed](api/method/islinkallowed.md) ausgelöst. 
:::

Dieses Event tritt auf, wenn ein Benutzer einen neuen Link zwischen Aufgaben durch Drag-and-Drop mit der Maus erstellt.

Wenn der Event-Handler `false` zurückgibt, wird der runde Handler der Zielaufgabe rot markiert und der Link wird nicht erstellt. Die Rückgabe von `true` hebt den runden Handler orange hervor und erlaubt die Erstellung des Links.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)

