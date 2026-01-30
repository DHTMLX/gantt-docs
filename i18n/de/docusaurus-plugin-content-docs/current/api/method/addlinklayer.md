---
sidebar_label: addLinkLayer
title: addLinkLayer method
description: "zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für Links im Timeline-Bereich an"
---

# addLinkLayer
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für Links im Timeline-Bereich an

@signature: addLinkLayer: (func: AdditionalLinkLayer['LinkLayerRender'] | AdditionalLinkLayer['LinkLayerConfig']) =\> string

### Parameters

- `func` - (required) *LinkLayerRender | LinkLayerConfig* -         eine Renderfunktion oder ein Konfigurationsobjekt

### Returns
- ` layerId` - (string) - ein DOM-Element, das die Ebene repräsentiert, die angezeigt wird

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

- **linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void** - eine Funktion, die ein Link-Objekt erhält und ein DOM-Element zurückgibt, das in der Ebene angezeigt wird.
    - **_link_** - (*Link*) - das Link-Objekt
    - **_timeline?_** - (*any*) - optional, die Timeline-Ansicht
    - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
    - **_viewport?_** - (*LayerViewport*) - optional, das Viewport-Objekt


- **linkLayerConfig** - (*object*) - Konfigurationsobjekt für die zusätzliche Link-Ebene mit folgenden Eigenschaften:
    - **_id?_** - (*string | number*) - optional, die Layer-ID
    - **_renderer_** - (*object*) - erforderlich, ein Objekt, das für das Rendern der Layer-Elemente zuständig ist
        - **_render_** - (*LinkLayerRender*) - Funktion, die das zu rendernde HTML-Element zurückgibt
        - **_update?_** - (*Function*): void - optional, eine Funktion zum Aktualisieren der gerenderten HTML-Elemente
            - **_link_** - (*Link*) - das Link-Objekt
            - **_node_** - (*HTMLElement*) - Container des gerenderten Knotens
            - **_timeline?_** - (*any*) - optional, die Timeline-Ansicht
            - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
            - **_viewport?_** - (*LayerViewport*) - optional, das Viewport-Objekt
        - **_onrender?_** - (*Function*): void - optional, wird nach Abschluss des Renderns aufgerufen, nützlich zum Rendern nativer Komponenten (z.B. mit `ReactDOM.render`)
            - **_link_** - (*Link*) - das Link-Objekt
            - **_node_** - (*HTMLElement*) - Container des gerenderten Knotens
            - **_view?_** - (*any*) - optional, die Layout-Zelle, in der die Ebene hinzugefügt wird (Standard: timeline)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - optional, gibt die Koordinaten des Viewport-Rechtecks zurück
            - **_link_** - (*Link*) - das Link-Objekt
            - **_view?_** - (*any*) - optional, die Layout-Zelle, in der die Ebene hinzugefügt wird (Standard: timeline)
            - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
            - **_gantt?_** - (*GanttStatic*) - optional, die Gantt-Instanz
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - optional, gibt das sichtbare Bereichsobjekt zurück
            - **_gantt?_** - (*GanttStatic*) - optional, die Gantt-Instanz
            - **_view?_** - (*any*) - optional, die Layout-Zelle, in der die Ebene hinzugefügt wird (Standard: timeline)
            - **_config?_** - (*GanttConfigOptions*) - optional, das Gantt-Konfigurationsobjekt
            - **_datastore?_** - (*any*) - optional, das Link-Datastore-Objekt
            - **_viewport?_** - (*LayerViewport*) - optional, das Viewport-Objekt
    - **_container?_** - (*HTMLElement*) - optional, das Container-Element für die Ebene
    - **_topmost?_** - (*boolean*) - optional, wenn true, erscheint das Layer-Element über dem Link
    - **_filter?_** - (*Function*): boolean - optional, eine Funktion, die ein Link-Objekt erhält und false zurückgibt, um das Rendern für diesen Link zu überspringen
        - **_link_** - (*Link*) - das Link-Objekt


- Beachten Sie, dass benutzerdefinierte Layer nach erneutem Aufruf von [init](api/method/init.md) gelöscht werden  
- Außerdem setzt ein Aufruf von [gantt.resetLayout()](api/method/resetlayout.md) benutzerdefinierte Layer zurück. Um sie sichtbar zu halten, müssen Sie **gantt.addLinkLayer** nach dem Aufruf von [resetLayout](api/method/resetlayout.md) erneut anwenden.

:::note
Sample: [Gantt. Zusätzliche Ebene mit Link-Typen](https://snippet.dhtmlx.com/6mmt1nvw) 
:::

### Related API
- [removeLinkLayer](api/method/removelinklayer.md)
- [addTaskLayer](api/method/addtasklayer.md)

