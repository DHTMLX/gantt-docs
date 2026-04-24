---
sidebar_label: addLinkLayer
title: addLinkLayer Methode
description: "zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für einen Link im Timeline-Bereich"
---

# addLinkLayer

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für einen Link im Timeline-Bereich

@signature: addLinkLayer: (func: AdditionalLinkLayer['LinkLayerRender'] | AdditionalLinkLayer['LinkLayerConfig']) =\> string

### Parameters

- `func` - (required) *LinkLayerRender | LinkLayerConfig* -         eine Renderfunktion oder ein Konfigurationsobjekt

### Returns
- ` layerId` - (string) - ein DOM-Element, das in der Ebene angezeigt wird

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function () {
    const link_types = ["FS", "SS", "FF", "SF"]
    gantt.addLinkLayer(function (link) {
        const node = gantt.getLinkNode(link.id);
        if (node){
            const el = document.createElement('div');
            el.className = 'link_layer';
            el.style.left = (node.childNodes[2].offsetLeft + 20) + 'px'
            el.style.top = (node.childNodes[2].offsetTop - 6) + 'px'
            el.innerHTML = link_types[link.type];
            return el;
        }
        return false;
    });
});
~~~

### Details

Das Argument kann einer der folgenden Typen sein:

- **linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void**- eine Funktion, die das Link-Objekt als Parameter nimmt und ein DOM-Element zurückgeben muss, das in der Ebene angezeigt wird.
    - **_link_** - (*Link*) - das Link-Objekt
    - **_timeline?_** - (*any*) - optional, die Timeline-Ansicht
    - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
    - **_viewport?_** - (*LayerViewport*) - optional, das Viewport-Objekt


- **linkLayerConfig** - (*object*) - das Konfigurationsobjekt für die zusätzliche Link-Ebene. Enthält die folgenden Eigenschaften:
    - **_id?_** - (*string | number*) - optional, die Layer-ID
    - **_renderer_** - (*object*) - obligatorisch, eine Funktion zur Renderierung der Layer-Elemente
        - **_render_** - (*LinkLayerRender*) - die Funktion, die das HTML-Element zurückgibt, das gerendert werden soll
        - **_update?_** - (*Function*): void - optional, eine Funktion, mit der Sie die gerenderten HTML-Elemente aktualisieren können
            - **_link_** - (*Link*) - das Link-Objekt
            - **_node_** - (*HTMLElement*) - der Container des gerenderten Knotens
            - **_timeline?_** - (*any*) - optional, die Timeline-Ansicht
            - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
            - **_viewport?_** - (*LayerViewport*) - optional, das Viewport-Objekt
        - **_onrender?_** - (*Function*): void - optional, diese Funktion wird nach Abschluss des Renderings aufgerufen. Sie können sie verwenden, um native Komponenten zu rendern (zum Beispiel mit der `ReactDOM.render`-Methode)
            - **_link_** - (*Link*) - das Link-Objekt
            - **_node_** - (*HTMLElement*) - der Container des gerenderten Knotens
            - **_view?_** - (*any*) - optional, die Layout-Zelle, in der die Ebene hinzugefügt wird (Timeline, standardmäßig)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - optional, eine Funktion, die die Koordinaten des Viewport-Rechtecks zurückgibt
            - **_link_** - (*Link*) - das Link-Objekt
            - **_view?_** - (*any*) - optional, die Layout-Zelle, in der die Ebene hinzugefügt wird (Timeline, standardmäßig)
            - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
            - **_gantt?_** - (*GanttStatic*) - optional, das Gantt-Objekt
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - eine Funktion, die das Objekt des sichtbaren Bereichs zurückgibt
            - **_gantt?_** - (*GanttStatic*) - optional, das Gantt-Objekt
            - **_view?_** - (*any*) - optional, die Layout-Zelle, in der die Ebene hinzugefügt wird (Timeline, standardmäßig)
            - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
            - **_datastore?_** - (*any*) - optional, der Link-Datenspeicher-Objekt
            - **_viewport?_** - (*LayerViewport*) - optional, das Viewport-Objekt
    - **_container?_** - (*HTMLElement*) - optional, der Layer-Container
    - **_topmost?_** - (*boolean*) - optional, falls true, wird das Element über dem Link angezeigt
    - **_filter?_** - (*Function*): boolean - optional, eine Funktion, die ein Link-Objekt als Parameter nimmt. Wenn sie 'false' zurückgibt, wird die 'renderer'-Funktion für einen Link nicht aufgerufen
        - **_link_** - (*Link*) - das Link-Objekt


- Beachten Sie, dass benutzerdefinierte Layer nach dem nächsten Aufruf von gantt.init zurückgesetzt werden
- Aufruf der [gantt.resetLayout()](api/method/resetlayout.md)-Methode setzt ebenfalls benutzerdefinierte Layer zurück. Damit benutzerdefinierte Layer auf einer Seite angezeigt werden, müssen Sie nach dem Aufruf von [gantt.resetLayout()](api/method/resetlayout.md) die Methode **gantt.addLinkLayer** erneut definieren.

:::note
sample: [Gantt. Zusätzliche Ebene mit Linktypen](https://snippet.dhtmlx.com/6mmt1nvw)
::: 

### Related API
- [removeLinkLayer](api/method/removelinklayer.md)
- [addTaskLayer](api/method/addtasklayer.md)