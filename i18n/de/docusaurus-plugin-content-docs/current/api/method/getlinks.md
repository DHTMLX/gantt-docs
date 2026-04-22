---
sidebar_label: getLinks
title: getLinks Methode
description: "liefert alle im Gantt-Diagramm dargestellten Links zurück"
---

# getLinks

### Description

@short: Liefert alle im Gantt-Diagramm dargestellten Links

@signature: getLinks: () =\> Array\<Link\>

### Returns
- `links` - (Array &lt;Link&gt;) - ein Array von Link-Objekten

### Example

~~~jsx
const links = gantt.getLinks();
~~~

### Details

Für Informationen darüber, wie man alle mit einer bestimmten Aufgabe verbundenen Links erhält, siehe die Artikel [Abrufen des Link-Objekts/der ID](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) und [getLink](api/method/getlink.md)