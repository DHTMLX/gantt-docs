---
title: Интеграция React Gantt и Firebase
sidebar_label: Быстрый старт Firebase
description: "Создайте диаграмму Gantt на React с синхронизацией в реальном времени через Firebase Firestore"
---

# Интеграция React Gantt и Firebase

Этот учебник описывает, как создать диаграмму [React Gantt](integrations/react.md), которая синхронизирует данные задач и связей между несколькими клиентами в реальном времени с помощью Firebase Firestore. Эта функциональность особенно полезна для:

- инструментов управления проектами
- приложений для командной работы
- платформ планирования, где критически важна синхронизация нескольких пользователей

Вы узнаете, как:

- настроить Firebase для обновлений в реальном времени
- инициализировать и отрисовать Gantt
- обрабатывать CRUD-операции (создание, чтение, обновление, удаление) с живой синхронизацией
- эффективно обрабатывать изменения в реальном времени в состоянии Gantt

Вы можете проверить соответствующий пример на GitHub: [DHTMLX React Gantt with Firebase Firestore Demo](https://github.com/DHTMLX/firebase-react-gantt-demo).

## Шаг 1: Настройка проекта

Начните с создания проекта на React + Vite. 

Чтобы создать проект на React и перейти в каталог проекта, выполните следующие команды:

~~~bash
npm create vite@latest react-gantt-firebase -- --template react-ts
cd react-gantt-firebase
~~~

Установите необходимые зависимости следующим образом:

~~~js
npm install firebase
~~~

### Установка React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом примере мы используем пакет для оценки:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете Professional-пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортов.

## Шаг 2: Настройка Firebase

Сначала создайте проект Firebase, выполнив следующие шаги:

- перейдите в Firebase Console
- нажмите **Create a project**
- введите имя проекта (например, `react-gantt-firebase`) и следуйте подсказкам по настройке

Затем настройте Firestore, выполнив шаги ниже:

- перейдите в **Firestore Database** в панели управления вашим проектом Firebase
- нажмите **Create database**
- выберите желаемое расположение
- начните в режиме **test mode** для упрощения разработки (не забудьте настроить правила безопасности перед продакшеном)
- нажмите **Create**

После этого зарегистрируйте ваше веб-приложение следующим образом:

- выберите **Project Overview** в боковой панели Firebase Console
- нажмите значок веб-приложения `</>` для регистрации нового веб-приложения
- укажите псевдоним приложения (например, `react-gantt-firebase`)
- включите Firebase Hosting
- нажмите **Register app**
- скопируйте сгенерированную конфигурацию Firebase (она понадобится в вашем проекте)

Наконец, настройте Firebase в вашем проекте, как описано ниже:

- вставьте конфигурацию Firebase в файл `.env` следующим образом:

~~~js
VITE_FIREBASE_CONFIGURATION = {
    "apiKey": "YOUR_API_KEY",
    "authDomain":"react-gantt-firebase.firebaseapp.com",
    "projectId": "react-gantt-firebase",
    "storageBucket": "react-gantt-firebase.firebasestorage.app",
    "messagingSenderId": "693536970600",
    "appId": "1:693536970600:web:1b3fa4e4b032acaab368dd"
}
~~~

:::note
 Замените плейсхолдер `YOUR_API_KEY` на реальные учетные данные вашего проекта Firebase.
:::

- создайте новый файл **firebase.ts** и инициализируйте Firebase и Firestore. Также экспортируйте ссылки на коллекции, как показано ниже:

~~~js title=firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query } from "firebase/firestore";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIGURATION);

initializeApp(firebaseConfig);
const db = getFirestore();
const tasksCollection = collection(db, "tasks");
const linksCollection = collection(db, "links");
const tasksQuery = query(tasksCollection);
const linksQuery = query(linksCollection);

export { db, tasksQuery, linksQuery, tasksCollection, linksCollection };
~~~

## Шаг 3: Создайте компонент Gantt

Для начала настройте основной компонент Gantt с [**React state** для задач и связей](integrations/react/overview.md#bindingdata) со следующей конфигурацией:

~~~js
const [tasks, setTasks] = useState<Task[]>([]);
const [links, setLinks] = useState<Link[]>([]);

const templates: GanttTemplates = {
    parse_date: (date) => new Date(date),
    format_date: (dateString) => dateString.toISOString(),
};

const config: GanttConfig = {
    auto_scheduling: true,
};
~~~

В приведённом выше фрагменте:

- **Templates**

Шаблоны позволяют контролировать, как даты парсятся и форматируются внутри компонента Gantt. Поскольку Firestore хранит даты в виде строк, нам нужно преобразовать их обратно в объекты `Date` ([parse_date](api/template/parse_date.md)) и корректно форматировать их для хранения ([format_date](api/template/format_date.md)).

- **Config**

Опция `auto_scheduling` включает автоматическую перерасчёт зависимых задач, когда родительская задача перемещается или изменяется. Это полезно в сценариях управления проектами.

Теперь создайте **обработчики состояния** для управления внутренним состоянием Gantt, как показано ниже:

~~~js
const createStateHandlers = <T extends { id: string | number }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>
): EntityHandler<T> => ({
    added: (item) => setState((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item])),
    modified: (item) => setState((prev) => prev.map((i) => (i.id === item.id ? { ...i, ...item } : i))),
    removed: (item) => setState((prev) => prev.filter((i) => i.id !== item.id)),
});

const taskHandlers = createStateHandlers<Task>(setTasks);
const linkHandlers = createStateHandlers<Link>(setLinks);
~~~

Это обеспечивает единый способ обновления локального состояния при изменениях данных Firebase.

Поскольку мы работаем с двумя типами сущностей — задачами и связями, можно создать единый конфигурационный объект, который будет обрабатывать оба типа вместо дублирования кода. Этот объект сопоставляет каждому типу сущности его коллекцию Firestore, путь API и обработчики состояния. Смотрите следующий фрагмент кода:

~~~js
const entityConfig = {
    task: {
        collection: tasksCollection,
        path: "tasks",
        handlers: taskHandlers,
    },
    link: {
        collection: linksCollection,
        path: "links",
        handlers: linkHandlers,
    },
};
~~~

### Обзор структуры проекта

Вы можете посмотреть итоговую структуру проекта в следующей схеме:

~~~
src/
├── App.tsx                 # Точка входа
├── App.css                 # Стили
├── components/
│   └── Gantt/
│       ├── Gantt.tsx       # Основная логика
│       └── types.ts        # Определения типов
├── config/
│   └── firebase.ts         # Настройка Firebase
└── main.tsx                # Корень React
~~~

## Шаг 4: Загрузка начальных данных

Когда компонент монтируется, следует загрузить все задачи и связи следующим образом:

~~~js
useEffect(() => {
    let unsubscribeTasks: () => void;
    let unsubscribeLinks: () => void;

    (async () => {
        const tasksSnap = await getDocs(tasksQuery);
        const bulkTasks = tasksSnap.docs.map(processEntity) as Task[];
        const linksSnap = await getDocs(linksQuery);
        const bulkLinks = linksSnap.docs.map(processEntity) as Link[];

        setTasks(bulkTasks);
        setLinks(bulkLinks);

        const unsubscribers = watchRealtime();
        unsubscribeTasks = unsubscribers.unsubscribeTasks;
        unsubscribeLinks = unsubscribers.unsubscribeLinks;
    })();

    return () => {
        if (unsubscribeTasks) unsubscribeTasks();
        if (unsubscribeLinks) unsubscribeLinks();
    };
}, []);
~~~ 

Чтобы преобразовать документы Firebase в объекты, совместимые с Gantt, используйте `processEntity`, как приведено ниже:

~~~js
const processEntity = (docSnapshot: QueryDocumentSnapshot): Task | Link => {
    return { ...docSnapshot.data(), id: docSnapshot.id };
};
~~~

## Шаг 5: Настройка синхронизации в реальном времени

Используйте `onSnapshot` Firebase для подписки на изменения в обеих коллекциях и отписывайтесь, когда компонент будет размонтирован:
  
~~~js  
function watchRealtime() {
    let tasksLoaded = false;
    let linksLoaded = false;

    const unsubscribeTasks = onSnapshot(tasksQuery, (querySnapshot) => {
        if (!tasksLoaded) {
            tasksLoaded = true;
            return;
        }

        handleRealtimeUpdates(querySnapshot, "task");
    });

    const unsubscribeLinks = onSnapshot(linksQuery, (querySnapshot) => {
        if (!linksLoaded) {
            linksLoaded = true;
            return;
        }
        handleRealtimeUpdates(querySnapshot, "link");
    });

    return { unsubscribeTasks, unsubscribeLinks };
}
~~~

 Первый вызов `onSnapshot` возвращает начальные данные, изменения — нет, поэтому в `watchRealtime` мы игнорируем первый вызов (поскольку начальные данные уже загружены).

### Обработка изменений в реальном времени

Вы можете обрабатывать изменения в реальном времени с помощью функции, приведённой в следующем примере кода:

~~~js
function handleRealtimeUpdates(querySnapshot: QuerySnapshot, type: GanttEntityType) {
    const config = entityConfig[type];
    if (!config) throw new Error(`Unknown entity type: ${type}`);
    const { handlers } = config;
    querySnapshot.docChanges().forEach((change) => {
        if (change.doc.metadata.hasPendingWrites) return;
        const handler = handlers[change.type];
        if (!handler) {
            throw new Error(`Unknown change type: ${change.type}`);
      }
      const data = processEntity(change.doc);
      (handler as (data: Task | Link) => void)(data);
    });
}
~~~

Этот метод гарантирует обработку только подтверждённых сервером изменений, исключая локальное дублирование.

`docChanges()` возвращает список изменений (added, modified, removed), внесённых в коллекцию Firestore с момента последнего снимка. Firestore предоставляет тип изменения (`added`, `modified`, `removed`), и мы маршрутизируем его к соответствующему обработчику для обновления состояния React.

## Шаг 6: Реализация операций CRUD с Firebase

Чтобы обрабатывать запросы на создание, обновление и удаление из компонента Gantt, используйте логику метода `data.save`, приведённой ниже:

~~~js
const data = {
    save: async (
        entity: GanttEntityType, 
        action: GanttActionType, 
        raw: any, id: string | number
    ) => {
        try {
            const config = entityConfig[entity];
            if (!config) throw new Error(`Unknown entity type: ${entity}`);

            const { collection, path, handlers } = config;
            const ref = doc(db, path, id.toString());

            switch (action) {
                case "create": {
                    const addedDoc = await addDoc(collection, raw);
                    handlers.added({ ...raw, id: addedDoc.id });
                    break;
                }
                case "update": {
                    await updateDoc(ref, raw);
                    handlers.modified(raw);
                    break;
                }
                case "delete": {
                    await deleteDoc(ref);
                    handlers.removed(raw);
                    break;
                }
                default:
                    throw new Error(`Unknown action type: ${action}`);
            }
        } catch (err) {
            console.error(`Failed to ${action} ${entity}:`, err);
        }
    },
};
~~~

Firebase будет автоматически распространять эти изменения на всех подключённых клиентов с помощью слушателей снимков.

Затем отобразите диаграмму Gantt следующем коде:

~~~js
return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ReactGantt 
            tasks={tasks} 
            links={links} 
            templates={templates} 
            config={config} 
            data={data} 
        />
    </div>
);
~~~

Свойство `data` соединяет встроенное редактирование Gantt с логикой сохранения Firebase, приведённой выше.

## Шаг 7: Развертывание проекта в Firebase

Как только проект будет полностью работоспособен и синхронизация в реальном времени функционирует корректно, вы можете развернуть его, чтобы он стал общедоступным в интернете. Есть два способа развернуть проект: через Firebase CLI и через консоль Firebase.

### Развертывание через Firebase CLI (Рекомендуется)

Это самый эффективный метод, особенно если вы планируете регулярно обновлять проект. Выполните следующие шаги:

1\. Сначала, если CLI Firebase ещё не установлен, установите его с помощью команды:

~~~ 
npm install -g firebase-tools
~~~ 

2\. Затем выполните вход в Firebase с помощью следующей команды:

~~~ 
firebase login
~~~ 

3\. После этого инициализируйте Firebase в вашем проекте следующей командой:

~~~ 
firebase init
~~~ 

Во время инициализации выполните следующие шаги:

- выберите Hosting (также можно выбрать Firestore, если вы ещё не настроили его)
- укажите папку сборки (например, `dist` или `build`, в зависимости от вашего `vite.config.ts` или `package.json`)
- при вопросе об конфигурации как SPA (Single Page App) выберите Yes, чтобы все маршруты обслуживались через `index.html`

4\. Теперь соберите проект следующей командой:

~~~ 
npm run build
~~~ 

Он сгенерирует готовые к продакшн-использованию файлы в папке `dist` (или `build`).

5\. Наконец, разверните в Firebase, выполнив следующую команду:

~~~ 
firebase deploy
~~~ 

После завершения развертывания Firebase предоставит вам ссылку на размещённый проект.

### Быстрое развёртывание через Firebase Console

Если вы предпочитаете быстро опубликовать приложение без использования CLI, сделайте это напрямую через Firebase Console.
Выполните следующие шаги:

1\. Соберите проект, выполнив команду ниже:

~~~ 
npm run build
~~~ 

2\. Перейдите в Firebase Hosting → Ваш проект → Hosting

3\. Нажмите "Get Started" или "Upload"

4\. Загрузите содержимое папки `dist` (или `build`)

5\. Подтвердите загрузку — Firebase предоставит вам публикуемый URL для вашего сайта

## Заключение

В этом руководстве мы создали реальную диаграмму Gantt с синхронизацией через Firebase. Вы узнали, как:

- подключить React Gantt к Firebase Firestore
- настроить подписку в реальном времени на Firestore
- обрабатывать события создания, обновления и удаления с мгновенной синхронизацией между несколькими клиентами

Такой подход идеально подходит для совместных инструментов управления проектами, где всем пользователям нужно видеть живые обновления без обновления страницы.