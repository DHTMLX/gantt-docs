---
title: "Application Security"
sidebar_label: "Application Security"
---

# Anwendungssicherheit

DHTMLX Gantt ist eine client-seitige JavaScript-Bibliothek, die eine reibungslose Integration der Gantt-Funktionalität in verschiedene Web-Apps ermöglicht.
Daher schränken wir die funktionalen Fähigkeiten unseres Gantt nicht ein, die die Sicherheit der Anwendung verbessern könnten, aber gleichzeitig die verfügbaren Möglichkeiten verringern würden.
Daher können Sie die meisten Gantt-Funktionen entsprechend den Anforderungen Ihres Projekts anpassen.

Allerdings sollten Sie bedenken, dass DHTMLX Gantt von sich aus keine Mittel bereitstellt, um Ihre App vor Bedrohungen wie SQL-Injektionen oder XSS- und CSRF-Angriffen zu schützen. Es liegt also an Ihnen, die Sicherheit Ihres Projekts durch die Bereitstellung der erforderlichen Konfigurationseinstellungen sicherzustellen.
In diesem Artikel finden Sie einige relevante Informationen und Empfehlungen zur HTML-Sanitierung.

## Grundlegende Sicherheitsmaßnahmen

Obwohl Cybersicherheit eine komplexe Disziplin ist und nicht wirklich mit einem einzigen Instruktionsschritt abgedeckt werden kann, empfehlen wir, die praktischen Schritte zu befolgen, die die Grundlagen abdecken und dabei helfen, die häufigsten Bedrohungen zu mildern.

**1. Verwenden Sie Content Security Policy (CSP) in Ihrer Anwendung**

Ein CSP-Header, so einfach wie der folgende, verhindert, dass XSS-Code in Ihrer Anwendung ausgeführt wird:

~~~ 
Content-Security-Policy: script-src 'self'
~~~ 

Ihre App erfordert möglicherweise eine komplexere Richtlinie, aber das Deaktivieren der Ausführung von Inline-Skripten würde eine große Anzahl von XSS- und CSRF-Angriffen verhindern.

**2. Benutzereingaben im Backend vor dem Speichern in der Datenbank sanitieren**

Bei der Einfügung eines neuen Datensatzes sollten Werte nicht unverändert gespeichert werden:

~~~ 
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

Sie sollten sicherstellen, dass sie dem erwarteten Format entsprechen und potenziell bösartigen Inhalt entfernen.
Wenn Sie Node.js verwenden, kann dies mit einer der zahlreichen verfügbaren Bibliotheken erfolgen, z. B. [DOMPurify](https://www.npmjs.com/package/dompurify):

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

**3. HTML-Entities vor dem Rendern der Daten escapen**

Wenn Sie nicht möchten, dass displaybare Werte HTML-Markup enthalten, das während des Renderings ausgeführt wird, stellen Sie sicher, HTML-Zeichen zu escapen, die Benutzer eingegeben haben, bevor Sie die Daten in Gantt einspeisen. Hier ist ein Beispiel der Verwendung der [validator](https://www.npmjs.com/package/validator)-Bibliothek:

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

**4. Wenn Sie mit einer SQL-Datenbank arbeiten, vermeiden Sie das Erstellen von SQL-Abfragen durch Aneinanderreihen von Zeichenfolgen. Verwenden Sie parametrisierten Abfragen, ORM oder SQL-Builder stattdessen**

Dieser Punkt betrifft Arten von SQL-Injektionen. Grundsätzlich sollten Sie nie unsichere oder ungeprüfte Benutzereingaben in Ihren SQL-Abfragen verwenden. Wenn Sie feststellen, dass Sie es tun, erwägen Sie, Ihren Code mit parametrisierten Abfragen umzuschreiben oder Escape-Funktionen zu verwenden, die vom von Ihnen verwendeten SQL-Anbieter unterstützt werden.

**5. Zu guter Letzt: Konsultieren Sie einen Cybersicherheitsexperten und befolgen Sie die Sicherheitsrichtlinien Ihres Unternehmens**

Die Sicherheitsarbeit ist nie vollständig, aber durch die Umsetzung dieser Schritte, das Befolgen der Richtlinien Ihres Unternehmens und eine Überprüfung durch einen Sicherheitsfachmann vermeiden Sie die Mehrzahl der Bedrohungen, denen Sie im Web begegnen könnten.

Nun, da die Grundlagen abgedeckt sind, schauen wir uns die Gantt-spezifischen Aspekte an.

## Verwundbare Gantt-Bereiche auf der Client-Seite

Zuallererst möchten wir drei Punkte hervorheben, wenn komplexe Funktionen wie Gantt auf der Client-Seite integriert werden:

- DHTMLX Gantt ist eine client-seitige Bibliothek, daher gelangen alle vom Server geladenen Daten unverändert in Gantt. Da der Datensatz auf der Serverseite gespeichert wird, ergibt sich dort die Hauptrisikozone für Ihre App. Den Backend zu schützen, geht über DHTMLX Gantt hinaus.
- Cyberkriminelle könnten Endnutzer dazu verleiten, bösartigen Code mithilfe von DevTools auszuführen (Self-XSS-Angriffe) und damit Sicherheitsmechanismen zu umgehen. Jeglicher Code, der in den Text der Aufgabe eingefügt wird, funktioniert genauso, als würden die DevTools verwendet.
- Wenn ein Angreifer Zugriff auf das Gantt-Instanzobjekt erhält, werden alle Schutzmaßnahmen unwirksam. In diesem Fall können Angreifer die Gantt-Konfiguration nach Belieben ändern und vollständig steuern.

Nun kommen wir zur Liste anfälliger Bereiche von DHTMLX Gantt, in denen potenzielle Sicherheitsprobleme auftreten können:

- die von Endbenutzern eingegebenen und gespeicherten Daten
- die angezeigten Gantt-Daten (Textinhalte, verschiedene visuelle Elemente)
- [custom HTML elements](guides/export.md#exporting-html-elements), die irgendwie mit Gantt-Daten interagieren
- der Zugriff auf das Gantt-Objekt

Lassen Sie uns mit praktischen Überlegungen zu diesen potenziellen Problemen fortfahren.

## Zugriff auf Gantt isolieren

Wenn es um mögliche Schutzmaßnahmen für Gantt geht, besteht das Erste, was Sie tun müssen, darin, Gantt vor illegalem Zugriff zu isolieren
durch andere gehackte Komponenten oder von fehlgeleiteten Benutzern (Self-XSS-Angriffe).

:::note
Wenn ein Angreifer Zugriff auf die Konfigurationsdateien der App (einschließlich der Gantt-Konfigurationsdatei) erlangt,
können alle Schutzmaßnahmen gegen XSS-Angriffe (falls vorhanden) unwirksam sein, daher betrachten wir dieses Szenario nicht.
:::

Wenn die Anwendung vollständig geladen ist und das Gantt-Instanzobjekt von Angreifern aufgebaut wird, 
können sie buchstäblich alles in Gantt verändern und alle Funktionen neu definieren. Daher sollten Sie wissen, wie Sie Gantt in Ihrem Projekt isolieren.

Dazu müssen Sie eine separate Gantt-Instanz in einer Funktion erstellen. Ziel ist es, Code, der innerhalb der Funktion läuft, außerhalb der Funktion unzugänglich zu machen.

Darüber hinaus erzeugt Gantt standardmäßig eine neue Instanz im *gantt*-Objekt. Es ist wichtig, innerhalb der Funktion eine neue Variable zu deklarieren, entweder mit dem Schlüsselwort *const* oder *let*, um sie außerhalb der Funktion unzugänglich zu machen und die Gantt-Instanz sicher in dieser Variablen zu platzieren.

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Sie können auch einen anderen Namen für eine Gantt-Instanz verwenden, um Verwechslungen mit dem gantt-Objekt zu vermeiden:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Nachdem Sie sichergestellt haben, dass Gantt vor ungewolltem Zugriff geschützt ist, sollten Sie darauf achten, Daten in der Gantt-Diagramm einzugeben und anzuzeigen.

## Eingabe von Daten in der Gantt

Dies ist eine sensible Stelle, die von Cyberkriminellen verwendet werden kann, um die Sicherheit der Gantt-Anwendung zu kompromittieren.

Daten-Eingabe-Bereiche gelten als Hauptzielorte für XSS-Angriffe. In unserer Gantt-Komponente ist es möglich, Daten über:

- Lightbox
- Inline-Editoren
- Modalbox mit benutzerdefinierten Elementen
- Drittanbieter-Bibliotheken
- Ressourcen-Zuweisungen im Ressourcen-Auslastungszeitplan
- zusätzliche Ebenen (falls sie benutzerdefinierte Elemente enthalten, in denen Daten eingegeben werden können)
- jegliche benutzerdefinierte Lösungen, die die Gantt-API verwenden und eine Dateneingabe erfordern (z. B. eine Symbolleiste oder ein benutzerdefiniertes Formular zum Bearbeiten von Aufgaben)

Das Task-Objekt besitzt [viele verschiedene Parameter](guides/task-properties.md), die je nach aktivierten Funktionen verwendet werden.
Je mehr Parameter bearbeitet werden können, desto mehr Parameter sollten beim Eingeben von Daten sanitisiert werden.

### Betrachtung eines Beispiels

Wir haben ein Beispiel vorbereitet, um verschiedene Schritte zu demonstrieren, die Sie unternehmen können, um den Schutz gegen XSS-Angriffe durch HTML-Sanitierung bei der Verwendung von DHTMLX Gantt zu verbessern.

Zugehöriges Sample: [Beispiel zur Verhinderung von XSS-Angriffen (Sicherheit, CSP)](https://snippet.dhtmlx.com/cdy9p0yl)

In unserem Beispiel können Sie den Namen der Aufgabe bearbeiten, Datum und Dauer ändern, Ressourcenzuweisungen anpassen und Textnotizen hinzufügen.
Sie können Startdatum und Dauer nur über Lightbox und Inline-Editoren ändern. In Inline-Editoren sind die Typen **date** und **number** explizit angegeben.
In der Lightbox können Sie nur die Dauer festlegen, während das Datum aus der Auswahlliste gewählt werden muss.

In beiden Fällen ist es unmöglich, Text mit bösartigem Code in diese UI-Elemente einzufügen.
Wenn Sie versuchen, den Typ der Elemente über den DOM-Element-Inspektor zu ändern, erhalten Sie ungültige Werte für Datum oder Dauer.
Dies verursacht einen Fehler und Gantt kann weiterarbeiten, bis die Seite neu geladen wird. Gleichzeitig werden die Daten nicht an den Server gesendet, da sie nicht neu gezeichnet werden.

Wir verwenden jedoch den **string**-Werttyp für Aufgabenbezeichnungen, was eine potenzielle Schwachstelle für XSS-Angriffe sein kann.
Daher müssen Sie den Eingabewert sanitizieren. In unserem Beispiel sehen Sie nur eine Variante eines XSS-Angriffs und eine Möglichkeit, ihn zu verhindern.

![preventing_xss_attack](/img/preventing_xss_attack.png)

In einem realen Projekt müssen Sie alle möglichen Optionen zur Datensanitierung hinzufügen.
In unserem Fall ersetzen wir einfach die Symbole "\<" und "\>" durch die entsprechenden HTML-Entities - **`&lt;`** und **`&gt;`**.
Damit schließen wir die Möglichkeit aus, HTML-Elemente innerhalb des Aufgabentextes anzuzeigen.

Die oben beschriebene Ersetzung von Symbolen ist in der Funktion **sanitizeText()** wie folgt umgesetzt:

~~~ js
function sanitizeText(text){
    // zum Testen von XSS auskommentieren
    // return text

    // XSS verhindern, indem HTML-Elemente deaktiviert werden
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

Diese Funktion wird in Event-Handlern aufgerufen: im **onLightboxSave** für die Lightbox und im **onBeforeSave** für Inline-Editoren.

In unserem Beispiel können Sie auch Textnotizen zu einer Aufgabe hinzufügen, entweder mit einem benutzerdefinierten Inline-Editor oder einem benutzerdefinierten Lightbox-Abschnitt.
In beiden Fällen kann die Sanitierung innerhalb der Funktionen dieser benutzerdefinierten Objekte implementiert werden
(vor dem Rendern der Werte und bevor Änderungen aus den DOM-Elementen entnommen werden):

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

Aber es ist einfacher, die Arbeit mit Textnotizen mithilfe der **onLightboxSave**- und **onBeforeSave**-Ereignis-Handler zu steuern:

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

Sie können auch Ressourcenzuweisungen in der Lightbox vornehmen. Da Gantt eingegebene Werte nicht ausschließlich auf den Typ **number** beschränkt, ist auch die Verwendung von Zeichenkettenwerten möglich, was eine potenzielle Angriffsfläche bietet.

Ressourcenwerte werden in die Eigenschaft eines Tasks geschrieben, daher durchsucht die Funktion **sanitizeResourceValues()** all diese Werte
und bereinigt den Wert der Ressourcen-Zuweisung mit der Funktion **sanitizeText()**:

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

*Wenn Sie andere String-Parameter in Ihrer Gantt-Konfiguration verwenden, sollten auch diese sanitisiert werden*.

In unserem Beispiel, falls Sie versuchen, unerwünschte Inhalte in Ressourcen-Zuweisungen im Ressourcen-Zeitplan einzufügen, werden nur numerische Werte akzeptiert. Bei der Verwendung anderer Wertetypen werden die Änderungen nicht gespeichert.

### Eingabe von Daten über Tools von Drittanbietern

Unser Gantt-Komponenten bietet viele Anpassungsmöglichkeiten, einschließlich der Möglichkeit, Aufgaben mithilfe von Formularen, Tools und Bibliotheken von Drittanbietern zu bearbeiten.
In diesem Fall wird die Gantt-API zum Arbeiten mit Aufgaben verwendet. In solchen Szenarien lässt sich kein universeller Rat zur Sanitierung von Daten geben, da alles davon abhängt, wie die Anpassungen implementiert sind.

In unserem Beispiel gibt es ein benutzerdefiniertes Formular zum Bearbeiten des Aufgabennamens. Das Formular enthält außerdem die Funktion **sanitizeText()** zum Escapen eines Textes:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

Dies sind fast alle Kategorien der Dateneingaben. Wenn Daten beim Eingeben in Gantt sanitisiert werden, wirken sie wie ein Filter.
Infolgedessen werden XSS-Angriffe in der Gantt-Diagramm-Ansicht wirkungslos und können definitiv nicht an den Server gelangen.

## Anzeigen von Daten in Gantt

Der nächste anfällige Bereich, den wir erwähnen sollten, ist die Anzeige von Daten im Gantt-Diagramm.
Obwohl die Anzeige nicht so effizient ist wie die Dateneingabe, hilft die Sanitierung der angezeigten Daten weiterhin, die XSS-Angriffskette zu stoppen oder zu unterbrechen.
Zum Beispiel, wenn der Server mit Daten angegriffen wurde, aber kein Zugriff auf Gantt besteht, wird der XSS-Angriff in Gantt unterbrochen.

Der sicherste Ansatz besteht darin, alle Gantt-Bereiche zu sanitieren, in denen Daten angezeigt werden.
Dies setzt voraus, dass [Vorlagen in der Konfiguration jeder Grid-Spalte verwendet werden](guides/specifying-columns.md#datamappingandtemplates).
Die Nutzung [aller möglichen Vorlagen](api/overview/templates-overview.md) wird benötigt, um zu verhindern, dass Inhalte mit möglichen XSS-Angriffen angezeigt werden.

Es gibt jedoch eine einfachere Lösung für potenzielle Probleme mit der Anzeige von Daten in der Gantt-Diagramm. Da Daten in das Gantt-Diagramm über eine Benutzereingabe oder vom Server hochgeladen werden können, können wir diese beiden Datenströme begrenzen.
Dann besteht keine Chance, den Gantt-Inhalt zu beeinflussen und bösartigen Code in Daten einzubetten.

Es ist möglich, die Eigenschaften von Aufgaben beim Laden aus dem Server zu schützen. Dies kann im Ereignis-Handler **onTaskLoading** erfolgen:

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

Es mag weitere Wege geben, Daten in das Gantt-Diagramm zu laden. Zum Beispiel kann ein Task-Objekt separat vom Server kommen und von einer Funktion verarbeitet werden. Danach wird eine neue Aufgabe dem Gantt-Diagramm hinzugefügt oder eine vorhandene aktualisiert.
In diesem Fall müssen Sie die Aufgabe innerhalb dieser Funktion sanitizieren, bevor die Daten in Gantt geladen werden.

Es könnte so aussehen:

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

Wenn ein Cyberkrimineller einen Benutzer dazu bringt, den Element-Inspektor in einem bestimmten Webbrowser zu verwenden und schädlichen Code in Gantt-DOM-Elemente einfügt, können Sie dem nicht entgehen. Aber gleichzeitig gehen alle angewendeten Änderungen beim nächsten Ne zeichnen von Gantt verloren und werden nicht auf dem Server gespeichert.

## Serverseitige Probleme

Beachten Sie, dass die clientseitige Validierung leicht kompromittiert oder sogar vollständig umgangen werden kann, daher kann sie nicht als Sicherheitsmittel verwendet werden. Sie zielt darauf ab, dem Benutzer eine unmittelbare Rückmeldung bei fehlerhafter Eingabe zu geben, ohne auf eine Serverantwort warten zu müssen, während die endgültige Validierung serverseitig erfolgen sollte.

Der Backend-Teil muss eingehende Daten, Benutzerzugriffsregeln usw. ordnungsgemäß validieren/escapen/säubern.

### SQL-Injektionen

dhtmlxGantt ist eine 100%-ige Client-seitige Komponente, daher müssen SQL-Injektionen auf dem Backend vom Entwickler verhindert werden.

Es gibt zwei Punkte zu beachten:

- das Lightbox-Fenster hat keine Standardvalidierung, die, falls nicht behandelt, dem Benutzer erlaubt, beliebige Werte in bearbeitbare Eingaben einzugeben
- Ihre Backend-API kann durch manuelles Senden einer PUT/POST-Anforderung mit gefährlichen Werten von außen aufgerufen werden, wodurch die clientseitige UI umgangen wird

Daher benötigen Sie irgendeine Art von SQL-Injektionen-Escaping auf Ihrem Backend. Wenn Sie [dhtmlxConnector](integrations/php/howtostart-connector.md) verwenden und eine Tabellenkonfiguration gemäß der zugehörigen Dokumentation angeben, werden alle Werte automatisch escaped. Andernfalls müssen Sie eine sichere CRUD-Implementierung gemäß den guten Praktiken der von Ihnen verwendeten Plattform verwenden. Implementierungen, die in den [How-to-Start-Guides](integrations/howtostart-guides.md) gezeigt werden, sollten sicher in Bezug auf SQL-Injektionen sein.

### CSRF-Angriffe

Bitte prüfen Sie [diesen Artikel](guides/server-side.md#custom-request-headers-and-parameters) zum Hinzufügen benutzerdefinierter Autorisierungstokens oder Header zu einer von Gantt an das Backend gesandten Anfrage.

## Content Security Policy

Die Bibliothek bietet eine spezielle Konfiguration, die es Ihnen ermöglicht, den Code Ihrer mit dhtmlxGantt erstellten Anwendung so anzupassen, dass er der CSP (Content Security Policy)-Standard entspricht.
Sie hilft, verschiedene Code-Injection-Angriffe zu verhindern und die Sicherheit der Anwendung zu erhöhen.

[Weitere Informationen zur Anwendung des CSP-Standards auf eine dhtmlxGantt-Anwendung](api/config/csp.md).