---
title: "Besonderheiten der Gantt-Instanz"
sidebar_label: "Besonderheiten der Gantt-Instanz"
---

# Besonderheiten der Gantt-Instanz


Dieser Artikel behandelt die wichtigsten Aspekte bei der Arbeit mit einer Gantt-Instanz.

Betrachten wir ein häufiges Szenario: Der Aufbau einer Anwendung mit mehreren Seiten, Tabs oder Ansichten.

Die folgende Methode gilt für Angular-basierte (oder React-basierte) Anwendungen und ist nur in den Commercial-, Enterprise- oder Ultimate-Editionen von dhtmlxGantt verfügbar (sie wird in den GPL- oder Individual-Editionen nicht unterstützt):

- Beim Öffnen einer Seite, eines Tabs oder einer Ansicht, die ein Gantt-Diagramm enthält, sollte eine neue Gantt-Instanz erstellt werden.
- Beim Wechsel zu einer anderen Seite, einem anderen Tab oder einer anderen Ansicht muss die aktuelle Gantt-Instanz [zerstört](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances) werden.

**Alternativ** (diese Methode funktioniert mit allen Versionen) können Sie alles manuell zurücksetzen. 


:::note
Sehen Sie sich das [Beispiel](https://snippet.dhtmlx.com/5/abec296e0) an, das zeigt, wie dieser Ansatz umgesetzt werden kann. 


Durch Klicken auf die Schaltfläche **Recreate Gantt** wird Gantt initialisiert, Aufgaben geladen und Events angehängt. Das Zerstören von Gantt trennt diese Events wieder.
:::

Beachten Sie bei der Verwendung dieses manuellen Reset-Ansatzes folgende wichtige Punkte:

## Benutzerdefinierte Events

Wenn die Seite mit Gantt geladen wird, speichern Sie die Event-IDs in einem Array, bevor Sie diese hinzufügen:

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

Beim Wechsel zu einer anderen Seite trennen Sie die Events manuell mit den gespeicherten IDs:

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

Weitere Informationen finden Sie im Abschnitt [Events trennen](guides/handling-events.md#detachingevents).

## Data Processor

Der [dataProcessor](api/method/dataprocessor.md) muss manuell zerstört werden:

~~~js
dp.destructor();
~~~

Beachten Sie, dass nur der dataProcessor zerstört werden sollte, nicht die Gantt-Instanz selbst. Das Zerstören von Gantt verhindert die weitere Nutzung, bis die Seite neu geladen wird.

## Aufgaben, Verknüpfungen, Ressourcendaten, Marker, benutzerdefinierte Hotkeys

Diese können Sie sicher mit der Methode [clearAll()](api/method/clearall.md) aus der Gantt-Instanz entfernen.

## Gantt-Konfiguration

Es gibt keine integrierte Option, um die Gantt-Konfiguration zu speichern oder auf die Standardwerte zurückzusetzen. Die meisten Einstellungen werden im Objekt [gantt.config](api/overview/properties-overview.md) gespeichert.

## CSS

Falls benutzerdefiniertes CSS hinzugefügt wurde und Probleme verursacht, muss dieses manuell entfernt werden.

## Kalendereinstellungen

Kalendereinstellungen sollten manuell mit der Methode [gantt.deleteCalendar()](api/method/deletecalendar.md) entfernt werden.

## Weitere Fälle

Neben den oben genannten Punkten kann es weitere Szenarien geben, die zusätzliche Maßnahmen erfordern. Allerdings wurden mit diesem Ansatz noch nicht alle möglichen Fälle vollständig getestet.

