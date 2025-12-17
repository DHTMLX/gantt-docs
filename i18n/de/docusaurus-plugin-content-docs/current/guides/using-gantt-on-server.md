---
title: "Verwendung von Gantt auf dem Server"
sidebar_label: "Node.js Gantt"
---

Verwendung von Gantt auf dem Server
=================================

Manchmal besteht die Notwendigkeit, die spezialisierte Logik von dhtmlxGantt unabhängig vom Gantt-Diagramm selbst zu nutzen, zum Beispiel:

- Empfang von Aufgabenaktualisierungen aus anderen Quellen (wie einer mobilen App) und automatisches Planen, um die Zeitplanung verwandter Aufgaben anzupassen
- Verwaltung mehrerer Benutzer, die gleichzeitig Änderungen vornehmen, was eine Synchronisierung und Validierung des Zeitplans erfordert
- Durchführung von Berechnungen und Analyse des Zeitplans mit serverseitigem Code

Um diese Anwendungsfälle zu unterstützen, steht eine separate Version von dhtmlxGantt zur Verfügung, die serverseitig in einer Node.js-Umgebung ausgeführt wird.

DHTMLX Gantt für Node.js bietet die gleichen Funktionen wie die Commercial/Enterprise/Ultimate-Pakete, einschließlich Zugriff auf die **Gantt.getGanttInstance**-Methode zur Erstellung neuer Gantt-Instanzen.

Nutzungsbedingungen
-------------------

Das Node.js-Servermodul für DHTMLX Gantt ist ein Add-on zur Client-seitigen Version. Es kann gegen eine zusätzliche Gebühr beim Kauf von Gantt unter jeder kommerziellen Lizenz ([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)) hinzugefügt werden. Die [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/)-Lizenz enthält dieses Modul standardmäßig.

Wenn Sie bereits die Hauptbibliothek von dhtmlxGantt besitzen, kann das Node.js-Modul [separat erworben](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429) werden, und Sie erhalten einen Link zur serverseitigen Version.

Versionierung
-------------------

Das Node.js-Paket für dhtmlxGantt folgt dem gleichen Versionsschema wie die Browserpakete (z. B. ist v7.0.0 die erste Version für Node.js).

:::note
Es wird empfohlen, auf Client- und Serverseite die gleiche Version der Gantt-Bibliotheken zu verwenden.
:::

Hinzufügen der Bibliothek zum Projekt
----------------------------------

Das dhtmlxGantt für Node.js-Paket kann lokal installiert werden:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

Alternativ können Sie dhtmlxgantt.node.js direkt in Ihrem Code importieren, wie unten gezeigt:

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

Einschränkungen
------------

Die Node.js-Version von dhtmlxGantt stellt die gleiche Kern-API wie die Browserversion zur Verfügung.

Einige clientseitige Methoden sind jedoch entweder nicht verfügbar oder funktionieren in der Serverbibliothek nicht, darunter:

- Serverseitiges Rendering wird nicht unterstützt. Methoden wie [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md) usw. erzeugen kein HTML, lösen aber weiterhin zugehörige API-Ereignisse wie [onBeforeGanttRender](api/event/onbeforeganttrender.md) und [onGanttRender](api/event/onganttrender.md) aus.
- Die [Popup messages API](guides/message-boxes.md) ist nicht enthalten. Methoden wie gantt.message, gantt.alert und gantt.confirm sind nicht definiert.
- Eingebaute Ajax-Hilfsmittel wurden nicht auf Node.js portiert, daher funktionieren die gantt ajax API, [gantt.load](api/method/load.md) und die Standardroutings des dataProcessor nicht. Verwenden Sie stattdessen [gantt.parse](api/method/parse.md) und implementieren Sie ein [benutzerdefiniertes Routing für den dataProcessor](guides/server-side.md#customrouting).

:::note
Die Evaluierungsversion von dhtmlxGantt für Node.js hat eine eingeschränkte Funktionalität und erlaubt das Laden von bis zu 75 Aufgaben oder Verknüpfungen.
Wenn ein größeres Datenvolumen geladen wird, werden nur die ersten 75 Elemente verarbeitet.
:::

