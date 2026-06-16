---
title: "Angular Gantt"
sidebar_label: Angular Gantt
description: "Installieren, konfigurieren und DHTMLX Gantt in Angular mit dem offiziellen Wrapper verwenden."
---

Angular Gantt ist der offizielle Angular-Wrapper für DHTMLX Gantt. Es bietet Ihnen eine Angular-Komponenten-API für das Diagramm, während der Zugriff auf die vollständige Gantt-Engine erhalten bleibt.

:::tip KI-gestützte Entwicklung
Wenn Sie einen KI-Codierassistenten verwenden, kann die [DHTMLX Angular Gantt Agent Skill](integrations/ai-tools/agent-skills.md#available-skills) ihm dabei helfen, korrekte Wrapper-Integrationsmuster zu befolgen – übereinstimmende CSS-Imports sicherzustellen, eine explizite Höhenkette bereitzustellen, ein Datenbesitzmodell auszuwählen, Daten rund um `data.save` / `data.batchSave` zu normalisieren und das App-Theme durch Gantt-CSS-Variablen abzubilden. Für eine Echtzeit-API-Referenz verbinden Sie den [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md).
:::

## Was Sie mit dem Wrapper erhalten

- Deklarative Eingaben für `tasks`, `links`, `config`, `templates`, `plugins`, `theme` und `locale`.
- Inkrementelle Synchronisierung für Aktualisierungen von Aufgaben/Verknüpfungen mit einer Fallback-Neu-Parse bei größeren Änderungen.
- Daten-Transport-Callbacks über `data.load`, `data.save` und `data.batchSave`.
- Ereignisregistrierung über die `events`-Karte und Lebenszykluszugriff über `(ready)`.
- Rendering der Angular-Komponente innerhalb von Gantt-Vorlagen über `templateComponent(...)`.
- Unterstützung fortgeschrittener Datensätze und Funktionen (`resources`, `resourceAssignments`, `baselines`, `calendars`, `markers`, `groupTasks`, `resourceFilter`).

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 520px;">
      <dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [{ id: 1, text: 'Task', start_date: '2026-02-02 00:00', duration: 3, parent: 0 }];
  links = [];
}
~~~

Wenn Sie zuerst die vollständige Fähigkeitsübersicht wünschen, beginnen Sie mit [Angular Gantt Overview](integrations/angular/overview.md).

## Empfohlener Lernpfad

Folgen Sie dieser Reihenfolge, wenn Sie neu beim Wrapper sind:

1. [Installation](integrations/angular/installation.md): wählen Sie den richtigen Package-Kanal und die Importe.
2. [Quick Start](integrations/angular/quick-start.md): rendern Sie Ihr erstes Diagramm in einer eigenständigen Angular-App.
3. [Configuration Reference](integrations/angular/configuration-props.md): lernen Sie jeden Input, Output und Callback-Vertrag kennen.
4. [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md): wählen Sie Ihr Datenbesitzmodell.
5. [RxJS State Management Tutorial](integrations/angular/state/rxjs.md): implementieren Sie ein store-gesteuertes Muster mit `BehaviorSubject` und `AsyncPipe`.

## Beispiele

Durchsuchen Sie die öffentlichen Angular Gantt-Beispiele für ausführbare Demos des Wrappers:

- [Live Demo](https://dhtmlx.github.io/angular-gantt-examples/)
- [GitHub Repository](https://github.com/DHTMLX/angular-gantt-examples)

Wenn Sie Angular Gantt bewerten, bietet die Evaluierungsseite Zugriff auf technischen Support während der Evaluierungsphase. Siehe [Installation](integrations/angular/installation.md).