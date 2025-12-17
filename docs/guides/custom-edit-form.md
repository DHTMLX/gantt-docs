---
title: "Custom Lightbox"
sidebar_label: "Custom Lightbox"
---

Custom Lightbox
===============

The ways of creating a custom lightbox
----------------------------------------

You can create a fully custom lightbox for gantt and replace the default one with it. There are two possible ways to do it:

1) By redefining the [showLightbox](api/method/showlightbox.md) method:

~~~js
gantt.showLightbox = function(id){
    // code of the custom form
}
~~~

- id - (string/number) - the task id

There's also the [hideLightbox](api/method/hidelightbox.md) method that will help in the lightbox implementation.


Let's create an HTML container "my-form" where we'll put a custom lightbox:

~~~html
<div id="my-form">
 <label for="description">Task text
  <input type="text" name="description" value="" >
 </label>
 


 <input type="button" name="save" value="Save">
 <input type="button" name="close" value="Close">
 <input type="button" name="delete" value="Delete">
</div>
~~~


Then to make a custom lightbox, you can use the configuration similar to this:


~~~js
var taskId = null;

gantt.showLightbox = function(id) {
    taskId = id;
    var task = gantt.getTask(id);

    var form = getForm();
    var input = form.querySelector("[name='description']");
    input.focus();
    input.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = function(){
    getForm().style.display = "";
    taskId = null;
}


function getForm() {
    return document.getElementById("my-form");
};

function save() {
    var task = gantt.getTask(taskId);

    task.text = getForm().querySelector("[name='description']").value;

    if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent);
    }else{
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    var task = gantt.getTask(taskId);

    if(task.$new)
    gantt.deleteTask(task.id);
    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(taskId);
    gantt.hideLightbox();
}
~~~

2) Using the [onBeforeLightbox](api/event/onbeforelightbox.md) event. In this case the algorithm of actions is the following:

- detect when the lightbox is about to be shown
- block the default lightbox
- show a custom form and fill-in the task data.


~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..apply values
                    delete task.$new;
                    gantt.addTask(task);
                }else{
                    gantt.deleteTask(task.id);
                }
            }
        });
        return false;
    }
    return true;
});
~~~

Processing actions in the custom form
--------------------------------


When user saves the form, you'll need to manually get form values and update the appropriate task using the public API: [addTask](api/method/addtask.md), [updateTask](api/method/updatetask.md) and [deleteTask](api/method/deletetask.md).

Note that when a lightbox is triggered by a new task (on clicking the 'plus' button) which should be deleted if the user clicks 'Cancel' to revert the task creation,
the task object will have the '$new' property set.

You can process lightbox closing, as shown in the example below. The type of an action - 'save', 'cancel' or 'delete' is passed as the "action" parameter:

~~~js
switch(action){
   case "save":
      task.text = '';// apply values from form

      // add new task or update already existing one
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // if cancel popup for creating a new task - delete it, otherwise do nothing
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~

