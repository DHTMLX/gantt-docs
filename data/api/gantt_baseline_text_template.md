baseline_text
=============

@short: specifies the text displayed inside the baseline element

@params:
- task	Task	the task object associated with the baseline
- baseline	Baseline	the baseline object
- index	number	the index of the baseline in the task's baselines array

@example:
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};

@template: api_template
@returns:
- text	string | number | void	the HTML content to be injected as the innerHTML of the baseline element. The default template returns an empty string.

@descr:

@related:
desktop/inbuilt_baselines.md

@relatedapi:
api/gantt_baselines_config.md

@relatedsample:
04_customization/15_baselines.html

@edition: pro

@changelog: added in v9.0