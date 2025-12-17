---
sidebar_label: buttons_right
title: buttons_right config
description: "保存位于 lightbox 右下角的一组按钮"
---

# buttons_right

### Description

@short: 保存位于 lightbox 右下角的一组按钮

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
    gantt.locale.labels["complete_button"] = "完成";
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

请注意，如果应用了[Material skin](guides/skins.md#materialpifu)，它将覆盖按钮配置。 
为了避免这种情况，请在 [onGanttReady](api/event/onganttready.md) 事件处理器内定义按钮配置。
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

你可以在初始化 Gantt 之前，用以下语法更新右侧按钮的标签:

~~~js
gantt.locale.labels.icon_delete= "新标签";

gantt.init("gantt_here");
~~~

或者，你也可以在 Gantt 初始化后这样修改标签:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "新标签";
});
~~~

从版本 7.0 开始，也可以通过 [i18n](api/other/i18n.md) 对象来更改标签:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_delete_btn: "新标签"
   }
});
~~~

### Related API
- [buttons_left](api/config/buttons_left.md)
- [locale](api/other/locale.md)
- [i18n](api/other/i18n.md)

### Related Guides
- [在 Lightbox 中更改按钮](guides/custom-button.md)

