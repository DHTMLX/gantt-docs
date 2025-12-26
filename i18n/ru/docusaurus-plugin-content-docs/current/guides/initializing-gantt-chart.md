---
title: "dhtmlxGantt на чистом JS/HTML"
sidebar_label: "Быстрый старт"
---

# dhtmlxGantt на чистом JS/HTML

При создании приложения с dhtmlxGantt первым шагом является настройка или, проще говоря, отображение диаграммы Gantt на вашей странице.

В этом руководстве описано, как инициализировать dhtmlxGantt с помощью чистого JavaScript и HTML. Для интеграции с фронтенд-фреймворками вы также можете ознакомиться с этими руководствами:


<table>
  <tbody style="text-align:center">
  <tr>
  <td>![angular_icon](/img/angular_icon.png)</td>
  <td>![react_icon](/img/react_icon.png)</td>
  <td>![svelte_icon](/img/svelte_icon.png)</td>
  <td>![vue_icon](/img/vue_icon.png)</td>
  </tr>
  <tr>
  <td>[Angular](integrations/angular/howtostart-angular.md)</td>
  <td>[React](integrations/react/quick-start.md)</td>
  <td>[Svelte](integrations/svelte/howtostart-svelte.md)</td>
  <td>[Vue.js](integrations/vue/howtostart-vue.md)</td>
  </tr>
  </tbody>
</table>


## Создание базовой диаграммы Gantt

Чтобы отобразить простую диаграмму Gantt на странице, выполните три шага:

1. Добавьте [файлы dhtmlxGantt](guides/initializing-gantt-chart.md#howtoaddganttsourcefilesintoaproject) на вашу страницу.
2. Создайте контейнер DIV, в котором будет отображаться диаграмма.
3. Инициализируйте dhtmlxGantt внутри этого контейнера с помощью метода [init](api/method/init.md). Этот метод принимает HTML-элемент контейнера или его id в качестве параметра, в котором будет отображаться диаграмма Gantt.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");   /*!*/                        
    </script>
</body>
</html>
~~~

![/img/init_gantt_front.png](/img/init_gantt_front.png)


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

 
 
## Как добавить исходные файлы Gantt в проект

В зависимости от типа разрабатываемого приложения существует несколько способов добавить исходные файлы Gantt в ваш проект:

- [Подключить файлы с помощью тега &#60;script&#62;](#scripttag)
- [Импортировать файлы в приложениях на ES6/7 и TypeScript](#moduleimport)
- [Подключить файлы в приложениях на RequireJS](#requirejsimport)


## Подключение файлов через тег &#60;script&#62;

Чтобы использовать dhtmlxGantt, необходимо добавить на страницу два файла:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

Рассмотрим кратко структуру пакета dhtmlxGantt, чтобы увидеть, где расположены эти файлы.

Основные папки и файлы пакета dhtmlxGantt:

- <b>sources</b> - исходные файлы библиотеки, не минифицированные и удобные для чтения. Используются в основном для отладки компонентов.
- <b>samples</b> - примеры кода.
- <b>codebase</b> - минифицированные файлы для использования в продакшене. <b>В своих приложениях используйте файлы из этой папки.</b>

## Импорт файлов в приложения на ES6/7 и TypeScript

Используйте эту команду для импорта файлов:

~~~js
import { gantt } from 'dhtmlx-gantt';
~~~

Для Commercial, Enterprise или Ultimate версий используйте:

~~~js
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

## Использование Gantt с Vite

Если ваш проект использует Vite, добавьте следующую настройку в файл **vite.config.js**, чтобы Gantt корректно подключился:

**vite.config.js**
~~~js 
optimizeDeps: {
    include: [
        'dhtmlx-gantt',
    ]
}
~~~

### Svelte production build

Если вы используете [Gantt в приложении Svelte](integrations/svelte/howtostart-svelte.md), добавьте следующее в файл **vite.config.js** для production-сборки. Замените *gantt_8.0.6_evaluation* на путь к вашей папке Gantt:

**vite.config.js**
~~~js 
build: {
    commonjsOptions: {
        include: [
            "node_modules",
            "gantt_8.0.6_evaluation/codebase/dhtmlxgantt.js"
        ]
    },
}
~~~

## Подключение файлов в приложении на RequireJS

Чтобы добавить файлы dhtmlxGantt в приложение на RequireJS, используйте следующий шаблон:

~~~js
requirejs(["codebase/dhtmlxgantt"], function(dhx){
  var gantt = dhx.gantt;
  var Gantt = dhx.Gantt; // для сборок Enterprise
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018", 
          duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
          duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
          duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Библиотека dhtmlxGantt возвращает объект с полями `gantt` и `Gantt` (последний - для Commercial, Enterprise или Ultimate версий). Эти объекты соответствуют *gantt* и *Gantt*, описанным [здесь](guides/multiple-gantts.md).

:::note
При использовании Gantt с кастомными расширениями в RequireJS обязательно указывайте конфигурацию `shim` для RequireJS и явно задавайте зависимости расширений от Gantt.
:::

Ниже приведён пример правильной настройки кастомного расширения *custom_tooltip_plugin.js*:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
  },
  shim: {
    "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
  }
});
 
requirejs(["dhtmlxgantt"], 
function (dhx) {
  var gantt = dhx.gantt;

  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
  var today = new Date(2018, 3, 5);
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
  });
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018",
          duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
          duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
          duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Убедитесь, что имя модуля для любого файла внутри пакета указывается как *относительный путь внутри папки 'codebase'* плюс *имя файла*, например:

**основная библиотека:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"


## Полноэкранный режим

Чтобы диаграмма Gantt корректно отображалась в полноэкранном режиме во всех браузерах, добавьте на страницу следующий стиль:

~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

