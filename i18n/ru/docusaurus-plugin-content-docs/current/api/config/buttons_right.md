---
sidebar_label: buttons_right
title: buttons_right config
description: "содержит набор кнопок, расположенных в правом нижнем углу лайтбокса"
---

# buttons_right

### Description

@short: Содержит набор кнопок, расположенных в правом нижнем углу лайтбокса

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

Имейте в виду, что если применяется [Material skin](guides/skins.md#materialskin), он переопределит конфигурацию кнопок. 
Чтобы этого избежать, определяйте конфигурацию кнопок внутри обработчика события [onGanttReady](api/event/onganttready.md).
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

Вы можете обновить подписи кнопок справа, используя следующий синтаксис до инициализации Gantt:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Или же изменить подпись после инициализации Gantt таким образом:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

Начиная с версии 7.0, подписи также можно изменять через объект [i18n](api/other/i18n.md):

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
- [Изменение кнопок в Lightbox](guides/custom-button.md)

