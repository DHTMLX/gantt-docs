---
sidebar_label: getLink
title: getLink method
description: "ruft das Abhängigkeits-Link-Objekt anhand der angegebenen ID ab"
---

# getLink

### Description

@short: Ruft das Abhängigkeits-Link-Objekt anhand der angegebenen ID ab

@signature: getLink: (id: string | number) =\> Link

### Parameters
- `id` - (required) *string | number* -    die Link-ID

### Returns
- `link` - (Link) - das Link-Objekt

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.getLink(1);// -> {id:1, source:1, target:2, type:1}
~~~

### Details

Um herauszufinden, wie man alle Links abruft, die mit einer bestimmten Aufgabe verbunden sind, siehe den Artikel ["Abrufen des Link-Objekts/der Link-ID"](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask).
