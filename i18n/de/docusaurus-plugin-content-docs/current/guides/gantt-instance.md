---
title: "Besonderheiten der Gantt-Instanz"
sidebar_label: "Besonderheiten der Gantt-Instanz"
---

# Besonderheiten der Gantt-Instanz

Dieser Artikel hebt die wichtigsten Merkmale der Verwendung der Gantt-Instanz hervor.

Betrachten wir den häufigsten Fall – der Aufbau einer Anwendung mit mehreren Seiten/Tabs/Ansichten. 

Der folgende Ansatz kann auf Angular-basierten (oder React-basierten) Apps anwendbar sein und ist nur in der Commercial-, Enterprise- oder Ultimate-Version von dhtmlxGantt verfügbar (und nicht in der GPL- oder Individual-Edition):

- Wenn Sie eine Seite/Tab/Ansicht mit Gantt öffnen, müssen Sie eine neue Gantt-Instanz erstellen;
- Wenn Sie zu einer anderen Seite/zu einem anderen Tab/zu einer anderen Ansicht wechseln, müssen Sie die Gantt-Instanz [destroy the Gantt instance](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances).

**Der alternative Ansatz** (der für alle Versionen funktioniert) besteht darin, alles manuell selbst zurückzusetzen. 


:::note
Prüfen Sie das [Beispiel](https://snippet.dhtmlx.com/5/abec296e0), das demonstriert, wie der Ansatz implementiert werden kann. 


Wenn Sie auf die **Recreate Gantt**-Schaltfläche klicken, initialisiert sich Gantt, lädt Aufgaben und hängt die Ereignisse an. Wenn Sie Gantt zerstören, werden die Ereignisse abgetrennt.
:::

Hier ist die Liste der Dinge, die Sie beachten sollten, wenn Sie diesen Weg verwenden:

## Benutzerdefinierte Ereignisse

Wenn Sie die Seite mit Gantt laden, müssen Sie die IDs der Ereignisse manuell in einem Array speichern, bevor Sie sie hinzufügen:

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

Wenn Sie zu einer anderen Seite wechseln, müssen Sie die Ereignisse manuell mithilfe der IDs lösen, die Sie in einem Array gespeichert haben:

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

Für weitere Details siehe den Abschnitt [das Lösen von Ereignissen](guides/handling-events.md#detaching-events).

## Datenprozessor

Sie müssen [dataProcessor](api/method/dataprocessor.md) manuell zerstören:

~~~js
dp.destructor();
~~~

Bitte beachten Sie, dass Sie nur dataProcessor zerstören müssen, nicht Gantt. Andernfalls können Sie Gantt erst nach Neuladen der Seite wieder verwenden.

## Aufgaben, Verknüpfungen, Ressourcendaten, Markierungen, benutzerdefinierte Tastenkombinationen

Sie können diese Daten sicher aus der Gantt-Instanz entfernen, indem Sie die Methode [clearAll()](api/method/clearall.md) verwenden.

## Gantt-Konfiguration

Es gibt keinen eingebauten Weg, ihn zu speichern oder die Gantt-Konfiguration auf die Standardwerte zurückzusetzen. Der Großteil der Gantt-Konfiguration wird im [gantt.config](api/overview/properties-overview.md) Objekt gespeichert.

## CSS

Wenn Sie benutzerdefiniertes CSS hinzugefügt haben, müssen Sie es manuell entfernen, falls es Probleme verursacht.

## Kalender-Einstellungen

Sie müssen sie manuell mit der Methode [gantt.deleteCalendar()](api/method/deletecalendar.md) entfernen.

## Andere Fälle

Abgesehen von den oben beschriebenen Punkten müssen Sie möglicherweise noch weitere Optionen implementieren, aber wir haben noch nicht alle möglichen Szenarien dieses Ansatzes getestet.