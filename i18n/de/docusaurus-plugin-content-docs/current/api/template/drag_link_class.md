---
sidebar_label: drag_link_class
title: drag_link_class template
description: "definiert die CSS-Klasse, die auf das Pop-up angewendet wird, das angezeigt wird, wenn ein Benutzer einen Link zieht."
---

# drag_link_class

### Description

@short: Definiert die CSS-Klasse, die auf das Pop-up angewendet wird, das angezeigt wird, wenn ein Benutzer einen Link zieht.

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string | void;

### Parameters

- `from` - (required) *string,number* - die ID der Quellaufgabe
- `from_start` - (required) *boolean* - <i>true</i>, wenn der Link vom Anfang der Quellaufgabe gezogen wird, <i>false</i>, wenn vom Ende
- `to` - (required) *string,number* - die ID der Zielaufgabe ('null' oder 'undefined', falls die Zielaufgabe noch nicht festgelegt wurde)
- `to_start` - (required) *boolean* - <i>true</i>, wenn der Link zum Anfang der Zielaufgabe gezogen wird, <i>false</i>, wenn zum Ende

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das jeweilige Element

### Example

~~~jsx
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    let add = "";
    if(from && to){
        const allowed = gantt.isLinkAllowed(from, to, from_start, to_start);
        add = (allowed ? "gantt_link_allow" : "gantt_link_deny");
    }
    return `gantt_link_tooltip ${add}`;
};
~~~

### Related Guides
- ["Vorlagen für Abhängigkeitsverknüpfungen"](guides/dependency-templates.md)
