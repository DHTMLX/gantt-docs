---
sidebar_label: baseline_text
title: baseline_text template
description: "specifies the text displayed inside the baseline element"
---

# baseline_text
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Specifies the text displayed inside the baseline element

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - the task object associated with the baseline
- `baseline` - (required) *Baseline* - the baseline object
- `index` - (required) *number* - the index of the baseline in the task's baselines array

### Returns
- ` text` - (string | number | void) - the HTML content to be injected as the innerHTML of the baseline element. The default template returns an empty string.

### Example

~~~jsx
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- added in v9.0

