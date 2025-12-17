---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "repaints the lighbox for the task according to its type"
---

# changeLightboxType

### Description

@short: Repaints the lighbox for the task according to its type

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - the task type

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

The method repaints the lightbox and if possible saves all the input. For rebuilding the structure, the method uses the [configuration for the specified type](guides/default-edit-form.md).

If the type of the lightbox is the same as the type in the parameter, the method does not repaint the lightbox.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)

