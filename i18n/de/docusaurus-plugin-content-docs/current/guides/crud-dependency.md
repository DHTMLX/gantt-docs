---
title: "Hinzufügen/Aktualisieren/Löschen von Verknüpfungen"
sidebar_label: "Hinzufügen/Aktualisieren/Löschen von Verknüpfungen"
---

# Hinzufügen/Aktualisieren/Löschen von Verknüpfungen

In diesem Kapitel erfahren Sie, wie Sie grundlegende Operationen mit Abhängigkeits-Verknüpfungen durchführen: eine Verknüpfung erstellen oder löschen und dynamisch eine Eigenschaft der Verknüpfung aktualisieren.

## Eine neue Verknüpfung hinzufügen

Um eine neue Verknüpfung zum Gantt-Diagramm hinzuzufügen, verwenden Sie die [addLink](api/method/addlink.md) Methode:

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## Aktualisieren einer Verknüpfungseigenschaft

Um eine Eigenschaft eines Verknüpfungsobjekts dynamisch zu aktualisieren, verwenden Sie die [refreshLink](api/method/refreshlink.md) Methode:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Hinweis: Um alle Verknüpfungen im Gantt-Diagramm auf einmal zu aktualisieren, verwenden Sie die [refreshData](api/method/refreshdata.md) Methode:

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
Hinweis: Alle Typen der Abhängigkeiten von Verknüpfungen werden im [links](api/config/links.md) Objekt gespeichert.
:::

## Eine Verknüpfung löschen

Um eine Verknüpfung zu löschen, verwenden Sie die [deleteLink](api/method/deletelink.md) Methode:

~~~js
gantt.deleteLink(linkId);
~~~

## Alle Verknüpfungen aus dem Gantt-Diagramm entfernen

Um das Gantt-Diagramm von allen Aufgaben und Verknüpfungen zu bereinigen, rufen Sie die [clearAll](api/method/clearall.md) Methode auf:


~~~js
gantt.clearAll();
~~~

## Bearbeiten von Verknüpfungswerten in der UI

Es gibt kein integriertes UI, mit dem der Benutzer den lag-Wert oder andere Eigenschaften der Verknüpfung bearbeiten kann. Wenn Sie also eine UI benötigen, müssen Sie sie manuell implementieren.

Eine gängige Vorgehensweise setzt die folgenden Schritte voraus:

- Erfassen Sie das [onLinkDblClick](api/event/onlinkdblclick.md) Event;
- den Standard-Handler abbrechen;
- über den Ereignishandler ein Popup anzeigen.

Im letzten Schritt können Sie entweder integrierte Popups [eingebaute Popups] oder eine benutzerdefinierte Lösung implementieren.

Hier ist ein Beispielcode für die Implementierung des Edit-Lag-Popups:

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

**Verwandtes Beispiel** [Bearbeitungs-Lag-Popup](https://snippet.dhtmlx.com/2208ic0t)