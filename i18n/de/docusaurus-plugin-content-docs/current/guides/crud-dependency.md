---
title: "Hinzufügen/Aktualisieren/Löschen von Verknüpfungen"
sidebar_label: "Hinzufügen/Aktualisieren/Löschen von Verknüpfungen"
---

Hinzufügen/Aktualisieren/Löschen von Verknüpfungen
==================================================
In diesem Abschnitt werden die Grundlagen für die Arbeit mit Abhängigkeitsverknüpfungen behandelt: das Erstellen, Löschen und das dynamische Aktualisieren von Verknüpfungseigenschaften.

## Eine neue Verknüpfung hinzufügen {##addinganewlink}
-------------------------------
Um eine neue Verknüpfung im Gantt-Diagramm einzufügen, verwenden Sie die Methode [addLink](api/method/addlink.md):

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## Eigenschaft einer Verknüpfung aktualisieren {#updatingalinksproperty}
-------------------------------------------
Um eine Eigenschaft einer Verknüpfung dynamisch zu ändern, ist die Methode [refreshLink](api/method/refreshlink.md) sehr hilfreich:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Wenn Sie alle Verknüpfungen im Gantt-Diagramm auf einmal aktualisieren möchten, verwenden Sie die Methode [refreshData](api/method/refreshdata.md):

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
Beachten Sie, dass alle Arten von Verknüpfungsabhängigkeiten im Objekt [links](api/config/links.md) definiert sind.
:::

## Eine Verknüpfung löschen {#deletingalink}
------------------------
Um eine Verknüpfung zu entfernen, verwenden Sie die Methode [deleteLink](api/method/deletelink.md):

~~~js
gantt.deleteLink(linkId);
~~~

## Alle Verknüpfungen aus dem Gantt-Diagramm entfernen {#removingalllinksfromtheganttchart}
---------------------------------------------------
Um alle Aufgaben und Verknüpfungen aus dem Gantt-Diagramm zu löschen, rufen Sie einfach die Methode [clearAll](api/method/clearall.md) auf:

~~~js
gantt.clearAll();
~~~

## Bearbeiten von Verknüpfungswerten über die Benutzeroberfläche {#editinglinkvaluesfromui}
------------------------------------------------------------

Es gibt keine integrierte Benutzeroberfläche zum Bearbeiten von Verzögerungen (Lag) oder anderen Verknüpfungseigenschaften. Wenn Sie eine solche Oberfläche benötigen, müssen Sie diese selbst erstellen.

Eine typische Vorgehensweise umfasst folgende Schritte:

- Lauschen auf das Ereignis [onLinkDblClick](api/event/onlinkdblclick.md); 
- das Standardverhalten verhindern; 
- ein Popup aus dem Ereignishandler heraus anzeigen.

Für das Popup können Sie entweder die [integrierten Popups](guides/message-boxes.md) oder eine eigene Implementierung verwenden.

Nachfolgend finden Sie ein Beispiel, wie Sie ein Popup zum Bearbeiten der Verzögerung (Lag) implementieren können:

~~~js
(function(){
    var modal;
    var editLinkId;

    function endPopup(){
        modal = null;
        editLinkId = null;
    }
    function cancelEditLink(){
        endPopup();
    }

    function deleteLink(){
        gantt.deleteLink(editLinkId);
        endPopup();
    }

    function saveLink(){
        var link = gantt.getLink(editLinkId);

        var lagValue = modal.querySelector(".lag-input").value;
        if(!isNaN(parseInt(lagValue, 10))){
            link.lag = parseInt(lagValue, 10);
        }

        gantt.updateLink(link.id);
        if(gantt.autoSchedule){
            gantt.autoSchedule(link.source);
        }
        endPopup();
    }
    gantt.attachEvent("onLinkDblClick", function(id,e){
        editLinkId = id;
        var link = gantt.getLink(id);
        var linkTitle = gantt.getTask(link.source).text + " -> " + 
            gantt.getTask(link.target).text;

        modal = gantt.modalbox({
            title: linkTitle,
            text: "<div>" +
                    "<label>Lag <input type='number' class='lag-input' /></label>" +
                "</div>",
            buttons: [
                {label:"Save", value:"save"},
                {label:"Cancel", value:"cancel"},
                {label:"Delete", value:"delete"}
            ],
            width: "500px",
            callback: function(result){
                switch(result){
                    case "save":
                        saveLink();
                        break;
                    case "cancel":
                        cancelEditLink();
                        break;

                    case "delete":
                        deleteLink();
                        break;
                }
            }
        });

        modal.querySelector(".lag-input").value = link.lag || 0;

        return false;
    });
})();
~~~

**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

