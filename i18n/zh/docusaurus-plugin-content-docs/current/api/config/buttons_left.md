---
sidebar_label: buttons_left
title: buttons_left config
description: "在灯箱左下角存放一组按钮"
---

# buttons_left

### Description

@short: 存储在灯箱左下角的按钮集合

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

**默认值：** ["gantt_save_btn", "gantt_cancel_btn"]

### Related samples
- [在灯箱中自定义按钮](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note
请注意，如果你使用 [Material skin](guides/skins.md#materialskin)，它将重新定义按钮的配置。 
为防止这种情况，你需要在 [onGanttReady](api/event/onganttready.md) 事件处理程序中指定按钮的配置。
:::

![property_buttons_left](/img/property_buttons_left.png)

您可以在 Gantt 初始化之前，使用以下语法重新定义左侧按钮的标签：

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
- [在灯箱中更改按钮](guides/custom-button.md)