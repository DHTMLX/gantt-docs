---
title: "Критический путь" 
sidebar_label: "Критический путь" 
--- 

# Критический путь

:::info
Эта функциональность доступна только в версии PRO
:::

Критический путь — это последовательность задач, которые нельзя задерживать. В противном случае весь проект будет задержан.

Критический путь также определяет минимально возможное время выполнения проекта.

Задача считается критической, если у неё нет запасов по дням, и любое её задерживание напрямую повлияет на дату завершения проекта. Подробное объяснение того, как рассчитывается логика критического пути, приведено в разделе [Логика критического пути](#critical-path-logic).

Время запаса — это время, на которое задача может «поплыть» без влияния на другие задачи или на дату завершения проекта.

<div style="text-align:center;">![Критический_путь](/img/critical_path.png)</div>

:::note
Чтобы начать использовать расширение, включите его с помощью метода [gantt.plugins](api/method/plugins.md).
:::

Чтобы показать критический путь на диаграмме Gantt, установите свойство [highlight_critical_path](api/config/highlight_critical_path.md) в значение 'true':

(Показывать критический путь на диаграмме Gantt)
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
    //your code will be here
</body>
</html>
~~~

[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

Обратите внимание, что когда свойство включено, dhtmlxGantt автоматически проверяет статус задач и обновляет критический путь. 
Критическим задачам и связям будут соответствовать дополнительные CSS классы *'critical_task'* и *'critical_link'* соответственно. 

При каждом изменении задачи dhtmlxGantt полностью перерисовывает данные для повторного вычисления критического пути. Иногда это может привести к проблемам с производительностью. Для этого компонент предоставляет публичные методы, которые позволяют проверить
определённую задачу или связь и реализовать более производительную стратегию отображения критического пути.

## Логика критического пути

Gantt считает задачу критической в следующих случаях:

1. Задача имеет самую позднюю конечную дату во всей диаграмме.

![критические_задачи](/img/critical_tasks.png)

2. Задача соединена с критической задачей, и задержка между ними равна 0.

Задержка зависит от значения параметра **gantt.config.duration_unit**. Когда **duration_unit** установлен как *'day'*, и продолжительность между задачами составляет несколько часов, Gantt округляет продолжительность по следующим правилам:

- округлять вниз, если она больше или равна 12 часам
- округлять вверх, если она меньше 12 часов

Если объект связи содержит параметр задержки (lag), он позволяет изменять длительность между задачами. Например, когда *lag* установлен в 1, задача становится критической, когда длительность между задачами равна 1.

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

![задержка0](/img/lag0.png)

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

![задержка1](/img/lag1.png)

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

![задержка_-1](/img/lag_1.png)

3. Параметр **gantt.config.project_end** указан, и даты задач больше даты **gantt.config.project_end**.

К сожалению, изменить встроенную логику определения критического пути нельзя.
Но вы можете [настроить поведение критического пути](#customizing-the-critical-path-behaviour).

## Проверка, является ли задача критической

Чтобы проверить, является ли какая-либо задача критической, используйте метод [isCriticalTask](api/method/iscriticaltask.md):

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~

[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

## Проверка, является ли связь критической

Чтобы проверить, является ли связь критической (соединяет 2 критические задачи), используйте метод [isCriticalLink](api/method/iscriticallink.md):

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~

[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

## Получение свободного и общего запаса {#gettingfreeandtotalslack}

**Свободный запас** — период времени, который можно использовать для увеличения продолжительности задачи или перемещения её на временной шкале без влияния на следующую за ней задачу, к которой она привязана.

Свободный запас может вычисляться для типов задач 'task' и 'milestone'.

Чтобы получить свободный запас задачи, используйте метод [getFreeSlack](api/method/getfreeslack.md). Он принимает объект задачи в качестве параметра:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

**Общий запас** — период времени, который можно использовать для увеличения продолжительности задачи или перемещения её на временной шкале без влияния на время окончания всего проекта.

Общий запас можно вычислять для всех типов задач, включая проекты.

Чтобы получить общий запас задачи, используйте метод [getTotalSlack](api/method/gettotalslack.md). Он принимает объект задачи в качестве параметра:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~

[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

![Slack](/img/show_slack.png)

## Настройка поведения критического пути

По умолчанию gantt применяет стандартное поведение для критического пути, например, стиль подсветки по умолчанию и повторное вычисление критического пути при каждом обновлении данных.

Чтобы управлять видимостью критического пути, используйте следующий подход:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~

Это может быть полезно, когда у вас большое количество задач, и повторное вычисление критического пути может повлиять на производительность.

Чтобы вручную повторно вычислить критический путь и применить соответствующий стиль, используйте следующий подход:

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


Также можно подсвечивать задачи и связи вручную:

- Если вернуть "gantt_critical_task" в шаблоне [task_class], задача будет подсвечена как критическая.
- Если вернуть "gantt_critical_link" в шаблоне [link_class], связь будет подсвечена как критическая.

**Связанный пример:** [Настройка критического пути для каждого проекта](https://snippet.dhtmlx.com/jd4dyc5p)

## Установка задержек (lag) и лид-времён между задачами

Можно задать задержку (lag) и лид-времена между задачами критического пути. Подробности можно найти здесь (guides/auto-scheduling.md#settinglagandleadtimesbetweentasks).

## Планирование выполненных задач

По умолчанию между тем, как алгоритм критического пути обрабатывает выполненные задачи (задачи со сводкой прогресса 1) и невыполненные задачи, разницы нет.

При желании можно включить конфигурацию [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md), чтобы изменить поведение:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

Если конфигурация включена, выполненные задачи будут исключены из критического пути и авто-распределения.

Подробнее смотрите на [странице API](api/config/auto_scheduling_use_progress.md).