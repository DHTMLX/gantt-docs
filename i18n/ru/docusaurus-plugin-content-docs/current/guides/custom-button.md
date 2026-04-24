---
title: "Изменение кнопок в Lightbox"
sidebar_label: "Изменение кнопок в Lightbox"
---

# Изменение кнопок в Lightbox

Существует возможность изменить кнопки по умолчанию в lightbox. Например, можно скрыть кнопку 'Edit' для группы пользователей, которым доступны только просмотр задач, или добавить новую кнопку "Print", которая позволит пользователям распечатывать описание задачи.

![complete_button](/img/complete_button.png)


[Пользовательская кнопка в Lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


По умолчанию lightbox содержит 3 кнопки ('Save', 'Cancel', 'Delete'), которые задаются с помощью конфигурационных опций [buttons_left](api/config/buttons_left.md) и [buttons_right](api/config/buttons_right.md).

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

Чтобы изменить набор кнопок по умолчанию, выполните следующие шаги:

- Укажите новые элементы в массиве <b>buttons_left</b> или <b>buttons_right</b>. 

:::note
Обратите внимание, что если вы используете [Material skin](guides/skins.md#materialskin), он переопределит конфигурацию кнопок. 
Чтобы предотвратить это, укажите конфигурацию кнопок внутри обработчика события [onGanttReady](api/event/onganttready.md): 
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- Укажите подпись кнопки:

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- Чтобы задать иконку для кнопки (и/или применить другое оформление), укажите CSS-класс как в:

~~~js
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- Укажите обработчик [onLightboxButton](api/event/onlightboxbutton.md), который будет обрабатывать клики по кнопке:

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


[Пользовательская кнопка в Lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


## Изменение подписей кнопок

Вы можете переопределить подписи кнопок, используя следующий синтаксис до инициализации Gantt:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Вы можете также изменить подписи, используя другой синтаксис после инициализации Gantt, как показано ниже:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

С версии 7.0 подписи также можно изменить с использованием объекта [i18n](api/other/i18n.md):

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~