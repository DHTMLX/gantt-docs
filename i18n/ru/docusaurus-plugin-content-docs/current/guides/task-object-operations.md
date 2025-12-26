---
title: "Task Object/Id"
sidebar_label: "Task Object/Id"
---

# Task Object/Id

При работе с данными в диаграмме Gantt важно знать, как получить объект или id элемента данных. Большинство методов требуют объект данных или id в качестве параметра. Кроме того, любые операции с данными основываются на ссылке на объект данных или id.

*Информацию о доступных методах для работы с деревом задач смотрите в статье [Task Parent/Child](guides/task-tree-operations.md).*

## Объект задачи

Чтобы получить объект задачи, используйте метод [getTask](api/method/gettask.md):

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Родитель задачи

Чтобы найти родителя задачи, можно воспользоваться методом [getParent](api/method/getparent.md) или обратиться к свойству **parent** объекта задачи:

~~~js
gantt.getParent("t1"); //->"pr_2". Если родителя нет, метод вернет id корня
//или
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*Для всех методов, связанных со структурой дерева диаграммы Gantt, смотрите статью [Task Parent/Child](guides/task-tree-operations.md).*

## Связи, связанные с задачей

Чтобы узнать, как получить все связи, связанные с определённой задачей, ознакомьтесь со статьёй [Получение объекта/ID связи](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask).

## Длительность задачи

Чтобы определить длительность задачи, используйте метод [calculateDuration](api/method/calculateduration.md):

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

Этот метод не будет работать корректно, если изменён только параметр **duration** и объект задачи обновлён. Чтобы метод работал правильно, необходимо также обновить параметр **end_date** с помощью метода [calculateEndDate](api/method/calculateenddate.md). [См. пример](https://snippet.dhtmlx.com/f6keqhy5).

Обратите внимание, что если включена опция [work_time](api/config/work_time.md), метод [calculateDuration](api/method/calculateduration.md) рассчитывает длительность задачи исходя из рабочего времени.

## Высота задачи

Чтобы получить высоту DOM-элемента задачи, используйте метод [getTaskBarHeight](api/method/gettaskbarheight.md):

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

Возвращаемое значение также может соответствовать свойству **bar_height**, установленному в объекте задачи:

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

Обратите внимание, что если свойство **bar_height** установлено в "full", метод вычисляет высоту полосы задачи в пикселях.

## Дата окончания задачи

Чтобы получить дату окончания задачи, используйте метод [calculateEndDate](api/method/calculateenddate.md):

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

Если включена опция [work_time](api/config/work_time.md), метод воспринимает длительность как рабочее время.

## Выбранная задача

Чтобы получить текущую выбранную задачу, используйте метод [getSelectedId](api/method/getselectedid.md): 

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - id выбранной задачи
~~~

## Задачи за определённый период

Чтобы получить список задач, происходящих в заданный период, используйте метод [getTaskByTime](api/method/gettaskbytime.md):

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// tasks - массив объектов задач
~~~

## Все задачи Gantt 

Чтобы получить все задачи, отображаемые на диаграмме Gantt, вызовите метод [getTaskByTime](api/method/gettaskbytime.md) без параметров:

~~~js
var tasks = gantt.getTaskByTime();  //возвращает все задачи в виде массива объектов
~~~

Также можно использовать метод [serialize](api/method/serialize.md).

## Связи определённой задачи

Чтобы получить связи, относящиеся к определённой задаче, используйте свойства **$source** и **$target** объекта задачи. Эти свойства генерируются автоматически и содержат id связанных связей:

- **$source** - связи, исходящие из задачи.
- **$target** - связи, направленные на задачу.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - id исходящих связей  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - id входящих связей  /*!*/
~~~

## Ближайшая предстоящая задача

Чтобы найти ближайшую предстоящую задачу, используйте метод [getTaskByTime](api/method/gettaskbytime.md) следующим образом:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1));    
// tasks содержит все предстоящие задачи
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] - ближайшая предстоящая задача
~~~

## Id задачи

Обычно id задачи доступен в объекте "data" набора данных:

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

Если id задачи недоступен из набора данных, используйте метод [getTaskByTime](api/method/gettaskbytime.md) следующим образом:

~~~js
var tasks = gantt.getTaskByTime();   //возвращает все задачи
for(var i="0;i" < tasks.length; i++){  //перебираем задачи для поиска нужной
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*Если приблизительное время выполнения задачи известно, рекомендуется ограничить диапазон времени для ускорения поиска:*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

### Изменение id задачи

Чтобы изменить id задачи, используйте метод [changeTaskId](api/method/changetaskid.md):

~~~js
gantt.changeTaskId("t1", "t11");  //меняет id задачи с "t1" на "t11" 
~~~

## Открытие/закрытие веток задач

Состояние открытия ветки задачи контролируется свойством **task.$open**, которое становится доступным после загрузки задач в Gantt. Изменение этого значения будет отображено после следующей перерисовки Gantt:

~~~js
// развернуть все ветки
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// свернуть все ветки
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

Чтобы открыть или закрыть одну задачу, можно использовать методы [open](api/method/open.md) и [close](api/method/close.md). Эти методы обновляют внутреннее состояние и вызывают перерисовку. При изменении нескольких задач эффективнее напрямую менять **task.$open**, чтобы избежать лишних перерисовок.

## Копирование/вставка задач

Примеры копирования и вставки задач приведены в разделе [Решения: Как копировать и вставлять задачи](guides/how-to.md#howtocopyandpastetasks).

