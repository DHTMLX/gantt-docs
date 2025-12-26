---
sidebar_label: addTaskLayer
title: addTaskLayer method
description: "zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für Tasks im Timeline-Bereich an"
---

# addTaskLayer
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Zeigt eine zusätzliche Ebene mit benutzerdefinierten Elementen für Tasks im Timeline-Bereich an

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (required) *TaskLayerRender | TaskLayerConfig* -         eine Rendering-Funktion oder ein Konfigurationsobjekt

### Returns
- ` layerId` - (string) - ein DOM-Element, das in der Ebene angezeigt wird

### Example

~~~jsx
gantt.init("gantt_here");
gantt.addTaskLayer(function draw_deadline(task) {
    if (task.deadline) {
        var el = document.createElement('div');
        el.className = 'deadline';
        var sizes = gantt.getTaskPosition(task, task.deadline);

        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';

        el.setAttribute('title', gantt.templates.task_date(task.deadline));
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Das Argument kann einer der folgenden Typen sein:


- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - eine Funktion, die ein Task-Objekt erhält und ein DOM-Element zurückgibt, das in der Ebene angezeigt wird.
    - **_task_** - (*Task*) - das Task-Objekt
    - **_timeline?_** - (*any*) - die Timeline-Ansicht
    - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
    - **_viewport?_** - (*LayerViewport*) - das Viewport-Objekt

- **taskLayerConfig** - (*object*) - ein Konfigurationsobjekt für die zusätzliche Task-Ebene, welches Folgendes beinhaltet:
    - **_id?_** - (*string | number*) - optionale Layer-ID
    - **_renderer_** - (*object*) - erforderlich, ein Objekt, das für das Rendering der Elemente der Ebene verantwortlich ist
        - **_render_** - (*TaskLayerRender*) - eine Funktion, die das HTML-Element zum Rendern zurückgibt
        - **_update?_** - (*Function*): void - optional, eine Funktion zur Aktualisierung der gerenderten HTML-Elemente
            - **_task_** - (*Task*) - das Task-Objekt
            - **_node_** - (*HTMLElement*) - Container des gerenderten Nodes
            - **_timeline?_** - (*any*) - die Timeline-Ansicht
            - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
            - **_viewport?_** - (*LayerViewport*) - das Viewport-Objekt
        - **_onrender?_** - (*Function*): void - optional, wird nach dem Rendering aufgerufen, nützlich für das Rendern nativer Komponenten (z.B. mit `ReactDOM.render`)
            - **_task_** - (*Task*) - das Task-Objekt
            - **_node_** - (*HTMLElement*) - Container des gerenderten Nodes
            - **_view?_** - (*any*) - die Layout-Zelle, in der die Ebene hinzugefügt wird (Standard ist timeline)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - optional, gibt die Koordinaten des Viewport-Rechtecks zurück
            - **_task_** - (*Task*) - das Task-Objekt
            - **_view?_** - (*any*) - die Layout-Zelle, in der die Ebene hinzugefügt wird (Standard ist timeline)
            - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
            - **_gantt?_** - (*GanttStatic*) - das Gantt-Objekt
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - optional, gibt den sichtbaren Bereich zurück
            - **_gantt?_** - (*GanttStatic*) - das Gantt-Objekt
            - **_view?_** - (*any*) - die Layout-Zelle, in der die Ebene hinzugefügt wird (Standard ist timeline)
            - **_config?_** - (*GanttConfigOptions*) - das Gantt-Konfigurationsobjekt
            - **_datastore?_** - (*any*) - das Task-Datastore-Objekt
            - **_viewport?_** - (*LayerViewport*) - das Viewport-Objekt
    - **_container?_** - (*HTMLElement*) - optionales Container-Element für die Ebene
    - **_topmost?_** - (*boolean*) - optional, wenn true, erscheint das Element über dem Task
    - **_filter?_** - (*Function*): boolean - optional, eine Funktion, die ein Task-Objekt erhält und false zurückgibt, um das Rendering für diesen Task zu überspringen
        - **_task_** - (*Task*) - das Task-Objekt

  
Das Layer-Viewport-Objekt beinhaltet folgende Eigenschaften:

- **viewport** -  (*object*) - das Viewport-Objekt für die Ebene
    - **_x_** - (*number*) - linke Position des Rechtecks
    - **_x_end_** - (*number*) - rechte Position des Rechtecks
    - **_y_** - (*number*) - obere Position des Rechtecks
    - **_y_end_** - (*number*) - untere Position des Rechtecks
    - **_width_** - (*number*) - Breite des Rechtecks
    - **_height_** - (*number*) - Höhe des Rechtecks


- Beachte, dass benutzerdefinierte Layer nach dem nächsten Aufruf von [gantt.init](api/method/init.md) gelöscht werden.
- Außerdem setzt ein Aufruf von [gantt.resetLayout()](api/method/resetlayout.md) benutzerdefinierte Layer zurück. Um benutzerdefinierte Layer sichtbar zu halten, muss **gantt.addTaskLayer** nach dem Aufruf von [resetLayout](api/method/resetlayout.md) neu definiert werden.

## Smart Rendering für benutzerdefinierte Layer

[Smart rendering](guides/performance.md#smartrendering) zielt darauf ab, nur diejenigen HTML-Elemente anzuzeigen, die für den Benutzer sichtbar sind, und solche zu vermeiden, die hinter Scrollbars verborgen sind.

Bei [benutzerdefinierten Layern](guides/baselines.md) weiß Gantt jedoch nicht automatisch, wo sich benutzerdefinierte Elemente befinden, da deren Rendering-Logik vollständig vom Benutzer gesteuert wird.

Um dies zu lösen, geht smart rendering davon aus, dass sich ein benutzerdefiniertes Element in derselben Zeile befindet wie der zugehörige Task. Benutzerdefinierte Elemente werden nur dann dem DOM hinzugefügt, wenn die Zeilen ihrer Tasks auf dem Bildschirm sichtbar sind. Dabei ignoriert Gantt die horizontale Scroll-Position, sodass ein benutzerdefiniertes Element im Markup vorhanden, aber auf der Seite nicht sichtbar sein kann, wenn es horizontal herausgescrollt wurde.

Dies funktioniert in der Regel gut, aber wenn Sie viele Layer haben, möchten Sie möglicherweise das Rendering optimieren, indem Sie Gantt die genauen Positionen der benutzerdefinierten Elemente mitteilen.


Dazu verwenden Sie den *object*-Parameter der Methode *addTaskLayer()* und übergeben dem **renderer**-Objekt diese Methoden:

- **render** - eine Rendering-Funktion
- **getRectangle** - eine Funktion, die die Koordinaten der benutzerdefinierten Elemente zurückgibt

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

Der Rendering-Prozess für benutzerdefinierte Elemente funktioniert folgendermaßen:

1\. Wenn sich die horizontale Scroll-Position ändert, ermittelt smart rendering die Koordinaten des aktuell sichtbaren Bereichs. <br>
2\. dhtmlxGantt ruft für jeden Task/Link **getRectangle** auf, um die genauen Koordinaten des benutzerdefinierten Elements zu erhalten. <br>
3\. Gibt **getRectangle** null zurück, wird die **render**-Funktion übersprungen und das benutzerdefinierte Element nicht angezeigt.<br>
4\. Gibt **getRectangle** Koordinaten zurück, die sich mit dem aktuellen Viewport überlappen, wird die **render**-Funktion aufgerufen, um das benutzerdefinierte Element anzuzeigen.<br>

~~~js
gantt.addTaskLayer({
    renderer: {
      render: function draw_planned(task) {
        if (task.planned_start && task.planned_end) {
          var sizes = gantt.getTaskPosition(task,task.planned_start,task.planned_end);
          var el = document.createElement('div');
          el.className = 'baseline';
          el.style.left = sizes.left + 'px';
          el.style.width = sizes.width + 'px';
          el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
          return el;
        }
        return false;
      },
      // die Definition von getRectangle verknüpft den Layer mit smart rendering
      getRectangle: function(task, view){
        return gantt.getTaskPosition(task, task.planned_start, task.planned_end);
      }
    }
});
~~~

## Rendering sichtbarer Teile benutzerdefinierter Elemente

Das **renderer**-Objekt in *addTaskLayer()* unterstützt auch die Aktualisierung des Node-Markups, um nur den sichtbaren Teil eines benutzerdefinierten Elements über die **update**-Methode anzuzeigen:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        update: function(task, node, timeline, viewport){
            ...
            // aktualisiert das innere HTML des Nodes, um aktuell sichtbare Teile anzuzeigen
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

- **update** - ermöglicht das Aktualisieren des inneren HTML eines benutzerdefinierten Elements, z.B. um Teile auszublenden, die außerhalb des Sichtbereichs liegen, und sichtbare Teile anzuzeigen

Die **update**-Methode wird nach dem [onGanttScroll](api/event/onganttscroll.md)-Event ausgelöst und erhält den durch **render** erzeugten Task-Node sowie den aktuellen Viewport.

## Rendering sichtbarer Task-Zeilen

Ab Version v7.1.8 unterstützt das **renderer**-Objekt eine **getVisibleRange**-Funktion, um den sichtbaren Bereich der Task-Zeilen anzugeben:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getVisibleRange: function(){
            ...
            return { 
                  start: indexStart,
                  end: indexEnd
            }
        }
    }
});     
~~~

- **getVisibleRange** - gibt ein Objekt mit Start- und Endindex der sichtbaren Task-Zeilen zurück. Tasks außerhalb dieses Bereichs erhalten keine zusätzlichen Layer.

Wenn **getVisibleRange** statt eines Objekts *false* zurückgibt, geht Gantt davon aus, dass alle Tasks sichtbar sind und rendert zusätzliche Layer für alle.

## Element-Render-Callback

Das **renderer**-Objekt enthält außerdem einen **onrender**-Callback:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        onrender: function(item, node, view){
            console.log("render", item, node)
        }
    }
});
~~~

Die **onrender**-Funktion wird jedes Mal aufgerufen, wenn ein Datenobjekt ins DOM gerendert wird. Sie erhält Zugriff auf das Datenobjekt, das resultierende DOM-Element und die Ansicht, die das Rendering ausgelöst hat (grid oder timeline).

Dieser Callback kann verwendet werden, um DOM-Elemente nach dem Rendering zu modifizieren oder Drittanbieter-Widgets innerhalb der gerenderten Elemente zu initialisieren.

### Related API
- [getTaskPosition](api/method/gettaskposition.md)
- [removeTaskLayer](api/method/removetasklayer.md)
- [layer_attribute](api/config/layer_attribute.md)

### Related Guides
- [Benutzerdefinierte Elemente im Timeline-Bereich](guides/baselines.md)
- [How-tos](guides/how-to.md#howtoverticallyreordertasksinthetimeline) (erklärt, wie man Tasks vertikal in der Timeline neu anordnet)

