---
title: "Event-Behandlung"
sidebar_label: "Event-Behandlung"
---

# Event-Behandlung


Events sind entscheidend, um die Seite interaktiv und reaktionsfähig auf Benutzeraktionen zu gestalten.

Immer wenn ein Benutzer mit dem Gantt-Diagramm interagiert, löst dhtmlxGantt ein Event aus. Diese Events können verwendet werden, um zu erkennen, was passiert ist, und den entsprechenden Code auszuführen.

## Events anhängen


Um einen Event-Listener hinzuzufügen, verwenden Sie die Methode [attachEvent](api/method/attachevent.md).

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~

[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**Hinweis:**

- Eventnamen sind nicht groß-/kleinschreibungsempfindlich.
- Mehrere Handler können an dasselbe Event angehängt werden.

## Events entfernen


Um einen Event-Handler zu entfernen, verwenden Sie die Methode [detachEvent](api/method/detachevent.md):

[A general way to attach/detach the event handler](A general way to attach/detach the event handler)
~~~js
// zum Anhängen eines Events
var eventId = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
// zum Entfernen eines Events
gantt.detachEvent(eventId);/*!*/
~~~

Wenn Sie alle Handler auf einmal entfernen möchten, können Sie diesen Ansatz verwenden:

~~~js
// Handler-IDs beim Anhängen der Events speichern
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});
 
// alle gespeicherten Events entfernen
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

## Überprüfen, ob ein Handler existiert


Um zu überprüfen, ob für ein bestimmtes Event Handler angehängt sind, verwenden Sie die Methode [checkEvent](api/method/checkevent.md):

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked a task with id="+id);
});
 
gantt.checkEvent("onTaskClick"); // gibt 'true' zurück /*!*/
~~~

## Abbrechbare Events


Events, die mit 'onbefore' beginnen, können abgebrochen werden.

Um ein solches Event abzubrechen, muss der Event-Handler **false** zurückgeben.

**Cancelling the event handler**
~~~js
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, old_task){
    var task = gantt.getTask(id);
    if(mode == gantt.config.drag_mode.progress){
        if(task.progress < old_task.progress){
            dhtmlx.message(task.text + " progress can't be undone!");
            return false; /*!*/
        }
    }
    return true;
});
~~~


[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


## Zugriff auf das gantt-Objekt im Handler

Innerhalb des Event-Handlers kann auf das gantt-Objekt mit dem Schlüsselwort **this** zugegriffen werden. <br/>

**Referring within the event handler**
~~~js
gantt.attachEvent("onTaskClick", function(id, e){
    parentId = this.getTask(id).parent;
});
~~~

