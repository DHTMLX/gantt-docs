---
title: "Aufgaben zusammen mit ihren abhängigen Aufgaben verschieben"
sidebar_label: "Aufgaben zusammen mit ihren abhängigen Aufgaben verschieben"
---

# Aufgaben zusammen mit ihren abhängigen Aufgaben verschieben


Es gibt mehrere Möglichkeiten, Aufgaben gemeinsam mit ihren abhängigen Aufgaben zu verschieben.

## Verwendung der Auto Scheduling Extension


Eine Möglichkeit ist die Verwendung der Extension [Auto Scheduling](guides/auto-scheduling.md). Sie plant Aufgaben automatisch basierend auf deren Beziehungen.

Um die automatische Planung zu aktivieren, verwenden Sie die Methode [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

Setzen Sie außerdem die Eigenschaft **auto_scheduling** auf true:

~~~js
gantt.config.auto_scheduling = true;
~~~

## Aufgaben manuell verschieben


### Inhaltsverzeichnis

- [Alle verknüpften Aufgaben ermitteln](#linked_tasks)
- [Nachfolger synchron mit der Hauptaufgabe verschieben](#sync)
- [Nachfolger nach Abschluss der Verschiebung der Hauptaufgabe verschieben](#after)


### Grundidee
Ein gängiger Weg, abhängige Aufgaben zu verschieben, ist:

- Erkennen, wann eine Aufgabe verschoben wird
- Alle abhängigen Aufgaben finden und sie um denselben (oder angepassten) Wert verschieben

Sie können eine der beiden folgenden Ansätze wählen:

- [Nachfolger synchron mit der Hauptaufgabe verschieben](#sync)
- [Nachfolger nach Abschluss der Verschiebung der Hauptaufgabe verschieben](#after)

In beiden Fällen besteht der erste Schritt darin, alle verknüpften Aufgaben zu ermitteln.


### Alle verknüpften Aufgaben ermitteln {#linked_tasks}

Um die mit einer Aufgabe verbundenen Links zu finden, verwenden Sie die Eigenschaften **$source** und **$target** des Aufgabenobjekts.
Diese werden automatisch generiert und enthalten die IDs der zugehörigen Links:

- $source - Links, die von der Aufgabe ausgehen
- $target - Links, die auf die Aufgabe verweisen

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - IDs der ausgehenden Links  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - IDs der eingehenden Links
~~~

Aus diesen Links können Sie die abhängigen Aufgaben ermitteln.

Um alle verknüpften Aufgaben zu sammeln, definieren Sie einen Iterator wie folgt:

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // besuchte Aufgaben nachverfolgen, um Endlosschleifen zu vermeiden
  var traversedTasks = arguments[2] || {};
  if(traversedTasks[root])
    return;
  traversedTasks[root] = true;
  
  var rootTask = this.getTask(root);
  var links = rootTask.$source;
  if(links){
    for(var i="0;" i < links.length; i++){
      var link = this.getLink(links[i]);
      if(this.isTaskExists(link.target) && !traversedTasks[link.target]){
        callback.call(this, this.getTask(link.target));
        
        // den gesamten Abhängigkeitszweig durchlaufen, nicht nur die erste Ebene
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### Nachfolger synchron mit der Hauptaufgabe verschieben {#sync}

Nachfolgende Aufgaben können beim Ziehen zusammen mit der Hauptaufgabe verschoben werden. Das bedeutet, dass beim Verschieben der Hauptaufgabe alle abhängigen Aufgaben gleichzeitig mitverschoben werden. Dies wirkt flüssig, kann aber die Leistung beeinträchtigen, wenn viele Aufgaben betroffen sind.

#### Schritt 1

Deklarieren Sie zunächst den Iterator wie oben unter [Alle verknüpften Aufgaben ermitteln](#linked_tasks) gezeigt.

#### Schritt 2

Fügen Sie anschließend einen Handler für das Ereignis [onTaskDrag](api/event/ontaskdrag.md) hinzu. Dieses Ereignis wird bei jedem Zieh-Vorgang ausgelöst. Hier können Sie alle verknüpften Aufgaben verschieben.

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move){
    var diff = task.start_date - original.start_date;
    gantt.eachSuccessor(function(child){
      child.start_date = new Date(+child.start_date + diff);
      child.end_date = new Date(+child.end_date + diff);
      gantt.refreshTask(child.id, true);
    },id );
  }
  return true;
});
~~~

#### Schritt 3

Wenn das Ziehen beendet ist und der Nutzer die Maus loslässt, runden Sie die Positionen der Nachfolger auf die Zeitskala. Dies kann mit dem Ereignis [onAfterTaskDrag](api/event/onaftertaskdrag.md) erfolgen:

~~~js
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    gantt.eachSuccessor(function(child){
      child.start_date = gantt.roundDate(child.start_date);
      child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
      gantt.updateTask(child.id);
    },id );
  }
});
~~~

Diese Methode funktioniert gut, solange keine große Anzahl verknüpfter Aufgaben betroffen ist.


### Nachfolger nach Abschluss der Verschiebung der Hauptaufgabe verschieben {#after}

Alternativ können die nachfolgenden Aufgaben erst aktualisiert werden, nachdem die Hauptaufgabe verschoben wurde. Dieser Ansatz ist visuell einfacher und bietet eine bessere Performance.

Die Idee ist, das Ziehen abzuwarten, dann die Verschiebungsdifferenz der Hauptaufgabe zu berechnen und alle abhängigen Aufgaben um diesen Wert zu verschieben.

#### Schritt 1

Deklarieren Sie zunächst den Iterator wie zuvor unter [Alle verknüpften Aufgaben ermitteln](#linked_tasks) gezeigt.

#### Schritt 2

Wenn der Nutzer das Ziehen beendet, fangen Sie das Ereignis [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) ab. Dieses Ereignis stellt sowohl die ursprüngliche als auch die geänderte Version der verschobenen Aufgabe zur Verfügung, wodurch Sie die Datumsdifferenz berechnen können.

:::note
Beachten Sie, dass Drag-and-Drop an dieser Stelle noch abgebrochen werden kann (da onBeforeTaskChanged eine Abbrechung unterstützt und Ihre App möglicherweise Handler dafür hat), daher werden abhängige Aufgaben hier noch nicht aktualisiert.
:::

Speichern Sie stattdessen die berechnete Differenz in einer später zugänglichen Variablen.

~~~js
var diff = 0;

gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    var modifiedTask = gantt.getTask(id);
    diff = modifiedTask.start_date - originalTask.start_date;
  }
  return true;
});
~~~

#### Schritt 3

Verwenden Sie abschließend das Ereignis [onAfterTaskDrag](api/event/onaftertaskdrag.md), um alle abhängigen Aufgaben mit der zuvor berechneten *diff* zu aktualisieren:

~~~js
//Rundet die Positionen der Nachfolger auf die Zeitskala
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
});
~~~

Hier ist der vollständige Code:

~~~js
(function(){
  
  var diff = 0;
  
  gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      var modifiedTask = gantt.getTask(id);
      diff = modifiedTask.start_date - originalTask.start_date;
    }
    return true;
  });
  
  //Rundet die Positionen der Nachfolger auf die Zeitskala
  gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
  });
})();
~~~

@linkclass:hidden

