---
title: "Изменение кнопок в Lightbox"
sidebar_label: "Изменение кнопок в Lightbox"
---

# Изменение кнопок в Lightbox

Вы можете настраивать стандартные кнопки в lightbox. Например, кнопку 'Edit' можно скрыть для пользователей, которым требуется только просмотр задач, или добавить новую кнопку "Print" для печати описания задачи.

![complete_button](/img/complete_button.png)


[Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


По умолчанию в lightbox присутствует 3 кнопки ('Save', 'Cancel', 'Delete'), которые задаются с помощью параметров конфигурации, описанных в [buttons_left](api/config/buttons_left.md) и [buttons_right](api/config/buttons_right.md).

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

Чтобы изменить стандартные кнопки, выполните следующие действия:

- Обновите массивы <b>buttons_left</b> или <b>buttons_right</b>, добавив в них нужные идентификаторы кнопок.

:::note
Обратите внимание, что если вы используете [Material skin](guides/skins.md#materialskin), он переопределяет конфигурацию кнопок.
Чтобы этого избежать, задайте конфигурацию кнопок внутри обработчика события [onGanttReady](api/event/onganttready.md):
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- Задайте подпись для новой кнопки:

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- Чтобы добавить иконку или применить дополнительное оформление к кнопке, добавьте CSS-класс следующим образом:

~~~css
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- Реализуйте обработчик события [onLightboxButton](api/event/onlightboxbutton.md) для обработки нажатия на кнопку:

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


## Изменение подписей кнопок


Подписи кнопок можно переопределить до инициализации Gantt следующим образом:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Также подписи можно изменить после инициализации Gantt, например:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

Начиная с версии 7.0, подписи также можно изменить с помощью объекта [i18n](api/other/i18n.md):

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~

