---
title: "React Gantt"
sidebar_label: "Обзор"
---

React Gantt
==================

:::note
React Gantt доступен по [Commercial, Enterprise и Ultimate лицензиям](https://dhtmlx.com/docs/products/licenses.shtml).
Для пользователей Individual или GPL версий Gantt, пожалуйста, ознакомьтесь с руководством [How to Start](integrations/react/quick-start.md) для React.
:::

Обзор
--------------------

DHTMLX Gantt - это чистый JavaScript-компонент, совместимый с любыми браузерами. Коммерческие и более старшие версии включают компонент **React Gantt**, который оборачивает DHTMLX Gantt и облегчает интеграцию в приложения на React.

Этот враппер позволяет создавать полнофункциональные диаграммы Gantt с использованием привычной модели props и state в React. Внутри он управляет стандартным экземпляром DHTMLX Gantt, преобразуя React props (такие как tasks и config) в соответствующую инициализацию и структуры данных Gantt.

**Ключевые возможности**

- Декларативное управление данными: передавайте массивы задач, связей, ресурсов и др. через props.
- Гибкая настройка: сопоставляйте React props с *gantt.config*, *gantt.templates*, *gantt.plugins* и др.
- Полный доступ к API Gantt: используйте ref для вызова методов, таких как [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md) или [addTaskLayer](api/method/addtasklayer.md).
- Простая кастомизация: реализуйте React-компоненты для шаблонов, форм lightbox или inline-редакторов.

Если вы только начинаете работать с DHTMLX Gantt, документация [DHTMLX Gantt](guides.md) даст обзор возможностей, включая [Расчёт рабочего времени](guides/working-time.md), [Автоматическое планирование](guides/auto-scheduling.md), [Управление ресурсами](guides/resource-management.md) и другие.

Установка и доступ через NPM
-------------------

**Установка пробной версии React Gantt**

:::note
Чтобы попробовать пробную версию React Gantt, скачайте дистрибутив DHTMLX Gantt с [этой страницы](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) и следуйте инструкциям в файле README. В комплекте есть и примеры для React Gantt.
Обратите внимание, что пробная версия действительна только 30 дней.
:::

**Установка PRO-версии React Gantt**

:::note
Доступ к приватному npm-репозиторию DHTMLX предоставляется через [Client's Area](https://dhtmlx.com/clients/), где вы можете сгенерировать npm-логин и пароль. Подробная инструкция по установке доступна там же. Для доступа к приватному npm необходима действующая проприетарная лицензия Gantt.
:::

Требования к версиям
--------------------

- React `v18.0.0` или новее

Базовое использование
-------------------

Ниже приведён простой пример импорта и отображения диаграммы Gantt:

~~~js
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={{height: '500px' }}>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"
      />
    </div>
  );
}
~~~

Объект **demoData** соответствует [этому формату](guides/loading.md):

~~~
const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
    { id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "2025-06-01", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "2025-06-04", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "2025-06-08", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "2025-06-08", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "2025-06-12", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "2025-06-18", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export demoData;
~~~

Связывание данных
--------------------

Враппер **ReactGantt** поддерживает гибкие варианты загрузки и сохранения данных. Есть два основных подхода к обработке изменений данных Gantt:

1. Использование состояния React как основного источника данных
2. Использование Gantt как основного источника данных

Оба метода работают хорошо, но рекомендуется выбрать один и придерживаться его, чтобы избежать неожиданных проблем.

### Состояние React как источник данных

В этом подходе **ReactGantt** читает все данные задач и связей из состояния React. Когда пользователь изменяет задачи или связи в Gantt (например, добавляет или удаляет задачу), вызывается callback. В этом callback вы обновляете состояние React с учётом изменений. После обновления состояния React повторно рендерит **ReactGantt**, который загружает актуальные данные из нового состояния.

~~~js
function MyGanttApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'task') {
        if (action === 'create') {
          setTasks((prev) => [...prev, item]);
        } ...
      }
      ...
    }
  };

  return (
    <ReactGantt
      tasks="{tasks}"
      links="{links}"
      data="{data}"
      // ...other props
    />
  );
}
~~~

В этом примере **ReactGantt** вызывает callback **save** при создании задачи, и состояние React обновляется соответствующим образом. Изменение состояния вызывает повторную инициализацию данных Gantt.

Такой паттерн поддерживает единый источник данных для UI и серверных обновлений, что естественно вписывается в логику React или Redux.

Обратите внимание, что это может привести к более частому парсингу или перерисовке Gantt.

### Gantt как источник данных

В этом случае изменения происходят напрямую внутри экземпляра Gantt без обязательной синхронизации с состоянием React. Вы можете загрузить задачи и связи изначально (через props или встроенный data processor Gantt), но далее Gantt управляет данными самостоятельно. Если вы настроите callback для обновлений или используете встроенный транспорт, Gantt будет отправлять изменения на сервер или в вашу функцию, но не будет автоматически обновлять или откатывать состояние React после изменений.

~~~js
<ReactGantt
  data="{" {
    load: "/api/data",     // gantt загружает начальные задачи/связи отсюда
    save: "/api/data"      // gantt отправляет обновления сюда
  } }
/>
~~~

В таком сценарии Gantt сам обрабатывает загрузку и сохранение данных, а локальный экземпляр Gantt служит основным хранилищем данных.

Это снижает нагрузку за счёт отсутствия постоянных обновлений состояния React при изменениях в Gantt и упрощает пакетные операции, такие как авто-планирование, без повторных перерисовок.

Минус - вы теряете прямую синхронизацию между данными Gantt и состоянием React. Если вы всё же храните tasks/links в состоянии React, будьте осторожны, чтобы не перезаписать внутренние данные Gantt случайно.

### Загрузка данных

Когда данные доступны в коде, их можно передать в Gantt через переменные состояния и соответствующие props:

~~~js
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style="{" {height: '100vh'} }>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        resources="{resources}"
        resourceAssignments="{resourceAssignments}"
      />
    </div>
  );
};
~~~

### Загрузка данных через встроенный транспорт

Можно указать URL для загрузки данных и отдельный URL для отправки обновлений:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: "/api/data"
    }
  }

  return (
    <ReactGantt ...{props} />
  );
}
~~~

Внутри **load** URL передаётся методу [load](api/method/load.md). Endpoint должен возвращать данные в формате, описанном в статье [Загрузка данных](guides/loading.md).

### Сохранение изменений

URL, указанный в **save**, принимает обновления в формате, описанном в [этой статье](guides/server-side.md#requestresponsedetails)."

В качестве альтернативы, можно передать функцию в качестве свойства **save** объекта **data**. Эта функция вызывается при изменениях данных Gantt и выступает роутером для внутреннего [DataProcessor](guides/server-side.md#customrouting):

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
      }
    }
  };

  return (
    <ReactGantt ...{props} />
  );
}
~~~

### Пакетный режим сохранения

В предыдущих режимах React Gantt вызывал callback для каждой изменённой сущности по отдельности. Это соответствует стандартному поведению библиотеки Gantt. Однако такой подход может замедлять работу React при массовых операциях, например, при авто-планировании, когда обновляются десятки или сотни задач одновременно. Обработка обновлений состояния для каждой сущности по отдельности неэффективна в таких случаях.

Для этого React Gantt предлагает специальный обработчик **data.batchSave** для пакетных изменений. 
Он вызывается один раз с массивом всех изменений в экземпляре Gantt:

~~~

const [tasks, setTasks] = useState(data.tasks);
const [links, setLinks] = useState(data.links);

return <ReactGantt
  ref="{ganttRef}"
  tasks="{tasks}"
  links="{links}"

  data="{" {
    batchSave: (updates) => {
      if (updates.task) {
        setTasks(tasks => updateTasks(tasks, updates.task));
      }
      if (updates.link) {
        setLinks(links => updateLinks(links, updates.link));
      }

    }
  } }
/>
~~~

Объект `updates`, передаваемый в callback **batchSave**, выглядит так:

~~~js
{
  tasks: DataCallbackChange<Task>[],
  links: DataCallbackChange<Link>[],
  resources: DataCallbackChange<Resource>[],
  resourceAssignments: DataCallbackChange<ResourceAssignment>[],
}

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}
~~~

Конфигурация и Props
-------------------

React-враппер принимает проп `config` (который маппится на [gantt.config](api/overview/properties-overview.md)) и проп `templates` (который маппится на [gantt.templates](api/overview/templates-overview.md)).


~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  config= { {
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
        template: (task) => <AlertButton task="{task}" onClick="{handleButtonClick}" />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  } }
  templates= { {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  } }
/>
~~~

### Использование React-компонентов в шаблонах

При определении шаблонов в props, функции шаблонов могут возвращать React-элементы:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates="{" {
    task_text: (start, end, task) => {
      return <PriorityBadge priority="{task.priority}" />;
    }
  } }
/>
~~~

:::note
Внутри DHTMLX Gantt работает с DOM таким образом, что React не используется напрямую. Когда из шаблонов возвращаются React-компоненты, они внедряются в HTML Gantt через порталы. Имейте в виду, что интенсивный рендеринг сложных React-компонентов при больших объёмах данных может повлиять на производительность.
:::

Шаблоны можно использовать для настройки различных частей:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md) - для отображения задач
- [форматирование шкалы времени](guides/configuring-time-scale.md#dateformat) - для заголовков таймлайна
- [шаблоны колонок](guides/specifying-columns.md#datamappingandtemplates) - для ячеек грида слева
- и многое другое. Подробности смотрите в [доступных руководствах](guides.md) по Gantt

Полный список props, поддерживаемых React Gantt, приведён в: [Использование свойств DHTMLX Gantt в ReactGantt](integrations/react/configuration-props.md)

Темы и стилизация
-----------------

В Gantt предусмотрено несколько встроенных тем, которые можно задать через prop **theme** и переключать динамически:

~~~js
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
    <div style="{" {height: '600px'} }>
      <div>
        <button onClick="{switchTheme}">Switch Theme</button>
      </div>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"  /*!*/
      />
    </div>
  );
};
~~~

Подробное описание доступных тем доступно в [этой статье](guides/skins.md).

Темы также можно донастроить, применяя собственные стили или переопределяя CSS-переменные:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

Больше вариантов настройки смотрите в руководстве [Кастомизация скинов](guides/custom-skins.md).

Замена Lightbox
------------------

В DHTMLX Gantt встроен настраиваемый редактор задач [Lightbox](guides/default-edit-form.md).

При необходимости его можно заменить на React-модальное окно или любой другой компонент следующими способами:

### Передача кастомного компонента через prop `customLightbox`

Вы можете передать компонент через prop **customLightbox**:

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
      <div style="{modalStyles.overlay}" onClick="{onCancel}" />
      <div style="{modalStyles.content}">
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value="{description}"
            onChange="{(e)" => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' } }
          />
        </div>
        <div style="{modalStyles.buttonGroup}">
          <button onClick="{handleSaveClick}">Save</button>
          <button onClick="{onCancel}">Cancel</button>
          <button onClick="{onDelete}">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

Далее вы можете использовать этот компонент так:

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
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      customLightbox="{<CustomLightbox" />} />
  );
}
~~~

### Использование prop события onBeforeLightbox

Для более сложных случаев вы можете обработать событие [onBeforeLightbox](api/event/onbeforelightbox.md) (вызывается при открытии Lightbox) и переопределить стандартное поведение:

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
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      onBeforeLightbox="{handleTaskEdit}" />
  );
}
~~~

### Использование JS Gantt API

Больше информации о переопределении или расширении встроенного Lightbox смотрите в [Кастомный Lightbox](guides/custom-edit-form.md).

Замена встроенных модальных окон
------------------

В стандартном интерфейсе предусмотрены два модальных окна:

- окно подтверждения перед удалением задачи
- окно подтверждения перед удалением связи

Оба можно заменить, используя prop `modals` у ReactGantt:

~~~js
<ReactGantt
  ...
  modals="{" {
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
  } }
  ...
/>

~~~

Эти props позволяют показывать собственные модальные окна всякий раз, когда Gantt запрашивает подтверждение. 
Вызов `callback()` завершает удаление задачи или связи. Чтобы отменить, просто закройте модальное окно, не вызывая callback.

Использование React-компонентов в гриде
-------------------

### В заголовках

Свойство **label** колонки грида может быть `string` или `ReactElement`. Это позволяет внедрять React-фильтры, кнопки или другие UI-элементы прямо в заголовок колонки:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // React-элемент напрямую
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // Или функция, возвращающая React-элемент:
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

Если обёртка находит React-элемент в label или другом шаблонном свойстве, он рендерится внутри ячейки заголовка грида с помощью React Portal.

### В ячейках

Ячейки грида настраиваются через свойство **template** колонки. Эта функция получает объект задачи и должна возвращать либо обычную строку, либо `ReactElement`:

~~~
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick="{onClick}">{`Task ID: ${task.id}`}</button>;
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
        // Возвращаем React-элемент
        template: (task) => (
          <AlertButton
            task="{task}"
            onClick="{()" => {
              handleButtonClick(task);
              // При необходимости инициировать перерисовку задачи
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

  return <ReactGantt ref="{ganttRef}" config="{config}" /* ...other props */ />;
}
~~~

Возвращая React-элементы из шаблонов колонок, вы можете создавать полностью интерактивный контент - кнопки, выпадающие списки, бейджи - прямо внутри каждой ячейки грида Gantt. Обёртка внедряет эти элементы через порталы в DOM-узлы, которыми управляет Gantt.

### Встроенные редакторы

DHTMLX Gantt поддерживает [встроенное редактирование ячеек грида](guides/inline-editing.md). В данном React-обёртке вы можете добавлять собственные React-редакторы, определяя объект редактора в конфигурации **column** и связывая имя редактора с React-компонентом через проп `inlineEditors`. Пример ниже иллюстрирует этот процесс.

Определите компонент встроенного редактора на React:

~~~js
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
                value="{value}"
                onChange="{e" => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

Используйте собственный редактор в вашей конфигурации Gantt:

~~~js
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
      config="{config}"
      inlineEditors="{" {
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks="{[/*...*/]}"
      links="{[/*...*/]}"
    />
  );
}
~~~

Когда пользователь дважды кликает по ячейке колонки, Gantt заменяет её на ваш компонент редактора. Обёртка внутренне вызывает методы (getValue, setValue и др.), которые вы предоставляете через `useImperativeHandle(ref, ...)`, синхронизируя изменения вашего компонента с экземпляром Gantt.

Значение `type` в объекте редактора должно соответствовать ключу в `inlineEditors`.

Свойство `map_to` указывает, из какого свойства объекта Task редактор будет читать и в какое записывать значение. Подробнее смотрите статью о [встроенном редактировании](guides/inline-editing.md).

Если ваш редактор выполняет более сложные действия, чем просто обновление свойства задачи, реализуйте необходимую логику в функции **save** и установите опцию `map_to` в значение **"auto"**. В этом режиме Gantt не будет автоматически обновлять объект задачи, но вызовет функцию **save** для применения изменений. Редактор получит `null` в качестве `initialValue`.

:::note
Примечание: не-React встроенные редакторы также можно определить через свойство [editor_types](guides/inline-editing.md#custominlineeditor) внутри **config**.
:::

#### Свойства компонента редактора

- <span class="subproperty">**initialValue**</span> - (*any*) - начальное значение редактора
- <span class="subproperty">**task**</span> - (*Task*) - редактируемая задача
- <span class="subproperty">**save**</span> - (*function*) - инициирует сохранение и закрытие редактора Gantt
- <span class="subproperty">**cancel**</span> - (*function*) - закрывает редактор без сохранения
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - текущий экземпляр Gantt


Фильтрация
-----------------

Проп `filter` позволяет указать функцию, определяющую, какие задачи будут видимы:

~~~js
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
    filter="{filter}"
    ...
  />
);

~~~

Для фильтрации ресурсов в [Панели ресурсов](guides/resource-management.md) используйте проп `resourceFilter`:

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
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    resources="{resources}"
    resourceFilter="{resourceFilter}"
    config="{config}"
    templates="{templates}"
    plugins={{auto_scheduling: true } }
  />
);

~~~

Рабочие календари
------------------

Чтобы включить вычисления рабочего времени в **ReactGantt**, активируйте опцию work time в конфигурации:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

Рабочие календари можно передать в **ReactGantt** через проп `calendars`:

~~~js
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // глобальные рабочие часы по будням
    days: {
      weekdays: {
        0: false, // 0 = воскресенье, 6 = суббота
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
      calendars="{calendars}"
      ...
    />
  </div>
);

~~~

Чтобы подсветить рабочее время на временной шкале Gantt или выполнять вычисления рабочего времени, можно воспользоваться предоставленным хуком `useWorkTime`:

~~~js
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
      hours: ["8:00-12:00", "13:00-17:00"], // глобальные рабочие часы по будням
      days: {
        weekdays: {
          0: false, // 0 = воскресенье, 6 = суббота
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
        calendars="{calendars}"
        templates="{templates}"
        config="{config}"
        ref="{ganttRef}"
      />
    </div>
  );
};

~~~

Также можно получить доступ к [внутреннему объекту Gantt](#accessingtheunderlyingganttapi) для прямого использования методов [working time](guides/working-time.md).

Группировка задач
-----------------

Группировать задачи по любому свойству задачи можно с помощью пропа `groupTasks`:

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
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    groupTasks="{grouping}"
  />
);
~~~

Чтобы отключить группировку, установите `groupTasks` в `false`:

~~~js
setGrouping(false);
~~~


Вертикальные маркеры на временной шкале
-----------------

Вертикальные маркеры можно добавить в **ReactGantt** через свойство `markers`:

~~~js
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
        markers="{markers}"
        ...
      />
    </div>
  );
~~~

:::note
Примечание: свойство **text** объекта Marker поддерживает как HTML-строку, так и React-элемент
:::

Доступ к внутреннему API Gantt
------------------

Хотя пропсы ReactGantt покрывают большинство потребностей конфигурации, иногда требуется прямой доступ к API DHTMLX Gantt для реализации расширенных возможностей, таких как вычисления рабочего времени, gantt.showDate, gantt.unselectTask или индивидуальное масштабирование.

### Использование встроенных хуков

ReactGantt предоставляет хуки для доступа к частям API Gantt. Подробнее см. в соответствующей статье [Использование свойств DHTMLX Gantt в ReactGantt](integrations/react/configuration-props.md).

### Использование Ref

Если декларативных пропсов и хуков недостаточно, можно получить доступ к внутреннему экземпляру Gantt через `ref`:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // здесь можно вызвать ЛЮБОЙ метод API Gantt
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


Полный список методов смотрите в [API Reference DHTMLX Gantt](api/overview/methods-overview.md).

#### Избегайте конфликтов с React-пропсами

- Если вы вручную вызываете `gantt.parse(( tasks, links ))` или `gantt.addTask()`, учитывайте, что пропсы React могут потерять синхронизацию с внутренними данными. В следующем рендере React может перезаписать ваши изменения.
- Лучше управлять задачами и связями через пропсы обёртки или состояние React, предоставляя обёртке возможность повторного парсинга.


Совместимость с SSR-фреймворками (Next.js, Remix)
--------------

:::note
Поскольку DHTMLX Gantt является браузерным виджетом и напрямую работает с DOM, он не может отрисовываться в среде Node/SSR. Поэтому серверный рендеринг должен быть отключён или отложен для любых роутов или компонентов, использующих ReactGantt.
:::

#### Next.js

Для пользователей Next.js рекомендуется динамический импорт компонента ReactGantt с отключённым SSR:

~~~js
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~
Это гарантирует, что Gantt будет загружаться только в браузере, избегая ошибок серверного рендеринга.

#### Remix

В Remix рекомендуется условно рендерить компонент Gantt только на клиенте:

~~~js
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback="{<p">Loading...</p>}>
        {() => <ReactGantt
          tasks={{/* ... */]}
          links={{/* ... */]}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

Такой подход откладывает рендеринг до инициализации компонента в браузере и предотвращает проблемы SSR.

Дальнейшие шаги
-------------------

- Подробнее о настройке ReactGantt читайте в [этой статье](integrations/react/configuration-props.md)
- Для расширенного использования ознакомьтесь с [документацией DHTMLX Gantt](guides.md)

