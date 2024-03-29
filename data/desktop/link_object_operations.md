Getting the Link Object/Id
============================================
To work with links in the Gantt chart, you need to know how to get the object or id of a link. First of all,
most methods take the link's object(id) as a parameter. Secondly, custom scenarios for links can't be implemented without referring to
the link's object(id).

Getting the link object
--------------------------
To get a link object, use the api/gantt_getlink.md method:

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~


Getting all links from the Gantt chart 
------------------------------------------------
To get all links presented in the chart, use the api/gantt_getlinks.md method as in:

~~~js
var links = gantt.getLinks(); 
~~~

It will return an array of links' objects.

Getting the links related to a certain task
------------------------------------------
To get links related to a task, use the **$source**, **$target** properties of the task's object.<br> The properties are autogenerated and store ids of the  related links:

- **$source** - links that come out from the task.
- **$target** - links that come into task.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ids of coming-out links  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - ids of coming-into links  /*!*/
~~~

The **task.$source** and **task.$target** are [dynamic properties of the task object](desktop/loading.md#dataproperties) and contain ids of links connected to the task.
The properties are not stored in the database but added to the task object dynamically after the data are loaded.

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

Getting the link id
--------------------------
Generally, you can get the id of a link from the *links* object of the data set.  

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

<br>

If you want to get the id of link(s) with a specific  "*target*", "*source*" or "*type*" value, use the technique as in:

~~~js
//searching for a link that goes from the task with id=1 to the task with id=2
var links = gantt.serialize().links;                             //returns all links
for(var i=0;i<links.length; i++){                              //goes over all links
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~



Changing the link id
-------------------------------
To change the current id of a link, use the api/gantt_changelinkid.md method:
~~~js
gantt.changeLinkId(1274, "link14");          //changes the link id: 1274 -> "link14"
~~~