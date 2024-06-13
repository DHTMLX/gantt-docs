wheel_scroll_sensitivity
=============


@short: specifies the speed of scrolling the gantt by the mouse wheel
	

@type: undefined | number | object

@default: undefined

@example:
// scroll at double-speed
gantt.config.wheel_scroll_sensitivity = 2;

// scroll at half-speed 
gantt.config.wheel_scroll_sensitivity = 0.5;

// or scroll at different speeds on different axes
gantt.config.wheel_scroll_sensitivity = {
  	x: 1,
  	y: 0.5
};

@template:	api_config
@descr:

The object configuration has these properties:

- <span class=subproperty>**x**</span> - (*number*) - horizontal speed
- <span class=subproperty>**y**</span> - (*number*) - vertical speed

@changelog: added in v7.0.11



