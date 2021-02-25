Peculiarities of Gantt Instance
=========================

This article highlights the main features of using Gantt Instance. 

Let's consider the most common case - building an application with several pages/tabs/views. 

The following approach can be applicable to the Angular-based (or React-based) apps and is available only in the Enterprise or Ultimate version of dhtmlxGantt (and not available in the GPL or Commercial editions):

- when you open a page/tab/view with Gantt, you need to create a new Gantt instance;
- when you switch to a different page/tab/view, you need to [destroy the Gantt instance](desktop/multiple_gantts.md#destructorofganttanddataprocessorinstances). 


**The alternative approach** (that will work for all versions) is to manually reset everything by yourself. <br>

{{note Check the [example](http://snippet.dhtmlx.com/5/abec296e0) that demonstrates how the approach can be implemented. <br>
When you click the **Recreate Gantt** button, Gantt will initialize, load tasks, and attach the events. If you destroy Gantt, the events will be detached.}}

Here is the list of things that you need to keep in mind when using this way:

## Custom events

When you load the page with Gantt you need to manually save the IDs of the events in an array before adding them:

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

When you switch to another page, you need to manually detach events by using the IDs that you've saved in an array:

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

For more details, see the [Detaching events](desktop/handling_events.md#detachingevents) section.

## Predefined events

Right now, there is no easy way to detach them.

## Data Processor

You need to manually destroy [dataProcessor](api/gantt_dataprocessor.md):

~~~js
dp.destructor();
~~~

Please, be aware that you need to destroy only dataProcessor, not Gantt. Otherwise, you won't be able to use Gantt until you reload the page.


## Tasks, links, resource data, markers, custom hotkeys 

You can safely remove these data from the Gantt instance by using the [clearAll()](api/gantt_clearall.md) method.

## Gantt configuration

There is no a built-in way to save it or reset the Gantt configuration to the default one. Most of the Gantt configuration is saved inside the [[gantt.config](api/refs/gantt_props.md) object.

##CSS

If you've added custom CSS, you need to manually remove it if it causes problems.

## Calendar settings

You need to manually remove them with the [gantt.deleteCalendar()](api/gantt_deletecalendar.md) method.


## Other cases

Apart from the points described above, you probably will need to implement some other options, but we have not tested all possible scenarios of this approach yet.


