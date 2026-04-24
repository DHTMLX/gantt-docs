---
title: "Tooltips-Erweiterung"
sidebar_label: "Tooltips-Erweiterung"
---

# Tooltips-Erweiterung

Details zur Tooltips-Erweiterung finden Sie im Artikel [Tooltips für Gantt-Elemente](guides/tooltips.md).

## Tooltip-Objekt

Sie können auf das Tooltip-Objekt als **gantt.ext.tooltips.tooltip** zugreifen. Dieses Objekt ermöglicht das Manipulieren der Position, des Inhalts und der Sichtbarkeit des Tooltips über eine Reihe von Methoden:

- <span class="submethod">**getNode (): HTMLElement**</span> - gibt das HTML-Element des Tooltips zurück  
- <span class="submethod">**setViewport (node): object**</span> - fixiert die Position des Tooltips an die Grenzen des angegebenen HTML-Elements
    - **_node_** - (*HTMLElement*) - das HTML-Element, dessen Grenzen der Tooltip beachten soll
- <span class="submethod">**show (config, top): object**</span> - zeigt den Tooltip an bestimmten Koordinaten (relativ zu document.body). Die Methode kann je nach gewünschter Position unterschiedliche Parameter entgegennehmen. Um den Tooltip an bestimmten Koordinaten (relativ zu document.body) anzuzeigen, übergeben Sie x,y-Koordinaten. Um den Tooltip an Koordinaten des Mausereignisses anzuzeigen, übergeben Sie das Event-Objekt. Der *tooltip_offset_x/y* und das Viewport werden berücksichtigt.
    - **_config?_** - (*number | Event*) - die X-Koordinate oder das Maus-Ereignisobjekt
    - **_top?_** - (*number*) - die Y-Koordinate 
- <span class="submethod">**hide (): object**</span> - versteckt das Tooltip-Element
- <span class="submethod">**setContent (html): object**</span> - fügt dem Tooltip HTML-Inhalt hinzu. Als Parameter gilt:
    - **_html_** - (*string*) - ein String mit HTML-Inhalt für den Tooltip

## Methoden

Es gibt mehrere Methoden, die das Verhalten des Tooltips beim Überfahren von DOM-Elementen steuern lassen.

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - fügt Tooltip mit erweiterter Konfiguration hinzu. Die Methode nimmt einen Parameter entgegen:
    - **_config_** - (*object*) - ein Objekt mit den Tooltip-Einstellungen. Die Einstellungen sind:
        - **_selector_** - (*string*) - definiert den CSS-Selektor für die Elemente, auf die Mausereignisse lauschen
        - **_onmouseenter_** - (*Function*): void - ein Handler, der aufgerufen wird, wenn der Mauszeiger in das Element eintritt. Die Parameter sind:
            - **_event_** - (*MouseEvent*) - ein natives Maus-Ereignis
            - **_node_** -  (*HTMLElement*) - der HTML-Knoten
        - **_onmousemove?_** - (*Function*): void - optional, ein Handler, der aufgerufen wird, wenn sich der Mauszeiger innerhalb des Elements bewegt. Die Parameter sind:
            - **_event_** - (*MouseEvent*) - ein natives Maus-Ereignis
            - **_node_** -  (*HTMLElement*) - der HTML-Knoten
        - **_onmouseleave_** - (*Function*): void - ein Handler, der aufgerufen wird, wenn der Mauszeiger das Element verlässt. Die Parameter sind:    
            - **_event_** - (*MouseEvent*) - ein natives Maus-Ereignis
            - **_node_** -  (*HTMLElement*) - der HTML-Knoten
        - **_global?_** - (*boolean*) - optional, bestimmt, ob das Modul Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb eines Gantt-Elements (*false*) hört. Standardmäßig ist die Option auf *false* gesetzt.
  
~~~js
gantt.ext.tooltips.attach({
    selector: ".gantt_task_cell",
    onmouseenter: function (e, node) {
        const id = node.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);

        if (typeof task.text == "string") {
            gantt.ext.tooltips.tooltip.setContent(task.text);
            gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
        }
    },
    onmousemove: function (e, node) {
        gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
    },
    onmouseleave: function (e, node) {
        gantt.ext.tooltips.tooltip.hide()
    },
})
~~~

### gantt.ext.tooltips.tooltipFor()

- <span class="submethod">**tooltipFor (config): void**</span> - fügt dem angegebenen Gantt-Element einen Tooltip hinzu. Es handelt sich um eine vereinfachte Version der Methode **attach()**. Die Methode nimmt einen Parameter entgegen:
    - **_config_** - (*object*) - ein Objekt mit den Tooltip-Einstellungen. Die Einstellungen sind:
        - **_selector_** - (*string*) - ein CSS-Selektor des Gantt-Elements, dem der Tooltip hinzugefügt werden soll
        - **_html_** - (*Function*): HTMLElement | string | number | void - eine Vorlage für den Tooltip. Die Vorlagenfunktion nimmt der Reihe nach zwei Parameter entgegen:
            - **_event_** - (*Event*) - ein natives Maus-Ereignis
            - **_node_** -  (*HTMLElement*) - der HTML-Knoten und gibt eine Zeichenfolge mit einer Vorlage zurück
        - **_global?_** - (*boolean*) - optional, bestimmt, ob das Modul Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb eines Gantt-Elements (*false*) hört. Standardmäßig ist die Option auf *false* gesetzt. 
  
~~~js
gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: function (e, domElement) {
        const id = domElement.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~  

### gantt.ext.tooltips.detach()

- <span class="submethod">**detach (selector): void**</span> - entfernt Tooltip. Als Parameter nimmt die Methode Folgendes entgegen:
    - **_selector_** - (*string*) - der CSS-Selektor eines Gantt-Elements