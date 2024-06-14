addLinkLayer
=============

@short:displays an additional layer with custom elements for a link in the timeline area
@edition: pro

@params:
- func		LinkLayerRender | LinkLayerConfig		a render function or a config object 

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

The argument can have these types:

- <span class=submethod>**linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void**</span>- a function takes a link's object as a parameter and must return a DOM element that will be displayed in the layer.
    - **_link_** - (*Link*) - the link object
    - **_timeline?_** - (*any*) - optional, the timeline view
    - **_config?_** - (*GanttConfigOptions*) - optional, the Gantt configuration object
    - **_viewport?_** - (*LayerViewport*) - optional, the viewport object


- <span class=subproperty>**linkLayerConfig**</span> - (*object*) - the configuration object for the additional link layer. Has the following properties:
    - **_id?_** - (*string | number*) - optional, the layer ID
    - **_renderer_** - (*object*) - mandatory, a function that answers for rendering the layer's elements
        - **_render_** - (*LinkLayerRender*) - the function that returns HTML element that should be rendered
        - **_update?_** - (*Function*): void - optional, a function where you can update the rendered HTML elements
            - **_link_** - (*Link*) - the link object
            - **_node_** - (*HTMLElement*) - the container of the rendered node
            - **_timeline?_** - (*any*) - optional, the timeline view
            - **_config?_** - (*GanttConfigOptions*) - optional, the Gantt configuration object
            - **_viewport?_** - (*LayerViewport*) - optional, the viewport object
        - **_onrender?_** - (*Function*): void - optional, this function is called after rendering is complete. You can use it to render native components (for example, using the `ReactDOM.render` method)
            - **_link_** - (*Link*) - the link object
            - **_node_** - (*HTMLElement*) - the container of the rendered node
            - **_view?_** - (*any*) - optional, the layout cell where the layer is added (timeline, by default)
        - **_getRectangle?_** - (*Function*): { left: number, top: number, height: number, width: number } | void - optional, a function that returns the coordinates of the viewport rectangle
            - **_link_** - (*Link*) - the link object
            - **_view?_** - (*any*) - optional, the layout cell where the layer is added (timeline, by default)
            - **_config?_** - (*GanttConfigOptions*) - optional, the Gantt configuration object
            - **_gantt?_** - (*GanttStatic*) - optional, the Gantt object
        - **_getVisibleRange_** - (*Function*): {start: number, end: number} | undefined | void - a function that returns the object with of the visible range
            - **_gantt?_** - (*GanttStatic*) - optional, the Gantt object
            - **_view?_** - (*any*) - optional, the layout cell where the layer is added (timeline, by default)
            - **_config?_** - (*GanttConfigOptions*) - optional, the Gantt configuration object
            - **_datastore?_** - (*any*) - optional, the link datastore object
            - **_viewport?_** - (*LayerViewport*) - optional, the viewport object
    - **_container?_** - (*HTMLElement*) - optional, the layer's container
    - **_topmost?_** - (*boolean*) - optional, if true, the element will be displayed over the link
    - **_filter?_** - (*Function*): boolean - optional, a function that takes a link object as a parameter. If returns 'false', the 'renderer' function won't be called for a link
        - **_link_** - (*Link*) - the link object





- Beware, custom layers will be reset after the next call of <a href="api/gantt_init.md">gantt.init</a>
- Calling the [gantt.resetLayout()](api/gantt_resetlayout.md) method will also reset custom layers. In order for custom layers to be displayed on a page, you need to redefine the **gantt.addLinkLayer** method after calling api/gantt_resetlayout.md.

{{editor	https://snippet.dhtmlx.com/6mmt1nvw	Gantt. Additional layer with link types
}}