---
sidebar_label: buttons_right
title: buttons_right config
description: "stores a collection of buttons resided in the right bottom corner of the lightbox"
---

# buttons_right

### Description

@short: Stores a collection of buttons resided in the right bottom corner of the lightbox

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
Please note that if you use the [Material skin](guides/skins.md#materialskin), it will redefine the buttons configuration. 
To prevent this, you need to specify the configuration of buttons inside the [onGanttReady](api/event/onganttready.md) event handler.
:::

![property_buttons_left](/img/property_buttons_left.png)

You can redefine labels of the right button by using the following syntax before initialization of Gantt:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

You can also change the label using another syntax after initialization of Gantt, as follows:

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

