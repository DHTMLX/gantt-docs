---
title: "Gantt-Layout"
sidebar_label: "Gantt-Layout"
---

# Gantt-Layout


Ab Version 5.0 unterstützt Gantt die Definition eines anpassbaren Layouts, das es Ihnen ermöglicht, die Elemente der Komponente als innere Ansichten innerhalb eines Layouts anzuordnen. Diese Funktion ermöglicht das Hinzufügen zusätzlicher Zeitachsen und Grids und schafft so eine flexible Gantt-Diagrammstruktur mit verschiedenen Möglichkeiten zur Organisation der einzelnen Bereiche.

Zum Beispiel können Sie ein zusätzliches Grid auf der rechten Seite der Zeitachse hinzufügen:

![gantt_two_grids](/img/gantt_two_grids.png)


[Grid columns rightside of gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


Oder ein weiteres Grid und eine zusätzliche Zeitachse unterhalb der Standardansichten einfügen.

![gantt_resource_panel](/img/gantt_resource_panel.png)


[Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## Standardlayout


Das Layout wird über die Einstellung [gantt.config.layout](api/config/layout.md) gesteuert. Hier ist die Standardkonfiguration des Layouts:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {
              // die Standard-Grid-Ansicht    
              view: "grid",  
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              // die Standard-Timeline-Ansicht
              view: "timeline", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
            },
             {
              view: "scrollbar", 
              id:"scrollVer"
               }
        ]},
            {
            view: "scrollbar", 
            id:"scrollHor"
        }
      ]
}
~~~

Das Gantt-Layout besteht aus Zellen, die mit Ansichten gefüllt werden. Diese Ansichten repräsentieren die Haupt- und Hilfselemente von Gantt, wie zum Beispiel:

- **grid** - der Grid-Bereich des Gantt-Diagramms. Das Hauptgrid zur Anzeige von Aufgaben hat die *id:"grid"*;
- **timeline** - der Zeitachsenbereich des Gantt-Diagramms. Die Hauptzeitachse für Aufgaben hat die *id:"timeline"*;
- **resizer** - eine Trennlinie (Resizer). Um sie zu aktivieren, setzen Sie die **resizer**-Eigenschaft auf *true*. **Dies ist ein Feature der PRO-Edition**;
- **scrollbar** - Scrollbalken, die im Gantt-Diagramm verwendet werden. Grid- und Timeline-Ansichten können mit bestimmten Scrollbalken verknüpft werden (Details siehe unten).
- **resourceGrid** - ein vorkonfiguriertes Grid für ein Ressourcen-Panel. **Nur in der PRO-Edition verfügbar**. Weitere Informationen [hier](guides/resource-management.md).
- **resourceTimeline** - eine vorkonfigurierte Zeitachse für ein Ressourcen-Panel. **Nur in der PRO-Edition verfügbar**. Weitere Informationen [hier](guides/resource-management.md).

Jede Ansicht wird über ein Objekt mit entsprechenden Eigenschaften konfiguriert. 
Sie können [Einstellungen anpassen](#configsandtemplatesofviews) für die **grid**- und **timeline**-Ansichten. 
Standardmäßig werden die Optionen aus dem globalen [gantt.config](guides/common-configuration.md#ganttconfigobject)-Objekt übernommen.

:::note
Beachten Sie, dass die Layout-Konfiguration vor der Initialisierung von Gantt festgelegt werden sollte. Wenn Sie das Layout später ändern, aktualisieren Sie es mit [resetLayout](api/method/resetlayout.md).
:::

## Scrollbalken


Scrollbalken im Layout werden durch die Ansicht **"scrollbar"** definiert. Es können sowohl horizontale als auch vertikale Scrollbalken verwendet werden.

Um einen Scrollbalken einzubinden, verknüpfen Sie ihn mit der entsprechenden Ansicht, indem Sie die Eigenschaften **scrollX** oder **scrollY** mit der ID des Scrollbalkens festlegen.

### Einen Scrollbalken mit einer Ansicht verknüpfen

Mehrere Ansichten können denselben Scrollbalken gemeinsam nutzen. Um eine Ansicht mit einem Scrollbalken zu verbinden:

- Definieren Sie einen Scrollbalken mit der gewünschten Scrollrichtung und vergeben Sie eine ID
- Verweisen Sie in der Ansicht über die Eigenschaft **scrollX** oder **scrollY** auf diese Scrollbalken-ID

Das Platzieren eines Scrollbalkens im `cols`-Array erzeugt einen vertikalen Scrollbalken, während das Platzieren im `rows`-Array einen horizontalen Scrollbalken erzeugt. Alternativ können Sie die Scrollrichtung explizit mit der Eigenschaft **scroll** angeben:

~~~js
{ view: "scrollbar", id:"scroller", scroll: "x"    } // horizontal
~~~
oder:
~~~js
{ view: "scrollbar", id:"scroller", scroll: "y"    } // vertikal
~~~

Hier ein Beispiel, wie benutzerdefinierte Grid- und Timeline-Ansichten an einen vertikalen Scrollbalken gebunden werden:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {             
              view: "grid", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              view: "timeline", 
              scrollY:"scrollVer"
            },
             {
              view: "scrollbar", 
              id:"scrollVer"
               }
        ]}
      ]
}
~~~

Durch das Scrollen des vertikalen Scrollbalkens werden sowohl Grid als auch Timeline gemeinsam verschoben.
Im Standardlayout sind Grid- und Timeline-Ansichten sowohl mit horizontalen als auch mit vertikalen Scrollbalken verbunden.

Sie können auch einen separaten horizontalen Scrollbalken nur für die Grid-Ansicht festlegen. [Details dazu](guides/specifying-columns.md#horizontalscrollbar) finden Sie im entsprechenden Abschnitt.

### Scrollbalken für eine Ansicht

Wie bereits gezeigt, können Sie einer Ansicht einen einzelnen Scrollbalken mit einer einfachen Layout-Konfiguration zuweisen, zum Beispiel:

~~~js
{cols: [ {rows: [{}, {}]}, {rows: [{}, {}]}]}
~~~

oder

~~~js
{rows: [ {cols: [{}, {}]}, {cols: [{}, {}]}]}
~~~

Wenn Sie eine Ansicht sowohl mit vertikalen als auch mit horizontalen Scrollbalken verbinden möchten, benötigen Sie ein komplexeres Layout, in dem `cols`- und `rows`-Arrays mehrfach verschachtelt sind, zum Beispiel:

~~~js
{cols: [ 
    {
        rows: [
            {
                cols: [{}, {}]
            }, 
            {
                cols: [{}, {}]
            }
        ]
    }, 
    {
        rows: [
            {
                cols: [{}, {}]
            }, 
            {
                cols: [
                    {
                        rows: [{}, {}]
                    }, 
                    {    
                        rows: [{}, {}]
                    }
                ]
            }
        ]
    }
]}
~~~

Sehen Sie sich diese Beispiele an:

- [Gantt. Layout views with own scrollbars](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Universal Layout configuration](https://snippet.dhtmlx.com/uqejdyqc)

## Layout-Anpassung


Sie können das Standardlayout anpassen und ein Layout-Schema definieren, das Ihren Anforderungen entspricht, indem Sie dem Gantt-Diagramm zusätzliche Ansichten hinzufügen.

Um beispielsweise ein Ressourcen-Panel unterhalb des Haupt-Gantt-Diagramms mit zusätzlichen Grid- und Timeline-Ansichten zu erstellen, gehen Sie wie folgt vor:

- Erstellen Sie ein mehrzeiliges Layout
- Platzieren Sie das Standard-Grid und die Standard-Timeline in der ersten Zeile
- Fügen Sie in der zweiten Zeile ein zusätzliches Grid und eine Timeline hinzu und binden Sie sie an eine eigene Datenquelle
- Fügen Sie einen Resizer zwischen die Zeilen ein
- Fügen Sie einen Scrollbalken für die letzte Zeile hinzu und verknüpfen Sie ihn sowohl mit der Standard- als auch mit der Ressourcen-Timeline

So könnte die Konfiguration aussehen:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows:[
        {
          // das Standardlayout
          cols: [
            {view: "grid",
                config: mainGridConfig, scrollY:"scrollVer"},
            {resizer: true, width: 1},
            {view: "timeline", 
                scrollX:"scrollHor", scrollY:"scrollVer"},
            {view: "scrollbar", id:"scrollVer"}
          ]
        },
        {resizer: true, width: 1},
        {
          // ein benutzerdefiniertes Layout
          cols: [
            {view: "grid", id: "resourceGrid", bind:"resource", 
                config:resourceGridConfig, scrollY:"resourceVScroll"},
            {resizer: true, width: 1},
            {view:"timeline", id:"resourceTimeline", scrollX:"scrollHor", 
                bind:"resource", bindLinks: null, layers: resourceLayers, 
                scrollY:"resourceVScroll"},
            {view: "scrollbar", id:"resourceVScroll"}
          ]
        },
        {view: "scrollbar", id:"scrollHor"}
    ]
};
~~~

In diesem Beispiel zeigt eine zusätzliche Grid-Ansicht Ressourcen und deren Arbeitslast an, während die zusätzliche Timeline die Verteilung der Arbeitsstunden über den Monat darstellt und dabei Standard- und Überstunden hervorhebt.

### Eigenschaften von benutzerdefinierten Grid- und Timeline-Ansichten

Benutzerdefinierte Grid- und Timeline-Ansichten umfassen einige zusätzliche Eigenschaften:

#### Für Grid- und Timeline-Ansichten

- **bind** - (*string*) gibt die ID des Datenspeichers an, aus dem die Daten abgerufen werden (z. B. "resource" im Beispiel)

#### Für die Timeline-Ansicht

- **bindLinks** - (*string*) verweist auf die Quelle der Verknüpfungen; auf *null* setzen, wenn keine zugehörigen Verknüpfungen existieren
- **layers** - (*array*) eine Reihe von **addLayer()**-Funktionen, die die Darstellung der Daten definieren

### Hinzufügen eines Datenspeichers für benutzerdefinierte Ansichten

Um benutzerdefinierte Ansichten mit den richtigen Daten zu füllen, muss ein separater Datenspeicher hinzugefügt werden. Die Erstellung eines neuen Datenspeichers erfolgt über die Methode 
[createDatastore](api/method/createdatastore.md), bei der Sie die Konfiguration des Datenspeichers angeben:

~~~js
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

In diesem Beispiel wird ein Datenspeicher mit dem Namen "resource" erstellt.

Um Daten aus dem Datenspeicher in benutzerdefinierte Ansichten zu laden, wird die Methode [parse](api/method/parse.md) verwendet:

~~~js
resourcesStore.parse([// resources
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
]);
~~~

Um ein Konfigurationsobjekt für einen bestimmten Datenspeicher zu erhalten, verwenden Sie die Methode [getDatastore](api/method/getdatastore.md):

~~~js
var tasksStore = gantt.getDatastore("task");
~~~

Diese Methode erwartet den Namen des Datenspeichers als Parameter.

:::note
Bei der Verwendung von integrierten Ressourcenansichten kann der gantt den Datenspeicher automatisch erstellen. [Weitere Details hier](guides/resource-management.md#workingwithresourceviewpanel).
:::

### Resizer dynamisch deaktivieren/aktivieren {#enable_disable_resizers}

Manchmal ist es notwendig, die Resizer zwischen den gantt-Zellen dynamisch zu deaktivieren. Der einfachste Weg ist, sie per CSS auszublenden.

Sie können dazu folgende CSS-Regel verwenden:

~~~css
.no_resizers .gantt_resizer{
    display:none;
}
~~~

Fügen Sie anschließend die Klasse dem gantt-Container hinzu, um die Resizer auszublenden:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

Um die Resizer wieder anzuzeigen, entfernen Sie einfach die Klasse:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## HTML als innere Ansicht


Benutzerdefiniertes HTML kann ebenfalls als innere Ansicht innerhalb des Gantt-Layouts verwendet werden. Hier ein Beispiel:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
      {
         cols: [
        {view: "grid",scrollX: "scrollHor", scrollY: "scrollVer"},
        { html:"<div class='custom-content'>custom content</div>", 
            css:"custom-content", width:50},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        { html:"<div class='custom-content'>custom content</div>", 
            css:"custom-content", width:50},
        {view: "scrollbar", id: "scrollVer"}
         ]
    },
    {view: "scrollbar", scroll: "x", id: "scrollHor"}
 ]
}
~~~


## Erforderliche Ansichten und Einstellungen {#requiredviewsandsettings}


Die öffentliche API des gantt-Objekts umfasst Methoden, die an bestimmte Layout-Ansichten gebunden sind, wie [getTaskPosition](api/method/gettaskposition.md), [getTaskNode](api/method/gettasknode.md) und [getScrollState](api/method/getscrollstate.md).

Damit diese Methoden korrekt funktionieren, muss das Layout das Standard-Grid, die Zeitleiste, die Scrollleisten enthalten und der gantt muss diese finden können. Dies wird erreicht, indem bestimmten Ansichten spezifische IDs zugewiesen werden:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

Die erforderlichen Ansichten und ihre IDs sind:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

Falls keine ID gesetzt ist, verwendet gantt entweder den View-Namen als Standard-ID oder generiert automatisch eine eindeutige ID. Für das Standard-Grid und die Zeitleiste kann der "id"-Parameter also weggelassen werden:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

Sie können beliebig viele zusätzliche Ansichten zum Layout hinzufügen.

## Konfigurationen und Templates von Ansichten


Grid- und Timeline-Ansichten verwenden Templates und Konfigurationen aus den globalen [gantt.config/gantt.templates](guides/common-configuration.md). Diese können jedoch für bestimmte Ansichten auf Layout-Ebene überschrieben werden.

Beispiel: 

~~~js
var secondGridColumns = {
  columns: [
    {
        name: "status", label: "Status", width: 60, align: "center", 
        template: function (task) {
            var progress = task.progress || 0;
            return Math.floor(progress * 100) + "";
        }
    },
    {
        name: "impact", width: 80, label: "Impact", template: function (task) {
            return (task.duration * 1000).toLocaleString("en-US", {
              style: 'currency', currency: 'USD'
          });
        }
    }
  ]
};

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", id: "grid", width: 320, scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "grid", width: 120, bind:"task", 
            scrollY:"scrollVer", config:secondGridColumns},   /*!*/
        {view: "scrollbar", scroll: "y", id: "scrollVer"}
      ]
    },
    {view: "scrollbar", id: "scrollHor", height: 20}
  ]
};
~~~


Ansichten können auch Konfigurationen und Templates vom übergeordneten Layout erben:

~~~js
var resourceConfig = {    /*!*/
    scale_height: 30      /*!*/
};                          /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,   /*!*/
      cols: [
        {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};
~~~

Weitere Informationen finden Sie im Artikel [Resource Management](guides/resource-management.md).


## Sichtbarkeitsgruppen


Manchmal ist es nützlich, die Sichtbarkeit bestimmter Layout-Elemente zu synchronisieren. Wenn sich beispielsweise horizontale Scrollleisten in benachbarten Zellen befinden, möchten Sie vielleicht, dass beide gleichzeitig angezeigt oder ausgeblendet werden.

![scrollable_grid](/img/scrollable_grid.png)


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


Ein weiteres Beispiel ist, wenn mehrere Grids in unterschiedlichen Zeitleisten-Zeilen die gleiche Breite teilen sollen. Wenn ein Grid in der Breite angepasst wird, sollen sich die anderen entsprechend anpassen.

![grid_group_width](/img/grid_group_width.png)


[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


Beide Szenarien lassen sich mit der **group**-Eigenschaft einer Ansicht lösen. Diese Eigenschaft akzeptiert einen beliebigen String, und Ansichten mit demselben group-Wert werden synchronisiert.

- Bei Scrollleisten bedeutet dies, dass ihre Sichtbarkeit gekoppelt ist. Ist eine Scrollleiste der Gruppe sichtbar, werden alle sichtbar.
- Bei anderen Zellen sorgt es dafür, dass sie die gleiche Breite oder Höhe teilen - je nach Layout.

Beispiel für die Synchronisation der Sichtbarkeit von Scrollleisten:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
       width:400,
       minWidth: 200,
       maxWidth: 600,
       rows:[
         {view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"},
         {view: "scrollbar", id: "gridScroll", group:"horizontal"}    /*!*/
        ]
    },
    {resizer: true, width: 1},
    {
      rows:[
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollHor", group:"horizontal"}      /*!*/
      ]
    },
    {view: "scrollbar", id: "scrollVer"}
  ]
};
~~~

Beispiel für die Synchronisation der Grid-Breiten:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}    /*!*/
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,
      cols: [
        {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}   /*!*/
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};
~~~

## Größenanpassung der Gantt-Layout-Teile


Die relativen Größen der Gantt-Layout-Zellen können mit der **gravity**-Eigenschaft in der Konfiguration jeder Zelle gesteuert werden. Dieser Wert legt das Größenverhältnis zwischen den Zellen fest.

~~~js
gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
              cols: [
                // columns config
            ],
              gravity:2     /*!*/
        },
        { resizer: true, width: 1 },
        {
            config: resourceConfig,
              cols: [
                // columns config
              ],
              gravity:1       /*!*/
        },
    {view: "scrollbar", id: "scrollHor"}
      ]
};
~~~

In diesem Beispiel teilen sich das Gantt-Diagramm und das Ressourcen-Diagramm den Platz im Verhältnis 2:1. Das bedeutet, das Gantt-Diagramm nimmt etwa 66% ein, das Ressourcen-Diagramm etwa 33%. Mit einem Verhältnis von 1:1 wird der Platz gleichmäßig aufgeteilt.

### Min/max Zellbreite/-höhe

Um die Größe von Layout-Teilen beim Resizing zu begrenzen, verwenden Sie die Eigenschaften **minWidth/maxWidth** für Zellen innerhalb des **cols**-Arrays. Entsprechend können **minHeight/maxHeight** für Zellen im **rows**-Array gesetzt werden, um die Höhenbegrenzung zu steuern.

Hier ein Beispiel, wie **minWidth/maxWidth** in Spaltenkonfigurationen genutzt werden:

~~~js
gantt.config.grid_elastic_columns = true;

gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      minWidth: 200, /*!*/
      maxWidth: 600, /*!*/
      rows: [
        {
          view: "grid", scrollable: true, scrollX: "scrollHor1", scrollY: "scrollVer"
        },
        {
          view: "scrollbar", id: "scrollHor1", scroll: 'x', group: 'hor'
        },
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        {
          view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"
        },
        {
          view: "scrollbar", id: "scrollHor", scroll: 'x', group: 'hor'
        },
      ]
    },
    {
      view: "scrollbar", id: "scrollVer"
    }
  ]
}
~~~


## Eltern-Layout-Ansichten ausblenden


Wenn eine Layout-Ansicht ausgeblendet werden soll, sobald alle untergeordneten Ansichten unsichtbar sind, setzen Sie **hide_empty:true** in der Konfiguration dieser Layout-Zelle, wie folgt:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
          {
            hide_empty: true, /*!*/
            rows:[
                  {view: "grid"}
            ]
          },
          {resizer: true},
          {
            hide_empty: true, /*!*/
            rows:[
                  {view: "timeline"}
            ]
          }
    ]
};
~~~

**Related example:** [Hiding grid/timeline views](https://snippet.dhtmlx.com/5/157c0db66)

## Wechseln zwischen Ansichten


Um zwischen verschiedenen Layout-Ansichten zu wechseln, lesen Sie die Abschnitte [How to toggle grid/chart](guides/how-to.md#howtotogglegridchart) und [How to toggle the resource view](guides/how-to.md#howtotoggletheresourceview) für detaillierte Anweisungen.

## Spalten im Grid einfrieren


Es ist möglich, ein Gantt-Diagramm mit einer oder mehreren eingefrorenen Spalten zu initialisieren. Anleitungen dazu finden Sie im Abschnitt [How to freeze/fix columns in the grid](guides/how-to.md#howtofreezefixcolumnsinthegrid).

