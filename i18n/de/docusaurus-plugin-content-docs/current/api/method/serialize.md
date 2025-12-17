---
sidebar_label: serialize
title: serialize method
description: "wandelt die Daten in JSON- oder XML-Format um"
---

# serialize

### Description

@short: Wandelt die Daten in JSON- oder XML-Format um

@signature: serialize: (type?: string) =\> any

### Parameters
- `type` - (optional) *string* -  	gibt das Format für die Serialization an. Mögliche Werte: 'json' (Standard ), 'xml'.

### Returns
- ` data` - (object) - gibt ein Gantt-Datenobjekt zurück

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- ["Serialisierung von Daten in XML und JSON"](guides/serialization.md)
- ["Unterstützte Datenformate"](guides/supported-data-formats.md)

