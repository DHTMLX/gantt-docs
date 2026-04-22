---
title: "Task Object/Id"
sidebar_label: "Task Object/Id"
---

# Объект задачи/ID

Чтобы работать с данными в диаграмме Gantt, необходимо знать, как получить объект или id элемента данных. Во‑первых, большинство методов принимают объект данных/id в качестве параметра. 
Во‑вторых, любой сценарий кода, связанный с данными, не может быть реализован без обращения к объекту данных/id.

*Чтобы узнать о доступных методах, связанных с деревом задач, ознакомьтесь со статьей [Родитель/Дочерний элемент задачи](guides/task-tree-operations.md).*

## Объект задачи

Чтобы получить объект задачи, используйте метод [getTask](api/method/gettask.md):

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Родитель задачи

Чтобы получить родителя задачи, используйте метод [getParent](api/method/getparent.md) или свойство **parent** объекта задачи:

~~~js
gantt.getParent("t1"); //->"pr_2".If there is no parent, the method returns the root id
//или
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*Чтобы увидеть все методы, связанные с природой дерева диаграммы Gantt, прочитайте статью [Родитель/Дочерний элемент задачи](guides/task-tree-operations.md).*

## Связи задачи

Для получения сведений о том, как получить все ссылки, связанные с конкретной задачей, смотрите статью [Получение объекта/ID ссылки](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task).


## Длительность задачи

Чтобы получить длительность задачи, используйте метод [calculateDuration](api/method/calculateduration.md):

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

Метод не будет работать после изменения лишь параметра **duration** и обновления объекта задачи. Чтобы он заработал, также нужно обновить параметр **end_date** через метод [calculateEndDate](api/method/calculateenddate.md). [Посмотреть пример](https://snippet.dhtmlx.com/f6keqhy5).

Замечание: если опция [work_time](api/config/work_time.md) включена, метод [calculateDuration](api/method/calculateduration.md) рассчитывает длительность задачи в рабочем времени. 

## Высота задачи

Чтобы получить высоту DOM‑элемента задачи, используйте метод [getTaskBarHeight](api/method/gettaskbarheight.md):

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

Значение возврата может также соответствовать значению, указанному в свойстве **bar_height** объекта задачи:

~~~js
var tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row:height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row:height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

Примечание: если свойство **bar_height** указано как "full", метод вычисляет высоту полосы задачи в пикселях.

## Дата окончания задачи

Чтобы получить дату окончания задачи, используйте метод [calculateEndDate](api/method/calculateenddate.md):

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

Замечание: если опция [work_time](api/config/work_time.md) включена, метод считает продолжительность как рабочее время. 


## Выбранная задача

Чтобы получить текущую выбранную задачу, используйте метод [getSelectedId](api/method/getselectedid.md): 

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - идентификатор выбранной задачи
~~~ 

## Задачи за указанный период

Чтобы получить коллекцию задач, которые встречаются в указанный период, используйте метод [getTaskByTime](api/method/gettaskbytime.md):

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// где tasks — массив объектов задач
~~~

## Все задачи диаграммы Gantt

Чтобы получить все задачи, представленные на диаграмме Gantt, используйте метод [getTaskByTime](api/method/gettaskbytime.md) как и в примере:

~~~js
var tasks = gantt.getTaskByTime();  //returns all tasks as an array of objects
~~~

Можно также вызвать метод [serialize](api/method/serialize.md).


## Ссылки на конкретную задачу

Чтобы получить ссылки, связанные с задачей, используйте свойства **$source**, **$target** объекта задачи. Эти свойства генерируются автоматически и содержат идентификаторы связанных ссылок:

- **$source** - ссылки, которые исходят из задачи.
- **$target** - ссылки, которые входят в задачу.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - ids of coming-out links  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - ids of coming-into links  /*!*/
~~~


## Ближайшая приходящая задача

Чтобы получить ближайшую приходящую задачу, используйте метод [getTaskByTime](api/method/gettaskbytime.md) как и в примере:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1);    
// tasks - список всех предстоящих задач
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] - ближайшее предстоящее событие
~~~


## ID задачи

В общем случае, вы можете получить id задачи из объекта "data" набора данных. 

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

Если вы не можете получить id задачи из набора данных, используйте метод [getTaskByTime](api/method/gettaskbytime.md) как в примере:

~~~js
var tasks = gantt.getTaskByTime();   //returns all tasks
for(var i="0;i" < tasks.length; i++){  //перебирает все задачи, чтобы найти нужную
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*Если вы знаете ориентировочное время, когда появляется нужная задача, лучше ограничить возвращаемую коллекцию задач, чтобы увеличить скорость работы приложения:*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~


### Изменение id задачи

Чтобы изменить текущий id задачи, используйте метод [changeTaskId](api/method/changetaskid.md):

~~~js
gantt.changeTaskId("t1", "t11");  //меняет id задачи с "t1" на "t11" 
~~~


## Открытие/закрытие ветвей задачи

Открытое состояние ветви задачи определяется свойством **task.$open**, которое становится доступно после загрузки задач в Gantt.
После изменения значения изменения будут отображены после следующей перерисовки диаграммы Gantt:

~~~js
// разворачиваем все ветви
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// сворачиваем все ветви
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~ 

Чтобы открыть/закрыть одну задачу, можно использовать методы [open](api/method/open.md) и [close](api/method/close.md). Они изменят внутреннее состояние задачи и вызовут перерисовку.
Однако для изменения большого числа задач лучше работать напрямую с **task.$open**, чтобы избежать лишних перерисовок.

## Копирование/вставка задач

Следуйте примерам, приведённым в разделе [Как копировать и вставлять задачи](guides/how-to.md#how-to-copy-and-paste-tasks).