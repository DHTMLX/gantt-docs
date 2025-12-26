---
title: "dhtmlxGantt с Angular"
sidebar_label: "Angular"
---

# dhtmlxGantt с Angular

Это руководство предполагает базовое понимание концепций и паттернов Angular. Если вам нужно освежить знания, ознакомьтесь с [документацией Angular](https://angular.io/docs), где есть полезный вводный туториал.

DHTMLX Gantt отлично работает с Angular. Пример интеграции можно найти на GitHub: [DHTMLX Gantt with Angular Demo](https://github.com/DHTMLX/angular-gantt-demo).

## Создание проекта

Перед созданием нового проекта убедитесь, что у вас установлены [Angular CLI](https://angular.io/cli) и [Node.js](https://nodejs.org/en/).

~~~
ng new my-angular-gantt-app
~~~

Эта команда установит все необходимые инструменты и зависимости, дополнительных команд установки не требуется.

### Установка зависимостей

Далее перейдите в директорию вашего приложения:

~~~
cd my-angular-gantt-app
~~~

Запустите приложение с помощью одной из команд:

~~~
yarn start
~~~
или

~~~
npm start
~~~

Теперь ваше приложение будет доступно по адресу [http://localhost:4200](http://localhost:4200).

![Gantt Angular app running](/img/gantt_angular_app_run.png)

## Создание Gantt

Следующий шаг - получить код DHTMLX Gantt. Сначала остановите приложение, нажав **Ctrl+C** в командной строке, затем установите пакет Gantt.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions) для получения доступа.

Когда у вас будет Evaluation-версия Gantt, установите её одной из следующих команд:

- для npm:

~~~
npm install @dhx/trial-gantt
~~~

- для yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Также, так как zip-пакет структурирован как модуль **npm**, вы можете 
[установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Создайте компонент для интеграции Gantt в ваше приложение. Начните с создания папки ***gantt*** внутри директории ***src/app/***. Добавьте два файла: ***gantt.component.ts*** и ***gantt.component.css***.

### Импорт исходных файлов

Откройте ***gantt.component.ts*** и импортируйте исходные файлы Gantt. Обратите внимание на разницу в зависимости от способа установки:

- Если установлен из локальной папки, импорты выглядят так:

**gantt.component.ts**
~~~
import { Gantt } from 'dhtmlx-gantt';
~~~

**gantt.component.css**
~~~
@import "@dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Если используется trial-версия, импорты должны быть такими:

**gantt.component.ts**
~~~
import { Gantt } from '@dhx/trial-gantt';
~~~

**gantt.component.css**
~~~
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве используется **trial**-версия.

Файл ***gantt.component.ts*** будет служить шаблоном для компонента Gantt. Добавьте следующий код:

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

Здесь метод **ngOnInit()** инициализирует Gantt, а **ngOnDestroy()** выполняет очистку, вызывая **gantt.destructor()** при удалении компонента.

Стили для Gantt размещаются в ***gantt.component.css***. Пример базовой настройки стилей:

**gantt.component.css**
~~~
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
.gantt-chart {
    position: relative;
    width: 100%;
    height: 600px;
}
~~~  

## Шаг 3. Добавление Gantt в приложение

Далее добавьте компонент Gantt в приложение. Откройте ***src/app/app.component.ts*** и замените содержимое на:

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

Создайте ***app.module.ts*** в ***src/app/*** и подключите *GanttComponent* следующим образом:

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

В файле ***src/app/app.component.html*** замените содержимое на:

**src/app/app.component.html**
~~~
<gantt></gantt>
~~~

Наконец, обновите ***src/main.ts***, заменив его содержимое на:

**src/main.ts**
~~~
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

Теперь при запуске приложения должен отобразиться пустой график Gantt:

![Gantt Angular init](/img/gantt_init.png)

## Шаг 4. Загрузка данных

Чтобы загрузить данные в Angular Gantt, необходимо добавить сервисы для задач и связей. Прежде чем это сделать, определите модели задач и связей.

Создайте модели задач и связей следующими командами:

~~~
ng generate class models/task --skip-tests
ng generate class models/link --skip-tests
~~~

В файле ***models/task.ts*** добавьте:

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

В файле ***models/link.ts*** добавьте:

**models/link.ts**
~~~
export class Link {
     id!: number;
    source!: number;
    target!: number;
    type!: string;
}
~~~

Теперь создайте сервисы задач и связей. Сервисы в Angular - это классы, отвечающие за выполнение определённых задач или функций, которые можно внедрять в нужные компоненты.

Создайте сервисы командами:

~~~
ng generate service services/task --flat --skip-tests
ng generate service services/link --flat --skip-tests
~~~

В файле ***services/task.service.ts*** добавьте:

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

В файле ***services/link.service.ts*** добавьте:

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

Декоратор **@Injectable()** позволяет сервисам создаваться системой внедрения зависимостей Angular. Методы **get()** сейчас возвращают захардкоженные данные в промисах, но их можно адаптировать для получения данных с сервера.

Чтобы использовать эти сервисы в компоненте Gantt, импортируйте их в ***gantt.component.ts***:

**gantt.component.ts**
~~~
import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
~~~

Добавьте сервисы в провайдеры декоратора **@Component**:

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

Это гарантирует создание нового экземпляра каждого сервиса для каждого нового *GanttComponent*.

Добавьте конструктор для внедрения сервисов:

**gantt.component.ts**
~~~
constructor(private taskService: TaskService, private linkService: LinkService) { }
~~~

Обновите **ngOnInit()**, чтобы настроить формат даты, инициализировать Gantt и загрузить данные из сервисов:

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

Полный файл ***gantt.component.ts*** будет выглядеть так:

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

После перезагрузки страницы приложения вы увидите Gantt с загруженными задачами:

![Gantt Angular events](/img/gantt_angular_tasks.png)

## Шаг 5. Сохранение данных

Для отслеживания изменений в Gantt вы можете использовать обработчик [dataProcessor](api/method/dataprocessor.md), который позволяет взаимодействовать с серверной частью. Этот обработчик можно настроить как функцию или как объект-роутер. dhtmlxGantt поддерживает возврат Promise из обработчика, что позволяет корректно обрабатывать завершение действия.

Создать **DataProcessor** можно с помощью метода **createDataProcessor()** API и отслеживать изменения следующим образом:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш сервис меняет id задачи после добавления новой записи (что обычно бывает), убедитесь, что ваш Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)**. Это позволит Gantt обновить запись с новым id из базы данных. Подробнее см. [информацию о серверной части](guides/server-side.md).

Теперь ваш Angular Gantt полностью готов. Вы также можете [посмотреть полный демо-пример на GitHub](https://github.com/DHTMLX/angular-gantt-demo).

## XSS, CSRF и SQL-инъекции

Обратите внимание, что сам Gantt не обеспечивает защиту от таких угроз, как SQL-инъекции, XSS или CSRF-атаки. За безопасность приложения отвечает команда разработчиков серверной части.

Ознакомьтесь со статьёй [Application Security](guides/app-security.md), чтобы узнать о наиболее уязвимых местах компонента и о шагах, которые можно предпринять для повышения безопасности вашего приложения.
