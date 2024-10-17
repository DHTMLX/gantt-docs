deadlines
=============

@short: enables or disables the display of deadline elements for tasks

@type: boolean
@default: true
@example:
gantt.config.deadlines = true;
gantt.init("gantt_here");

@template: api_config
@descr:
This config enables or disables the display of deadline elements for tasks. If enabled, Gantt will check the `task.deadline` property, and if it contains a valid date, the deadline element will be displayed in the timeline.

@related:
desktop/inbuilt_baselines.md

@relatedsample:
04_customization/14_deadline.html

@edition: pro

@changelog: added in v9.0