---
title: "Aufgaben zusammen mit ihren abhängigen Aufgaben verschieben"
sidebar_label: "Aufgaben zusammen mit ihren abhängigen Aufgaben verschieben"
---

# Aufgaben zusammen mit ihren abhängigen Aufgaben verschieben

Es gibt mehrere Möglichkeiten, Aufgaben zusammen mit ihren abhängigen Aufgaben zu verschieben.

## Verwendung der Auto Scheduling-Erweiterung

Zunächst können Sie die [Auto Scheduling](guides/auto-scheduling.md) Erweiterung verwenden.
Sie ermöglicht die automatische Planung von Aufgaben abhängig von Beziehungen zwischen ihnen.

Um die Auto-Scheduling-Funktionalität zu verwenden, sollten Sie sie über die Methode [gantt.plugins](api/method/plugins.md) aktivieren:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

Und setzen Sie die **auto_scheduling** Eigenschaft auf true:

~~~js
gantt.config.auto_scheduling = true;
~~~

## Aufgaben manuell verschieben

### Kapitelübersicht

- [Alle verknüpften Aufgaben abrufen](#linked_tasks)
- [Descendants synchron mit der Hauptaufgabe verschieben](#sync)
- [Descendants verschieben nach Abschluss der Bewegung der Hauptaufgabe](#after)

### Die Grundidee
Der übliche Ansatz beim Verschieben abhängiger Aufgaben ist der Folgende:

- Sie erkennen, wann die Aufgabe verschoben wird
- Sie durchlaufen alle abhängigen Aufgaben und verschieben sie um denselben (oder einen anderen, je nach Bedarf) Betrag.

Sie können deshalb eine von zwei Vorgehensweisen wählen:

- [Descendants synchron mit der Hauptaufgabe verschieben](#sync)
- [Descendants nach Abschluss der Bewegung der Hauptaufgabe verschieben](#after)

In beiden Fällen müssen Sie zunächst alle verknüpften Aufgaben abrufen.

### Getting all linked tasks {#linked_tasks}

Um die mit der Aufgabe verbundenen Links abzurufen, verwenden Sie die Eigenschaften **$source** und **$target** des Aufgabenobjekts.
Die Eigenschaften werden automatisch generiert und speichern die IDs der zugehörigen Links:

- $source - der Link, der aus der Aufgabe herausführt;
- $target - der Link, der in die Aufgabe hineinführt.

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ids of coming-out links  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - ids of coming-into links
~~~

und aus den Links können Sie die abhängigen Aufgaben erhalten.

Um also die verknüpften Aufgaben zu erhalten, müssen wir einen Iterator deklarieren:

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

### Descendants synchron mit der Hauptaufgabe verschieben {#sync}

Nachfahren können synchron mit der Verschiebung der Hauptaufgaben verschoben werden, d. h. wenn der Benutzer Aufgaben verschiebt, werden alle abhängigen Zweige zusammen verschoben. 
Das sieht gut aus, aber der Nachteil ist, dass es zu Leistungsabfällen kommen kann, wenn viele Aufgaben gleichzeitig verschoben werden.

#### Schritt 1

Deklarieren Sie zunächst den Iterator wie oben unter [Alle verknüpften Aufgaben ermitteln](#linked_tasks) gezeigt.

#### Schritt 2

Dann binden Sie einen Handler an das [onTaskDrag](api/event/ontaskdrag.md) Ereignis. Es wird bei jedem Frame des Ziehens aufgerufen, und von hier verschieben wir alle verknüpften Aufgaben.

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

Schließlich, wenn der Benutzer die Maustaste loslässt und Drag-and-Drop abgeschlossen ist, müssen die Positionen der Unteraufgaben an den Maßstab angepasst werden. Wir können dies mit dem [onAfterTaskDrag](api/event/onaftertaskdrag.md) Ereignis erreichen:

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

Dieser Ansatz funktioniert gut, wenn Sie nicht zu viele verknüpfte Aufgaben haben.

### Descendants verschieben nach Abschluss der Bewegung der Hauptaufgabe {#after}

Descendant-Aufgaben können aktualisiert werden, nachdem der Benutzer die Hauptaufgabe verschoben hat. Das Ergebnis wirkt übersichtlicher, bietet jedoch eine bessere Leistung.

Der Ansatz ist folgender: Wenn Drag-and-Drop abgeschlossen ist, prüfen wir, um welchen Betrag die Aufgabe verschoben wurde, und verschieben alle verknüpften Aufgaben auf denselben Wert.

#### Schritt 1

Deklarieren Sie zunächst den Iterator wie zuvor unter [Alle verknüpften Aufgaben ermitteln](#linked_tasks) gezeigt.

#### Schritt 2

Wenn der Benutzer die Maustaste loslässt und Drag-and-Drop abgeschlossen ist, können wir das [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) Ereignis erfassen, bei dem sowohl die modifizierte als auch die ursprüngliche Instanz der verschobenen Aufgabe verfügbar sind, und den Datumsunterschied zwischen ihnen berechnen.

:::note
Hinweis, dass Drag-and-Drop auf dieser Stufe abgebrochen werden kann (da onBeforeTaskChanged das Abbrechen erlaubt und Ihre App möglicherweise Handler hat, die das tun können),
daher ändern wir hier keine abhängigen Aufgaben.
:::

Stattdessen speichern wir den berechneten diff-Wert in einer Variablen in derselben Closure, damit er später zugänglich ist.

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

Schließlich erfassen wir das [onAfterTaskDrag](api/event/onaftertaskdrag.md) Ereignis, das angibt, dass Drag-and-Drop ausgeführt wurde. 
An diesem Punkt können wir alle abhängigen Aufgaben mit dem zuvor berechneten *diff* aktualisieren:

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

Der vollständige Code lautet wie folgt:

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
