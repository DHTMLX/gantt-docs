---
title: "Validierung"
sidebar_label: "Validierung"
---

# Validierung

Die Validierung ermöglicht es Ihnen, die vom Benutzer eingegebenen Daten zu kontrollieren, um die Möglichkeit zu vermeiden, falsche Werte zu speichern. 
Zum Beispiel können Sie mit der Validierung die Zuweisung von zwei gleichzeitigen Aufgaben an eine Person verweigern.

Allgemein können Sie die vom Benutzer eingegebenen Daten validieren, indem Sie die Ereignisse der [dhtmlxGantt API](api/overview/events-overview.md) verwenden und die Eingabedaten entsprechend ihrer Richtigkeit verarbeiten:

## Clientseitige Validierung


Die folgenden Ereignisse sind für die Datenvalidierung am wichtigsten bzw. werden am häufigsten verwendet:

- [onLightboxSave] - löst aus, wenn der Benutzer in der Lightbox auf die 'Speichern'-Schaltfläche klickt
- [onBeforeTaskAdd] - löst aus, bevor eine neue Aufgabe dem Gantt-Diagramm hinzugefügt wird
- [onBeforeTaskChanged] - löst aus, bevor eine Aufgabe aktualisiert wird
- [onBeforeLinkAdd] - löst aus, bevor ein neuer Link dem Gantt-Diagramm hinzugefügt wird
- [onBeforeLinkUpdate] - löst aus, bevor ein Link aktualisiert wird

Die einfachste Validierung lässt sich mithilfe des [onLightboxSave](api/event/onlightboxsave.md) Ereignisses erreichen. Das Ereignis wird aufgerufen, wenn der Benutzer auf die 'Speichern'-Schaltfläche im Formular klickt. 
Die Rückgabe von *true* aus dem Ereignis speichert die Änderungen, die Rückgabe von *false* verhindert die weitere Verarbeitung und lässt die Lightbox geöffnet.

Zum Beispiel, um das Speichern einer Aufgabe zu verhindern, wenn keine Benutzer dieser zugewiesen sind, verwenden Sie folgenden Code:

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

[Lightbox-Werte validieren](https://docs.dhtmlx.com/gantt/samples/05_lightbox/03_validation.html)


## Serverseitige Validierung


Die obige Lösung hat einen Nachteil – das Ereignis wird nicht ausgelöst, wenn die Daten in der Lightbox durch einen Inline-Editor geändert oder durch Drag & Drop über dem Gantt-Diagramm verändert wurden.

Um dies zu beweisen und alle Änderungen im Gantt-Diagramm zu erfassen (Bearbeiten, Erstellen, Löschen usw.), verwenden Sie das [dataProcessor](guides/server-side.md)-Objekt bzw. genauer gesagt eines seiner Ereignisse - [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html). Das Ereignis wird ausgelöst, bevor Daten an den Server gesendet werden und nach jeder Änderung, die im Gantt-Diagramm vorgenommen wird (nicht nur in der Lightbox).

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
 
wo:

- **id** - (*string*) die ID der Aufgabe.
- **status** - (*'updated', 'inserted', deleted'*) der Status der Operation der Aufgabe.
- **data** - (*object*) die zu sendenden Daten.

Hinweis: Wenn das Feld die Validierung nicht besteht, werden die Änderungen nicht an den Server gesendet, sondern bleiben auf dem Client und können für weitere Verarbeitung verwendet werden.