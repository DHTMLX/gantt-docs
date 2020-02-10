Content Security Policy Compliance
=========================

Content Security Policy (CSP) is a web standard used to prevent unauthorized JavaScript execution. 

The dhtmlxGantt library provides the **ext/dhtmlxgantt_csp.js** extension that allows working with dhtmlxGantt 
in case Content Security Policy (CSP) is enabled in the app. It enhances the security of created apps. 

In order to enable CSP support in your app built with Gantt, you need to include the *dhtmlxgantt_csp.js* after *dhtmlxgantt.js*:

~~~html
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~


The *dhtmlxgantt_csp.js* extension is applied on top of the base gantt and redefines insecure code (date formatters and parsers, mostly).
However, inline styles should be allowed, as they are used in many places across the component. 

In some cases the CSP compatible methods may cause performance regression, thus they are not used by default and the extension has to be enabled explicitly.

@deprecated: The described functionality is deprecated since version 7.0. Instead of it, define the mode of internal implementation of the code of date formatting methods. [Check the details](api/gantt_csp_config.md).