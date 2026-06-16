---
title: "Daten- und Zustandsverwaltung"
description: "Wie Angular-verwaltete oder Gantt-verwaltete Datenflüsse in Angular Gantt ausgewählt und implementiert werden."
---

Dieser Abschnitt erklärt, wie Sie Daten in Angular Gantt konsistent mit Ihrer Angular UI, Ihren RxJS-Stores und dem Backend-Verhalten halten.

## Erste Schritte

Lesen Sie zuerst [Grundlagen der Datenbindung und Zustandsverwaltung](integrations/angular/state/state-management-basics.md).

Dieser Artikel erklärt:

- Angular-Zustand/Store als zentrale Quelle der Wahrheit,
- Gantt als zentrale Quelle der Wahrheit,
- `data.save`- und `data.batchSave`-Callback-Verträge.

## Wählen Sie Ihr Modell der Datenverantwortung

Verwenden Sie **Angular-Zustand oder -Store als Quelle der Wahrheit**, wenn:

- die umgebende Angular UI den Diagrammstatus jederzeit widerspiegeln muss,
- Sie verwenden einen RxJS-Service/Store oder eine zentrale State-Schicht,
- vorhersehbare unidirektionale Aktualisierungen wichtiger sind als der rohe Bearbeitungsdurchsatz.

Verwenden Sie **Gantt als Quelle der Wahrheit**, wenn:

- die Seite diagrammzentriert ist,
- das Update-Volumen hoch ist,
- Sie die Belastung des Anwendungs-Stores bei häufigen Diagrammänderungen reduzieren möchten.

## RxJS-Tutorial

Verwenden Sie [RxJS-Tutorial](integrations/angular/state/rxjs.md) für eine praxisnahe, store-gesteuerte Implementierung, die auf `BehaviorSubject`, `AsyncPipe`, Rückgängig/Wiederherstellen und `data.batchSave` aufgebaut ist.

## Minimalstarter-Muster

~~~ts
readonly dataConfig: AngularGanttDataConfig = {
  batchSave: (changes) => this.ganttState.applyBatch(changes),
};
~~~

Wobei `ganttState` ein injizierter `GanttStateService` ist (siehe das [RxJS-Tutorial](integrations/angular/state/rxjs.md) für die Service-Struktur). Verwenden Sie dieses Muster, wenn eine Benutzeraktion viele Aufgaben/Verknüpfungsaktualisierungen erzeugen kann.

## Leistungs-Hinweis

Für Vorgänge wie die automatische Terminplanung bevorzugen Sie `data.batchSave` gegenüber einzelnen Änderungen `data.save`, damit Ihre Angular-Zustandsaktualisierungen in gruppierten Chargen erfolgen.

Die Form der Callback-Verträge und die Abwägungen sind in [Grundlagen](integrations/angular/state/state-management-basics.md#callback-contracts) dokumentiert.