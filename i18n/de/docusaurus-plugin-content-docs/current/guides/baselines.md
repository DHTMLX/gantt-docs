---
title: "Benutzerdefinierte Elemente im Timeline-Bereich"
sidebar_label: "Benutzerdefinierte Elemente im Timeline-Bereich"
---

# Benutzerdefinierte Elemente im Timeline-Bereich

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

dhtmlxGantt enthält [eingebaute Funktionen](guides/inbuilt-baselines.md) zur standardmäßigen Anzeige zusätzlicher Elemente wie Baselines, Deadlines und Task-Constraints. Wenn Sie diese Funktionen erweitern oder anpassen möchten, können Sie benutzerdefinierte Elemente manuell zum Timeline-Bereich hinzufügen, wie unten beschrieben.

Das Hinzufügen zusätzlicher Elemente beinhaltet in der Regel das Erstellen einer eigenen Darstellungsschicht (Layer) und das Positionieren der benutzerdefinierten Elemente dort mittels absoluter Positionierung, um sie mit der jeweiligen Aufgabe auszurichten.

**Um dem Timeline-Bereich eine zusätzliche Ebene hinzuzufügen**, verwenden Sie die Methode [addTaskLayer](api/method/addtasklayer.md). Diese Methode erwartet eine Funktion als Parameter, die:

- Ein Task-Objekt erhält;
- Entweder ein anzuzeigendes DOM-Element zurückgibt oder *false*, wenn das Element für eine Aufgabe ausgeblendet werden soll.

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // Ihr Code
    return el;
});
~~~

[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Hinweise:

1. Sobald Sie die Methode aufrufen, fügt dhtmlxGantt dem Timeline-Bereich einen Container hinzu.
2. Beim Rendern der Daten wird die Methode [addTaskLayer](api/method/addtasklayer.md) für jede Aufgabe aufgerufen und das zurückgegebene DOM-Element dem Container hinzugefügt.
3. Sie können Standard-Absolute-Positionierung verwenden, um die Elemente zu platzieren.
4. Wenn eine Gantt-Aufgabe aktualisiert wird, werden alle Layer, einschließlich der benutzerdefinierten, aktualisiert (die Funktion wird für die aktualisierte Aufgabe erneut aufgerufen und das zugehörige DOM-Element ersetzt).
5. dhtmlxGantt bietet eine Methode zur Berechnung der Position und Größe einer Aufgabe - [getTaskPosition](api/method/gettaskposition.md). Diese kann verwendet werden, um Position und Größe Ihrer eigenen Elemente zu bestimmen.

*Tipps zur Verbesserung der Rendering-Performance von benutzerdefinierten Elementen finden Sie im Artikel [addTaskLayer](api/method/addtasklayer.md).*

:::note
Wenn Sie in jeder Timeline-Zelle eigenen Inhalt anzeigen möchten, ist es einfacher und schneller, HTML direkt mit der Vorlage [timeline_cell_content](api/template/timeline_cell_content.md) in die Zellen einzufügen.
:::

## Beispiel für die Verwendung

Hier ein Beispiel zur Verdeutlichung der Funktionsweise: Angenommen, Sie haben sowohl geplante als auch tatsächliche Zeiten für Aufgaben und möchten beide anzeigen.

![baselines](/img/baselines.png)

### Schritt 1. Task-Höhe reduzieren und Task-Linien nach oben verschieben

Anfangs sehen die Aufgaben so aus:

![baselines_start](/img/baselines_start.png)

Um unter den Aufgaben Platz für Baselines zu schaffen, reduzieren Sie die Höhe der Task-Bar auf etwa die Hälfte der Zeilenhöhe:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

Verschieben Sie dann die Task-Linie mit folgendem CSS an den oberen Rand der Zeile:

~~~css
.gantt_task_line, .gantt_line_wrapper {
    margin-top: -9px;
}
.gantt_side_content {
    margin-bottom: 7px;
}
.gantt_task_link .gantt_link_arrow {
    margin-top: -12px
}
.gantt_side_content.gantt_right {
    bottom: 0;
}
~~~

Das Ergebnis sieht folgendermaßen aus:

![baselines_task_height](/img/baselines_task_height.png)

### Schritt 2. Zusätzliche Datenfelder hinzufügen

Fügen Sie als Nächstes zusätzliche Datenfelder zum Task-Objekt hinzu, z.B. 'planned_start' und 'planned_end'.

![baseline_task_object](/img/baseline_task_object.png)

### Schritt 3. Hinzugefügte Datenfelder in Date-Objekte umwandeln

dhtmlxGantt erkennt und konvertiert 'start_date' und 'end_date' automatisch in Date-Objekte. Andere Datumsfelder müssen manuell konvertiert werden. 


Damit 'planned_start' und 'planned_end' von dhtmlxGantt genutzt werden können, parsen Sie diese mit der Methode parseDate() im Handler des [onTaskLoading](api/event/ontaskloading.md) Events zu Date-Objekten.

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
    task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
    return true;
});
~~~

### Schritt 4. Benutzerdefinierte Elemente für die geplante Zeit anzeigen

Verwenden Sie dann die Methode [addTaskLayer](api/method/addtasklayer.md), um die geplante Zeit für jede Aufgabe (von 'planned_start' bis 'planned_end') darzustellen.

~~~js
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        var el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.width = sizes.width + 'px';
        el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
        return el;
    }
    return false;
});
~~~

### Schritt 5. CSS-Regeln für die hinzugefügten Elemente festlegen

Fügen Sie abschließend CSS-Stile für Ihre neuen Elemente hinzu:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255,153,0);
}
~~~

### Schritt 6. Bearbeiten der hinzugefügten Datenfelder im Lightbox ermöglichen

Um Benutzern das Bearbeiten der neu hinzugefügten Eigenschaften über die Benutzeroberfläche zu ermöglichen, müssen Sie die Struktur des Lightbox entsprechend anpassen.

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", height: 72, map_to: "auto", type: "duration"},
    {name: "baseline", height: 72, map_to: { 
        start_date: "planned_start", end_date: "planned_end"}, type: "duration"}
];
gantt.locale.labels.section_baseline = "Planned";
~~~

Den vollständigen Beispielcode finden Sie im zugehörigen Beispiel.


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## Beispiele für benutzerdefinierte Inhalte

Hier sind einige Beispiele, wie Sie die Methode [addTaskLayer()](api/method/addtasklayer.md) verwenden können, um die Gantt-Diagramm-Zeitleiste mit verschiedenen benutzerdefinierten Elementen zu erweitern:

- [Benutzerdefinierte Baselines](https://snippet.dhtmlx.com/wv23be05)
- [Hervorhebung von Zellen mit überfälliger Zeit](https://snippet.dhtmlx.com/bk5m6his) 
- [Hervorhebung überfälliger Aufgaben](https://snippet.dhtmlx.com/p74m3du2)
- [Anzeige des verpassten Endtermins für das gesamte Projekt](https://snippet.dhtmlx.com/cuc7d4vn)
- [Anzeige des Aufgabenfortschrittswertes](https://snippet.dhtmlx.com/bpupkrce)
- [Hinzufügen benutzerdefinierter Elemente für Aufgaben](https://snippet.dhtmlx.com/quqe9s2o)
- [Verschiebbare Baselines](https://snippet.dhtmlx.com/pmuy0lj8)
- [Baselines mit verschiebbarem Fortschrittsregler](https://snippet.dhtmlx.com/38h66bni)
- [Benutzerdefinierte Meilensteine](https://snippet.dhtmlx.com/70kqo4do)
- [Wiederkehrende Aufgaben](https://snippet.dhtmlx.com/5/7faa7b03a) 


## Drag-and-drop für benutzerdefinierte Elemente

Wenn Sie Drag-and-drop für benutzerdefinierte Elemente ermöglichen möchten, sollten Sie wissen, dass DHTMLX Gantt hierfür keine eingebaute Funktion bietet. Sie können dies jedoch mit einigen einfachen Schritten manuell umsetzen.

Die Idee ist, auf drei DOM-Events (**mousedown**, **mousemove**, **mouseup**) zu hören und einige Flags zu verwenden, um den Status von Drag-and-drop zwischen diesen Events zu verfolgen.

1. Das **mousedown**-Event signalisiert den Beginn eines möglichen Drag-and-drop-Vorgangs. Es könnte aber auch nur der Beginn eines normalen Klicks sein, der kein Dragging auslösen sollte. An diesem Punkt setzen Sie ein Flag, um Drag-and-drop anzufordern, und speichern die anfängliche Mausposition sowie weitere relevante Daten.

~~~js
var dndRequested = false;
var dndActivated = false;
var startPosition = null;
var startTimestamp = null
var taskId = null;
var domUtils = gantt.utils.dom;
// In diesem Beispiel werden `.baseline`-Elemente innerhalb des Containers `gantt.$task_data` gezogen
gantt.event(gantt.$task_data, 'mousedown', function(e) {
  // Verwenden Sie element.closest oder gantt.utils.dom.closest, um das ziehbare Element zu finden
  var draggableElement = domUtils.closest(e.target, '.baseline');
 
  if (draggableElement) {
    // Es ist noch nicht klar, ob der Benutzer das Element ziehen oder nur klicken möchte
    // Speichern Sie die Event-Informationen, wir prüfen dies beim 'mousemove'
    dndRequested = true;
    startTimestamp = Date.now();
    startPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    taskId = draggableElement.getAttribute("data-task");
  }
});
~~~

Beachten Sie, dass der Event-Handler mit [gantt.event](api/method/event.md) anstelle des nativen [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) angebunden wird. Der Grund: Wenn die Gantt-Instanz mit **gantt.destructor** zerstört wird, werden alle so angehängten Handler automatisch entfernt. Bei nativen Event-Listenern müssten Sie die Aufräumarbeiten selbst durchführen, um Speicherlecks zu vermeiden.

2. Der eigentliche Drag-and-drop-Vorgang beginnt beim **mousemove**-Event. Statt das Ziehen sofort beim Mouse-Down zu starten, vergleichen Sie die aktuelle Mausposition mit der zuvor gespeicherten. So beginnt das Ziehen erst, wenn sich der Cursor deutlich bewegt hat. Alternativ können Sie prüfen, ob die Maustaste länger als ein typischer Klick gehalten wurde.

Sobald das Ziehen beginnt, aktualisiert der **mousemove**-Handler die Position des gezogenen Elements. Für Elemente, die mit `gantt.addTaskLayer` hinzugefügt wurden, sollten Sie besser die zugehörigen Aufgabendaten anpassen und die Aufgabe mit [gantt.refreshTask](api/method/refreshtask.md) aktualisieren, statt das DOM direkt zu manipulieren.

~~~js
gantt.event(window, 'mousemove', function(e) {
  if (dndRequested && gantt.isTaskExists(taskId)) {
    // 'mousemove' nach 'mousedown' erkannt
    var currentPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    if (!dndActivated) {
      // 'mousemove' kann auch zu einem normalen Klick gehören,
      // Drag-and-drop soll nicht bei jedem Klick ausgelöst werden
      // Prüfen, ob sich die Mausposition deutlich geändert hat
      // oder ob die Maustaste ungewöhnlich lange gehalten wurde
      if(Math.abs(
          currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp
        ) > 500) {
          // Dann nehmen wir an, dass Drag-and-drop gestartet wurde
          dndActivated = true;
      }
    }
    if (dndActivated) {
      // Hier kann die Position des gezogenen Elements aktualisiert werden.
      // Bei Elementen, die mit `gantt.addTaskLayer` hinzugefügt wurden,
      // sollten Sie das Aufgabenobjekt aktualisieren
      // und mit `gantt.refreshTask` neu zeichnen
      // Sie können auch das entsprechende Datum der Zeitskala ermitteln:
      var pointerDate = gantt.dateFromPos(currentPosition.x);
      gantt.getTask(taskId).baseline_date = pointerDate;
      gantt.refreshTask(taskId);
    }
  }
 
});
~~~

3. Hören Sie schließlich auf das **mouseup**-Event. Falls ein Drag-and-drop stattgefunden hat, schließen Sie die Änderungen ab, indem Sie das Datum runden, ggf. [gantt.updateTask](api/method/updatetask.md) aufrufen und alle temporären Flags zurücksetzen.

~~~js
gantt.event(window, 'mouseup', function(e) {
  // Änderungen übernehmen, falls Drag-and-drop aktiv war
  if (dndActivated) {
    // Änderungen validieren und abschließen, falls nötig
    var task = gantt.getTask(taskId);
    task.baseline_date = gantt.roundDate({
      date: task.baseline_date,
      unit: "hour",
      step: 1    
    });
    // gantt.updateTask aufrufen, um die Daten zu aktualisieren    
    gantt.updateTask(taskId);
  }
  // Alle gesetzten Flags zurücksetzen
  dndRequested = false;
  dndActivated = false;
  startPosition = null;
  startTimestamp = null;
  taskId = null;
});
~~~

## Zusätzliche Overlay-Schicht für das Diagramm

Mit dhtmlxGantt können Sie eine zusätzliche Ebene über dem Diagramm hinzufügen, um benutzerdefinierte Inhalte zu platzieren. Dieses Overlay kann ein div-Container, ein HTML-Canvas oder ein anderes Element sein. Sie können jede beliebige Drittanbieter-Bibliothek verwenden, um Inhalte darin darzustellen.

Beispielsweise können Sie ein S-Kurven-Overlay hinzufügen, das häufig zur Visualisierung von Kostenanstieg, Materialverbrauch oder Gesamtfortschritt eines Projekts genutzt wird.

Um ein Overlay hinzuzufügen, gehen Sie wie folgt vor:

- Aktivieren Sie die **overlay**-Erweiterung über die Methode [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    overlay: true
});
~~~

- Verwenden Sie die Methode **addOverlay()** des Objekts **gantt.ext.overlay** und übergeben Sie eine Funktion, die für das Hinzufügen Ihrer benutzerdefinierten Inhalte zum Overlay-Container verantwortlich ist. Diese Funktion erhält das Container-Element als Parameter. Siehe Beispiel unten.

Hier ein Beispiel, wie Sie ein Canvas-Overlay mit S-Kurven für geplanten und tatsächlichen Projektfortschritt unter Verwendung der [ChartJS](https://www.chartjs.org/) Bibliothek hinzufügen:

![Overlay mit S-Kurve](/img/overlay_scurve.png)

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        // vollständige Konfiguration des Diagramms
    });
});
~~~

Die Methode **gantt.ext.overlay.addOverlay()** gibt die numerische ID des neuen Overlays zurück.


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


### Overlay-Extension API

Die **dhtmlxgantt_overlay**-Erweiterung stellt eine Reihe von API-Methoden zur Arbeit mit Overlays bereit, die über das Objekt **gantt.ext.overlay** zugänglich sind.

#### addOverlay

Fügt dem Gantt-Diagramm ein neues Overlay hinzu und gibt dessen ID zurück. Sie übergeben eine Funktion, die einen Container für Ihre eigenen Inhalte erhält.

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

#### deleteOverlay

Entfernt ein Overlay anhand seiner ID.

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### getOverlaysIds 

Gibt ein Array mit den IDs aller dem Diagramm hinzugefügten Overlays zurück.

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

#### refreshOverlay

Zeichnet das angegebene Overlay anhand seiner ID neu.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### showOverlay

Macht ein Overlay anhand seiner ID sichtbar.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### hideOverlay

Blendet ein Overlay anhand seiner ID aus.

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### isOverlayVisible

Prüft, ob das angegebene Overlay sichtbar ist. Gibt *true* zurück, falls ja.

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

