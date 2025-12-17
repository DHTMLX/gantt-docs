---
sidebar_label: buttons_left
title: buttons_left config
description: "保存位于 lightbox 左下角的一组按钮"
---

# buttons_left

### Description

@short: 保存位于 lightbox 左下角的一组按钮

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

请注意，使用 [Material skin](guides/skins.md#materialpifu) 会覆盖按钮配置。 
为避免此情况，请在 [onGanttReady](api/event/onganttready.md) 事件处理器内定义按钮配置。
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

左侧按钮的标签可以在初始化 Gantt 之前通过以下语法自定义:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";

gantt.init("gantt_here");
~~~

或者，也可以在 Gantt 初始化之后更新标签，示例如下:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
});
~~~

从版本 7.0 开始，也可以通过 [i18n](api/other/i18n.md) 对象修改标签:

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
- [在 Lightbox 中更改按钮](guides/custom-button.md)

