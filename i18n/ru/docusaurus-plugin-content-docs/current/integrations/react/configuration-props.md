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
  <th>Свойство</th>
  <th>Тип</th>
  <th>Описание</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>Массив [объектов задачи](guides/supported-data-formats.md).</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>Массив [объектов связи](guides/supported-data-formats.md).</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>Переопределяет [gantt.templates](api/other/templates.md), например: [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md).</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>Объединён в [gantt.config](api/overview/properties-overview.md), например: [scales_config](api/config/scales.md), [columns_config](api/config/columns.md), [autosize_config](api/config/autosize.md).</td>
  </tr>
  <tr>
  <td>calendars</td>
  <td>Calendar[]</td>
  <td>Массив рабочих календарей. Пример: [Working Calendars](integrations/react/overview.md#working-calendars).</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>Массив [объектов ресурсов](/guides/resource-management#manual-creation-of-data-store).</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>Массив [базовых объектов](/guides/inbuilt-baselines#loading-baselines-with-tasks).</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>Массив объектов маркеров для [timeline markers](/guides/markers).</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Расширения Gantt](/guides/extensions-list/), которые нужно активировать (например: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>Позволяет загружать данные через встроенный транспорт Gantt и предоставляет колбэки для изменений, внесённых в данные Gantt.</td>
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
  <td>React-компонент, заменяющий встроенный Lightbox (см. [Custom Lightbox]).</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>Позволяет сопоставлять ваши инлайн-редакторы на базе React с интерфейсом встроенного редактора DHTMLX.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>Объект конфигурации группировки или false/null для отключения группировки (см. [Группировка задач](api/method/groupby.md)).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Функция, используемая для фильтрации задач Gantt.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>Функция, используемая для фильтрации ресурсов для [Панели ресурсов](/guides/resource-management/).</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>Позволяет заменять модальные окна onBeforeTaskDelete и onBeforeLinkDelete пользовательскими компонентами.</td>
  </tr>
  <tr>
  <td>htmlTemplatePolicy</td>
  <td>HtmlTemplatePolicy</td>
  <td>Контролирует, как строки, возвращаемые из функций-шаблонов, рендерятся. <code>"basic-sanitize"</code> (по умолчанию) — whitelist-санитизация возвращаемого HTML: безопасное форматирование, классы, ограниченные встроенные стили, <code>data-*</code> атрибуты и <code>img</code> сохраняются; скрипты, обработчики событий и опасные URL-адреса удаляются. <code>"escape"</code> рендерит строку как текст; <code>"unsafe-html"</code> рендерит исходную строку (поведение до v10); пользовательский объект санитайзера (<code>mode: "sanitize"</code> с функцией <code>sanitize(html)</code>) позволяет подключить такую библиотеку, как DOMPurify. Для управления на уровне отдельных шаблонов оборачивайте отдельные функции-шаблоны экспортируемым помощником <code>allowRawHTML()</code>. [Migration notes](/migration#91---100).</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>Обёртка также поддерживает передачу пропсов-обработчиков событий, соответствующих событиям DHTMLX Gantt. Например, onTaskClick, onAfterTaskAdd и т.д. Если имя пропса совпадает с названием события, оно автоматически прикрепляется.</td>
  </tr>
  </tbody>
</table>

## Экспортируемые типы

Пакет `@dhx/react-gantt` повторно экспортирует несколько типов TypeScript, которые можно использовать для аннотирования вашего кода приложения:

| Экспорт | Описание |
|--------|------------|
| `Task` | Внутренний объект задачи Gantt. Даты представлены как объекты `Date`; включает системные свойства с префиксом `$`. Используйте внутри обработчиков событий и при работе с данными, которые принадлежит Gantt. |
| `Link` | Внутренний объект связи Gantt. Используйте внутри обработчиков событий и при работе с данными, которые принадлежит Gantt. |
| `SerializedTask` | Модель задачи, предназначенная для данных, которыми вы владеете: состояние хранилища, ответы API и начальные данные. Поля дат принимают `Date | string`. |
| `SerializedLink` | Модель связи, предназначенная для данных, которыми вы владеете: состояние хранилища, начальные данные и payloads для сохранения. |

**Когда использовать `SerializedTask` / `SerializedLink` vs `Task` / `Link`:**

- **`SerializedTask` / `SerializedLink`** — для данных, которыми вы владеете: состояние хранилища, ответы API, исходные данные. Поля дат принимают строки (например, даты в ISO-формате).
- **`Task` / `Link`** — для данных, которыми владеет Gantt: внутри обработчиков событий, после того, как Gantt распарсит данные. Поля дат — объекты `Date`. У `Task` есть внутренние свойства с префиксом `$`.

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
    // any other gantt.config you want
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

Вы можете передавать любой событие-Prop DHTMLX Gantt. Например:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
Внутри обёртка вызывает [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md), если вы передаёте проп с именем `onBeforeTaskAdd`. Для полного списка событий смотрите [DHTMLX Gantt API](api/overview/events-overview.md).

## Сочетание пропсов и API DHTMLX

Библиотека `@dhx/react-gantt` задумана как можно более декларативной для повседневного использования — большинство сценариев можно решить с помощью стандартных пропсов (таких как tasks, links, resources, templates и т. п.). Однако могут быть ситуации, когда нужен более глубокий доступ к движку Gantt. Например, для:

- расчётов рабочего времени
- логики автоматического планирования или продвинутых функций, таких как вычисления ресурсов
- вызова любых специализированных методов API Gantt

В таких случаях можно воспользоваться двумя дополнительными подходами, чтобы получить доступ к базовой функциональности DHTMLX Gantt:

- **[React hooks]** специально предоставляемые обёрткой для связывания хранилищ данных Gantt и логики планирования
- **Direct access** к экземпляру Gantt через ref, если встроенные хуки не покрывают все ваши потребности

### Использование встроенных хуков

Библиотека `@dhx/react-gantt` предоставляет хуки для подписки на события, управления ресурсами, доступа к datastore, undo/redo, зума, выбора и расчётов рабочего времени.

См. отдельную страницу **[Hooks](integrations/react/hooks.md)** для полного справочника, включая:

- [useGanttEvent](integrations/react/hooks.md#useganttevent) — подписки на события с управлением жизненным циклом
- [useResourceAssignments](integrations/react/hooks.md#useresourceassignments) — запросы и изменения назначений ресурсов
- [useGanttDatastore](integrations/react/hooks.md#useganttdatastore) — доступ только для чтения к datastore
- [useUndoRedo](integrations/react/hooks.md#useundoredo) — состояние undo/redo и действия
- [useZoom](integrations/react/hooks.md#usezoom) — управление зумом и состояние
- [useSelection](integrations/react/hooks.md#useselection) — трекинг выбора задач
- [useWorkTime](integrations/react/hooks.md#useworktime) — расчёты рабочего времени

### Прямой доступ к экземпляру Gantt через ref

Хотя хуки удовлетворяют большинство продвинутых потребностей, иногда может потребоваться прямой доступ ко всему экземпляру Gantt. Для этого доступ через ref остаётся доступным:

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;
    gantt.showDate(new Date());
  }, []);

  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

:::note
Если вы изменяете задачи или связи через прямой экземпляр Gantt, пока они также подаются как пропсы React, держите их синхронизированными. Иначе следующая перерисовка React может перезаписать ваши ручные изменения.
:::

См. раздел [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi) для дополнительной информации.