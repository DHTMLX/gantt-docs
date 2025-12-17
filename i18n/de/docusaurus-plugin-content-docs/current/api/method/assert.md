---
sidebar_label: assert
title: assert method
description: "Falls der gegebene Ausdruck falsch ist, erscheint eine Fehlermeldung in einem roten Popup oben rechts auf dem Bildschirm."
---

# assert

### Description

@short: Falls der gegebene Ausdruck falsch ist, erscheint eine Fehlermeldung in einem roten Popup oben rechts auf dem Bildschirm.

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - ein wahrheitswertiger Wert zur Bestätigung des Ausdrucks, falsch (falsy), wenn die Assertion fehlschlägt
- `errorMessage` - (required) *string* - die Nachricht, die im roten Popup angezeigt wird

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

Der dhtmlxGantt-Code verwendet gantt.assert, um festzustellen, wenn die Komponente sich in einem ungültigen Zustand befindet.

Die Art und Weise, wie Fehler angezeigt werden, kann über die [show_errors](api/config/show_errors.md)-Konfiguration angepasst werden.

Fehler können auch programmgesteuert über das [onError](api/event/onerror.md)-Event behandelt werden.

