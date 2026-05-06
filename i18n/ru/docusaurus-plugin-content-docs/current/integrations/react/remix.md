---
title: React Gantt с Remix
sidebar_label: Remix

---

# React Gantt с Remix

**Remix Быстрый старт**

Вы должны обладать базовым знанием концепций [React](https://react.dev/) и [Remix](https://remix.run/). Если нет, обратитесь к их официальной документации перед началом этого руководства.

В этом туториале мы создадим простое приложение Remix и отобразим диаграмму Gantt на странице.

## Создание проекта

Прежде чем создать новый проект, убедитесь, что у вас установлен [Node.js](https://nodejs.org/).

Так как Remix теперь поставляется как часть **React Router v7**, рекомендуемый способ установки проекта:

~~~bash
npx create-react-router@latest
~~~

При запросе выберите:
- Название проекта: **react-gantt-remix-quick-start**
- Использовать шаблон по умолчанию (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: Да

Затем перейдите в папку проекта:

~~~bash
cd react-gantt-remix-quick-start
~~~

И запустите сервер разработки:

~~~bash
npm run dev
~~~

Ваше приложение будет доступно по адресу `http://localhost:5173`.

## Шаг 1. Установка пакета React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем пакет для оценки:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортах.

После установки можно подготовить данные и компонент.

## Шаг 2. Подготовка демонстрационных данных

В папке  `app/` создайте новый каталог `data/` и добавьте файл `demoData.ts` с начальным набором данных:

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

Эти данные будут переданы в наш компонент Gantt.

### Шаг 3. Создание компонента Gantt

Remix позволяет использовать клиентские компоненты через стандартную архитектуру React. Мы создадим отдельный компонент для отображения диаграммы Gantt.

Создайте папку `app/components/Gantt/`. Внутри нее создайте файл `Gantt.tsx`. Откройте созданный файл и вставьте следующий код:

~~~tsx title="app/components/Gantt/Gantt.tsx"
import { useMemo, useRef } from 'react';
import Gantt, { type ReactGanttRef, type Task, type Link, type GanttConfig } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';


export interface GanttProps {
  tasks: Task[];
  links: Link[];
}


export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);


  const config: GanttConfig = useMemo(
    () => ({
      grid_width: 500,
      scale_height: 90,
      scales: [
        { unit: 'year', step: 1, date: '%Y' },
        { unit: 'month', step: 1, date: '%M' },
        { unit: 'day', step: 1, date: '%d %M' },
      ],
    }),
    []
  );


  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity: string, action: string, data: Task | Link, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~


Этот компонент инициализирует диаграмму Gantt и передает ей конфигурацию, исходные данные и `ref` для дальнейших вызовов API. Объект `config` определяет компоновку и шкалы, тогда как свойства `tasks` и `links` обеспечивают диаграмму данными набора.

Функция `save`, находящаяся внутри пропа `data`, используется для отслеживания обновлений, сделанных в задачах и связях внутри Gantt. В этом руководстве мы добавляем простой обработчик-заглушку для отслеживания изменений. Если вы хотите отправлять обновления на backend или привязывать их к состоянию React, можете следовать официальному руководству по привязке данных [руководство](integrations/react/overview.md#bindingdata).


## Шаг 4. Рендеринг Gantt на маршруте Remix

Откройте основной маршрут страницы - `app/routes/home.tsx`.
Замените его содержимое на следующее:

~~~tsx title="app/routes/home.tsx"
import GanttChart from '~/components/Gantt/Gantt';
import type { Route } from './+types/home';
import { tasks, links } from '~/data/demoData';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
  ];
}


export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~


Теперь диаграмма Gantt будет отображаться по маршруту `/`.

## Шаг 5. Запуск приложения

Запустите сервер разработки:

~~~bash
npm run dev
~~~

Затем откройте `http://localhost:5173` в вашем браузере. Теперь вы должны увидеть рабочую диаграмму Gantt с образцом набора данных.

## Резюме

Вы создали минимальное приложение Remix с DHTMLX React Gantt, добавили демонстрационные данные и отобразили полностью интерактивную диаграмму Gantt. Это минимальная конфигурация, необходимая для начала работы, и она повторяет то, что вы будете использовать в продакшн-средах.

## Репозиторий примера на GitHub

Полный рабочий проект, соответствующий этому руководству, доступен на GitHub: [https://github.com/dhtmlx/react-gantt-remix-starter](https://github.com/dhtmlx/react-gantt-remix-starter).

Далее можно продолжить изучение:

- [Поток данных, управляемый React](integrations/react/overview.md#bindingdata).
- [Документация по шаблонам React Gantt](integrations/react/configuration-props.md).