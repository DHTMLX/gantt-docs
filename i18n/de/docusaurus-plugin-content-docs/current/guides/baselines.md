---
title: "Benutzerdefinierte Elemente im Timeline-Bereich"
sidebar_label: "Benutzerdefinierte Elemente im Timeline-Bereich"
---

# Benutzerdefinierte Elemente im Timeline-Bereich

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

dhtmlxGantt bietet die [eingebaute Funktionalität](guides/inbuilt-baselines.md), die das standardmäßige Rendern solcher zusätzlicher Elemente wie Baselines, Deadlines und Aufgabenkonstellationen ermöglicht. Falls Sie die Standardfunktionen erweitern oder ändern müssen, können Sie benutzerdefinierte Elemente manuell in die Zeitachse einfügen, wie unten beschrieben.

Das Anzeigen zusätzlicher Elemente erfolgt üblicherweise durch das Erstellen einer anzeigbaren Ebene und das Platzieren benutzerdefinierter Elemente dort
(unter Verwendung der absoluten Positionierung, um benutzerdefinierte Elemente neben der zugehörigen Aufgabe zu positionieren).

**Um der Timeline einen weiteren Layer hinzuzufügen**, verwenden Sie die [`addTaskLayer()`](api/method/addtasklayer.md)-Methode. Als Parameter nimmt die Methode eine Funktion, die:

- ein Task-Objekt erhält;
- entweder ein DOM-Element zurückgibt, das angezeigt wird, oder *false* (das Element für eine Aufgabe soll versteckt werden).

~~~js
gantt.addTaskLayer((task) => {
    const layerElement = document.createElement('div');
    // dein Code
    return layerElement;
});
~~~

**Verwandte Beispiel**: [Deadlines anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

Hinweis:

1. Nachdem Sie die Methode aufgerufen haben, fügt dhtmlxGantt einen Container in die Zeitachse ein.
2. Wenn dhtmlxGantt Daten rendert, wird die [`addTaskLayer()`](api/method/addtasklayer.md) Methode für jede Aufgabe aufgerufen und das zurückgegebene DOM-Element wird dem Container angehängt.
3. Für die Anordnung von Elementen können Sie eine normale absolute Position verwenden.
4. Wenn eine Gantt-Aufgabe aktualisiert wird, wird sie in allen Layern, einschließlich der benutzerdefinierten, aktualisiert (die Funktion wird für die aktualisierte Aufgabe aufgerufen und das zugehörige DOM-Element wird ersetzt).
5. dhtmlxGantt bietet eine Methode zur Berechnung der Position und Größe einer Aufgabe - [`getTaskPosition()`](api/method/gettaskposition.md). Sie können sie auch verwenden, um die Position und Größe für Ihre benutzerdefinierten Elemente zu berechnen.

*Um zu erfahren, wie die Renderleistung beim Anzeigen benutzerdefinierter Elemente erhöht werden kann, lesen Sie den [`addTaskLayer()`](api/method/addtasklayer.md#smart-rendering-for-custom-layers) Artikel.*

:::note
Wenn Sie den benutzerdefinierten Inhalt in allen Zellen der Timeline anzeigen möchten, legen Sie HTML direkt in die Zellen mithilfe der Vorlage [`timeline_cell_content`](api/template/timeline_cell_content.md) ein. Dieser Ansatz ist leichter umzusetzen und performanter.
:::

## Anwendungsbeispiel

Um zu verstehen, wie man diese Funktionalität anwendet, betrachten wir ein Beispiel: Sie haben eine geplante und eine tatsächlich verstrichene Zeit für Aufgaben und möchten beide Zeiten anzeigen.

![baselines](/img/baselines.png)

### Schritt 1. Reduzieren Sie die Aufgabenhöhe und verschieben Sie die Aufgabenlinien nach oben

Im Ausgangszustand sehen die Aufgaben so aus:

![baselines_start](/img/baselines_start.png)

Zunächst müssen Sie etwas Platz für Baselines unter den Aufgaben schaffen.
Dazu ist es notwendig, die Höhe der Aufgabenleiste mit `gantt.config.bar_height` zu verringern und sie annähernd auf die Hälfte der Zeilenhöhe zu setzen, die durch `gantt.config.row_height` definiert ist:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

Und bewegen Sie die Aufgabenlinie nach oben innerhalb der Zeile, indem Sie folgenden CSS-Code anwenden:

~~~css
.gantt_task_line,
.gantt_line_wrapper {
    margin-top: -9px;
}

.gantt_task_link .gantt_link_arrow {
    margin-top: -10px;
}

.gantt_task_link .gantt_link_corner {
    margin-top: -9px;
}
~~~

Das Ergebnis wird folgendes sein:

![baselines_task_height](/img/baselines_task_height.png)

### Schritt 2. Zusätzliche Daten-Eigenschaften hinzufügen

Anschließend müssen Sie dem Task-Objekt zusätzliche Daten-Eigenschaften hinzufügen. Nennen wir sie: `planned_start` und `planned_end`.

![baseline_task_object](/img/baseline_task_object.png)

### Schritt 3. Hinzugefügte Dateneigenschaften in Date-Objekte umwandeln

dhtmlxGantt kennt nur die Daten-Eigenschaften `start_date` und `end_date` und wandelt diese automatisch in Date-Objekte um.
Andere Datums-Eigenschaften benötigen zusätzliche Verarbeitung.
Um die hinzugefügten Eigenschaften `planned_start` und `planned_end` von dhtmlxGantt erkennbar zu machen, parsen Sie sie mithilfe der Methode `parseDate()` im [`onTaskLoading`](api/event/ontaskloading.md) Ereignishandler.

~~~js
gantt.attachEvent("onTaskLoading", (task) => {
    task.planned_start = gantt.date.parseDate(task.planned_start, gantt.config.date_format);
    task.planned_end = gantt.date.parseDate(task.planned_end, gantt.config.date_format);
    return true;
});
~~~

### Schritt 4. Benutzdefinierte Elemente für die geplante Zeit anzeigen

Dann rufen Sie die [`addTaskLayer()`](api/method/addtasklayer.md) Methode auf, um die geplante Zeit für eine Aufgabe anzuzeigen, definiert durch die Eigenschaften `planned_start` und `planned_end`.

~~~js
gantt.addTaskLayer((task) => {
    if (task.planned_start && task.planned_end) {
        const taskPosition = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        const baselineElement = document.createElement('div');
        baselineElement.className = 'baseline';
        baselineElement.style.left = taskPosition.left + 'px';
        baselineElement.style.width = taskPosition.width + 'px';
        baselineElement.style.top = taskPosition.top + gantt.config.task_height + 13 + 'px';
        return baselineElement;
    }
    return false;
});
~~~

### Schritt 5. Legen Sie die CSS-Regeln für die hinzugefügten Elemente fest

Als nächstes fügen Sie einen Stil für Ihre neuen Elemente hinzu:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255, 153, 0);
}
~~~

### Schritt 6. Ermöglichen Sie das Bearbeiten der hinzugefügten Dateneigenschaften im Lightbox

Schließlich definieren Sie die Struktur der `lightbox` neu, wenn Sie eine Möglichkeit bieten möchten, die neu hinzugefügten Eigenschaften aus der Benutzeroberfläche zu bearbeiten.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" },
    {
        name: "baseline",
        height: 72,
        map_to: {
            start_date: "planned_start",
            end_date: "planned_end"
        },
        type: "duration"
    }
];
gantt.locale.labels.section_baseline = "Geplant";
~~~

Der vollständige Code des betrachteten Beispiels ist im entsprechenden Sample zu sehen.

**Verwandte Beispiel**: [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

## Beispiele für benutzerdefinierte Inhalte

Die folgenden Beispiele zeigen Ihnen verschiedene Wege, den [`addTaskLayer()`](api/method/addtasklayer.md)-Weg zu verwenden, um die Timeline des Gantt-Diagramms mit unterschiedlichen benutzerdefinierten Elementen anzureichern:

- <a href="https://snippet.dhtmlx.com/wv23be05" target="_blank">Benutzerdefinierte Baselines</a>
- <a href="https://snippet.dhtmlx.com/bk5m6his" target="_blank">Zellen mit überfälliger Zeit hervorheben</a>
- <a href="https://snippet.dhtmlx.com/p74m3du2" target="_blank">Überfällige Aufgaben hervorheben</a>
- <a href="https://snippet.dhtmlx.com/cuc7d4vn" target="_blank">Verpasstes Enddatum für das gesamte Projekt anzeigen</a>
- <a href="https://snippet.dhtmlx.com/bpupkrce" target="_blank">Fortschrittswert der Aufgabe anzeigen</a>
- <a href="https://snippet.dhtmlx.com/quqe9s2o" target="_blank">Benutzerdefinierte Elemente für Aufgaben hinzufügen</a>
- <a href="https://snippet.dhtmlx.com/pmuy0lj8" target="_blank">Draggable baselines</a>
- <a href="https://snippet.dhtmlx.com/38h66bni" target="_blank">Baselines mit einem verschiebbaren Fortschrittsknopf</a>
- <a href="https://snippet.dhtmlx.com/3oy6052q" target="_blank">Benutzerdefinierte Meilensteine</a>
- <a href="" target="_blank">Wiederkehrende Aufgaben</a>

## Drag-and-drop für benutzerdefinierte Elemente

Es könnte hilfreich sein, wenn wir die Frage der Aktivierung von Drag-and-Drop für benutzerdefinierte Elemente untersuchen. Die Sache ist, dass es keine eingebaute Funktion zur Implementierung eines benutzerdefinierten Drag-and-Drop in DHTMLX Gantt gibt. Aber es lässt sich auf einfache Weise manuell realisieren.

Dabei müssen Sie drei DOM-Ereignisse erfassen: `mousedown`, `mousemove` und `mouseup`, und ein paar Flaggen definieren, um den Zustand von Drag-and-Drop zwischen diesen Ereignissen zu speichern.

1. Das `mousedown`-Ereignis signalisiert, dass Drag-and-Drop beginnt. Allerdings kann dies auch die erste Phase eines normalen `click`-Ereignisses sein, welches Drag-and-Drop nicht aktivieren sollte. An diesem Schritt müssen Sie eine Flagge setzen, die angibt, dass Drag-and-Drop angefordert wurde, und die anfängliche Mausposition sowie alle weiteren Daten speichern, die später benötigt werden.

~~~js
let dndRequested = false;
let dndActivated = false;
let startPosition = null;
let startTimestamp = null;
let taskId = null;
const domUtils = gantt.utils.dom;
// in diesem Beispiel ziehen wir `.baseline`-Elemente innerhalb des Containers `gantt.$task_data`
gantt.event(gantt.$task_data, 'mousedown', (event) => {
    // nutze element.closest oder gantt.utils.dom.closest, um das verschiebbare Element zu finden
    const draggableElement = domUtils.closest(event.target, '.baseline');

    if (draggableElement) {
        // wir wissen noch nicht, ob der Benutzer das Element tatsächlich ziehen wird
        // speichern Sie die Ereignis-Info, wir prüfen sie später bei 'mousemove'
        dndRequested = true;
        startTimestamp = Date.now();
        startPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        taskId = draggableElement.getAttribute("data-task");
    }
});
~~~

Beachten Sie, dass der Ereignishandler über [`gantt.event()`](api/method/event.md) statt über native [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) hinzugefügt wird. Das ist sinnvoll, weil Gantt mit der Methode `gantt.destructor()` zerstört werden kann und alle über `gantt.event()` angehängten Events automatisch bereinigt werden. Wenn Sie die native Methode verwenden und `gantt.destructor()` aufrufen, müssen Sie Event-Handler eventuell manuell bereinigen, um Speicherlecks zu vermeiden.

2. Die eigentliche Drag-and-Drop-Aktion beginnt im `mousemove`-Handler. Anstatt Drag-and-Drop direkt beim Mausklick zu starten, vergleichen Sie die aktuelle Mausposition mit der im `mousedown` gespeicherten Anfangsposition. So kann Drag-and-Drop erst gestartet werden, wenn sich die Position signifikant geändert hat. Falls Sie keine Mindestschwelle festlegen möchten, können Sie auch die seit dem `mousedown` vergangene Zeit schätzen.

Sobald Sie festgestellt haben, dass Drag-and-Drop begonnen hat, können Sie den `mousemove`-Handler verwenden, um die Position des gezogenen Elements auf dem Bildschirm zu aktualisieren. Wenn Sie ein benutzerdefiniertes Layer-Element ziehen, ist der übliche Ansatz zur Aktualisierung, das zugrunde liegende Objekt zu ändern und es mithilfe der Gantt-API neu zu zeichnen (`[gantt.refreshTask()](api/method/refreshtask.md)`), anstatt das DOM-Element direkt zu verändern.

~~~js
gantt.event(window, 'mousemove', (event) => {
    if (dndRequested && gantt.isTaskExists(taskId)) {
        // wir haben 'mousemove' nach dem 'mousedown'-Ereignis erfasst
        const currentPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        if (!dndActivated) {
            // 'mousemove' könnte Teil des normalen Klick-Prozesses sein,
            // wir möchten kein DND bei normalem Klick auslösen
            // prüfen, ob sich die Mausposition signifikant geändert hat,
            // oder ob der Benutzer die Maustaste länger gedrückt hält als üblich beim normalen Klick
            if (Math.abs(currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp) > 500) {
                // falls ja - gehen wir davon aus, dass DND gestartet ist
                dndActivated = true;
            }
        }
        if (dndActivated) {
            // hier können wir die Position des gezogenen Elements aktualisieren.
            // wenn wir ein Element hinzugefügt über `gantt.addTaskLayer` ziehen,
            // ist es besser, das zugehörige Task-Objekt zu aktualisieren
            // und es über `gantt.refreshTask` neu zu zeichnen
            // Sie können auch das entsprechende Datum der Zeitskala erhalten:
            const pointerDate = gantt.dateFromPos(currentPosition.x);
            gantt.getTask(taskId).baseline_date = pointerDate;
            gantt.refreshTask(taskId);
        }
    }
});
~~~

3. Schließlich sollten Sie das `mouseup`-Ereignis erfassen. Wenn Drag-and-Drop gestartet wurde, wenden Sie Änderungen am verschobenen Objekt an, rufen ggf. die [`gantt.updateTask()`](api/method/updatetask.md) Methode auf und löschen alle temporären Flaggen.

~~~js
gantt.event(window, 'mouseup', (event) => {
    // wende Änderungen an, falls Drag-and-Drop im Gange war
    if (dndActivated) {
        // validieren und bei Bedarf abschließen
        const task = gantt.getTask(taskId);
        task.baseline_date = gantt.roundDate({
            date: task.baseline_date,
            unit: "hour",
            step: 1
        });
        // rufe gantt.updateTask auf, um das Update der Daten zu erzwingen
        gantt.updateTask(taskId);
    }
    // lösche alle Flaggen, die wir zuvor gesetzt haben
    dndRequested = false;
    dndActivated = false;
    startPosition = null;
    startTimestamp = null;
    taskId = null;
});
~~~

## Extra Overlay für das Diagramm

dhtmlxGantt bietet die Möglichkeit, eine zusätzliche Ebene über dem Gantt-Diagramm zu legen, um benutzerdefinierten Inhalt darin zu platzieren. Als Overlay können Sie einen Div-Container, ein HTML-Canvas usw. verwenden. Um den Overlay-Inhalt zu zeichnen, kann jede Drittanbieter-Bibliothek genutzt werden.

Beispielsweise können Sie eine S-Kurve in das zusätzliche Overlay einfügen. Allgemein zeigen S-Kurven das Wachstum von Ausgaben, die Reduzierung von Materiallieferungen usw. und ermöglichen das Verfolgen des gemeinsamen Fortschritts der Implementierung von Aufgaben eines Projekts.

Um ein Overlay in Gantt hinzuzufügen, müssen Sie zwei Schritte durchführen:

- Aktivieren Sie die `overlay`-Erweiterung mit der [`gantt.plugins()`](api/method/plugins.md)-Methode

~~~js
gantt.plugins({
    overlay: true
});
~~~

- Verwenden Sie die `addOverlay()`-Methode des `gantt.ext.overlay` Objekts und übergeben Sie eine Funktion, die die Logik zum Hinzufügen von Overlay-Inhalten enthält.
Diese Funktion erhält einen Container mit benutzerdefiniertem Inhalt als Parameter. Siehe Beispiele unten.

Das folgende Beispiel zeigt, wie Sie ein Canvas-Overlay mit S-Kurven hinzufügen können, um den Ziel- und Ist-Fortschritt des Projekts anzuzeigen (implementiert mit der Hilfe der [ChartJS](https://www.chartjs.org/) Bibliothek):

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    const chartContext = canvas.getContext("2d");
    const progressChart = new Chart(chartContext, {
        type: "line",
        // vollständige Diagramm-Konfiguration
    });
});
~~~

Die Methode `gantt.ext.overlay.addOverlay()` gibt die ID eines neuen Overlays als Zahl zurück.

**Verwandte Beispiel**: [Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

### Overlay-Erweiterungs-API

Die Erweiterung **dhtmlxgantt_overlay** enthält eine Reihe von API-Methoden zur Arbeit mit Overlays. Diese Methoden sind über das `gantt.ext.overlay`-Objekt verfügbar.

#### `addOverlay()`

Fügt der Gantt-Grafik ein neues Overlay hinzu und gibt dessen ID zurück. Als Parameter wird ein Container mit benutzerdefiniertem Inhalt übergeben.

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {});
~~~

#### `deleteOverlay()`

Entfernt ein Overlay anhand seiner ID.

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### `getOverlaysIds()`

Gibt ein Array mit den IDs der dem Diagramm hinzugefügten Overlays zurück.

~~~js
const overlayIds = gantt.ext.overlay.getOverlaysIds();
~~~

#### `refreshOverlay()`

Lackiert das angegebene Overlay neu. Als Parameter wird die ID eines Overlays übergeben.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### `showOverlay()`

Zeigt ein Overlay anhand seiner ID an. Als Parameter wird die ID eines Overlays übergeben.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### `hideOverlay()`

Versteckt ein Overlay anhand seiner ID.

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### `isOverlayVisible()`

Prüft, ob das angegebene Overlay sichtbar ist. Gibt `true` zurück, wenn das Overlay sichtbar ist.

~~~js
const isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~