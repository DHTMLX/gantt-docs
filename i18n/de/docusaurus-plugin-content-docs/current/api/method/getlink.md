---
sidebar_label: getLink
title: getLink Methode
description: "gibt das Link-Objekt der Abhängigkeit anhand der angegebenen ID zurück"
---

# getLink

### Beschreibung

@short: Gibt das Link-Objekt der Abhängigkeit anhand der angegebenen ID zurück

@signature: getLink: (id: string | number) =\> Link

### Parameter

- `id` - (erforderlich) *string | number* - die Link-ID

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

Für Informationen darüber, wie man alle mit einer bestimmten Aufgabe verbundenen Links erhält, siehe den Artikel [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task).