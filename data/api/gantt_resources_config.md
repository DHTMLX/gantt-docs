resources
=============

@short:
	defines an extra configuration for the resource store

@type: object

@edition: pro

@example:
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
    editable_resource_diagram: true,
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
    lightbox_resources: function selectResourceControlOptions(resources){
        const lightboxOptions = [];
        resources.forEach(function(res) {
            if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
            }
        });
        return lightboxOptions;
    }
};

@template:	api_config
@descr:

The **resources** property presents an object with a set of attributes:

- **dataprocessor_assignments** - (*boolean*) defines whether modified resource assignments can be sent to the DataProcessor as separate entries with persistent IDs
- **dataprocessor_resources** - (*boolean*) defines whether modified resource objects can be sent to the DataProcessor as separate entries with persistent IDs
- **editable_resource_diagram** - (*boolean*) defines whether resource assignments will be editable in the resource diagram
- **resource_store** - (*object*) creates the default resource datastore. The object includes the following properties:
    - **initItem** - (*function*) optional, preprocesses items loaded into the datastore. It is a good place to set the default values of the datastore items.
    - **type** - (*string*) optional, accepts only one fixed value **"treeDatastore"**. If the type:"treeDatastore" is specified, the datastore will support hierarchical data, with the **id** property as a primary key, and **parent** as a link to the parent id. Any other value will produce a flat list datastore.
    - **fetchTasks** - (*boolean*) enables showing all tasks assigned to a certain resource in the resource view panel. This functionality works both for the resource diagram and resource histogram types of layout.
- **lightbox_resources** - (*function*) a function which takes all resources as an argument and must return an array of resources that should be available in the resource control of the lightbox. By default, the control will be populated with resources that don't have sub-resources. 


@relatedsample:
11_resources/13_resource_assignments_for_days.html

@related:
desktop/resource_management.md

@changelog: added in v8.0

