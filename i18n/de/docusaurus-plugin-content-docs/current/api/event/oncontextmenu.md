---
sidebar_label: onContextMenu
title: onContextMenu Ereignis
description: "wird ausgelöst, wenn der Benutzer die rechte Maustaste innerhalb des Gantt-Diagramms klickt (siehe Details)"
---

# onContextMenu

### Description

@short: Wird ausgelöst, wenn der Benutzer die rechte Maustaste im Gantt-Diagramm klickt (siehe Details)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - die Aufgaben-ID
- `linkId` - (required) *string | number* - die Link-ID
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const element = event.target;
    console.log("Sie haben auf das Element geklickt: ", element)
    return true;
});
~~~

### Related samples
- [Kontextmenü zur Steuerung von Aufgaben](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

Rechtsklicks im Gantt-Diagramm öffnen standardmäßig das Kontextmenü des Browsers, sofern keine weiteren Bedingungen vorliegen. 
Im folgenden Beispiel zeigt ein Klick auf eine Aufgabe ein [DHTMLX-Kontextmenü](https://docs.dhtmlx.com/menu__index.html) an und blendet das Standard-Browser-Kontextmenü aus.

~~~js
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

Vergiss nicht, entweder die Dateien von DHTMLX Menu oder DHTMLX Suite([https://docs.dhtmlx.com/menu__how_to_start.html](https://docs.dhtmlx.com/menu__how_to_start.html)) auf der Seite einzubinden. Andernfalls funktioniert das Beispiel nicht.


Check [ein weiteres Beispiel](https://snippet.dhtmlx.com/xuvxhjbc) falls du ein benutzerdefiniertes Kontextmenü in reinem JavaScript hinzufügen musst.