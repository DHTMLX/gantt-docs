---
title: "Tooltips für Gantt-Elemente"
sidebar_label: "Tooltips für Gantt-Elemente"
---

# Tooltips für Gantt-Elemente

Tooltips ermöglichen es Ihnen, zusätzliche Informationen für Benutzer bereitzustellen, ohne den Bildschirm mit Text zu überfluten. Standardmäßig werden Tooltips den Gantt-Aufgaben hinzugefügt.

![task_tooltip](/img/task_tooltip.png)

Sie können Tooltips zu jedem Gantt-Element über die entsprechende API hinzufügen ([Tooltips zu jedem Gantt-Element](#tooltipsfordifferentelements)).

## Activation

Um Tooltips für Aufgaben zu aktivieren, aktivieren Sie das **tooltip**-Plugin mit der [gantt.plugins](api/method/plugins.md) Methode:

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~

[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

Sobald die Erweiterung aktiviert ist, werden Tooltips automatisch mit den Standardeinstellungen angezeigt.

## Benutzerdefinierter Text

Standardmäßig zeigen Tooltips drei Eigenschaften einer Aufgabe an:

1. Das Startdatum einer Aufgabe.
2. Das Enddatum einer Aufgabe.
3. Der Name der Aufgabe.

Um benutzerdefinierten Text für Tooltips festzulegen, verwenden Sie die [tooltip_text](api/template/tooltip_text.md) Vorlage:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration>`;
~~~

## Tooltip-API {#tooltipapi}

### Tooltip-Objekt

Sie können auf das Tooltip-Objekt als **gantt.ext.tooltips.tooltip** zugreifen. Dieses Objekt ermöglicht das Steuern von Position, Inhalt und Sichtbarkeit des Tooltips über eine Reihe von Methoden:

- **getNode()** - gibt das HTML-Element des Tooltips zurück  
- **setViewport()** - fixiert die Position des Tooltips an die Grenzen des angegebenen HTML-Elements
    - **node** - (*HTMLElement*) das HTML-Element, unter dem sich der Mauszeiger befindet
- **show()** - zeigt den Tooltip an bestimmten Koordinaten (relativ zu document.body). Die Methode kann je nach gewünschter Position unterschiedliche Parameter entgegennehmen:
    - Um Tooltip an bestimmten Koordinaten (relativ zu document.body) anzuzeigen, übergeben Sie: 
        - **left** - (*number*) die X-Koordinate
        - **top** - (*number*) die Y-Koordinate 
    - Um Tooltip an Koordinaten des Mausereignisses anzuzeigen (Tooltip-Offset x/y und Viewport werden berücksichtigt), übergeben Sie:
        - **event** - (*Event*) das Mausereignisobjekt  
- **hide()** - versteckt das Tooltip-Element
- **setContent()**- fügt dem Tooltip HTML-Inhalt hinzu. Erwartet als Parameter:
    - **html** - (*string*) ein String mit HTML-Inhalt für das Tooltip


### Methoden

Es gibt mehrere Methoden, die das Verhalten des Tooltips beim Hover über DOM-Elemente steuern lassen.

#### gantt.ext.tooltips.attach() {#attach}

fügt Tooltip mit erweiterter Konfiguration hinzu. Die Methode nimmt ein Objekt mit Tooltip-Einstellungen als Parameter entgegen. Die über die Methode einstellbaren Einstellungen sind folgende:

- **selector** - (*string*) definiert den CSS-Selektor für die Elemente, auf die Mausereignisse hören sollen
- **onmouseenter** - (*function*) ein Handler, der aufgerufen wird, wenn der Mauszeiger das Element betritt. Die Parameter sind:
     - **event** - (*Event*) ein natives Mausereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
- **onmousemove** - (*function*) ein Handler, der aufgerufen wird, wenn sich der Mauszeiger innerhalb des Elements bewegt. Die Parameter sind:
    - **event** - (*Event*) ein natives Mausereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
- **onmouseleave** - (*function*) ein Handler, der aufgerufen wird, wenn der Mauszeiger das Element verlässt. Die Parameter sind:    
    - **event** - (*Event*) ein natives Mausereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
- **global** - (*boolean*) definiert, ob das Modul Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb eines Gantt-Elements (*false*) hört. Standardmäßig ist die Option auf *false* gesetzt.

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

fügt einen Tooltip dem angegebenen Gantt-Element hinzu. Es handelt sich um eine vereinfachte Version der **attach()**-Methode. Die Methode nimmt als Parameter *ein Objekt mit Tooltip-Details* entgegen. Dieses Objekt hat folgende Eigenschaften:

- **selector** - (*string*) ein CSS-Selektor des Gantt-Elements, dem ein Tooltip hinzugefügt werden soll
- **html** - (*function*) eine Vorlage für das Tooltip. Die Vorlagenfunktion nimmt zwei Parameter entgegen:
    - **event** - (*Event*) ein natives Maus-Ereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
  und gibt eine Zeichenkette mit einer Vorlage zurück.
- **global** - (*boolean*) optional, definiert, ob das Modul Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb eines Gantt-Elements (*false*) hört. Standardmäßig ist diese Option auf *false* gesetzt.

#### gantt.ext.tooltips.detach() {#detach} 

entfernt Tooltip. Als Parameter nimmt die Methode Folgendes:

- **selector** - (*string*) der CSS-Selektor eines Gantt-Elements

#### gantt.ext.tooltips.delayShow() {#delayShow} 

zeigt einen Tooltip nach der Verzögerung, die durch [tooltip_timeout](api/config/tooltip_timeout.md) festgelegt ist. Falls die Konfiguration nicht festgelegt ist, wird eine kleine Standardverzögerung verwendet.

Diese Methode ist **debounced**, was bedeutet, dass wiederholte Aufrufe innerhalb des Verzögerungsfensters den Timer zurücksetzen und der Tooltip nur einmal angezeigt wird.

Als Parameter nimmt die Methode:

- **event** - (*Event*) ein natives Maus-Ereignis, das verwendet wird, um die Position des Tooltips zu bestimmen
- **tooltipText** - (*string*) der Text des Tooltips, gerendert als innerHTML

#### gantt.ext.tooltips.delayHide() {#delayHide} 

versteckt den aktuell angezeigten Tooltip nach einer Verzögerung, die durch [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) festgelegt ist. Falls die Konfiguration nicht festgelegt ist, wird eine kleine Standardverzögerung verwendet.

## Tooltips für verschiedene Elemente {#tooltipsfordifferentelements}

Standardmäßig werden Tooltips nur zu den Gantt-Aufgaben hinzugefügt, aber Sie können Tooltips auch für jedes andere Gantt-Element festlegen. Zum Beispiel für einen Ressourcen-Marker:

![Resource marker tooltip](/img/resource_marker_tooltip.png)

Es gibt zwei entsprechende Methoden in der [Tooltip-API](#tooltipapi) hierfür:

- die [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) Methode 

Beispiel, so können Sie Tooltips für Zellen der Timeline-Skalierung hinzufügen:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper .getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

Hinweis: Die Methode [gantt.ext.tooltips.tooltipFor()](#tooltipfor) muss nach Abschluss der Gantt-Initialisierung aufgerufen werden. Beispielsweise können Sie die Methode innerhalb des [onGanttReady](api/event/onganttready.md) Ereignis-Handlers wie folgt angeben:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;

    tooltips.tooltipFor({
        selector: ".gantt_task_link",
        html: (event, node) => {
            // ...
        }
    });

    gantt.init("gantt_here");
});
~~~

[Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)

Oder Sie können wie folgt vorgehen:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: (event, domElement) => {
        const id = event.target.parentNode.getAttribute("task_id");
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~

**Zugehöriges Beispiel** [Gantt. Custom tooltips for cells](https://snippet.dhtmlx.com/6kb5gm39)

Ein Tooltip, der auf diese Weise hinzugefügt wird, folgt dem Mauszeiger und verwendet die Einstellungen *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*, [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md).

- die [**gantt.ext.tooltips.attach()**](#attach) Methode

Diese Methode ermöglicht das Hinzufügen eines Tooltips mit erweiterter Konfiguration, um das Tooltip-Verhalten an die Bewegung des Mauszeigers anzupassen.

## Anpassung des Tooltip-Verhaltens

Es besteht die Möglichkeit, das Standardverhalten des Tooltips zu ändern. Dies lässt sich erreichen, indem der integrierte Tooltip-Handler entfernt und durch einen benutzerdefinierten ersetzt wird:

- Entfernen des integrierten Tooltip-Handlers von Aufgaben mit der [**gantt.ext.tooltips.detach**](#detach) Methode:

~~~js
// remove the built-in tooltip handler from tasks
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- Fügen Sie das gewünschte Tooltip-Verhalten über die [**gantt.ext.tooltips.attach()**](#attach) Methode hinzu. Im folgenden Beispiel wird der Tooltip nur über der Tabelle angezeigt:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event) => {
        if (gantt.config.touch && !gantt.config.touch_tooltip) {
            return;
        }

        const targetTaskId = gantt.locate(event);
        if (gantt.isTaskExists(targetTaskId)) {
            const task = gantt.getTask(targetTaskId);
            return gantt.templates.tooltip_text(task.start_date, task.end_date, task);
        }

        return null;
    },
    global: false
});
~~~

## Timeout

Sie können die Zeiten zum Anzeigen und Verbergen von Tooltips über die entsprechenden Einstellungen konfigurieren.

Um den Zeitraum in Millisekunden festzulegen, bevor ein Tooltip für eine Aufgabe erscheint, verwenden Sie [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


Um festzulegen, wie lange ein Tooltip nach dem Bewegen des Cursors an eine andere Position angezeigt wird, verwenden Sie die Eigenschaft [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

## Position

Die Position eines Tooltips kann angepasst werden, indem die Offsets seiner Standardposition über zwei Konfigurations-Eigenschaften geändert werden:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - setzt den horizontalen Offset der Tooltip-Position
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - setzt den vertikalen Offset der Tooltip-Position

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~

## Anzeigenbereich

Vor Version 6.1 wurden Tooltips nur im Timeline-Bereich angezeigt. Nach der Version 6.1 ist die Tooltip-Anzeige nicht mehr begrenzt, und ein Tooltip folgt der Bewegung des Mauszeigers.

Falls erforderlich, können Sie das vorherige Verhalten wiederherstellen, indem Sie vor der Initialisierung von Gantt den folgenden Code verwenden:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~