--- 
title: Installation von Angular Gantt
sidebar_label: Installation
description: "Wie man die Evaluierungs- oder Profiversion von Angular Gantt installiert und Importe in Angular-Projekten einbindet."
---

# Angular Gantt installieren

Angular Gantt ist in zwei Distributionen erhältlich:

1. **Evaluationsversion** öffentlich verfügbar auf npm, enthält ein Test-Wasserzeichen und kann optional mit einer kostenlosen Evaluierungsperiode kombiniert werden, die Zugang zum technischen Support gewährt.
2. **Professionelle (kommerziell) Version** verfügbar aus dem privaten DHTMLX npm-Repository und für den Produktionseinsatz gedacht.

Beide Pakete enthalten dieselbe API.

## Installation des Evaluierungspakets (Public npm)

Der Evaluierungs-Build ist auf npm als [@dhtmlx/trial-angular-gantt](https://www.npmjs.com/package/@dhtmlx/trial-angular-gantt) verfügbar:

- npm:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

Dieses Build ist vollständig funktionsfähig, zeigt jedoch eine Meldung an, dass die Bibliothek im Evaluierungsmodus läuft.

### Optional: Start einer vollständigen Evaluierungsperiode (empfohlen)

Obwohl das Trial-Paket ohne Einschränkungen installiert wird, können Sie auch eine offizielle Evaluierung über die Website starten unter
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml).

Eine formale Evaluierung gewährt Ihnen während der Probezeit kostenlosen technischen Support.

**Download offline-Beispiele (zip)**

Das Evaluierungsformular enthält außerdem eine herunterladbare ZIP-Datei mit offline-fähigen Beispielen.

Sie können auch zusätzliche Beispiele und Demo-Projekte auf dem offiziellen GitHub durchsuchen, indem Sie [Angular Gantt Demos on GitHub](https://github.com/DHTMLX/?q=angular-gantt&type=all&language=&sort=) prüfen.

## Installation des Professional Packages (Private npm)

Die Professional-Version wird für Produktionsanwendungen verwendet und umfasst kommerzielle Lizenzierung sowie vollständigen Zugang zum technischen Support.

Sobald Sie eine kommerzielle Lizenz erhalten haben, können Sie Ihre privaten npm-Anmeldedaten im [Client's Area](https://dhtmlx.com/clients/) generieren.

Nach der Generierung von Login/Password konfigurieren Sie npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Dann installieren Sie das Professional-Paket:

- npm:

~~~bash
npm install @dhx/angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/angular-gantt
~~~

## Angular Projektanforderungen

Wrapper-abhängige Peer-Abhängigkeiten erfordern derzeit:

- `@angular/common >= 19.0.0`
- `@angular/core >= 19.0.0`
- `rxjs >= 6.0.0`


## Import-Matrix

Verwenden Sie Importe, die dem installierten Paketkanal entsprechen.

| Paket | Wrapper-Import | CSS-Import |
| --- | --- | --- |
| `@dhtmlx/trial-angular-gantt` | `import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";` | `@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";` |
| `@dhx/angular-gantt` | `import { DhxGanttComponent } from "@dhx/angular-gantt";` | `@import "@dhx/angular-gantt/dist/angular-gantt.css";` |

Fügen Sie den CSS-Import in Ihre globalen Angular-Stile hinzu (zum Beispiel `src/styles.css`).

Dies ist die empfohlene Standardeinstellung für Angular-Anwendungen, da Gantt-Stile bibliotheksweite Stile sind und keinen Angular-Komponenten-Scope benötigen.

## Globaler vs. Komponenten-CSS-Import

- **Globaler Import:** Importieren Sie den Wrapper-CSS-Pfad aus der obigen Matrix in `src/styles.css` (oder registrieren Sie ihn in `angular.json` unter `styles`). Es sind keine speziellen Einstellungen zur Komponenten-Kapselung erforderlich.
- **Komponenten-Stylesheet-Import:** Sie können dasselbe CSS auch in einer Komponenten-`styleUrl` importieren, aber dann kann Angulars Standard-`ViewEncapsulation.Emulated` Selektoren kapseln und verhindern, dass die internen `.dhx-*`-Stile/Überschreibungen des Gantt wie erwartet angewendet werden.

Wenn Sie das Gantt-CSS in einem Komponenten-Stylesheet importieren oder Überschreibungen für interne Gantt-Klassen (zum Beispiel `.dhx-gantt-root`) in diesem Stylesheet definieren, setzen Sie:

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class GanttPageComponent {}
~~~

Verwenden Sie das Komponenten-Importmuster hauptsächlich für eigenständige Demos/Beispiele. Für Produktionsanwendungen bevorzugen Sie den globalen Import.

## Standalone- vs NgModule-Projekte

Der Wrapper unterstützt beide Angular-Stile:

- **Standalone-Komponenten**: Importieren Sie `DhxGanttComponent` in das `imports`-Array der Komponente.
- **NgModule-basierte Apps**: Importieren Sie `DhxGanttModule` in Ihr Angular-Modul.

Standalone-Beispiel:

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks = [];
  links = [];
}
~~~

NgModule-Beispiel:

~~~ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DhxGanttModule } from '@dhtmlx/trial-angular-gantt';

@NgModule({
  imports: [BrowserModule, DhxGanttModule],
})
export class AppModule {}
~~~


## Vom Trial-Paket zum kommerziellen wechseln

Die meisten Projekte beginnen mit dem Trial-Paket und wechseln später, sobald der Prototyp freigegeben ist und eine kommerzielle Lizenz vorliegt. Beide Pakete teilen dieselbe API, daher ist der Wechsel größtenteils rein mechanisch: Paketname austauschen, CSS-Import austauschen und erneut installieren.

Nachdem Sie das private Registry wie oben beschrieben konfiguriert haben, aktualisieren Sie jeden Import im Code:

~~~ts
// vorher
import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";

// nachher
import { DhxGanttComponent } from "@dhx/angular-gantt";
~~~

Und aktualisieren Sie den CSS-Import in `src/styles.css`:

~~~css
/* vorher */
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

/* nachher */
@import "@dhx/angular-gantt/dist/angular-gantt.css";
~~~

Durchsuchen Sie das Projekt nach verbleibenden Verweisen auf `@dhtmlx/trial-angular-gantt`, einschließlich des CSS-Importpfads – letzteres ist am einfachsten zu vergessen. Ersetzen Sie die Abhängigkeit in `package.json`, installieren Sie dann erneut (`npm install`) und führen Sie die App aus. Wenn das Wasserzeichen verschwunden ist und der Rest der UI identisch funktioniert, ist der Wechsel abgeschlossen.

### Verwendung des Registries aus CI- oder Shared-Build-Umgebungen

`npm login` funktioniert gut auf einem Entwicklermaschine, aber CI-Runnern und anderen gemeinsamen Build-Umgebungen ist in der Regel eine interaktive Anmeldung nicht möglich. Dafür generieren Sie einen nicht interaktiven Zugriffstoken von einer angemeldeten Maschine:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

Der Token wird einmal im Terminal-Ausgabe angezeigt – kopieren Sie ihn vor dem Schließen der Sitzung, da er später nicht erneut abgerufen werden kann. Dann geben Sie ihn über eine `.npmrc`-Datei an, die der Build lesen kann:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

Setzen Sie `DHTMLX_NPM_TOKEN` als Secret im CI-Anbieter (GitHub Actions, GitLab usw.), damit der Token niemals in das Repository gelangt. Dasselbe Muster funktioniert auch für Docker-Builds – injizieren Sie den Token zur Build-Zeit statt ihn in das Image einzubauen.

Wenn `npm install` im CI mit einem 401 oder 403 gegen `npm.dhtmlx.com` fehlschlägt, ist das Secret entweder missing, abgelaufen oder die `.npmrc`-Datei befindet sich nicht dort, wo npm sie erwartet (das Projektwurzelverzeichnis ist der sicherste Ort).

## Was als Nächstes gelesen werden sollte

- [Schnellstart mit Angular Gantt](integrations/angular/quick-start.md)
- [Angular Gantt Überblick](integrations/angular/overview.md)
- [Konfigurationsreferenz](integrations/angular/configuration-props.md)