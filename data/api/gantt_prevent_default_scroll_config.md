prevent_default_scroll
=============
@short:specifies whether the gantt container should block the mousewheel event, or should it be propagated up to the window element

@type: boolean
@default:true
@example:
gannt.config.prevent_default_scroll = false;
gantt.init('gantt_here');

@template:	api_config
@descr:
The option is useful in cases when the gantt is inserted in the middle of the page and there is some content outside.

If the option is disabled, the scroll once appeared in the gantt would remain there and to scroll other part of the page a user would  need  to make a click outside the gantt.



