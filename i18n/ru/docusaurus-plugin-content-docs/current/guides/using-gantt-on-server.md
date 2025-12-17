---
title: "Использование Gantt на сервере"
sidebar_label: "Node.js Gantt"
---

Использование Gantt на сервере
=================================

Иногда возникает необходимость использовать специализированную логику dhtmlxGantt отдельно от самого диаграммы Gantt, например:

- Получение обновлений задач из других источников (например, мобильного приложения) и запуск авто-расчёта для корректировки связанных задач
- Обработка одновременных изменений от нескольких пользователей, требующая синхронизации и валидации расписания
- Выполнение вычислений и анализ расписания с использованием серверного кода

Для поддержки таких сценариев доступна отдельная сборка dhtmlxGantt, которая работает на сервере в среде Node.js.

DHTMLX Gantt для Node.js предоставляет те же возможности, что и Commercial/Enterprise/Ultimate пакеты, включая доступ к методу **Gantt.getGanttInstance** для создания новых экземпляров Gantt.

Условия использования
---------------------

Серверный модуль Node.js для DHTMLX Gantt является дополнением к клиентской версии. Его можно добавить за дополнительную плату при покупке Gantt по любой коммерческой лицензии ([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)). Лицензия [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) включает этот модуль по умолчанию.

Если у вас уже есть основная библиотека dhtmlxGantt, модуль Node.js можно [приобрести отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429), после чего будет предоставлена ссылка на серверную версию.

Версионирование
-------------------

Пакет Node.js для dhtmlxGantt использует ту же схему нумерации версий, что и браузерные пакеты (например, v7.0.0 - первая версия для Node.js).

:::note
Рекомендуется использовать одинаковые версии библиотек Gantt на клиентской и серверной сторонах.
:::

Добавление библиотеки в проект
------------------------------

Пакет dhtmlxGantt для Node.js можно установить локально:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

Также можно импортировать dhtmlxgantt.node.js напрямую в коде, как показано ниже:

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

Ограничения
------------

Версия dhtmlxGantt для Node.js предоставляет тот же основной API, что и браузерная версия.

Однако некоторые клиентские методы недоступны или не функционируют в серверной библиотеке, в том числе:

- Серверный рендеринг не поддерживается. Такие методы, как [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md) и другие, не будут генерировать HTML, но по-прежнему будут вызывать связанные события API, такие как [onBeforeGanttRender](api/event/onbeforeganttrender.md) и [onGanttRender](api/event/onganttrender.md).
- [API всплывающих сообщений](guides/message-boxes.md) не включён. Методы gantt.message, gantt.alert и gantt.confirm не определены.
- Встроенные ajax-хелперы не перенесены в Node.js, поэтому ajax API Gantt, [gantt.load](api/method/load.md) и стандартные маршруты dataProcessor работать не будут. Вместо этого используйте [gantt.parse](api/method/parse.md) и реализуйте [кастомный роутинг для dataProcessor](guides/server-side.md#customrouting).

:::note
Оценочная версия dhtmlxGantt для Node.js имеет ограниченный функционал: загрузка до 75 задач или связей.
Если будет загружен больший объём данных, обработаны будут только первые 75 элементов.
:::

