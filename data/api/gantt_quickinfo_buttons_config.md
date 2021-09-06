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

gantt.$click.buttons.advanced_details_button=function(id){
    alert("These are advanced details");
    return false; //blocks the default behavior
};

@template:	api_config
@descr:

{{note This option is defined in the **Quick Info** extension, so you need to activate the [quick_info](desktop/extensions_list.md#quickinfo) plugin.}}





@related:
desktop/extensions_list.md#quickinfo

@relatedsample:
02_extensions/01_quickinfo.html

@relatedapi:
api/gantt_showquickinfo.md
api/gantt_hidequickinfo.md
api/gantt_quick_info_detached_config.md
api/gantt_onquickinfo_event.md
api/gantt_onafterquickinfo_event.md

