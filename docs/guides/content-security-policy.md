---
title: "Content Security Policy Compliance"
sidebar_label: "Content Security Policy Compliance"
---

Content Security Policy Compliance
=========================

Content Security Policy (CSP) is a web standard used to prevent unauthorized JavaScript execution and enhance the [security of created apps](guides/app-security.md).

**Since version 7.0 the CSP support is included into the Gantt package**. The library provides a [special config](api/config/csp.md) that allows you
to adjust the code of your application created with dhtmlxGantt to comply with the CSP (Content Security Policy) standard. 

~~~js
// the defult value is "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

The CSP functionality is applied on top of the base gantt and redefines insecure code (date formatters and parsers, mostly).
However, inline styles should be allowed, as they are used in many places across the component. 

**Before v7.0** the CSP (*ext/dhtmlxgantt_csp.js*) extension had to be included separately to allow working with dhtmlxGantt 
in case Content Security Policy (CSP) is enabled in the app. 

~~~html
<!-- include the *dhtmlxgantt_csp.js* after *dhtmlxgantt.js* -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~

