---
sidebar_label: link_class
title: link_class template
description: "definiert die CSS-Klasse, die einem Link zugewiesen wird"
---

# link_class

### Description

@short: Definiert die CSS-Klasse, die einem Link zugewiesen wird

@signature: link_class: (link: Link) =\> string | void;

### Parameters

- `link` - (required) *Link* - das Link-Objekt

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das jeweilige Element

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [Vorlagen für Abhängigkeitsverknüpfungen](guides/dependency-templates.md)
