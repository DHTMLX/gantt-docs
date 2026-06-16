---
title: Schneller Einstieg mit Angular Gantt
sidebar_label: Schneller Einstieg
description: "Schritt-für-Schritt-Anleitung zum Rendern des offiziellen Angular Gantt-Wrappers in einer eigenständigen Angular-Anwendung."
---

# Schneller Einstieg mit Angular Gantt

Dieses Schnellstart-Beispiel verwendet eine eigenständige Angular-Anwendung und das offizielle Wrapper-Paket. Es erstellt Gantt innerhalb einer dedizierten Angular-Komponente und mountet diese Komponente in `AppComponent`, sodass das Beispiel minimal bleibt und gleichzeitig einer realistischeren App-Struktur entspricht.

## 1. Erstellen Sie ein Angular-Projekt

Erstellen Sie eine eigenständige Angular-App (Angular CLI):

~~~bash
ng new angular-gantt-quick-start --standalone --routing=false --style=css
cd angular-gantt-quick-start
~~~

Falls Angular CLI noch nicht installiert ist, installieren Sie es zuerst (`npm install -g @angular/cli`).

## 2. Installieren Sie Angular Gantt

Installieren Sie React Gantt wie in der [Angular Gantt Installationsanleitung](integrations/angular/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-angular-gantt` durch `@dhx/angular-gantt` in den Befehlen und Imports.

## 3. Globale Styles hinzufügen

Öffnen Sie `src/styles.css` und fügen Sie die Gantt-Stile hinzu:

~~~css title='src/styles.css'
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

html,
body {
  height: 100%;
  margin: 0;
}

app-root {
  display: block;
  height: 100vh;
}
~~~

Dieses Schnellstart-Beispiel verwendet einen **globalen** CSS-Import (`src/styles.css`), daher benötigen Sie kein `ViewEncapsulation.None` in `AppComponent`.

Falls Sie später den Gantt CSS-Import (oder Overrides für interne Gantt-Klassen wie `.dhx-gantt-root`) in ein Komponenten-Stylesheet verschieben, kann Angulars Standard-Stil-Kapselung diese Selektoren auf den jeweiligen Gültigkeitsbereich beschränken. Falls dies der Fall ist, setzen Sie `encapsulation: ViewEncapsulation.None` in dieser Komponente oder behalten Sie die Stile global.

## 4. Demo-Daten hinzufügen

Erstellen Sie `src/app/demo-data.ts`.

Der Wrapper exportiert `SerializedTask` und `SerializedLink` – die empfohlenen Typen für Aufgaben-/Link-Daten, die außerhalb von Gantt gehalten werden. Daten können Strings oder `Date`-Objekte sein.

~~~ts
import type { SerializedTask, SerializedLink } from '@dhtmlx/trial-angular-gantt';

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0,
  },
  {
    id: 2,
    text: 'Planning',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 4,
    progress: 0.6,
    parent: 1,
  },
  {
    id: 3,
    text: 'Implementation',
    start_date: new Date(2026, 1, 6).toISOString(),
    duration: 5,
    progress: 0.2,
    parent: 1,
  },
];

export const links: SerializedLink[] = [{ id: 1, source: 2, target: 3, type: '0' }];
~~~

## 5. Eine Gantt-Komponente erstellen

Erstellen Sie `src/app/gantt-chart.component.ts`:

~~~ts title='src/app/gantt-chart.component.ts'
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

import { links, tasks } from './demo-data';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [DhxGanttComponent],
  host: { style: 'display:block;height:100%;' },
  template: `
    <dhx-gantt
      style="display:block;height:100%;"
      [tasks]="tasks"
      [links]="links"
      [config]="config"
      [data]="dataConfig">
    </dhx-gantt>
  `,
})
export class GanttChartComponent {
  tasks = tasks;
  links = links;

  config = {
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', label: 'Start', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      console.log('save', { entity, action, item, id });
    },
  };
}
~~~

## 6. Gantt im App-Shell rendern

Ersetzen Sie `src/app/app.component.ts`:

~~~ts title='src/app/app.component.ts'
import { Component } from '@angular/core';
import { GanttChartComponent } from './gantt-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttChartComponent],
  template: `<app-gantt-chart></app-gantt-chart>`,
})
export class AppComponent {}
~~~

## 7. Anwendung starten

~~~bash
ng serve
~~~

Öffnen Sie `http://localhost:4200`. Sie sollten ein funktionsfähiges Gantt-Diagramm sehen, das Bearbeitungen über `data.save` protokolliert.

Wenn Sie Gantt zu einer bestehenden Anwendung hinzufügen, behalten Sie Ihre aktuelle `AppComponent` bei und platzieren Sie `<app-gantt-chart>` in der Zielseite bzw. dem Ziel-Component. Stellen Sie sicher, dass das übergeordnete Layout dem Gantt-Bereich eine Höhe gibt.

## Optional: Minimaler lokaler Save-Handling

Als nächsten Schritt ersetzen Sie das Logging durch eine lokale Array-Synchronisierung in `src/app/gantt-chart.component.ts`:

~~~ts title='src/app/gantt-chart.component.ts'
dataConfig: AngularGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === 'task') {
      if (action === 'create') this.tasks = [...this.tasks, item];
      if (action === 'update') {
        this.tasks = this.tasks.map((task) => String(task.id) === String(id) ? { ...task, ...item } : task);
      }
      if (action === 'delete') {
        this.tasks = this.tasks.filter((task) => String(task.id) !== String(id));
      }
    }

    if (entity === 'link') {
      if (action === 'create') this.links = [...this.links, item];
      if (action === 'update') {
        this.links = this.links.map((link) => String(link.id) === String(id) ? { ...link, ...item } : link);
      }
      if (action === 'delete') {
        this.links = this.links.filter((link) => String(link.id) !== String(id));
      }
    }
  },
};
~~~

Für Mehrfachänderungen (z. B. Auto-Planung) bevorzugen Sie `data.batchSave` und behandeln gruppierte Aktualisierungen statt einzelner Callback-Aufrufe.

## Continue With

- [Angular Gantt Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)