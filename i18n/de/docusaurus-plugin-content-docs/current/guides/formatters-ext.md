---
title: "Formatters-Erweiterung"
sidebar_label: "Formatters-Erweiterung"
---

# Formatters-Erweiterung

:::note
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Die **gantt.ext.formatters** Erweiterung bietet zwei Formatierungs-Methoden:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

Sie können auch einen [benutzerdefinierten Formatter](#customformatter) basierend auf den bestehenden verwenden.

## Dauer-Formatter {#durationformatter}

Die **gantt.ext.formatters.durationFormatter(config)**-Methode gibt eine neue Instanz des *DurationFormatter* zurück.

### **Konfiguration**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - erstellt einen Duration Formatter
- **_config?_** - (*object*) - optional, ein Konfigurationsobjekt, das die folgenden Attribute enthalten kann:
    - **_enter?_** - (*string*) - legt das Standardformat für die **parse**-Methode fest, das verwendet wird, wenn ein Eingabewert ohne Einheiten eingegeben wird. Standardwert: "day".
    - **_store?_** - (*string*) - legt das Format für die Speicherung von Dauerwerten im Gantt fest. Diese Eigenschaft beeinflusst den Ausgabewert der **parse**-Methode. Standardwert: "hour".
    - **_format?_** - (*string | Array &lt;string&gt;*) - legt das Format für den Ausgabewert fest. Unterstützte Werte: "auto", "minute", "hour", "day", "week", "month", "year", oder ein Array, das beliebige dieser Werte enthalten kann. Der Wert "auto" bedeutet, dass der Formatter versucht, eine geeignete Einheit basierend auf dem übergebenen Wert auszuwählen (d. h. größere Werte werden als Tage/Monate/Jahre formatiert, kleinere Werte als Minuten/Stunden).
    - **_short?_** - (*boolean*) - setzt kurze Bezeichnungen (Abkürzungen) für Zeiteinheiten. Standardwert: *false*
    - **_minutesPerHour?_** - (*number*) - definiert, wie Durationswerte von Minuten nach Stunden und umgekehrt konvertiert werden. Standardwert: 60
    - **_hoursPerDay?_** - (*number*) - definiert, wie Durationswerte von Stunden in Tage und umgekehrt konvertiert werden. Standardwert: 8
    - **_hoursPerWeek?_** - (*number*) - definiert, wie Durationswerte von Stunden in Wochen und umgekehrt konvertiert werden. Standardwert: 40
    - **_daysPerMonth?_** - (*number*) - definiert, wie Durationswerte von Tagen in Monate und umgekehrt konvertiert werden. Standardwert: 30
    - **_daysPerYear?_** - (*number*) - definiert, wie Durationswerte von Tagen in Jahre und umgekehrt konvertiert werden. Standardwert: 365
    - **_labels?_** - (*object*) - definiert Textbeschriftungen für verschiedene Zeiteinheiten. Diese Beschriftungen werden sowohl für geparste als auch formatierte Werte verwendet. 
        - **_minute?_** - (*object*) - Konfiguration für Minuten
            - **_full?_** - (*string*) - vollständige Textbezeichnung für Minuten
            - **_plural?_** - (*string*) - Plural-Textbezeichnung für Minuten
            - **_short?_** - (*string*) - kurze Textbezeichnung für Minuten
        - **_hour?_** - (*object*) - Konfiguration für Stunden
            - **_full?_** - (*string*) - vollständige Textbezeichnung für Stunden
            - **_plural?_** - (*string*) - Plural-Textbezeichnung für Stunden
            - **_short?_** - (*string*) - kurze Textbezeichnung für Stunden
        - **_day?_** - (*object*) - Konfiguration für Tage
            - **_full?_** - (*string*) - vollständige Textbezeichnung für Tage
            - **_plural?_** - (*string*) - Plural-Textbezeichnung für Tage
            - **_short?_** - (*string*) - kurze Textbezeichnung für Tage
        - **_week?_** - (*object*) - Konfiguration für Wochen
            - **_full?_** - (*string*) - vollständige Textbezeichnung für Wochen
            - **_plural?_** - (*string*) - Plural-Textbezeichnung für Wochen
            - **_short?_** - (*string*) - kurze Textbezeichnung für Wochen
        - **_month?_** - (*object*) - Konfiguration für Monate
            - **_full?_** - (*string*) - vollständige Textbezeichnung für Monate
            - **_plural?_** - (*string*) - Plural-Textbezeichnung für Monate
            - **_short?_** - (*string*) - kurze Textbezeichnung für Monate
        - **_year?_** - (*object*) - Konfiguration für Jahre
            - **_full?_** - (*string*) - vollständige Textbezeichnung für Jahre
            - **_plural?_** - (*string*) - Plural-Textbezeichnung für Jahre
            - **_short?_** - (*string*) - kurze Textbezeichnung für Jahre


**Beispiele:**

Initialisierung des Duration Formatter mit den Standard-Einstellungen:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// eine Instanz des Formatter-Objekts wird mittels der Factory-Methode erstellt
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // eingegebener Wert: 1 day - falls enter:"day" (Standard)
formatter.parse("1"); // eingegebener Wert: 1 hour - falls enter:"hour"
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // gespeicherter Wert: 8 - falls store:"hour"
formatter.parse("1 day"); // gespeicherter Wert: 480 - store:"minute" 
~~~


- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // 4 hours 20 minutes

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// 4.33 hours
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


Beispiel der vollständigen Konfiguration:
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

### **API**

Die erstellte Instanz des *DurationFormatter* bietet die folgenden Methoden:

- <span class="submethod">**canParse (value): boolean**</span> - gibt *true* zurück, wenn der übergebene String in den Dauerwert geparst werden kann, andernfalls - gibt *false* zurück
    - **_value_** - (*string*) - der String, der überprüft wird


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - wandelt den übergebenen Dauerwert in den Dauerstring um
    - **_value_** - (*number*) - der zu konvertierende Dauerwert


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - parst den übergebenen String in den Dauerwert. Falls der Wert nicht geparst werden kann, wird 'null' zurückgegeben
    - **_value_** - (*string*) - der zu konvertierende String


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 8
~~~

Lesen Sie Details zur **durationFormatter**-Methode im Artikel [Work Time Calculation](guides/working-time.md#taskdurationindecimalformat).

## Link-Formatter {#linkformatter}

Die **gantt.ext.formatters.linkFormatter(config)**-Methode gibt eine neue Instanz des *LinkFormatter* zurück. Sie verwendet einige Methoden und die Konfiguration des Duration Formatter

### **Konfiguration**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - erstellt einen Link Formatter
- **_config?_** - (*object*) - optional, ein Konfigurationsobjekt, das die folgenden Attribute enthalten kann:
    - **_durationFormatter?_** - (*DurationFormatter*) - eine Instanz des *DurationFormatter*, erstellt durch die *gantt.ext.formatters.durationFormatter()*. Sie beeinflusst, wie Lag/Lead-Werte von Links analysiert und formatiert werden:
    - **_labels?_** - (*object*) - Lokalisierte Bezeichnungen für verschiedene Link-Typen
        - **_finish_to_start?_** - (*string*) - Beschriftungen für Finish-to-Start-Verknüpfungen
        - **_start_to_start?_** - (*string*) - Beschriftungen für Start-to-Start-Verknüpfungen
        - **_finish_to_finish?_** - (*string*) - Beschriftungen für Finish-to-Finish-Verknüpfungen
        - **_start_to_finish?_** - (*string*) - Beschriftungen für Start-to-Finish-Verknüpfungen

**Beispiele:**


Initialisierung des Link-Formatters mit Standard-Einstellungen:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// eine Instanz des Formatter-Objekts wird mittels der Factory-Methode erstellt
~~~

- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
//"1FF-1d"
~~~


- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    //default values
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~


### **API**

Die erstellte Instanz des *LinkFormatter* bietet die folgenden Methoden:

- <span class="submethod">**canParse (value): boolean**</span> - gibt *true* zurück, wenn der übergebene String in das Link-Objekt geparst werden kann, andernfalls - gibt *false*
    - **_value_** - (*string*) - der String, der überprüft wird

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - wandelt den übergebenen Link-Wert in den String um
    - **_value_** - (*Link*) - das Link-Objekt, das konvertiert wird

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - parst den übergebenen String in das Link-Objekt. Falls der Wert nicht geparst werden kann, wird 'null' zurückgegeben. Beachten Sie, dass *link.target* des gegebenen Links den Wert null haben kann
    - **_value_** - (*string*) - der zu konvertierende String


~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

### **Format-Informationen**

Der *LinkFormatter* unterstützt zwei Formate von Verknüpfungen:

 - **$(WBS)** - kurzes Format
   - **$(WBS)** - [Task-WBS-Code](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - vollständiges Format
   - **$(WBS)** - [Task-WBS-Code](api/method/getwbscode.md)
   - **$(TYPE)** - [link type](api/config/links.md). **Unterstützte Werte:** 'FF', 'FS', 'SS', 'SF', oder wie im **labels**-Konfig des *LinkFormatter* definiert.
   - **$(LAG)** - [link lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). Sein Wert kann positiv oder negativ sein - **+1 day**, **-1 day**. Das unterstützte Format wird durch den **durationFormatter**-Parameter festgelegt, der in den Konstruktor des *LinkFormatter* übergeben wird.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

Finish-To-Start-Verknüpfungen ohne Lag/Vorsprung werden mit dem kurzen Format formatiert, während andere Verknüpfungen mit dem vollständigen Format formatiert werden.
Analog dazu nimmt der Formatter bei Übergabe nur des WBS-Codes einer Aufgabe im **parse**-Aufruf den Typ Finish-to-Start und eine Lag von Null an.

Lesen Sie Details zur Methode linkFormatter im Artikel [Inline Editing in Grid](guides/inline-editing.md#linkformatter).


## Benutzerdefinierter Formatter {#customformatter}

Die Gantt-Funktionalität ermöglicht es Ihnen, basierend auf den bestehenden Gantt-Formatierern einen benutzerdefinierten Formatter zu erstellen. Sie können einen benutzerdefinierten Formatter dem Inline-Editor hinzufügen. Unter der Haube speichert Gantt Daten in dem Format, das er erwartet, während beim Öffnen des Inline-Editors dem Benutzer der Wert angezeigt wird, den er benötigt.

Ein benutzerdefinierter Formatter ist ein Objekt mit zwei Funktionen: **format()** und **parse()**.

Die **format()**-Funktion wandelt entweder eine Zahl (benutzerdefinierter Dauer-Formatter) oder einen Link (benutzerdefinierter Link-Formatter) in den benötigten Wert um. Die **parse()**-Funktion wandelt einen formatierten Wert entweder in eine Zahl (benutzerdefinierter Dauer-Formatter) oder in einen Link (benutzerdefinierter Link-Formatter) um.

So sehen benutzerdefinierte Formatter aus: 

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // Code zum Umwandeln von Zahl in den gewünschten Wert
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // Code zum Umwandeln vom gewünschten Wert in eine Zahl
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // Code zum Umwandeln des Link-Objekts in den gewünschten Wert
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // Code zum Umwandeln vom gewünschten Wert in das `link`-Objekt
        return link
    }
};
~~~

Sie können die bestehenden Formatter in den benutzerdefinierten Formatter verwenden und die Werte, die sie zurückgeben, entsprechend anpassen.

Benutzerdefinierte Formatter werden für die Inline-Editoren auf dieselbe Weise angegeben wie die üblichen Formatter. Beispiel:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

Hier ist ein Beispiel für benutzerdefinierte Dauer- und Link-Formatter:

Zugehöriges Beispiel [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)

## Benutzerspezifische Regeln für Mehrzahlformen 

Die Konfiguration des Standard- [Duration Formatter](guides/formatters-ext.md#durationformatter) ermöglicht es, nur eine Form für die Mehrzahl eines Nomens zu verwenden, da im Englischen die Mehrzahl durch Anhängen eines Suffix oder durch Veränderung des Nomens selbst gebildet wird.

In anderen Sprachen kann ein Wort mehrere Varianten der Mehrzahlform haben. Darüber hinaus können verschiedene Regeln für die Verwendung unterschiedlicher Mehrzahlformen gelten. 
Sie können einen benutzerdefinierten Formatter verwenden und die Regeln für Ihre Sprache festlegen. Im folgenden Beispiel wird gezeigt, wie Sie die entsprechenden Regeln in einem benutzerdefinierten Formatter für die japanische Sprache anwenden können:

Zugehöriges Beispiel [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)