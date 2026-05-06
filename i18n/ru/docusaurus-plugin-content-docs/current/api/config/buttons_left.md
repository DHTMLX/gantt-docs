--- 
sidebar_label: buttons_left
title: buttons_left config
description: "Хранит коллекцию кнопок, размещённых в левом нижнем углу lightbox"
---

# buttons_left

### Description

@short: Хранит коллекцию кнопок, размещённых в левом нижнем углу lightbox

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

**Default value:** ["gantt_save_btn", "gantt_cancel_btn"]

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note
Обратите внимание, что если вы используете [Material skin](guides/skins.md#materialskin), она переопределит конфигурацию кнопок. 
Чтобы этого избежать, вам нужно задать конфигурацию кнопок внутри обработчика события [onGanttReady](api/event/onganttready.md).
:::

![property_buttons_left](/img/property_buttons_left.png)

Вы можете переопределить подписи левых кнопок, используя следующий синтаксис до инициализации Gantt:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";

gantt.init("gantt_here");
~~~ 

Вы также можете изменить подписи, используя другой синтаксис после инициализации Gantt, как ниже:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
});
~~~

С версии 7.0 изменение меток можно также выполнить через объект [i18n](api/other/i18n.md):

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
- [Changing Buttons in the Lightbox](guides/custom-button.md)