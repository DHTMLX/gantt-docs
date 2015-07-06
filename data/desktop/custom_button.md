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
gantt.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn"];
gantt.config.buttons_right = ["dhx_delete_btn"];
~~~

To change the default sets of buttons, follow the steps below:

<ol>
	<li>Specify new members of the <b>buttons_left</b> or  <b>buttons_right</b> array:
~~~js
gantt.config.buttons_left=["dhx_save_btn","dhx_cancel_btn","complete_button"];
~~~
</li>
	<li>Set the button's label:
~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~
</li>
	<li>To set the icon for the button (and/or apply some other styling), specify the CSS class as in:
~~~js
.complete_button{
	margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~
</li>
	<li>Specify the  api/gantt_onlightboxbutton_event.md handler that will treat clicks on the button:
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
</li>
</ol>

{{sample
	05_lightbox/06_custom_button.html
}}