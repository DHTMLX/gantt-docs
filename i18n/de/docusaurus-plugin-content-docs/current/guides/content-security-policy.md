---
title: "Content Security Policy-Konformität"
sidebar_label: "Content Security Policy-Konformität"
---

# Content Security Policy-Konformität


Content Security Policy (CSP) ist ein Web-Standard, der dazu dient, das Ausführen von nicht autorisiertem JavaScript zu verhindern und die [Sicherheit erstellter Apps](guides/app-security.md) zu erhöhen.

**Ab Version 7.0 ist die CSP-Unterstützung im Gantt-Paket integriert**. Die Bibliothek bietet eine [spezielle Konfiguration](api/config/csp.md), mit der Sie Ihre auf dhtmlxGantt basierende Anwendung an die Anforderungen der CSP (Content Security Policy) anpassen können.

~~~js
// der Standardwert ist "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

Die CSP-Funktion arbeitet auf der Kernfunktionalität von gantt und aktualisiert unsicheren Code (hauptsächlich Datumsformatierer und Parser). Inline-Stile müssen jedoch weiterhin erlaubt sein, da sie im gesamten Component stark verwendet werden.

**Vor Version 7.0** musste die CSP-Erweiterung (*ext/dhtmlxgantt_csp.js*) separat hinzugefügt werden, damit dhtmlxGantt ordnungsgemäß funktioniert, wenn die Content Security Policy (CSP) in der Anwendung aktiv ist.

~~~html
<!-- *dhtmlxgantt_csp.js* nach *dhtmlxgantt.js* einbinden -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~

