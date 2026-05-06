---
title: React Gantt с Next.js
sidebar_label: Next.js

---

# React Gantt с Next.js

**Быстрый старт с Next.js**

Вам следует знать базовые концепции [React](https://react.dev/) и [Next.js](https://nextjs.org/docs). Если нет, ознакомьтесь с их официальной документацией перед началом этого руководства.

DHTMLX React Gantt полностью совместим с Next.js. В этом руководстве мы создадим простое приложение на Next.js и отобразим диаграмму Gantt на странице.

## Создание проекта

Прежде чем создавать новый проект, установите [Node.js](https://nodejs.org/).

Чтобы сгенерировать скелет приложения Next.js, выполните:

~~~bash
npx create-next-app@latest
~~~

При появлении запроса выберите:
- Имя проекта: **react-gantt-nextjs-quick-start**
- Использовать шаблон по умолчанию (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js создаст структуру проекта и установит базовые зависимости.

После установки перейдите в каталог проекта:

~~~bash
cd react-gantt-nextjs-quick-start
~~~


## Шаг 1. Установка пакета React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем пробный пакет:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете пакет Professional, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортах.

После установки можно настроить данные и создать компонент Gantt.

## Шаг 2. Подготовка демонстрационных данных

Создайте папку `data/` в корне проекта. Внутри неё добавьте файл `demoData.ts`, содержащий начальные задачи и связи:

~~~ts title="data/demoData.ts"
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  { id: 2, text: "Office facing", type: "project", start_date: new Date(2025, 3, 2), duration: 8, progress: 0.6, parent: 1, open: true },
  { id: 3, text: "Furniture installation", type: "project", start_date: new Date(2025, 3, 11), duration: 8, progress: 0.6, parent: 1, open: true },
  // ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  { id: 3, source: 3, target: 4, type: "0" },
  // ...
];
~~~


### Шаг 3. Создание компонента Gantt

Next.js по умолчанию использует Server Components, но React Gantt следует рендерить внутри Client Component в большинстве практических случаев.

Это требуется, когда вы:

- используете `ref` для доступа к экземпляру Gantt
- передаете обратные вызовы (события, шаблоны, обработчики данных)
- используете ReactGantt `hooks`
- предоставляете динамическую конфигурацию или элементы React

Поэтому наш компонент Gantt будет начинаться с "use client".

Создайте новый файл по пути `components/Gantt/Gantt.tsx`

~~~tsx title="components/Gantt/Gantt.tsx"
"use client";

import { useRef } from "react";
import Gantt, { ReactGanttRef, Task, Link, GanttConfig } from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

export interface GanttProps {
  tasks: Task[];
  links: Link[];
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


Этот компонент инициализирует диаграмму Gantt и предоставляет ей конфигурацию, начальные данные и `ref` для будущих вызовов API. Объект `config` определяет макет и шкалы, тогда как свойства `tasks` и `links` снабжают диаграмму данными набора.

Функция `save` внутри свойства `data` используется для отслеживания обновлений, вносимых в задачи и связи внутри Gantt. В этом руководстве мы добавляем простой обработчик-заглушку для отслеживания изменений. Если вы хотите отправлять обновления на бэкенд или привязывать их к состоянию React, вы можете следовать официальному руководству по связыванию данных [guide](integrations/react/overview.md#bindingdata).


## Шаг 4. Добавление Gantt на страницу

Откройте `app/page.tsx` и отобразите диаграмму Gantt на главной странице:

~~~tsx title="app/page.tsx"
import Gantt from "../components/Gantt/Gantt";
import { tasks, links } from "../data/demoData";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Gantt tasks={tasks} links={links} />
    </div>
  );
}
~~~

Теперь страница будет отображать полноэкранный график Gantt.

## Шаг 5. Запуск приложения

Запустите сервер разработки:

~~~bash
npm run dev
~~~

Затем откройте `http://localhost:3000` в вашем браузере. Теперь вы должны увидеть рабочий график Gantt, отрисованный с использованием React Gantt внутри приложения Next.js.

## Итого

Вы создали минимальный проект Next.js с DHTMLX React Gantt, добавили демонстрационные данные и отобразили полностью интерактивный график Gantt. Это минимальная настройка, необходимая для начала работы, и она повторяет то, что вы будете использовать в продукционных окружениях.

## Демонстрационный репозиторий на GitHub

Полный рабочий проект, соответствующий этому руководству, доступен на GitHub: [https://github.com/dhtmlx/react-gantt-nextjs-starter](https://github.com/dhtmlx/react-gantt-nextjs-starter).

Отсюда вы можете продолжить изучение:

- [Данные, управляемые React](integrations/react/overview.md#bindingdata).
- [Документация по шаблонам React Gantt](integrations/react/configuration-props.md).