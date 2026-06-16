---
title: Vue Gantt installieren
sidebar_label: Installation
description: "Wie man die Evaluierungs- oder professionelle Version von Vue Gantt über npm oder yarn installiert."
---

# Vue Gantt installieren

Vue Gantt ist in zwei Distributionen erhältlich:

1. **Evaluierungsversion** öffentlich verfügbar auf npm, enthält ein Test-Wasserzeichen und kann optional mit einer kostenlosen Evaluierungsphase gekoppelt werden, die Zugang zu technischer Unterstützung gewährt.
2. **Professionelle (kommerziell) Version** verfügbar aus dem privaten DHTMLX npm-Repository und für den Produktionseinsatz vorgesehen.

Beide Pakete enthalten dieselbe API.

## Voraussetzungen

- Vue 3-Projekt (oder ein Projekt, in dem Sie Vue 3 hinzufügen möchten)
- Node.js installiert
- npm oder Yarn verfügbar
- DHTMLX privater npm-Zugang (nur für das professionelle Paket)

## Installieren Sie das Evaluierungspaket (öffentliches npm)

Die Evaluierungsversion ist auf npm verfügbar als [@dhtmlx/trial-vue-gantt]:

- npm:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Dieses Build ist voll funktionsfähig, zeigt jedoch eine Meldung an, die darauf hinweist, dass die Bibliothek im Evaluierungsmodus läuft.

### Optional: Eine vollständige Evaluierungsphase starten (empfohlen)

Obwohl das Trial-Paket ohne Einschränkungen installiert wird, können Sie auch eine offizielle Evaluierung über die Website starten unter
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml).

Das Starten einer formellen Evaluierung bietet Ihnen während der Testphase kostenlosen technischen Support.

**Offline-Beispiele (Zip) herunterladen**

Das Evaluierungsformular enthält außerdem eine herunterladbare ZIP-Datei mit offline-fertigen Beispielen.

Sie können auch weitere Beispiele und Demo-Projekte auf dem offiziellen GitHub durchsuchen, indem Sie [Vue Gantt Demos on GitHub](https://github.com/DHTMLX/?q=vue-gantt&type=all&language=&sort=) prüfen.

## Installieren Sie das Professional-Paket (Privates npm)

Die Professional-Version wird für Produktionsanwendungen verwendet und beinhaltet kommerzielle Lizenzierung und vollständigen Zugriff auf technischen Support.

Sobald Sie eine kommerzielle Lizenz erhalten, können Sie Ihre privaten npm-Zugangsdaten im [Kundenbereich](https://dhtmlx.com/clients/) generieren.

Nachdem Sie Ihren Login/Passwort erzeugt haben, konfigurieren Sie npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Dann installieren Sie das Professional-Paket:

- npm:

~~~bash
npm install @dhx/vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/vue-gantt
~~~

## Verwenden Sie passende Importe

Verwenden Sie Importe, die dem installierten Paket entsprechen.

| Paket | Komponentenimport | CSS-Import |
| --- | --- | --- |
| `@dhtmlx/trial-vue-gantt` | `import VueGantt from "@dhtmlx/trial-vue-gantt";` | `import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";` |
| `@dhx/vue-gantt` | `import VueGantt from "@dhx/vue-gantt";` | `import "@dhx/vue-gantt/dist/vue-gantt.css";` |

## Versionsanforderungen prüfen

Wrapper-Peer-Abhängigkeit:

- `vue >= 3.2.25`

## Umstieg vom Trial-Paket auf das kommerzielle Paket

Die meisten Projekte starten mit dem Trial-Paket und wechseln später, sobald der Prototyp genehmigt ist und eine kommerzielle Lizenz vorliegt. Beide Pakete teilen dieselbe API, daher ist der Wechsel größtenteils mechanisch: den Paketnamen austauschen, den CSS-Import austauschen und neu installieren.

Nachdem Sie das private Registry wie oben konfiguriert haben, aktualisieren Sie jeden Import im Code:

~~~ts
// vorher
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

// nachher
import VueGantt from "@dhx/vue-gantt";
import "@dhx/vue-gantt/dist/vue-gantt.css";
~~~

Suchen Sie im Projekt nach verbleibenden Verweisen auf `@dhtmlx/trial-vue-gantt`, einschließlich des CSS-Importpfads – letzteres wird leicht übersehen. Ersetzen Sie die Abhängigkeit in `package.json`, installieren Sie erneut mit `npm install` und starten Sie die Anwendung. Wenn das Wasserzeichen verschwunden ist und der Rest der UI identisch funktioniert, ist der Austausch abgeschlossen.

### Verwenden des Registries in CI- oder gemeinsam genutzten Build-Umgebungen

`npm login` funktioniert zwar local gut, CI-Laufzeiten und andere gemeinsame Build-Umgebungen können in der Regel kein interaktives Login durchführen. Dafür erzeugen Sie aus einer angemeldeten Maschine ein passives Zugriffstoken:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

Das Token wird einmal im Terminal-Ausgabe angezeigt – kopieren Sie es, bevor Sie die Sitzung schließen, da es später nicht erneut abgerufen werden kann. Dann geben Sie es über eine `.npmrc`-Datei frei, die der Build lesen kann:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

Setzen Sie `DHTMLX_NPM_TOKEN` als Geheimnis im CI-Anbieter (GitHub Actions, GitLab, usw.), damit das Token niemals im Code landet. Das gleiche Muster funktioniert auch für Docker-Builds – injizieren Sie das Token zur Build-Zeit, statt es in das Image zu integrieren.

Falls `npm install` in CI mit einem 401 oder 403 gegen `npm.dhtmlx.com` fehlschlägt, ist das Geheimnis entweder missing, abgelaufen, oder die `.npmrc`-Datei befindet sich nicht dort, wo npm sie erwartet (die Projektwurzel ist der sicherste Ort).

## Was Sie als Nächstes lesen sollten

- [Schnellstart mit Vue Gantt](integrations/vue/quick-start.md)
- [Vue Gantt-Übersicht](integrations/vue/overview.md)
- [Konfigurationsreferenz](integrations/vue/configuration-props.md)