plugins
=============

@short: activates the specified extensions
	

@params:
- ext	object		an object with the extensions' names that need to be activated



@example:
gantt.plugins({
	quick_info: true,
    keyboard_navigation: true,
	undo: true
});

@template:	api_method
@descr:

@related: desktop/extensions_list.md


@changelog: 

- The **export_api** plugin was included into the list of plugins in v8.0. To activate export service in earlier versions, you need to include the **https://export.dhtmlx.com/gantt/api.js** file on your page. Check the [Migration](migrating.md#7180) article.
- Added in v7.0
