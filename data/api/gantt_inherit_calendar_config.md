inherit_calendar
=============

@short:
	defines whether tasks should inherit work calendars from their summary parents

@type: boolean
@default: false
@example:
gantt.config.inherit_calendar = true;

@template:	api_config
@descr:

By default, tasks that don't have work calendar specified will use the global work calendar.

After setting this config to `true`, such tasks will use a calendar of their summary (project) parent task.


@related:
desktop/working_time.md

@relatedsample:
09_worktime/08_project_calendars.html