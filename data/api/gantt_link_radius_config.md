link_radius
=============

@short: sets the radius for rounding corners of link lines in the timeline

@default: 4
@type: number
@example:
gantt.config.link_radius = 6;
gantt.init("gantt_here");

@template: api_config
@descr:
The property defines the radius for rounding the corners of link lines in the timeline. If the value is less than or equal to 1, rounding is disabled. If a link segment's length is not sufficient for the specified radius, rounding will not be applied to that segment.

@relatedapi:
api/gantt_link_line_width_config.md
api/gantt_link_arrow_size_config.md