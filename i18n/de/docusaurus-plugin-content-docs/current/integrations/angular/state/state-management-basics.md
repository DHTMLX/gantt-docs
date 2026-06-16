---
title: Datenbindung und Zustandsverwaltung in Angular Gantt
sidebar_label: Grundlagen
description: "Wählen Sie das richtige Modell der Datenhoheit, implementieren Sie Callback-Verträge und vermeiden Sie Synchronisationsfallen in Angular Gantt."
---

# Datenbindung und Zustandsverwaltung in Angular Gantt

Angular Gantt unterstützt zwei Modelle der Datenhoheit:

1. **Angular-Zustand/Store als Quelle der Wahrheit** (empfohlen für die meisten Anwendungen).
2. **Gantt als Quelle der Wahrheit** (leistungsorientiert für spezialisierte Seiten).

Wählen Sie pro Seite/Funktionsbereich jeweils ein Modell und halten Sie es konsistent.

## Angular-Zustand/Store Als Quelle Der Wahrheit

In diesem Modell:

- Ihr Komponenten-Zustand oder RxJS-Store besitzt `tasks` und `links`,
- der Wrapper erhält Arrays über Inputs,
- Diagrammänderungen werden über `data.save` oder `data.batchSave` erfasst,
- Callback-Funktionen aktualisieren Ihren Zustand/Ihren Store und neue Arrays fließen zurück in `<dhx-gantt>`.

### Am besten geeignet Für

- Angular-Seiten mit Werkzeugleisten/Formularen, die mit dem Diagramm synchron bleiben müssen,
- Team-Codebasen, die bereits auf Services und RxJS basieren,
- vorhersehbare Zustandsübergänge und einfacheres Debugging.

### Kompromisse

- mehr Aktualisierungen des Anwendungszustands bei schweren Diagrammoperationen,
- häufigere Synchronisationsarbeiten bei Massenedits.

### Anti-Patternen, die vermieden werden sollten

- Daten durch `instance` mutieren, während gleichzeitig veraltete `tasks`/`links`-Arrays aus dem Angular-Zustand übertragen werden,
- `data.save` / `data.batchSave` ignorieren und erwarten, dass Diagrammbearbeitungen automatisch im App-Zustand gespiegelt bleiben.

### Vollständiges Fluss-Beispiel (Komponentenstatus)

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
  type SerializedTask,
  type SerializedLink,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links" [data]="dataConfig"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks: SerializedTask[] = [];
  links: SerializedLink[] = [];

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        if (action === 'create') this.tasks = [...this.tasks, item];
        if (action === 'update') this.tasks = this.tasks.map((t) => String(t.id) === String(id) ? { ...t, ...item } : t);
        if (action === 'delete') this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));
      }

      if (entity === 'link') {
        if (action === 'create') this.links = [...this.links, item];
        if (action === 'update') this.links = this.links.map((l) => String(l.id) === String(id) ? { ...l, ...item } : l);
        if (action === 'delete') this.links = this.links.filter((l) => String(l.id) !== String(id));
      }
    },
  };
}
~~~

## Gantt Als Quelle Der Wahrheit

In diesem Modell besitzt das Diagramm und das Backend den Großteil des Laufzeitdatenlebenszyklus.

### Am besten geeignet Für

- sehr große Datensätze,
- diagrammzentrierte Bildschirme,
- schwere automatische Planung oder verkettete Bearbeitungen, bei denen häufige Updates des Anwendungszustands teuer sind.

### Kompromisse

- weniger unmittelbare Sichtbarkeit des Live-Diagrammzustands in Angular-Diensten/Komponenten,
- zusätzliche Disziplin erforderlich, wenn gelegentliche Eingabeaktualisierungen mit imperativen Operationen gemischt werden.

### Anti-Patternen zu vermeiden

- teilweise Spiegelung ohne klaren Abgleichplan,
- erneutes Einlesen veralteter Server-Schnappschüsse, nachdem Benutzer Daten im Diagramm bereits geändert haben.

### Server-Transport-Beispiel

~~~ts
dataConfig = {
  load: '/api/gantt/load',
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === 'delete' ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload, id }),
    });

    return await response.json();
  },
};
~~~

Verwenden Sie dies, wenn Ihr Backend der maßgebliche Zustand ist und Angular nicht jede Bearbeitung in Echtzeit spiegeln muss.

## Callback-Verträge {#callback-contracts}

### `data.save`

`save` wird an `gantt.createDataProcessor(save)` übergeben und empfängt Änderungs-Payloads.

Typische Funktionsform:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

Verwenden Sie dies, wenn Änderungen überwiegend einzeln sind und sich einfach einzelnen Änderungen anwenden lassen.

### `data.batchSave`

`batchSave` erhält gruppierte Payloads:

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

Zuordnung von Entität zu Bucket umfasst:

- `task` / `tasks` -> `tasks`
- `link` / `links` -> `links`
- `resource` / `resources` -> `resources`
- `assignment` / `resourceAssignment` / `resourceAssignments` -> `resourceAssignments`

Warteschlangen-Verhalten zusammengefasst:

- kleine debounce-basierte Batch-Verarbeitung,
- `create` + `update` zu einer einzigen `create` mit den neuesten Daten zusammengeführt,
- `create` + `delete` werden entfernt,
- internes `!nativeeditor_status` wird aus den Payloads entfernt.

Verwenden Sie dies, wenn eine Diagrammaktion viele nachgelagerte Änderungen auslösen kann.

## Daten in den Angular-Zustand Laden

### Lokaler Komponentenstatus

Verwenden Sie lokale Felder der Komponente für kleine Seiten oder Prototypen.

Laden Sie Daten in Angular und weisen Sie dann die Arrays den Inputs `tasks` und `links` zu. Halten Sie Callback-Handler in derselben Komponente.

### RxJS-Services / Stores (empfohlen für mittelgroße bis große Apps)

Verwenden Sie einen injizierbaren Service mit einem `BehaviorSubject` (oder Ähnlichem) zur Speicherung von Tasks, Links und UI-Zustand.

Dies ist das Muster, das im öffentlichen Angular-Beispiel verwendet wird und in [Verwendung von Angular Gantt mit RxJS](integrations/angular/state/rxjs.md) dokumentiert ist.

### Daten aus einer API in den Angular-Zustand laden

Typischer Ablauf:

1. Daten in einem Service oder Route-Resolver abrufen.
2. Gegebenenfalls Datumsformate normalisieren oder abbilden.
3. Daten in Ihren Store/Komponentenstatus pushen.
4. Die Arrays an `<dhx-gantt>` übergeben.
5. Änderungen mit `data.save` oder `data.batchSave` behandeln und ins Backend persistieren.

Verwenden Sie dies, wenn der Angular-Zustand Ihre Quelle der Wahrheit ist und das Backend weiterhin die langfristig persistente Quelle bleibt.

## Gantt Als Quelle Der Wahrheit In Einer Angular App

### Wann dieses Modell Sinn macht

Wählen Sie es, wenn die Seite größtenteils das Diagramm ist und die umgebende Angular-Oberfläche nicht auf jedes Task/Link-Update reagieren muss.

### Bereitstellung von Initialdaten

Sie können Gantt-verwaltete Daten mit einer der folgenden Muster initialisieren:

- `data.load` URL
- `data.load` Funktion (sync oder async)
- anfängliche `tasks`/`links`-Arrays, anschließend nicht mehr als live Source-of-Truth inputs behandeln

### Wie Updates funktionieren

Die Gantt-Instanz wendet Benutzereingaben intern an und sendet sie über `save` oder `batchSave`.

Angular muss `tasks`/`links` nach jeder Änderung nicht neu zuweisen, es sei denn, Sie möchten sie explizit spiegeln.

## ID-Remapping Und Backend-Verantwortung

Erstellaktionen beginnen oft mit temporären clientseitigen IDs.

- Im `save`-Modus sollten Backend-Antworten persistente IDs zurückgeben, damit Gantt interne Datensätze neu zuordnen kann.
- Im `batchSave`-Modus gibt es keinen Rückgabepfad pro Element, daher muss die ID-Remapping explizit in Ihrem Persistenz-Workflow gehandhabt werden, falls das Backend neue IDs zuweist.

Das Backend bleibt verantwortlich für:

- Validierung,
- Berechtigungsprüfungen,
- persistente ID-Zuweisung,
- konsistente Antwort-Payloads.

## Weiter Mit

- [Verwendung von Angular Gantt mit RxJS](integrations/angular/state/rxjs.md)
- [Konfigurationsreferenz](integrations/angular/configuration-props.md)
- [Überblick über Angular Gantt](integrations/angular/overview.md)