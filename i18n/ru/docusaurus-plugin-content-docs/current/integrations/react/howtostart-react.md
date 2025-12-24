---
title: "dhtmlxGantt с React"
sidebar_label: "Низкоуровневая интеграция"
---

# dhtmlxGantt с React


:::note
Этот учебник демонстрирует, как использовать JS DHTMLX Gantt в React-приложениях. Для официального компонента React Gantt, пожалуйста, смотрите статью [React Gantt](integrations/react.md).
:::

Перед началом работы с этим руководством рекомендуется иметь базовое понимание концепций и паттернов [React](https://react.dev/). Если вы новичок в React, ознакомьтесь с [документацией по React](https://reactjs.org/docs/getting-started.html) для получения вводной информации.

DHTMLX Gantt хорошо работает с React. Пример можно найти на GitHub: [DHTMLX Gantt with React Demo](https://github.com/DHTMLX/react-gantt-demo).

## Создание проекта

Перед созданием нового проекта убедитесь, что у вас установлен [Node.js](https://nodejs.org/en/).

Для быстрой инициализации базового React-проекта выполните следующую команду:

~~~
npx create-vite my-react-gantt-app --template react
~~~

### Установка зависимостей

Далее перейдите в папку вашего проекта. Если ваш проект называется **my-react-gantt-app**, выполните:

~~~
cd my-react-gantt-app
~~~

Затем установите зависимости и запустите сервер разработки. В зависимости от выбранного менеджера пакетов используйте:

- с **yarn**:

~~~
yarn install
yarn dev
~~~

- с **npm**:

~~~
npm install
npm run dev
~~~

Ваше React-приложение теперь должно быть доступно по адресу [http://localhost:5173](http://localhost:5173).

![Gantt React app running](/img/gantt_react_app_run.png)

## Создание Gantt

Далее получим код DHTMLX Gantt. Сначала остановите запущенное приложение, нажав **Ctrl+C** в терминале. Затем установите пакет Gantt.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Пожалуйста, следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions) для получения доступа.

После получения Evaluation-версии установите её с помощью следующих команд:

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

Теперь создайте React-компонент для интеграции Gantt в ваше приложение. Добавьте новый файл с именем ***Gantt.jsx*** в директорию ***src/***.

### Импорт исходных файлов

Откройте ***Gantt.jsx*** и импортируйте исходные файлы Gantt. Обратите внимание:

- Если вы устанавливали Gantt из локальной папки, ваши импорты будут выглядеть так:

**Gantt.jsx**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- Если вы устанавливали trial-версию, используйте такие импорты:

**Gantt.jsx**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве используется **trial** версия.

### Установка контейнера и добавление Gantt

Чтобы отобразить Gantt на странице, требуется элемент-контейнер. Файл ***Gantt.jsx*** должен содержать следующее:

**Gantt.jsx**
~~~
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

Теперь включите компонент Gantt в ваше приложение. Откройте ***src/app.jsx*** и замените содержимое на следующее:

**src/app.jsx**
~~~
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

Чтобы контейнер Gantt занимал всю область, удалите стандартные стили из ***index.css*** в папке ***src/*** и добавьте:

**src/index.css**
~~~
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

При повторном запуске приложения вы увидите пустую диаграмму Gantt на странице:

![Gantt React init](/img/gantt_init.png)

## Шаг 4. Передача данных

Чтобы отобразить задачи в Gantt, предоставьте набор данных. Создайте файл ***data.js*** в ***src/*** со следующим содержимым:

**src/data.js**
~~~
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

Передайте эти данные как props в компонент Gantt в ***App.jsx***:

**App.jsx**
~~~
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

Затем используйте props внутри метода **gantt.parse()** в компоненте Gantt:

**Gantt.jsx**
~~~
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

После перезагрузки приложения диаграмма Gantt отобразит задачи:

![Gantt tasks](/img/gantt_tasks.png)

## Шаг 5. Сохранение данных

Для обработки изменений в Gantt вы можете использовать [dataProcessor](api/method/dataprocessor.md), который позволяет взаимодействовать с вашим backend. dataProcessor может быть определён как функция или объект router. dhtmlxGantt поддерживает Promise-ответы от обработчика, что позволяет корректно обрабатывать действия.

Создайте **DataProcessor** с помощью **createDataProcessor()** и слушайте изменения следующим образом:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш backend присваивает новый id после создания записи (это распространённое поведение), убедитесь, что Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)**, чтобы Gantt мог обновить запись. Подробнее в разделе [server side integration](guides/server-side.md).

На этом настройка React Gantt завершена. Вы можете ознакомиться с полной демонстрацией на GitHub: [https://github.com/DHTMLX/react-gantt-demo](https://github.com/DHTMLX/react-gantt-demo).

## XSS, CSRF и SQL-инъекции

Имейте в виду, что сам Gantt не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения - ответственность разработчиков backend.

Смотрите статью [Application Security](guides/app-security.md) для ознакомления с типовыми уязвимостями и рекомендациями по повышению безопасности вашего приложения.
