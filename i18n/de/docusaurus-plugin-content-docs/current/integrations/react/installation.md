---
title: React Gantt installieren
sidebar_label: Installation
description: "Wie man die Evaluierungs- oder kommerzielle Version von React Gantt über npm installiert."
---

# React Gantt installieren

React Gantt ist in zwei Distributionen erhältlich:

1. **Evaluierungs-Version** öffentlich über npm verfügbar, enthält ein Test-Wasserzeichen und kann optional mit einer kostenlosen Evaluierungsphase gekoppelt werden, die Zugriff auf technischen Support gewährt.
2. **Professionelle (kommerzielle) Version** erhältlich aus dem privaten DHTMLX npm-Repository und für den Produktionseinsatz vorgesehen.

Beide Pakete enthalten dieselbe API.

## Installation der Evaluierungs-Version (öffentliches npm)

Die Evaluierungs-Build-Version ist auf npm erhältlich als [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt):

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

Oder mit Yarn:

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Diese Build-Version ist voll funktionsfähig, zeigt jedoch eine Meldung an, dass die Bibliothek im Evaluierungsmodus läuft.

### Optional: Eine vollständige Evaluierungsphase starten (empfohlen)

Obwohl das Testpaket ohne Einschränkungen installiert wird, können Sie auch eine offizielle Evaluierung über die Website starten unter
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml).

Der Beginn einer formellen Evaluierung gewährt Ihnen während der Testphase kostenlosen technischen Support.

**Offline-Beispiele herunterladen (Zip)**

Das Evaluierungsformular enthält außerdem eine herunterladbare ZIP-Datei mit offline einsatzbereiten Beispielen.

Sie können auch weitere Beispiele und Demo-Projekte auf dem offiziellen GitHub unter [React Gantt Demos on GitHub](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=) ansehen.

## Professionelle Version (privates npm)

Die professionelle Version wird für Produktionsanwendungen verwendet und umfasst kommerzielle Lizenzierung sowie vollen Zugriff auf den technischen Support.

Nachdem Sie eine kommerzielle Lizenz erhalten haben, können Sie Ihre privaten npm-Anmeldedaten im [Kundenbereich](https://dhtmlx.com/clients/) erstellen.

Nach dem Generieren Ihres Logins/Kennworts konfigurieren Sie npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Dann installieren Sie das Professional-Paket:

~~~bash
npm install @dhx/react-gantt
~~~

Oder, mit Yarn:

~~~bash
yarn add @dhx/react-gantt
~~~

## Umstieg vom Trial-Paket auf das kommerzielle Paket

Die meisten Projekte beginnen mit dem Trial-Paket und wechseln später, sobald der Prototyp genehmigt ist und eine kommerzielle Lizenz vorliegt. Beide Pakete verwenden dieselbe API, daher ist der Wechsel größtenteils rein mechanisch: Paketname austauschen, CSS-Import austauschen und neu installieren.

Nachfolgend sehen Sie den Importwechsel im Code:

~~~ts
// vor
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

// nach
import Gantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
~~~

Suchen Sie im Projekt nach verbleibenden Verweisen auf `@dhtmlx/trial-react-gantt`, einschließlich des CSS-Importpfads – der Pfad wird leicht übersehen. Ersetzen Sie die Abhängigkeit in `package.json`, führen Sie dann `npm install` aus und starten Sie die Anwendung. Wenn das Wasserzeichen verschwunden ist und die restliche Benutzeroberfläche identisch funktioniert, ist der Wechsel abgeschlossen.

### Verwendung des Registrys in CI- oder gemeinsam genutzten Build-Umgebungen

`npm login` funktioniert gut auf einem Entwicklerrechner, aber CI-Läufer und andere gemeinsame Build-Umgebungen können in der Regel kein interaktives Login durchführen. Für diese Fälle erstellen Sie ein nicht interaktives Zugriffstoken von einem angemeldeten Rechner:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

Das Token wird einmal in der Terminalausgabe angezeigt – kopieren Sie es, bevor Sie die Sitzung schließen, da es später nicht abgerufen werden kann. Geben Sie es dann durch eine `.npmrc`-Datei frei, die vom Build gelesen werden kann:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

Setzen Sie `DHTMLX_NPM_TOKEN` als Secret im CI-Anbieter (GitHub Actions, GitLab usw.), damit das Token niemals in das Repository eingecheckt wird. Das gleiche Muster funktioniert auch für Docker-Builds – injizieren Sie das Token zur Build-Zeit, statt es in das Image zu integrieren.

Wenn `npm install` in CI mit einem 401 oder 403 gegenüber `npm.dhtmlx.com` fehlschlägt, fehlt das Secret möglicherweise, ist abgelaufen oder sich die `.npmrc`-Datei nicht dort befindet, wo npm sie erwartet (das Projekt-Root ist der sicherste Ort).

### KI-App-Buildern (Lovable und ähnliche)

KI-App-Builder wie Lovable betreiben eigene Build-Umgebungen, und sobald Sie zu `@dhx/react-gantt` wechseln, muss jeder von ihnen ausgeführte `npm install` gegen `https://npm.dhtmlx.com` authentifiziert werden.

Es gibt zwei vernünftige Wege nach dem Paketwechsel:

- **Lovable-Build beibehalten.** Fügen Sie die DHTMLX-Registry-Anmeldeinformationen der Build-Umgebung von Lovable hinzu, üblicherweise als Secret, das zur Installationszeit in `.npmrc` geschrieben wird, unter Verwendung des gleichen `${DHTMLX_NPM_TOKEN}`-Musters wie oben gezeigt. Der genaue Mechanismus zur Speicherung von Build-Geheimnissen ist eine Lovable-Plattform-Angelegenheit und kann sich im Laufe der Zeit ändern – prüfen Sie die aktuelle Lovable-Dokumentation, wenn Sie dies einrichten.
- **Build in Ihre eigene CI verschieben.** Viele Teams verwenden Lovable für Prototyping und führen Produktions-Builds von Vercel, Netlify, GitHub Actions oder Ähnlichem aus, die alle das Anhängen des npm-Token als Secret unterstützen. In diesem Setup erfolgt der Trial-to-Commercial-Swap typischerweise, sobald Sie die Bereitstellungspipeline einrichten, und Lovable benötigt keine Anmeldeinformationen, da es den Installationsvorgang nicht mehr durchführt.

Wenn ein Lovable-Build mit 40x gegen `npm.dhtmlx.com` fehlschlägt und das Secret nicht sauber eingesetzt werden kann, ist der Weg über CI die zuverlässige Fallback-Option.

## Nächste Schritte

Nach der Installation fortfahren mit:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Framework-Anleitungen](/category/framework-integrations/)