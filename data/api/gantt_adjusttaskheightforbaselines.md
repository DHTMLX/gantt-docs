adjustTaskHeightForBaselines
=============

@short: adjusts the task's row height for proper display of baseline elements

@params: 
- task	Task	the task object whose `row_height` will be adjusted

@example:
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();

@template: api_method
@descr:
This method modifies the [`row_height`](desktop/resizing_rows.md) value of the provided task to ensure correct display of baseline elements. 

Typically, there is no need to call this method directly. It is necessary only when you dynamically modify the display settings of the [gantt.config.baselines](api/gantt_baselines_config.md) config.

@related:
desktop/inbuilt_baselines.md

@relatedapi:
api/gantt_baselines_config.md

@relatedsample:
04_customization/15_baselines.html

@edition: pro

@changelog: added in v9.0