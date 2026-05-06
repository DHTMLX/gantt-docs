---
sidebar_label: buttons_right
title: buttons_right config
description: "在 lightbox 的右下角存储一组按钮"
---

# buttons_right

### Description

@short: 在 lightbox 的右下角驻留的一组按钮集合

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
**默认值:** ["gantt_delete_btn"]

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note
请注意，如果您使用 [Material skin](guides/skins.md#materialskin)，它将重新定义按钮配置。 
要防止这种情况，您需要在 [onGanttReady](api/event/onganttready.md) 事件处理程序中指定按钮的配置。
:::

![property_buttons_left](/img/property_buttons_left.png)

你可以在初始化 Gantt 之前，用以下语法更新右侧按钮的标签:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

或者，你也可以在 Gantt 初始化后这样修改标签:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

从版本 7.0 开始，也可以通过 [i18n](api/other/i18n.md) 对象来更改标签:

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
- [在 Lightbox 中更改按钮](guides/custom-button.md)

