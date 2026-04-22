---
title: React Gantt 与 Firebase 集成
sidebar_label: Firebase 快速入门
description: "通过 Firebase Firestore 实时同步构建协作的 React Gantt"
---

# React Gantt 与 Firebase 集成

本教程描述了如何构建一个 [React Gantt](integrations/react.md) 图表，使任务和连线数据能够在多端客户端之间通过 Firebase Firestore 实时同步。这种功能对于以下场景尤为有用：

- 项目管理工具
- 团队协作应用
- 多人同步至关重要的排程平台

你将学习如何：

- 设置 Firebase 以实现实时更新
- 初始化并渲染 Gantt 图
- 使用实时同步处理 CRUD（创建、读取、更新、删除）操作
- 高效处理 Gantt 状态的实时变更

你可以在 GitHub 上查看相应的示例：[DHTMLX React Gantt 与 Firebase Firestore 演示](https://github.com/DHTMLX/firebase-react-gantt-demo)。

## 第一步：项目设置

首先创建一个 React + Vite 项目。

要创建一个 React 项目并进入项目目录，请运行以下命令：

~~~bash
npm create vite@latest react-gantt-firebase -- --template react-ts
cd react-gantt-firebase
~~~

按如下所述安装所需的依赖：

~~~js
npm install firebase
~~~

### 安装 React Gantt

按照 [React Gantt 安装指南](integrations/react/installation.md) 的说明安装 React Gantt。

在本教程中我们使用评估版包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或者

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经在使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

## 第二步：配置 Firebase

首先，通过以下步骤创建一个 Firebase 项目：

- 打开 Firebase 控制台
- 点击“创建一个项目”
- 输入项目名称（例如 `react-gantt-firebase`），并按照设置提示进行

然后按以下步骤设置 Firestore：

- 在 Firebase 项目仪表板中导航到 **Firestore 数据库**
- 点击 **创建数据库**
- 选择你偏好的位置
- 为开发阶段的便利，将起始模式设为 **测试模式**（在生产前请务必配置安全规则）
- 点击 **创建**

之后，以如下方式在 Web 应用中进行注册：

- 在 Firebase 控制台侧边栏选择 **项目概览**
- 点击网页应用图标 `</>` 注册一个新网页应用
- 提供应用昵称（例如 `react-gantt-firebase`）
- 启用 Firebase Hosting
- 点击 **注册应用**
- 复制生成的 Firebase 配置（你将在项目中使用它）

最后，按照下面的描述在项目中配置 Firebase：

- 将 Firebase 配置粘贴到 `.env` 文件中，格式如下：

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
 将 `YOUR_API_KEY` 占位符替换为您实际的 Firebase 项目凭据。
 :::

- 创建一个新文件 **firebase.ts**，初始化 Firebase 和 Firestore。同时，导出对集合的引用，如下所示：


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

## 第三步：创建 Gantt 组件

首先，使用以下配置用 [**React state** 用于任务和链接](integrations/react/overview.md#bindingdata) 来搭建核心 Gantt 组件：

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

在上述片段中：

- **Templates**

 模板让我们控制在 Gantt 组件中日期的解析和格式化方式。由于 Firestore 将日期以字符串存储，我们需要将其转换回 `Date` 对象（[parse_date](api/template/parse_date.md)）并正确地将其格式化以便存储（[format_date](api/template/format_date.md)）。

- **Config**

 `auto_scheduling` 选项在父任务被移动或改变时自动重新计算相关任务。这对于项目管理场景很有用。

现在，创建 **state handlers** 来管理 Gantt 的内部状态，如下所示：

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

这为 Firebase 数据变化时的本地状态更新提供了统一的方式。

由于我们处理的实体类型有两种 —— tasks 与 links，我们可以创建一个统一的配置对象来同时处理两者，而不是重复代码。这个对象将每种实体类型映射到其 Firestore 集合、API 路径和状态处理器。请参见下方的代码片段：

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

### 项目结构概览

你可以在下述结构中查看结果项目的大致结构：

~~~ 
src/
├── App.tsx                 # 入口
├── App.css                 # 样式
├── components/
│   └── Gantt/
│       ├── Gantt.tsx       # 主要逻辑
│       └── types.ts        # 类型声明
├── config/
│   └── firebase.ts         # Firebase 设置
└── main.tsx                # React 根节点
~~~

## 第四步：加载初始数据

组件挂载时，应按如下方式加载所有任务和链接：

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

要将 Firebase 文档转换为 Gantt 兼容对象，请使用下面提供的 `processEntity`：

~~~js
const processEntity = (docSnapshot: QueryDocumentSnapshot): Task | Link => {
    return { ...docSnapshot.data(), id: docSnapshot.id };
};
~~~

## 第五步：建立实时同步

使用 Firebase 的 `onSnapshot` 订阅两个集合中的变更，并在组件卸载时取消订阅：
  
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

第一次 `onSnapshot` 调用返回初始数据，因此在 `watchRealtime` 中忽略第一次调用（因为我们已经加载了初始数据）。

### 处理实时更新

你可以使用下面代码示例中的函数来处理实时更新：

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

该方法确保只处理服务器确认的变更，避免本地重复。

`docChanges()` 返回自上次快照以来在 Firestore 集合中所做的变更（新增、修改、删除）。Firestore 提供了变更类型（`added`、`modified`、`removed`），并将其路由到相应的处理程序以更新 React 状态。

## 第六步：使用 Firebase 实现 CRUD 操作

为了处理来自 Gantt 组件的创建、更新和删除请求，请使用下面给出的 `data.save` 方法逻辑：

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

Firebase 将通过快照监听器自动将这些变更传播到所有连接的客户端。

接着，使用下面的代码渲染 Gantt 图：

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

`data` 属性将 Gantt 内置的编辑与上述 Firebase 保存逻辑连接起来。

## 第七步：将项目部署到 Firebase

一旦项目完全工作且实时同步功能正常运行，你就可以将其部署到 Web 上，让其公开可访问。有两种部署方式可供选择：通过 Firebase CLI 和通过 Firebase 控制台。

### 通过 Firebase CLI 部署（推荐）

这是最为高效的方法，尤其是如果你打算定期更新项目。请按以下步骤操作：

1\. 如果尚未安装 Firebase CLI，请使用以下命令安装：

~~~ 
npm install -g firebase-tools
~~~ 

2\. 然后，使用下面的命令登录 Firebase：

~~~ 
firebase login
~~~ 

3\. 之后，使用下面的命令在你的项目中初始化 Firebase：

~~~ 
firebase init
~~~ 

在初始化过程中完成以下步骤：

- 选择 Hosting（如果尚未配置 Firestore，也可以选择 Firestore）
- 指定构建输出文件夹（例如 `dist` 或 `build`，取决于你的 `vite.config.ts` 或 `package.json` 的设置）
- 当被询问是否将应用配置为单页面应用（SPA）时，选择 Yes，以确保所有路由都通过 `index.html` 处理

4\. 现在，使用以下命令构建项目：

~~~ 
npm run build
~~~ 

它将在 `dist`（或 `build`）文件夹中生成生产就绪的文件。

5\. 最后，通过以下命令部署到 Firebase：

~~~ 
firebase deploy
~~~ 

部署完成后，Firebase 将为你提供一个托管项目的链接。

### 通过 Firebase 控制台快速部署

如果你更愿意直接通过控制台发布应用，而不使用 CLI，可以按以下步骤完成：

1\. 运行以下命令构建项目：

~~~ 
npm run build
~~~ 

2\. 打开 Firebase Hosting → Your Project → Hosting

3\. 点击“开始使用”或“上传”

4\. 上传 `dist`（或 `build`）文件夹的内容

5\. 确认上传，Firebase 将为你提供一个公开 URL

## 结论

在本教程中，我们构建了一个具有 Firebase 同步的实时 Gantt 图。你已经学习了如何：

- 将 React Gantt 连接到 Firebase Firestore
- 设置对 Firestore 的实时订阅
- 使用即时多客户端同步处理创建、更新和删除事件

这种方法非常适合协作型项目管理工具，在这种场景下，所有用户无需刷新的情况下也能看到实时更新。