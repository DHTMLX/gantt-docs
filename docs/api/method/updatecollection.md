---
sidebar_label: updateCollection
title: updateCollection method
description: "updates the specified collection with new options"
---

# updateCollection

### Description

@short: Updates the specified collection with new options

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* -         the name of the collection to update
- `options` - (required) *array* - the new values of the collection

### Returns
- ` collection` - (boolean) - true, if the update was successful; false, if the collection wasn't found

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", /*!*/
        options:gantt.serverList("priorities", values_array)},     /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.updateCollection("priorities", new_values_array); /*!*/
~~~

### Details

- The method calls the [onOptionsLoad](api/event/onoptionsload.md) event and resets the lightbox. 
- The collection can be created with the [serverList](api/method/serverlist.md) method.

### Examples

#### Select control

Let's assume that you have the lightbox as in:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

With such declaration it would be possible to update options in the select control through the list named 'priorities'. 
To update the 'priorities' list you can use:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)

