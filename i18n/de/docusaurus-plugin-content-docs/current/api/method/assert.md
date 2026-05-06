---
sidebar_label: assert
title: assert Methode
description: "Wenn der angegebene Ausdruck falsch ist, wird eine errorMessage im roten Pop-up oben rechts auf dem Bildschirm angezeigt"
---

# assert

### Description

@short: Wenn der angegebene Ausdruck falsch ist, wird eine errorMessage im roten Pop-up oben rechts auf dem Bildschirm angezeigt

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (erforderlich) *any* - truthy-Wert, der Ausdruck wird bestätigt; falsy - wenn die Behauptung fehlschlägt
- `errorMessage` - (erforderlich) *string* - eine Fehlermeldung, die im roten Pop-up angezeigt wird

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

Die dhtmlxGantt-Codebasis verwendet gantt.assert, um einen ungültigen Zustand der Komponente zu erkennen

Die Anzeige von Fehlern kann über die Konfiguration [show_errors](api/config/show_errors.md) geändert werden.

Fehler können programmgesteuert nachverfolgt werden, mithilfe des Events [onError](api/event/onerror.md).