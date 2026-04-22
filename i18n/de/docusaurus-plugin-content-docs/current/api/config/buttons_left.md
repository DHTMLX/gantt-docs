---
sidebar_label: buttons_left
title: buttons_left Konfiguration
description: "Speichert eine Sammlung von Buttons, die sich in der linken unteren Ecke des Lightboxes befinden"
---

# buttons_left

### Description

@short: Speichert eine Sammlung von Buttons, die sich in der linken unteren Ecke des Lightboxes befinden

@signature: buttons_left: string[]

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

**Standardwert:** ["gantt_save_btn", "gantt_cancel_btn"]

### Related samples
- [Benutzerdefinierter Button im Lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note
Bitte beachten Sie, dass bei Verwendung des [Material skin](guides/skins.md#materialskin) die Buttons-Konfiguration neu definiert wird. 
Um dies zu verhindern, müssen Sie die Konfiguration der Buttons im Event-Handler [onGanttReady](api/event/onganttready.md) festlegen.
:::

![property_buttons_left](/img/property_buttons_left.png)

Sie können die Beschriftungen der linken Buttons vor der Initialisierung von Gantt neu definieren, indem Sie folgendes verwenden:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";

gantt.init("gantt_here");
~~~

Sie können die Beschriftungen auch nach der Initialisierung von Gantt mit einer anderen Syntax ändern, wie folgt:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
});
~~~

Ab Version 7.0 können die Labels auch über das [i18n](api/other/i18n.md) Objekt geändert werden:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label"
   }
});
~~~

### Related API
- [buttons_right](api/config/buttons_right.md)
- [locale](api/other/locale.md)
- [i18n](api/other/i18n.md)

### Related Guides
- [Schaltflächen im Lightbox ändern](guides/custom-button.md)