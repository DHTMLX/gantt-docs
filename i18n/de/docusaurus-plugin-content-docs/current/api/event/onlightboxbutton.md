---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "wird ausgelöst, wenn ein Benutzer auf einen benutzerdefinierten Button innerhalb der Lightbox klickt"
---

# onLightboxButton

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf einen benutzerdefinierten Button innerhalb der Lightbox klickt

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - der CSS-Klassenname, der dem Button zugewiesen ist
- `node` - (required) *HTMLElement* - das HTML-Element, das den geklickten Button repräsentiert
- `e` - (required) *Event* - das native 'click' Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    //platziere hier deine benutzerdefinierte Logik
});
~~~

### Details

Dieses Event wird nur von benutzerdefinierten Buttons ausgelöst, die sich am unteren Rand der Lightbox befinden, und gilt nicht für die Standard-Buttons.
