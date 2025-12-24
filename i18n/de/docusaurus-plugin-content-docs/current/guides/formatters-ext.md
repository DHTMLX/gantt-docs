---
title: "Formatters-Erweiterung"
sidebar_label: "Formatters-Erweiterung"
---

# Formatters-Erweiterung

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

Die **gantt.ext.formatters**-Erweiterung bietet zwei Möglichkeiten zur Formatierung von Werten:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

Sie können auch einen [benutzerdefinierten Formatter](#customformatter) erstellen, indem Sie auf den vorhandenen aufbauen.

## Duration Formatter {#durationformatter}

Die Methode **gantt.ext.formatters.durationFormatter(config)** erzeugt eine neue *DurationFormatter*-Instanz.

###**Konfiguration**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - erstellt einen Duration Formatter
    - **_config?_** - (*object*) - optionales Konfigurationsobjekt mit folgenden Optionen:
        - **_enter?_** - (*string*) - legt das Standardformat fest, das von der **parse**-Methode verwendet wird, wenn die Eingabe keine Einheit enthält. Standard ist "day".
        - **_store?_** - (*string*) - definiert das Format, in dem Dauerwerte im Gantt gespeichert werden. Dies beeinflusst die Ausgabe der **parse**-Methode. Standard ist "hour".
        - **_format?_** - (*string | Array &lt;string&gt;*) - legt das Ausgabeformat fest. Unterstützte Werte sind "auto", "minute", "hour", "day", "week", "month", "year" oder ein Array dieser Werte. "auto" bedeutet, dass das Format je nach Wertgröße automatisch gewählt wird (größere Werte nutzen Tage/Monate/Jahre, kleinere Minuten/Stunden).
        - **_short?_** - (*boolean*) - aktiviert kurze Bezeichnungen (Abkürzungen) für Zeiteinheiten. Standard ist *false*.
        - **_minutesPerHour?_** - (*number*) - steuert die Umrechnung zwischen Minuten und Stunden. Standard ist 60.
        - **_hoursPerDay?_** - (*number*) - steuert die Umrechnung zwischen Stunden und Tagen. Standard ist 8.
        - **_hoursPerWeek?_** - (*number*) - steuert die Umrechnung zwischen Stunden und Wochen. Standard ist 40.
        - **_daysPerMonth?_** - (*number*) - steuert die Umrechnung zwischen Tagen und Monaten. Standard ist 30.
        - **_daysPerYear?_** - (*number*) - steuert die Umrechnung zwischen Tagen und Jahren. Standard ist 365.
        - **_labels?_** - (*object*) - legt Textbezeichnungen für verschiedene Zeiteinheiten fest, die beim Parsen und Formatieren verwendet werden:
            - **_minute?_** - (*object*) - Bezeichnungen für Minuten
                - **_full?_** - (*string*) - vollständige Bezeichnung für Minuten
                - **_plural?_** - (*string*) - Pluralbezeichnung für Minuten
                - **_short?_** - (*string*) - Kurzbezeichnung für Minuten
            - **_hour?_** - (*object*) - Bezeichnungen für Stunden
                - **_full?_** - (*string*) - vollständige Bezeichnung für Stunden
                - **_plural?_** - (*string*) - Pluralbezeichnung für Stunden
                - **_short?_** - (*string*) - Kurzbezeichnung für Stunden
            - **_day?_** - (*object*) - Bezeichnungen für Tage
                - **_full?_** - (*string*) - vollständige Bezeichnung für Tage
                - **_plural?_** - (*string*) - Pluralbezeichnung für Tage
                - **_short?_** - (*string*) - Kurzbezeichnung für Tage
            - **_week?_** - (*object*) - Bezeichnungen für Wochen
                - **_full?_** - (*string*) - vollständige Bezeichnung für Wochen
                - **_plural?_** - (*string*) - Pluralbezeichnung für Wochen
                - **_short?_** - (*string*) - Kurzbezeichnung für Wochen
            - **_month?_** - (*object*) - Bezeichnungen für Monate
                - **_full?_** - (*string*) - vollständige Bezeichnung für Monate
                - **_plural?_** - (*string*) - Pluralbezeichnung für Monate
                - **_short?_** - (*string*) - Kurzbezeichnung für Monate
            - **_year?_** - (*object*) - Bezeichnungen für Jahre
                - **_full?_** - (*string*) - vollständige Bezeichnung für Jahre
                - **_plural?_** - (*string*) - Pluralbezeichnung für Jahre
                - **_short?_** - (*string*) - Kurzbezeichnung für Jahre

**Beispiele:**

Einen Duration Formatter mit Standardeinstellungen erstellen:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// eine Formatter-Instanz wird mit der Factory-Methode erstellt
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // wird als 1 Tag interpretiert, wenn enter:"day" (Standard)
formatter.parse("1"); // wird als 1 Stunde interpretiert, wenn enter:"hour"
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // wird als 8 gespeichert, wenn store:"hour"
formatter.parse("1 day"); // wird als 480 gespeichert, wenn store:"minute"
~~~

- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // gibt "4 hours 20 minutes" aus

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// gibt "4.33 hours" aus
~~~

- **_short_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: false /*!*/    
}).format(10021); //"4 weeks 7 hours 1 minute"
 
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: true     /*!*/
}).format(10021); //"4wk 7h 1min"
~~~

Beispiel mit vollständiger Konfiguration:
~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    // Standardwerte
    enter: "day",
    store: "hour",
    format: "auto",
    short: false,
    minutesPerHour: 60,
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30,
    daysPerYear: 365,
    labels: {
        minute: {
            full: "minute",
            plural: "minutes",
            short: "min"
        },
        hour: {
            full: "hour",
            plural: "hours",
            short: "h"
        },
        day: {
            full: "day",
            plural: "days",
            short: "d"
        },
        week: {
            full: "week",
            plural: "weeks",
            short: "wk"
        },
        month: {
            full: "month",
            plural: "months",
            short: "mon"
        },
        year: {
            full: "year",
            plural: "years",
            short: "y"
        }
    }
});
~~~

###**API**

Die *DurationFormatter*-Instanz stellt folgende Methoden bereit:

- <span class="submethod">**canParse (value): boolean**</span> - prüft, ob ein String in einen Dauerwert geparst werden kann; gibt *true* zurück, wenn ja, andernfalls *false*
    - **_value_** - (*string*) - der zu prüfende String

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - wandelt einen Dauerwert in einen formatierten String um
    - **_value_** - (*number*) - der zu konvertierende Dauerwert

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// Ausgabe: 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - parst einen String in einen Dauerwert oder gibt 'null' zurück, falls das Parsen fehlschlägt
    - **_value_** - (*string*) - der zu parsende String

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// Ausgabe: 8
~~~

Weitere Details zu **durationFormatter** finden Sie im Artikel [Work Time Calculation](guides/working-time.md#taskdurationindecimalformat).

## Link Formatter {#linkformatter}

Die Methode **gantt.ext.formatters.linkFormatter(config)** erstellt eine neue *LinkFormatter*-Instanz. Sie teilt sich einige Methoden und Konfigurationen mit dem Duration Formatter.

###**Konfiguration**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - erstellt einen Link Formatter
    - **_config?_** - (*object*) - optionales Konfigurationsobjekt mit folgenden Optionen:
        - **_durationFormatter?_** - (*DurationFormatter*) - eine Instanz, die mit *gantt.ext.formatters.durationFormatter()* erstellt wurde und beeinflusst, wie Lag-/Lead-Werte geparst und formatiert werden.
        - **_labels?_** - (*object*) - Bezeichnungen für verschiedene Linktypen:
            - **_finish_to_start?_** - (*string*) - Bezeichnung für Finish to Start-Links
            - **_start_to_start?_** - (*string*) - Bezeichnung für Start to Start-Links
            - **_finish_to_finish?_** - (*string*) - Bezeichnung für Finish to Finish-Links
            - **_start_to_finish?_** - (*string*) - Bezeichnung für Start to Finish-Links

**Beispiele:**

Einen Link Formatter mit Standardeinstellungen erstellen:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// eine Formatter-Instanz wird mit der Factory-Methode erstellt
~~~

- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
// Ausgabe: "1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
// Ausgabe: "1FF-1d"
~~~

- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    // Standardwerte
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~

###**API**

Die *LinkFormatter*-Instanz bietet folgende Methoden:

- <span class="submethod">**canParse (value): boolean**</span> - prüft, ob ein String in ein Link-Objekt geparst werden kann; gibt *true* zurück, wenn ja, andernfalls *false*
    - **_value_** - (*string*) - der zu prüfende String

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - wandelt ein Link-Objekt in einen String um
    - **_link_** - (*Link*) - das zu konvertierende Link-Objekt

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
// Ausgabe: "1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - parst einen String in ein Link-Objekt oder gibt 'null' zurück, falls das Parsen fehlschlägt. Beachten Sie, dass *link.target* im geparsten Objekt auf "null" gesetzt wird.
    - **_value_** - (*string*) - der zu parsende String

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// Ausgabe: {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

###**Formatinformationen**

Der *LinkFormatter* arbeitet mit zwei Link-Formaten:

 - **$(WBS)** - Kurzformat
   - **$(WBS)** - [Aufgaben-WBS-Code](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - Komplettformat
   - **$(WBS)** - [Aufgaben-WBS-Code](api/method/getwbscode.md)
   - **$(TYPE)** - [Linktyp](api/config/links.md). **Unterstützte Werte:** 'FF', 'FS', 'SS', 'SF' oder wie in der **labels**-Konfiguration des *LinkFormatter* definiert.
   - **$(LAG)** - [Link-Lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). Dies kann positiv oder negativ sein, wie **+1 day** oder **-1 day**. Das unterstützte Format hängt vom **durationFormatter**-Parameter ab, der dem *LinkFormatter*-Konstruktor übergeben wird.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

Finish-to-Start-Links ohne Lag oder Lead werden im Kurzformat angezeigt, während andere Links das Komplettformat nutzen. Ebenso nimmt der Formatter beim **parse**-Aufruf mit nur einem Aufgaben-WBS-Code an, dass es sich um einen Finish-to-Start-Typ mit Lag 0 handelt.

Weitere Details zur Methode linkFormatter finden Sie im Artikel [Inline Editing in Grid](guides/inline-editing.md#linkformatter).


## Eigener Formatter {#customformatter}

Das Gantt-Tool ermöglicht es, eigene Formatter auf Basis der integrierten Formatter zu erstellen. Sie können diese benutzerdefinierten Formatter dem Inline-Editor hinzufügen. Intern speichert Gantt die Daten im erwarteten Format, aber wenn ein Benutzer den Inline-Editor öffnet, wird der Wert im bevorzugten Format angezeigt.

Ein eigener Formatter ist ein Objekt mit zwei Funktionen: **format()** und **parse()**.

Die **format()**-Funktion wandelt eine Zahl (für einen eigenen durationFormatter) oder einen Link (für einen eigenen linkFormatter) in den gewünschten Anzeige-Wert um. Die **parse()**-Funktion konvertiert diesen formatierten Wert wieder in eine Zahl oder ein Link-Objekt.

So sehen eigene Formatter typischerweise aus:

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // Code zur Umwandlung von Zahl in den gewünschten Wert
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // Code zur Umwandlung vom gewünschten Wert in eine Zahl
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // Code zur Umwandlung vom Link-Objekt in den gewünschten Wert
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // Code zur Umwandlung vom gewünschten Wert in das `link`-Objekt
        return link
    }
};
~~~

Es ist möglich, bestehende Formatter in eigenen Formattern zu verwenden und deren Ausgaben nach Bedarf anzupassen.

Sie weisen eigene Formatter Inline-Editoren genauso zu wie die Standard-Formatter. Zum Beispiel:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

Hier ein Beispiel für eigene Duration- und Link-Formatter:

**Related example:** [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)

## Eigene Regeln für Pluralformen

Der Standard-[Duration Formatter](guides/formatters-ext.md#durationformatter) ist darauf ausgelegt, englische Pluralformen zu verarbeiten, bei denen meist nur ein Suffix angehängt oder das Substantiv geringfügig geändert wird.

Andere Sprachen haben oft mehrere Pluralformen und unterschiedliche Regeln, wann welche Form verwendet wird. Um dies zu berücksichtigen, können Sie einen eigenen Formatter erstellen, der die korrekten Regeln für Ihre Sprache anwendet. Das folgende Beispiel zeigt, wie diese Regeln für Japanisch umgesetzt werden können:

**Related example:** [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)

