---
sidebar_label: buttons_left
title: buttons_left config
description: "Enthält eine Reihe von Buttons, die sich in der unteren linken Ecke des Lightbox befinden"
---

# buttons_left

### Description

@short: Enthält eine Reihe von Buttons, die sich in der unteren linken Ecke des Lightbox befinden

@signature: buttons_left: string[]

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
          gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn",        /*!*/      
            "complete_button"];                                                /*!*/ 
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

**Default value:** ["gantt_save_btn", "gantt_cancel_btn"]

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note

Beachte, dass die Verwendung des [Material skin](guides/skins.md#materialskin) die Button-Konfiguration überschreibt. 
Um dies zu vermeiden, definiere die Button-Konfiguration innerhalb des [onGanttReady](api/event/onganttready.md) Event-Handlers.
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

Die Beschriftungen der linken Buttons können vor der Initialisierung von Gantt mit folgender Syntax angepasst werden:

~~~js
gantt.locale.labels.icon_save = "Neue Beschriftung";
gantt.locale.labels.icon_cancel = "Neue Beschriftung";

gantt.init("gantt_here");
~~~

Alternativ können die Beschriftungen auch nach der Initialisierung von Gantt wie folgt aktualisiert werden:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "Neue Beschriftung";
  gantt.locale.labels.gantt_cancel_btn = "Neue Beschriftung";
});
~~~

Ab Version 7.0 können die Beschriftungen auch über das [i18n](api/other/i18n.md) Objekt geändert werden:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "Neue Beschriftung",
      gantt_cancel_btn: "Neue Beschriftung"
   }
});
~~~

### Related API
- [buttons_right](api/config/buttons_right.md)
- [locale](api/other/locale.md)
- [i18n](api/other/i18n.md)

### Related Guides
- ["Ändern der Schaltflächen im Lightbox"](guides/custom-button.md)

