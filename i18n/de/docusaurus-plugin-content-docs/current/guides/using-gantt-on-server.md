---
title: "Gantt auf dem Server verwenden"
sidebar_label: "Node.js Gantt"
---

# Gantt auf dem Server verwenden

In einigen Fällen benötigen Sie möglicherweise eine spezialisierte Logik von dhtmlxGantt separat vom Gantt-Diagramm, zum Beispiel:

- Wenn Sie ein Update einer Aufgabe aus einer anderen Quelle erhalten (z. B. von der mobilen App) und die Auto-Scheduling durchführen müssen, um die Zeitplanung der verwandten Aufgaben zu aktualisieren
- Wenn mehrere Benutzer derselben App gleichzeitig Änderungen vornehmen können und Sie den Zeitplan synchronisieren und validieren müssen
- Wenn Sie Berechnungen durchführen und den Zeitplan mit Ihrem Servercode analysieren müssen

Aus diesem Grund bieten wir eine separate Build von dhtmlxGantt an, die serverseitig in der Node.js-Umgebung laufen kann.

DHTMLX Gantt für Node.js hat die gleiche Funktionalität wie die Commercial/Enterprise/Ultimate-Pakete, was bedeutet, dass die Methode **Gantt.getGanttInstance** verfügbar ist und das Erstellen einer neuen Instanz eines Gantt ermöglicht.

## Nutzungsbedingungen


Das Node.js-Servermodul von DHTMLX Gantt wird als Add-on-Paket zur clientseitigen Version von Gantt bereitgestellt. Daher können Sie die Node.js-Build gegen eine zusätzliche Gebühr hinzufügen, während Sie Gantt unter jeder kommerziellen Lizenz erwerben ([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)). Die [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) Lizenz umfasst es standardmäßig.

Falls Sie bereits die Hauptbibliothek von dhtmlxGantt erworben haben, können Sie [das Node.js-Modul separat erwerben](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429) und wir senden Ihnen einen Link zur serverseitigen Version von Gantt.

## Versionierung


dhtmlxGantt verwendet für das Node.js-Paket dasselbe Versionsnummerierungsschema wie für die Browser-Pakete (zum Beispiel ist v7.0.0 die erste Version von Gantt für ein Node.js-Paket).

:::note
Wir advi s e Ihnen, dieselbe Version der Gantt-Bibliotheken auf der Client-Seite wie auf der Server-Seite zu verwenden.
:::

## Die Bibliothek zum Projekt hinzufügen


Sie können dhtmlxGantt für Node.js als lokales Paket installieren:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~


Oder Sie können dhtmlxgantt.node.js direkt aus Ihrem Code importieren, wie folgt:

~~~js
import { Gantt } from "@dhtmlx/gantt-node";

const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    config: {
        work_time: true,
        duration_unit: "hour",
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: false
    },
    data: {
        tasks: [
            { id: 1, text: "Project #1", type: "project", parent: 0 },
            { id: 2, start_date: "05-04-2020 00:00", text: "Task #1", duration: 1, 
            parent: 1, type: "task" },
            { id: 3, start_date: "05-04-2020 00:00", text: "Task #2", duration: 3, 
            parent: 1, type: "task" },
            { id: 4, start_date: "05-04-2020 00:00", text: "Task #3", duration: 3, 
            parent: 1, type: "task" },
            { id: 5, start_date: "05-04-2020 00:00", text: "Task #4", duration: 3, 
            parent: 1, type: "task" },
            { id: 6, start_date: "05-04-2020 00:00", text: "Task #5", duration: 1, 
            parent: 1, type: "task" }
        ], 
        links: [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 4, target: 5, type: "0" },
            { id: 5, source: 5, target: 6, type: "0" }
        ]
    },
    events:{
        onAfterAutoSchedule: function(taskId, updatedTasks) {
            console.log("Following tasks were auto scheduled:");
            console.table(updatedTasks.map((taskId) => {
                return {
                    id: taskId,
                    text: this.getTask(taskId).text
                };
            }));
        },
        onParse: function() {
            console.log("Loaded data:")
            console.table(this.serialize().data);
        },
        onGanttReady: () => {
            console.log("Running dhtmlxGantt on the backend");
        }
    }
});

console.table(gantt.serialize());
~~~


## Einschränkungen


dhtmlxGantt bietet dieselbe Kern-API für Node.js wie die Browser-Version.

Allerdings funktionieren einige Methoden, die in der clientseitigen Version von Gantt verfügbar sind, möglicherweise nicht oder sind in der Server-Bibliothek nicht definiert, nämlich:

- Server-seitiges Rendering ist nicht implementiert. Das Aufrufen solcher Methoden wie [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md) usw. erzeugt kein HTML, löst jedoch verwandte API-Ereignisse aus, zum Beispiel [onBeforeGanttRender](api/event/onbeforeganttrender.md), [onGanttRender](api/event/onganttrender.md) usw.
- [Popup messages API](guides/message-boxes.md) ist nicht in das Node-Paket aufgenommen. Die Methoden gantt.message, gantt.alert, gantt.confirm werden undefiniert sein.
- [Built-in ajax helpers](api/other/ajax.md) wurden nicht nach Node.js portiert, sodass weder die gantt ajax API noch [gantt.load](api/method/load.md) noch Standarddatenprozessor-Routings funktionieren. Sie müssen [gantt.parse](api/method/parse.md) und [benutzerdefinierte Routing des dataProcessor](guides/server-side.md#customrouting) verwenden.

:::note
Die Evaluierungsversion von dhtmlxGantt für Node.js hat eingeschränkte Funktionalität, die das Laden von bis zu 75 Aufgaben oder Verknüpfungen erlaubt.
Wenn Sie versuchen, einen größeren Datensatz zu laden, werden nur die ersten 75 Elemente geladen.
:::