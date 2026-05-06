---
sidebar_label: updateLink
title: updateLink Methode
description: "aktualisiert den angegebenen Abhängigkeitslink"
---

# updateLink

### Description

@short: Aktualisiert den angegebenen Abhängigkeitslink

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; //ändert die Link-Daten
gantt.updateLink(5); //rendert den aktualisierten Link
~~~

### Details

:::note
Die Methode ruft das [onAfterLinkUpdate](api/event/onafterlinkupdate.md) Event auf. 
:::

:::note
Die Methode löst den [DataProcessor](guides/server-side.md) aus, falls der DataProcessor aktiviert ist. 
:::

Diese Methode sollte nach der Modifizierung des Link-Objekts aufgerufen werden, um den Zustand des Gantt zu aktualisieren, relevante UI-Elemente neu zu zeichnen und die Änderungen an das Backend zu senden.

Durch Aufruf dieser Methode wird das [onAfterLinkUpdate](api/event/onafterlinkupdate.md) Event ausgelöst, welches möglicherweise zusätzliche Neuberechnungen auslösen kann.

Wenn Sie den [DataProcessor](guides/server-side.md) verwenden, löst der Aufruf dieser Methode eine Update-Anforderung an den Server aus.

Für visuelle Änderungen, die kein Speichern erfordern, verwenden Sie stattdessen die [refreshLink](api/method/refreshlink.md) Methode. Dadurch wird der Datensatz im Gantt neu gezeichnet, ohne zusätzliche Berechnungen oder Serveranfragen.

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
- [Server-Side Integration](guides/server-side.md)