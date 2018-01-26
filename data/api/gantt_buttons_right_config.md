buttons_right
=============

@short: stores a collection of buttons resided in the right bottom corner of the lightbox

@default:["gantt_delete_btn"];

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
        gantt.config.buttons_right = ["gantt_delete_btn","complete_button"];   /*!*/                              
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
	api/gantt_buttons_left_config.md
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