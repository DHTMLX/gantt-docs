setSkin
=============

@short:
	sets the active skin

@params:

- skin	string	the name of the skin. The allowed values are: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"


@example:

gantt.setSkin("dark");

@template:	api_method
@descr:

If the method is called after a gantt is initialized, it will trigger the [render](api/gantt_render.md) method. 

If called before initialization, the method will have the same effect as the assignment of the `gantt.skin` property:

~~~js
gantt.skin = "dark";
~~~

@related:
	desktop/skins.md
@relatedsample:
	06_skins/10_dark.html

@changelog:
added in v9.0
