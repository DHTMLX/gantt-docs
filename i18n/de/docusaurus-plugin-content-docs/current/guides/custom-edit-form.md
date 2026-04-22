---
title: "Benutzerdefinierte Lightbox"
sidebar_label: "Benutzerdefinierte Lightbox"
---

# Benutzerdefinierte Lightbox

## Die Möglichkeiten zur Erstellung einer benutzerdefinierten Lightbox

Sie können eine vollständig benutzerdefinierte Lightbox für Gantt erstellen und die Standard-Lighbox damit ersetzen. Es gibt zwei mögliche Ansätze:

1) Indem Sie die [showLightbox](api/method/showlightbox.md) Methode neu definieren:

~~~js
gantt.showLightbox = function(id){
    // code of the custom form
}
~~~

- id - (string/number) - die ID der Aufgabe

Es gibt auch die [hideLightbox](api/method/hidelightbox.md) Methode, die bei der Implementierung der Lightbox helfen wird.


Lassen Sie uns einen HTML-Container "my-form" erstellen, in dem wir eine benutzerdefinierte Lightbox platzieren:

~~~html
<div id="my-form">
 <label for="description">Task text
  <input type="text" name="description" value="" >
 </label>
 


 <input type="button" name="save" value="Save">
 <input type="button" name="close" value="Close">
 <input type="button" name="delete" value="Delete">
</div>
~~~


Dann, um eine benutzerdefinierte Lightbox zu erstellen, können Sie eine Konfiguration verwenden, die der folgenden ähnelt:


~~~js
var taskId = null;

gantt.showLightbox = function(id) {
    taskId = id;
    var task = gantt.getTask(id);

    var form = getForm();
    var input = form.querySelector("[name='description']");
    input.focus();
    input.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = function(){
    getForm().style.display = "";
    taskId = null;
}


function getForm() {
    return document.getElementById("my-form");
};

function save() {
    var task = gantt.getTask(taskId);

    task.text = getForm().querySelector("[name='description']").value;

    if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent);
    }else{
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    var task = gantt.getTask(taskId);

    if(task.$new)
    gantt.deleteTask(task.id);
    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(taskId);
    gantt.hideLightbox();
}
~~~

2) Verwendung des [onBeforeLightbox](api/event/onbeforelightbox.md) Ereignisses. In diesem Fall lautet der Ablauf wie folgt:

- Erkennen, wann die Lightbox angezeigt werden soll
- Blockieren der Standard-Lightbox
- Anzeigen eines benutzerdefinierten Formulars und Ausfüllen der Aufgabendaten.


~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..apply values
                    delete task.$new;
                    gantt.addTask(task);
                }else{
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

Wenn der Benutzer das Formular speichert, müssen Sie die Formularwerte manuell abrufen und die entsprechende Aufgabe über die öffentliche API aktualisieren: [addTask](api/method/addtask.md), [updateTask](api/method/updatetask.md) und [deleteTask](api/method/deletetask.md).

Beachten Sie, dass, wenn eine Lightbox durch eine neue Aufgabe ausgelöst wird (durch Klicken auf die Plus-Schaltfläche), die gelöscht werden soll, wenn der Benutzer auf 'Abbrechen' klickt, um die Erstellung der Aufgabe rückgängig zu machen, das Aufgabenobjekt die Eigenschaft '$new' gesetzt hat.

Sie können das Schließen der Lightbox verarbeiten, wie im folgenden Beispiel gezeigt. Der Typ einer Aktion - 'save', 'cancel' oder 'delete' wird als Parameter "action" übergeben:

~~~js
switch(action){
   case "save":
      task.text = '';// apply values from form

      // add new task or update already existing one
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // if cancel popup for creating a new task - delete it, otherwise do nothing
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~