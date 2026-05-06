--- 
title: "Ereignisbehandlung"
sidebar_label: "Ereignisbehandlung"
---

# Ereignisbehandlung

Ereignisse ermöglichen die Interaktion mit Benutzern und erhöhen die Interaktivität der Seite.

Wenn der Benutzer eine Aktion im Gantt-Diagramm ausführt, ruft dhtmlxGantt ein Ereignis auf. Sie können dieses Ereignis verwenden, um die Aktion zu erkennen und den gewünschten Code dafür auszuführen.

## Ereignisse anhängen

Um ein Ereignis anzuhängen, verwenden Sie die [`attachEvent()`](api/method/attachevent.md) Methode.

~~~js
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
~~~

**Zugehöriges Beispiel**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**Hinweis:**

- Die Namen der Ereignisse sind Groß-/Kleinschreibung unabhängig.
- Sie können mehreren Handlern denselben Ereignis zuordnen.

## Ereignisse trennen

Um einen Ereignis-Handler zu trennen, verwenden Sie die [`detachEvent()`](api/method/detachevent.md) Methode:

~~~jsx {6} title="A general way to attach/detach the event handler"
// to attach event
const eventId = gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
// to detach event
gantt.detachEvent(eventId);
~~~

Um alle gespeicherten Handler auf einmal zu trennen, können Sie die folgende Logik verwenden:

~~~js {13}
// save handler ids when attaching events
const eventIds = [];

eventIds.push(gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
}));
eventIds.push(gantt.attachEvent("onTaskDblClick", (id, e) => {
    alert(`You've just double clicked an item with id=${id}`);
}));

// detach all saved events
while (eventIds.length) {
    gantt.detachEvent(eventIds.pop());
}
~~~

## Prüfen, ob ein Handler existiert

Um zu prüfen, ob für ein bestimmtes Ereignis irgendwelche Handler registriert sind, verwenden Sie die [`checkEvent()`](api/method/checkevent.md) Methode:

~~~js {5}
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked a task with id=${id}`);
});

gantt.checkEvent("onTaskClick"); // returns 'true'
~~~


## Abbruchbare Ereignisse

Alle Ereignisse, deren Namen mit dem vorstehenden Subwort 'onbefore' beginnen, können abgebrochen werden.

Um ein Ereignis abzubrechen, geben Sie im entsprechenden Ereignis-Handler **false** zurück.

~~~jsx {6} title="Cancelling the event handler"
gantt.attachEvent("onBeforeTaskChanged", (id, mode, oldTask) => {
    const task = gantt.getTask(id);
    if (mode === gantt.config.drag_mode.progress) {
        if (task.progress < oldTask.progress) {
            dhtmlx.message(`${task.text} progress can't be undone!`);
            return false;
        }
    }
    return true;
});
~~~

**Zugehöriges Beispiel**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

## Zugriff auf das Gantt-Objekt innerhalb des Handlers

Innerhalb des Ereignis-Handlers können Sie sich auf das Gantt-Objekt über das Schlüsselwort `this` beziehen.

~~~jsx title="Bezug innerhalb des Event-Handlers"
gantt.attachEvent("onTaskClick", function(id, e) {
    const parentId = this.getTask(id).parent;
});
~~~