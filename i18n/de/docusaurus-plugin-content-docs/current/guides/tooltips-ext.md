---
title: "Tooltips-Erweiterung"
sidebar_label: "Tooltips-Erweiterung"
---

# Tooltips-Erweiterung

Weitere Informationen zur Tooltips-Erweiterung finden Sie im Artikel [Tooltips for Gantt Elements](guides/tooltips.md).

## Tooltip-Objekt

Auf das Tooltip-Objekt kann über **gantt.ext.tooltips.tooltip** zugegriffen werden. Es stellt Methoden zur Verfügung, um die Position, den Inhalt und die Sichtbarkeit des Tooltips zu steuern:

- <span class="submethod">**getNode (): HTMLElement**</span> - gibt das HTML-Element des Tooltips zurück  
- <span class="submethod">**setViewport (node): object**</span> - beschränkt die Position des Tooltips auf die Grenzen eines angegebenen HTML-Elements  
    - **_node_** - (*HTMLElement*) - das HTML-Element, innerhalb dessen der Tooltip begrenzt werden soll  
- <span class="submethod">**show (config, top): object**</span> - zeigt den Tooltip an den angegebenen Koordinaten (relativ zu document.body) an. Diese Methode akzeptiert verschiedene Parameter, abhängig von der gewünschten Position. Um den Tooltip an bestimmten Koordinaten anzuzeigen, geben Sie x- und y-Werte an. Um ihn an der Position eines Maus-Events anzuzeigen, übergeben Sie das Event-Objekt. Die Einstellungen für *tooltip_offset_x/y* und Viewport werden automatisch angewendet.  
    - **_config?_** - (*number | Event*) - die x-Koordinate oder das Maus-Event-Objekt  
    - **_top?_** - (*number*) - die y-Koordinate  
- <span class="submethod">**hide (): object**</span> - blendet den Tooltip aus  
- <span class="submethod">**setContent (html): object**</span> - setzt den HTML-Inhalt des Tooltips  
    - **_html_** - (*string*) - HTML-String, der im Tooltip angezeigt wird  

## Methoden

Es stehen mehrere Methoden zur Verfügung, um das Verhalten des Tooltips beim Überfahren von DOM-Elementen mit der Maus zu steuern.

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - fügt einen Tooltip mit detaillierter Konfiguration hinzu. Diese Methode akzeptiert einen Parameter:  
    - **_config_** - (*object*) - Konfigurationsobjekt für den Tooltip, einschließlich:  
        - **_selector_** - (*string*) - CSS-Selector für die Elemente, auf denen Mausereignisse verfolgt werden sollen  
        - **_onmouseenter_** - (*Function*): void - wird aufgerufen, wenn die Maus das Element betritt, mit folgenden Parametern:  
            - **_event_** - (*MouseEvent*) - natives Maus-Event  
            - **_node_** - (*HTMLElement*) - das Ziel-HTML-Element  
        - **_onmousemove?_** - (*Function*): void - optional, wird aufgerufen, wenn sich die Maus im Element bewegt, mit folgenden Parametern:  
            - **_event_** - (*MouseEvent*) - natives Maus-Event  
            - **_node_** - (*HTMLElement*) - das Ziel-HTML-Element  
        - **_onmouseleave_** - (*Function*): void - wird aufgerufen, wenn die Maus das Element verlässt, mit folgenden Parametern:  
            - **_event_** - (*MouseEvent*) - natives Maus-Event  
            - **_node_** - (*HTMLElement*) - das Ziel-HTML-Element  
        - **_global?_** - (*boolean*) - optional, wenn true, werden Mausereignisse auf der gesamten Seite verfolgt; wenn false, nur innerhalb des Gantt-Elements. Standardmäßig *false*.  
  
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

- <span class="submethod">**tooltipFor (config): void**</span> - fügt einem bestimmten Gantt-Element einen Tooltip hinzu. Dies ist eine vereinfachte Alternative zu **attach()**. Die Methode akzeptiert einen Parameter:  
    - **_config_** - (*object*) - Konfigurationsobjekt, einschließlich:  
        - **_selector_** - (*string*) - CSS-Selector für das Gantt-Element, an das der Tooltip angehängt werden soll  
        - **_html_** - (*Function*): HTMLElement | string | number | void - eine Funktion, die den Tooltip-Inhalt zurückgibt. Sie erhält:  
            - **_event_** - (*Event*) - natives Maus-Event  
            - **_node_** - (*HTMLElement*) - das HTML-Element und gibt einen String mit dem Tooltip-Inhalt zurück  
        - **_global?_** - (*boolean*) - optional, wenn true, wird auf der ganzen Seite gelauscht; wenn false, nur innerhalb des Gantt-Elements. Standardmäßig *false*.  
  
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

- <span class="submethod">**detach (selector): void**</span> - entfernt den Tooltip für das angegebene Element. Die Methode nimmt einen Parameter entgegen:  
    - **_selector_** - (*string*) - CSS-Selector des Gantt-Elements
