---
title: "Custom Lightbox"
sidebar_label: "Custom Lightbox"
---

Custom Lightbox
===============

Möglichkeiten zur Erstellung eines benutzerdefinierten Lightbox
---------------------------------------------------------------

Es ist möglich, eine vollständig benutzerdefinierte Lightbox für das Gantt-Diagramm zu erstellen und die Standard-Lightbox zu ersetzen. Es gibt zwei Hauptansätze:

1) Durch Überschreiben der Methode [showLightbox](api/method/showlightbox.md):

~~~js
gantt.showLightbox = function(id){
    // Code des benutzerdefinierten Formulars
}
~~~

- id - (string/number) - die ID der Aufgabe

Die Methode [hideLightbox](api/method/hidelightbox.md) steht ebenfalls zur Verfügung, um die Implementierung der Lightbox zu unterstützen.

Definieren wir einen HTML-Container „my-form", der die benutzerdefinierte Lightbox enthält:

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

Um eine benutzerdefinierte Lightbox zu erstellen, kann folgende Konfiguration verwendet werden:

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

2) Verwendung des Events [onBeforeLightbox](api/event/onbeforelightbox.md). Dieser Ansatz beinhaltet:

- Erkennen, wann die Lightbox geöffnet werden soll
- Verhindern, dass die Standard-Lightbox angezeigt wird
- Anzeigen eines benutzerdefinierten Formulars und Befüllen mit den Aufgabendaten

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..Werte anwenden
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

Verarbeitung von Aktionen im benutzerdefinierten Formular
--------------------------------------------------------

Wenn das Formular gespeichert wird, müssen die Formularwerte manuell abgerufen und die entsprechende Aufgabe über die öffentliche API aktualisiert werden: [addTask](api/method/addtask.md), [updateTask](api/method/updatetask.md) und [deleteTask](api/method/deletetask.md).

Beachten Sie, dass wenn die Lightbox durch eine neue Aufgabe ausgelöst wurde (zum Beispiel durch Klicken auf die „Plus"-Schaltfläche) und der Benutzer auf „Cancel" klickt, um die Erstellung der Aufgabe rückgängig zu machen, das Aufgabenobjekt die Eigenschaft „$new" gesetzt hat.

Das Schließen der Lightbox kann wie im folgenden Beispiel behandelt werden. Die Art der Aktion - „save", „cancel" oder „delete" - wird als Parameter „action" übergeben:

~~~js
switch(action){
   case "save":
      task.text = '';// Werte aus dem Formular anwenden

      // Neue Aufgabe hinzufügen oder bestehende aktualisieren
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // Wenn das Erstellen einer neuen Aufgabe abgebrochen wird – diese löschen; andernfalls keine Aktion erforderlich
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~

