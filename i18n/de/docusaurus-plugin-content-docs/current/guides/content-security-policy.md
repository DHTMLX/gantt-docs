---
title: "Content Security Policy-Konformität"
sidebar_label: "Content Security Policy-Konformität"
---

# Content Security Policy-Konformität

Content Security Policy (CSP) ist ein Web-Standard, der dazu dient, unerlaubte JavaScript-Ausführung zu verhindern und die Sicherheit der erstellten Apps zu erhöhen.

**Seit Version 7.0 ist die CSP-Unterstützung im Gantt-Paket enthalten**. Die Bibliothek bietet eine [spezielle Konfiguration](api/config/csp.md), die es Ihnen ermöglicht, den Code Ihrer mit dhtmlxGantt erstellten Anwendung so anzupassen, dass sie dem CSP (Content Security Policy) Standard entspricht. 

~~~js
// the defult value is "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

Die CSP-Funktionalität wird auf das Basis-Gantt angewendet und redefiniert unsicheren Code (vor allem Datums-Formatter und Parser). Inline-Stile sollten jedoch erlaubt sein, da sie an vielen Stellen der Komponente verwendet werden. 

**Vor Version 7.0** musste die CSP (*ext/dhtmlxgantt_csp.js*)-Erweiterung separat eingebunden werden, um mit dhtmlxGantt arbeiten zu können, falls in der App Content Security Policy (CSP) aktiviert ist. 

~~~html
<!-- include the *dhtmlxgantt_csp.js* after *dhtmlxgantt.js* -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~