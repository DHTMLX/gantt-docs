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

@template:	api_config
@descr:


@related:
desktop/layout_config.md