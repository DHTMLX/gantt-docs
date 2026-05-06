---
title: "Получение объекта/ID связи"
sidebar_label: "Получение объекта/ID связи"
---

# Получение объекта/идентификатора ссылки

Чтобы работать со ссылками в диаграмме Gantt, необходимо знать, как получить объект или идентификатор ссылки. Прежде всего, большинство методов принимают объект ссылки (id) в качестве параметра. Во-вторых, пользовательские сценарии для ссылок не могут быть реализованы без обращения к объекту ссылки (id).

## Получение объекта ссылки

Чтобы получить объект ссылки, используйте метод [getLink](api/method/getlink.md):

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

## Получение всех ссылок из диаграммы Gantt

Чтобы получить все ссылки, присутствующие на диаграмме, используйте метод [getLinks](api/method/getlinks.md), как показано:

~~~js
var links = gantt.getLinks(); 
~~~

Это вернет массив объектов ссылок.

## Получение ссылок, связанных с определенной задачей

Чтобы получить ссылки, связанные с задачей, используйте свойства **$source**, **$target** объекта задачи.

Свойства автогенерируются и содержат идентификаторы связанных ссылок:

- **$source** - ссылки, исходящие из задачи.
- **$target** - ссылки, входящие в задачу.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ids of coming-out links  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - ids of coming-into links  /*!*/
~~~

Свойства **task.$source** и **task.$target** являются [динамическими свойствами объекта задачи](guides/loading.md#dataproperties) и содержат идентификаторы связанных ссылок. Эти свойства не сохраняются в базе данных, а добавляются к объекту задачи динамически после загрузки данных.

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// links that come from the task,
// `task #1` is a predecessor in these relations

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// links that come into the task,
// `task #1` is a successor in these relations

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

## Получение идентификатора ссылки

Обычно идентификатор ссылки можно получить из объекта *links* набора данных. 

~~~js
{
    tasks:[...],
    links:[
        { id:1, source:1, target:2, type:"1"},                       //link's id = 1 /*!*/
        { id:2, source:2, target:3, type:"0"},                       //link's id = 2 /*!*/
        { id:3, source:3, target:4, type:"0"}                        //link's id = 3 /*!*/
    ]
}
~~~

Если вам нужно получить идентификатор(ы) ссылки с конкретным значением "*target*", "*source*" или "*type*", используйте подход, как в примере:

~~~js
//поиск ссылки, которая идет от задачи с id="1" к задаче с id="2"
var links = gantt.serialize().links;                             //returns all links
for(var i="0;i<links.length;" i++){                              //goes over all links
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~


## Изменение идентификатора ссылки

Чтобы изменить текущий идентификатор ссылки, используйте метод [changeLinkId](api/method/changelinkid.md):

~~~js
gantt.changeLinkId(1274, "link14");          //changes the link id: 1274 -> "link14"
~~~