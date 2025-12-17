---
title: "Критический путь"
sidebar_label: "Критический путь"
---

Критический путь
===================================

:::info
Эта функция доступна только в редакции PRO.
:::

Критический путь представляет собой последовательность задач, которые нельзя отложить без задержки всего проекта.


Он также определяет минимальную продолжительность, необходимую для завершения проекта.


Задача считается критической, если у нее нулевой запас времени, то есть любая задержка этой задачи напрямую влияет на дату завершения проекта. Подробнее о том, как рассчитывается критический путь, читайте в разделе [Critical path logic](#criticalpathlogic).


Запас времени - это количество времени, на которое можно отложить задачу, не влияя на последующие задачи или общий дедлайн проекта.

<div style="text-align:center;">![critical_path](/img/critical_path.png)</div>

:::note
Чтобы начать использовать это расширение, активируйте его с помощью метода [gantt.plugins](api/method/plugins.md).
:::

Для отображения критического пути на диаграмме Gantt установите свойство [highlight_critical_path](api/config/highlight_critical_path.md) в значение 'true':

**Включение отображения критического пути в диаграмме Gantt**
~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        critical_path: true /*!*/
    }); /*!*/
    gantt.config.highlight_critical_path = true;
    //ваш код будет здесь
</body>
</html>
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


Когда это свойство включено, dhtmlxGantt автоматически отслеживает статусы задач и обновляет критический путь соответствующим образом. 
Критические задачи и связи получают дополнительные CSS-классы: *'critical_task'* и *'critical_link'* соответственно.

Каждый раз при обновлении задачи dhtmlxGantt полностью перерисовывает данные для перерасчета критического пути. 
Этот процесс может иногда влиять на производительность. Для решения этой задачи компонент предоставляет публичные методы, которые позволяют проверять отдельные задачи или связи, что обеспечивает более производительный способ отображения критического пути.

Логика критического пути
--------------------

Gantt отмечает задачу как критическую при выполнении следующих условий:

1. Задача имеет самую позднюю дату окончания на всей диаграмме.

![](/img/critical_tasks.png)

2. Задача связана с критической задачей без задержки (lag).

Задержка зависит от настройки **gantt.config.duration_unit**. Когда **duration_unit** установлено в *'day'*, а продолжительность задачи составляет несколько часов, Gantt округляет продолжительность следующим образом:

- округляет вниз, если продолжительность 12 часов и более
- округляет вверх, если менее 12 часов

Если объект связи содержит параметр lag, он изменяет продолжительность между задачами. Например, *lag* равный 1 означает, что задача становится критической, когда разница между задачами составляет 1. 
  
Вот примеры с разными значениями **link.lag**:

- link.lag равен 0

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 0, "type": "0" },
        
    ]
}
~~~

![](/img/lag0.png)

- link.lag равен 1

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 1, "type": "0" }, 
        
    ]
}
~~~

![](/img/lag1.png)

- link.lag равен -1

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": -1, "type": "0" },
        
    ]
}
~~~

![](/img/lag_1.png)

3. Установлен параметр **gantt.config.project_end**, и даты задачи выходят за его пределы.

В настоящее время встроенная логика критического пути не может быть изменена.
Однако вы можете [кастомизировать поведение критического пути](#customizingthecriticalpathbehaviour).

Проверка, является ли задача критической
---------------------------------------
Чтобы определить, является ли задача критической, используйте метод [isCriticalTask](api/method/iscriticaltask.md):

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


Проверка, является ли связь критической
---------------------------------------

Чтобы проверить, соединяет ли связь две критические задачи, используйте метод [isCriticalLink](api/method/iscriticallink.md):

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


Получение свободного и полного запаса времени
--------------------------

**Свободный запас времени** - это количество времени, на которое задачу или веху можно продлить или сдвинуть, не задерживая следующую связанную задачу.

Свободный запас времени применяется к типам 'task' и 'milestone'.

Чтобы получить свободный запас времени для задачи, используйте метод [getFreeSlack](api/method/getfreeslack.md), передав объект задачи:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


**Полный запас времени** - это время, на которое задачу можно отложить без влияния на общий срок завершения проекта.

Полный запас времени может быть рассчитан для всех типов задач, включая проекты.

Чтобы получить полный запас времени задачи, используйте метод [getTotalSlack](api/method/gettotalslack.md) с объектом задачи:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


![Slack](/img/show_slack.png)

Настройка поведения критического пути
---------------------------------------------
По умолчанию Gantt применяет стандартное поведение для критического пути, включая стандартные стили выделения и перерасчет пути при каждом изменении данных.

Чтобы управлять видимостью критического пути, используйте следующий метод:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~

Этот способ полезен при работе с большим количеством задач, так как частый перерасчет критического пути может повлиять на производительность.

Для ручного перерасчета критического пути и обновления стилей используйте следующий подход:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(gantt.isCriticalTask(task))
        return "critical_task";
      return "";
};

gantt.templates.link_class = function(link){
    if(gantt.isCriticalLink(link))
        return "critical_link";
      return "";
};

var data = {
    tasks: [
        { id: 1, text: "Office itinerancy", open:true, type:"project" },
        { id: 2, text: "Office facing", start_date: "21-07-2020", 
            duration: "20", parent: "1" },
        { id: 3, text: "Furniture installation", start_date: "21-07-2020", 
            duration: "5", parent: "1" },
        { id: 4, text: "The employee relocation", start_date: "28-07-2020", 
            duration: "15", parent: "1" },
        { id: 5, text: "Interior office", start_date: "28-07-2020", 
            duration: "15", parent: "1" }
    ],
    links: [
        { id: "1", source: "2", target: "3", type: "0" },
        { id: "2", source: "3", target: "4", type: "0" },
        { id: "3", source: "4", target: "5", type: "0" }
    ]
};
gantt.init("gantt_here");

gantt.parse(data);
~~~


Вы также можете вручную выделять задачи и связи:

- Возврат "gantt_critical_task" в шаблоне [task_class](api/template/task_class.md) выделит задачу как критическую.
- Возврат "gantt_critical_link" в шаблоне [link_class](api/template/link_class.md) выделит связь как критическую.

**Связанный пример:** [Custom critical path per project](https://snippet.dhtmlx.com/jd4dyc5p)

Установка lag и lead между задачами
---------------------------------

Lag и lead между задачами критического пути могут быть настроены. Подробнее читайте [здесь](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks).

Планирование завершённых задач
----------------------------

По умолчанию алгоритм критического пути рассматривает завершённые задачи (с progress value 1) так же, как и незавершённые.

При необходимости включите настройку [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md), чтобы изменить это поведение:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

При включении этой опции завершённые задачи исключаются из критического пути и авто-планирования.

Более подробную информацию смотрите на [странице API](api/config/auto_scheduling_use_progress.md).

