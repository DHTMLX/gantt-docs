---
title: "Ressourcenverwaltung"
sidebar_label: "Ressourcenverwaltung"
---

# Ressourcenverwaltung

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Gantt bietet vordefinierte Ressourcenansichten zur Hervorhebung der Ressourcen-Auslastung, Methoden zum Aufschlüsseln eines Projekts nach einer Ressource zum Lastenausgleich und arbeitszeitbezogene Kalender für Aufgaben- und Ressourcenarbeiten.

![resource_panel](/img/resource_panel.png)

:::note
Obwohl Gantt selbst die Ressourcenauslastung nicht berechnet und keine out-of-the-box-Methoden bereitstellt, bietet Gantt Ihnen eine öffentliche API, um beliebiges benutzerdefiniertes Verhalten zu implementieren.
:::

## Ressourcen-Ansicht Panel {#resourceviewpanel}

dhtmlxGantt bietet zwei Arten vordefinierter Layout-Ansichten zur Anzeige der Ressourcen-Auslastung des Gantt: Ressourcen-Auslastungsdiagramm und Ressourcen-Histogramm.

### Ressourcen-Auslastungsdiagramm {#resourceloaddiagram}

Es umfasst entsprechende Ansichten für das Grid und die Timeline: "resourceGrid" und "resourceTimeline".

![resource_panel](/img/resource_panel.png)

:::note
Sie müssen für "resourceGrid" (zur Anzeige von Spalten für Ressourcen, nicht für Aufgaben) und "resourceTimeline" Ansichten jeweils eine separate [config](guides/layout-config.md#configs-and-templates-of-views) übergeben und [Templates](guides/layout-config.md#configs-and-templates-of-views), um die Anzeige der Ressourceneinsätze im Panel zu konfigurieren.
:::

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            // layout for default Grid and Timeline
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
            // layout for Grid and Timeline of resource panel
            config: resourceConfig, // config for Grid and Timeline
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


**Verwandtes Beispiel**: [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)

Nach der Initialisierung funktioniert *resourceGrid* wie die Standard-Grid-Ansicht, jedoch schreibgeschützt. *resourceTimeline* erbt die Skalenkonfiguration aus der Standard-Timeline und besitzt zwei Ebenen:

- Hintergrundzeilen, die [task_row_class](api/template/task_row_class.md) und [timeline_cell_class](api/template/timeline_cell_class.md) erben. Die Templates von *resourceTimeline* können auf Layout-Ebene neu definiert werden.
- Ressourcenschicht – eine Schicht, die speziell für *resourceTimeline* ist. Sie zeigt Blöcke in Zellen an, in denen der Resource Tasks zugewiesen sind. Der Stil der Blöcke und deren Inhalt können mit den Templates [resource_cell_class](api/template/resource_cell_class.md) und [resource_cell_value](api/template/resource_cell_value.md) definiert werden:

~~~js
gantt.templates.resource_cell_value = (startDate, endDate, resource, tasks, assignments) => 
    `<div>${tasks.length * 8}h</div>`;
~~~


**Verwandtes Beispiel**: [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)


### Ressourcen-Histogramm

Diese Layout-Ansicht zur Anzeige der Ressourcen-Auslastung von Gantt umfasst die Ansichten "resourceGrid" und "resourceHistogram" für Grid bzw. Timeline.

![Resource histogram](/img/resource_histogram.png)

:::note
Sie müssen für "resourceGrid" (zur Anzeige von Spalten für Ressourcen, nicht für Aufgaben) und "resourceHistogram" Ansichten jeweils eine separate [config](guides/layout-config.md#configs-and-templates-of-views) übergeben, und [Templates](guides/layout-config.md#configs-and-templates-of-views), um die Anzeige der Ressourceneinsätze im Panel zu konfigurieren.
:::

~~~js
gantt.config.layout = { 
    css: "gantt_container",
    rows: [
        {
            // layout for default Grid and Timeline
            gravity: 2,
            cols: [
                { view: "grid", group: "grids", scrollY: "scrollVer" },
                { resizer: true, width: 1 },
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollVer", group: "vertical" }
            ]
        },
        { resizer: true, width: 1, next: "resources" },
        {
            // layout for Grid and Timeline of resource panel
            gravity: 1,
            id: "resources",
            config: resourceConfig, // config for Grid and Timeline
            templates: resourceTemplates, // templates for Grid and Timeline
            cols: [
                { view: "resourceGrid", group: "grids", scrollY: "resourceVScroll" },
                { resizer: true, width: 1 },
                { 
                    view: "resourceHistogram", 
                    capacity: 24, 
                    scrollX: "scrollHor", 
                    scrollY: "resourceVScroll" 
                },
                { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
            ]
        },
        { view: "scrollbar", id: "scrollHor" }
    ]
};
~~~


**Verwandtes Beispiel**: [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)


Wie im Ressourcen-Auslastungsdiagramm funktioniert auch hier *resourceGrid* wie die Standard-Grid-Ansicht, jedoch schreibgeschützt. *resourceHistogram* hat die folgenden zusätzlichen Templates:

- *histogram_cell_class* – die CSS-Klasse, die auf eine Zelle des Ressourcen-Panel angewendet wird

~~~js
gantt.templates.histogram_cell_class =
    (start_date, end_date, resource, tasks, assignments) => "";
~~~

- *histogram_cell_label* – das Label innerhalb einer Zelle

~~~js
gantt.templates.histogram_cell_label =
    (start_date, end_date, resource, tasks, assignments) => tasks.length * 8;
~~~

- *histogram_cell_allocated* – die Höhe des gefüllten Bereichs im Histogramm. Der Wert kann von 0 bis *maxCapacity* festgelegt werden.

~~~js
gantt.templates.histogram_cell_allocated =
    (start_date, end_date, resource, tasks, assignments) => tasks.length * 8;
~~~

- *histogram_cell_capacity* – die Höhe der Linie, die die verfügbare Kapazität der Ressource definiert. Der Wert kann von -1 bis *maxCapacity* festgelegt werden. Werte kleiner als 0 rendern die Linie nicht.

~~~js
gantt.templates.histogram_cell_capacity =
    (start_date, end_date, resource, tasks, assignments) => 24;
~~~

**Was maxCapacity bedeutet**

Wenn jede Zeile des Histogramms als Balkendiagramm betrachtet wird, entspricht maxCapacity der Höhe der Y-Skala dieses Diagramms. Im untenstehenden Bild gilt maxCapacity = 24:




![maxCapacity](/img/maxcapacity.png)

Gibt man also in den Templates *histogram_cell_allocated* oder *histogram_cell_capacity* den Wert 24 an, bedeutet das, dass der höchste Punkt der Zeile erreicht ist.

Standardmäßig beträgt **maxCapacity** 24 für alle Ressourcen. Das bedeutet, dass, wenn Sie einen größeren Wert als 24 im Template *histogram_cell_capacity* zurückgeben, die Zahlen korrekt berechnet werden, aber der Bereich der Zellen im Ressourcenpanel nicht so gefüllt wird, wie Sie es erwarten.

![filled_capacity](/img/filled_capacity.png)

Es gibt jedoch die Möglichkeit, **maxCapacity** für das gesamte Histogramm bzw. jedes Resource separat zu konfigurieren. Unten finden Sie ein Beispiel:

**Verwandtes Beispiel**: [Configuring maxCapacity](https://snippet.dhtmlx.com/glnqcsgq)

**maxCapacity** kann entweder auf Histogramm-Ebene definiert werden:

~~~js
{ view: "resourceHistogram", capacity: 24, scrollX: "scrollHor", scrollY: "resourceVScroll" }
~~~

oder individuell für jede Ressource:

~~~js
resourcesStore.parse([
    { id: 1, text: "John", capacity: 8 },
    { id: 2, text: "Mike", capacity: 4 },
    { id: 3, text: "Anna", capacity: 8 },
    { id: 4, text: "Bill", capacity: 8 },
    { id: 5, text: "Floe", capacity: 8 }
]);
~~~

:::note
Die Kapazität, die auf Ressourcenebene definiert ist, überschreibt die globale Kapazität des Histogramms für eine gegebene Ressource.
:::

## Arbeiten mit der Ressourcen-Ansicht
Standardmäßig werden beide Ansichten (entweder "resourceGrid" und "resourceTimeline" oder "resourceGrid" und "resourceHistogram") mit dem Datenspeicher verbunden, der im
[gantt.config.resource_store](api/config/resource_store.md) konfiguriert ist.

### Automatische Erstellung des Datenspeichers

Ab Version 8.0 wird der Datenspeicher für Ressourcen automatisch während der Initialisierung von Gantt erstellt und ist zur Zeit verfügbar, wenn `onGanttReady` aufgerufen wird. Um den von Gantt erstellten Datenspeicher zu verwenden, wenden Sie die Methode [gantt.getDatastore](api/method/getdatastore.md) an.

Wenn Sie eine zusätzliche Konfiguration für den Ressourcenspeicher benötigen, können Sie die neue Option [gantt.config.resources](api/config/resources.md) verwenden:

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: item => {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    }
};
~~~

An den **resource_store** übergebene Einstellungen werden von Gantt verwendet, um den Standard-Ressourcen-Datenspeicher zu erstellen. Falls Sie den Ressourcendatenspeicher bereits in Ihrem Code erstellt haben, verwendet Gantt stattdessen Ihren Speicher.

Um Ressourcen zu laden, können Sie Ressourcen entweder in die Methoden **gantt.parse()**/**gantt.load()** wie hier beschrieben übergeben (siehe guide: loading resources) oder Sie können den Datenspeicher durchsuchen und ihn mit der Methode **datastore.parse()** befüllen:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const store = gantt.getDatastore(gantt.config.resource_store);
    store.parse([
        { id: 6, text: "John" },
        { id: 7, text: "Mike" },
        { id: 8, text: "Anna" },
        { id: 9, text: "Bill" }
    ]);
});
~~~

Der Ressourcen-Controller des Lightboxes wird automatisch mit der Ressourcenliste verbunden:

~~~js
gantt.config.lightbox = {
    sections: [
        ...,
        { name: "resource_selector", label: "Resources", type: "resource_selector", map_to: "auto" } 
    ]
};
~~~


### Manuelle Erstellung des Datenspeichers

Es ist auch möglich, den Datenspeicher manuell mithilfe der [createDatastore](api/method/createdatastore.md) Methode zu initialisieren:

~~~js
const resourcesStore = gantt.createDatastore({
    name: gantt.config.resource_store,
    // Verwenden Sie treeDatastore, wenn Sie hierarchische Ressourcen haben 
    // (z.B. Mitarbeiter/Abteilungen),
    // lassen Sie das "type"-Feld weg, wenn Sie eine flache Struktur haben
    type: "treeDatastore",
    initItem: item => {
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
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);
~~~

Wenn Sie Ressourcen im Lightbox verwenden möchten, könnte es sinnvoll sein, dies über die [serverList](api/method/serverlist.md) Methode aus dem onParse-Ereignis des Datenspeichers zu tun:

~~~js
resourcesStore.attachEvent("onParse", () => {
    const people = [];
    resourcesStore.eachItem(res => {
        if (!resourcesStore.hasChild(res.id)) {
            const copy = gantt.copy(res);
            copy.key = res.id;
            copy.label = res.text;
            people.push(copy);
        }
    });
    gantt.updateCollection("resourceOptions", people);
});
~~~

### Ausklappbares Ressourcen-Panel

Es ist möglich, das Ressourcen-Panel zu erweitern, um alle dem jeweiligen Resource zugewiesenen Aufgaben anzuzeigen, indem Sie während der Initialisierung des Datenspeichers die Eigenschaft fetchTasks aktivieren:

![Expanded resource panel](/img/expanded_resource_panel.png)

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true, /*!*/
        initItem: item => {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = !item.parent;
            return item;
        }
    }
};
~~~

oder

~~~js
gantt.$resourcesStore = gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    fetchTasks: true, /*!*/
    initItem: item => {
        item.parent = item.parent || gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = !item.parent;
        return item;
    }
});
~~~


**Verwandtes Beispiel**: [Show all assigned tasks in the resource panel](https://docs.dhtmlx.com/gantt/samples/11_resources/11_resource_histogram_display_tasks.html)


Mit der Eigenschaft **fetchTasks** auf *true* gesetzt, rendert Gantt alle Aufgaben, die einer bestimmten Ressource zugewiesen sind, im Ressourcen-Ansichtsbereich. Diese Funktionalität funktioniert sowohl für das Ressourcen-Diagramm als auch für das Ressourcen-Histogramm.

Es gibt eine Kurzform, um alle einer Ressource zugewiesenen Aufgaben abzurufen – [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6"); 
~~~

## Zuordnungen von Ressourcen {#assigningresources}

### Ressourcen mit Aufgaben verbinden 

Die Ressourcenzuordnung wird durch die Konfigurationsoption [resource_property](api/config/resource_property.md) definiert:

~~~js
gantt.config.resource_property = "user_id";
// task.user_id <-> resource.id
~~~

Ressourcen können über Eigenschaften des Aufgabenobjekts auf Aufgaben zugewiesen werden, und zwar auf eine der folgenden Arten:

- einer Ressource eine Aufgabe zuordnen

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
    user_id: 5 // 5 ist die id der Ressource 
}
~~~

- mehreren Ressourcen eine Aufgabe zuordnen

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
    users: [2, 3] // 2 und 3 sind die IDs von Ressourcen
}
~~~

Sie können dieses Format mit dem [custom multiselect control](guides/custom-editor.md#customthirdpartyeditor) verwenden. 

- mehreren Ressourcen zuordnen und deren Menge spezifizieren

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6,
    users: [{resource_id: 2, value: 8}, {resource_id: 3, value: 4}]
}
~~~

Die Ressourcen werden der Task1 wie folgt zugewiesen: Die Ressource mit der id="2" – in der Menge von 8 Einheiten, während die Ressource mit der id="3" – in der Menge von 4 Einheiten.
Dieses Format wird vom [Resources Control](guides/resources.md) und dem [Resource Assignments control](guides/resource-assignments.md) des Lightboxes unterstützt.

Seit Version 8.0 können Sie Ressourcenzuweisungen auch als separate Liste laden, und Gantt wird sie automatisch mit Tasks verknüpfen:

~~~js
gantt.parse({
    tasks: [...],
    links: [...],
    resources: [...],
    assignments: [{id: 1, resource_id: 2, task_id: 5, value: 8}, ...]
});
~~~

Weitere Informationen zu Datenformaten finden Sie [hier](guides/resource-management.md#loading-resources-and-resource-assignments).

Beim Senden von Daten an den Server serialisiert DataProcessor die Werte der beschriebenen Eigenschaften in JSON. Um der Verarbeitung solcher Datensätze auf dem Server entgegenzukommen, verwenden Sie den Modus ["REST_JSON"](guides/server-side.md#restjson)
dataprocessor.

In einigen Fällen möchten Sie Änderungen an Resource Assignments separat von Aufgabenobjekten speichern. In diesem Fall können Sie die folgende Konfiguration aktivieren:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Weitere Informationen dazu finden Sie in einem [separaten Artikel](guides/server-side.md#resources_crud).


### Festlegung der Zeiten der Ressourcenzuweisungen {#resourceassignmenttime}

Standardmäßig gilt, dass einer Ressourcenzuweisung die gesamte Dauer einer Aufgabe zugewiesen ist.

Ab Version 7.1 kann das Objekt der Ressourcenzuweisung zusätzliche optionale Parameter enthalten, die das Festlegen der Zuweisungsdaten innerhalb der Aufgabe ermöglichen. 

Die zusätzlichen Eigenschaften sind:

- **id** - (*string|number*) die ID der Zuweisung
- **start_date** - (*Date|string*) das Datum, an dem die Zuweisung beginnen soll
- **end_date** - (*Date|string*) das Datum, an dem die Zuweisung beendet sein soll
- **delay** - (*number*) der Unterschied zwischen dem Zuweisungsstartdatum und dem Startdatum der Aufgabe
- **duration** - (*number*) die Dauer der Zuweisung
- **mode** - (*string*) der Berechnungsmodus der Zeit der Ressourcenzuweisung: "default"|"fixedDates"|"fixedDuration"

~~~js {8,13-15,20-22}
{
    id: 5, text: "Interior office", type: "task", start_date: "03-04-2025 00:00",
    duration: 7, parent: "2", progress: 0.6, priority: 1,
    users: [
        {
            resource_id: "3",
            value: 8,
            delay: 1 
        },
        {
            resource_id: "6",
            value: 3,
            start_date: "03-04-2025 00:00", 
            end_date: "05-04-2025 00:00", 
            mode: "fixedDates" 
        },
        {
            resource_id: "7",
            value: 3,
            delay: 1, 
            duration: 2, 
            mode: "fixedDuration" 
        }
    ]
}
~~~


**Verwandtes Beispiel**: [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


1. Die *start- und end dates* der Ressourcenzuweisung werden im Ressourcendiagramm und -histogramm reflektiert.

2. Die optionale *id*-Eigenschaft der Zuweisung kann dem Ressourcenzuweisungsobjekt hinzugefügt werden:

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6,
    users: [{
        id: 5, 
        resource_id: 2,
        value: 8, 
        delay: 1
    }]
}
~~~

Das Zuweisungsobjekt wird dem Gantt-API über diese ID zugänglich sein:

~~~js
const assignment = gantt.getDatastore("resourceAssignments").getItem(5);
~~~

:::note
Der [resourceAssignments](api/config/resource_assignment_store.md) Datastore ist nur verfügbar, wenn die Konfiguration [process_resource_assignments](api/config/process_resource_assignments.md) aktiviert ist.
:::


3. Die Arbeit der restlichen Eigenschaften wird durch den Wert der Eigenschaft **mode** bestimmt:

- **_der Modus "default"_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6,
    users: [
        { resource_id: 2, value: 8, delay: 1},
        { resource_id: 3, value: 6},
    ]
}
~~~

Wenn der *mode* nicht angegeben ist oder auf den Wert "default" gesetzt ist, werden die *start_date* und *end_date* der Zuweisung aus den Daten der Aufgabe berechnet. Standardmäßig entspricht der Starttermin der Zuordnung dem Starttermin der Aufgabe. Die gleiche Vorgehensweise gilt für das Enddatum.

Die *delay*-Eigenschaft funktioniert ähnlich wie die *Delay*-Eigenschaft von <a href="https://support.microsoft.com/en-us/office/assignment-delay-fields-427ac799-225c-4e10-9dcb-f58e524c8173">MS Project</a>.

Wird eine Verzögerung angegeben, wird der *start_date* der Zuweisung berechnet als 

`gantt.calculateEndDate({start_date:task.start_date, duration:assignment.delay, task:task})`.

Die Ressourcenzuweisung beginnt mit der angegebenen Verzögerung ab dem Start der Aufgabe. Das Enddatum der Zuweisung entspricht dem Enddatum der Aufgabe.

Wann immer das Aufgabenobjekt aktualisiert wird, werden die Start-/Enddaten der Zuweisung entsprechend aktualisiert.

- **_der Modus "fixedDuration"_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6,
    users: [
        { resource_id: 2, value: 8, duration: 1, delay: 0, mode: "fixedDuration" },
        { resource_id: 2, value: 2, duration: 1, delay: 1, mode: "fixedDuration" },
        { resource_id: 2, value: 3, delay: 2, mode: "default" }
    ]
}
~~~

Der *start_date* der Zuweisung wird auf dieselbe Weise berechnet wie im **default**-Modus.

Das *Enddatum* ist nicht mehr an das Enddatum der Aufgabe gebunden. Es wird stattdessen berechnet als

 `gantt.calculateEndDate({start_date:assignment.start_date, duration:assignment.delay, task:task})`.

Wann immer die Aufgabe aktualisiert wird, werden die Daten der Zuweisungen neu berechnet und die Dauern der Zuweisungen bleiben unverändert.

- **_der Modus "fixedDates"_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6,
    users: [{
        resource_id: 2, value: 8,
        start_date: "03-04-2025", end_date: "11-04-2025", mode: "fixedDates"
    }]
}
~~~

In diesem Modus haben die Daten der Ressourcenzuweisung genau die gleichen Werte wie in den Daten angegeben und werden bei Änderungen der Aufgabe nicht geändert.

Das *delay*-Feld beeinflusst die Daten der Zuweisung nicht, wenn der Modus **"fixedDates"** verwendet wird.


Nachfolgend eine kurze Zusammenfassung, wie Zuweisungsdaten in jedem Modus berechnet werden:

- **default**

  - assignment.start_date = task.start_date + assignment.delay
  - assignment.end_date = task.end_date

- **fixedDuration**

  - assignment.start_date = task.start_date + assignment.delay
  - assignment.end_date = assignment.start_date + assignment.duration

- **fixedDates**

  - assignment.start_date = assignment.start_date
  - assignment.end_date = assignment.end_date


### Aufgaben, denen eine Ressource zugewiesen ist abrufen 

Es gibt eine Kurzform, um alle Aufgaben abzurufen, denen eine Ressource zugewiesen ist – [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6"); 
~~~

Die Methode nimmt als Parameter die ID der Ressource und gibt ein Array von Objekten mit den der Ressource zugewiesenen Aufgaben zurück:

~~~js
[ 
    { task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2025 00:00", end_date: "12-04-2025 00:00", 
        id: 1617258553240, mode: "default" },
    { task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2025 00:00", end_date: "09-04-2025 00:00", 
        id: 1617258553250, mode: "default" },
    { task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2025 00:00", end_date: "13-04-2025 00:00", 
        id: 1617258553251, mode: "default" },
    { task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2025 00:00", end_date: "09-04-2025 00:00", 
        id: 1617258553254, mode: "default" }
]
~~~

Jedes Objekt enthält die folgenden Eigenschaften:

- *task_id* – die ID der Aufgabe
- *resource_id* – die ID der Ressource
- *value* – die Zuordnungsmenge der Ressource zu einer Aufgabe
- *delay* – der Unterschied zwischen dem Startdatum der Zuweisung und dem Startdatum der Aufgabe
- *duration* – die Dauer der Zuweisung
- *start_date* – das Datum, an dem die Zuweisung beginnen soll
- *end_date* – das Datum, an dem die Zuweisung beendet werden soll
- *id* – die ID der Zuweisung
- *mode* – der Berechnungsmodus der Zeit der Ressourcenzuweisung: "default"|"fixedDates"|"fixedDuration"


### Ressourcen-Zuweisungen einer Aufgabe abrufen

Die Methode [getTaskAssignments](api/method/gettaskassignments.md) ermöglicht das Abrufen der geparsten Ressourcenzuweisungen einer bestimmten Aufgabe aus dem Datenspeicher:

~~~js
gantt.getTaskAssignments(5);
~~~

Die Methode nimmt als Parameter die ID der Aufgabe und gibt ein Array von Objekten mit den Ressourcenzuweisungen der Aufgabe zurück:

~~~js
[
    { task_id: 5, id: 1617254693938, delay: 0, duration: 2, 
        start_date: "03-04-2025 00:00", end_date: "05-04-2025 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 3 },
    { task_id: 5, id: 1617254693946, delay: 3, duration: 1, 
        start_date: "06-04-2025 00:00", end_date: "07-04-2025 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 6 }
]
~~~

Das Rückgabe-Objekt enthält dieselbe Liste von Eigenschaften wie das Rückgabe-Objekt der Methode getResourceAssignments(api/method/getresourceassignments.md).


### Verbindung via Lightbox herstellen

Ressourcen können jeder Eigenschaft des Aufgabenobjekts über die integrierte Lightbox zugewiesen werden.

~~~js
gantt.serverList("people", [
    { key: 1, label: "John" },
    { key: 2, label: "Mike" },
    { key: 3, label: "Anna" },
    { key: 4, label: "Bill" },
    { key: 7, label: "Floe" }
]);

gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "owner", map_to: "owner_id", type: "select",
        options: gantt.serverList("people") },
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

Lesen Sie, wie Sie die Ressourcensteuerung des Lightboxes konfigurieren, in den Artikeln Resources Control und Resource Assignments control.

### Laden von Sammlungen

Sammlungen, die als Server-Listen angegeben sind, können dynamisch geladen und aktualisiert werden, nachdem Gantt initialisiert wurde:

~~~js
// initialisiere Lightbox mit einer leeren Sammlung 
gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "owner", map_to: "owner_id", type: "select",
        options: gantt.serverList("people") },
    { name: "time", type: "duration", map_to: "auto" }
];

// sobald Optionen geladen sind 
gantt.updateCollection("people", [
    { key: 1, label: "John" },
    { key: 2, label: "Mike" },
    { key: 3, label: "Anna" },
    { key: 4, label: "Bill" },
    { key: 7, label: "Floe" }
]);
~~~

![resource_management](/img/resource_management.png)


**Verwandtes Beispiel**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


Wenn Sie Ressourcen über die *serverList* Sammlung definieren, können sie zusammen mit dem Rest der Daten geladen werden; andernfalls müssen Sie sie manuell laden.

Lesen Sie, wie Sie die Ressourcensteuerung des Lightboxes konfigurieren, in den Artikeln Resources control und Resource Assignments control.

## Laden von Ressourcen und Ressourcenzuweisungen

Seit Version 8.0 können Ressourcen und Ressourcenzuweisungen in Gantt mit [gantt.parse()](api/method/parse.md) oder [gantt.load()](api/method/load.md) Methoden geladen werden:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2025 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2025 00:00",
                    end_date: "05-04-2025 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        { id: 8, text: "Anna", unit: "hours/day" },
        { id: 9, text: "Bill", unit: "hours/day" },
        { id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

Ressourcenzuweisungen können separat von Aufgaben in das Objekt übergeben werden:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2025 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        ...
    ],
    links: [],
    assignments: [
        {
            id: 1,
            task_id: 5,
            resource_id: 6,
            value: 3,
            start_date: "03-04-2025 00:00",
            end_date: "05-04-2025 00:00"
        }
    ],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        { id: 8, text: "Anna", unit: "hours/day" },
        { id: 9, text: "Bill", unit: "hours/day" },
        { id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

## Verwalten von Ressourcenzuweisungen {#managingresourceassignments}

### Parsen von Ressourcenzuweisungen

Ab Version 7.1 können Sie mit den [resource assignments](guides/resource-management.md#resourceassignmenttime) genauso arbeiten wie mit Objekten des Datenspeichers.

Die neue Eigenschaft [process_resource_assignments](api/config/process_resource_assignments.md) ermöglicht das Parsen der Werte aus dem [gantt.config.resource_property](api/config/resource_property.md) von Aufgaben in die internen Objekte der Ressourcenzuweisungen. Dadurch können Sie die Ressourcenzuweisungen über das DataStore-Objekt manipulieren. Beispielsweise können Sie das benötigte Zuweisungsobjekt abrufen oder es aktualisieren.

Hinweis: Diese Funktionalität ist erforderlich, wenn Sie die gewünschte Dauer und Zeit für die Ressourcen festlegen möchten, wenn Sie das Resource Diagramm und Histogramm erstellen (Guides Resource Management).

Der Prozess kann zu deutlich spürbaren Leistungs Einbußen führen und bei Großprojekten die Arbeit verlangsamen. Wenn Sie Zeit oder Dauer der Zuweisung nicht benötigen, können Sie das Parsen der Ressourcenzuweisungen über die Konfiguration deaktivieren:

~~~js
gantt.config.process_resource_assignments = false;
~~~

Wenn die Konfiguration deaktiviert ist, steht der Datastore `gantt.getDatastore("resourceAssignments")` nicht zur Verfügung und die Zuweisungsobjekte verfügen über keine dynamischen Eigenschaften. Das Ressourcendiagramm und das Histogramm gehen davon aus, dass Ressourcen der gesamten Dauer der Aufgabe zugewiesen sind.

### Aktualisieren von Ressourcenzuweisungen

Die Ressourcenzuweisungen werden im [Data Store](api/config/resource_assignment_store.md) gespeichert, der automatisch erstellt wird.

Standardmäßig wird der Zuweisungs-Store aus den Aufgabenobjekten befüllt. Das bedeutet, dass, wenn Sie die Ressourceneigenschaft des Aufgabenobjekts (z. B. task.users) ändern, die Änderungen automatisch im Datenspeicher widergespiegelt werden.

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2025 00:00",
        end_date: "05-04-2025 00:00",
    }
];

gantt.updateTask(taskId);
~~~

Sie müssen jedoch möglicherweise die Daten der Zuweisungen in die andere Richtung aktualisieren. Das bedeutet, Sie müssen die Änderungen am Aufgabenobjekt nach Modifikationen der Zuweisungen über den Datastore auf das Aufgabenobjekt übertragen, indem Sie die Methode [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md) aufrufen:

~~~js
const assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});

assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// nachdem die Zuweisungen im Datastore aktualisiert wurden, müssen Sie 
// `updateTaskAssignments` aufrufen, um die Änderungen auf das Aufgabenobjekt zu schreiben:
gantt.updateTaskAssignments(taskId);
~~~

### Neu rendern von Ressourcenzuweisungen während des Task-Drag-Vorgangs

Wenn eine Aufgabe gezogen wird, wird das Ressourcen-Panel erneut gerendert, aber die Ressourcenzuweisungen werden nicht geändert. Nur die Zellen des Ressourcen-Panels, die vom Ziehen der Aufgabe betroffen sind (standardmäßig nur jene innerhalb der Aufgaben-Daten), werden erneut gerendert.

Um die Ressourcenzuweisungen in allen Zellen zu aktualisieren, müssen Sie entweder die [process_resource_assignments](api/config/process_resource_assignments.md) Konfigurationsoption deaktivieren oder alle Ressourcenzuweisungen der Aufgabe manuell aktualisieren, wie im folgenden Beispiel gezeigt:

~~~js
gantt.attachEvent("onTaskDrag", (id, mode, task, original) => {
    const assignments = gantt.getTaskAssignments(id);
    assignments.forEach(assignment => {
        if (assignment.mode === "default") {
            assignment.start_date = task.start_date;
            assignment.end_date = task.end_date;
        }
    });
});
~~~

## Anzeigen des Aufgaben-Ressourcen-Namens

Der Ressourcenname kann als Teil der Aufgabenbeschreibung oder als Beschriftung einer der Spalten im Grid angezeigt werden.
Gantt bietet keine fertige Methode, um ein in der Serverliste angegebenes Element anhand seiner ID abzurufen, daher müssen Sie eine kleine Hilfsfunktion implementieren:

~~~js
const byId = (list, id) => {
    const item = list.find(item => item.key === id);
    return item ? item.label || "" : "";
};
~~~

Anschließend können Sie den Ressourcen-Namen in Templates verwenden:

~~~js
gantt.config.columns = [
    { name: "owner", width: 80, align: "center",
        template: (item) => byId(gantt.serverList('people'), item.owner_id) },
    { name: "text", label: "Task name", tree: true, width: '*' },
    { name: "add", width: 40 }
];

gantt.templates.rightside_text =
    (start, end, task) => byId(gantt.serverList('people'), task.owner_id);
~~~


**Verwandtes Beispiel**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


## Bearbeitbare Ressourcen-Diagramm

Um Ressourcenzuweisungen im Ressourcen-Diagramm bearbeitbar zu machen, können Sie die folgende Konfiguration verwenden:

~~~js
gantt.config.resources = {
    editable_resource_diagram: true
};
~~~


**Verwandtes Beispiel**: [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


Wenn die Eigenschaft **editable_resource_diagram** aktiviert ist, weist Gantt automatisch [gantt.templates.resource_cell_value](api/template/resource_cell_value.md) und [gantt.templates.resource_cell_class](api/template/resource_cell_class.md) Templates zu, um Ressourcenzuweisungen im Gantt bearbeitbar zu machen.

Wenn Sie benutzerdefinierte Funktionen diesen Templates zuweisen, verwendet Gantt Templates, die von Ihnen definiert wurden.

Die Standardimplementierung der Templates finden Sie im Objekt **gantt.ext.resources**.

~~~js
gantt.templates.resource_cell_value = gantt.ext.resources.editableResourceCellTemplate;
gantt.templates.resource_cell_class = gantt.ext.resources.editableResourceCellClass;
~~~

Normalerweise müssen Sie diese Templates für ein bearbeitbares Diagramm nicht manuell zuweisen; es wird erwartet, dass Gantt dies verwaltet.

Im untenstehenden Beispiel wird ein Template mit bearbeitbaren Zellen bereitgestellt. Falls gewünscht, können Sie es anpassen:

**Verwandtes Beispiel**: [Customizable resource diagram template](https://snippet.dhtmlx.com/libwuna4?tag="gantt")

## Benutzerdefiniertes Styling von Ressourcen

Für Farbgebung benötigen Sie üblicherweise die folgenden Templates:

- [gantt.templates.grid_row_class](api/template/grid_row_class.md) – die CSS-Klasse einer Zeile im linken Grid
- [gantt.templates.task_row_class](api/template/task_row_class.md) – der Hintergrund der Timeline-Zeile (wird nicht aufgerufen, falls [smart_rendering](api/config/smart_rendering.md) aktiviert ist)
- [gantt.templates.task_class](api/template/task_class.md) – die CSS-Klasse eines Aufgabenbalkens

Je nach Kontext können Sie
- entweder vordefinierte Klassen für jede Ressource verwenden, oder
- Styling laden, z. B. Hintergrund- und Textfarben zusammen mit den Ressourcen. In diesem Fall müssen Sie [CSS dynamisch auf der Seite generieren](guides/colouring-tasks.md#loadingcolorswithdata)

**Verwandtes Beispiel**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


## Ressourcenkalender

Gantt unterstützt die Funktion der benutzerdefinierten Arbeitszeitkalender. Arbeitszeitkalender können bestimmten Ressourcen zugeordnet werden.

![resource_calendars](/img/resource_calendars.png)

Sie werden Aufgaben über den Eigenschaftswert in einer Eins-zu-eins-Beziehung zugeordnet:

~~~js
// ein Ressourcenwert wird aus der Eigenschaft `task.resource_id` entnommen
gantt.config.resource_property = "resource_id";

gantt.config.resource_calendars = {
    "resource1" : "calendarId1",
    "resource2" : "calendarId2",
    "resource3" : "calendarId3"
};
~~~

Sie können jede Eigenschaft verwenden, um Kalender Ressourcen zuzuordnen. Wenn die Ressourcen-Eigenschaft dynamisch geändert wird, berechnet Gantt automatisch die Zeiten der Tasks mit dem neuen Kalender neu.

**Verwandtes Beispiel**: [Resource calendars](https://docs.dhtmlx.com/gantt/samples/11_resources/02_resource_calendars.html)


Falls mehreren Ressourcen einem Task zugewiesen werden können, kann Gantt automatisch einen gemeinsamen Kalender für alle zugewiesenen Ressourcen generieren:

Siehe dazu den entsprechenden Artikel [Dynamic Resource Calendars](api/config/dynamic_resource_calendars.md) bzw. guides/working-time.md#assigningcalendartoresource.

## Ausgleichen der Ressourcen-Auslastung {#balancingresourceload}

Sie können die [Grouping-Erweiterung](guides/extensions-list.md#grouping) verwenden, um das gesamte Projekt nach der Eigenschaft **resource** aufzuschlüsseln.

![resource_break_down](/img/resource_break_down.png)

Diese Funktion kann zur Ausbalancierung der Ressourcen-Auslastung im Kalender verwendet werden.

**Verwandtes Beispiel**: [Break down by resources](https://docs.dhtmlx.com/gantt/samples/11_resources/03_break_down_by_resource.html)


Weitere Informationen zur Gruppierung von Aufgaben finden Sie im [verwandten Artikel](guides/grouping.md). 

### Gruppierung von Aufgaben nach mehreren Ressourcen 

Falls Sie mehreren Ressourcen eine Aufgabe zuweisen, werden Aufgaben nach den zugewiesenen Ressourcen gruppiert. Das bedeutet, dass eine Aufgabe, die zwei Personen zugewiesen ist, nicht für jede von ihnen dupliziert wird. Stattdessen wird sie einmal gerendert, wobei beide Personen zugewiesen sind. Beachten Sie, dass gruppierte Aufgaben nach dem Startdatum sortiert werden.

![Group resources](/img/grouping_resources.png)


**Verwandtes Beispiel**: [Group by multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/08_resource_usage_groups.html)


- Wenn in den geladenen Daten mehreren Ressourcen eine Aufgabe zugewiesen sind, erstellt Gantt automatisch Gruppen dafür. 
- Für Aufgaben ohne zugewiesene Ressourcen erstellt Gantt die Standardgruppe Not assigned. Falls eine solche Gruppe bereits in den in die Gruppe übergebenen Daten vorhanden ist und die Methode **groupBy()** verwendet wird, sollte diese Gruppe mit der Einstellung *default:true* konfiguriert sein, um das automatische Erzeugen einer solchen Gruppe zu verhindern.

:::note
Bitte beachten Sie, dass das Ziehen von Aufgaben, die nach mehreren Ressourcen gruppiert sind, unmöglich ist.
:::