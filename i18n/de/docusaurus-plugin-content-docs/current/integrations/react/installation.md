---
title: Installieren von React Gantt
sidebar_label: Installation
description: "So installieren Sie die Evaluations- oder kommerzielle Version von React Gantt über npm."
---

# Installieren von React Gantt

React Gantt ist in zwei Distributionen erhältlich:

1. **Evaluationsversion** öffentlich über npm verfügbar, enthält ein Test-Wasserzeichen und kann optional mit einem kostenlosen Evaluationszeitraum gekoppelt werden, der Zugriff auf technischen Support gewährt.
2. **Professionelle (kommerziell) Version** verfügbar aus dem privaten DHTMLX npm-Repository und für den Produktionseinsatz vorgesehen.

Beide Pakete enthalten dieselbe API.

## Installation der Evaluationsversion (öffentliches npm)

Die Evaluations-Build ist auf npm verfügbar unter [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt):

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

Oder mit Yarn:

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Dieses Build ist vollständig funktionsfähig, zeigt jedoch eine Meldung an, dass die Bibliothek im Evaluationsmodus läuft.

### Optional: Einen vollständigen Evaluationszeitraum starten (empfohlen)

Obwohl das Trial-Paket uneingeschränkt installiert wird, können Sie auch eine offizielle Evaluation über die Website starten unter
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml).

Der Start einer formellen Evaluation gewährt Ihnen während der Testphase kostenlosen technischen Support.

**Herunterladen von Offline-Beispielen (Zip)**

Das Evaluationsformular enthält außerdem eine ZIP-Datei mit offline einsatzbereiten Beispielen.

Sie können auch weitere Beispiele und Demoprojekte auf dem offiziellen GitHub einsehen, indem Sie [React Gantt-Demos auf GitHub](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=) prüfen.

## Professionelle Version (privates npm)

Die professionelle Version wird für Produktionsanwendungen verwendet und beinhaltet kommerzielle Lizenzen und vollständigen Zugriff auf den technischen Support.

Sobald Sie eine kommerzielle Lizenz erhalten, können Sie Ihre privaten npm-Anmeldedaten im [Kundenbereich](https://dhtmlx.com/clients/) generieren.

Nachdem Sie Ihre Anmeldedaten erstellt haben, konfigurieren Sie npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Installieren Sie dann das Professional-Paket:

~~~bash
npm install @dhx/react-gantt
~~~

Oder mit Yarn:

~~~bash
yarn add @dhx/react-gantt
~~~

## Nächste Schritte

Nach der Installation setzen Sie fort mit:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Framework-Leitfäden](/category/framework-integrations/)