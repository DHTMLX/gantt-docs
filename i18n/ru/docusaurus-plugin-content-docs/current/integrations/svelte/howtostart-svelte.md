--- 
title: "dhtmlxGantt с Svelte" 
sidebar_label: "Svelte" 
---

# dhtmlxGantt с Svelte

Вы должны быть знакомы с базовыми концепциями и паттернами Svelte, чтобы использовать эту документацию. Если нет, обратитесь к [документации Svelte](https://svelte.dev/) для пошагового руководства.

DHTMLX Gantt совместим с Svelte. Вы можете проверить соответствующий пример на GitHub: [DHTMLX Gantt with Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## Создание проекта

Прежде чем начать создание нового проекта, установите [Vite](https://vite.dev/) (опционально) и [Node.js](https://nodejs.org/en/).

Чтобы создать проект на Svelte, мы будем использовать Svelte с Vite и выполним следующую команду:

~~~ 
npm create vite@latest
~~~ 

Подробнее см. в [соответствующей статье](https://svelte.dev/docs/svelte/overview).

### Установка зависимостей

Далее нужно перейти в директорию приложения. Назовем наш проект **gantt-svelte** и выберем опцию **svelte**, затем запустим:

~~~ 
cd gantt-svelte
~~~ 

После этого следует установить зависимости и запустить приложение. Для этого нужно воспользоваться менеджером пакетов:

- если вы используете **yarn**, выполните следующие команды:

~~~ 
yarn install
yarn dev
~~~ 

- если вы используете **npm**, выполните следующие команды:

~~~ 
npm install
npm run dev
~~~ 

Теперь ваше Svelte-проект должен запуститься по адресу **http://localhost:5173**.

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## Создание Gantt

Теперь нам нужно получить код DHTMLX Gantt. Сначала нужно остановить приложение, нажав **Ctrl+C** в командной строке. Затем можно приступить к установке пакета Gantt.

## Шаг 1. Установка пакета

ПРО версии библиотеки доступны для установки через **npm/yarn** из нашего частного репозитория, пожалуйста, следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions), чтобы получить доступ к нему.

После того как вы получите Evaluation-версию Gantt, вы можете установить её следующими командами:

- для npm:

~~~ 
npm install @dhx/trial-gantt
~~~ 

- для yarn:

~~~ 
yarn add @dhx/trial-gantt
~~~ 

Кроме того, поскольку zip-пакет библиотеки структурирован как модуль **npm**, вы можете 
[установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Теперь следует создать компонент Svelte, чтобы добавить Gantt в приложение. Давайте создадим новый файл в директории ***src/*** и назовем его ***Gantt.svelte***.

### Импорт исходных файлов

Откройте только что созданный ***Gantt.svelte*** и импортируйте исходники Gantt. Обратите внимание:

- если вы установили пакет Gantt из локальной папки, ваши пути импорта будут выглядеть так:

~~~js title="Gantt.svelte"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- если вы выбрали установку тестовой версии, пути импорта должны быть такими же, как в:

~~~js title="Gantt.svelte"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве мы будем использовать **trial**-версию Gantt.

### Установка контейнера и добавление Gantt

Чтобы отобразить Gantt на странице, нужно задать контейнер для рендеринга компонента внутри. Ниже приведён код:

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
      
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

Чтобы контейнер Gantt занимал всё пространство body, необходимо удалить стандартные стили из файла ***app.css***, расположенного в папке ***src/***, и добавить следующие:

~~~css title="src/app.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Шаг 3. Добавление Gantt в приложение

Теперь пришло время добавить компонент в наше приложение. Откройте ***src/App.svelte*** и используйте компонент Gantt вместо контента по умолчанию, вставив следующий код:

~~~js title="src/App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

После этого при запуске приложения вы увидите пустой Gantt на странице:

![Gantt Svelte init](/img/gantt_init.png)

## Шаг 4. Предоставление данных

Чтобы добавить данные в Gantt, нужно предоставить набор данных. Давайте создадим файл ***data.js*** в директории ***src/*** и добавим в него данные:

~~~js title="src/data.js"
export function getData() {
  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  return Tasks;
}
~~~ 

We should [pass props (our data)](https://svelte.dev/tutorial/svelte/declaring-props) to the Gantt component in the **App.svelte** file:

~~~html title="App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

And use the props in the **gantt.parse()** method in the Gantt component:

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
    
    export let tasks;
    
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);
        gantt.parse(tasks);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

Теперь, если вы заново откроете страницу приложения, вы должны увидеть Gantt с задачами:

![Gantt tasks](/img/gantt_tasks.png)

## Шаг 5. Сохранение данных

Чтобы зафиксировать изменения, внесённые в Gantt, можно использовать обработчик [dataProcessor], который позволяет «сообщать» серверной части бэкенда. Обработчик может быть объявлен либо как функция, либо как объект-роутер. dhtmlxGantt принимает ответ Promise от обработчика, поэтому ваш Gantt будет корректно обрабатывать завершение действия.

Вы можете создать DataProcessor через API-метод **createDataProcessor()** и фиксировать изменения вот так:

~~~ 
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​​entity} ${​​action}`);
});
~~~

Если ваш сервис после создания новой записи изменяет id задачи (что обычно и происходит), убедитесь, что ваш Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)** в качестве результата, чтобы Gantt мог применить новый идентификатор базы данных к записи. Получите [больше информации о серверной стороне](guides/server-side.md).

Так что Svelte Gantt готов, добро пожаловать к [полному демо на GitHub](https://github.com/DHTMLX/svelte-gantt-demo).

## XSS, CSRF и SQL-инъекции

Обратите внимание, что Gantt не предоставляет средства для предотвращения разных угроз приложения, таких как SQL-инъекции или XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бекенд.

Ознакомьтесь со статьей [Application Security](guides/app-security.md), чтобы узнать самые уязвимые точки компонента и меры, которые можно принять для повышения безопасности вашего приложения.