---
title: dhtmlxGantt с React
sidebar_label: Низкоуровневая интеграция
description: "Пошаговое руководство по использованию Gantt внутри React без обертки"
---

# dhtmlxGantt с React

:::note
Этот учебник охватывает использование JS DHTMLX Gantt в React-приложениях. Если вы хотите использовать официальный компонент React Gantt, обратитесь к статье [React Gantt](integrations/react.md).
:::

Чтобы пользоваться этой документацией, вам следует быть знакомым с базовыми концепциями и паттернами [React](https://react.dev/). Если вы не знакомы, обратитесь к [документации React](https://react.dev/learn) для базового руководства.

DHTMLX Gantt совместим с React. Вы можете посмотреть соответствующий пример на GitHub: [DHTMLX Gantt with React Demo](https://github.com/DHTMLX/react-gantt-demo).

## Создание проекта

Прежде чем начать создание нового проекта, установите [Node.js](https://nodejs.org/en/).

Вы можете создать базовый проект React с помощью следующей команды:

~~~ 
npx create-vite my-react-gantt-app --template react
~~~

### Установка зависимостей

Далее перейдите в каталог приложения. Назовём наш проект **my-react-gantt-app** и запустим:

~~~ 
cd my-react-gantt-app
~~~

После этого следует установить зависимости и запустить dev-сервер. Для этого используйте менеджер пакетов:

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

Теперь ваш React-проект должен работать на **http://localhost:5173**.

![Gantt React app running](/img/gantt_react_app_run.png)

## Создание Gantt

Теперь нам нужно получить код DHTMLX Gantt. Прежде всего, остановите приложение, нажав **Ctrl+C** в командной строке. Затем можно приступить к установке пакета Gantt.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны для установки через **npm/yarn** из нашего приватного репозитория, пожалуйста, следуйте [этой инструкции](guides/installation.md#npmevaluationandproversions), чтобы получить доступ к нему.

После того как вы получите Evaluation-версию Gantt, вы можете установить её следующими командами:

- для npm:

~~~ 
npm install @dhx/trial-gantt
~~~

- для yarn:

~~~ 
yarn add @dhx/trial-gantt
~~~

В качестве альтернативы, поскольку zip-пакет библиотеки структурирован как модуль **npm**, вы можете [установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Теперь нужно создать компонент React, чтобы добавить Gantt в приложение. Создадим файл ***Gantt.jsx*** в каталоге ***src/***.

### Импорт исходников

Откройте только что созданный файл ***Gantt.jsx*** и импортируйте исходники Gantt. Обратите внимание:

- если вы установили пакет Gantt из локальной папки, ваши пути импорта будут выглядеть так:

~~~js title="Gantt.jsx"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- если вы выбрали установить trial-версию, импорты должны быть следующими:

~~~js title="Gantt.jsx"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве мы будем использовать **trial**-версию Gantt.

### Установка контейнера и добавление Gantt

Чтобы отобразить Gantt на странице, нужно задать контейнер для рендера компонента внутри. Файл ***Gantt.jsx*** должен содержать следующий код:

~~~js title="Gantt.jsx"
import { useEffect, useRef } from "react"; /*!*/
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView() { /*!*/
  let container = useRef(); /*!*/

  useEffect(() => { /*!*/
    let gantt = Gantt.getGanttInstance(); /*!*/
    gantt.init(container.current); /*!*/

    return () => { /*!*/
      gantt.destructor(); /*!*/
      container.current.innerHTML = ""; /*!*/
    }; /*!*/
  }, []); /*!*/

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>; /*!*/
} /*!*/
~~~

## Шаг 3. Добавление Gantt в приложение

Теперь пришло время добавить компонент в наше приложение. Откройте ***src/app.jsx*** и используйте компонент Gantt вместо стандартного содержимого, вставив приведённый ниже код:

~~~js title="src/app.jsx"
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~ 

Чтобы контейнер Gantt занимал всё пространство тела документа, вам нужно удалить стандартные стили из файла ***index.css***, расположенного в папке ***src/***, и добавить следующий:

~~~css title="src/index.css"
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

После этого, когда мы запустим приложение, на странице должно отображаться пустой Gantt:

![Gantt React init](/img/gantt_init.png)

## Шаг 4. Предоставление данных

Чтобы добавить данные в Gantt, нужно предоставить набор данных. Создайте файл ***data.js*** в каталоге ***src/*** и добавьте туда данные:

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
  return tasks;
}
~~~

Мы должны [передать пропсы (наши данные)](https://react.dev/learn/passing-props-to-a-component) в компонент Gantt в ***App.jsx***:

~~~js title="Gantt.jsx"
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

И использовать пропсы в методе **gantt.parse()** внутри компонента Gantt:

~~~js title="Gantt.jsx"
import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView(props) {
  let container = useRef();

  useEffect(() => {
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);
    gantt.parse(props.tasks); /*!*/

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, []);

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>;
}
~~~

Теперь, если вы снова откроете страницу приложения, вы увидите Gantt с задачами:

![Gantt tasks](/img/gantt_tasks.png)

## Шаг 5. Сохранение данных

Чтобы зафиксировать изменения, внесённые в Gantt, вы можете использовать обработчик [dataProcessor](api/method/dataprocessor.md), который позволяет "общаться" с серверной частью бэкенда. Обработчик может быть объявлен как функция, так и как объект-роутер. dhtmlxGantt принимает ответ Promise от обработчика, поэтому ваш Gantt корректно обработает завершение действия.

Вы можете создать **DataProcessor** с помощью API-метода **createDataProcessor()** и зафиксировать изменения следующим образом:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш сервис изменяет id задачи после создания новой записи (что обычно бывает), убедитесь, что ваш Promise возвращает объект с результатом **(id: databaseId)** или **(tid: databaseId)**, чтобы Gantt мог применить новый идентификатор базы данных к записи. Узнайте [более подробно о стороне сервера](guides/server-side.md).

Итак, React Gantt готов, добро пожаловать на полное демо на GitHub.

## XSS, CSRF и SQL-инъекции

Обратите внимание, что Gantt не предоставляет средств защиты от различных угроз, таких как SQL-инъекции или XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бэкенд.

Ознакомьтесь с статьёй [Безопасность приложения](guides/app-security.md), чтобы узнать наиболее уязвимые точки компонента и меры, которые можно предпринять для повышения безопасности вашего приложения.