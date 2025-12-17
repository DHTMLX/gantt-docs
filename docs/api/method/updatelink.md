---
sidebar_label: updateLink
title: updateLink method
description: "updates the specified dependency link"
---

# updateLink

### Description

@short: Updates the specified dependency link

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    the task id

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; //changes link's data
gantt.updateLink(5); //renders the updated link
~~~

### Details

:::note
The method invokes the [onAfterLinkUpdate](api/event/onafterlinkupdate.md) event. 
:::

:::note
The method triggers the [DataProcessor](guides/server-side.md) if the dataProcessor is enabled. 
:::

This method should be called after modifying the link object to update the Gantt's state, repaint related UI elements, and send the changes to the backend.

Calling this method will fire the [onAfterLinkUpdate](api/event/onafterlinkupdate.md) event, which may trigger additional recalculations.

If you're using the [DataProcessor](guides/server-side.md), invoking this method will prompt an **update** request to the server.

For making visual changes that don't require saving, **use the [refreshLink](api/method/refreshlink.md) method instead**. This will repaint the record in the Gantt without any extra calculations or server requests.

~~~js
let selectedLink = null;
gantt.templates.link_class = function(link){
    if(link.id == selectedLink) {
        return "selected_link";
    }
};

gantt.attachEvent("onLinkClick", function(id,e){
    selectedLink = id;
    gantt.refreshLink(id); /*!*/
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)

