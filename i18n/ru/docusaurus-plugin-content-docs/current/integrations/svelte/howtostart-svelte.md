---
title: "dhtmlxGantt с Svelte"
sidebar_label: "Svelte"
---

# dhtmlxGantt с Svelte

Данное руководство предполагает, что вы обладаете базовыми знаниями о концепциях и паттернах Svelte. Если нет, вы можете ознакомиться с полезным [вводным руководством в документации Svelte](https://svelte.dev/).

DHTMLX Gantt отлично работает с Svelte. Ознакомиться с рабочим примером можно на GitHub: [DHTMLX Gantt with Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## Создание проекта

Перед началом работы рекомендуется установить [Vite](https://vite.dev/) (необязательно) и [Node.js](https://nodejs.org/en/).

Для создания проекта Svelte мы воспользуемся Vite. Выполните команду:

~~~
npm create vite@latest
~~~

Подробнее об этом можно узнать в [соответствующей статье](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit).

### Установка зависимостей

Далее перейдите в директорию вашего приложения. Назовём проект **gantt-svelte** и выберем опцию **svelte**. Затем выполните:

~~~
cd gantt-svelte
~~~

Теперь установите зависимости и запустите приложение с помощью предпочитаемого пакетного менеджера:

- Для **yarn** выполните:

~~~
yarn install
yarn dev
~~~

- Для **npm** выполните:

~~~
npm install
npm run dev
~~~

Ваш Svelte-проект теперь будет доступен по адресу [http://localhost:5173](http://localhost:5173).

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## Создание Gantt

Для добавления DHTMLX Gantt сначала остановите приложение, нажав **Ctrl+C** в терминале. Затем приступайте к установке пакета Gantt.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Пожалуйста, следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions) для получения доступа.

После получения Evaluation-версии установите её с помощью:

- Для npm:

~~~
npm install @dhx/trial-gantt
~~~

- Для yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Альтернативно, так как zip-пакет библиотеки структурирован как **npm**-модуль, вы можете 
[установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Далее создайте Svelte-компонент для включения Gantt в ваше приложение. Добавьте новый файл ***Gantt.svelte*** в папку ***src/***.

### Импорт исходных файлов

Откройте ***Gantt.svelte*** и импортируйте исходные файлы Gantt. Обратите внимание:

- Если вы устанавливали пакет Gantt из локальной папки, ваши импорты будут выглядеть так:

**Gantt.svelte**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Если установлена trial-версия, используйте такие импорты:

**Gantt.svelte**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве используется **trial**-версия.

### Задание контейнера и добавление Gantt

Чтобы отобразить Gantt на странице, определите контейнер для рендеринга компонента. Пример:

**Gantt.svelte**
~~~html
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

Чтобы контейнер Gantt занимал всё тело страницы, удалите стандартные стили из ***app.css*** в папке ***src/*** и добавьте:

**src/app.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Шаг 3. Добавление Gantt в приложение

Теперь подключите компонент Gantt в приложении. Откройте ***src/App.svelte*** и замените содержимое на:

**src/App.svelte**
~~~
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

Теперь при запуске приложения должен отображаться пустой график Gantt:

![Gantt Svelte init](/img/gantt_init.png)

## Шаг 4. Передача данных

Чтобы заполнить Gantt, передайте данные. Создайте файл ***data.js*** в ***src/*** и добавьте:

**src/data.js**
~~~js
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
  return tasks;
}
~~~

Передайте эти данные как пропсы в компонент Gantt в **App.svelte**:

**App.svelte**
~~~html
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

Далее используйте пропсы внутри компонента Gantt с помощью **gantt.parse()**:

**Gantt.svelte**
~~~html
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

После перезагрузки приложения должен появиться график Gantt с задачами:

![Gantt tasks](/img/gantt_tasks.png)

## Шаг 5. Сохранение данных

Для отслеживания изменений в Gantt вы можете использовать обработчик [dataProcessor](api/method/dataprocessor.md). Он облегчает взаимодействие с сервером и может быть определён как функция или объект роутера. dhtmlxGantt поддерживает Promise-ответы, что обеспечивает корректную обработку действий.

Создайте **DataProcessor** с помощью **createDataProcessor()** для отслеживания изменений следующим образом:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш сервер изменяет идентификаторы задач после создания новых записей, убедитесь, что Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)**, чтобы Gantt мог обновить соответствующую запись. Подробнее о серверной интеграции читайте [здесь](guides/server-side.md).

На этом настройка Svelte Gantt завершена. Вы можете ознакомиться с полным демо на GitHub: [https://github.com/DHTMLX/svelte-gantt-demo](https://github.com/DHTMLX/svelte-gantt-demo).

## XSS, CSRF и SQL Injection атаки

Обратите внимание, что Gantt не содержит встроенных средств защиты от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения от подобных рисков лежит на разработчиках серверной части.

Для получения информации о потенциальных уязвимостях и рекомендациях по безопасности обратитесь к статье [Application Security](guides/app-security.md).
