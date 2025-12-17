---
sidebar_label: onEmptyClick
title: onEmptyClick event
description: "Wird ausgelöst, wenn der Benutzer auf einen leeren Bereich innerhalb des Gantt-Diagramms klickt (außerhalb von Aufgaben)"
---

# onEmptyClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf einen leeren Bereich innerhalb des Gantt-Diagramms klickt (außerhalb von Aufgaben)

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - Ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~

### Details

Das **onEmptyClick**-Event wird auch aktiviert, wenn der Benutzer auf einen Link klickt. Wenn Sie dieses Verhalten deaktivieren möchten, können Sie prüfen, ob das `e.target`-Element oder sein nächster Vorfahr die Eigenschaft **link_attribute** enthält, wie hier gezeigt:

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  var domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, "[" + gantt.config.link_attribute + "]")){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~
