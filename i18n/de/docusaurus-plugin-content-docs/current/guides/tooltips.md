---
title: "Tooltips für Gantt-Elemente"
sidebar_label: "Tooltips für Gantt-Elemente"
---

# Tooltips für Gantt-Elemente


Tooltips bieten eine Möglichkeit, zusätzliche Informationen anzuzeigen, ohne den Bildschirm mit zu viel Text zu überladen. Standardmäßig erscheinen Tooltips auf Gantt-Aufgaben.

![task_tooltip](/img/task_tooltip.png)

Es ist möglich, [Tooltips für jedes Gantt-Element hinzuzufügen](#tooltipsfordifferentelements), indem Sie die entsprechende API verwenden.


## Aktivierung


Um Tooltips für Aufgaben zu aktivieren, schalten Sie einfach das **tooltip**-Plugin mit der [gantt.plugins](api/method/plugins.md)-Methode ein:

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


## Eigener Text


Standardmäßig zeigen Tooltips drei Eigenschaften einer Aufgabe an:

1. Das Startdatum der Aufgabe.
2. Das Enddatum der Aufgabe.
3. Den Namen der Aufgabe.

Wenn Sie den Tooltip-Text anpassen möchten, verwenden Sie die [tooltip_text](api/template/tooltip_text.md)-Vorlage wie folgt:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~


## Tooltip-API {#tooltipapi}

### Tooltip-Objekt

Das Tooltip-Objekt ist über **gantt.ext.tooltips.tooltip** zugänglich. Es bietet Methoden, um die Position, den Inhalt und die Sichtbarkeit des Tooltips zu steuern:

- **getNode()** - gibt das HTML-Element des Tooltips zurück  
- **setViewport()** - begrenzt die Tooltip-Position innerhalb der Grenzen eines angegebenen HTML-Elements
    - **node** - (*HTMLElement*) das Element, innerhalb dessen der Tooltip angezeigt werden soll
- **show()** - zeigt den Tooltip an den angegebenen Koordinaten an (relativ zu document.body). Es akzeptiert verschiedene Parameter, je nachdem, wie der Tooltip positioniert werden soll:
    - Um den Tooltip an bestimmten Koordinaten anzuzeigen, übergeben Sie: 
        - **left** - (*number*) die X-Koordinate
        - **top** - (*number*) die Y-Koordinate 
    - Um den Tooltip an den Maus-Event-Koordinaten anzuzeigen (unter Berücksichtigung von *tooltip_offset_x/y* und Viewport), übergeben Sie:
        - **event** - (*Event*) das Maus-Event-Objekt  
- **hide()** - blendet den Tooltip aus
- **setContent()** - setzt den HTML-Inhalt innerhalb des Tooltips. Erwartet:
    - **html** - (*string*) der HTML-Inhalt


### Methoden

Mehrere Methoden helfen, das Verhalten von Tooltips beim Überfahren von DOM-Elementen zu steuern.

#### gantt.ext.tooltips.attach() {#attach}

Fügt einen Tooltip mit erweiterter Konfiguration hinzu. Akzeptiert ein Objekt mit folgenden Einstellungen:

- **selector** - (*string*) CSS-Selektor für Elemente, für die Mausereignisse überwacht werden
- **onmouseenter** - (*function*) wird aufgerufen, wenn die Maus das Element betritt, mit Parametern:
     - **event** - (*Event*) natives Maus-Event
    - **node** -  (*HTMLElement*) das Element
- **onmousemove** - (*function*) wird aufgerufen, wenn die Maus sich innerhalb des Elements bewegt, mit Parametern:
    - **event** - (*Event*) natives Maus-Event
    - **node** -  (*HTMLElement*) das Element
- **onmouseleave** - (*function*) wird aufgerufen, wenn die Maus das Element verlässt, mit Parametern:    
    - **event** - (*Event*) natives Maus-Event
    - **node** -  (*HTMLElement*) das Element
- **global** - (*boolean*) gibt an, ob Mausereignisse auf der gesamten Seite (*true*) oder nur innerhalb des Gantt-Elements (*false*) überwacht werden. Standard ist *false*.

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

Fügt einen Tooltip für ein bestimmtes Gantt-Element hinzu. Dies ist eine einfachere Version von **attach()**. Es nimmt ein Objekt mit den Tooltip-Details entgegen:

- **selector** - (*string*) CSS-Selektor des Gantt-Elements, dem ein Tooltip hinzugefügt werden soll
- **html** - (*function*) eine Template-Funktion für den Tooltip, die folgende Parameter erhält:
    - **event** - (*Event*) natives Maus-Event
    - **node** -  (*HTMLElement*) das Element
  und gibt einen String mit dem Tooltip-HTML zurück
- **global** - (*boolean*) optional, gibt an, ob auf der gesamten Seite (*true*) oder nur innerhalb von Gantt (*false*) überwacht werden soll. Standard ist *false*. 

#### gantt.ext.tooltips.detach() {#detach} 

Entfernt einen Tooltip. Erwartet:

- **selector** - (*string*) CSS-Selektor des Gantt-Elements


## Tooltips für verschiedene Elemente


Standardmäßig werden Tooltips nur zu Gantt-Aufgaben hinzugefügt, sie können aber auch auf andere Gantt-Elemente angewendet werden, wie z. B. einen Ressourcenmarker:

![Resource marker tooltip](/img/resource_marker_tooltip.png)


Zwei Methoden aus der [Tooltip-API](#tooltipapi) sind hierfür nützlich:

- die Methode [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) 

Zum Beispiel, um Tooltips für Zellen der Zeitskala hinzuzufügen:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

Denken Sie daran, [gantt.ext.tooltips.tooltipFor()](#tooltipfor) aufzurufen, nachdem Gantt initialisiert wurde. Zum Beispiel im [onGanttReady](api/event/onganttready.md)-Event-Handler:

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


Oder so:

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

**Related example:** [Gantt. Custom tooltips for cells](https://snippet.dhtmlx.com/6kb5gm39)

So hinzugefügte Tooltips folgen dem Mauszeiger und berücksichtigen Einstellungen wie *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)* und *[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)*.

- die Methode [**gantt.ext.tooltips.attach()**](#attach) 

Mit dieser Methode können Sie Tooltips mit detaillierterer Konfiguration hinzufügen, um das Verhalten beim Bewegen der Maus besser zu steuern.


## Anpassung des Tooltip-Verhaltens


Sie können das Standardverhalten des Tooltips ändern, indem Sie den eingebauten Handler entfernen und Ihren eigenen hinzufügen:

- Entfernen Sie den Standard-Tooltip-Handler von Aufgaben mit [**gantt.ext.tooltips.detach**](#detach):

~~~js
// Entfernt den eingebauten Tooltip-Handler von Aufgaben
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- Fügen Sie Ihr eigenes Tooltip-Verhalten mit [**gantt.ext.tooltips.attach()**](#attach) hinzu. Zum Beispiel, um Tooltips nur über der Tabelle anzuzeigen:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event: MouseEvent) => {
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


Die Zeitspanne für das Anzeigen und Ausblenden von Tooltips kann über die entsprechenden Einstellungen angepasst werden.

Um festzulegen, wie lange (in Millisekunden) es dauert, bis ein Tooltip für eine Aufgabe erscheint, verwenden Sie [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


Um zu steuern, wie lange (in Millisekunden) ein Tooltip sichtbar bleibt, nachdem der Cursor weggegangen ist, verwenden Sie [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~


## Position


Sie können die Position des Tooltips anpassen, indem Sie die horizontalen und vertikalen Offsets über diese Konfigurationseigenschaften ändern:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - legt den horizontalen Offset fest
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - legt den vertikalen Offset fest

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~


## Anzeigebereich


Vor Version 6.1 wurden Tooltips nur im Bereich der Zeitleiste angezeigt. Seit v6.1 können Tooltips überall erscheinen und folgen dem Mauszeiger.

Wenn Sie das frühere Verhalten wiederherstellen möchten, verwenden Sie diesen Code vor der Initialisierung von Gantt:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

