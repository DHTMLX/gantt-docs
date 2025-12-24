---
title: "Получение объекта/ID связи"
sidebar_label: "Получение объекта/ID связи"
---

# Получение объекта/ID связи

При работе со связями в диаграмме Gantt важно понимать, как получить объект или id связи. Большинство методов требуют передачи объекта (или id) связи в качестве входного параметра. Кроме того, для корректной работы пользовательских сценариев, связанных со связями, также необходимо ссылаться на объект или id связи.

## Получение объекта связи

Для получения объекта связи используйте метод [getLink](api/method/getlink.md):

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

## Получение всех связей из диаграммы Gantt

Чтобы получить все связи, которые в данный момент отображаются на диаграмме, используйте метод [getLinks](api/method/getlinks.md) следующим образом:

~~~js
var links = gantt.getLinks(); 
~~~

В результате будет возвращён массив, содержащий все объекты связей.

## Получение связей, связанных с определённой задачей

Чтобы найти связи, связанные с конкретной задачей, проверьте свойства **$source** и **$target** объекта задачи.

Эти свойства создаются автоматически и содержат id соответствующих связей:

- **$source** - связи, исходящие из задачи.
- **$target** - связи, входящие в задачу.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - id исходящих связей  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - id входящих связей  /*!*/
~~~

Свойства **task.$source** и **task.$target** - это [динамические свойства объекта задачи](guides/loading.md#dataproperties), которые содержат id связей, связанных с задачей. Эти свойства не сохраняются в базе данных, а динамически добавляются к объекту задачи после загрузки данных.

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// связи, начинающиеся с данной задачи,
// `task #1` выступает в роли предшественника в этих отношениях

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// связи, ведущие к данной задаче,
// `task #1` выступает в роли преемника в этих отношениях

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

## Получение id связи

Как правило, id связи можно найти в объекте *links* набора данных.

~~~js
{
    tasks:[...],
    links:[
        { id:1, source:1, target:2, type:"1"},                       //id связи = 1 /*!*/
        { id:2, source:2, target:3, type:"0"},                       //id связи = 2 /*!*/
        { id:3, source:3, target:4, type:"0"}                        //id связи = 3 /*!*/
    ]
}
~~~


Если необходимо найти id связи(ей) с определённым значением "*target*", "*source*" или "*type*", можно воспользоваться следующим подходом:

~~~js
// поиск связи, идущей от задачи с id="1" к задаче с id="2"
var links = gantt.serialize().links;                             // возвращает все связи
for(var i="0;" i < links.length; i++){                             // перебирает все связи
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~

## Изменение id связи

Чтобы изменить id существующей связи, используйте метод [changeLinkId](api/method/changelinkid.md):

~~~js
gantt.changeLinkId(1274, "link14");          // меняет id связи с 1274 на "link14"
~~~

