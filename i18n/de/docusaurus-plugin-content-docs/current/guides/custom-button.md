--- 
title: "Schaltflächen im Lightbox ändern"
sidebar_label: "Schaltflächen im Lightbox ändern"
---

# Schaltflächen im Lightbox ändern

Es besteht die Möglichkeit, die Standard-Buttons im Lightbox zu ändern. Zum Beispiel können Sie den 'Bearbeiten'-Button für eine Gruppe von Benutzern ausblenden, die nur Aufgaben ansehen können, oder einen neuen Button "Drucken" hinzufügen, der es den Benutzern ermöglicht, die Aufgabenbeschreibung zu drucken. 

![complete_button](/img/complete_button.png)

[Benutzerdefinierte Schaltfläche im Lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

Standardmäßig enthält der Lightbox 3 Buttons ('Save', 'Cancel', 'Delete'), die durch die [buttons_left](api/config/buttons_left.md) und [buttons_right](api/config/buttons_right.md) Konfigurationsoptionen festgelegt werden.

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

Um die Standard-Buttons festzulegen, befolgen Sie die folgenden Schritte:

- Geben Sie neue Elemente des <b>buttons_left</b>- oder <b>buttons_right</b>-Arrays an. 

:::note
Beachten Sie, dass bei Verwendung des [Material skin](guides/skins.md#materialskin) die Button-Konfiguration neu definiert wird. Um dies zu verhindern, müssen Sie die Button-Konfiguration innerhalb des [onGanttReady](api/event/onganttready.md) Event-Handlers festlegen:
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- Die Beschriftung des Buttons festlegen:

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- Um das Symbol für den Button festzulegen (und/oder weitere Stilgebungen anzuwenden), geben Sie die CSS-Klasse wie folgt an:

~~~js
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- Geben Sie den [onLightboxButton](api/event/onlightboxbutton.md) Handler an, der Klicks auf den Button behandelt:

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

[Benutzerdefinierte Schaltfläche im Lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


## Schaltflächen-Bezeichnungen ändern

Sie können die Bezeichnungen der Buttons vor der Initialisierung von Gantt mit dem folgenden Syntax neu festlegen:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

Sie können die Bezeichnungen auch nach der Initialisierung von Gantt mit einer anderen Syntax wie folgt ändern:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

Ab Version 7.0 können die Bezeichnungen auch über das [i18n](api/other/i18n.md) Objekt geändert werden:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~