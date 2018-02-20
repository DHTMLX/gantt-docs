Standard vs PRO Library Versions
======================================

If you doubt what is the difference between the Standard and PRO versions of the dhtmlxGantt library and want to know what bonuses you will get with the PRO edition, this guide is what you
are looking for.

The PRO edition includes all the functionality of the Standard version and also contains additional useful features. The table below provides the list of features and allows you to compare the two versions of dhtmlxGantt.

<br>

<div id="showData"></div>    
  
<script type="text/javascript">
    var features = [
        {"name":"Flexible gantt layout","url":"desktop__layout_config.html","standard":true,"pro":true},
        {"name":"WBS codes calculation","url":"desktop__specifying_columns.html#showingthewbscodeofatask","standard":true,"pro":true},
        {"name":"Working days and hours for individual tasks", "url":"desktop__working_time.html#multipleworktimecalendars","standard":true,"pro":true},
        {"name":"Material design","url":"desktop__skins.html#materialskin","standard":true,"pro":true},
        {"name":"Creating multiple Gantt charts on one page<br><strong>Enterprise license only</strong>", "url":"desktop__multiple_gantts.html", "standard":false,"pro":true},
    	{"name":"Editable or readonly Gantt chart\n", "url":"desktop__readonly_mode.html","standard":true,"pro":true},
    	{"name":"Auto scheduling\n","url":"desktop__auto_scheduling.html","standard":false,"pro":true},
    	{"name":"Keyboard navigation\n","url":"desktop__keyboard_navigation.html","standard":true,"pro":true},
    	{"name":"Dynamic loading\n","url":"desktop__dynamic_loading.html","standard":false,"pro":true},
    	{"name":"Projects and Milestones task types\n", "url":"desktop__task_types.html","standard":false,"pro":true},
    	{"name":"jQuery integration\n","url":"desktop__jquery_integration.html","standard":true,"pro":true},
    	{"name":"Fullscreen mode\n", "url":"desktop__fullscreen_mode.html", "standard":true,"pro":true},
    	{"name":"Loading from XML, JSON\n","url":"desktop__loading.html", "standard":true,"pro":true},
    	{"name":"Tasks grouping\n", "url":"desktop__grouping.html", "standard":false,"pro":true},
    	{"name":"Support for baselines, deadlines and other custom elements\n","url":"desktop__baselines.html","standard":false,"pro":true},
    	{"name":"Tooltips\n","url":"desktop__tooltips.html", "standard":true,"pro":true},
    	{"name":"Critical path calculation\n","url":"desktop__critical_path.html","standard":false,"pro":true},
    	{"name":"Backward planning\n","url":"desktop__loading.html#loadingtaskdates","standard":true,"pro":true},
    	{"name":"Customizable task edit form (lightbox)\n","url":"desktop__edit_form.html","standard":true,"pro":true},
    	{"name":"Rich drag-and-drop behavior to manage tasks\n","url":"desktop__dnd.html","standard":true,"pro":true},
    	{"name":"Marking specific times in the timeline area\n", "url":"desktop__highlighting_time_slots.html", "standard":true,"pro":true},
    	{"name":"Progress percent coloring for tasks\n","url":"desktop__colouring_tasks.html#specifyingstyleinthepropertiesofthetaskobject","standard":true,"pro":true},
    	{"name":"Support for unscheduled tasks\n","url":"desktop__unscheduled_tasks.html","standard":true,"pro":true},
    	{"name":"Managing editability/readonly modes of individual tasks\n","url":"desktop__readonly_mode.html#readonlymodeforspecifictaskslinks","standard":true,"pro":true},
    	{"name":"Export/import from MS Project\n","url":"desktop__export_msproject.html","standard":true,"pro":true},
    	{"name":"Smart rendering\n","url":"desktop__performance.html#smartrendering","standard":true,"pro":true},
    	{"name":"Undo/redo functionality\n","url":"desktop__undo_redo.html","standard":true,"pro":true},
    	{"name":"Accessibility\n","url":"desktop__accessibility.html", "standard":true,"pro":true},
    	{"name":"Configurable columns in the grid\n","url":"desktop__specifying_columns.html","standard":true,"pro":true},
    	{"name":"Multi-task selection\n","url":"desktop__multiselection.html","standard":true,"pro":true},
    	{"name":"Per-column grid sorting\n","url":"desktop__sorting.html#percolumngridsorting","standard":true,"pro":true},
    	{"name":"Hiding/showing columns of the grid\n","url":"desktop__specifying_columns.html#hidingshowingcolumns","standard":false,"pro":true},
    	{"name":"Resizing grid columns and the grid itself from the UI\n", "url":"desktop__specifying_columns.html#resizingcolumns", "standard":false,"pro":true},
    	{"name":"Sorting columns\n", "url":"desktop__sorting.html", "standard":true,"pro":true},
    	{"name":"Filtering tasks\n", "url":"desktop__filtering.html", "standard":true,"pro":true},
    	{"name":"32 locales\n","url":"desktop__localization.html","standard":true,"pro":true},
    	{"name":"Non-linear time scale (hide days/hours)\n", "url":"desktop__custom_scale.html","standard":false,"pro":true},
    	{"name":"7 different skins\n","url":"desktop__skins.html","standard":true,"pro":true},
    	{"name":"Content Security Policy compliance\n", "url":"desktop__content_security_policy.html", "standard":true,"pro":true},
    	{"name":"Export to Excel and iCal\n","url":"desktop__excel.html","standard":true,"pro":true},
    	{"name":"Export to PDF and PNG\n","url":"desktop__export.html","standard":true,"pro":true},
    	{"name":"Support for custom types of tasks\n","url":"desktop__task_types.html#creatingacustomtype", "standard":false,"pro":true},
    	{"name":"4 types of tasks linking: finish-to-start, start-to-start, finish-to-finish, start-to-finish\n","url":"desktop__loading.html#link_properties","standard":true,"pro":true},
    	{"name":"Customizable time scale\n","url":"desktop__dynamic_scale.html","standard":true,"pro":true},
    	{"name":"Optional tree view\n","url":"desktop__tree_column.html","standard":true,"pro":true},
    	{"name":"Full control with JavaScript API\n","standard":true,"pro":true},
    	{"name":"Support for touch devices: iOS, Android\n","standard":true,"pro":true},
    	{"name":"Cross-browser: IE, FF, Chrome, Safari, Opera\n","standard":true,"pro":true}	
	]
  
    var col = ["Feature","Standard","PRO"];
   
    var table = document.createElement("table");

    var tr = table.insertRow(-1);                   

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

   	features.sort(function(a, b){ return a.name > b.name ? 1 : -1});

    for (var i = 0; i < features.length; i++) {

        tr = table.insertRow(-1);

        var tabCell = tr.insertCell(-1);
		var html = features[i].url ? ("<a href='" + features[i].url+ "'>" + features[i].name + "</a>") : features[i].name
		tabCell.innerHTML =html;

        var yes = "<span style='color: #04bd04;font-size: 15px;'>&#10004;</span>";
		var no = "<span style='color: #f58484;font-size: 15px;'>&#10006;</span>"

		var tabCell = tr.insertCell(-1);
		tabCell.style.textAlign = "center";
		tabCell.innerHTML = features[i].standard ? yes : no;

		var tabCell = tr.insertCell(-1);
		tabCell.style.textAlign = "center";
		tabCell.innerHTML = features[i].pro ? yes : no;

    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

</script>
