addLinkLayer
=============

@short:displayes an additional layer with custom elements for a link in the timeline area
@edition: pro

@params:
- func	function, object	a render function  or a config object 

@returns:
-layerId	string		a DOM element that will be displayed in the layer


@example:

@relatedapi:
  api/gantt_removelinklayer.md
  api/gantt_addtasklayer.md

	
@template:	api_method
@descr:
- The argument function takes a link's object as a parameter and must return a DOM element that will be displayed in the layer.
- The argument can also be an object. In this case, it can have the following properties:
	- render - (*function*)  a function that answers for rendering the layer's elements (mandatory)
	- container - (*DOM element*) a layer's container (optional)
    - topmost - (*boolean*) if true, the element will display over the link (optional)
    - filter - (*function*) a function that takes a link object as a parameter. If returns 'false'  - the 'render' function won't be called for a link (optional)
- Beware, custom layers will be reset after the next call of <a href="api/gantt_init.md">gantt.init</a>
