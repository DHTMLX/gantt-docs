---
sidebar_label: onEmptyClick
title: onEmptyClick-Ereignis
description: "wird ausgelöst, wenn der Benutzer auf einen leeren Bereich im Gantt-Diagramm klickt (nicht auf Aufgaben)"
---

# onEmptyClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf einen leeren Bereich im Gantt-Diagramm klickt (nicht auf Aufgaben)

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das **onEmptyClick**-Ereignis wird auch ausgelöst, wenn der Benutzer auf einen Link klickt. Sie können dieses Verhalten des Ereignisses verhindern. Dazu müssen Sie prüfen, ob das `e.target`-Element oder das ihm am nächsten liegende Element die **link_attribute**-Eigenschaft enthält, wie in:

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