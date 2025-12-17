---
sidebar_label: buttons_right
title: buttons_right config
description: "enthält eine Reihe von Buttons, die sich in der unteren rechten Ecke des Lightbox befinden"
---

# buttons_right

### Description

@short: Enthält eine Reihe von Buttons, die sich in der unteren rechten Ecke des Lightbox befinden

@signature: buttons_right: string[]

### Example

~~~jsx
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

**Default value:** ["gantt_delete_btn"];

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note

Beachten Sie, dass wenn das [Material skin](guides/skins.md#materialskin) angewendet wird, es die Buttons-Konfiguration überschreibt. 
Um dies zu vermeiden, definieren Sie die Buttons-Konfiguration innerhalb des [onGanttReady](api/event/onganttready.md) Event-Handlers.
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

Sie können die Bezeichnungen der Buttons auf der rechten Seite vor der Initialisierung von Gantt mit dieser Syntax ändern:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Alternativ können Sie die Bezeichnung auch nach der Initialisierung von Gantt wie folgt anpassen:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

Ab Version 7.0 können Labels auch über das [i18n](api/other/i18n.md) Objekt geändert werden:

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
- ["Ändern der Schaltflächen im Lightbox"](guides/custom-button.md)

