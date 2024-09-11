Zoom Extension
==============


You can read details about the Zoom extension in the desktop/zooming.md article. The current article provides the API reference of the **zoom** object:



## Zoom Levels

The Zoom extension uses a set of the scale settings and allows quickly switching between them.

**ZoomLevel** is an object that contains the scale settings. It has the following properties:

- <span class=subproperty>**name**</span> - (*string*) - the name of the level
- <span class=subproperty>**scale_height?**</span> - (*number*) - the height of the scale
- <span class=subproperty>**height?**</span> - (*number*) - the height of the scale
- <span class=subproperty>**min_column_width?**</span> - (*number*) - the minimal width of a column. It has a higher priority than minColumnWidth and maxColumnWidth
- <span class=subproperty>**scales**</span> - (*Scales*) - an array of scales to switch between while zooming in/out on this level



## Methods

- <span class=submethod>**init (zoomConfig): void**</span> - initializes the extension with the provided configuration.
    - **_zoomConfig_** - (*object*) - an object with configuration settings that contains the *levels* array of zooming levels and a number of additional properties:
        - **_levels_** - (*ZoomLevel[]*) - required, an array of zooming levels
        - **_handler?_** - (*Function*): void - allows specifying a custom handler of the mouse wheel to work with zooming manually
            - **_e_** - (*Event*) - a native event object.
        - **_startDate?_** - (*Date*) - the start value of the time scale zooming
        - **_endDate?_** - (*Date*) - the end value of the time scale zooming
        - **_activeLevelIndex?_** - (*number*) - the number of the default active level
        - **_widthStep?_** - (*number*) - the step of increasing/decreasing the width of scale while switching to the next/previous zooming level
        - **_minColumnWidth?_** - (*number*) - the minimal width of a column that allows switching to the previous zooming level
        - **_maxColumnWidth?_** - (*number*) - the maximal width of a column that allows switching to the next zooming level
        - **_useKey?_** - (*string*) - the key that enables zooming by scrolling the mouse wheel:"ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - the trigger of zooming: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - a DOM element over which zooming is triggered or a function that returns a DOM element

These are two examples of setting the **zoom** configuration:

~~~js
var zoomConfig = {
	levels: [
      {
        name:"day",
        scale_height: 27,
        min_column_width:80,
        scales:[
        	{unit: "day", step: 1, format: "%d %M"}
        ]
      },
      {
         name:"week",
         scale_height: 50,
         min_column_width:50,
         scales:[
          {unit: "week", step: 1, format: function (date) {
           var dateToStr = gantt.date.date_to_str("%d %M");
           var endDate = gantt.date.add(date, 6, "day");
           var weekNum = gantt.date.date_to_str("%W")(date);
           return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
           }},
           {unit: "day", step: 1, format: "%j %D"}
         ]
       },
       {
         name:"month",
         scale_height: 50,
         min_column_width:120,
         scales:[
         	{unit: "month", format: "%F, %Y"},
         	{unit: "week", format: "Week #%W"}
         ]
        },
        {
         name:"quarter",
         height: 50,
         min_column_width:90,
         scales:[
          {unit: "month", step: 1, format: "%M"},
          {
           unit: "quarter", step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str("%M");
            var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
           }
         }
  	    ]},
        {
          name:"year",
          scale_height: 50,
          min_column_width: 30,
          scales:[
          	{unit: "year", step: 1, format: "%Y"}
        ]}
    ]
};

gantt.ext.zoom.init(zoomConfig);


// or, in a more simple way levels can be presented as scale arrays
var hourToStr = gantt.date.date_to_str("%H:%i");
var hourRangeFormat = function(step){
	return function(date){
    	var intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1)
        return hourToStr(date) + " - " + hourToStr(intervalEnd);
    };
};
var zoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1},
        ],
        [
            { unit: "month", format: "%M %Y", step: 1},
            { unit: "day", format: "%d %M", step: 1}
        ],
        [
            { unit: "day", format: "%d %M", step: 1},
            { unit: "hour", format: hourRangeFormat(12), step: 12}
        ],
        [
            {unit: "day", format: "%d %M",step: 1},
            {unit: "hour",format: hourRangeFormat(6),step: 6}
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1}
        ]
    ]
}

gantt.ext.zoom.init(zoomConfig);
~~~

- <span class=submethod>**getCurrentLevel (): number**</span> - returns the number (index) of the current zooming level

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class=submethod>**setLevel (level): void**</span> - switches to the specified zooming level.
	- **_level_** - (*number | string*) - The level is defined either by a string (the name of the level from the config, e.g. "year"), or by its number in the array of levels

~~~js
gantt.ext.zoom.setLevel("year");
// or 
gantt.ext.zoom.setLevel(5);
~~~

- <span class=submethod>**getLevels (): void**</span> - allows getting all zooming levels

~~~js
gantt.ext.zoom.getLevels();
~~~

Returns an array of zooming levels (*ZoomLevels[]*) passed to the **init()** method that initializes the extension.

- <span class=submethod>**zoomIn (): void**</span> - increases the current zooming level

~~~js
gantt.ext.zoom.zoomIn();
~~~

For the same purpose you can also use:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class=submethod>**zoomOut (): void**</span> - decreases the current zooming level

~~~js
gantt.ext.zoom.zoomOut();
~~~

For the same purpose you can also use:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class=submethod>**attachEvent (name, handler): string**</span> - attaches an event handler
    - **_name_** - (*string*) - the name of the event handler
    - **_handler_** - (*Function*) - the function that will be called when the event fires

- <span class=submethod>**detachEvent (id): void**</span> - detaches a handler from an event
    - **_id_** - (*string*) - the id of the attached event handler

- <span class=submethod>**callEvent (name, params): boolean**</span> - calls an inner event
    - **_name_** - (*string*) - the event's name, case-insensitive
    - **_params_** - (*Array&lt;any&gt;*) - optional, an array of the event-related data

- <span class=submethod>**checkEvent (name): boolean**</span> - checks whether an event has some handler(s) specified
    - **_name_** - (*string*) - the event's name

Returns <i>true</i>, if some handler is specified for the event.

## Events

- **<span class=eventname>onAfterZoom</span>** -  fires during switching of the zooming level.
The arguments are: 
<span class=eventarguments>
    - **_level_** - (*number | string*) - the number of the level
    - **_config_** - (*ZoomLevel*) - the config of the level
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~


