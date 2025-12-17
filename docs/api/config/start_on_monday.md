---
sidebar_label: start_on_monday
title: start_on_monday config
description: "sets the starting day of the week"
---

# start_on_monday

### Description

@short: Sets the starting day of the week

@signature: start_on_monday: boolean

### Example

~~~jsx
// weeks start from Sunday
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

If the parameter is set to true, a week will start from Monday (otherwise, from Sunday).
