---
title: "Parent Control"
sidebar_label: "Parent Control"
---

Parent Control
=====================

A select box for changing the parent of a task. The control loads all tasks presented in the Gantt chart but you can set filtering rules and the template of displayable values.
Everything else is identical to [Select Control](guides/select.md).
 

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


Initialization 
-----------------

To add the **parent** control to the lightbox, follow these steps:

1) Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) Set a label for the section:

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~
  

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)
  


Properties
----------------

The following properties are mostly important and commonly set for the **parent** control (see the full list <a href="[lightbox](api/config/lightbox.md)">here</a>):

- **name** - (*string*) the section name 
- **height** - (*number*) the section height
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the [type of the section control](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **allow_root** - (*boolean*) if set to "true", the options list will contain an additional option that will allow users to set the root level as the parent for tasks. Used in pair with the **root_label** property 
- **root_label** - (*string*) sets a label for the root-level parent. Used in pair with the **allow_root** property 
- **filter** - (*function*) sets a [filtering function for the select options](guides/parent.md#options-filtering). Takes the task id and task object as parameters
- **sort** - (*function*) sets a [sorting function for the select options](guides/parent.md#options-sorting) 
- **template** - (*function*) sets a template for select options
  

Options filtering
-----------------------

To filter options presented in the **parent** control, use the **filter** property:

**Filtering. Displaying only tasks of the 1st level**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  filter:function(id, task){ /*!*/
         if(task.$level > 1){         /*!*/
            return false;     /*!*/
        }else{  /*!*/
            return true; /*!*/
        } /*!*/
    }},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


The **filter** property sets a filtering function that takes 2 parameters:

- **id**  - (*string, number*) the task's id
- **task** - (*object*) the task's object

and returns:

- *true*, for a task that should be displayed
- *false*, for a task that should be removed from the list of options


Options sorting
------------------

To sort options presented in the **parent** control, use the **sort** property:

**Sorting tasks by the title's length**
~~~js
function sortByLength(a,b){
    a = a.text.length();
    b = b.text.length();
    return a>b?1:(a<b?-1:0);
};
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  sort:sortByLength}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

The **sort** property sets a sorting function that is called for each pair of adjacent values and return 1,-1 or 0:

- 1 - an object with the first value in pair must go before the second one
- -1 - the second object goes before the first one
- 0 - the order of both objects doesn't change

Template for options
-------------------------

To set the template of options in the **parent** control, use the **template** property:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  template(start,end,ev){/*!*/
        var title = ev.id+"."+ev.text;/*!*/
        return title;/*!*/
    }}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

The **template** property sets a function that takes 3 parameters: 

- **start** - (*Date*)  the date when an event is scheduled to begin
- **end** - (*Date*) the date when an event is scheduled to be completed
- **ev** - (*object*) the event's object

and returns the template of options in the control.


:::note
If the 'template' property isn't specified, the format of options will be defined by the [task_text](api/template/task_text.md) template.
:::

