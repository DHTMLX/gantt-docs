---
sidebar_label: csp
title: CSP-Konfiguration
description: "definiert die interne Implementierung des Codes der Datumsformatierungsfunktionen"
---

# CSP

### Description

@short: Definiert die interne Implementierung des Codes der Datumsformatierungsfunktionen

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Standardwert:** "auto"

### Details

Die Laufzeitumgebung einiger Anwendungen (z. B. Salesforce Lightning) kann das Ausführen des dhtmlxGantt-Codes oft blockieren.
Der Hauptgrund dafür ist die Festlegung der Content Security Policy in der App. 
Die CSP kann die interne Hochleistungs-Ausführung von Datumsformatierungsmethoden in Gantt als unsicher interpretieren. 

Die **csp**-Konfiguration ermöglicht es, zu verhindern, dass der Gantt-Code durch Festlegung der Implementierungsweise blockiert wird. 

Es gibt drei Modi der internen Implementierung der Methoden **gantt.date.date_to_str** und **gantt.date.str_to_date** der Datumsformatierung:

- Standardmäßig ist die Konfiguration auf den Modus *auto* gesetzt. 

~~~js
gantt.config.csp = "auto";
~~~

In diesem Modus versucht Gantt, den Hochleistungs-Code für die Datumsformatierung dort zu verwenden, wo es möglich ist. Falls die Ausführung des tatsächlich produktiven Codes durch die Anwendungseinstellungen blockiert wird, wird kompatibler Code verwendet.

- Sie können den Gantt-Code durch Setzen der Option auf *true* immer kompatibel machen.

~~~js
gantt.config.csp = true;
~~~

In diesem Modus wird der Gantt-Code unter allen Umständen funktionieren, aber es kann zu Leistungsverschlechterungen kommen.

- Sie können auch den Wert der Konfiguration auf *false* setzen, um den Gantt-Code nur mit Hochleistung zu betreiben.

~~~js
gantt.config.csp = false;
~~~

Beachten Sie, dass die Ausführung von dhtmlxGantt stoppt, wenn die Code-Implementierung durch die Anwendungseinstellungen blockiert wird.

### Change log
- Hinzugefügt in Version 7.0
- Wenn die Eigenschaft auf *true* gesetzt ist, wird die [lightbox](api/config/lightbox.md) im Gantt-Container gerendert (ab Version 7.1.13)