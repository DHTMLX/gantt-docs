buttons_right
=============
@short: stores a collection of buttons resided in the right bottom corner of the lightbox

@default:["dhx_delete_btn"];

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
	gantt.config.buttons_right=["dhx_delete_btn","complete_button"]; /*!*/
	gantt.locale.labels["complete_button"] = "Complete";
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

<img src="api/property_buttons_left.png"/>