---
title: Использование свойств DHTMLX Gantt в ReactGantt
sidebar_label: Конфигурация
description: "Полное руководство по пропсам-обертке, сопоставленным с конфигурацией Gantt, шаблонами, событиями и хранилищами данных"
---

# Использование свойств DHTMLX Gantt в ReactGantt

Эта страница описывает принимаемые React Gantt свойства и то, как они сопоставляются с возможностями DHTMLX Gantt.

## Доступные свойства

<table>
  <thead>
  <tr>
  <th>Prop</th>
  <th>Тип</th>
  <th>Описание</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>Массив [объектов задач](guides/supported-data-formats.md#json).</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>Массив [объектов связей](guides/supported-data-formats.md#json).</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>Переопределяет [gantt.templates](api/overview/templates-overview.md), такие как [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md).</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>Объединяется с [gantt.config](api/overview/properties-overview.md), включая опции как [scales](api/config/scales.md), [columns](api/config/columns.md), [autosize](api/config/autosize.md).</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>Массив [объектов ресурсов](guides/resource-management.md).</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>Массив [объектов базовых планов](guides/inbuilt-baselines.md).</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>Массив объектов маркеров для [маркировки на временной шкале](guides/markers.md).</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Расширения Gantt](guides/extensions-list.md), которые должны быть включены (например, [critical_path](guides/critical-path.md), [auto_scheduling](guides/auto-scheduling.md)).</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>Позволяет загружать данные через встроенный транспорт Gantt и предоставляет колбэки для изменений в данных Gantt.</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>Устанавливает [gantt.i18n.setLocale(locale)](/guides/localization/). По умолчанию — "en".</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>Применяет [gantt.setSkin(theme)](/guides/skins/). По умолчанию — "terrace".</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>Компонент React, который заменяет встроенный Lightbox (см. [Custom Lightbox](/guides/custom-edit-form/).)</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>Позволяет сопоставлять ваши React-базированные inline-редакторы с интерфейсом встроенного inline редактора DHTMLX.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>Объект конфигурации группировки или false/null для отключения группировки (см. [Grouping Tasks ](api/method/groupby.md)).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Функция, используемая для фильтрации задач Gantt.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>Функция, используемая для фильтрации ресурсов для [Resource Panel](/guides/resource-management/).</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>Позволяет заменить <code>onBeforeTaskDelete</code> и <code>onBeforeLinkDelete</code> модальные окна на пользовательские компоненты.</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>Обертка также поддерживает передачу пропсов-обработчиков событий, соответствующих событиям DHTMLX Gantt. Например, onTaskClick, onAfterTaskAdd и т. д. Если имя пропса совпадает с именем события, он прикрепляется автоматически.</td>
  </tr>
  </tbody>
</table>

## Пример использования

~~~jsx
<ReactGantt
  tasks={tasks}
  links={links}
  theme="material"
  locale="en"
  config={{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%M" }
    ],
    columns: [
      { name: "text", tree: true, width: '*' },
      { name: "start_date", align: "center" },
      { name: "duration", align: "center" },
      { name: "add" }
    ],
    // любой другой gantt.config, который вы хотите
  }}
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  }}
/>
~~~

## Использование пропсов-ивентов (Event Props)

Любое событие DHTMLX Gantt может быть передано как свойство. Например:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
Внутренне обертка вызывает [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md), если вы передаете проп с именем `onBeforeTaskAdd`. Для полного списка событий смотрите [DHTMLX Gantt API](api/overview/events-overview.md).


## Сочетание пропсов и DHTMLX API

Библиотека `@dhx/react-gantt` спроектирована как можно более декларативной для повседневного использования — большинство сценариев можно решить с помощью стандартных пропсов (таких как tasks, links, resources, templates и т. д.). Однако могут быть ситуации, когда нужен более глубокий доступ к движку Gantt. Например, для:

- Расчётов рабочего времени
- Логики автопланирования или продвинутых функций, таких как [resource computations]
- Вызова любых специализированных методов из [Gantt API]

В таких случаях вы можете использовать два дополнительных способа доступа к функциональности DHTMLX Gantt:

- **React хуки**, специально предоставляемые оберткой, чтобы связать данные хранилищ и логику планирования Gantt

- **Прямой доступ** к экземпляру Gantt через `ref`, если встроенные хуки не покрывают все ваши потребности

### Использование встроенных хуков

Библиотека `@dhx/react-gantt` предоставляет набор опциональных хуков, которые соединяют React-компоненты с внутренними API Gantt. Эти хуки служат «мостом» к базовым методам и хранилищам Gantt. Вы можете вызывать эти хуки напрямую в своих компонентах или композировать их в собственные кастомные хуки для специализированных возможностей, например, для построения гистограмм ресурсов.

#### useGanttDatastore&lt;T&gt;(ganttRef, storeName)

Хук `useGanttDatastore` обеспечивает доступ только для чтения к конкретному хранилищу Gantt.  
Распространённое использование — доступ к хранилищу ресурсов, baseline или любому другому встроенному или пользовательскому хранилищу.

Он предоставляет следующие функции:

- `getItem(id)` - возвращает указанный элемент из хранилища

- `getItems()` - возвращает все элементы в указанном хранилище

- `hasChild(id: string | number)` - проверяет, имеет ли элемент дочерние элементы

- `getChildren(id: string | number)` - получает дочерние элементы

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // для демонстрации — просто выводим данные
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

Вы можете использовать этот хук, когда вам нужны прямые низкоуровневые данные из конкретного хранилища. Например, чтобы проверить, является ли ресурс группой по сравнению с отдельным элементом.

#### useResourceAssignments(ganttRef)

Хук `useResourceAssignments` обеспечивает доступ к методам Gantt, связанным с ресурсами, таким как получение назначений для ресурса или перечисление ресурсов, назначенных на данную задачу.

Он предоставляет следующие функции:

- `getResourceAssignments(resourceId, taskId?)` - мост к [](api/method/getresourceassignments.md)
- `getTaskResources(taskId)` - мост к [](api/method/gettaskresources.md)

~~~js
import React from 'react';
import { useResourceAssignments } from '@dhx/react-gantt';

export function ResourceUsage({ ganttRef, taskId }) {
  const { getTaskResources } = useResourceAssignments(ganttRef);

  const resources = getTaskResources(taskId);
  return (
    <div>
      Задаче {taskId} назначены ресурсы: 
      {resources.map(r => r.text).join(', ')}
    </div>
  );
}
~~~

Вам может понадобиться этот хук для любой пользовательской логики вокруг использования ресурсов, например, расчета отведённых часов или группировки задач по владельцу.

#### useWorkTime(ganttRef)

Обеспечивает прямой мост к встроенным функциям DHTMLX Gantt worktime, таким как [](api/method/isworktime.md), [](api/method/calculateenddate.md), [](api/method/calculateduration.md).

Вам понадобится этот хук для подсветки рабочего/нерабочего времени в соответствии с настройками календаря work calendar и для операций с датами.

Он предоставляет следующие функции:

- `isWorkTime({ date:Date, unit?: string, task?:Task })` - мост к [](api/method/isworktime.md)
- `calculateEndDate({start:Date, duration:number, unit?: string, task?: Task})` - мост к [](api/method/calculateenddate.md)
- `calculateDuration({start:Date, end:Date, task?: Task})` - мост к [](api/method/calculateduration.md)
- `getClosestWorkTime({ date:Date, unit?: string, task?: Task, dir?: "past"|"future" })` - мост к [](api/method/getclosestworktime.md)


~~~js
import { useEffect, useRef, useState } from 'react';
import ReactGantt, {GanttTemplates, useWorkTime} from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime }= useWorkTime(ganttRef);
  ...
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  };
  ...
~~~

#### Соединение хуков в ваши собственные кастомные хуки

Отличная практика — создавать собственные доменные или проектно-специфические хуки, используя эти фундаментальные мостовые хуки. Например, если вы хотите создать гистограмму ресурсов, можно сделать кастомный хук, который кэширует значения ёмкости, суммирует использование ресурсов и т. п.:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // Пользовательская логика: кэширование ёмкости, детекция групп и т. д.
  // ...
  return {
    // напр. getCapacity, getAllocatedValue
  };
}
~~~

### Прямой доступ к экземпляру Gantt через ref

Хотя эти хуки покрывают большинство продвинутых потребностей, вам может понадобиться прямой доступ ко всему экземпляру Gantt. Для этого остается доступным подход через ref:

~~~jsx
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // здесь можно вызывать ЛЮБОЙ метод API Gantt
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

:::note
Примечание: имейте в виду, что если вы изменяете tasks/links во встроенном экземпляре Gantt и одновременно передаете их как props в React, синхронизируйте данные или повторно разберите их. Иначе при следующем перерендеривании React ваши ручные изменения могут быть перезаписаны.
:::

Если вы хотите выполнить что-то, что не доступно через проп, вы всё равно можете вызывать методы gantt напрямую. См. [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi) для получения дополнительной информации.