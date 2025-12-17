---
sidebar_label: links
title: links config
description: "stores the types of links dependencies"
---

# links

### Description

@short: Stores the types of links dependencies

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Default value:**\{ "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" \}

### Details

- **finish_to_start** - (*string | number*) - the target task can't start before the source task ends (but it may start later).
- **start_to_start** - (*string | number*) - the target task can't start until the source task starts (but it may start later).
- **finish_to_finish** - (*string | number*) -  the target task can't end before the source task ends (but it may end later).
- **start_to_finish** - (*string | number*) - the target task can't end before the source task starts (but it may end later).

### Related Guides
- [Data Loading](guides/loading.md#dataproperties)
