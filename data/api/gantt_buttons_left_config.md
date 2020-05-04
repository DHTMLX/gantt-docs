buttons_left
=============

@short: stores a collection of buttons resided in the left bottom corner of the lightbox

@default:["gantt_save_btn", "gantt_cancel_btn"]

@type: array
@example:
<style>
    .complete_button{
        margin-top: 2px;
        background-image:url("common/v_complete.png");
        width: 20px;
    }
</style>
<script>
	gantt.locale.labels["complete_button"] = "Complete";
	gantt.attachEvent("onGanttReady", function(){							   /*!*/ 
  		gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn", 	   /*!*/ 	 
            "complete_button"]; 							                   /*!*/ 
	});																		   /*!*/ 
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

@related:
	 desktop/custom_button.md
@relatedapi:
	api/gantt_buttons_right_config.md
    api/gantt_locale_other.md
    api/gantt_i18n_other.md
@relatedsample:
	05_lightbox/06_custom_button.html
@template:	api_config
@descr:

{{note
Please note that if you use the [Material skin](desktop/skins.md#materialskin), it will redefine the buttons configuration. 
To prevent this, you need to specify the configuration of buttons inside the api/gantt_onganttready_event.md event handler.
}}

<br>
<img src="api/property_buttons_left.png"/>


You can redefine labels of the left buttons by using the following syntax before initialization of Gantt:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";

gantt.init("gantt_here");
~~~

You can also change the labels using another syntax after initialization of Gantt, as follows:


~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
});
~~~

From version 7.0, the labels also can be changed by using the api/gantt_i18n_other.md object:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label"
   }
});
~~~