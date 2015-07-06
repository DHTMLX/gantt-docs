quickinfo_buttons
=============
@short:stores a collection of buttons resided in the pop-up task's details form
	
@require: quick_info
@default: ["icon_delete","icon_edit"]
@type: array
@example:
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(e, id, trg){
    alert("These are advanced details"); 
    return false; //blocks the default behavior
};

@template:	api_config
@descr:

