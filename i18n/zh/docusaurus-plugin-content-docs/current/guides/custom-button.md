---
title: "Lightbox 中的按钮更改"
sidebar_label: "Lightbox 中的按钮更改"
---

# Lightbox 中的按钮更改

有一种在 lightbox 中更改默认按钮的可能性。例如，可以对只查看任务的用户组隐藏“Edit”按钮，或者添加一个新的按钮 "Print"，让用户能够打印任务描述。

![complete_button](/img/complete_button.png)

[Lightbox 中的自定义按钮](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

默认情况下，lightbox 包含 3 个按钮（'Save', 'Cancel', 'Delete'），这些按钮由 [buttons_left](api/config/buttons_left.md) 与 [buttons_right](api/config/buttons_right.md) 配置选项指定。

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

要更改默认按钮集，请按下列步骤操作：

- 指定 <b>buttons_left</b> 或 <b>buttons_right</b> 数组的新成员。

:::note
请注意如果你使用 [Material skin](guides/skins.md#materialskin)，它将重新定义按钮配置。为防止这种情况，请在 [onGanttReady](api/event/onganttready.md) 事件处理程序中指定按钮的配置：
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- 设置按钮的标签：

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- 若要为按钮设置图标（或应用其他样式），请按如下方式指定 CSS 类：

~~~js
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- 指定将处理按钮点击事件的 [onLightboxButton](api/event/onlightboxbutton.md) 处理程序：

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

[Lightbox 中的自定义按钮](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

## 按钮标签修改

您可以在 Gantt 初始化之前使用如下语法重新定义按钮的标签：

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

您也可以在 Gantt 初始化之后使用另一种语法来修改标签，如下所示：

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

自 7.0 版起，标签也可以通过使用 [i18n](api/other/i18n.md) 对象来修改：

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~