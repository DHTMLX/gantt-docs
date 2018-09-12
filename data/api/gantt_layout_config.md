layout
=============

@short:
	specifies the layout object

@type: object
@example:
gantt.config.layout = {
 	css: "gantt_container",
 	rows:[
  	  {
   		cols: [
    	  {view: "grid", id: "grid", scrollX:"scrollHor", scrollY:"scrollVer"},
    	  {resizer: true, width: 1},
          {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
    	  {view: "scrollbar", scroll: "y", id:"scrollVer"}
   		]
  	   },
  	  {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
 	]
};

gantt.init("gantt_here");

@template:	api_config
@descr:
{{note Note that you should specify the configuration of layout before Gantt initialization. If you make changes in the layout, you need to reinitialize Gantt.}}

@related:
desktop/layout_config.md