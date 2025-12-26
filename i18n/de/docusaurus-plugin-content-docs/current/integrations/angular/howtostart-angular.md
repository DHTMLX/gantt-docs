---
title: "dhtmlxGantt mit Angular"
sidebar_label: "Angular"
---

# dhtmlxGantt mit Angular

Diese Anleitung setzt grundlegende Kenntnisse der Angular-Konzepte und -Muster voraus. Falls Sie eine Auffrischung benötigen, finden Sie im [Angular-Handbuch](https://angular.io/docs) ein hilfreiches Einstiegstutorial.

DHTMLX Gantt funktioniert reibungslos mit Angular. Ein entsprechendes Beispiel finden Sie auf GitHub: [DHTMLX Gantt with Angular Demo](https://github.com/DHTMLX/angular-gantt-demo).

## Projekt erstellen

Bevor Sie ein neues Projekt erstellen, stellen Sie sicher, dass [Angular CLI](https://angular.io/cli) und [Node.js](https://nodejs.org/en/) installiert sind.

~~~
ng new my-angular-gantt-app
~~~

Dieser Befehl richtet alle notwendigen Tools und Abhängigkeiten ein, sodass keine weiteren Installationsbefehle erforderlich sind.

### Installation der Abhängigkeiten

Navigieren Sie anschließend in Ihr App-Verzeichnis:

~~~
cd my-angular-gantt-app
~~~

Starten Sie die App mit einem der folgenden Befehle:

~~~
yarn start
~~~
oder

~~~
npm start
~~~

Ihre App sollte nun unter [http://localhost:4200](http://localhost:4200) erreichbar sein.

![Gantt Angular app running](/img/gantt_angular_app_run.png)

## Gantt erstellen

Im nächsten Schritt fügen Sie den DHTMLX Gantt-Code hinzu. Stoppen Sie zunächst die App mit **Strg+C** in der Kommandozeile und fahren Sie dann mit der Installation des Gantt-Pakets fort.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind über **npm/yarn** aus unserem privaten Repository verfügbar. Folgen Sie 
[dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald Sie die Evaluierungsversion von Gantt haben, installieren Sie sie mit einem der folgenden Befehle:

- für npm:

~~~
npm install @dhx/trial-gantt
~~~

- für yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternativ können Sie das Zip-Paket, das als **npm**-Modul strukturiert ist, auch 
[aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstellen Sie eine Komponente, um Gantt in Ihre Anwendung zu integrieren. Legen Sie dazu einen ***gantt***-Ordner im Verzeichnis ***src/app/*** an. Fügen Sie zwei Dateien hinzu: ***gantt.component.ts*** und ***gantt.component.css***.

### Importieren der Quelldateien

Öffnen Sie ***gantt.component.ts*** und importieren Sie die Gantt-Quelldateien. Beachten Sie den Unterschied je nach Installationsmethode:

- Wenn Sie aus einem lokalen Ordner installiert haben, sehen die Importe so aus:

**gantt.component.ts**
~~~
import { Gantt } from 'dhtmlx-gantt';
~~~

**gantt.component.css**
~~~
@import "@dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Wenn Sie die Trial-Version verwenden, sollten die Importe wie folgt aussehen:

**gantt.component.ts**
~~~
import { Gantt } from '@dhx/trial-gantt';
~~~

**gantt.component.css**
~~~
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In diesem Tutorial wird die **trial**-Version verwendet.

Die Datei ***gantt.component.ts*** dient als Vorlage für die Gantt-Komponente. Fügen Sie folgenden Code hinzu:

**gantt.component.ts**
~~~ 
import { Component, ElementRef, OnInit, 
    ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, GanttStatic } from "@dhx/trial-gantt";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
    private _gantt?: GanttStatic;

    ngOnInit() {
        let gantt = Gantt.getGanttInstance();
        gantt.init(this.ganttContainer.nativeElement);

        this._gantt = gantt;
    }
    ngOnDestroy() {
        if (this._gantt) this._gantt.destructor();
    }
}
~~~

Die Methode **ngOnInit()** initialisiert Gantt, und **ngOnDestroy()** sorgt für das Aufräumen, indem beim Entfernen der Komponente **gantt.destructor()** aufgerufen wird.

Die Styles für Gantt kommen in ***gantt.component.css***. Ein einfaches Setup könnte so aussehen:

**gantt.component.css**
~~~
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
.gantt-chart {
    position: relative;
    width: 100%;
    height: 600px;
}
~~~  

## Schritt 3. Gantt zur App hinzufügen

Fügen Sie nun die Gantt-Komponente in Ihre App ein. Öffnen Sie ***src/app/app.component.ts*** und ersetzen Sie den Standardinhalt durch:

**src/app/app.component.ts**
~~~
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DHTMLX Gantt with Angular';
}
~~~

Erstellen Sie ***app.module.ts*** im Verzeichnis ***src/app/*** und binden Sie die *GanttComponent* wie folgt ein:

**src/app/app.module.ts**
~~~
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
 
import { AppComponent } from "./app.component";
import { GanttComponent } from './gantt/gantt.component';
 
@NgModule({
  declarations: [AppComponent, GanttComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

Ersetzen Sie in ***src/app/app.component.html*** den Standardinhalt durch:

**src/app/app.component.html**
~~~
<gantt></gantt>
~~~

Ersetzen Sie abschließend den Inhalt von ***src/main.ts*** durch:

**src/main.ts**
~~~
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

Wenn Sie die App jetzt starten, sollte ein leerer Gantt-Chart angezeigt werden:

![Gantt Angular init](/img/gantt_init.png)

## Schritt 4. Daten bereitstellen

Um Daten in Angular Gantt zu laden, müssen Task- und Link-Services hinzugefügt werden. Definieren Sie zuvor die Modelle für Tasks und Links.

Erstellen Sie die Task- und Link-Modelle mit folgenden Befehlen:

~~~
ng generate class models/task --skip-tests
ng generate class models/link --skip-tests
~~~

Fügen Sie in ***models/task.ts*** Folgendes hinzu:

**models/task.ts**
~~~
export class Task {
    id!: number;
    start_date!: string;
    text!: string;
    progress!: number;
    duration!: number;
    parent!: number;
}
~~~

Fügen Sie in ***models/link.ts*** Folgendes hinzu:

**models/link.ts**
~~~
export class Link {
     id!: number;
    source!: number;
    target!: number;
    type!: string;
}
~~~

Erstellen Sie als nächstes Task- und Link-Services. Services in Angular sind Klassen, die für bestimmte Aufgaben oder Features zuständig sind und bei Bedarf injiziert werden können.

Erzeugen Sie die Services mit:

~~~
ng generate service services/task --flat --skip-tests
ng generate service services/link --flat --skip-tests
~~~

In ***services/task.service.ts*** fügen Sie Folgendes hinzu:

**services/task.service.ts**
~~~
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable()
export class TaskService {
    get(): Promise<Task[]>{
        return Promise.resolve([
            { id: 1, text: 'Task #1', start_date: '2023-04-15 00:00', 
                duration: 3, progress: 0.6, parent: 0 },
            { id: 2, text: 'Task #2', start_date: '2023-04-18 00:00', 
                duration: 3, progress: 0.4, parent: 0 }
        ]);
    }
}
~~~

In ***services/link.service.ts*** fügen Sie Folgendes hinzu:

**services/link.service.ts**
~~~
import { Injectable } from '@angular/core';
import { Link } from '../models/link';

@Injectable()
export class LinkService {
    get(): Promise<Link[]> {
        return Promise.resolve([
            { id: 1, source: 1, target: 2, type: '0' }
        ]);
    }
}
~~~

Der **@Injectable()**-Decorator ermöglicht es Angular, die Services über das Dependency-Injection-System zu instanziieren. Die **get()**-Methoden liefern aktuell fest kodierte Daten als Promise zurück, können aber angepasst werden, um Daten vom Server zu laden.

Um diese Services in der Gantt-Komponente zu verwenden, importieren Sie sie in ***gantt.component.ts***:

**gantt.component.ts**
~~~
import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
~~~

Fügen Sie die Services als Provider im **@Component**-Decorator hinzu:

**gantt.component.ts**
~~~
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
~~~

Dadurch wird mit jeder neuen *GanttComponent* eine neue Instanz jedes Service erstellt.

Fügen Sie einen Konstruktor hinzu, um die Services zu injizieren:

**gantt.component.ts**
~~~
constructor(private taskService: TaskService, private linkService: LinkService) { }
~~~

Aktualisieren Sie **ngOnInit()**, um das Datumsformat zu konfigurieren, Gantt zu initialisieren und die Daten aus den Services zu laden:

**gantt.component.ts**
~~~
let gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttContainer.nativeElement);

Promise.all([this.taskService.get(), this.linkService.get()])
    .then( ([data, links]) => {
        gantt.parse({ data, links });
    });
this._gantt = gantt;
~~~

Die vollständige ***gantt.component.ts***-Datei sieht dann so aus:

**gantt.component.ts**
~~~
import { Component, ElementRef, OnInit, 
    ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { Gantt, GanttStatic } from "@dhx/trial-gantt";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
    private _gantt?: GanttStatic;
    constructor(private taskService: TaskService, private linkService: LinkService) { }

    ngOnInit() {
        let gantt = Gantt.getGanttInstance();
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        gantt.init(this.ganttContainer.nativeElement);
        Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({ data, links });
            });
        this._gantt = gantt;
    }
    ngOnDestroy() {
        if (this._gantt) this._gantt.destructor();
    }
}
~~~

Nach dem Neuladen der App-Seite sollte der Gantt-Chart mit Tasks gefüllt angezeigt werden:

![Gantt Angular events](/img/gantt_angular_tasks.png)

## Schritt 5. Daten speichern

Um Änderungen im Gantt zu verfolgen, können Sie einen [dataProcessor](api/method/dataprocessor.md)-Handler verwenden, der die Kommunikation mit dem Server-Backend ermöglicht. Dieser Handler kann entweder als Funktion oder als Router-Objekt eingerichtet werden. dhtmlxGantt unterstützt das Zurückgeben eines Promise vom Handler, sodass Gantt das Abschließen einer Aktion korrekt behandeln kann.

Sie können einen **DataProcessor** mit der **createDataProcessor()**-API-Methode erstellen und Änderungen wie folgt erfassen:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Falls Ihr Service die Task-ID nach dem Hinzufügen eines neuen Eintrags ändert (was üblich ist), stellen Sie sicher, dass Ihr Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt. Dadurch kann Gantt den Datensatz mit der neuen Datenbank-ID aktualisieren. Weitere Details finden Sie unter [server side information](guides/server-side.md).

Damit ist Ihr Angular Gantt komplett eingerichtet. Sie können [das vollständige Demo auf GitHub erkunden](https://github.com/DHTMLX/angular-gantt-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass Gantt selbst keinen Schutz gegen Bedrohungen wie SQL-Injections oder XSS- und CSRF-Angriffe bietet. Die Sicherheit Ihrer Anwendung liegt in der Verantwortung der Backend-Entwickler.

Lesen Sie den Artikel [Application Security](guides/app-security.md), um die anfälligsten Bereiche der Komponente und Maßnahmen zur Verbesserung der Sicherheit Ihrer Anwendung kennenzulernen.
