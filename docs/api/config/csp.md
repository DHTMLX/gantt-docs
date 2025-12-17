---
sidebar_label: csp
title: csp config
description: "defines internal implementation of the code of date formatting methods"
---

# csp

### Description

@short: Defines internal implementation of the code of date formatting methods

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Default value:** "auto"

### Details

The runtime environment of some applications (for example, Salesforce Lightning) can often block the performing of the dhtmlxGantt code.
The main reason for that is specifying the Content Security Policy in the app. 
The CSP can interpret inner high-performance execution of date formatting methods in Gantt as insecure. 

The **csp** config allows preventing the gantt code from being blocked via specifying the way of its implementation. 

There are three modes of internal implementation of the **gantt.date.date_to_str** and **gantt.date.str_to_date** methods of date formatting:

- By default, the config is set to *auto* mode. 

~~~js
gantt.config.csp = "auto";
~~~

In this mode, Gantt attempts to use high-performance code for the date formatting methods where it's possible. In case the execution of the actually productive code is blocked by the application settings, compatible code will be used.

- You can make the Gantt code always compatible via setting the option to *true*.

~~~js
gantt.config.csp = true;
~~~

In this mode, the gantt code will work in any case but it may cause performance regression.

-  You can also specify the value of the config to *false* to make the Gantt code high-performance only.

~~~js
gantt.config.csp = false;
~~~

Note, that the work of dhtmlxGantt will stop if the code implementation is blocked by the application settings.

### Change log
- Added in v7.0
- If the property is set to *true*, the [lightbox](api/config/lightbox.md) will be rendered inside the Gantt container (from v7.1.13)

