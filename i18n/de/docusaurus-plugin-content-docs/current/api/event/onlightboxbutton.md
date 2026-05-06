---
sidebar_label: onLightboxButton
title: onLightboxButton Event
description: "wird ausgelöst, wenn der Benutzer auf einen benutzerdefinierten Button in der Lightbox klickt"
---

# onLightboxButton

### Description

@short: Fires when the user clicks on a custom button in the lightbox

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) => void;

### Parameter

- `css` - (erforderlich) *string* - der Name der CSS-Klasse, die dem Button zugewiesen wird
- `node` - (erforderlich) *HTMLElement* - ein HTML-Element des angeklickten Buttons
- `e` - (erforderlich) *Event* - ein natives 'click'-Ereignisobjekt

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das Event wird nur für benutzerdefinierte Buttons am unteren Rand der Lightbox ausgelöst und nicht für die Standardbuttons.