---
title: "dhtmlxGantt на чистом JS/HTML"
sidebar_label: "Быстрый старт"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxGantt на чистом JS/HTML

Когда вы разрабатываете приложение с dhtmlxGantt, первое, что вам нужно сделать, — инициализировать диаграмму Ганта на странице, или, простыми словами, отобразить её на странице.

Этот гид рассказывает об инициализации dhtmlxGantt в чистом JS и HTML. Вы также можете ознакомиться с руководствами по интеграции с фреймворками фронтенда:

<table>
  <tbody style="text-align:center">
  <tr>
  <td><FrameworkIcon name="angular" className="framework-icon" /></td>
  <td><FrameworkIcon name="react" className="framework-icon" /></td>
  <td><FrameworkIcon name="svelte" className="framework-icon" /></td>
  <td><FrameworkIcon name="vue" className="framework-icon" /></td>
  </tr>
  <tr>
  <td>[Angular](integrations/angular/js-gantt-angular.md)</td>
  <td>[React](integrations/react/js-gantt-react.md)</td>
  <td>[Svelte](integrations/svelte/howtostart-svelte.md)</td>
  <td>[Vue.js](integrations/vue/js-gantt-vue.md)</td>
  </tr>
  </tbody>
</table>


## Создание базового Gantt

Чтобы отобразить на странице базовый Gantt, выполните 3 шага: 

1. Включите на страницу файлы кода dhtmlxGantt [файлы кода dhtmlxGantt](guides/initializing-gantt-chart.md#how-to-add-gantt-source-files-into-a-project)  
2. Создайте на странице контейнер DIV.  
3. Инициализируйте dhtmlxGantt в созданном контейнере с помощью метода [init](api/method/init.md). В качестве параметра метод принимает HTML-контейнер (или его id), в котором будет отображаться диаграмма Ганта.

~~~html {10}
<!DOCTYPE html>
<html>
<head>
    <script src="codebase/dhtmlxgantt.js"></script>
    <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");                         
    </script>
</body>
</html>
~~~

![guides/init_gantt_front.png](/img/init_gantt_front.png)


**Связанный пример**: [Базовая инициализация](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)
 
## Как добавить файлы Gantt в проект

Вы можете добавить файлы кода Gantt в ваш проект несколькими способами, в зависимости от типа создаваемого вами приложения:

- [Включение файлов через тег &lt;script&gt;](#include-files-via-the-script-tag)
- [Импорт файлов в ES6/7 и TypeScript-приложения](#moduleimport)
- [Использование Gantt с Vite](#using-gantt-with-vite)
- [Производственная сборка Svelte](#svelte-production-build)
- [Включение файлов в приложение на базе RequireJS](#include-files-into-a-requirejs-based-app)


## Включение файлов через тег &lt;script&gt;

dhtmlxGantt требует подключения двух файлов кода на страницу:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

Давайте быстро изучим структуру пакета dhtmlxGantt, чтобы понять, где искать файлы. 

Основные папки и файлы, из которых состоит пакет dhtmlxGantt:

- <b>sources</b> - исходные файлы библиотеки. Файлы не минифицированы и их легко читать. Пакет в основном предназначен для отладки компонентов.
- <b>samples</b> - примеры кода
- <b>codebase</b> - упакованные файлы кода библиотеки. Эти файлы имеют гораздо меньший размер и предназначены для использования в производстве. <b>В ваших приложениях нужно использовать файлы из этой папки</b>

## Импорт файлов в ES6/7 и TypeScript-приложения {#moduleimport}

Используйте следующую команду для импорта файлов:

~~~jsx
import { gantt } from 'dhtmlx-gantt';
~~~

Для коммерческой, Enterprise или Ultimate версии команда выглядит так:

~~~jsx
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

## Использование Gantt с Vite

Если в вашем проекте используется Vite, для файла **vite.config.js** требуется следующая настройка, чтобы Gantt корректно включался в приложение:

~~~jsx title="vite.config.js" 
optimizeDeps: {
    include: [
        'dhtmlx-gantt',
    ]
}
~~~

## Производственная сборка Svelte

Если вы используете [Gantt в приложении на Svelte](integrations/svelte/howtostart-svelte.md), вам нужно добавить следующую настройку в файл **vite.config.js** для сборки в production, заменив папку *gantt_9.0.14_evaluation* на путь к вашей папке Gantt:

~~~jsx title="vite.config.js" 
build: {
    commonjsOptions: {
        include: [
            "node_modules",
            "gantt_9.0.14_evaluation/codebase/dhtmlxgantt.js"
        ]
    },
}
~~~

## Включение файлов в приложение на базе RequireJS

Чтобы включить файлы dhtmlxGantt в приложение на базе RequireJS, необходимо следовать логике, показанной в примере ниже:

~~~jsx
requirejs(["codebase/dhtmlxgantt"], (dhx) => {
    const gantt = dhx.gantt;
    const Gantt = dhx.Gantt; // for Enterprise builds

    gantt.init("gantt_here");
    gantt.parse({
        tasks: [
            { id: 1, text: "Project #2", start_date: "01-04-2025", duration: 18, progress: 0.4, open: true },
            { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, progress: 0.6, parent: 1 }
            ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" }
        ]
    });
});
~~~

Библиотека dhtmlxGantt вернёт объект с полями `gantt` и `Gantt` (в коммерческих, Enterprise или Ultimate версиях) — объекты *gantt* и *Gantt*, описанные [здесь](guides/multiple-gantts.md).

:::note
При использовании Gantt с пользовательскими расширениями в RequireJS следует указать конфигурацию `shim` для RequireJS и напрямую задать зависимость расширений от Gantt в ней.
 :::

Ниже приведён пример того, как файл пользовательского расширения *custom_tooltip_plugin.js* можно корректно задать:

~~~jsx
requirejs.config({
    paths: {
        "dhtmlxgantt": "../../codebase/dhtmlxgantt",
        "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
    }
});
 
requirejs(["dhtmlxgantt"], (dhx) => {
    const gantt = dhx.gantt;

    const date_to_str = gantt.date.date_to_str(gantt.config.task_date);
    const today = new Date();

    gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Today",
        title: `Today: ${date_to_str(today)}`
    });

    gantt.init("gantt_here");
    gantt.parse({
        tasks: [
            { id: 1, text: "Project #2", start_date: "01-04-2025", duration: 18, progress: 0.4, open: true },
            { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, progress: 0.6, parent: 1 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" }
        ]
    });
});
~~~

Проверьте, что имя модуля для любого файла внутри пакета указано как относительный путь внутри папки 'codebase' пакета плюс имя файла, например:

**основная библиотека:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"


## Режим полного экрана

Чтобы корректно отображать диаграмму Ганта в полноэкранном режиме в разных браузерах, на странице задайте следующий стиль:

~~~html
<style type="text/css" media="screen">
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
    }
</style>
~~~