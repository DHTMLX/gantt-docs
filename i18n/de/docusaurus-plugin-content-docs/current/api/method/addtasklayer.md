---
sidebar_label: addTaskLayer
title: addTaskLayer Methode
description: "Zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für eine Aufgabe im Timeline-Bereich an"
---

# addTaskLayer

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für eine Aufgabe im Timeline-Bereich an

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (erforderlich) *TaskLayerRender | TaskLayerConfig* - eine Render-Funktion oder ein Config-Objekt

### Returns
- ` layerId` - (string) - ein DOM-Element, das in der Ebene angezeigt wird

### Example

~~~jsx
gantt.init("gantt_here");

gantt.addTaskLayer((task) => {
  if (task.deadline) {
    const el = document.createElement("div");
    el.className = "deadline";

    const sizes = gantt.getTaskPosition(task, task.deadline);
    el.style.left = `${sizes.left}px`;
    el.style.top = `${sizes.top}px`;

    el.setAttribute("title", gantt.templates.task_date(task.deadline));
    return el;
  }
  return false;
});
~~~

### Details

Das Argument kann einer der folgenden Typen sein:

- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - eine Funktion, die ein Task-Objekt als Parameter übernimmt und ein DOM-Element zurückgeben muss, das in der Ebene angezeigt wird.
    - **_task_** - (*Task*) - das Task-Objekt
    - **_timeline?_** - (*any*) - die Timeline-Ansicht
    - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
    - **_viewport?_** - (*LayerViewport*) - das Viewport-Objekt

- **taskLayerConfig** - (*object*) - das Konfigurationsobjekt für die zusätzliche Task-Ebene. Hat die folgenden Eigenschaften:
    - **_id?_** - (*string | number*) - optional, die Layer-ID
    - **_renderer_** - (*object*) - mandatory, eine Funktion, die die Elemente der Ebene rendert
        - **_render_** - (*TaskLayerRender*) - die Funktion, die das HTML-Element zurückgibt, das gerendert werden soll
        - **_update?_** - (*Function*): void - optional, eine Funktion, in der Sie die gerenderten HTML-Elemente aktualisieren können
            - **_task_** - (*Task*) - das Task-Objekt
            - **_node_** - (*HTMLElement*) - der Container des gerenderten Knotens
            - **_timeline?_** - (*any*) - die Timeline-Ansicht
            - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
            - **_viewport?_** - (*LayerViewport*) - das Viewport-Objekt
        - **_onrender?_** - (*Function*): void - optional, diese Funktion wird aufgerufen, nachdem das Rendering abgeschlossen ist. Sie können sie verwenden, um native Komponenten (zum Beispiel mittels der `ReactDOM.render`-Methode) zu rendern
            - **_task_** - (*Task*) - das Task-Objekt
            - **_node_** - (*HTMLElement*) - der Container des gerenderten Knotens
            - **_view?_** - (*any*) - der Layout-Zelle, in der die Ebene hinzugefügt wird (Timeline, standardmäßig)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - optional, eine Funktion, die die Koordinaten des Viewport-Rechtecks zurückgibt
            - **_task_** - (*Task*) - das Task-Objekt
            - **_view?_** - (*any*) - die Layout-Zelle, in der die Ebene hinzugefügt wird (Timeline, standardmäßig)
            - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
            - **_gantt?_** - (*GanttStatic*) - das Gantt-Objekt
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - eine Funktion, die das Objekt mit dem sichtbaren Bereich zurückgibt
            - **_gantt?_** - (*GanttStatic*) - das Gantt-Objekt
            - **_view?_** - (*any*) - die Layout-Zelle, in der die Ebene hinzugefügt wird (Timeline, standardmäßig)
            - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
            - **_datastore?_** - (*any*) - das Task-Datenspeicherobjekt
            - **_viewport?_** - (*LayerViewport*) - das Viewport-Objekt
    - **_container?_** - (*HTMLElement*) - optional, der Container des Layers
    - **_topmost?_** - (*boolean*) - optional, falls true, wird das Element über der Aufgabe angezeigt
    - **_filter?_** - (*Function*): boolean - optional, eine Funktion, die ein Task-Objekt als Parameter entgegennimmt. Gibt sie 'false' zurück, wird die 'renderer'-Funktion für eine Aufgabe nicht aufgerufen
        - **_task_** - (*Task*) - das Task-Objekt

  
Das Layer-Viewport-Objekt beinhaltet folgende Eigenschaften:

- **viewport** -  (*object*) - das Layer-Viewport-Objekt
    - **_x_** - (*number*) - die linke Position des Rechtecks
    - **_x_end_** - (*number*) - die rechte Position des Rechtecks
    - **_y_** - (*number*) - die obere Position des Rechtecks
    - **_y_end_** - (*number*) - die untere Position des Rechtecks
    - **_width_** - (*number*) - die Breite des Rechtecks
    - **_height_** - (*number*) - die Höhe des Rechtecks

- Beachte, dass benutzerdefinierte Layer nach dem nächsten Aufruf von [gantt.init](api/method/init.md) gelöscht werden.
- Außerdem setzt ein Aufruf von [gantt.resetLayout()](api/method/resetlayout.md) benutzerdefinierte Layer zurück. Um benutzerdefinierte Layer sichtbar zu halten, muss **gantt.addTaskLayer** nach dem Aufruf von [resetLayout](api/method/resetlayout.md) neu definiert werden.

## Smart rendering for custom layers

Intelligentes Rendering für benutzerdefinierte Layer

Bei [benutzerdefinierten Layern](guides/baselines.md) weiß Gantt jedoch nicht automatisch, wo sich benutzerdefinierte Elemente befinden, da deren Rendering-Logik vollständig vom Benutzer gesteuert wird.

Allerdings weiß Gantt im Fall von [custom layers](guides/baselines.md) nicht, wo sich benutzerdefinierte Elemente befinden, da dies vollständig von der Implementierung der benutzerdefinierten Render-Funktion abhängt.

Als Lösung geht Smart Rendering davon aus, dass sich ein benutzerdefiniertes Element in derselben Zeile befindet wie seine zugehörige Aufgabe. Benutzerdefinierte Elemente werden dem Seiten-Markup hinzugefügt, wenn die Zeilen der zugehörigen Aufgaben auf dem Bildschirm gerendert werden. In diesem Modus berücksichtigt Gantt die Position der horizontalen Bildlaufleiste nicht; ein benutzerdefiniertes Element wird im Markup gerendert, ist aber aufgrund des horizontalen Scrollens nicht sichtbar.

Meistens reicht das aus, aber wenn Sie viele Layer haben, möchten Sie das Rendering möglicherweise noch weiter optimieren, indem Sie Gantt Informationen über die Position der benutzerdefinierten Elemente bereitstellen.

Dazu verwenden Sie den *object*-Parameter der Methode *addTaskLayer()* und übergeben dem **renderer**-Objekt diese Methoden:

- **render** - eine Render-Funktion
- **getRectangle** - eine Funktion, die ein Objekt mit den Koordinaten der benutzerdefinierten Elemente zurückgibt

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    getRectangle: (task, view) => {
      // ...
      return { left, top, height, width };
    }
  }
});
~~~

### Rendering visible parts of custom elements

Das **renderer**-Objekt der *addTaskLayer()*-Methode bietet die Möglichkeit, das Markup des Knotens eines benutzerdefinierten Elements zu aktualisieren und den sichtbaren Inhalt im aktuellen Viewport über die **update**-Methode anzuzeigen:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    update: (task, node, timeline, viewport) => {
      // ...
      // den aktuell sichtbaren Teil des Elements in das inner HTML von node einsetzen
    },
    getRectangle: (task, view) => {
      // ...
      return { left, top, height, width };
    }
  }
});
~~~

- **update** - ermöglicht das Aktualisieren des inneren HTML eines benutzerdefinierten Elements, z. B. das Verbergen von Zellen, die nicht sichtbar sind, und das Anzeigen der sichtbaren

The **update**-Methode wird nach dem [onGanttScroll](api/event/onganttscroll.md)-Ereignis aufgerufen. Sie liefert einen Task-Knoten (ursprünglich vom **render**-Verfahren erzeugt) und ein aktuelles Viewport.

## Rendering sichtbarer Aufgabenzeilen

Seit Version v7.1.8 erlaubt das **renderer**-Objekt der *addTaskLayer()*-Methode das Abrufen eines sichtbaren Bereichs der Aufgabenzeilen mit der **getVisibleRange**-Funktion:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    getVisibleRange: () => {
      // ...
      return {
        start: indexStart,
        end: indexEnd
      };
    }
  }
});     
~~~

- **getVisibleRange** - gibt ein Objekt mit Start- und Endindex der sichtbaren Task-Zeilen zurück. Tasks außerhalb dieses Bereichs erhalten keine zusätzlichen Layer.

Wenn die **getVisibleRange**-Funktion statt eines Objekts *false* zurückgibt, geht Gantt davon aus, dass der gesamte Aufgabenbereich genutzt wird, und eine zusätzliche Ebene wird gerendert, auch wenn eine Aufgabe nicht sichtbar ist.

## Element render callback

The **renderer** object of the *addTaskLayer()* method provides the **onrender** callback:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    onrender: (item, node, view) => {
      console.log("render", item, node);
    }
  }
});
~~~

Die **onrender**-Funktion wird aufgerufen, wann immer das Datenobjekt des Layers in das DOM gerendert wird. Die Argumente geben Ihnen Zugriff auf das gerenderte Datenobjekt, das resultierende DOM-Element und das View-Objekt, das das Rendern aufgerufen hat (grid oder timeline).

Der Callback kann verwendet werden, um DOM-Elemente nach dem Rendern zu modifizieren oder Drittanbieter-Widgets in den gerenderten Elementen zu initialisieren.

### Related API
- [getTaskPosition](api/method/gettaskposition.md)
- [removeTaskLayer](api/method/removetasklayer.md)
- [layer_attribute](api/config/layer_attribute.md)

### Related Guides
- [Custom Elements in Timeline Area](guides/baselines.md)
- [How-tos (read how to vertically reorder tasks in the timeline)](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline)