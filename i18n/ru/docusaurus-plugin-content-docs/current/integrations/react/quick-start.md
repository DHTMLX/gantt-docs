---
title: Быстрый старт с React Gantt
sidebar_label: Быстрый старт
description: "Пошаговый гид по использованию компонента React Gantt"
---

## Быстрый старт с React Gantt

:::note
Этот туториал охватывает обертку React, включенную в издания **Commercial, Enterprise и Ultimate** DHTMLX Gantt. 
Если вы используете **Individual** или **GPL** издания, следуйте альтернативному руководству: 
[Как начать с React](integrations/react/js-gantt-react.md).
:::

Компонент **React Gantt** является официальной оберткой для **DHTMLX Gantt**. 
Этот гид проведет вас через создание небольшого приложения на React и вывод базовой диаграммы Gantt с использованием пробного пакета.

Если вы новичок в React, начните с официальной документации [React](https://react.dev/learn). См. [полностью работающий проект, следующий этому руководству, на GitHub](https://github.com/dhtmlx/react-gantt-quick-start).

## Требования к версии

- React **18 или новее**

## Создание нового проекта на React

Чтобы создать проект на React и перейти в директорию проекта, выполните следующие команды:

~~~bash
npm create vite@latest react-gantt-quick-start -- --template react-ts
cd react-gantt-quick-start
~~~

### Установка React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом туториале мы используем пробный пакет:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если у вас уже используется Professional-пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортируемых элементах.

## Добавление демонстрационных данных

Для этого примера мы будем использовать статические данные. Создайте файл `src/demoData.ts`:

~~~ts
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  ...
];
~~~

## Создание компонента Gantt

Чтобы добавить компонент Gantt, создайте файл `src/components/Gantt/Gantt.tsx` со следующим содержимым:

~~~tsx
import Gantt, {
  ReactGanttRef,
  Task,
  Link,
  GanttConfig
} from '@dhtmlx/trial-react-gantt';

import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import { useRef } from 'react';

export interface GanttProps {
  tasks: Task[];
  links: Link[].
}

export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);

  const config: GanttConfig = {
    grid_width: 500,
    scale_height: 90,
    scales: [
      { unit: "year", step: 1, date: "%Y" },
      { unit: "month", step: 1, date: "%M" },
      { unit: "day", step: 1, date: "%d %M" }
    ]
  };

  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        }
      }}
    />
  );
}
~~~


## Отображение Gantt в приложении

Чтобы отобразить Gantt, замените код `src/App.tsx` на следующий:

~~~tsx
import GanttChart from './components/Gantt/Gantt';
import { tasks, links } from './demoData';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

После этого запустите приложение командой ниже:

~~~bash
npm run dev
~~~

На данный момент у вас есть полностью работающее приложение на React + DHTMLX Gantt.

Эта настройка представляет собой **минимальную конфигурацию**, которая необходима для:

- отобразить диаграмму Gantt
- отображать задачи и связи
- применить базовую конфигурацию масштабирования
- прикрепить экземпляр Gantt через React ref
- получать события через обратный вызов `data.save`

Это тот же минимальный пример, использованный в [демо-проекте на GitHub](https://github.com/dhtmlx/react-gantt-quick-start).

Далее вы можете продолжить, добавляя более продвинутые функции:

- синхронизацию данных с состоянием React
- загрузку/сохранение данных с вашего бэкэнда
- добавление шаблонов и собственных рендереров
- включение плагинов (авто-расписание, критический путь)
- добавление ресурсов, календарей или группировки

Следующие разделы поочередно вводят эти возможности.

## Использование состояния React в качестве источника истины
_(рекомендуется для большинства приложений на React)_

В реальных приложениях задачи и связи обычно поступают из состояния React. 
Ниже приведён полный пример, в котором Gantt **отправляет изменения обратно в React** через обратный вызов `data.save`.

~~~tsx
import { useState } from "react";
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";
import { tasks as initialTasks, links as initialLinks } from "./demoData";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [links, setLinks] = useState(initialLinks);

  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            if (entity === "task") {
              if (action === "create") setTasks(tasks => [...tasks, item]);
              if (action === "update") setTasks(tasks => tasks.map(x => x.id === id ? item : x));
              if (action === "delete") setTasks(tasks => tasks.filter(x => x.id !== id));
            }
            if (entity === "link") {
              if (action === "create") setLinks(links => [...links, item]);
              if (action === "update") setLinks(links => links.map(x => x.id === id ? item : x));
              if (action === "delete") setLinks(links => links.filter(x => x.id !== id));
            }
          }
        }}
      />
    </div>
  );
}
~~~


### Почему стоит выбрать этот режим

- React всегда видит те же данные, что и UI Gantt
- Работает безупречно с Redux / Zustand / Jotai / MobX
- Легко синхронизируется с backend API


## Альтернативный режим: Gantt как источник истины
_(полезно для очень больших наборов данных или тяжелого авто-расписания)_

В этом режиме React не владеет задачами/связями.

~~~tsx
<Gantt
  data={{
    load: "/api/gantt-data",
    save: "/api/gantt-data"
  }}
/>
~~~

### Когда предпочтительнее этот режим

- Десятки тысяч задач  
- Много обновлений авто-расписания  
- Вы хотите минимальные витки перерисовки React


## Использование шаблонов 
_(возвращают элементы React из функций шаблонов)_

Шаблоны позволяют настраивать почти каждую часть графика.

~~~tsx
const templates = {
  task_text: (start, end, task) => (
    <span style={{ color: "red" }}>#{task.id}: {task.text}</span>
  )
};

<Gantt templates={templates} />
~~~

### Дополнительная информация

См. полную секцию здесь: [Документация по шаблонам React Gantt](integrations/react/configuration-props.md).


## Демо-репозиторий GitHub

Полностью рабочий проект, следующий этому руководству, доступен на GitHub: https://github.com/dhtmlx/react-gantt-quick-start

## Дальнейшие шаги

- Изучите все доступные [свойства React Gantt](integrations/react/configuration-props.md)
- Изучайте расширенные возможности Gantt в [Руководства]