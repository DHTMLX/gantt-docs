---
title: "Gantt-Layout"
sidebar_label: "Gantt-Layout"
---

# Gantt-Layout

Ab Version 5.0 bietet Gantt die Möglichkeit, ein konfigurierbares Layout festzulegen und die Elemente der Komponente als innere Ansichten eines Layouts anzuordnen.  
Es ermöglicht die Verwendung zusätzlicher Timelines und Grids, um eine flexible Struktur eines Gantt-Diagramms zu schaffen und verschiedene Anordnungs-Schemata der Elemente zu definieren.

Beispiel: Sie können eine weitere Grid-Ansicht rechts neben der Timeline platzieren:

![gantt_two_grids](/img/gantt_two_grids.png)


**Verwandtes Beispiel**: [Grid-Spalten rechts vom Gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


oder eine weitere Grid- und Timeline-Ansicht unterhalb der Standardansichten hinzufügen.

![gantt_resource_panel](/img/gantt_resource_panel.png)


**Verwandtes Beispiel**: [Gantt-Diagramm mit Ressourcen-Panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## Default layout

Das Layout wird über die Konfigurationsoption [gantt.config.layout](api/config/layout.md) festgelegt. Die Standardkonfiguration des Layouts ist wie folgt:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {
          // die default Grid-Ansicht
          view: "grid",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        {
          // die default Timeline-Ansicht
          view: "timeline",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        {
          view: "scrollbar",
          id: "scrollVer"
        }
      ]
    },
    {
      view: "scrollbar",
      id: "scrollHor"
    }
  ]
}
~~~

Das Layout von Gantt besteht aus Zellen, die von Ansichten belegt werden. Die Haupt- und Hilfselemente des Gantt werden durch **Views** dargestellt, die Folgendes sind:

- **grid** - definiert den Grid-Teil des Gantt-Diagramms. Der Haupt-Grid, der zum Anzeigen von Aufgaben vordefiniert ist, hat die *id:"grid"*
- **timeline** - definiert den Timeline-Teil des Gantt-Diagramms. Die Haupt-Timeline, die zum Anzeigen von Aufgaben vorgesehen ist, hat die *id:"timeline"*
- **resizer** - definiert die Trennlinie. Um einen Resizer zu aktivieren, muss die **resizer**-Eigenschaft auf *true* gesetzt werden. **Nur in der PRO-Edition**
- **scrollbar** - definiert Scrollleisten, die im Gantt-Diagramm verwendet werden. Grid- und Timeline-Ansichten können an bestimmte Scrollleisten gebunden werden. DetailsFurther unten.
- **resourceGrid** - vorkonfiguriertes Grid für ein Ressourcen-Panel. **Nur in der PRO-Edition**. Siehe mehr Details [hier](guides/resource-management.md).
- **resourceTimeline** - vorkonfiguriertes Timeline für ein Ressourcen-Panel. **Nur in der PRO-Edition**. Siehe mehr Details [hier](guides/resource-management.md).

Die Ansichtskonfiguration wird als Objekt mit den entsprechenden Eigenschaften angegeben. 
Sie können [benutzerdefinierte Konfigurationsoptionen](#configs-and-templates-of-views) für die **grid**- und **timeline**-Views festlegen. 
Die Standardoptionen stammen vom globalen [gantt.config](guides/common-configuration.md#ganttconfigobject) Objekt.

:::note
Beachten Sie, dass Sie die Layout-Konfiguration vor der Initialisierung von Gantt angeben sollten. Wenn Sie Änderungen am Layout vornehmen, müssen Sie es mithilfe von [resetLayout](api/method/resetlayout.md) aktualisieren.
:::

## Scrollbar

Layout-Scrollbars werden durch die **"scrollbar"**-View festgelegt. Sie können sowohl eine horizontale als auch eine vertikale Scrollbar festlegen. 

Um eine Scrollbar im Layout zu verwenden, müssen Sie sie mit Hilfe der **scrollX**- bzw. **scrollY**-Eigenschaften über die ID der erforderlichen Scrollbar an die entsprechende View binden.

### Eine Scrollbar für eine View

Es ist möglich, mehrere View-Objekte derselben Scrollbar zuzuordnen. Um eine View mit einer Scrollbar zu verbinden:

- definieren Sie eine Scrollbar mit der notwendigen Scrollrichtung und weisen Sie ihr eine ID zu
- verwenden Sie die ID der Scrollbar als Wert der Eigenschaft **scrollX/scrollY** innerhalb des View-Konfigurationsobjekts

Eine Scrollbar innerhalb des `cols`-Arrays erstellt eine vertikale Scrollbar, eine Scrollbar innerhalb des `rows`-Arrays erzeugt eine horizontale Scrollbar.
Alternativ können Sie den Scroll-Modus explizit mit dem **scroll**-Parameter festlegen:

~~~js
{ view: "scrollbar", id: "scroller", scroll: "x" } // horizontal
~~~
oder:
~~~js
{ view: "scrollbar", id: "scroller", scroll: "y" } // vertical
~~~

Lassen Sie uns benutzerdefinierte Grid- und Timeline-Views der vertikalen Scrollleiste zuordnen:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    }
  ]
}
~~~

Beim Scrollen der vertikalen Scrollleiste werden das Grid und die Timeline zusammen gescrollt.
Im Standard-Layout sind Grid- und Timeline-Views sowohl an die horizontale als auch an die vertikale Scrollleiste gebunden.

Es ist auch möglich, eine separate horizontale Scrollbar für die Grid-View zu spezifizieren. [Lesen Sie die Details](guides/specifying-columns.md#horizontal-scrollbar) im entsprechenden Abschnitt.

### Scrollbars für eine View

In dem oben genannten Unterabschnitt haben wir betrachtet, wie man einer erforderlichen View eine bestimmte Scrollbar hinzufügt. Dazu genügte es, eine einfache Layout-Konfiguration wie folgt zu erstellen:

~~~js
{ cols: [ { rows: [ {}, {} ] }, { rows: [ {}, {} ] } ] }
~~~

oder
~~~js
{ rows: [ { cols: [ {}, {} ] }, { cols: [ {}, {} ] } ] }
~~~

Falls Sie eine View sowohl vertical als auch horizontal scrollbars zuordnen müssen, erstellen Sie eine komplexe Layout-Konfiguration, bei der `cols`- und `rows`-Arrays mehrfach verschachtelt sind, zum Beispiel:

~~~js
{ cols: [
  {
    rows: [
      {
        cols: [ {}, {} ]
      }, 
      {
        cols: [ {}, {} ]
      }
    ]
  },
  {
    rows: [
      {
        cols: [ {}, {} ]
      }, 
      {
        cols: [
          {
            rows: [ {}, {} ]
          }, 
          {	
            rows: [ {}, {} ]
          }
        ]
      }
    ]
  }
]}
~~~

Folgen Sie den Beispielen unten:

- [Gantt. Layout-Views mit eigenen Scrollbars](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Universale Layout-Konfiguration](https://snippet.dhtmlx.com/uqejdyqc)

## Layout-Anpassung

Sie können die Standardlayout-Konfiguration ändern und das gewünschte Schema zur Anordnung der Elemente im Gantt-Diagramm auf einer Seite mithilfe zusätzlicher Layout-Views festlegen.

Beispiel: Sie können zusätzliche Grid- und Timeline-Views erstellen, die eine untere Ressourcen-Leiste für das Haupt-Gantt-Diagramm bilden. Die Schritte zur Implementierung eines solchen
Benutzerlayout sind:

- Erstellen Sie ein Multi-Row-Layout
- Fügen Sie dem ersten Row des Layouts eine Default-Grid- und eine Timeline-View hinzu
- Fügen Sie dem nächsten Row eine zusätzliche Grid- und Timeline-View hinzu und binden Sie sie an eine benutzerdefinierte Datenquelle
- Fügen Sie zwischen diesen Rows einen Resizer ein
- Fügen Sie der letzten Row eine Scrollbar hinzu und binden Sie sie sowohl an die Default- als auch an die Ressourcen-Timeline

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      // das Standardlayout
      cols: [
        { view: "grid", config: mainGridConfig, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { resizer: true, width: 1 },
    {
      // ein benutzerdefiniertes Layout
      cols: [
        { view: "grid", id: "resourceGrid", bind: "resource",
          config: resourceGridConfig, scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "timeline", id: "resourceTimeline", scrollX: "scrollHor",
          bind: "resource", bindLinks: null, layers: resourceLayers,
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Im obigen Beispiel wurde eine zusätzliche Grid-View hinzugefügt. Sie enthält die Liste der Ressourcen und deren Auslastung. Es gibt außerdem eine zusätzliche
Timeline-View, die die Verteilung der Arbeitsstunden im Monat anzeigt und Standard- bzw. Überstunden kennzeichnet.

### Eigenschaften der benutzerdefinierten Grid- und Timeline-Views

Benutzerdefinierte Grid- und Timeline-Views besitzen zusätzliche Eigenschaften:

#### Für die Grid- und Timeline-Views

- **bind** - (*string*) gibt die ID eines Datenspeichers an, aus dem Daten genommen werden (im Beispiel „resource“);

#### Für die Timeline-View

- **bindLinks** - (*string*) verweist auf die Quelle der Verknüpfungen. *null*, wenn keine verknüpften Links vorhanden sind;
- **layers** - (*array*) eine Konfigurationsoption, definiert als Satz von **addLayer()**-Funktionen, die die Gestaltung der Daten beschreiben.

### Hinzufügen eines Datenspeichers für benutzerdefinierte Views

Um benutzerdefinierte Views mit entsprechenden Daten zu füllen, müssen Sie einen separaten Datenspeicher hinzufügen. Um einen neuen Datenspeicher zu erstellen, verwenden Sie die Methode [createDatastore](api/method/createdatastore.md) und geben die Konfiguration des Datenspeichers an:

~~~js
const resourcesStore = gantt.createDatastore({
  name: "resource",
  initItem: (item) => {
    item.id = item.key || gantt.uid();
    return item;
  }
});
~~~

Im obigen Beispiel wird ein Datenspeicher mit dem Namen "resource" hinzugefügt.

Um Daten in benutzerdefinierte Views aus dem Datenspeicher zu laden, verwenden Sie die [parse](api/method/parse.md) Methode:

~~~js
resourcesStore.parse([ // resources
  { key: '0', label: "N/A" },
  { key: '1', label: "John" },
  { key: '2', label: "Mike" },
  { key: '3', label: "Anna" }
]);
~~~

Um eine Konfigurationsobjekt des erforderlichen Datenspeichers zurückzugeben, verwenden Sie die [getDatastore](api/method/getdatastore.md) Methode:

~~~js
const tasksStore = gantt.getDatastore("task");
~~~

Die Methode nimmt den Namen des Datenspeichers als Parameter.

:::note
Wenn Sie integrierte Ressourcen-Views verwenden, kann Gantt automatisch den Datenspeicher für sie erstellen. [Details lesen](guides/resource-management.md#working-with-resource-view-panel).
:::

### Deaktivieren/aktivieren von Resizern dynamisch {#enable_disable_resizers}

In einigen Fällen müssen Sie Resizer zwischen den Zellen des Gantt-Diagramms dynamisch deaktivieren. Die einfachste Lösung besteht darin, sie über CSS auszublenden.

Dazu benötigen Sie eine Regel wie die folgende:

~~~css
.no_resizers .gantt_resizer {
  display: none;
}
~~~

Dann können Sie die Resizer aus dem Container des Gantt ausblenden, indem Sie die Klasse hinzufügen:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

Um die Resizer wieder anzuzeigen, entfernen Sie einfach die Klasse:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## HTML als Innere Ansicht

Sie können auch benutzerdefiniertes HTML als innere Ansichten des Gantt-Layouts verwenden. Zum Beispiel:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
        { html: "<div class='custom-content'>custom content</div>",
          css: "custom-content", width: 50
        },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { html: "<div class='custom-content'>custom content</div>",
          css: "custom-content", width: 50
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", scroll: "x", id: "scrollHor" }
  ]
}
~~~


## Erforderliche Views und Einstellungen

Die öffentliche API des gantt-Objekts enthält Methoden, die sich aus bestimmten Layout-Views ableiten, z. B. [getTaskPosition](api/method/gettaskposition.md), [getTaskNode](api/method/gettasknode.md), [getScrollState](api/method/getscrollstate.md). 

Damit diese Methoden wie erwartet funktionieren, muss das Layout die Standard-Grids, Timelines, Scrollbars enthalten und der Gantt muss in der Lage sein, sie zu finden. 
Dies wird erreicht, indem den Standard-Views spezifische IDs zugewiesen werden:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", id: "grid", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { view: "timeline", id: "timeline", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Die erforderlichen Views und ihre IDs sind:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

Beachten Sie, dass, wenn die ID nicht angegeben wird, Gantt entweder den View-Namen als Standard-View-ID verwendet oder eine eindeutige ID automatisch generiert wird.  
Damit ist im Fall des Standard-Grid und der Timeline der Parameter **id** optional:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Das Layout kann eine beliebige Anzahl weiterer Views enthalten.

## Configs und Templates der Views

Grid- und Timeline-Views verwenden die Templates und Configs aus dem globalen [gantt.config/gantt.templates](guides/common-configuration.md). Allerdings können diese Einstellungen auf View-Ebene im Layout überschrieben werden.

Beispiel: 

~~~js
const secondGridColumns = {
  columns: [
    { name: "status", label: "Status", width: 60, align: "center", 
      template: (task) => {
        const progress = task.progress || 0;
        return Math.floor(progress * 100) + "";
      }
    },
    { name: "impact", width: 80, label: "Impact",
      template: (task) => {
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
        { view: "grid", id: "grid", width: 320, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", id: "timeline", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        { view: "grid", width: 120, bind: "task", scrollY: "scrollVer",
          config: secondGridColumns /*!*/
        },
        { view: "scrollbar", scroll: "y", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor", height: 20 }
  ]
};
~~~


Views können Templates und Configs von der Eltern-Layout erben:

~~~js
const resourceConfig = {  /*!*/
  scale_height: 30      /*!*/
};                        /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", group: "grids", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer", group: "vertical" }
      ],
      gravity: 2
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,   /*!*/
      cols: [
        { view: "resourceGrid", group: "grids", width: 435,
          scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "resourceTimeline", scrollX: "scrollHor",
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
      ],
      gravity: 1
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Schauen Sie sich den Artikel Resource Management an. (guides/resource-management.md)

## Sichtbarkeits-Gruppen

Manchmal müssen Sie die Sichtbarkeit einiger Elemente im Layout synchronisieren. Zum Beispiel möchten Sie möglicherweise, dass horizontale Scrollbars in benachbarten Zellen gleichzeitig angezeigt oder versteckt werden.

![scrollable_grid](/img/scrollable_grid.png)


**Verwandtes Beispiel**: [Horizontal Scrollbar innerhalb von Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


Betrachten wir ein weiteres Beispiel. Sie haben mehrere Grids in verschiedenen Reihen der Timeline und möchten, dass sie dieselbe Breite haben. Wird eines der Grids geändert, soll ein anderes dessen Größe übernehmen.

![grid_group_width](/img/grid_group_width.png)


**Verwandtes Beispiel**: [Ressourcen-Laufdiagramm](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


Beide Probleme lassen sich mit der **group**-Eigenschaft der View lösen. Die Eigenschaft akzeptiert einen beliebigen String-Wert; Views mit dem gleichen Gruppenwert werden synchronisiert. 

- Für Scrollbars bedeutet dies, dass ihre Sichtbarkeit synchronisiert wird. Wenn mindestens eine Scrollbar der Gruppe sichtbar ist, sind alle Scrollbars der Gruppe sichtbar. 

- Für andere Zellen bedeutet es, dass sie dieselbe Breite/Höhe haben, abhängig vom Layout.

Synchronisieren der Sichtbarkeit von Scrollleisten:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      minWidth: 200,
      maxWidth: 600,
      rows: [
        { view: "grid", scrollX: "gridScroll", scrollable: true,
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "gridScroll", group: "horizontal" }    /*!*/
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollHor", group: "horizontal" }      /*!*/
      ]
    },
    { view: "scrollbar", id: "scrollVer" }
  ]
};
~~~

Synchronisieren der Breite von Grids:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", group: "grids", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer", group: "vertical" }    /*!*/
      ],
      gravity: 2
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        { view: "resourceGrid", group: "grids", width: 435,
          scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "resourceTimeline", scrollX: "scrollHor",
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll", group: "vertical" }   /*!*/
      ],
      gravity: 1
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

## Größen der Gantt-Layout-Teile

Sie können die relativen Größen der Zellen des Gantt-Layouts über die in der Konfiguration jeder Zelle gesetzte **gravity**-Eigenschaft regeln. Der Parameter definiert die Größe der Zellen zueinander.

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        // Spaltenkonfiguration
      ],
      gravity: 2     /*!*/
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        // Spaltenkonfiguration
      ],
      gravity: 1       /*!*/
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Im obigen Beispiel ergeben sich Größen des Gantt-Diagramms und des Ressourcen-Diagramms im Verhältnis 2:1. Das bedeutet, dass das Gantt-Diagramm 66% einnimmt, während das Ressourcen-Diagramm 33% einnimmt. 
Durch die Verwendung des Verhältnisses 1:1 erhalten beide Diagramme jeweils 50%.

### Min-/Max-Breite und -Höhe der Zellen

Die Eigenschaften **minWidth/maxWidth** können verwendet werden, um die Breite des Layout-Teils bei Größenänderungen zu begrenzen. Beachten Sie, dass diese Einstellungen nur auf Zellen innerhalb des **cols**-Arrays angewendet werden können. Sie können auch die Eigenschaften **minHeight/maxHeight** auf die Zellen im **rows**-Array anwenden, um die minimale/maximale Höhe der Layout-Zellen festzulegen.

Nachstehend sehen Sie, wie die Eigenschaften **minWidth/maxWidth** in die Spalten-Konfiguration aufgenommen werden können:

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
        { view: "grid", scrollable: true, scrollX: "scrollHor1",
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "scrollHor1", scroll: 'x', group: 'hor' }
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollHor", scroll: 'x', group: 'hor' }
      ]
    },
    {
      view: "scrollbar", id: "scrollVer"
    }
  ]
};
~~~

## Verstecken von übergeordneten Layout-Views

Wenn Sie eine Layout-View verstecken müssen, wenn alle darunterliegenden Elemente unsichtbar sind, geben Sie **hide_empty:true** in der Konfiguration der zugehörigen Layout-Zelle an, zum Beispiel: 

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      hide_empty: true, /*!*/
      rows: [
        { view: "grid" }
      ]
    },
    { resizer: true },
    {
      hide_empty: true, /*!*/
      rows: [
        { view: "timeline" }
      ]
    }
  ]
};
~~~

**Verwandtes Beispiel**: [Grid-/Timeline-Ansichten ausblenden](https://snippet.dhtmlx.com/5/157c0db66)

## Wechseln zwischen Views

Wenn Sie zwischen verschiedenen Layout-Views wechseln müssen, lesen Sie die Abschnitte [How to toggle grid/chart](guides/how-to.md#how-to-toggle-gridchart) und [How to toggle the resource view](guides/how-to.md#how-to-toggle-the-resource-view) für weitere Details.

## Spalten in der Grid-View einfrieren

Sie können ein Gantt-Diagramm initialisieren, in dem eine oder mehrere Spalten eingefroren werden. Um dies zu implementieren, folgen Sie den Anweisungen im Abschnitt [How to freeze/fix columns in the grid](guides/how-to.md#how-to-freezefix-columns-in-the-grid).