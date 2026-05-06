---
sidebar_label: buttons_right
title: buttons_right конфигурация
description: "хранит коллекцию кнопок, размещённых в правом нижнем углу lightbox"
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

**Значение по умолчанию:** ["gantt_delete_btn"]

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note
Обратите внимание, что если вы используете [Material skin](guides/skins.md#materialskin), это приведёт к переопределению конфигурации кнопок.
Чтобы предотвратить это, необходимо задать конфигурацию кнопок внутри обработчика события [onGanttReady](api/event/onganttready.md).
:::

![property_buttons_left](/img/property_buttons_left.png)

Вы можете переопределить подписи правой кнопки, используя следующий синтаксис перед инициализацией Gantt:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Вы также можете изменить подпись, используя другой синтаксис после инициализации Gantt, следующим образом:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

С версии 7.0 подписи также можно менять с использованием объекта [i18n](api/other/i18n.md):

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