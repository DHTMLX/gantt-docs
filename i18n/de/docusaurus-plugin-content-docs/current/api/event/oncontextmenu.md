---
sidebar_label: onContextMenu
title: onContextMenu event
description: "Wird ausgelöst, wenn ein Benutzer mit der rechten Maustaste innerhalb des Gantt-Diagramms klickt (siehe Details)"
---

# onContextMenu

### Description

@short: Wird ausgelöst, wenn ein Benutzer mit der rechten Maustaste innerhalb des Gantt-Diagramms klickt (siehe Details)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - die Aufgaben-ID
- `linkId` - (required) *string | number* - die Link-ID
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
      var element = event.target;
    console.log("Sie haben auf das Element geklickt: ", element)
    return true;
});
~~~

### Related samples
- [Context menu to control tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

Ein Rechtsklick innerhalb des Gantt-Diagramms öffnet normalerweise das Standard-Kontextmenü des Browsers, sofern keine anderen Bedingungen zutreffen. 
Im folgenden Beispiel wird beim Rechtsklick auf eine Aufgabe stattdessen ein [DHTMLX Kontextmenü](https://docs.dhtmlx.com/menu__index.html) angezeigt, wodurch das Standardmenü des Browsers unterdrückt wird.

~~~
//benötigt die DHTMLX Menu-Komponente
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    const y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;

    if (taskId) {
        menu.showContextMenu(x, y);
        return false;
    }

    return true;
});
~~~

Stellen Sie sicher, dass entweder die [DHTMLX Menu Dateien oder die DHTMLX Suite](https://docs.dhtmlx.com/menu__how_to_start.html) in Ihre Seite eingebunden sind, da das Beispiel davon abhängt.
<br>

Für einen reinen JavaScript-Ansatz zur Implementierung eines eigenen Kontextmenüs siehe [dieses Beispiel](https://snippet.dhtmlx.com/xuvxhjbc).
