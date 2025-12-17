---
sidebar_label: updateLink
title: updateLink method
description: "aktualisiert den angegebenen Abhängigkeits-Link"
---

# updateLink

### Description

@short: Aktualisiert den angegebenen Abhängigkeits-Link

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die Task-ID

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; // ändert die Daten des Links
gantt.updateLink(5); // wendet die aktualisierten Link-Daten visuell und funktional an
~~~

### Details

:::note
note Die Methode löst das [onAfterLinkUpdate](api/event/onafterlinkupdate.md) Event aus. 
:::
:::note
note Wenn dataProcessor aktiviert ist, wird diese Methode den [DataProcessor](guides/server-side.md) aktivieren. 
:::

Diese Methode sollte nach jeder Änderung an einem Link-Objekt verwendet werden, um den internen Zustand des Gantt zu aktualisieren, die zugehörigen UI-Komponenten zu aktualisieren und die Änderungen an das Backend zu senden.

Das Aufrufen dieser Funktion löst das [onAfterLinkUpdate](api/event/onafterlinkupdate.md) Event aus, was zu weiteren Neuberechnungen führen kann.

Bei Verwendung des [DataProcessor](guides/server-side.md) initiiert diese Methode eine **update**-Anfrage an den Server.

Für visuelle Aktualisierungen, die nicht gespeichert werden müssen, ist es besser, die [refreshLink](api/method/refreshlink.md) Methode zu verwenden. Diese malt den Link einfach im Gantt neu, ohne zusätzliche Berechnungen oder Serverkommunikation auszulösen.

~~~js
let selectedLink = null;
gantt.templates.link_class = function(link){
    if(link.id == selectedLink) {
        return "selected_link";
    }
};

gantt.attachEvent("onLinkClick", function(id,e){
    selectedLink = id;
    gantt.refreshLink(id); /*!*/
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

### Related Guides
- ["Serverseitige Integration"](guides/server-side.md#updatingdataontheserver)

