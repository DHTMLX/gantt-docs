---
title: dhtmlxGantt mit Angular
sidebar_label: Niedrigstufige Integration
description: "Schritt-für-Schritt-Anleitung zur Verwendung des JS DHTMLX Gantt in Angular ohne das offizielle Angular-Wrapping."
---

# dhtmlxGantt mit Angular

:::note
Dieses Tutorial zeigt, wie man das JS DHTMLX Gantt direkt in einer Angular-App ohne das offizielle Wrapper verwendet.

Wenn Sie Angular-Eingaben/Ausgaben, wrapper-gesteuerte Synchronisation und Angular-Template-Komponente-Unterstützung benötigen, verwenden Sie stattdessen [Angular Gantt](integrations/angular.md).
:::

Sie sollten mit grundlegenden Angular-Konzepten (Komponenten, Lifecycle-Hooks, Services) vertraut sein. Wenn nicht, beginnen Sie mit der [Angular-Dokumentation](https://angular.dev/overview).

DHTMLX Gantt ist mit Angular kompatibel. Sie können das zugehörige Demo-Repository auf GitHub prüfen: [DHTMLX Gantt with Angular Demo](https://github.com/DHTMLX/angular-gantt-demo).

## Creating A Project
## Erstellen eines Projekts

Bevor Sie beginnen, installieren Sie [Node.js](https://nodejs.org/en/) und [Angular CLI](https://angular.dev/tools/cli).

Erstellen Sie eine neue Angular-Anwendung:

~~~bash
ng new my-angular-gantt-app --standalone --routing=false --style=css
cd my-angular-gantt-app
~~~

Starten Sie die App einmal, um zu prüfen, ob das Projekt funktioniert:

- npm: `npm start`
- yarn: `yarn start`
- oder CLI: `ng serve`

Die App sollte unter `http://localhost:4200` erreichbar sein.

## Creating Gantt
## Gantt erstellen

Stoppen Sie den Dev-Server (`Ctrl+C`) bevor Sie das Gantt-Paket installieren.

## Step 1. Package Installation
## Schritt 1. Paketinstallation

Professionelle Builds der JS Gantt-Bibliothek sind über private npm verfügbar. Folgen Sie der [Installationsanleitung](guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Evaluations-Build (öffentliches Paket für Tutorials):

- npm:

~~~bash
npm install @dhx/trial-gantt
~~~

- yarn:

~~~bash
yarn add @dhx/trial-gantt
~~~

Professioneller Build (privates npm):

- npm:

~~~bash
npm install @dhx/gantt
~~~

- yarn:

~~~bash
yarn add @dhx/gantt
~~~

Sie können Gantt auch [aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder), weil das Paket als npm-Modul strukturiert ist.

## Step 2. Create A Gantt Component
## Schritt 2. Eine Gantt-Komponente erstellen

Erstellen Sie eine neue Komponente für die direkte JS-Gantt-Integration:

~~~bash
ng generate component gantt --skip-tests
~~~

### Import Gantt Source Files
### Importieren der Gantt-Quelldateien

Öffnen Sie `src/app/gantt/gantt.component.ts` und importieren Sie das Gantt-Paket.

Wenn Sie den Evaluations-Build installiert haben:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';
~~~

Wenn Sie den professionellen Build installiert haben:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/gantt';
~~~

Fügen Sie Gantt-Stile in `src/app/gantt/gantt.component.css` hinzu.

Evaluations-Build:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

Professioneller Build:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/gantt/dist/dhtmlxgantt.css";
~~~

### Initialize Gantt In Angular Lifecycle Hooks
### Gantt in Angular-Lebenszyklus-Hooks initialisieren

Ersetzen Sie `src/app/gantt/gantt.component.ts` durch eine minimale direkte Integration:

~~~ts title="src/app/gantt/gantt.component.ts"
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';

@Component({
  selector: 'app-gantt',
  standalone: true,
  template: `<div #ganttHost class="gantt-chart"></div>`,
  styleUrl: './gantt.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GanttComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ganttHost', { static: true }) ganttHost!: ElementRef<HTMLElement>;

  private gantt: GanttStatic | null = null;

  ngAfterViewInit(): void {
    const gantt = Gantt.getGanttInstance();
    gantt.init(this.ganttHost.nativeElement);
    this.gantt = gantt;
  }

  ngOnDestroy(): void {
    this.gantt?.destructor();
    this.gantt = null;
  }
}
~~~

Fügen Sie dem Container-Größenangaben in `src/app/gantt/gantt.component.css` hinzu:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

.gantt-chart {
  width: 100%;
  height: 600px;
}
~~~

## Step 3. Add Gantt To The App
## Schritt 3. Gantt in die App einbinden

Ersetzen Sie `src/app/app.component.ts`, damit die App Ihre Gantt-Komponente rendert:

~~~ts title="src/app/app.component.ts"
import { Component } from '@angular/core';
import { GanttComponent } from './gantt/gantt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttComponent],
  template: `<app-gantt></app-gantt>`,
})
export class AppComponent {}
~~~

Nach dem Start der App sollten Sie ein leeres Gantt-Diagramm sehen.

## Step 4. Provide Data
## Schritt 4. Daten bereitstellen

Erstellen Sie `src/app/demo-data.ts` mit einem kleinen Datensatz:

~~~ts title="src/app/demo-data.ts"
export function getData() {
  return {
    data: [
      {
        id: 10,
        text: 'Project #1',
        start_date: '2026-02-02 00:00',
        duration: 6,
        progress: 0.4,
        open: true,
      },
      {
        id: 1,
        text: 'Task #1',
        start_date: '2026-02-02 00:00',
        duration: 2,
        progress: 0.6,
        parent: 10,
      },
      {
        id: 2,
        text: 'Task #2',
        start_date: '2026-02-04 00:00',
        duration: 3,
        progress: 0.2,
        parent: 10,
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: '0' }],
  };
}
~~~

Importieren Sie nun die Daten und parsen Sie sie in `GanttComponent`:

~~~ts title="src/app/gantt/gantt.component.ts"
import { getData } from '../demo-data';

// ...inside ngAfterViewInit()
const gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttHost.nativeElement);
gantt.parse(getData());
this.gantt = gantt;
~~~

Wenn Sie die App neu laden, sollten Sie ein Gantt-Diagramm mit Aufgaben und einer Verknüpfung sehen.

## Step 5. Save Data
## Schritt 5. Daten speichern

Um Änderungen zu erfassen, die im Diagramm vorgenommen wurden, verwenden Sie einen [dataProcessor](api/method/dataprocessor.md). Er kann Änderungen an Ihr Backend senden oder sie einfach protokollieren, während Sie die Integration aufbauen.

~~~ts title="src/app/gantt/gantt.component.ts"
// ...inside ngAfterViewInit(), after gantt.init(...)
gantt.createDataProcessor((entity, action, data, id) => {
  console.log('[dp]', entity, action, data, id);
});
~~~

DHTMLX Gantt akzeptiert Promise-Antworten von `dataProcessor`-Handlern. Falls Ihr Backend IDs bei der Erstellung ändert, geben Sie ein Objekt wie `{ id: newId }` oder `{ tid: newId }` zurück, damit Gantt den Datensatz neu abbilden kann.

Siehe [server-side integration](guides/server-side.md) für vollständige Backend-Muster.

## XSS, CSRF Und SQL-Injection-Angriffe
## XSS-, CSRF- und SQL-Injection-Angriffe

Gantt schützt Ihre Anwendung nicht vor Backend-Sicherheitsproblemen (SQL-Injection, XSS, CSRF). Backend-Validierung, Autorisierung und Ausgabensanitisierung bleiben Ihre Verantwortung.

Lesen Sie [Anwendungssicherheit](guides/app-security.md) für die wichtigsten Risikobereiche und Hinweise zur Minderung.