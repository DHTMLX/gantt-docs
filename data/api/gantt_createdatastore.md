createDatastore
=============

@short:
	creates a datastore according to the provided configuration

@params:

- config			object			a configuration object of a datastore



@example:
var resourcesStore = gantt.createDatastore({
	name:"resource",
	initItem: function(item){
		item.id = item.key || gantt.uid();
		return item;
	}
});




@template:	api_method
@descr:

@relatedsample:
10_layout/02_resource_panel.html