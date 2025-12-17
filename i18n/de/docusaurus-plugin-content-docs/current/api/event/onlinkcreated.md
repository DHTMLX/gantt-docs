---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "wird ausgelöst, wenn ein Benutzer eine neue Verbindung zwischen Aufgaben herstellt"
---

# onLinkCreated

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine neue Verbindung zwischen Aufgaben herstellt

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - das neu erstellte Link-Objekt

### Returns
- ` result` - (boolean) - `false` zurückzugeben verhindert die Erstellung des neuen Links, `true` erlaubt das Fortsetzen der Standardaktion

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // Ihr Code hier
    return true;
});
~~~

### Details

Dieses Event tritt unmittelbar bevor ein neuer Link erscheint auf und bietet die Möglichkeit, **die Erstellung des Links zu verhindern**.

### Change log
- hinzugefügt in v6.2.2
