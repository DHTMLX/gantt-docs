---
title: "dhtmlxGantt mit Angular"
sidebar_label: "Angular"
---

# dhtmlxGantt mit Angular

Sie sollten mit den grundlegenden Konzepten und Mustern von Angular vertraut sein, um diese Dokumentation zu verwenden. Falls Sie nicht damit vertraut sind, lesen Sie bitte die [Angular-Dokumentation](https://angular.dev/overview) für eine Einstiegsanleitung.

DHTMLX Gantt ist mit Angular kompatibel. Sie können das entsprechende Beispiel auf GitHub prüfen: [DHTMLX Gantt mit Angular Demo](https://github.com/DHTMLX/angular-gantt-demo).

## Erstellung eines Projekts

Bevor Sie mit der Erstellung eines neuen Projekts beginnen, installieren Sie [Angular CLI](https://angular.dev/tools/cli) und [Node.js](https://nodejs.org/en/).

~~~
ng new my-angular-gantt-app
~~~

Der obige Befehl installiert alle notwendigen Werkzeuge und Abhängigkeiten, sodass Sie keine zusätzlichen Befehle benötigen. 

### Installation der Abhängigkeiten

Wechseln Sie anschließend in das App-Verzeichnis, indem Sie Folgendes ausführen:

~~~
cd my-angular-gantt-app
~~~

Führen Sie anschließend die App mit einem der folgenden Befehle aus:

~~~
yarn start
~~~
oder

~~~
npm start
~~~

Nun sollte die Anwendung unter **http://localhost:4200** laufen.

![Gantt Angular app running](/img/gantt_angular_app_run.png)

## Erstellen von Gantt

Nun sollten wir den DHTMLX Gantt-Code erhalten. Zunächst müssen wir die Anwendung durch Drücken von **Ctrl+C** in der Befehlszeile stoppen. Danach können wir mit der Installation des Gantt-Pakets fortfahren.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek stehen für die **npm/yarn**-Installation aus unserem privaten Repository zur Verfügung. Bitte folgen Sie [dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff darauf zu erhalten.

Nachdem Sie die Evaluierungsversion des Gantt erhalten haben, können Sie sie mit den folgenden Befehlen installieren:

- für npm:

~~~
npm install @dhx/trial-gantt
~~~

- für yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternativ, da das Zip-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie es [von einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Erstellung der Komponente

Nun sollten wir eine Komponente erstellen, um einen Gantt in die Anwendung einzufügen. Erstellen Sie einen Ordner ***gantt*** im Verzeichnis ***src/app/***, fügen Sie zwei neue Dateien hinzu und nennen Sie sie ***gantt.component.ts*** und ***gantt.component.css***.

### Import der Quelldateien

Öffnen Sie die Datei ***gantt.component.ts*** und importieren Sie die Gantt-Quelldateien. Beachten Sie, dass:

- Wenn Sie das Gantt-Paket aus einem lokalen Ordner installiert haben, werden Ihre Importpfade wie folgt aussehen:


~~~js title="gantt.component.ts"
import { Gantt } from 'dhtmlx-gantt';
~~~


~~~css title="gantt.component.css"
@import "@dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Wenn Sie sich entschieden haben, die Trial-Version zu installieren, sollten die Importpfade wie folgt lauten:


~~~js title="gantt.component.ts"
import { Gantt } from '@dhx/trial-gantt';
~~~


~~~js title="gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In diesem Tutorial verwenden wir die **trial**-Version von Gantt.

Die neu erstellte ***gantt.component.ts***-Datei im Ordner ***gantt*** wird die Vorlage für den Gantt enthalten. Fügen Sie die folgenden Codezeilen dazu ein:


~~~js title="gantt.component.ts"
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

Im obigen Code haben wir die **ngOnInit()**-Methode von Angular verwendet und auch die **ngOnDestroy()**-Methode angegeben, die den Aufruf **gantt.destructor()** enthält, um die Komponente zu löschen, wenn sie nicht mehr benötigt wird.

Die Styles für Gantt deklarieren wir in einer separaten Datei mit dem Namen ***gantt.component.css***. Die Standardstile können so aussehen:


~~~css title="gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
.gantt-chart {
    position: relative;
    width: 100%;
    height: 600px;
}
~~~  

## Schritt 3. Gantt in die App einfügen

Nun ist es Zeit, die Komponente in unsere App einzufügen. Öffnen Sie ***src/app/app.component.ts*** und verwenden Sie die Gantt-Komponente statt des Standardinhalts, indem Sie den untenstehenden Code einfügen:


~~~js title="src/app/app.component.ts"
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DHTMLX Gantt mit Angular';
}
~~~

Erstellen Sie dann die Datei ***app.module.ts*** im Verzeichnis ***src/app/*** und fügen Sie die *GanttComponent* wie unten vorgesehen ein: 


~~~js title="src/app/app.module.ts"
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

Öffnen Sie die Datei ***src/app/app.component.html*** und fügen Sie den folgenden Code anstelle des Standardinhalts hinzu:


~~~js title="src/app/app.component.html"
<gantt></gantt>
~~~

Der letzte Schritt ist, die ***src/main.ts***-Datei zu öffnen und den vorhandenen Code durch den folgenden zu ersetzen:


~~~js title="src/main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

Nachdem Sie die App gestartet haben, sollten Sie eine leere Gantt-Seite sehen: 

![Gantt Angular init](/img/gantt_init.png)

## Schritt 4. Bereitstellung von Daten

Um dem Angular Gantt das Laden von Daten hinzuzufügen, müssen Sie Task- und Link-Services hinzufügen. Bevor Sie das tun, definieren wir jedoch die Task- und Link-Modelle.

Für die Erstellung der Task- und Link-Modelle führen Sie folgende Befehle aus:


~~~
ng generate class models/task --skip-tests
ng generate class models/link --skip-tests
~~~

In der neu erstellten ***task.ts***-Datei im Ordner ***models*** fügen wir die folgenden Codezeilen hinzu:


~~~js title="models/task.ts"
export class Task {
    id!: number;
    start_date!: string;
    text!: string;
    progress!: number;
    duration!: number;
    parent!: number;
}
~~~

In der neu erstellten ***link.ts***-Datei im Ordner ***models*** fügen wir die folgenden Codezeilen hinzu:


~~~js title="models/link.ts"
export class Link {
     id!: number;
    source!: number;
    target!: number;
    type!: string;
}
~~~

Nun erstellen wir Task- und Link-Services. Ein Service ist eine Klasse, die dafür verantwortlich ist, eine bestimmte Task oder einen bestimmten Link zu erstellen. Dienste in Angular können über Dependency Injection injiziert werden. Sie können Daten, Funktionen oder einige für die Anwendung notwendige Features enthalten. Sie müssen einen Data-Service erstellen, der dem Gantt Tasks und Links bereitstellt.

Für die Erstellung der Task- und Link-Services führen Sie folgende Befehle aus:


~~~
ng generate service services/task --flat --skip-tests
ng generate service services/link --flat --skip-tests
~~~

Fügen Sie die folgenden Codezeilen in die neu erstellte ***task.service.ts***-Datei im Ordner ***services*** ein:


~~~js title="services/task.service.ts"
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

und fügen Sie die folgenden Zeilen in die ***link.service.ts***-Datei im Ordner ***services*** ein:


~~~js title="services/link.service.ts"
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

Wir haben dem Service den **@Injectable()**-Dekorator hinzugefügt. Er kennzeichnet eine Klasse als verfügbar für einen Injector, um sie zu instanziieren. Wir werden ihn weiter in unsere Komponente injizieren.

Derzeit gibt die **get()**-Methode ein aufgelöstes Promise mit harten Daten zurück. Sie können jedoch Daten auch von der Serverseite laden und ebenfalls ein Promise zurückgeben. Die Gantt-Komponente soll **TaskService** verwenden, um die Tasks zu erhalten, und **LinkService**, um die Verknüpfungen zu erhalten. Um dies zu ermöglichen, fügen Sie unsere Services der Komponente hinzu. Importieren Sie zunächst die notwendigen Module in ***gantt.component.ts***:


~~~js title="gantt.component.ts"
import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
~~~

Sie sollten außerdem **TaskService** und **LinkService** als Provider im **@Component**-Dekorator angeben:


~~~js title="gantt.component.ts"
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
~~~

Nun wird jedes Mal, wenn eine neue *GanttComponent*-Instanz initialisiert wird, eine frische Instanz der Services erstellt. Der Service sollte darauf vorbereitet sein, in die Komponente injiziert zu werden. Zu diesem Zweck fügen Sie dem **GanttComponent**-Konstruktor Folgendes hinzu:


~~~js title="gantt.component.ts"
constructor(private taskService: TaskService, private linkService: LinkService) { }
~~~

Passen Sie die **ngOnInit()**-Funktion folgendermaßen an:

- Es sollte das Datenformat für das Laden von Tasks festlegen (in diesem Fall XML)
- Die Services aufrufen, um die Daten abzurufen, und anschließend auf eine Antwort warten, um die Daten in den gantt zu laden


~~~js title="gantt.component.ts"
let gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttContainer.nativeElement);

Promise.all([this.taskService.get(), this.linkService.get()])
    .then( ([data, links]) => {
        gantt.parse({ data, links });
    });
this._gantt = gantt;
~~~

Der vollständige Code der ***gantt.component.ts***-Datei sieht dann so aus:


~~~js title="gantt.component.ts"
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

Wenn Sie die App erneut öffnen, sollten Sie Gantt mit Aufgaben sehen:

![Gantt Angular events](/img/gantt_angular_tasks.png)

## Schritt 5. Speichern von Daten

Um Änderungen im Gantt zu erfassen, können Sie einen [dataProcessor](api/method/dataprocessor.md) Handler verwenden, der die Kommunikation mit dem serverseitigen Backend ermöglicht. Der Handler kann entweder als Funktion oder als Router-Objekt deklariert werden. dhtmlxGantt akzeptiert eine Promise-Antwort vom Handler, sodass Ihr Gantt die Fertigstellung einer Aktion korrekt verarbeitet. 

Sie können einen **DataProcessor** über die API-Methode **createDataProcessor()** erstellen und Änderungen so erfassen:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Wenn Ihr Service nach dem Erstellen eines neuen Datensatzes die Task-ID ändert (was normalerweise der Fall ist), stellen Sie sicher, dass Ihre Promise als Ergebnis ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt, damit Gantt die neue Datenbank-ID dem Datensatz zuweisen kann. Weitere Informationen zur Serverseite finden Sie unter [serverseitige Informationen](guides/server-side.md).

Nun ist Angular Gantt bereit. Sie können sich gerne die vollständige Demo auf GitHub ansehen: [Vollständige Demo zu Angular Gantt](https://github.com/DHTMLX/angular-gantt-demo).

## XSS-, CSRF- und SQL-Injektionsangriffe

Beachten Sie, dass Gantt keinerlei Mittel bietet, eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie z. B. SQL-Injektionen oder XSS- und CSRF-Angriffe. Es liegt in der Verantwortung der Entwickler, die das Backend implementieren, die Sicherheit der Anwendung zu gewährleisten.

Schauen Sie sich den Artikel [Anwendungssicherheit](guides/app-security.md) an, um die verwundbarsten Punkte der Komponente und die Maßnahmen zur Verbesserung der Sicherheit Ihrer Anwendung kennenzulernen.