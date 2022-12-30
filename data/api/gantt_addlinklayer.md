addLinkLayer
=============

@short:displays an additional layer with custom elements for a link in the timeline area
@edition: pro

@params:
- func		function,object		a render function or a config object 

@returns:
- layerId	string		a DOM element that will be displayed in the layer


@example:
gantt.attachEvent("onGanttReady", function () {
    const link_types = ["FS", "SS", "FF", "SF"]
    gantt.addLinkLayer(function (link) {
        const node = gantt.getLinkNode(link.id);
        if (node){
            const el = document.createElement('div');
            el.className = 'link_layer';
            el.style.left = (node.childNodes[2].offsetLeft + 20) + 'px'
            el.style.top = (node.childNodes[2].offsetTop - 6) + 'px'
            el.innerHTML = link_types[link.type];
            return el;
        }
        return false;
    });
});


@relatedapi:
  api/gantt_removelinklayer.md
  api/gantt_addtasklayer.md

	
@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

- The argument function takes a link's object as a parameter and must return a DOM element that will be displayed in the layer.
- The argument can also be an object. In this case, it can have the following properties:
	- **render** - (*function*)  a function that answers for rendering the layer's elements (mandatory)
	- **container** - (*HTMLElement*) a layer's container (optional)
    - **topmost** - (*boolean*) if true, the element will be displayed over the link (optional)
    - **filter** - (*function*) a function that takes a link object as a parameter. If returns 'false', the 'render' function won't be called for a link (optional)
- Beware, custom layers will be reset after the next call of <a href="api/gantt_init.md">gantt.init</a>
- Calling the [gantt.resetLayout()](api/gantt_resetlayout.md) method will also reset custom layers. In order for custom layers to be displayed on a page, you need to redefine the **gantt.addLinkLayer** method after calling api/gantt_resetlayout.md.

{{editor	https://snippet.dhtmlx.com/6mmt1nvw	Gantt. Additional layer with link types
}}