---
title: "Benutzerdefinierte Lightbox"
sidebar_label: "Benutzerdefinierte Lightbox"
---

# Benutzerdefinierte Lightbox

## Möglichkeiten zur Erstellung einer benutzerdefinierten Lightbox

Sie können eine vollständig benutzerdefinierte Lightbox für Gantt erstellen und die Standard-Lightbox durch diese ersetzen. Es gibt zwei mögliche Wege, dies zu tun:

1. Durch Neudefinition der [`showLightbox()`](api/method/showlightbox.md) Methode:

~~~js
gantt.showLightbox = (id) => {
    // code of the custom form
};
~~~

- `id` - (string/number) - die Aufgaben-ID

Es gibt auch die [`hideLightbox()`](api/method/hidelightbox.md) Methode, die bei der Implementierung der Lightbox hilft.

Erstellen wir einen HTML-Container "my-form", in dem wir eine benutzerdefinierte Lightbox platzieren:

~~~html
<div id="my-form">
    <label for="description">Task text
        <input type="text" name="description" value="">
    </label>
    <input type="button" name="save" value="Save">
    <input type="button" name="close" value="Close">
    <input type="button" name="delete" value="Delete">
</div>
~~~

Dann, um eine benutzerdefinierte Lightbox zu erstellen, können Sie die Konfiguration verwenden, die der folgenden ähnlich ist:

~~~js
let currentTaskId = null;

gantt.showLightbox = (id) => {
    currentTaskId = id;
    const task = gantt.getTask(id);

    const form = getForm();
    const descriptionInput = form.querySelector("[name='description']"); 
    descriptionInput.focus();
    descriptionInput.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = () => {
    getForm().style.display = "";
    currentTaskId = null;
};

function getForm() {
    return document.getElementById("my-form");
}

function save() {
    const task = gantt.getTask(currentTaskId);

    task.text = getForm().querySelector("[name='description']").value;

    if (task.$new) {
        delete task.$new;
        gantt.addTask(task, task.parent);
    } else {
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    const task = gantt.getTask(currentTaskId);

    if (task.$new) {
        gantt.deleteTask(task.id);
    }

    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(currentTaskId);
    gantt.hideLightbox();
}
~~~

2. Verwenden Sie das [`onBeforeLightbox`](api/event/onbeforelightbox.md) Event. In diesem Fall ist der Aktionsablauf wie folgt:

- feststellen, wann die Lightbox angezeigt werden soll
- die Standard-Lightbox blockieren
- ein benutzerdefiniertes Formular anzeigen und die Aufgabendaten ausfüllen

~~~js
gantt.attachEvent("onBeforeLightbox", (id) => {
    const task = gantt.getTask(id);

    if (task.$new) {
        dhtmlx.confirm({
            text: "Create task?",
            callback: (confirmed) => {
                if (confirmed) {
                    //..apply values
                    delete task.$new;
                    gantt.addTask(task);
                } else {
                    gantt.deleteTask(task.id);
                }
            }
        });

        return false;
    }

    return true;
});
~~~

## Verarbeitung von Aktionen im benutzerdefinierten Formular

Wenn der Benutzer das Formular speichert, müssen Sie manuell die Formularwerte abrufen und den entsprechenden Task über die öffentliche API aktualisieren: [`addTask()`](api/method/addtask.md), [`updateTask()`](api/method/updatetask.md) und [`deleteTask()`](api/method/deletetask.md).

Beachten Sie, dass, wenn eine Lightbox durch einen neuen Task ausgelöst wird, zum Beispiel durch Klicken auf die '+'-Schaltfläche, und gelöscht werden soll, falls der Benutzer auf 'Cancel' klickt, um die Erstellung des Tasks rückgängig zu machen, das Task-Objekt die Eigenschaft '$new' gesetzt hat.

Sie können das Schließen der Lightbox verarbeiten, wie im untenstehenden Beispiel gezeigt. Der Aktions-Typ, "save", "cancel" oder "delete", wird als der Parameter "action" übergeben:

~~~js
switch (action) {
    case "save":
        task.text = ""; // Werte aus dem Formular anwenden

        // Einen neuen Task hinzufügen oder einen bestehenden aktualisieren.
        if (task.$new) {
            delete task.$new;
            gantt.addTask(task, task.parent);
        } else {
            gantt.updateTask(id);
        }

        break;
    case "cancel":
        // Wenn der Benutzer die Erstellung eines neuen Tasks abbricht, löschen Sie ihn.
        if (task.$new) {
            gantt.deleteTask(id);
        }

        break;
    case "delete":
        gantt.deleteTask(id);
        break;
}
~~~