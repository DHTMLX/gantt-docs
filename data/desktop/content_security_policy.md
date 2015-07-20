Content Security Policy Compliance
=========================


Starting from version 3.3, the library provides the **ext/dhtmlxgantt_csp.js** extension that allows working with dhtmlxGantt 
in case Content Security Policy (CSP) is enabled in the app. It enhances the security of created apps. 
CSP is a web standard used to prevent unauthorized JavaScript execution. This standard is supported by all modern browsers. 


In order to enable CSP support in your app built with Gantt, you need to include the *dhtmlxgantt_csp.js* after *dhtmlxgantt.js*:

~~~html
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~


The *dhtmlxgantt_csp.js* extension is applied on top of the base scheduler and redefines unsecure code (date formatters and parsers, mostly).
However, inline styles should be allowed, as they are used in many places across the component. 


Thus, unsafe code can't be removed completely, as there's a possibility of performance
regression in case some functions are extensively used.