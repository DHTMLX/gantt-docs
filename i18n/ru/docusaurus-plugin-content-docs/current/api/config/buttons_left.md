---
sidebar_label: buttons_left
title: buttons_left config
description: "содержит набор кнопок, расположенных в левом нижнем углу лайтбокса"
---

# buttons_left

### Description

@short: Содержит набор кнопок, расположенных в левом нижнем углу лайтбокса

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

Имейте в виду, что использование [Material skin](guides/skins.md#materialskin) переопределит конфигурацию кнопок. 
Чтобы избежать этого, определяйте конфигурацию кнопок внутри обработчика события [onGanttReady](api/event/onganttready.md).
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

Подписи (labels) левых кнопок можно настроить до инициализации Gantt с помощью следующего синтаксиса:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";

gantt.init("gantt_here");
~~~

Или же подписи можно изменить после инициализации Gantt, например так:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
});
~~~

Начиная с версии 7.0, подписи также можно изменить через объект [i18n](api/other/i18n.md):

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
- [Изменение кнопок в Lightbox](guides/custom-button.md)

