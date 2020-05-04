Changing Buttons in the Lightbox
============================================
There is a possibility to change the default buttons in the lightbox. For example, you can hide the 'Edit' button for a group of users that can just view tasks or add a new button "Print" that will allow users
to print the task description. 

<img src="desktop/complete_button.png"/>


{{sample
	05_lightbox/06_custom_button.html
}}


<br>

By default, the lightbox contains 3 buttons ('Save', 'Cancel', 'Delete') that are specified by the api/gantt_buttons_left_config.md and api/gantt_buttons_right_config.md configuration options.

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

To change the default set of buttons, follow the steps below:

- Specify new members of the <b>buttons_left</b> or <b>buttons_right</b> array. 

{{note
Please note that if you use the [Material skin](desktop/skins.md#materialskin), it will redefine the buttons configuration. 
To prevent this, you need to specify the configuration of buttons inside the api/gantt_onganttready_event.md event handler:
}}

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- Set the button's label:

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- To set the icon for the button (and/or apply some other styling), specify the CSS class as in:

~~~js
.complete_button{
	margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- Specify the  api/gantt_onlightboxbutton_event.md handler that will treat clicks on the button:

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


{{sample
	05_lightbox/06_custom_button.html
}}

Changing button labels
-----------------------

You can redefine labels of buttons by using the following syntax before initialization of Gantt:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

You can also change the labels using another syntax after initialization of Gantt, as follows:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

From version 7.0, the labels also can be changed by using the api/gantt_i18n_other.md object:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~