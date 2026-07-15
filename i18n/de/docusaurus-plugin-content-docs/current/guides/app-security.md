---
title: "Anwendungssicherheit"
sidebar_label: "Anwendungssicherheit"
---

# Anwendungssicherheit

DHTMLX Gantt ist eine clientseitige JavaScript-Bibliothek, die darauf ausgelegt ist, die Gantt-Funktionalität nahtlos in verschiedene Webanwendungen zu integrieren. Daher schränken wir die funktionalen Möglichkeiten unseres Gantt nicht ein, da sie die Sicherheit der Anwendung erhöhen könnten, aber gleichzeitig die verfügbaren Optionen verringern würden. So können Sie die meisten Gantt-Funktionen entsprechend Ihren Projektanforderungen anpassen.

Allerdings sollten Sie beachten, dass DHTMLX Gantt von sich aus keinerlei Mittel zum Schutz Ihrer Anwendung vor Bedrohungen wie SQL-Injektionen oder XSS- und CSRF-Angriffen bereitstellt. Es liegt also an Ihnen, die Sicherheit Ihres Projekts durch die notwendigen Konfigurationseinstellungen sicherzustellen. In diesem Artikel finden Sie relevante Informationen und Empfehlungen zur HTML-Sanitisierung.

## Grundlegende Sicherheitsmaßnahmen

Obwohl Cybersicherheit eine komplexe Disziplin ist und nicht wirklich durch eine einzelne Schritt-für-Schritt-Anleitung abgedeckt werden kann, empfehlen wir, den praktischen Schritten zu folgen, die die Grundlagen abdecken und dabei helfen, die häufigsten Bedrohungen zu mildern.

**1. Verwenden Sie Content Security Policy (CSP) in Ihrer Anwendung**

Das Hinzufügen eines CSP-Headers, so einfach wie der folgende, verhindert, dass XSS-Code in Ihrer Anwendung ausgeführt wird:

~~~
Content-Security-Policy: script-src 'self'
~~~

Ihre Anwendung könnte eine komplexere Policy erfordern, aber das Deaktivieren der Ausführung von Inline-Skripten würde eine große Anzahl von XSS- und CSRF-Angriffen verhindern.

**2. Benutzereingaben auf dem Backend vor dem Speichern in der Datenbank sanitisieren**

Wenn Sie einen neuen Datensatz einfügen, speichern Sie Werte nicht unverändert:

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

Sie möchten sicherstellen, dass sie dem erwarteten Format entsprechen und potenziell schädliche Inhalte entfernen.
Wenn Sie Node.js verwenden, lässt sich dies mit einer Vielzahl verfügbarer Bibliotheken erreichen, zum Beispiel [DOMPurify](https://www.npmjs.com/package/dompurify):

~~~
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
        .map((input) => DOMPurify.sanitize(input)))
~~~

**3. HTML-Entities vor der Renderung von Daten escapen**

Wenn Sie nicht möchten, dass anzeigbare Werte HTML-Markup enthalten, das während der Renderung ausgeführt wird, stellen Sie sicher, dass HTML-Zeichen, die Benutzer eingegeben haben, vor der Einspeisung in Gantt escaped werden. Hier ist ein Beispiel der Verwendung der [validator](https://www.npmjs.com/package/validator)-Bibliothek:

~~~
const validator = require('validator');
...

// GET /data

Promise.all([
  db.query("SELECT * FROM gantt_tasks"),
  db.query("SELECT * FROM gantt_links")
]).then(results => {
    let tasks = results[0],
        links = results[1];
 
    tasks.forEach((task) => {
        Object.entries(task).forEach(([key, value]) => {
            if(typeof value === "string") {
                task[key] = validator.escape(value); //#! 
            }
        });
        task.open = true;
        task.start_date = task.start_date.format("YYYY-MM-DD hh:mm:ss");
    });

    links.forEach((link) => {
        Object.entries(link).forEach(([key, value]) => {
            if(typeof value === "string") {
                link[key] = validator.escape(value); //#! 
            }
        });
    });
    
 
    res.send({
        tasks,
        links 
   });
~~~

**4. Wenn Sie mit SQL-Datenbanken arbeiten, vermeiden Sie das Erstellen von SQL-Abfragen durch das Verketten von Zeichenkettenwerten. Verwenden Sie parametrisierte Abfragen, ORM oder Query Builder stattdessen**

Dieses Punkt betrifft Arten von SQL-Injektionen. Grundsätzlich sollten Sie niemals unescaped oder unvalidierte Benutzereingaben in SQL-Abfragen verwenden. Wenn Sie feststellen, dass Sie dies tun, erwägen Sie, Ihren Code mithilfe parametrischer Abfragen umzuschreiben oder Escape-Funktionen zu verwenden, die vom von Ihnen verwendeten SQL-Anbieter unterstützt werden.

**5. Zuletzt: Konsultieren Sie einen Cybersicherheitsexperten und befolgen Sie die Sicherheitsrichtlinien Ihres Unternehmens**

Die Sicherheitsarbeit ist nie vollständig abgeschlossen, aber durch die Umsetzung dieser Schritte, das Befolgen Ihrer Unternehmensrichtlinien und die Überprüfung Ihrer Arbeit durch einen Sicherheitsspezialisten vermeiden Sie die Mehrheit der Bedrohungen, die im Web auftreten können.

Nun, da die Grundlagen abgedeckt sind, gehen wir zu den gattungsspezifischen Dingen über, die für Gantt gelten.

## Verwundbare Gantt-Bereiche auf der Client-Seite

Zuerst möchten wir drei Punkte hervorheben, wenn komplexe Funktionalitäten wie Gantt auf der Client-Seite integriert werden:

- DHTMLX Gantt ist eine clientseitige Bibliothek, daher gelangen alle vom Server geladenen Daten in Gantt in ihrer ursprünglichen Form.
Da der Datensatz serverseitig gespeichert wird, besteht die Hauptbedrohung für Ihre App dort. Den Backend zu schützen geht jedoch über DHTMLX Gantt hinaus.
- Cyberkriminelle könnten Endbenutzer dazu bringen, mithilfe der DevTools schädlichen Code auszuführen (Self-XSS), wodurch sämtliche Sicherheitsmechanismen umgangen würden. Jeglicher Code, der in den Text der Aufgabe eingefügt wird, funktioniert genauso wie wenn die DevTools verwendet werden.
- Wenn ein Angreifer Zugriff auf das Gantt-Instanz-Objekt erhält, werden alle Schutzmaßnahmen wirkungslos. In diesem Fall können Angreifer die Gantt-Konfiguration nach Belieben ändern und sie vollständig kontrollieren.

Nun kommen wir zur Liste verwundbarer Bereiche von DHTMLX Gantt, in denen potenzielle Sicherheitsprobleme auftreten können:

- Die vom Endbenutzer eingegebenen und gespeicherten Daten
- Die angezeigten Gantt-Daten (Textinhalte, verschiedene visuelle Elemente)
- [custom HTML elements](guides/export.md#exporting-html-elements), die irgendwie mit Gantt-Daten interagieren
- Der Zugriff auf das Gantt-Objekt

Lassen Sie uns zur praktischen Betrachtung dieser potenziellen Probleme übergehen.

## Zugriff auf Gantt isolieren

Wenn es um mögliche Maßnahmen zum Schutz von Gantt geht, besteht das Erste, was Sie tun müssen, darin, Gantt davor zu isolieren, über andere gehackte Komponenten oder durch missverständliche Benutzer (Self-XSS) illegal darauf zuzugreifen.

:::note
Sollte ein Angreifer Zugriff auf die Konfigurationsdateien der App (einschließlich der Gantt-Konfigurationsdatei) erhalten, können jegliche Schutzmaßnahmen gegen XSS-Angriffe (falls vorhanden) unwirksam werden, daher betrachten wir dieses Szenario nicht.
:::

Wenn die Anwendung vollständig geladen ist und das Gantt-Instanz-Objekt von Angreifern verwendet wird, können sie buchstäblich alles in Gantt verändern und alle Funktionen neu definieren. Daher sollten Sie wissen, wie Sie Gantt in Ihrem Projekt isolieren.

Dafür müssen Sie eine separate Gantt-Instanz in einer Funktion erstellen. Das Ziel ist, Code, der innerhalb der Funktion läuft, außerhalb der Funktion unzugänglich zu machen.

Darüber hinaus erstellt Gantt standardmäßig eine neue Instanz im *gantt*-Objekt. Es ist wichtig, innerhalb der Funktion eine neue Variable zu deklarieren, entweder mit dem Schlüsselwort *const* oder *let*, damit sie außerhalb der Funktion nicht zugänglich ist und die Gantt-Instanz sicher in dieser Variablen platziert wird.

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Sie können auch einen anderen Namen für die Gantt-Instanz verwenden, um Verwechslungen mit dem gantt-Objekt zu vermeiden:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Nachdem Sie sichergestellt haben, dass Gantt vor unerwünschtem Zugriff geschützt ist, sollten Sie darauf achten, wie Daten in der Gantt-Diagramm eingegeben und angezeigt werden.

## Eingabe von Daten in der Gantt

Dies ist eine heikle Stelle, die von Cyberkriminellen genutzt werden könnte, um die Sicherheit der Gantt-Anwendung zu kompromittieren.

Dateneingabebereiche gelten als Hauptziele von XSS-Angriffen. In unserer Gantt-Komponente ist es möglich, Daten über:

- Lightbox
- Inline-Editoren
- Modalbox mit benutzerdefinierten Elementen
- Drittanbieter-Bibliotheken
- Ressourcen-Zuweisungen im Ressourcen-Load-Timeline
- Weitere Ebenen (falls sie benutzerdefinierte Elemente enthalten, in denen Daten eingegeben werden können)
- Jede benutzerdefinierte Lösung, die die Gantt-API verwendet und eine Dateneingabe erfordert (z. B. eine Symbolleiste oder ein benutzerdefiniertes Formular zum Bearbeiten von Aufgaben)

das Aufgabenobjekt hat [viele verschiedene Parameter](guides/task-properties.md), die je nach aktivierten Funktionen verwendet werden. Je mehr Parameter bearbeitet werden können, desto mehr Parameter sollten bei der Eingabe von Daten sanitisiert werden.

### Ein Beispiel betrachten

Wir haben ein Beispiel vorbereitet, das verschiedene Schritte demonstriert, wie Sie den Schutz gegen XSS-Angriffe durch HTML-Sanitisierung bei der Verwendung von DHTMLX Gantt verbessern können.

**Zugehöriges Sample**: [Beispiel zur Verhinderung von XSS-Angriffen (Security, CSP)](https://snippet.dhtmlx.com/cdy9p0yl)

In unserem Beispiel können Sie den Namen der Aufgabe bearbeiten, Datum und Dauer ändern, Ressourcen-Zuweisungen modifizieren und Textnotizen hinzufügen.
Sie können den Starttermin und die Dauer nur über die Lightbox und Inline-Editoren ändern. In Inline-Editoren werden die Typen **date** und **number** ausdrücklich vorgesehen.
In der Lightbox können Sie nur die Dauer festlegen, während das Datum aus der Dropdown-Liste ausgewählt werden muss.

In beiden Fällen ist es unmöglich, Text mit schädlichem Code in diese UI-Elemente einzufügen.
Wenn Sie versuchen, den Typ von Elementen über den DOM-Elementen-Inspector zu ändern, erhalten Sie ungültige Werte für Datum oder Dauer.
Dies führt zu einem Fehler, und Gantt kann nicht weiterarbeiten, bis die Seite neu geladen wird. Gleichzeitig werden die Daten nicht an den Server gesendet, da sie nicht neu gezeichnet werden.

Wir verwenden jedoch den **string**-Werttyp für Aufgabennamen, der eine potenzielle Angriffsfläche für XSS darstellen kann.
Daher müssen Sie den eingegebenen Wert sanitieren. In unserem Beispiel sehen Sie nur eine Variante eines XSS-Angriffs und einen Weg zu dessen Verhinderung.

![](/img/preventing_xss_attack.png)

In einem echten Projekt müssen Sie alle möglichen Daten-Sanitierungsoptionen hinzufügen. In unserem Fall ersetzen wir einfach die Zeichen "\<" und "\>" durch die entsprechenden HTML-Entities – **`&lt;`** und **`&gt;`**.
Damit schließen wir die Möglichkeit aus, HTML-Elemente im Text der Aufgabe anzuzeigen.

Die oben beschriebene Ersetzung von Symbolen ist in der Funktion **sanitizeText()** implementiert, wie folgt:

~~~js
function sanitizeText(text){
    // unkommentieren, um XSS zu testen
    // return text

    // XSS verhindern, indem HTML-Elemente deaktiviert werden
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

Diese Funktion wird in Ereignis-Handlern aufgerufen: im **onLightboxSave** für die Lightbox und im **onBeforeSave** für Inline-Editoren.

In unserem Sample können Sie auch Textnotizen zu einer Aufgabe hinzufügen, entweder mit einem benutzerdefinierten Inline-Editor oder einem benutzerdefinierten Lightbox-Abschnitt.
In beiden Fällen kann die Sanitatisierung innerhalb der Funktionen dieser benutzerdefinierten Objekte implementiert werden
(vor dem Rendern der Werte und bevor Änderungen aus den DOM-Elementen übernommen werden):

~~~js
// für einen Inline-Editor:
set_value: function(value, id, column, node){
    node.firstChild.value = sanitizeText(value || "");
},
get_value: function(id, column, node){
    return sanitizeText(node.firstChild.value);
},

// für die Lightbox:
set_value: function(node, value, task){
    node.value = sanitizeText(value || "");
},
get_value: function(node, task){
    return sanitizeText(node.value);
},
~~~

Doch die Arbeit mit Textnotizen lässt sich leichter über die Event-Handler **onLightboxSave** und **onBeforeSave** steuern:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new){
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    return true;
});

protectedGantt.ext.inlineEditors.attachEvent("onBeforeSave", function(state){
    if (state.columnName == "notes") {
        state.newValue = sanitizeText(state.newValue);
    }
    return true;
});
~~~

Sie können auch Ressourcen-Zuweisungen in der Lightbox vornehmen. Da Gantt eingegebene Werte nicht ausschließlich auf den **number**-Typ beschränkt, ist auch die Verwendung von Zeichenkettenwerten möglich, was eine potenzielle XSS-Angriffsfläche eröffnet.

Ressourcenwerte werden in die Eigenschaft einer Aufgabe geschrieben, daher durchläuft die Funktion **sanitizeResourceValues()** alle diese Werte
und säubert die Zuweisungswerte der Ressource mit der Funktion **sanitizeText()**:

~~~js
function sanitizeResourceValues(task){
    const resources = task[protectedGantt.config.resource_property];
    if (resources && resources.length) {
        resources.forEach(function (resource) {
               if (typeof resource.value == "string") {
                resource.value = sanitizeText(resource.value);
            }
        })
       }
}
~~~

Die Funktion **sanitizeResourceValues()** wird im Ereignis-Handler **onLightboxSave** aufgerufen:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*Wenn Sie andere String-Parameter in Ihrer Gantt-Konfiguration verwenden, sollten diese ebenfalls sanitisiert werden*.

In unserem Beispiel, falls Sie versuchen, unerwünschte Inhalte in Ressourcen-Zuweisungen im Ressourcen-Timeline einzufügen, werden nur numerische Werte akzeptiert. Bei der Verwendung anderer Wertetypen werden die Änderungen nicht gespeichert.

### Eingabe von Daten über Tools von Drittanbietern

Unsere Gantt-Komponente bietet viele Anpassungsmöglichkeiten, einschließlich der Möglichkeit, Aufgaben mit Hilfe von Formularen, Tools und Bibliotheken von Drittanbietern zu bearbeiten.
In diesem Fall wird die Gantt-API zum Arbeiten mit Aufgaben verwendet. In solchen Szenarien ist es schwer, universelle Empfehlungen zum Sanitizen von Daten zu geben, da alles davon abhängt, wie die Anpassungen implementiert werden.

In unserem Beispiel gibt es ein benutzerdefiniertes Formular zur Bearbeitung des Aufgabenamenns. Das Formular umfasst ebenfalls die Funktion **sanitizeText()** zum Escapen eines Textes:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

Dies sind ziemlich alle Kategorien der Dateneingabe. Wenn Daten beim Eingeben in Gantt sanitisiert werden, wirken sie wie gefiltert. In der Folge werden XSS-Angriffe innerhalb des Gantt-Diagramms wirksam verhindert und können definitiv den Server nicht erreichen.

## Anzeigen von Daten in Gantt

Der nächste verwundbare Bereich, den wir erwähnen sollten, ist die Anzeige von Daten im Gantt-Diagramm.
Auch wenn es nicht so effizient ist wie die Dateneingabe, hilft das Sanitizen der angezeigten Daten dennoch, die XSS-Angriffskette zu stoppen oder zu unterbrechen.
Falls der Server mit Daten angegriffen wurde, aber kein Zugriff auf Gantt besteht, wird der XSS-Angriff an Gantt unterbrochen.

Der sicherste Ansatz besteht darin, alle Bereiche von Gantt zu sanitisieren, in denen Daten angezeigt werden.
Dies setzt den [Verwendung von Vorlagen in der Konfiguration jeder Grid-Spalte](guides/specifying-columns.md#datamappingandtemplates) voraus.
Die Verwendung aller möglichen Vorlagen [all templates](api/overview/templates-overview.md) wird benötigt, um zu verhindern, dass Inhalte mit potenziellen XSS-Angriffen angezeigt werden.

Es gibt jedoch eine einfachere Lösung für potenzielle Probleme mit der Anzeige von Daten im Gantt-Diagramm.
Da Daten im Gantt-Diagramm durch eine Benutzereingabe oder vom Server hochgeladen werden können, können wir diese beiden Datenflüsse begrenzen.
Dann besteht keine Chance, den Gantt-Inhalt zu beeinflussen und schädlichen Code in Daten einzubetten.

Es ist möglich, die Eigenschaften von Aufgaben während des Ladens aus dem Server zu schützen. Dies kann im Event-Handler **onTaskLoading** erfolgen:

~~~js
protectedGantt.attachEvent("onTaskLoading", function (task) {
    task.text = sanitizeText(task.text);
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    sanitizeResourceValues(task);
    return true;
});
~~~

Es kann weitere Wege geben, Daten in die Gantt-Diagramm zu laden. Zum Beispiel kann ein Task-Objekt separat vom Server kommen und von einer Funktion verarbeitet werden. Danach wird eine neue Aufgabe dem Gantt-Diagramm hinzugefügt oder eine bestehende Aufgabe aktualisiert.
In diesem Fall müssen Sie die Aufgabe innerhalb dieser Funktion sanitizen, bevor die Daten in Gantt geladen werden.

So könnte es aussehen:

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

Wenn ein Cyberkrimineller einen Benutzer dazu verleitet, das Element-Inspektor-Tool eines Browsers zu verwenden und schädlichen Code in Gantt-DOM-Elemente einzufügen, lässt sich das nicht verhindern. Aber gleichzeitig gehen alle angewendeten Änderungen verloren, wenn Gantt neu gerendert wird, und sie werden nicht an den Server gesendet.

## Serverseitige Probleme

Bitte beachten Sie, dass clientseitige Validierung leicht kompromittiert oder vollständig umgangen werden kann, daher sollte sie nicht als Sicherheitsmaßnahme verwendet werden. Sie dient dazu, dem Benutzer bei fehlerhafter Eingabe unmittelbares Feedback zu geben, während die endgültige Validierung auf dem Server erfolgen sollte.

Das Backend muss eingehende Daten, Zugriffsregeln der Benutzer usw. ordnungsgemäß validieren/escapen/säubern.

### SQL-Injektionen

dhtmlxGantt ist eine 100%-clientseitige Komponente, daher müssen SQL-Injektionen auf dem Backend vom Entwickler verhindert werden.

Es gibt zwei Punkte zu beachten:

- Das Lightbox hat keine Standardvalidierung, die, falls sie nicht gehandhabt wird, dem Benutzer erlaubt, beliebige Werte in bearbeitbare Inputs einzugeben
- Ihre Backend-API kann per PUT/POST-Anfrage mit gefährlichen Werten manuell aufgerufen werden, wodurch die Client-UI umgangen wird

Sie benötigen also eine Art SQL-Injektionen-Escape-Verfahren im Backend. Wenn Sie [dhtmlxConnector](integrations/php/howtostart-connector.md) verwenden und eine Tabellenkonfiguration wie in der zugehörigen [Dokumentation](https://docs.dhtmlx.com/connector__php__basis.html#loading-from-database) angegeben ist, werden alle Werte automatisch escaped. Andernfalls müssen Sie eine sichere CRUD-Implementierung entsprechend den Best Practices der von Ihnen verwendeten Plattform verwenden. Die in den [How to Start-Guides](integrations/howtostart-guides.md) gezeigten Implementierungen sollten sicher in Bezug auf SQL-Injektionen sein.

### CSRF-Angriffe

Bitte prüfen Sie [diesen Artikel](guides/server-side.md#custom-request-headers-and-parameters) zum Hinzufügen benutzerdefinierter Autorisierungstokens von Headern zu einer Anfrage, die von Gantt an das Backend gesendet wird.

## Content Security Policy

Die Bibliothek bietet eine spezielle Konfiguration, die Ihnen ermöglicht, den Code Ihrer mit dhtmlxGantt erstellten Anwendung an die CSP (Content Security Policy)-Standards anzupassen. 
Sie hilft, verschiedene Code-Injektionsangriffe zu verhindern und die Sicherheit der Anwendung zu erhöhen.

[Lesen Sie mehr über die Anwendung des CSP-Standards auf eine dhtmlxGantt-Anwendung](api/config/csp.md).

## Framework Wrapper XSS-Schutz {#framework-wrapper-xss-protection}

Ab Version v10.0 verarbeiten die Wrapper für [React](integrations/react.md), [Vue](integrations/vue.md) und [Angular](integrations/angular.md) die von benutzerdefinierten Template-Funktionen zurückgegebenen Zeichenfolgen so, dass HTML, das aus Templates stammt, standardmäßig sicher ist – auch wenn es unsaniert eingebettete Aufgaben-/Ereignisdaten enthält. Dies umfasst:

- Funktionen, die über die Property `templates` übergeben werden
- `config.columns[].template`-Funktionen
- `config.scales[].format`-Funktionen

Das Verhalten wird durch die Komponenteigenschaft `htmlTemplatePolicy` gesteuert:

| Policy | Verhalten |
| --- | --- |
| `"basic-sanitize"` *(Standard)* | White-List-Sanitisierung des zurückgegebenen HTMLs: sicheres Formatieren (`b`, `i`, `span`, `div`, `mark`, ...), `class`, ein eingeschränkter Satz von Inline-Stilen, `data-*`-Attribute, `contenteditable` und `img` mit sicherem `src` werden beibehalten. `<script>`, Inline-Ereignishandler (`on*`) und gefährliche URLs (`javascript:`, `vbscript:`, nicht-bildhafte `data:`) werden entfernt. |
| `"escape"` | Rendert die Zeichenfolge als Text – HTML-Tags werden zu sichtbaren Zeichen. (Integrierte Vorlagen wie die Grid-Tree-Symbole werden weiterhin saniert, damit das Grid korrekt gerendert wird.) |
| `"unsafe-html"` | Rendert die rohe Zeichenfolge ohne Verarbeitung – das Vor-v10-Verhalten, äquivalent zu `dangerouslySetInnerHTML`. Nur mit vollständig vertrauenswürdiger Ausgabe verwenden. |
| `{ mode: "sanitize", sanitize }` | Übergibt an einen benutzerdefinierten Sanitizer wie [DOMPurify](https://github.com/cure53/DOMPurify), sodass Sie reichhaltiges HTML sanieren können, ohne eine Wrapper-Abhängigkeit zu machen. |

`"basic-sanitize"` ist ein kleiner, Abhängigkeits-freier Sanitizer, der für einfache Formatierungen, Labels, Farben und Bilder gedacht ist – NICHT ein vollständiger Allgemein-Sanitizer. Für beliebiges reichhaltiges HTML bevorzugen Sie, Framework-Knoten aus Templates zurückzugeben (siehe unten) oder einen dedizierten Sanitizer zu verwenden.

### Framework-Knoten zurückgeben (empfohlen für reichhaltige Markups)

Der sicherste Weg, benutzerdefiniertes Markup zu rendern, besteht darin, ein Framework-Element aus dem Template zurückzugeben statt eines HTML-Strings. React/Vue/Angular escapen standardmäßig interpolierte Werte, daher ist keine HTML-Sanitisierung beteiligt:

~~~tsx
<ReactGantt
  templates={{
    task_text: (start, end, task) => <span className="task-label"><b>{task.text}</b></span>
  }}
/>
~~~

### Raw-HTML pro Template

Um den rohen HTML-String für ein bestimmtes Template unabhängig von der aktiven Policy zu rendern, wickeln Sie ihn mit dem aus dem Wrapper-Paket exportierten Helfer `allowRawHTML` ein. Danach sind Sie verantwortlich für das Sanitizen der vom Benutzer bereitgestellten Daten – verwenden Sie das exportierte Utility `escapeHTML`:

~~~js
import { allowRawHTML, escapeHTML } from "@dhx/react-gantt";

const templates = {
  task_text: allowRawHTML((start, end, task) => `<b>${escapeHTML(task.text)}</b>`)
};
~~~

### Auswahl einer globalen Policy

~~~jsx
// RAW-HTML überall beibehalten (Vor-v10-Verhalten)
<ReactGantt htmlTemplatePolicy="unsafe-html" />

// DOMPurify für reichhaltiges HTML verwenden
import DOMPurify from "dompurify";
<ReactGantt htmlTemplatePolicy={{ mode: "sanitize", sanitize: (html) => DOMPurify.sanitize(html) }} />
~~~

Siehe [Migration notes](migration.md#91---100) für weitere Details.