---
title: "Ändern der Schaltflächen im Lightbox"
sidebar_label: "Ändern der Schaltflächen im Lightbox"
---

Ändern der Schaltflächen im Lightbox
============================================
Es ist möglich, die Standardschaltflächen im Lightbox anzupassen. Zum Beispiel kann die 'Edit'-Schaltfläche für Benutzer, die Aufgaben nur ansehen dürfen, ausgeblendet werden, oder eine neue "Drucken"-Schaltfläche kann hinzugefügt werden, um die Aufgabenbeschreibung zu drucken.

![complete_button](/img/complete_button.png)


[Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


Standardmäßig enthält das Lightbox drei Schaltflächen ('Save', 'Cancel', 'Delete'), die durch die Konfigurationsoptionen in [buttons_left](api/config/buttons_left.md) und [buttons_right](api/config/buttons_right.md) definiert sind.

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

Um die Standardschaltflächen zu ändern, gehen Sie wie folgt vor:

- Aktualisieren Sie die Arrays <b>buttons_left</b> oder <b>buttons_right</b> mit den gewünschten Schaltflächen-IDs.

:::note
Beachten Sie, dass die [Material Skin](guides/skins.md#materialskin) die Schaltflächenkonfiguration überschreibt.
Um dies zu vermeiden, legen Sie die Schaltflächenkonfiguration innerhalb des [onGanttReady](api/event/onganttready.md) Event-Handlers fest:
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- Definieren Sie die Beschriftung für die neue Schaltfläche:

~~~js
gantt.locale.labels["complete_button"] = "Fertigstellen";
~~~

- Um der Schaltfläche ein Icon zuzuweisen oder ein anderes Styling anzuwenden, fügen Sie eine CSS-Klasse wie folgt hinzu:

~~~css
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- Implementieren Sie den [onLightboxButton](api/event/onlightboxbutton.md) Event-Handler, um Klicks auf die Schaltfläche zu behandeln:

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


Schaltflächenbeschriftungen ändern
-----------------------

Die Beschriftungen der Schaltflächen können vor der Initialisierung von Gantt mit folgender Syntax geändert werden:

~~~js
gantt.locale.labels.icon_save = "Neue Beschriftung";
gantt.locale.labels.icon_cancel = "Neue Beschriftung";
gantt.locale.labels.icon_delete= "Neue Beschriftung";

gantt.init("gantt_here");
~~~

Alternativ können die Beschriftungen auch nach der Initialisierung von Gantt wie folgt aktualisiert werden:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "Neue Beschriftung";
  gantt.locale.labels.gantt_cancel_btn = "Neue Beschriftung";
  gantt.locale.labels.gantt_delete_btn = "Neue Beschriftung";
});
~~~

Ab Version 7.0 können die Beschriftungen auch über das [i18n](api/other/i18n.md) Objekt geändert werden:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "Neue Beschriftung",
      gantt_cancel_btn: "Neue Beschriftung",
      gantt_delete_btn: "Neue Beschriftung"
   }
});
~~~

