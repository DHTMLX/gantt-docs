---
title: Основы привязки данных и управления состоянием в React Gantt
sidebar_label: Основы
description: "Обзор двух моделей привязки данных в React Gantt и базовый образец использования состояния React в качестве источника достоверной информации перед интеграцией Redux, Zustand, MobX, Jotai, XState или Valtio."
---

# Привязка данных и управление состоянием в React Gantt

React Gantt поддерживает **две модели привязки данных**:

1. **React state как источник истины** - _рекомендуется для большинства React-приложений_.
2. **Gantt как источник истины** - _полезно для специализированных случаев_.

Обе подхода допустимы, но следует выбрать один и придерживаться его последовательно, чтобы избежать непредвидимого поведения.

Эта статья объясняет оба режима и приводит базовые примеры каждого из них.

Если вы еще не отрендерили базовый график, начните с [Быстрого старта](integrations/react/quick-start.md).

## Модели данных

### React state как источник истины (рекомендуется)

В этой модели:

- вы храните `tasks`, `links`, `resources`, `resourceAssignments` в состоянии React или в библиотеке состояний
- передаете их в `<Gantt>` как props
- когда пользователь что-то меняет, ReactGantt вызывает ваш колбэк `data.save` или `data.batchSave`
- вы обновляете состояние React -> React перерисовывает компонент -> ReactGantt повторно читает новые props

Это правильный выбор, если на вашей странице есть другой React UI, которому нужно видеть те же данные, что и у Gantt, и если ваше приложение содержит дополнительные React-компоненты или использует менеджер состояний, который опирается на те же данные.

Однако это потребует более частого повторного разбора или перерисовки Gantt.

### Gantt как источник истины

В этом подходе вы считаете ReactGantt и ваш бэкенд основными владельцами данных:

- ReactGantt загружает начальный набор данных через `data.load`, или через props, или через императивный вызов API
- ReactGantt применяет изменения пользователя внутри и/или отправляет их на сервер
- вы **не держите** зеркальную копию всех задач/ссылок в состоянии React, которая постоянно возвращается в props

Ключевое различие — отсутствие полного цикла. Изменения пользователя не обновляют состояние React, и React не повторно применяет обновленные props после каждого изменения.

Эта модель полезна, когда наборы данных очень велики, так как снижает накладные расходы на постоянное обновление состояния React при изменении данных Gantt и упрощает массовые операции (как авто-расписание) без повторных перерисовок.

С другой стороны, вы теряете прямую синхронизацию между данными Gantt и вашим состоянием React. И если вы храните задачи/ссылки в состоянии React, нужно быть осторожным, чтобы не перезаписать внутреннее состояние Gantt по ошибке.

## React state как источник истины {#reactstateasthesourceoftruth}

В этой схеме вы держите все основные коллекции в состоянии и передаете их как props (`tasks`, `links`, `resources`, `resourceAssignments`). Всякий раз, когда пользователь изменяет задачи или ссылки внутри Gantt (например, создавая или удаляя задачу), Gantt вызывает колбэк. В этом колбэке вы обновляете состояние React новыми или удаленными данными. Как только состояние обновлено, React перерисовывает компонент **ReactGantt**, который в свою очередь читает обновленные props из текущего состояния.

### Минимальный пример с React state

~~~tsx
import { useState } from 'react';
import Gantt, {
  Task,
  Link
} from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

import { demoData } from "./demoData";

export default function ReactStateGantt() {
  const [tasks, setTasks] = useState<Task[]>(demoData.tasks);
  const [links, setLinks] = useState<Link[]>(demoData.links);


  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            // Update React state here (see below for patterns)
            console.log("Change:", { entity, action, id, item });
          },
        }}
      />
    </div>
  );
}

~~~

Это даёт базовую отправную точку — React управляет тем, что рендерится через props, Gantt сообщает об изменениях через колбэк `save` и делает React законным владельцем данных.

Следующие разделы показывают типичные паттерны, которые реализуются внутри этого колбэка.

## Обработка изменений с `data.save` {#handlingchangeswithdatasave}

Когда вы передаете `data.save`, ReactGantt вызывает его для **каждого изменения**, которое пользователь делает:

~~~ts
(entity: string, action: string, item: any, id: string|number) => {...}
~~~

Где:
 
- `entity` равно `"task" | "link" | "resource" | "resourceAssignment"`
- `action` равно `"create" | "update" | "delete"`
- `item` — созданный/обновленный/удаленный объект
- `id` — идентификатор объекта

Вот простой пример, который напрямую обновляет состояние React:

~~~tsx
function handleSave(entity, action, item, id) {
  if (entity === "task") {
    setTasks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((t) => (t.id === id ? item : t));
      if (action === "delete") return prev.filter((t) => t.id !== id);
      return prev;
    });
  }

  if (entity === "link") {
    setLinks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((l) => (l.id === id ? item : l));
      if (action === "delete") return prev.filter((l) => l.id !== id);
      return prev;
    });
  }

  // При необходимости можно применить ту же идею для resources / resourceAssignments
}
~~~

В реальном приложении вы почти никогда не держите эту логику встроенной:

- в Redux Toolkit это становится редьюсером или thunk
- в Zustand/Jotai/MobX/Valtio она живет в хранилище
- для интеграции с сервером вы также можете вызывать ваш API из этого места

Учебники по управлению состоянием строятся на этом паттерне, этот пример лишь демонстрирует стартовую точку.

## Массовые обновления с помощью `data.batchSave`

`data.save` — самый удобный входной пункт для захвата изменений пользователя, но у него есть один недостаток — авто-расписание: перетаскивание большого количества задач или другие тяжелые операции на больших проектах могут создавать сотни и тысячи изменений.

Если вы ожидаете, что так и будет для вашего приложения, вы можете переключиться в режим **batch mode**, передав вместо `data.save` `data.batchSave`. В этом режиме ReactGantt будет предоставлять вам сгруппированные изменения:

~~~ts
type GanttBatchChanges = {
  tasks?: Array<DataCallbackChange<Task>>;
  links?: Array<DataCallbackChange<Link>>;
  resources?: Array<DataCallbackChange<Resource>>;
  resourceAssignments?: Array<DataCallbackChange<ResourceAssignment>>;
};

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}

~~~

Вот минимальный пример использования:

~~~tsx
<ReactGantt
  // ...props with tasks/links/resources etc.
  data={{
    batchSave: (changes) => {
      console.log("Batch changes:", changes);

      if (changes.tasks) {
        setTasks((prev) => applyTaskBatch(prev, changes.tasks));
      }

      if (changes.links) {
        setLinks((prev) => applyLinkBatch(prev, changes.links));
      }

      // Аналогично для resources / assignments, если требуется
    },
  }}
/>

~~~

Где `applyTaskBatch`/`applyLinkBatch` — небольшие помощники, которые проходят по `{ action, data, id }` и возвращают обновленный массив.

По правилу большого пальца,
- используйте `batchSave`, когда ожидаете много изменений за раз, и/или хотите отправить все изменения на бэкенд в одном запросе
- используйте `save`, когда большинство правок относятся к одной задаче/ссылке и/или нужен максимально простой способ интеграции

## Загрузка данных в состояние React

В управляемой React-моделью Gantt получает данные через состояние React. Откуда приходит это состояние, зависит от архитектуры вашего приложения.

Существует три распространённых способа заполнения состояния:

- [Локальное состояние компонента](#localstate)
- [Менеджеры состояний (Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio)](#statemanagers)
- [Загрузка данных через API](#loadingfromapi)

### Локальное состояние компонента {#localstate}

Это полезно для быстрых демонстраций, прототипов или небольших приложений.

Данные часто поступают из локального сидера, но их также можно вычислять или получать выводом.

~~~jsx
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style={{height: '100vh'}}>
      <ReactGantt
        tasks={tasks}
        links={links}
        resources={resources}
        resourceAssignments={resourceAssignments}
      />
    </div>
  );
};
~~~

Этот паттерн очень похож на использование менеджера состояния — единственное различие состоит в том, где хранится состояние.

### Менеджеры состояний (Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio) {#statemanagers}

Во многих продакшн-приложениях данные Gantt живут в глобальном хранилище, а не внутри компонента.

ReactGantt естественным образом интегрируется с этими библиотеками. Вы читаете данные из хранилища через селекторы или хуки хранилища и передаете их в `<Gantt>` как props, точно так же, как и с локальным состоянием.

Ниже приведены примеры того, как это обычно выглядит.

**Redux Toolkit**

~~~ts
const { tasks, links } = useSelector((state: RootState) => state.gantt);
~~~

**Zustand**

~~~ts
const tasks = useGanttStore((state) => state.tasks);
~~~

**MobX**

~~~tsx
<Gantt tasks={store.tasks} links={store.links} />
~~~

Хотя у каждой библиотеки свой API, паттерн интеграции идентичен — вы передаете `tasks`, `links`, `resources` и т.п. как props, обрабатываете обновления через `data.save` или `data.batchSave`, единственное различие — откуда берется состояние.

Учебники по менеджерам состояния демонстрируют, как реализовать тот же паттерн в каждой конкретной библиотеке:

- [Использование React Gantt с Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Использование React Gantt с Zustand](integrations/react/state/zustand.md)
- [Использование React Gantt с MobX](integrations/react/state/mobx.md)
- [Использование React Gantt с XState](integrations/react/state/xstate.md)
- [Использование React Gantt с Jotai](integrations/react/state/jotai.md)
- [Использование React Gantt с Valtio](integrations/react/state/valtio.md)

### Загрузка данных из API {#loadingfromapi}

В реальных приложениях обычно данные загружаются из бэкенда и помещаются в состояние React (локальное или глобальное).

Ниже приведён более полный пример, который отражает типичное использование:

~~~tsx
import { useEffect, useState } from "react";
import Gantt, {
  Task,
  Link,
  Resource,
  ResourceAssignment,
  Calendar,
} from "@dhtmlx/trial-react-gantt";

interface GanttData {
  tasks: Task[];
  links: Link[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
}

export default function GanttWithApi() {
  const [data, setData] = useState<GanttData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/gantt-data");
        const raw = await response.json();

        const nextData: GanttData = {
          tasks: raw.tasks,
          links: raw.links,
          resources: raw.resources ?? [],
          resourceAssignments: raw.resourceAssignments ?? []
        };

        setData(nextData);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  if (isLoading || !data) {
    return <div>Loading Gantt...</div>;
  }

  return (
    <ReactGantt
      tasks={data.tasks}
      links={data.links}
      resources={data.resources}
      resourceAssignments={data.resourceAssignments}
      data={{
        save: (entity, action, item, id) => {
          // Update state and sync with backend here
        },
      }}
    />
  );
}
~~~

Этот подход красиво интегрируется с менеджерами состояний:

- загрузка данных в эффекте или thunk,
- сохранение в Redux/Zustand/MobX и т.д.,
- передача в `<Gantt>` через props,
- обработка обновлений с помощью `save`/`batchSave`.

## Gantt как источник истины в React-приложении {#ganttasthesourceoftruth}

Второй режим привязки — **Gantt как источник истины**, где Gantt (и при необходимости ваш бэкенд) рассматриваются как основной держатель данных.

React рендерит компонент, но не поддерживает задачу задач/ссылок/ресурсов как каноническое состояние, которое должно переходить в props после каждого обновления.

Эта модель полностью исключает цикл `React state <-> Gantt`.

### Когда эта модель имеет смысл

Используйте **Gantt как источник истины** когда

- наборы данных очень велики (тысячи задач)
- авто-расписание или массовые обновления происходят часто
- React не нужно реагировать на каждое обновление в реальном времени
- страница в первую очередь ориентирована на "Gantt"

React остаётся ответственным за компоновку, маршрутизацию и окружающий UI, но Gantt владеет жизненным циклом данных.

### Предоставление начальных данных

Даже в этой модели вы можете передать Gantt начальный набор данных. Ключевое различие в том, что вы не постоянно отражаете изменения обратно в состояние React.

Вы можете инициализировать Gantt любым из следующих подходов: загрузка данных по URL, загрузка данных через пользовательские функции, передача начального снимка через props. Подробности ниже.

#### Загрузка данных по URL

Gantt может загружать всё напрямую из вашего бэкенда через REST-эндпоинты:

~~~tsx
<Gantt
  data={{
    load: "/api/gantt/load",
    save: "/api/gantt/save",
  }}
/>
~~~

- `data.load` вызывается один раз при инициализации
- `data.save` вызывается каждый раз, когда пользователь вносит изменения в tasks/links.

#### Загрузка данных через пользовательские функции

Вместо URL можно указать асинхронные функции:

~~~tsx
<Gantt
  data={{
    load: async () => {
      const res = await fetch("/api/gantt/load");
      return res.json();
    },
    save: async (entity, action, item, id) => {
      // см. пример ниже
    },
  }}
/>
~~~

#### Передача начального снимка через props (односторонний)

Вы по-прежнему можете передать начальные данные через props:

~~~tsx
<Gantt tasks={initialTasks} links={initialLinks} />
~~~

В этом случае props служат лишь точкой старта. После инициализации Gantt поддерживает собственный внутренний хранилище и продолжает работу с него. Вы не повторно подаете новые массивы в props после каждого редактирования, потому что в этой модели React не считается каноничным владельцем данных.

### Как работают обновления

Каждый раз, когда пользователи создают, редактируют или удаляют данные, Gantt вызывает колбэк `save` (или `batchSave`).

Gantt изначально присваивает временные ID создаваемым записям. Бэкенд должен заменить их на реальные идентификаторы базы данных.

Эта логика отражает поведение модуля DataProcessor в JS Gantt (см. Server-Side Integration в JS Docs).

Когда создаются новая задача, ссылка, ресурс или назначение, вызов `save` должен вернуть Promise, который разрешается в:

~~~json
{ "id": "<database id>"}
~~~

Например:

~~~ts
data.save = async (entity, action, item, id) => {
  if (action === "create") {
    const response = await fetch(`/api/${entity}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json(); 
    // результат должен содержать { id: newDatabaseId }
    return { id: result.id };
  }

  if (action === "update") {
    await fetch(`/api/${entity}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });
    return {};
  }

  if (action === "delete") {
    await fetch(`/api/${entity}/${id}`, { method: "DELETE" });
    return {};
  }
};
~~~

Возврат `{id: newId}` позволяет Gantt заменить временный ID на постоянный.
Это обеспечивает, что последующие обновления/удаления будут targeting нужной записи в вашей базе данных.

#### Использование `batchSave`

`batchSave` группирует несколько изменений в один колбэк.
Так как несколько новых записей могут появиться одновременно, Gantt не ожидает, что `batchSave` что-то вернет.

При использовании `batchSave` необходимо создавать новые записи на бэкенде и получать их постоянные IDs и обновлять Gantt с помощью императивных вызовов API для замены временных ID:

~~~ts
gantt.changeTaskId(tempId, realId);
gantt.changeLinkId(tempId, realId);
~~~

## Что дальше

После того как вы поняли две модели данных, можно переходить к конкретным урокам.

Менеджеры состояний:

- [Использование React Gantt с Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Использование React Gantt с Zustand](integrations/react/state/zustand.md)
- [Использование React Gantt с MobX](integrations/react/state/mobx.md)
- [Использование React Gantt с XState](integrations/react/state/xstate.md)
- [Использование React Gantt с Jotai](integrations/react/state/jotai.md)
- [Использование React Gantt с Valtio](integrations/react/state/valtio.md)

Или узнайте больше об использовании императивного API и серверной коммуникации:

- [Конфигурация React Gantt](integrations/react/configuration-props.md)
- [Серверная интеграция](guides/server-side.md)