---
sidebar_label: buttons_right
title: buttons_right Konfiguration
description: "Speichert eine Sammlung von Buttons, die sich in der rechten unteren Ecke des Lightbox-Fensters befinden"
---

# buttons_right

### Description

@short: Speichert eine Sammlung von Buttons, die sich in der rechten unteren Ecke des Lightbox-Fensters befinden

@signature: buttons_right: string[]

### Example

~~~html
<style>
    .complete_button{
        margin-top: 2px;
        background-image:url("common/v_complete.png");
        width: 20px;
    }
</style>
<script>
    gantt.locale.labels["complete_button"] = "Complete";
    gantt.attachEvent("onGanttReady", function(){                               /*!*/ 
        gantt.config.buttons_right = ["gantt_delete_btn","complete_button"];   /*!*/
    });                                                                           /*!*/ 
    gantt.init("gantt_here");

    gantt.attachEvent("onLightboxButton", function(button_id, node, e){
        if(button_id == "complete_button"){
            var id = gantt.getState().lightbox;
            gantt.getTask(id).progress = 1;
            gantt.updateTask(id);
            gantt.hideLightbox();
        }
    });
</script>
~~~

**Default value:** ["gantt_delete_btn"]

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note
Bitte beachten Sie, dass bei Verwendung des [Material skin](guides/skins.md#materialskin) die Buttons-Konfiguration neu definiert wird. 
Um dies zu verhindern, müssen Sie die Konfiguration der Buttons im Ereignishandler [onGanttReady](api/event/onganttready.md) festlegen.
::: 

![property_buttons_left](/img/property_buttons_left.png)

You can redefine labels of the right button by using the following syntax before initialization of Gantt:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Sie können auch den Bezeichner nach der Initialisierung von Gantt mit einer anderen Syntax ändern, wie folgt:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

From version 7.0, the labels also can be changed by using the [i18n](api/other/i18n.md) object:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_delete_btn: "New Label"
   }
});
~~~

### Related API
- [buttons_left](api/config/buttons_left.md)
- [locale](api/other/locale.md)
- [i18n](api/other/i18n.md)

### Related Guides
- [Changing Buttons in the Lightbox](guides/custom-button.md)