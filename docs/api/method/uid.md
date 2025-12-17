---
sidebar_label: uid
title: uid method
description: "returns a unique id"
---

# uid

### Description

@short: Returns a unique id

@signature: uid: () =\> number

### Returns
- ` id` - (number) - a unique id

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

The generated id is unique per page but not globally. 
So you can use the method in the on-page logic. It's not good enough for use as the DB id.

### Change log
- added in version 4.0
