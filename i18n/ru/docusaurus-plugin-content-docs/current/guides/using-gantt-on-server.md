---
title: "Использование Gantt на сервере"
sidebar_label: "Node.js Gantt"
---

# Использование Gantt на сервере


В некоторых случаях может понадобиться использовать специализированную логику dhtmlxGantt отдельно от диаграммы Ганта, например:

- Когда вы получаете обновление задачи из другого источника (например, из мобильного приложения) и нужно запустить автоматическое планирование, чтобы обновить сроки связанных задач
- Когда в одном приложении несколько пользователей могут вносить изменения одновременно, и вам нужно синхронизировать и валидировать расписание
- Когда вам необходимо выполнять расчеты и анализировать расписание с помощью серверного кода

По этой причине мы предоставляем отдельную сборку dhtmlxGantt, которая может работать на стороне сервера в окружении Node.js.

DHTMLX Gantt для Node.js имеет тот же функционал, что и коммерческие/Enterprise/Ultimate пакеты, что означает, что метод **Gantt.getGanttInstance** доступен и позволяет создать новый экземпляр Gantt.

## Условия использования


Серверный модуль DHTMLX Gantt для Node.js предоставляется в качестве дополнения к клиентской версии Gantt. Таким образом, вы можете добавить сборку Node.js за дополнительную плату при покупке Gantt по любой коммерческой лицензии ([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)). Лицензия [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) включает её по умолчанию.

В случае если у вас уже есть основная библиотека dhtmlxGantt, вы можете [приобрести Node.js модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429) и мы вышлем вам ссылку на серверную версию Gantt.

## Версионирование


dhtmlxGantt применяет к Node.js пакет ту же схему нумерации версий, что и браузерные пакеты (например, v7.0.0 — первая версия Gantt для Node.js пакета).

:::note
Мы рекомендуем использовать одну и ту же версию библиотек Gantt на стороне клиента, что и на стороне сервера.
:::

## Добавление библиотеки в проект


Вы можете установить dhtmlxGantt для Node.js как локальный пакет:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

Или вы можете импортировать dhtmlxgantt.node.js напрямую из вашего кода, как показано:

~~~js
import { Gantt } from "@dhtmlx/gantt-node";

const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    config: {
        work_time: true,
        duration_unit: "hour",
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: false
    },
    data: {
        tasks: [
            { id: 1, text: "Project #1", type: "project", parent: 0 },
            { id: 2, start_date: "05-04-2020 00:00", text: "Task #1", duration: 1, 
            parent: 1, type: "task" },
            { id: 3, start_date: "05-04-2020 00:00", text: "Task #2", duration: 3, 
            parent: 1, type: "task" },
            { id: 4, start_date: "05-04-2020 00:00", text: "Task #3", duration: 3, 
            parent: 1, type: "task" },
            { id: 5, start_date: "05-04-2020 00:00", text: "Task #4", duration: 3, 
            parent: 1, type: "task" },
            { id: 6, start_date: "05-04-2020 00:00", text: "Task #5", duration: 1, 
            parent: 1, type: "task" }
        ], 
        links: [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 4, target: 5, type: "0" },
            { id: 5, source: 5, target: 6, type: "0" }
        ]
    },
    events:{
        onAfterAutoSchedule: function(taskId, updatedTasks) {
            console.log("Following tasks were auto scheduled:");
            console.table(updatedTasks.map((taskId) => {
                return {
                    id: taskId,
                    text: this.getTask(taskId).text
                };
            }));
        },
        onParse: function() {
            console.log("Loaded data:")
            console.table(this.serialize().data);
        },
        onGanttReady: () => {
            console.log("Running dhtmlxGantt on the backend");
        }
    }
});

console.table(gantt.serialize());
~~~

## Ограничения


dhtmlxGantt предоставляет тот же базовый API для Node.js, что и браузерная версия.

Однако некоторые методы, доступные в клиентской версии Gantt, либо не будут работать, либо не будут определены в серверной библиотеке, а именно:

- Серверная отрисовка не реализована. Вызов таких методов, как [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md) и т. п., не будет генерировать HTML, но вызовет соответствующие API-события, например, [onBeforeGanttRender](api/event/onbeforeganttrender.md), [onGanttRender](api/event/onganttrender.md) и т. д.
- [Popup messages API](guides/message-boxes.md) не включен в Node пакет. Методы gantt.message, gantt.alert, gantt.confirm будут undefined.
- [Built-in ajax helpers](api/other/ajax.md) не перенесены в Node.js, поэтому ни API ajax для gantt, ни [gantt.load](api/method/load.md) ни маршрутизации dataProcessor по умолчанию работать не будут. Вам нужно использовать [gantt.parse](api/method/parse.md) и [настраиваемую маршрутизацию dataProcessor](guides/server-side.md#customrouting).

:::note
Версия для оценки dhtmlxGantt для Node.js имеет ограниченный функционал, который позволяет загружать до 75 задач или связей. Если попытаться загрузить больший набор данных, будут загружены только первые 75 элементов.
:::