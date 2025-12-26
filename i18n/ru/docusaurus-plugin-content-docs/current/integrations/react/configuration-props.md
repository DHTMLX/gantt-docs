---
title: "Использование свойств DHTMLX Gantt в ReactGantt"
sidebar_label: "Конфигурация"
---

# Использование свойств DHTMLX Gantt в ReactGantt

На этой странице представлен обзор поддерживаемых свойств (props) React Gantt и объясняется, как они соответствуют возможностям DHTMLX Gantt.

## Доступные свойства (Props)

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
  <td>Поддерживает загрузку данных через встроенный транспорт Gantt и предоставляет колбэки для обработки изменений данных Gantt.</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>Устанавливает [gantt.i18n.setLocale(locale)](guides/localization.md). По умолчанию "en".</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>Применяет [gantt.setSkin(theme)](guides/skins.md). По умолчанию "terrace".</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>React-компонент, заменяющий стандартный Lightbox (см. [Custom Lightbox](guides/custom-edit-form.md)).</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>Позволяет сопоставлять React-редакторы с интерфейсом встроенных редакторов DHTMLX.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>Задает конфигурацию группировки или отключает группировку при значении false или null (см. [Группировка задач](api/method/groupby.md)).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Функция для фильтрации отображаемых задач Gantt.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>Фильтрует ресурсы, отображаемые в [панели ресурсов](guides/resource-management.md).</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>Позволяет заменить модальные окна <code>onBeforeTaskDelete</code> и <code>onBeforeLinkDelete</code> своими компонентами.</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>Обертка поддерживает свойства-обработчики событий, соответствующие событиям DHTMLX Gantt, таким как onTaskClick, onAfterTaskAdd и др. Свойства с совпадающими именами подключаются автоматически.</td>
  </tr>
  </tbody>
</table>

## Пример использования

~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  theme="material"
  locale="en"
  config="{" {
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
    // любые другие свойства gantt.config
  } }
  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates="{" {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  } }
/>
~~~

## Использование событийных свойств (Event Props)

Любое событие DHTMLX Gantt может быть передано как свойство. Например:

~~~js
<ReactGantt

  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
Если вы указываете свойство, например, `onBeforeTaskAdd`, обертка внутренне вызывает [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md). Полный список событий смотрите в [DHTMLX Gantt API](api/overview/events-overview.md).


## Комбинирование свойств и DHTMLX API

Библиотека `@dhx/react-gantt` стремится быть максимально декларативной для повседневного использования, покрывая большинство потребностей через стандартные свойства, такие как tasks, links, resources, templates и другие. Однако бывают ситуации, когда требуется более глубокий доступ к ядру Gantt, например:

- [Расчет рабочего времени](guides/working-time.md)
- [Автоматическое планирование](guides/auto-scheduling.md) или расширенные возможности, такие как [работа с ресурсами](guides/resource-management.md)
- Использование отдельных методов из [Gantt API](api/api-overview.md)

В таких случаях доступны два подхода для взаимодействия с внутренней функциональностью DHTMLX Gantt:

- **React-хуки**, предоставляемые оберткой, которые подключаются к хранилищам данных и логике планирования Gantt

- **Прямой доступ** к экземпляру Gantt через `ref`, если хуки не покрывают все ваши требования

### Использование встроенных хуков

Библиотека `@dhx/react-gantt` предоставляет несколько опциональных хуков, связывающих React-компоненты с внутренними API Gantt. Эти хуки служат мостом к методам и хранилищам данных Gantt. Их можно использовать напрямую в компонентах или объединять в собственные хуки для специфических задач, например, построения гистограмм ресурсов.

#### useGanttDatastore\<T\>(ganttRef, storeName)

Хук `useGanttDatastore` предоставляет только для чтения доступ к определенному хранилищу данных Gantt. Обычно используется для доступа к хранилищу ресурсов, базовым планам или другим встроенным/кастомным хранилищам.

Включает следующие функции:

- `getItem(id)` - получение конкретного элемента из хранилища

- `getItems()` - возвращает все элементы из хранилища

- `hasChild(id: string | number)` - проверяет, есть ли у элемента дочерние

- `getChildren(id: string | number)` - получение дочерних элементов

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // для примера, просто логируем данные
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

Этот хук полезен, когда нужен прямой доступ к низкоуровневым данным из конкретного хранилища, например, чтобы определить, является ли ресурс группой или отдельным элементом.

#### useResourceAssignments(ganttRef)

Хук `useResourceAssignments` предоставляет методы, связанные с ресурсами, включая получение назначений для ресурса или список ресурсов, назначенных задаче.

Доступные функции:

- `getResourceAssignments(resourceId, taskId?)` - соответствует [getResourceAssignments](api/method/getresourceassignments.md)

- `getTaskResources(taskId)` - соответствует [getTaskResources](api/method/gettaskresources.md)

~~~js
import React from 'react';
import { useResourceAssignments } from '@dhx/react-gantt';

export function ResourceUsage({ ganttRef, taskId }) {
  const { getTaskResources } = useResourceAssignments(ganttRef);

  const resources = getTaskResources(taskId);
  return (
    <div>
      Task {taskId} assigned to: 
      {resources.map(r => r.text).join(', ')}
    </div>
  );
}
~~~

Этот хук удобен для реализации собственной логики по использованию ресурсов, например, вычисления выделенных часов или группировки задач по владельцу.

#### useWorkTime(ganttRef)

Этот хук предоставляет доступ к встроенным функциям рабочего времени DHTMLX Gantt, таким как [isWorkTime](api/method/isworktime.md), [calculateEndDate](api/method/calculateenddate.md) и [calculateDuration](api/method/calculateduration.md).

Полезен для выделения рабочих и нерабочих периодов на основе календаря работы Gantt и для вычислений дат с учетом рабочего времени.

Доступные функции:

- `isWorkTime(( date:Date, unit?: string, task?:Task ))` - соответствует [isWorkTime](api/method/isworktime.md)

- `calculateEndDate((start:Date, duration:number, unit?: string, task?: Task))` - соответствует [calculateEndDate](api/method/calculateenddate.md)

- `calculateDuration((start:Date, end:Date, task?: Task))` - соответствует [calculateDuration](api/method/calculateduration.md)

- `getClosestWorkTime(( date:Date, unit?: string, task?: Task, dir?: "past"|"future" ))` - соответствует [getClosestWorkTime](api/method/getclosestworktime.md)

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

#### Композиция хуков в собственные кастомные хуки

Рекомендуется создавать свои доменные или проектные хуки, комбинируя эти базовые хуки. Например, для построения гистограммы ресурсов можно создать кастомный хук, который кэширует значения емкости и суммирует использование ресурсов:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // Кастомная логика: кэширование емкости, определение групп и др.
  // ...
  return {
    // например, getCapacity, getAllocatedValue
  };
}
~~~

### Прямой доступ к экземпляру Gantt через ref

Хотя хуки покрывают большинство продвинутых сценариев, остается возможность прямого доступа ко всему экземпляру Gantt через `ref`:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // здесь можно вызвать ЛЮБОЙ метод Gantt API
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~

((info Учтите, что если вы изменяете tasks или links напрямую через экземпляр Gantt, одновременно передавая их как props в React, необходимо синхронизировать данные или повторно парсить их. В противном случае следующий рендер React может перезаписать ваши изменения. ))

Если необходимо выполнить действия, не реализованные через props, всегда можно вызвать методы gantt напрямую. Подробнее см. в разделе [Accessing the Underlying Gantt API](integrations/react.md#accessingtheunderlyingganttapi).

