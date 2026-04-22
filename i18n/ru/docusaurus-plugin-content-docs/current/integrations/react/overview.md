---
title: Обзор React Gantt
sidebar_label: Обзор
description: "Обзор официальной обёртки React: возможности, пропсы, темизация, события и доступ к базовому API Gantt"

---

# Обзор React Gantt

:::note
React Gantt доступен по лицензиям [Commercial, Enterprise и Ultimate](https://dhtmlx.com/docs/products/licenses.shtml).
Если вы используете Individual или GPL-версии Gantt, пожалуйста, обратитесь к статье [Как начать работу](integrations/react/js-gantt-react.md) для React.
:::

## Обзор

DHTMLX Gantt — это чистый JS-компонент, который может работать в любой браузерной среде. Коммерческие версии и выше Gantt включают компонент **React Gantt**, который инкапсулирует DHTMLX Gantt и позволяет использовать его нативно в React.

Обёртка позволяет создать полноценно функционирующую диаграмму Ганта в ваших React-приложениях, используя знакомую модель props/state. В ядре она управляет обычным экземпляром DHTMLX Gantt, преобразуя ваши React-пропсы (такие как задачи и конфигурацию) в соответствующую инициализацию Gantt и структуры данных.

**Ключевые возможности**

- Декларативная обработка данных: передавайте массивы задач, связей, ресурсов и т. д. как пропсы.
- Настройка: сопоставляйте React-пропсы с базовыми *gantt.config*, *gantt.templates*, *gantt.plugins* и т. д.
- Доступ к полному API Gantt: используйте ref для вызова методов вроде [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md) или [addTaskLayer](api/method/addtasklayer.md).
- Простая настройка: используйте React-компоненты в качестве шаблонов, форм Lightbox или встроенных редакторов (inline editors).

Если вы новичок в DHTMLX Gantt, ознакомьтесь с [документацией DHTMLX Gantt](guides.md) для обзора возможностей, таких как [Work Time Calculation](guides/working-time.md), [Auto Scheduling](guides/auto-scheduling.md), [Resource Management](guides/resource-management.md) и многое другое.


:::tip AI-assisted development
Если вы используете AI-асистент для кодирования, навык агента DHTMLX React Gantt ([integrations/ai-tools/agent-skills.md#available-skills](integrations/ai-tools/agent-skills.md#available-skills)) может помочь ему следовать корректным паттернам интеграции и избегать распространённых ошибок. Для справки по API в реальном времени подключите [DHTMLX MCP server](integrations/ai-tools/mcp-server.md).
:::


## Установка и доступ к NPM

Для актуальных инструкций по установке для обеих сборок — Evaluation и Professional — включая конфигурацию npm-репозитория и офлайн-образцы, смотрите [Руководство по установке](integrations/react/installation.md).

После установки пакета вы можете импортировать обёртку в вашем React-коде следующим образом:

~~~ts
// Evaluation сборка (публичный npm)
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

// Professional сборка (приватный npm)
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
~~~

## Требования к версии

- React `v18.0.0` или новее

## Базовое использование

Вот минимальный фрагмент, показывающий, как импортировать и отрендерить диаграмму Ганта:

~~~jsx
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={ { height: '500px' }}>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}
      />
    </div>
  );
}
~~~

Обратите внимание, что вышеуказанный фрагмент демонстрирует включение коммерческой версии Gantt. Чтобы использовать код источников пробной версии, добавьте пакет следующим образом:

~~~js
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
~~~

Где **demoData** имеет следующий [формат](guides/loading.md):

~~~js
export const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
   	{ id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "01-06-2025", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "04-06-2025", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "08-06-2025", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "08-06-2025", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "12-06-2025", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "18-06-2025", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export {demoData};
~~~


## Связь данных {#bindingdata}

Обёртка **React Gantt** предлагает гибкие способы загрузки и сохранения данных. В концептуальном плане существует два основных подхода к управлению изменениями в ваших данных Gantt:

- **React (или менеджер состояния) — источник истины**
- **Gantt как источник истины**

Оба подхода валидны, но следует выбрать один и придерживаться его последовательно, чтобы избежать непредвиденного поведения.

:::info Ищете более подробное объяснение?

Этот раздел дает обзор на уровнеHigh-level двух моделей связывания.
Для детального руководства с полными примерами смотрите [](integrations/react/state/state-management-basics.md).
:::

### React (или менеджер состояния) — источник истины

В этом шаблоне **ReactGantt** получает все данные задач/связей через пропсы (из `useState`, Redux, Zustand и т. д.). Когда пользователь изменяет задачи или связи в диаграмме, Gantt вызывает обратный вызов `data.save`. В этом колбэке вы обновляете состояние вашего приложения. Когда состояние меняется, React повторно рендерит **ReactGantt**, и инстанс Gantt синхронизируется с последними данными.

~~~tsx
import { useMemo, useState } from 'react';
import ReactGantt, { type Task, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function MyGanttApp({ initialTasks, initialLinks }: {
  initialTasks: Task[];
  initialLinks: Link[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: any, id: string | number) => {
        if (entity === 'task') {
          setTasks((prev) => {
            if (action === 'create') return [...prev, item as Task];
            if (action === 'update') return prev.map((task) =>
              task.id === id ? (item as Task) : task
            );
            if (action === 'delete') return prev.filter((task) => task.id !== id);
            return prev;
          });
        }

        if (entity === 'link') {
          setLinks((prev) => {
            if (action === 'create') return [...prev, item as Link];
            if (action === 'update') return prev.map((link) =>
              link.id === id ? (item as Link) : link
            );
            if (action === 'delete') return prev.filter((link) => link.id !== id);
            return prev;
          });
        }
      },
    }),
    []
  );

  return (
    <ReactGantt
      tasks={tasks}
      links={links}
      data={data}
    />
  );
}
~~~

Этот подход делает ваше состояние в React (или глобальное состояние) единственным источником истины. Он естественно работает с менеджерами состояния такими как Redux Toolkit, Zustand, MobX, Jotai, XState или Valtio - просто заменяете `useState` на ваши store-хуки/селекторы и переносите логику обновления в хранилище.

Для дополнительных примеров (включая интеграции с конкретными менеджерами) смотрите [React как источник истины](integrations/react/state/state-management-basics.md#reactstateasthesourceoftruth).

### Gantt как источник истины

В этом подходе **сам Gantt** хранит авторитетную копию данных. Вы всё ещё инициализируете или загружаете задачи и связи (через пропсы или URL), но как только диаграмма запущена, Gantt обрабатывает изменения внутри и перенаправляет обновления на ваш бэкэнд или обработчик, не проходя через React-состояние при каждом редактировании.

~~~tsx
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function GanttTransportExample() {
  return (
    <ReactGantt
      data={{
        load: '/api/gantt/data',  // Gantt загружает задачи/связи с этого эндпойнта
        save: '/api/gantt/data',  // Gantt отправляет изменения обратно сюда
      }}
    />
  );
}
~~~

В этом режиме:

- локальный инстанс Gantt остаётся основным держателем текущих данных
- React не перерисовывается при каждом изменении задачи/связи
- пакетные операции, такие как Auto Scheduling, дешевле, поскольку не вызывают повторных обновлений React

Если у вас всё ещё есть представление о задачах/связях в состоянии React, будьте внимательны, чтобы не перезаписать внутреннее состояние Gantt устаревшими данными.

Дополнительные детали смотрите в [Gantt как источник истины](integrations/react/state/state-management-basics.md#ganttasthesourceoftruth).

## Конфигурация & Свойства (Props)

Обёртка React принимает проп `config` (сопоставляется с [gantt.config](api/overview/properties-overview.md)) и проп `templates` (сопоставляется с [gantt.templates](api/overview/templates-overview.md)).


~~~js
<ReactGantt
  tasks={tasks}
  links={links}
  config= {{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ],
    columns: [
      { name: "text", tree: true, width: "*", resize: true },
      { name: "start_date", align: "center", resize: true },
      { name: "duration", align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        template: (task) => <AlertButton task={task} onClick={handleButtonClick} />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  }}
  templates= {{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  }}
/>
~~~

### Использование React-компонентов в шаблонах 

При указании шаблонов в пропах вы можете возвращать React-элементы из функций шаблонов:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates={{
    task_text: (start, end, task) => {
      return <PriorityBadge priority={task.priority} />;
    }
  }}
/>
~~~

:::note
Внутренне DHTMLX Gantt манипулирует DOM не-React способом. Когда вы возвращаете React-компоненты из шаблонов, они внедряются в HTML Gantt через порталы. Имейте в виду, что при больших наборах данных рендеринг сложных React-компонентов может повлиять на производительность.
:::

Вы можете переопределить многие аспекты с помощью шаблонов:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md) для столбцов
- [форматирование шкалы](guides/configuring-time-scale.md#dateformat) для заголовков временной шкалы
- [шаблоны колонок](guides/specifying-columns.md#datamappingandtemplates) для левых ячеек грида
- и многое другое. Обратитесь к [доступным руководствам](guides.md) по Gantt

Полный список пропсов, поддерживаемых React Gantt, смотрите в следующей статье: [](integrations/react/configuration-props.md)

## Темы и стили (Themes & Styling)

Gantt поставляется с несколькими встроенными темами, которые можно активировать через проп **theme** и динамически менять:

~~~jsx
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {
  const [theme, setTheme] = useState("terrace"); 
  const tasks = [...];
  const links = [...];

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };


  return (
    <div style={{height: '600px'}}>
      <div>
        <button onClick={switchTheme}>Switch Theme</button>
      </div>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}  /*!*/
      />
    </div>
  );
}
~~~

Подробные описания существующих тем можно найти в статье [Этикетки/скины](guides/skins.md).

Темы можно дополнительно настраивать с помощью пользовательских стилей и переопределения CSS-переменных:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

Для дополнительной настройки ознакомьтесь с руководством по [Настройке тем](guides/custom-skins.md).

## Замена Lightbox (Редактора задач)

DHTMLX Gantt поставляется с встроенным конфигурируемым редактором задач, называемым [Lightbox](guides/default-edit-form.md).

Если нужно, вы можете заменить его на модальное окно на базе React или любой другой компонент одним из следующих способов:

### Передача пользовательского компонента через проп `customLightbox`

Чтобы сделать это, передайте компонент через проп **customLightbox**:

~~~js
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data: any;
  onSave: (task: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {
  const [description, setDescription] = useState<string>(data.text || '');

  const handleSaveClick = () => {
    onSave({ ...data, text: description });
  };

  const modalStyles = {
   ...
  };

  return (
    <div>
      <div style={modalStyles.overlay} onClick={onCancel} />
      <div style={modalStyles.content}>
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>
        <div style={modalStyles.buttonGroup}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

После этого вы можете использовать добавленный компонент следующими способами:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const ganttRef = useRef(null);

  const tasks = [...];
  const links = [...];

  useEffect(() => {
    //const gantt = ganttRef.current?.instance;
    
  }, []);

  return (
    <ReactGantt 
      ref={ganttRef}
      tasks={tasks}
      links={links}
      customLightbox={<CustomLightbox />} />
  );
}
~~~

### Через обработчик события onBeforeLightbox

Для более сложных сценариев можно перехватить событие [onBeforeLightbox](api/event/onbeforelightbox.md) (вызывается, когда Lightbox активируется) и переопределить поведение по умолчанию:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const ganttRef = useRef<any>(null);

  const tasks = [...];
  const links = [...];
  const navigate = useNavigate();

  const handleTaskEdit = (id: any) => {
    const ganttInstance = ganttRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: ganttInstance.getTask(id) } });
  };

  return (
    <ReactGantt 
      ref={ganttRef}
      tasks={tasks}
      links={links}
      onBeforeLightbox={handleTaskEdit} />
  );
}
~~~

### По использованию JS Gantt API

Пожалуйста, смотрите [Custom Lightbox](guides/custom-edit-form.md) для дальнейших деталей по переопределению или расширению встроенного Lightbox.

## Замена встроенных модальных окон

По умолчанию UI включает два модальных попапа:

- подтверждение перед удалением задачи
- подтверждение перед удалением связи

Оба можно переопределить с помощью пропа `modals` у ReactGantt:

~~~js
<ReactGantt
  ...
  modals={{
    onBeforeTaskDelete: ({
      task,
      callback,
      ganttInstance,
    }: {
      task: Task;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
    onBeforeLinkDelete: ({
      link,
      callback,
      ganttInstance,
    }: {
      link: Link;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
  }}
  ...
/

~~~

Эти пропсы можно использовать для активации ваших кастомных модалов, когда вызывается диалог подтверждения Gantt. Вызов `callback()` из переданных аргументов завершит удаление соответствующей задачи или связи. Чтобы отменить удаление, просто закройте модальное окно, не вызывая callback.

## Использование React-компонентов в Грид (Grid)

### В заголовках

Свойство `label` у столбца грида может быть либо строкой, либо React-элементом. Это позволяет встроить фильтры, кнопки или другие UI-элементы напрямую в заголовок столбца:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // Встроенный React элемент прямо в заголовке
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // Либо функция, возвращающая React-элемент:
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

Когда обёртка обнаруживает React-элемент в заголовке или любом другом свойстве шаблона, она отрисует этот элемент через портал в ячейку заголовка грида.

### В ячейках

Ячейки грида определяются свойством `template` столбца. Эта функция-шаблон принимает объект задачи и должна возвращать либо строку или React-элемент:

~~~jsx
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick={onClick}>{`Task ID: ${task.id}`}</button>;
}

export default function GanttWithGridCells({ handleButtonClick, ganttRef }) {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      { name: "start_date", width: 150, align: "center", resize: true },
      { name: "duration", width: 80, align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        label: <span>My Column</span>,
        width: 140,
        // Возвращение React-элемента
        template: (task) => (
          <AlertButton
            task={task}
            onClick={() => {
              handleButtonClick(task);
              // Принудительно пересчитать задание при необходимости
              ganttRef.current?.instance.updateTask(task.id);
            }}
          />
        ),
        resize: true,
      },
      { name: "add", width: 44 },
    ],
    row_height: 40,
    grid_width: 550,
  };

  return <ReactGantt ref={ganttRef} config={config} /* ...other props */ />;
}
~~~

Возвращая React-элемент из шаблона столбца, вы можете создавать полностью интерактивный контент (кнопки, выпадающие списки, бейджи и т. д.) в каждой ячейке грида. Внутренний код обёртки вставляет эти элементы через порталы в DOM-узлы, которыми управляет Gantt.

### В встроенных редакторах (inline editors)

DHTMLX Gantt поддерживает встроенное редактирование для ячеек грида. В этом обёртке вы можете предоставить собственные редакторы на React, указав объект редактора в конфигурации столбца и затем сопоставив имя редактора React-компоненту в пропе `inlineEditors`. См. пример ниже.


Определим компонент редактора на React:

~~~jsx
import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/react-gantt';


const MyInlineEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
    ({ initialValue, task, save, cancel, ganttInstance }, ref) => {
        const [value, setValue] = useState(initialValue || "");

        useImperativeHandle(ref, (): InlineEditorMethods => ({
            getValue: () => value,
            setValue: (val: any) => setValue(val),
            isValid: () => true, 
            focus: () => {

            },
            isChanged: (originalValue: any) => {
                return originalValue !== value;
            },

            save: () => {  }
        }));

        return (
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

Используйте пользовательский редактор в вашей конфигурации Gantt:

~~~jsx
import ReactGantt from "@dhx/react-gantt";
import MyInlineEditor from "./CustomInlineEditor";

function Demo() {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      {
        name: "duration",
        width: 80,
        align: "center",
        editor: { type: "customInputEditor", map_to: "text" }, /*!*/
        resize: true
      },
      { name: "start_date", width: 150 },
      { name: "add", width: 44 }
    ]
  };

  return (
    <ReactGantt
      config={config}
      inlineEditors={{
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks={[/*...*/]}
      links={[/*...*/]}
    />
  );
}
~~~

Когда пользователь дважды кликнет по ячейке столбца, Gantt отобразит ваш редактор непосредственно на месте. Внутренний код обёртки вызывает методы (getValue, setValue и т. д.), которые вы экспортируете через `useImperativeHandle(ref, ...)`, обеспечивая синхронизацию инстанса Gantt с изменениями в вашем компоненте.

Значение свойства `type` объекта редактора должно соответствовать ключу в `inlineEditors`.

Свойство `map_to` задаёт свойство объекта Task, из которого редактор будет считывать и записывать значения. Обратите внимание на статью, охватывающую [inline editing](guides/inline-editing.md) для получения дополнительных деталей.

Если вы реализуете редактор, который делает что-то более сложное, чем простое запись значения в свойство задачи — вам нужно реализовать необходимую логику в функции **save** и указать опцию ввода `map_to` как **"auto"**. В таком случае gantt не будет изменять сам объект задачи, а вызовет функцию сохранения в момент применения изменений редактором. Значение `initialValue` редактора будет передано как `null`.

:::note
Обратите внимание, вы можете определить не-React inline editors, используя свойство [editor_types](guides/inline-editing.md#custominlineeditor) в конфигурации **config**.
:::

#### Свойства редактора компонента

- <span class="subproperty">**initialValue**</span> - (*any*) - исходное значение редактора
- <span class="subproperty">**task**</span> - (*Task*) - задача, которая редактируется
- <span class="subproperty">**save**</span> - (*function*) - сообщает gantt сохранить и закрыть редактор
- <span class="subproperty">**cancel**</span> - (*function*) - сообщает gantt закрыть редактор без сохранения
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - текущий инстанс базового объекта Gantt


## Фильтрация (Filtering)

Используйте проп `filter`, чтобы задать фильтр для задач, которые должны отображаться:

~~~jsx
const [filter, setFilter] = useState<((task: Task) => boolean) | null>(null);

function showCompleted() {
  setFilter(() => (task: Task) => task.progress === 1);
}
function resetFilter() {
  setFilter(null);
}

return (
  <ReactGantt
    ...
    filter={filter}
    ...
  />
);

~~~

Чтобы фильтровать ресурсы в [Resource Panel](guides/resource-management.md), используйте проп `resourceFilter`:

~~~js
function handleResourceSelectChange(resourceId: string | null) {
  setSelectedResource(resourceId);
  if (resourceId === null) {
    setResourceFilter(null);
  } else {
    setResourceFilter(
      () => (resource: ResourceItem) => String(resource.id) === String(resourceId)
    );
  }
}

return (
  <ReactGantt
    ref={ganttRef}
    tasks={tasks}
    links={links}
    resources={resources}
    resourceFilter={resourceFilter}
    config={config}
    templates={templates}
    plugins={{auto_scheduling: true }}
  />
);

~~~

## Рабочие календари (Working Calendars)

Чтобы включить расчеты рабочего времени в **ReactGantt**, убедитесь, что включено [work_time](api/config/work_time.md):

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

Рабочие календари могут передаваться в **ReactGantt** через проп `calendars`:

~~~jsx
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // глобальные рабочие часы для будних дней
    days: {
      weekdays: {
        0: false, // 0 = Sunday, 6 = Saturday
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
      },
      dates: {
        "2025-04-06": true,  // переопределение рабочих часов для конкретной даты
        "2025-04-08": false
      }
    }
  }
];

return (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ReactGantt
      ...
      calendars={calendars}
      ...
    />
  </div>
);

~~~

Чтобы подчеркнуть рабочее время на временной шкале или выполнить расчеты рабочего времени, вы можете использовать предоставляемый хук `useWorkTime`:

~~~jsx
import ReactGantt, { useWorkTime, Calendar } from "@dhx/react-gantt";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime } = useWorkTime(ganttRef);
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({ date, task }) ? "" : "weekend";
    }
  };

  const calendars: Calendar[] = [
    {
      id: "global",
      hours: ["8:00-12:00", "13:00-17:00"], // глобальные часы работы на будни
      days: {
        weekdays: {
          0: false, // 0 = Sunday, 6 = Saturday
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: false
        },
        dates: {
          "2025-04-06": true,  // переопределение рабочих часов для конкретной даты
          "2025-04-08": false
        }
      }
    }
  ];

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        calendars={calendars}
        templates={templates}
        config={config}
        ref={ganttRef}
      />
    </div>
  );
};

~~~

Кроме того, можно получить доступ к [внутреннему объекту Gantt](#accessingtheunderlyingganttapi) и использовать методы рабочего времени напрямую.

## Группировка задач {#groupingtasks}

Используйте проп `groupTasks` для [группировки задач](guides/grouping.md) по любому свойству задачи:

~~~js
  const [grouping, setGrouping] = useState<GroupConfig | boolean>({
    relation_property: 'status',
    groups:[
      {id: 1, name: "New"},
      {id: 2, name: "In Progress"},
      {id: 3, name: "Done"}
    ],
    group_id: "key",
    group_text: "label"
  });

  return (
  <ReactGantt
    ref={ganttRef}
    tasks={tasks}
    links={links}
    groupTasks={grouping}
  />
);
~~~

Чтобы отключить группировку, установите `groupTasks` в `false`:

~~~js
setGrouping(false);
~~~


## Вертикальные маркеры в зоне Timeline

[Vertical markers](guides/markers.md) можно добавить в **ReactGantt** через свойство `markers`:

~~~jsx
  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 2),
    text: "Project start!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 3, 16),
    text: "Project end",
    css: "project-end"
  };

  const [markers, setMarkers] = useState<Marker[]>([
    projectStartMarker,
    projectEndMarker
  ]);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        markers={markers}
        ...
      />
    </div>
  );
~~~

:::note
Примечание: свойство **text** маркера принимает либо HTML-строку, либо React-элемент
:::

## Доступ к базовому API Gantt {#accessingtheunderlyingganttapi}

Во многих случаях пропы ReactGantt достаточно для настройки вашей диаграммы. Однако иногда вам понадобится прямой доступ к API DHTMLX Gantt для продвинутых операций (например, расчёты рабочего времени, gantt.showDate, gantt.unselectTask или пользовательское масштабирование).

### Использование встроенных хуков

ReactGantt предоставляет готовые хуки, которые expose некоторые методы API Gantt. Ознакомьтесь со статьей по [соответствующему разделу](integrations/react/configuration-props.md).

### Использование Ref

Если декларативные пропсы и встроенные хуки недостаточны, обёртка позволяет получить доступ к внутреннему экземпляру Gantt через `ref`:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // здесь можно вызвать ЛЮБОЙ метод API Gantt
    console.log('Все задачи:', gantt.getTaskByTime());
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


См. Другая ссылка: DHTMLX Gantt [API Reference](api/overview/methods-overview.md) для полного списка методов.

#### Избегайте конфликтов с пропсами React

- Если вы вручную вызываете `gantt.parse({ tasks, links })` или `gantt.addTask()` из вашего кода, имейте в виду, что может потребоваться поддерживать синхронность с пропсами React. Иначе, при следующем рендере React может перезаписать ваши ручные изменения.
- Рекомендуется полагаться на пропсы обёртки для задач и связей или управлять ими через ваше состояние в React. Затем позвольте обёртке заново распарсить данные.

## Совместимость с SSR-фреймворками (Next.js, Remix)

:::note
Начиная с ReactGantt v9.0.12 обёртка готова к SSR. Вы можете импортировать её в Next.js или Remix без отключения SSR. Если используете более старые версии — необходимо отключить или отложить сервер-сайд рендеринг для любого маршрута или компонента, который использует ReactGantt.
:::

:::note
Во время серверного рендеринга компонент выводит лишь заполнителя `<div>`, фактический размет Gantt создаётся во время гидратации на стороне браузера.
:::

#### Next.js

ReactGantt совместим с SSR, однако ваш собственный компонент в большинстве реальных сценариев должен быть клиентским компонентом.

Вам нужно будет добавить `"use client"` в начале вашего компонента всякий раз, когда вы используете `ref` для доступа к инстансу Gantt, передаёте обработчики событий или колбэки, возвращаете React элементы из шаблонов, 

Это типичная конфигурация:

~~~jsx
'use client';

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~

Если вы используете устаревшие версии (v9.0.11 или старше), вам нужно динамически импортировать ваш компонент ReactGantt с отключённым SSR:

~~~jsx
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~


#### Remix

Начиная с v9.0.12, обёртка `<ClientOnly>` больше не требуется для Remix:

~~~js

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~


Если вы используете устаревшие версии (v9.0.11 или старше), вам нужно условно отрисовывать компонент Gantt только на клиенте:

~~~jsx
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback={<p>Загрузка...</p>}>
        {() => <ReactGantt
          tasks={/* ... */}
          links={/* ... */}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

## Следующие шаги

- Для дополнительной информации о том, как настроить ReactGantt, смотрите [эту статью](integrations/react/configuration-props.md)
- Для продвинутого использования смотрите [документацию DHTMLX Gantt](guides.md)