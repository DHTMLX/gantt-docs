---
title: "dhtmlxGantt с Angular"
sidebar_label: "Angular"
---

# dhtmlxGantt с Angular

Вы должны быть знакомы с базовыми концепциями и паттернами Angular, чтобы пользоваться этой документацией. Если нет, обратитесь к [документации Angular](https://angular.dev/overview) для руководства по началу работы.

DHTMLX Gantt совместим с Angular. Вы можете посмотреть соответствующий пример на GitHub: [Демо DHTMLX Gantt с Angular](https://github.com/DHTMLX/angular-gantt-demo).

## Создание проекта

Прежде чем начать создание нового проекта, установите [Angular CLI](https://angular.dev/tools/cli) и [Node.js](https://nodejs.org/en/).

~~~ 
ng new my-angular-gantt-app
~~~

Вышеуказанная команда установит все необходимые инструменты и зависимости, так что вам не понадобятся дополнительные команды. 

### Установка зависимостей

После этого перейдите в директорию приложения, выполнив:

~~~ 
cd my-angular-gantt-app
~~~

Затем запустите приложение одной из следующих команд:

~~~ 
yarn start
~~~
или

~~~ 
npm start
~~~

Теперь приложение должно работать на **http://localhost:4200**.

![Gantt Angular app running](/img/gantt_angular_app_run.png)

## Создание Gantt

Теперь нам нужно получить код DHTMLX Gantt. Во-первых, остановите приложение, нажав **Ctrl+C** в командной строке. Затем можно продолжить установку пакета Gantt.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны для установки через **npm/yarn** из нашего приватного репозитория, пожалуйста, следуйте [этой инструкции](guides/installation.md#npmevaluationandproversions), чтобы получить доступ к ней.

После того как вы получите Evaluation версию Gantt, вы можете установить её с помощью следующих команд:

- для npm:

~~~ 
npm install @dhx/trial-gantt
~~~

- для yarn:

~~~ 
yarn add @dhx/trial-gantt
~~~

В качестве альтернативы, поскольку ZIP-пакет библиотеки структурирован как модуль **npm**, вы можете [установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Теперь нужно создать компонент для добавления Gantt в приложение. Создадим папку ***gantt*** в директории ***src/app/***, добавим в нее два новых файла и назовем их ***gantt.component.ts*** и ***gantt.component.css***.

### Импорт исходных файлов

Откройте файл ***gantt.component.ts*** и импортируйте исходные файлы Gantt. Обратите внимание, что:

- если вы установили пакет Gantt из локальной папки, ваши пути импорта будут выглядеть так:

~~~js title="gantt.component.ts"
import { Gantt } from 'dhtmlx-gantt';
~~~


~~~css title="gantt.component.css"
@import "@dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- если вы выбрали установить тестовую версию, пути импорта должны быть такими же, как и в:

~~~js title="gantt.component.ts"
import { Gantt } from '@dhx/trial-gantt';
~~~


~~~js title="gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве мы будем использовать **trial** версию Gantt.

Созданный файл ***gantt.component.ts*** внутри папки ***gantt*** будет содержать шаблон для Gantt. Добавим следующие строки кода в него:

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


В приведенном выше коде мы использовали метод **ngOnInit()** Angular и также указали метод **ngOnDestroy()**, который содержит вызов **gantt.destructor()** для очистки компонента, когда он больше не нужен.

Мы объявим стили Gantt в отдельном файле с именем ***gantt.component.css***. Значения по умолчанию могут выглядеть так:

~~~css title="gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
.gantt-chart {
    position: relative;
    width: 100%;
    height: 600px;
}
~~~  

## Шаг 3. Добавление Gantt в приложение

Теперь пришло время добавить компонент в наше приложение. Откройте ***src/app/app.component.ts*** и используйте компонент Gantt вместо стандартного содержимого, вставив приведённый ниже код:

~~~js title="src/app/app.component.ts"
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

Затем создайте файл ***app.module.ts*** в директории ***src/app/*** и добавьте в него *GanttComponent* следующим образом:

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

Откройте файл ***src/app/app.component.html*** и добавьте следующий код вместо стандартного содержимого:

~~~js title="src/app/app.component.html"
<gantt></gantt>
~~~

Последний шаг — открыть файл ***src/main.ts*** и заменить существующий код приведенным ниже:

~~~js title="src/main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

После этого, запустив приложение, на странице должно появиться пустое Gantt:

![Приложение Gantt Angular запущено](/img/gantt_angular_app_run.png)

## Шаг 4. Предоставление данных

Чтобы добавить загрузку данных в Angular Gantt, вам нужно создать сервисы задач и связей. Но сначала давайте определим модели задач и связей.

Для создания моделей задач и связей выполните следующие команды:

~~~ 
ng generate class models/task --skip-tests
ng generate class models/link --skip-tests
~~~

В newly created файл ***task.ts*** внутри папки ***models*** добавим следующие строки кода:

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

В newly created файл ***link.ts*** внутри папки ***models*** добавим следующие строки кода:

~~~js title="models/link.ts"
export class Link {
     id!: number;
    source!: number;
    target!: number;
    type!: string;
}
~~~

Теперь создадим сервисы задач и связей. Сервис — это класс, который будет отвечать за создание конкретной задачи или связи. Сервисы в Angular можно внедрять с помощью механизма Dependency Injection. Они могут включать данные, функции или некоторые необходимые для приложения особенности. Вам нужно создать сервис данных, который будет использоваться для предоставления Gantt задач и связей.

Для создания сервисов задач и связей выполните команды:

~~~ 
ng generate service services/task --flat --skip-tests
ng generate service services/link --flat --skip-tests
~~~

Добавьте следующие строки кода в только что созданный файл ***task.service.ts*** внутри папки ***services***:

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

и добавьте приведённые ниже строки в файл ***link.service.ts*** внутри папки ***services***:

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

Мы добавили декоратор **@Injectable()** к нашему сервису. Он помечает класс как доступный для инжектора, чтобы создать экземпляр. В дальнейшем мы внедрим его в наш компонент.

На данный момент метод **get()** возвращает уже разрешённый промис с жестко зашитыми данными. Однако вы можете загружать данные с сервера и также возвращать промис. Компонент Gantt должен использовать **TaskService** для получения задач и **LinkService** для получения связей. Чтобы включить это, добавим наши сервисы в компонент. Сначала импортируйте необходимые модули в ***gantt.component.ts***:

~~~js title="gantt.component.ts"
import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
~~~

 Также укажите **TaskService** и **LinkService** в качестве провайдеров в декораторе **@Component**:

~~~js title="gantt.component.ts"
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
~~~

Теперь каждый раз, когда инициализируется новый *GanttComponent*, будет создаваться новый экземпляр сервисов. Сервис должен быть готов к внедрению в компонент. Для этой цели добавьте конструктор в класс **GanttComponent**:

~~~js title="gantt.component.ts"
constructor(private taskService: TaskService, private linkService: LinkService) { }
~~~

Измените функцию **ngOnInit()** следующим образом:

- она должна задать формат данных для загрузки задач (XML в данном случае)
- вызвать сервисы для получения данных и затем дождаться ответа, чтобы поместить данные в gantt

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

Полный код файла ***gantt.component.ts*** будет выглядеть так:

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

Теперь, если вы снова откроете страницу приложения, вы должны увидеть Gantt с задачами:

![Gantt Angular events](/img/gantt_angular_tasks.png)

## Шаг 5. Сохранение данных

Чтобы зафиксировать изменения, внесенные в Gantt, вы можете использовать обработчик [dataProcessor](api/method/dataprocessor.md), который позволяет «общаться» с серверной частью бэкенда. Обработчик может быть объявлен либо как функция, либо как объект маршрутизатора. dhtmlxGantt принимает ответ Promise от обработчика, поэтому ваш Gantt будет корректно обрабатывать завершение действия.

Вы можете создать DataProcessor через API метод **createDataProcessor()** и зафиксировать изменения вот так:

~~~ 
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш сервис изменяет id задачи после создания новой записи (обычно так и бывает), убедитесь, что ваш Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)** в качестве результата, чтобы Gantt мог применить новый идентификатор базы данных к записи. Узнайте больше о серверной стороне [server-side](guides/server-side.md).

Итак, Angular Gantt готов, добро пожаловать к полному демо на GitHub: https://github.com/DHTMLX/angular-gantt-demo.

## Атаки XSS, CSRF и SQL Injection

Обратите внимание, что Gantt не предоставляет средств защиты от различных угроз, таких как SQL-инъекции или XSS и CSRF атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бекенд.

Ознакомьтесь со статьей [Безопасность приложения](guides/app-security.md), чтобы узнать наиболее уязвимые точки компонента и меры, которые можно принять для повышения безопасности вашего приложения.