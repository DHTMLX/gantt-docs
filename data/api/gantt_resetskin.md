resetSkin
=============
@short:re-calculates the skin's settings from the related attached skin CSS file
	

@params:





@example:
function changeSkin(name){
	var file = name != "terrace" ? ('_' + name) : "";
	var link = document.createElement("link");
	link.onload = function(){
		gantt.resetSkin();   /*!*/
	};

	link.rel="stylesheet";
	link.type="text/css";
	link.id = "skin";
	link.href = "../../codebase/dhtmlxgantt"+file+".css";
	document.head.replaceChild(link, document.querySelector("#skin"));
}

changeSkin('meadow');

@relatedsample:
	06_skins/06_dynamic_skin.html
@template:	api_method
@descr:

{{note
Used only if you change the skin dynamically
}}