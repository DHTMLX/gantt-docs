---
title: "Ressourcenmanagement"
sidebar_label: "Ressourcenmanagement"
---

Ressourcenmanagement
======================

:::info
Diese Funktion ist nur in der Gantt PRO Edition enthalten.
:::

Gantt bietet vordefinierte Ressourcenansichten, um die Auslastung der Ressourcen zu visualisieren, Werkzeuge zur Projektaufteilung nach Ressourcen zur Ausbalancierung der Arbeitslasten sowie aufgaben- und ressourcenspezifische Kalender.

![resource_panel](/img/resource_panel.png)

:::note
Gantt berechnet die Ressourcenauslastung selbst nicht und bietet dafür keine integrierten Methoden, stellt aber eine öffentliche API bereit, mit der Sie jede gewünschte benutzerdefinierte Funktionalität erstellen können.
:::

Ressourcenansicht-Panel
------------------------

dhtmlxGantt stellt zwei vordefinierte Layout-Ansichten zur Anzeige der Ressourcenauslastung bereit: das Ressourcen-Auslastungsdiagramm und das Ressourcen-Histogramm.

### Ressourcen-Auslastungsdiagramm

Dies umfasst spezielle Ansichten für das Grid und die Zeitleiste: "resourceGrid" und "resourceTimeline".

![resource_panel](/img/resource_panel.png)

:::note
Separate [Konfigurationen](guides/layout-config.md#configsandtemplatesofviews) müssen für die Ansichten "resourceGrid" (zur Anzeige von Ressourcenspalten anstelle von Aufgaben) und "resourceTimeline" bereitgestellt werden, ebenso wie [Templates](guides/layout-config.md#configsandtemplatesofviews), um die Darstellung der Ressourcen-Zuweisungen im Panel anzupassen.
:::

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
      {
        // Layout für Standard-Grid und Zeitleiste
        cols: [
          {view: "grid", group:"grids", scrollY: "scrollVer"},
          {resizer: true, width: 1},
          {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
          {view: "scrollbar", id: "scrollVer", group:"vertical"}
        ],
        gravity:2
      },
      { resizer: true, width: 1},
      {
        // Layout für Grid und Zeitleiste des Ressourcenpanels
        config: resourceConfig, // Konfiguration für Grid und Zeitleiste
        cols: [
          {view: "resourceGrid", group:"grids", width: 435, scrollY:"resourceVScroll"},
          {resizer: true, width: 1},
          {view: "resourceTimeline", scrollX: "scrollHor", scrollY:"resourceVScroll"},
          {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
        ],
        gravity:1
       },
       {view: "scrollbar", id: "scrollHor"}
    ]
};
~~~


[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


Nach dem Einrichten verhält sich *resourceGrid* wie die Standard-Grid-Ansicht, ist jedoch schreibgeschützt. *resourceTimeline* verwendet die gleichen Skalen-Einstellungen wie die Standard-Zeitleiste und enthält zwei Ebenen:

- Hintergrundzeilen, die die Templates aus [task_row_class](api/template/task_row_class.md) und [timeline_cell_class](api/template/timeline_cell_class.md) verwenden. Diese können auf Layout-Ebene angepasst werden.
- Ressourcenebene - einzigartig für *resourceTimeline*, zeigt Blöcke in Zellen, in denen Ressourcen Aufgaben zugewiesen sind. Stil und Inhalt dieser Blöcke können mit den Templates [resource_cell_class](api/template/resource_cell_class.md) und [resource_cell_value](api/template/resource_cell_value.md) angepasst werden:

~~~js
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    var html = "<div>" +  tasks.length * 8 + "h</div>";
        return html;
};
~~~


[Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)


### Ressourcen-Histogramm

Diese Layout-Ansicht für Ressourcenauslastung beinhaltet "resourceGrid" und "resourceHistogram" für Grid und Zeitleiste.

![Resource histogram](/img/resource_histogram.png)

:::note
Separate [Konfigurationen](guides/layout-config.md#configsandtemplatesofviews) sind für die Ansichten "resourceGrid" (zur Anzeige von Ressourcenspalten) und "resourceHistogram" erforderlich, ebenso wie [Templates](guides/layout-config.md#configsandtemplatesofviews), um die Darstellung der Ressourcen-Zuweisungen anzupassen.
:::


~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            // Layout für Standard-Grid und Zeitleiste
            gravity: 2,
            cols: [
                {view: "grid", group:"grids", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {view: "scrollbar", id: "scrollVer", group:"vertical"}
            ]
        },
        { resizer: true, width: 1, next: "resources"},
        {
            // Layout für Grid und Zeitleiste des Ressourcenpanels
            gravity:1,
            id: "resources",
            config: resourceConfig, // Konfiguration für Grid und Zeitleiste
            templates: resourceTemplates, // Templates für Grid und Zeitleiste
            cols: [
                { view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" },
                { resizer: true, width: 1},
                { view: "resourceHistogram", capacity:24, scrollX: "scrollHor", 
                    scrollY: "resourceVScroll"},
                { view: "scrollbar", id: "resourceVScroll", group:"vertical"}
            ]
        },
        {view: "scrollbar", id: "scrollHor"}
    ]
};
~~~


[Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)


Wie beim Ressourcen-Auslastungsdiagramm verhält sich *resourceGrid* ähnlich wie die Standard-Grid-Ansicht, ist jedoch schreibgeschützt. *resourceHistogram* bietet mehrere zusätzliche Templates:

- *histogram_cell_class* - CSS-Klasse, die auf eine Zelle im Ressourcenpanel angewendet wird

~~~js
gantt.templates.histogram_cell_class="function(start_date,end_date,resource,tasks,"
    assignments){
    return "";
};
~~~

- *histogram_cell_label* - Beschriftung, die innerhalb einer Zelle angezeigt wird

~~~js
gantt.templates.histogram_cell_label="function(start_date,end_date,resource,tasks,"
    assignments){
     return tasks.length * 8;
};
~~~

- *histogram_cell_allocated* - Höhe des ausgefüllten Bereichs im Histogramm, von 0 bis *maxCapacity*.

~~~js
gantt.templates.histogram_cell_allocated="function(start_date,end_date,resource,tasks,"
    assignments){
     return tasks.length * 8;
};
~~~

- *histogram_cell_capacity* - Höhe der Linie, die die verfügbare Kapazität der Ressource anzeigt, von -1 bis *maxCapacity*. Werte unter 0 blenden die Linie aus.

~~~js
gantt.templates.histogram_cell_capacity="function(start_date,end_date,resource,tasks,"
    assignments){
     return 24;
};
~~~

**Verständnis von maxCapacity**

Stellen Sie sich jede Histogrammzeile als Balkendiagramm vor, wobei maxCapacity die Höhe der Y-Achse darstellt. Im folgenden Beispiel entspricht maxCapacity dem Wert 24:


![maxCapacity](/img/maxcapacity.png)

Das Setzen von *histogram_cell_allocated* oder *histogram_cell_capacity* auf 24 bedeutet also, dass das obere Ende der Zeile erreicht wird.

Standardmäßig beträgt **maxCapacity** für jede Ressource 24. Werden in *histogram_cell_capacity* Werte über 24 zurückgegeben, erfolgt die Berechnung korrekt, aber der ausgefüllte Bereich in den Zellen des Ressourcenpanels wird möglicherweise nicht wie erwartet angezeigt.

![filled_capacity](/img/filled_capacity.png)

Sie können **maxCapacity** global für das gesamte Histogramm oder individuell pro Ressource konfigurieren. Hier ein Beispiel:

**Related example:** [Konfiguration von maxCapacity](https://snippet.dhtmlx.com/glnqcsgq)

**maxCapacity** kann auf Histogramm-Ebene gesetzt werden:

~~~js
{ view: "resourceHistogram", capacity:24, scrollX: "scrollHor", 
    scrollY: "resourceVScroll"}
~~~

Oder individuell für jede Ressource:

~~~js
resourcesStore.parse([
    {id: 1, text: "John", capacity:8},
    {id: 2, text: "Mike", capacity:4},
    {id: 3, text: "Anna", capacity:8},
    {id: 4, text: "Bill", capacity:8},
    {id: 5, text: "Floe", capacity:8}
]);
~~~

:::note
Die auf Ressourcenebene gesetzte Kapazität überschreibt für diese Ressource die globale Kapazität des Histogramms.
:::

## Arbeiten mit dem Ressourcenpanel

Standardmäßig sind beide Ansichten (entweder "resourceGrid" und "resourceTimeline" oder "resourceGrid" und "resourceHistogram") mit dem Datenspeicher verbunden, der in der Einstellung 
[gantt.config.resource_store](api/config/resource_store.md) angegeben ist.

### Automatische Erstellung des Datenspeichers

Ab Version 8.0 wird der Ressourcen-Datenspeicher automatisch erstellt, wenn Gantt initialisiert wird, und ist verfügbar, sobald das "onGanttReady"-Event ausgelöst wird. Um auf diesen Store zuzugreifen, verwenden Sie die Methode [getDatastore](api/method/getdatastore.md).

Wenn Sie den Ressourcenstore anpassen möchten, können Sie die Option [gantt.config.resources](api/config/resources.md) verwenden:

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
}
~~~

Die Einstellungen innerhalb von **resource_store** werden zur Erstellung des Standard-Ressourcendatenspeichers verwendet. Falls Sie bereits einen Ressourcendatenspeicher im Code haben, wird dieser verwendet.

Um Ressourcen zu laden, können Sie diese wie [hier](guides/resource-management.md#loadingresourcesandresourceassignments) beschrieben über **gantt.parse()**/**gantt.load()** übergeben oder den Datastore direkt mit **datastore.parse()** befüllen:

~~~js
gantt.attachEvent("onGanttReady", function(){
    const store = gantt.getDatastore(gantt.config.resource_store);
    store.parse([
       {id: 6, text: "John"},
       {id: 7, text: "Mike"},
       {id: 8, text: "Anna"},
       {id: 9, text: "Bill"},
    ])
});
~~~

Die Ressourcensteuerung der Lightbox wird automatisch mit der Ressourcenliste verknüpft:

~~~js
gantt.config.lightbox = {
    sections: [
        ...,
        { name: "resources", type: "resources", map_to: "auto", default_value: 8}
    ]
};
~~~


### Manuelle Erstellung des Datenspeichers

Sie können den Datenspeicher auch manuell mit der Methode [createDatastore](api/method/createdatastore.md) erstellen:

~~~js
var resourcesStore = gantt.createDatastore({
  name: gantt.config.resource_store,
  // Verwenden Sie treeDatastore, wenn Ihre Ressourcen hierarchisch sind (z. B. Mitarbeiter/Abteilungen),
  // oder lassen Sie "type" weg für eine flache Struktur
  type: "treeDatastore", 
  initItem: function (item) {
    item.parent = item.parent || gantt.config.root_id;
    item[gantt.config.resource_property] = item.parent;
    item.open = true;
    return item;
  }
});
~~~

Um den Datenspeicher zu befüllen, verwenden Sie die Methode **datastore.parse**:

~~~js
resourcesStore.parse([
    {id: 1, text: "QA", parent:null},
      {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);
~~~

Wenn Sie Ressourcen in der Lightbox verwenden möchten, empfiehlt es sich, dies über die Methode [serverList](api/method/serverlist.md) zu tun, die durch das onParse-Event des Datenspeichers ausgelöst wird:

~~~js
resourcesStore.attachEvent("onParse", function(){
  var people = [];
  resourcesStore.eachItem(function(res){
    if(!resourcesStore.hasChild(res.id)){
        var copy = gantt.copy(res);
        copy.key = res.id;
        copy.label = res.text;
        people.push(copy);
    }
  });
  gantt.updateCollection("resourceOptions", people);
});
~~~

### Ressourcenpanel erweitern

Sie können das Ressourcenpanel erweitern, um alle einer bestimmten Ressource zugewiesenen Aufgaben anzuzeigen, indem Sie die Eigenschaft **fetchTasks** beim Initialisieren des Datenspeichers aktivieren:

![Expanded resource panel](/img/expanded_resource_panel.png)

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true, /*!*/
        initItem: function (item) {
             item.parent = item.parent || gantt.config.root_id;
             item[gantt.config.resource_property] = item.parent;
             if(!item.parent){
                 item.open = true;
             }else{
                 item.open = false;
             }
             return item;
         }
    },
};
~~~

oder

~~~js
gantt.$resourcesStore = gantt.createDatastore({
     name: gantt.config.resource_store,
    type: "treeDatastore",
     fetchTasks: true, /*!*/
     initItem: function (item) {
         item.parent = item.parent || gantt.config.root_id;
         item[gantt.config.resource_property] = item.parent;
         if(!item.parent){
             item.open = true;
         }else{
             item.open = false;
         }
         return item;
     }
});
~~~


[Show all assigned tasks in the resource panel](https://docs.dhtmlx.com/gantt/samples/11_resources/11_resource_histogram_display_tasks.html)


Mit **fetchTasks** auf *true* zeigt Gantt im Ressourcenpanel alle mit einer Ressource verknüpften Aufgaben an. Dies gilt sowohl für das Ressourcen-Auslastungsdiagramm als auch für das Ressourcen-Histogramm.

Eine schnelle Möglichkeit, alle einer Ressource zugewiesenen Aufgaben abzurufen, finden Sie unter [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6");
~~~

## Ressourcen zuweisen {#assigningresources}

### Ressourcen mit Aufgaben verbinden

Die Verbindung zwischen Ressourcen und Aufgaben wird über die Einstellung [resource_property](api/config/resource_property.md) gesteuert:

~~~js
gantt.config.resource_property = "user_id";
// task.user_id <-> resource.id
~~~

Ressourcen können auf verschiedene Arten über Eigenschaften des Aufgabenobjekts mit Aufgaben verknüpft werden:

- Einer Aufgabe eine einzelne Ressource zuweisen

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
    user_id: 5 // 5 ist die Ressourcen-ID 
}
~~~

- Einer Aufgabe mehrere Ressourcen zuweisen

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
    users: [2, 3] // 2 und 3 sind Ressourcen-IDs
}
~~~

Dieses Format eignet sich gut für das [benutzerdefinierte Multiselect-Steuerelement](guides/custom-editor.md#customthirdpartyeditor).

- Mehrere Ressourcen mit angegebenen Mengen zuweisen

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [{resource_id:2, value:8}, {resource_id:3, value:4}]  
}
~~~

Hier werden der Ressource mit id="2" acht Einheiten und der Ressource mit id="3" vier Einheiten zugewiesen. Dieses Format wird vom [Resources Control](guides/resources.md) Lightbox unterstützt.

Ab Version v8.0 können Ressourcenzuweisungen auch als separate Liste geladen werden, und Gantt verknüpft sie automatisch mit den Aufgaben:

~~~js
gantt.parse({
       tasks: [...],
       links: [...],
       resources: [...],
       assignments: [{id:1, resource_id:2, task_id: 5, value: 8}, ...]
});
~~~

Weitere Informationen zu den Datenformaten finden Sie [hier](guides/resource-management.md#loadingresourcesandresourceassignments).

Beim Senden von Daten an den Server serialisiert der DataProcessor diese Eigenschaften als JSON. Um solche Datensätze effizient auf dem Server zu verarbeiten, empfiehlt sich der ["REST_JSON"](guides/server-side.md#restjson) DataProcessor-Modus.

Wenn Sie Änderungen an Ressourcenzuweisungen getrennt von Aufgaben speichern möchten, aktivieren Sie diese Konfiguration:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Mehr dazu erfahren Sie im [entsprechenden Artikel](guides/server-side.md#resources_crud).


### Zeitpunkt der Ressourcenzuweisungen festlegen {#resourceassignmenttime}

Standardmäßig wird eine Ressource für die gesamte Dauer einer Aufgabe zugewiesen.


Ab Version v7.1 können Ressourcenzuweisungsobjekte zusätzliche optionale Parameter enthalten, um die Zuweisungsdaten innerhalb der Aufgabe zu spezifizieren.

Diese zusätzlichen Eigenschaften umfassen:

- **id** - (*string|number*) Zuweisungs-ID
- **start_date** - (*Date|string*) Startdatum der Zuweisung
- **end_date** - (*Date|string*) Enddatum der Zuweisung
- **delay** - (*number*) Versatz zwischen Zuweisungsbeginn und Aufgabenbeginn
- **duration** - (*number*) Länge der Zuweisung
- **mode** - (*string*) Berechnung der Zuweisungszeit: "default"|"fixedDates"|"fixedDuration"

~~~js
{
    id: 5, text: "Interior office", type: "task", start_date: "03-04-2019 00:00",
    duration: 7, parent: "2", progress: 0.6, priority: 1,
    users: [{
        resource_id: "3",
        value: 8,
        delay: 1 /*!*/
    },{
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00", /*!*/
        end_date: "05-04-2019 00:00", /*!*/
        mode: "fixedDates" /*!*/
    },{
        resource_id: "7",
        value: 3,
        delay: 1, /*!*/
        duration: 2, /*!*/
        mode: "fixedDuration" /*!*/
    }
    ]
}
~~~


[Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


1. Die *Start- und Enddaten* der Ressourcenzuweisungen werden im Ressourcen-Histogramm und Diagramm angezeigt.

2. Sie können dem Zuweisungsobjekt optional eine *id* hinzufügen:

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [{
        id: 5, 
        resource_id: 2, value: 8, 
        delay: 1
    }]
}
~~~

Mit dieser ID können Sie auf die Zuweisung über die gantt API zugreifen:

~~~js
var assignment = gantt.getDatastore("resourceAssignments").getItem(5);
~~~

:::note
Der ["resourceAssignments"](api/config/resource_assignment_store.md) Datenspeicher ist nur verfügbar, wenn die [process_resource_assignments](api/config/process_resource_assignments.md) Konfiguration aktiviert ist.
:::


3. Das Verhalten der anderen Eigenschaften hängt vom Wert von **mode** ab:

- **_der "default"-Modus_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [
        { resource_id: 2, value: 8, delay: 1},
        { resource_id: 3, value: 6},
    ]
}
~~~

Fehlt *mode* oder ist auf "default" gesetzt, werden *start_date* und *end_date* der Zuweisung von den Daten der Aufgabe abgeleitet. Die Zuweisung beginnt standardmäßig am Startdatum der Aufgabe und endet, wenn die Aufgabe endet.

Die Eigenschaft *delay* funktioniert wie das *Delay*-Feld in [MS Project](https://support.microsoft.com/en-us/office/assignment-delay-fields-427ac799-225c-4e10-9dcb-f58e524c8173). 

Wenn ein Delay gesetzt ist, wird das *start_date* der Zuweisung wie folgt berechnet:

`gantt.calculateEndDate((start_date:task.start_date, duration:assignment.delay, task:task))`.

Das bedeutet, die Zuweisung beginnt nach dem angegebenen Versatz ab Aufgabenstart und endet mit der Aufgabe. Diese Daten werden automatisch aktualisiert, wenn sich die Aufgabe ändert.

- **_der "fixedDuration"-Modus_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [
        {resource_id:2, value:8, duration: 1, delay:0, mode: "fixedDuration"},
        {resource_id:2, value:2, duration: 1, delay:1, mode: "fixedDuration"},
        {resource_id:2, value:3, delay:2, mode: "default"}
    ]
}
~~~

Hier wird das *start_date* wie im *default*-Modus berechnet.

Das *end_date* ist jedoch nicht mehr an das Enddatum der Aufgabe gebunden. Es wird stattdessen wie folgt berechnet:

 `gantt.calculateEndDate((start_date:assignment.start_date, duration:assignment.duration, task:task))`.

Wenn sich die Aufgabe ändert, werden die Zuweisungsdaten neu berechnet, aber die Dauer der Zuweisung bleibt fest.

- **_der "fixedDates"-Modus_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [{
        resource_id:2, value:8, 
        start_date:"03-04-2018", end_date:"11-04-2018", mode: "fixedDates"
    }]
}
~~~

In diesem Modus sind die Zuweisungsdaten exakt wie angegeben und ändern sich nicht, wenn die Aufgabe angepasst wird.

Die Eigenschaft *delay* hat im Modus "fixedDates" keine Wirkung.


Hier eine kurze Übersicht, wie die Zuweisungsdaten je Modus berechnet werden:

- **default**

  - assignment.start_date = task.start_date + assignment.delay
  - assignment.end_date = task.end_date

- **fixedDuration**

  - assignment.start_date = task.start_date + assignment.delay
  - assignment.end_date = assignment.start_date + assignment.duration

- **fixedDates**

  - assignment.start_date = assignment.start_date
  - assignment.end_date = assignment.end_date


### Aufgaben abrufen, denen eine Ressource zugewiesen ist

Um schnell alle Aufgaben zu erhalten, denen eine Ressource zugewiesen ist, verwenden Sie die Methode aus [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6"); 
~~~

Diese Methode nimmt eine Ressourcen-ID entgegen und gibt ein Array von Objekten zurück, die die Aufgaben repräsentieren, denen diese Ressource zugewiesen ist:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

Jedes Objekt enthält folgende Eigenschaften:

- *task_id* - Aufgabenkennung
- *resource_id* - Ressourcenkennung
- *value* - Menge der Ressource, die der Aufgabe zugewiesen ist
- *delay* - Versatz zwischen Zuweisungsbeginn und Aufgabenbeginn
- *duration* - Länge der Zuweisung
- *start_date* - Startdatum der Zuweisung
- *end_date* - Enddatum der Zuweisung
- *id* - Zuweisungskennung
- *mode* - Berechnungsmodus der Zuweisungszeit: "default"|"fixedDates"|"fixedDuration"


### Ressourcenzuweisungen einer Aufgabe abrufen

Die Methode [getTaskAssignments](api/method/gettaskassignments.md) ruft Ressourcenzuweisungen für eine bestimmte Aufgabe aus dem Datenspeicher ab:

~~~js
gantt.getTaskAssignments(5);
~~~

Sie nimmt eine Aufgaben-ID entgegen und gibt ein Array von Objekten zurück, die die Ressourcenzuweisungen für diese Aufgabe darstellen:

~~~js
[
    {task_id: 5, id: 1617254693938, delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 3},
    {task_id: 5, id: 1617254693946, delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 6}
]
~~~

Die zurückgegebenen Objekte haben die gleichen Eigenschaften wie die aus der Methode [getResourceAssignments](api/method/getresourceassignments.md).

### Verbindung über die Lightbox herstellen

Ressourcen können mit jeder Eigenschaft des Aufgabenobjekts über die integrierte Lightbox-Funktion verknüpft werden.

~~~js
gantt.serverList("people", [
    {key: 1, label: "John"},
    {key: 2, label: "Mike"},
    {key: 3, label: "Anna"},
    {key: 4, label: "Bill"},
    {key: 7, label: "Floe"}
]);

gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
  {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
  {name:"owner", map_to:"owner_id", type:"select", options:gantt.serverList("people")},
  {name:"time", type:"duration", map_to: "auto"}
];
~~~

Weitere Informationen zur Konfiguration des Ressourcen-Steuerelements in der Lightbox finden Sie im Artikel [Resources Control](guides/resources.md).

### Laden von Collections

Collections, die als Serverlisten definiert sind, können nach der Initialisierung des Gantt-Diagramms dynamisch geladen und aktualisiert werden:

~~~js
// Initialisiere das Lightbox mit einer leeren Collection
gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
  {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
  {name:"owner", map_to:"owner_id", type:"select", options:gantt.serverList("people")},
  {name:"time", type:"duration", map_to: "auto"}
];

// Optionen aktualisieren, sobald sie geladen sind
gantt.updateCollection("people", [
    {key: 1, label: "John"},
    {key: 2, label: "Mike"},
    {key: 3, label: "Anna"},
    {key: 4, label: "Bill"},
    {key: 7, label: "Floe"}
]);
~~~

![resource_management](/img/resource_management.png)


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


Wenn Ressourcen über die *serverList*-Collection definiert werden, können sie [zusammen mit anderen Daten geladen werden](guides/supported-data-formats.md#jsonwithcollections). Andernfalls ist das manuelle Laden erforderlich.

Weitere Hinweise zur Konfiguration des Ressourcen-Controls im Lightbox finden Sie im Artikel [Resources Control](guides/resources.md).

Ressourcen und Ressourcenzuweisungen laden
------------------------------------------

Ab Version 8.0 können Ressourcen und Ressourcenzuweisungen mit den Methoden [gantt.parse()](api/method/parse.md) oder [gantt.load()](api/method/load.md) in das Gantt geladen werden:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2024 00:00",
                    end_date: "05-04-2024 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

Ressourcenzuweisungen können auch separat von Aufgaben bereitgestellt werden:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        ...
    ],
    links: [],
    assignments: [
        {
            id: 1, task_id: 5, resource_id: 6, value: 3,
            start_date: "03-04-2024 00:00", 
            end_date: "05-04-2024 00:00"
        }
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

Verwaltung von Ressourcenzuweisungen
---------------------------

### Parsen von Ressourcenzuweisungen

Ab Version 7.1 können Ressourcenzuweisungen als Objekte im Data Store verwaltet werden.

Die Eigenschaft [process_resource_assignments](api/config/process_resource_assignments.md) steuert das Parsen von Werten aus der [gantt.config.resource_property](api/config/resource_property.md) der Aufgaben in interne Ressourcenzuweisungsobjekte. Dadurch ist es möglich, mit Ressourcenzuweisungen über die DataStore API zu arbeiten, einschließlich Abrufen oder Aktualisieren von Zuweisungsobjekten.

**Hinweis:** Diese Funktion ist erforderlich, wenn die gewünschte Dauer und Zeit für Ressourcen angegeben werden soll, insbesondere bei Verwendung des Ressourcen-Diagramms und Histogramms.

Beachten Sie, dass das Aktivieren dieses Prozesses zu Performance-Einbußen führen kann, was sich bei großen Projekten auswirkt. Falls keine Zeit- oder Dauerdetails benötigt werden, kann das Parsen deaktiviert werden:

~~~js
gantt.config.process_resource_assignments = false;
~~~

Wenn deaktiviert, ist `gantt.getDatastore("resourceAssignments")` nicht verfügbar und Zuweisungsobjekte besitzen keine dynamischen Eigenschaften. In diesem Fall behandelt das Ressourcen-Diagramm und Histogramm Ressourcen als für die gesamte Aufgabendauer zugewiesen.

### Aktualisierung von Ressourcenzuweisungen

Ressourcenzuweisungen werden in einem automatisch erstellten [Data Store](api/config/resource_assignment_store.md) gespeichert.

Standardmäßig wird dieser Store basierend auf den Aufgabenobjekten befüllt. Das bedeutet, dass eine Änderung der Resource-Property einer Aufgabe (z.B. task.users) den Data Store automatisch aktualisiert:

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00",
        end_date: "05-04-2019 00:00",
    }
];
gantt.updateTask(taskId);
~~~


Manchmal ist es jedoch notwendig, das Aufgabenobjekt nach Änderungen an den Ressourcenzuweisungen über die Data Store API zu aktualisieren. Um Änderungen zurück auf das Aufgabenobjekt zu übertragen, verwenden Sie die Methode [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md):

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// Nach Aktualisierung der Zuweisungen im Data Store, `updateTaskAssignments` aufrufen, um mit dem Aufgabenobjekt zu synchronisieren:
gantt.updateTaskAssignments(taskId);
~~~

Anzeige der Ressourcen einer Aufgabe
----------------------

Ressourcennamen können als Teil der Aufgabenbeschreibung oder als Labels in den Rasterzellen angezeigt werden. Da Gantt keine eingebaute Methode zum Abrufen eines Elements aus der Serverliste per ID bietet, kann eine einfache Hilfsfunktion verwendet werden:

~~~js
function byId(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].key == id)
            return list[i].label || "";
    }
    return "";
}
~~~

Diese Hilfsfunktion kann dann in Templates verwendet werden, um Ressourcennamen anzuzeigen:

~~~js
gantt.config.columns = [
    {name: "owner", width: 80, align: "center", template: function (item) {
        return byId(gantt.serverList('people'), item.owner_id)}},
    {name: "text", label: "Task name", tree: true, width: '*'},
    {name: "add", width: 40}
];

gantt.templates.rightside_text = function(start, end, task){
    return byId(gantt.serverList('people'), task.owner_id);
};
~~~


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


Editierbares Ressourcen-Diagramm
-------------------------

Um das Bearbeiten von Ressourcenzuweisungen direkt im Ressourcen-Diagramm zu ermöglichen, setzen Sie folgende Konfiguration:

~~~js
gantt.config.resources = {
    editable_resource_diagram: true
};
~~~


[Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


Mit aktiviertem **editable_resource_diagram** weist Gantt automatisch die Templates [gantt.templates.resource_cell_value](api/template/resource_cell_value.md) und [gantt.templates.resource_cell_class](api/template/resource_cell_class.md) zu, um das Bearbeiten von Ressourcenzuweisungen zu unterstützen.

Falls Sie eigene Funktionen für diese Templates bereitstellen, verwendet Gantt diese anstelle der Standardimplementierungen.

Die Standardimplementierungen sind in **gantt.ext.resources** verfügbar:

~~~js
gantt.templates.resource_cell_value = gantt.ext.resources.editableResourceCellTemplate;
gantt.templates.resource_cell_class = gantt.ext.resources.editableResourceCellClass;
~~~

In der Regel ist eine manuelle Zuweisung dieser Templates nicht erforderlich, da Gantt dies bei aktiviertem editierbaren Diagramm übernimmt.

Unten ein Beispiel für ein Template mit editierbaren Zellen, das nach Bedarf angepasst werden kann:

**Related example:** [Customizable resource diagram template](https://snippet.dhtmlx.com/libwuna4?tag="gantt")

Individuelle Gestaltung von Ressourcen
------------------------

Für die Farbgebung werden häufig folgende Templates verwendet:

- [gantt.templates.grid_row_class](api/template/grid_row_class.md) - CSS-Klasse für Zeilen im linken Raster
- [gantt.templates.task_row_class](api/template/task_row_class.md) - Hintergrundzeile in der Zeitleiste (wird nicht verwendet, wenn Smart Rendering aktiviert ist)
- [gantt.templates.task_class](api/template/task_class.md) - CSS-Klasse für Task-Bar-Elemente

Je nach Szenario können Sie entweder:

- [Vordefinierte Klassen für jede Ressource verwenden](guides/colouring-tasks.md#redefiningthetaskstemplate), oder
- Styling-Informationen wie Hintergrund- und Textfarbe zusammen mit Ressourcen laden, was das [dynamische Generieren von CSS auf der Seite](guides/colouring-tasks.md#loadingcolorswiththedata) erfordert


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


Ressourcenkalender
------------------

Gantt unterstützt individuelle Arbeitszeit-Kalender, die bestimmten Ressourcen zugeordnet werden können.

![resource_calendars](/img/resource_calendars.png)

Diese Kalender werden Aufgaben über eine Eigenschaft in einer 1:1-Beziehung zugeordnet:

~~~js
// Der Ressourcenwert wird aus der Eigenschaft `task.resource_id` übernommen
gantt.config.resource_property = "resource_id";

gantt.config.resource_calendars = {
    "resource1" : "calendarId1",
    "resource2" : "calendarId2",
    "resource3" : "calendarId3"
};
~~~

Jede Eigenschaft kann verwendet werden, um Kalender Ressourcen zuzuweisen. Ändert sich die Resource-Property dynamisch, berechnet Gantt die Aufgabenzeit automatisch mit dem aktualisierten Kalender neu.


[Resource calendars](https://docs.dhtmlx.com/gantt/samples/11_resources/02_resource_calendars.html)


Wenn mehreren Ressourcen eine Aufgabe zugewiesen ist, kann Gantt [automatisch einen kombinierten Kalender](api/config/dynamic_resource_calendars.md) für alle zugewiesenen Ressourcen generieren.

Weitere Details finden Sie im zugehörigen Artikel [Zuweisen von Kalendern zu Ressourcen](guides/working-time.md#assigningcalendartoresource).

Auslastung von Ressourcen ausgleichen
------------------------

Die [Grouping-Erweiterung](guides/extensions-list.md#grouping) ermöglicht die Aufschlüsselung des gesamten Projekts nach der **resource**-Property.

![resource_break_down](/img/resource_break_down.png)

Dies hilft dabei, die Auslastung von Ressourcen im Kalender auszugleichen.


[Break down by resources](https://docs.dhtmlx.com/gantt/samples/11_resources/03_break_down_by_resource.html)


Weitere Informationen zur Gruppierung von Aufgaben finden Sie im [zugehörigen Artikel](guides/grouping.md). 

### Gruppierung von Aufgaben nach mehreren Ressourcen

Wenn einer Aufgabe mehrere Ressourcen zugewiesen sind, wird sie nach diesen Ressourcen gruppiert. Das bedeutet, dass die Aufgabe nicht mehrfach für jede Person erscheint, sondern einmal mit allen zugewiesenen Personen aufgelistet wird. Gruppierte Aufgaben werden basierend auf ihrem Startdatum sortiert.

![Group resources](/img/grouping_resources.png)


[Group by multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/08_resource_usage_groups.html)


- Wenn Aufgaben im Datensatz mehreren Ressourcen zugewiesen sind, erstellt Gantt automatisch Gruppen dafür.
- Aufgaben ohne zugewiesene Ressourcen werden in eine Standardgruppe namens Not assigned eingeordnet. Existiert diese Gruppe bereits in den an die **groupBy()**-Methode übergebenen Daten, sollte sie die Konfiguration *default:true* enthalten, um eine doppelte Standardgruppe zu vermeiden.

:::note
Bitte beachten Sie, dass das Verschieben von Aufgaben, die nach mehreren Ressourcen gruppiert sind, nicht möglich ist.
:::

