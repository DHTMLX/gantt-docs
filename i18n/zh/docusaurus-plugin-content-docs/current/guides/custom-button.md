---
title: "在 Lightbox 中更改按钮"
sidebar_label: "在 Lightbox 中更改按钮"
---

在 Lightbox 中更改按钮
============================================

您可以自定义 Lightbox 中的默认按钮。例如，可以为只需查看任务的用户隐藏"Edit"按钮，或添加一个新的"Print"按钮以允许打印任务描述。

![complete_button](/img/complete_button.png)


[Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


默认情况下，Lightbox 包含 3 个按钮（"Save"、"Cancel"、"Delete"），它们通过 [buttons_left](api/config/buttons_left.md) 和 [buttons_right](api/config/buttons_right.md) 中的配置选项定义。

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

要修改默认按钮，请按照以下步骤操作:

- 使用所需的按钮标识符更新 <b>buttons_left</b> 或 <b>buttons_right</b> 数组。

:::note
请注意，如果您正在使用 [Material skin](guides/skins.md#materialpifu)，它会覆盖按钮配置。
为避免此情况，请在 [onGanttReady](api/event/onganttready.md) 事件处理器内设置按钮配置:
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- 为新按钮定义标签:

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- 若要为按钮分配图标或应用其他样式，请添加如下 CSS 类:

~~~css
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- 实现 [onLightboxButton](api/event/onlightboxbutton.md) 事件处理器，以处理按钮点击:

~~~js
gantt.attachEvent("onLightboxButton", function(button_id, node, e){
    if(button_id == "complete_button"){
        var id = gantt.getState().lightbox;
        gantt.getTask(id).progress = 1;
        gantt.updateTask(id);
        gantt.hideLightbox();
    }
});
~~~


[Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


更改按钮标签
-----------------------

可以在初始化 Gantt 之前重新定义按钮标签，语法如下:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

或者，也可以在 Gantt 初始化后更新标签，如下所示:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

从 7.0 版本开始，也可以使用 [i18n](api/other/i18n.md) 对象更改标签:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~

