---
sidebar_label: drag_link_class
title: drag_link_class template
description: "legt die CSS-Klasse fest, die dem Pop-up zugewiesen wird, das erscheint, wenn der Benutzer einen Link zieht"
---

# drag_link_class

### Description

@short: Legt die CSS-Klasse fest, die dem Pop-up zugewiesen wird, das erscheint, wenn der Benutzer einen Link zieht

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string | void;

### Parameters

- `from` - (erforderlich) *string | number* - die ID der Quellaufgabe
- `from_start` - (erforderlich) *boolean* - <i>wahr</i>, wenn der Link vom Anfang der Quellaufgabe gezogen wird, <i>falsch</i> - wenn er vom Ende der Aufgabe gezogen wird
- `to` - (erforderlich) *string | number* - die ID der Zielaufgabe ('null' oder 'undefined', falls die Zielaufgabe noch nicht festgelegt ist)
- `to_start` - (erforderlich) *boolean* - <i>wahr</i>, wenn der Link an den Anfang der Zielaufgabe gezogen wird, <i>falsch</i> - wenn er an das Ende der Aufgabe gezogen wird

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
