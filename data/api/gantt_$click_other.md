$click
=============
@short: redefines the default click behavior for buttons of the Gantt chart
	

@type:object
@example:
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    alert("These are advanced details"); 
    return false; //blocks the default behavior
};

@template:	api_config
@descr:

The $click object of the default Gantt chart is:

~~~js
{
	buttons: {
    	delete: function (id){...},
		edit: function (id){...},
    }
}
~~~
