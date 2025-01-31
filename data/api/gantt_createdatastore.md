createDatastore
=============

@short:
	creates a datastore according to the provided configuration

@params:

- config			DatastoreConfig			a configuration object of a datastore

@returns:
- datastore	datastore & treedatastore		the datastore or treedatastore object depending on the type

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

Configuration object properties:

    
- <span class=subproperty>**name**</span> - (*string*) - an arbitrary string name of the datastore. The datastore can be accessed by its name using api/gantt_getdatastore.md.
- <span class=submethod>**initItem? (item): any**</span> - optional, preprocesses items loaded into the datastore. It is a good place to set the default values of the datastore items. The function takes the following parameter:
    - **_item_** - (*any*) - the resource item.
- <span class=subproperty>**type?**</span> - (*string*) - optional, accepts only one fixed value **"treeDatastore"**. If the type:"treeDatastore" is specified, the datastore will support hierarchical data, with the **id** property as a primary key, and **parent** as a link to the parent id. Any other value will produce a flat list datastore.
- <span class=subproperty>**fetchTasks?**</span> - (*boolean*) - optional, enables showing all tasks assigned to a certain resource in the resource view panel. This functionality works both for the resource diagram and resource histogram types of layout.


@relatedapi: api/gantt_datastore_other.md
api/gantt_treedatastore_other.md

@relatedsample:
10_layout/02_resource_panel.html
11_resources/04_resource_usage_diagram.html
11_resources/09_resource_histogram.html

@related:
desktop/layout_config.md
desktop/resource_management.md

