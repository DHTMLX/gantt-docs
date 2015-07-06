Adding/Updating/Deleting Links
=========================================
In this chapter you'll learn how to do basic operations with dependency links: to create or delete a link, 
to dynamically update a link's property. 


Adding a new link
----------------------------
To add a new link to the Gantt chart, use the api/gantt_addlink.md method:

~~~js
var linkId = gantt.addLink({
	id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

Updating a link's property
------------------------------
To dynamically update a property of a link object, use the api/gantt_refreshlink.md method:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
	link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Note, to update all links in the Gantt chart at once, use the api/gantt_refreshdata.md method:

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
	gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

{{note
Note, all types of links' dependencies are stored in the api/gantt_links_config.md object
}}

Deleting a link
-------------------------------
To delete a link, use the api/gantt_deletelink.md method:

~~~js
gantt.deleteLink(linkId);
~~~

Removing all links from the Gantt chart
-------------------------------------------
To clear the Gantt chart from all tasks and links, call the api/gantt_clearall.md method:


~~~js
gantt.clearAll();
~~~
