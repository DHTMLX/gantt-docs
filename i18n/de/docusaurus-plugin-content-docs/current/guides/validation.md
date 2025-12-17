---
title: "Validierung"
sidebar_label: "Validierung"
---

Validierung
====================

Die Validierung stellt sicher, dass die von Benutzern eingegebenen Daten korrekt sind und verhindert das Speichern falscher Werte. Sie kann beispielsweise verhindern, dass zwei Aufgaben zur gleichen Zeit derselben Person zugewiesen werden.

In der Regel erfolgt die Datenvalidierung mithilfe von Ereignissen aus der [dhtmlxGantt API](api/overview/events-overview.md), um die eingegebenen Daten abzufangen und auf Korrektheit zu prüfen:

Clientseitige Validierung
--------------------------

Die folgenden Ereignisse sind besonders wichtig und werden häufig zur Validierung von Daten verwendet:

- [onLightboxSave](api/event/onlightboxsave.md) - wird ausgelöst, wenn der Benutzer im Lightbox-Dialog auf die Schaltfläche „Speichern" klickt
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md) - wird vor dem Hinzufügen einer neuen Aufgabe zum Gantt-Diagramm ausgelöst
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) - wird vor der Aktualisierung einer Aufgabe ausgelöst
- [onBeforeLinkAdd](api/event/onbeforelinkadd.md) - wird vor dem Hinzufügen einer neuen Verbindung zum Gantt-Diagramm ausgelöst
- [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) - wird vor der Aktualisierung einer Verbindung ausgelöst

Die einfachste Möglichkeit, eine Validierung zu implementieren, ist die Verwendung des Ereignisses [onLightboxSave](api/event/onlightboxsave.md). Dieses Ereignis wird ausgelöst, wenn der Benutzer im Formular auf „Speichern" klickt. Die Rückgabe von *true* erlaubt das Speichern der Änderungen, während die Rückgabe von *false* den Vorgang abbricht und das Lightbox-Fenster geöffnet lässt.

Um beispielsweise zu verhindern, dass eine Aufgabe gespeichert wird, wenn keine Benutzer zugewiesen sind, können Sie folgenden Code verwenden:

~~~js
gantt.attachEvent("onLightboxSave", function(id, item){
    if(!item.text){
        gantt.message({type:"error", text:"Enter task description!"});
        return false;
    }
    if(!item.user){
        gantt.message({type:"error", text:"Choose a worker for this task!"});
        return false;
    }
        return true;
});
~~~

[Validate lightbox values](https://docs.dhtmlx.com/gantt/samples/05_lightbox/03_validation.html)


Serverseitige Validierung
-----------------------------

Eine Einschränkung des oben beschriebenen Ansatzes besteht darin, dass das Ereignis nicht ausgelöst wird, wenn Änderungen durch Inline-Bearbeitung oder durch das Verschieben von Aufgaben im Gantt-Diagramm vorgenommen werden.

Um alle Änderungen abzudecken - einschließlich Bearbeiten, Erstellen und Löschen - verwenden Sie das [dataProcessor](guides/server-side.md) Objekt, insbesondere dessen [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) Ereignis. Dieses Ereignis wird vor dem Senden der Daten an den Server und nach jeder Änderung im Gantt-Diagramm ausgelöst, unabhängig davon, wie diese vorgenommen wurde.

~~~js
gantt.init("gantt_here");
gantt.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(gantt);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
     if (!data.text) {
         gantt.message("The event's text can't be empty!");
         return false;
     }
     return true;
});
~~~
 
Die Parameter bedeuten dabei:

- **id** - (*string*) die Kennung der Aufgabe.
- **status** - (*'updated', 'inserted', 'deleted'*) der Status der Operation für die Aufgabe.
- **data** - (*object*) die zu sendenden Daten.

Beachten Sie, dass bei einer fehlgeschlagenen Validierung die Änderungen nicht an den Server gesendet werden, sondern auf der Client-Seite verbleiben und dort weiterverarbeitet werden können.

