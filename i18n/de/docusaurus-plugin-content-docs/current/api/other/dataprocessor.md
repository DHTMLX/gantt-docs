---
sidebar_label: dataprocessor
title: dataprocessor config
description: "eine Sammlung von dataprocessor-Methoden"
---

# dataprocessor

### Description

@short: Eine Sammlung von dataprocessor-Methoden

### Example

~~~jsx

~~~

### Details

Sie können eine neue DataProcessor-Instanz mit der Methode [createDataProcessor](api/method/createdataprocessor.md) erstellen. Es gibt auch eine ältere Möglichkeit, eine Instanz über den Konstruktor [dataProcessor](api/method/dataprocessor.md) zu erzeugen. <br>
Das **dataprocessor**-Objekt beinhaltet die folgenden [Methoden](#methods) und [Events](#events):

### Methoden {#methods}

<ul id="attachEvent">
  <li><b>attachEvent (name, handler, settings): string</b> - fügt einen Handler zu einem DataProcessor API Event hinzu<ul><li><b><i>name</i></b> - (<i>string</i>) - der Event-Name, case-insensitive</li><li><b><i>handler</i></b> - (<i>Function</i>) - die Funktion, die das Event behandelt</li><li><b><i>settings?</i></b> - (<i>object</i>) - optional, Einstellungsobjekt für den Event-Handler</li></ul></li>
</ul>

<ul>

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    console.log("Updated task:", id);
});
~~~
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - entfernt einen zuvor angehängten Event-Handler anhand seiner ID
  <ul><li><b><i>id</i></b> - (<i>string</i>) - die ID des Event-Handlers</li></ul>
  </li>
</ul>

<ul>

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

const handlerId = dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    console.log("Updated task:", id);
});

// entfernt den Event-Listener
dp.detachEvent(handlerId);
~~~
</ul>

<ul id="getState">
  <li>
  <b>getState (id): string</b> - gibt den Status eines bestimmten Elements zurück (ob es aktualisiert wurde oder nicht)
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const status = dp.getState(id);
~~~
</ul>

<ul id="ignore">
  <li>
  <b>ignore (code): void</b> - führt einen Codeblock aus, ohne DataProcessor-Aktionen auszulösen
  <ul>
  <li><b><i>code</i></b> - (<i>Function</i>) - die Funktion zur Datenänderung</li>
  </ul>
  </li>
</ul>

<ul>

~~~js
dp.ignore(() => {
    // Änderungen hier werden nicht gespeichert
    gantt.addTask({
        id: 10,
        text: "Task #5",
        start_date: "03-02-2025",
        duration: 5
    });
});
~~~

<p>Dies ist nützlich, um Daten hinzuzufügen oder zu entfernen, wenn Sie vermeiden möchten, dass diese Änderungen zum Server gesendet werden.</p>
<i>Die Methode dp.ignore() verhält sich ähnlich wie [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="setTransactionMode">
  <li>
  <b>setTransactionMode (mode, total): void</b> - legt fest, wie Daten an den Server gesendet werden
  <ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - die Versandmethode, Optionen sind "GET", "POST", "REST", "JSON" oder "REST-JSON"</li>
  <li><b><i>total</i></b> - (<i>boolean</i>) - bestimmt, ob alle Daten auf einmal oder jeder Datensatz einzeln gesendet wird</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>Wenn Sie benutzerdefinierte HTTP-Header oder zusätzliche Daten mit den Anfragen senden möchten, können Sie als ersten Parameter ein Objekt mit folgenden Eigenschaften übergeben:</p>

<ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - Datenversandmodus, z.B. "GET", "POST", "REST", "JSON" oder "REST-JSON"</li>
  <li><b><i>headers</i></b> - (<i>object</i>) - Schlüssel-Wert-Paare von Headern, die in die Anfrage aufgenommen werden</li>
  <li><b><i>payload</i></b> - (<i>object</i>) - zusätzliche Schlüssel-Wert-Paare, die zusammen mit den Headern gesendet werden</li>
</ul>

~~~js
dp.setTransactionMode({
    mode: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Language": "fr-FR"
    },
    payload: {
        "user_id": "12"
    }
}, true);
~~~
</ul>

<ul id="setUpdated">
  <li>
  <b>setUpdated (rowId, [mode, state]): void</b> - markiert ein Element als aktualisiert oder nicht
  <ul>
  <li><b><i>rowId</i></b> - (<i>string | number</i>) - die ID des Elements</li>
  <li><b><i>mode?</i></b> - (<i>boolean</i>) - optional, <code>true</code> (Standard) zum Markieren als aktualisiert, <code>false</code> zum Markieren als nicht aktualisiert</li>
  <li><b><i>state?</i></b> - (<i>string</i>) - optional, der Name des Update-Status, Standard ist <code>"updated"</code></li>
  </ul>
  </li>
</ul>

<ul>

~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>


### Events {#events} 

<ul id="onAfterUpdate">
  <li>
  <b>onAfterUpdate (id, action, tid, response): void</b> - wird ausgelöst, nachdem die Serverantwort empfangen und verarbeitet wurde
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des aktualisierten Elements</li>
  <li><b><i>action</i></b> - (<i>string</i>) - der Status der Antwort (Art der Operation)</li>
  <li><b><i>tid</i></b> - (<i>string</i>) - die neue ID (nur für Insert-Operationen)</li>
  <li><b><i>response</i></b> - (<i>mixed</i>) - die geparste Antwort, entweder als XML-Knoten oder JSON-Objekt</li>
  </ul>
  </li>
</ul>

<ul>

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        alert(`Serverfehler: ${response.message}`);
    }
});
~~~
</ul>

<ul>
<p><b>Dies sind die möglichen Antwort-Status:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeDataSending">
  <li>
  <b>onBeforeDataSending (id, state, data): void</b> - wird unmittelbar vor dem Senden der Daten an den Server ausgelöst
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
  <li><b><i>state</i></b> - (<i>string</i>) - der aktuelle Status des Elements (Operationstyp)</li>
  <li><b><i>data</i></b> - (<i>object</i>) - die serialisierten Daten, die gesendet werden</li>
  </ul>
  </li>
</ul>

<ul>

~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
    // Eigene Logik vor dem Senden der Daten
    return true;
});
~~~
</ul>

<ul>
<p>Dieses Event wird für jede Datenaktualisierungsanfrage ausgelöst (nach <code>onBeforeUpdate</code>).</p>
<p>Wenn der Handler <code>false</code> zurückgibt, werden die Daten nicht an den Server gesendet.</p>

<p><b>Mögliche Antwort-Status:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b>onBeforeUpdate (id, state, data): void</b> - wird ausgelöst, bevor ein Datensatz (oder mehrere) aktualisiert wird/werden
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
  <li><b><i>state</i></b> - (<i>string</i>) - der Status des Elements (Operationstyp)</li>
  <li><b><i>data</i></b> - (<i>object</i>) - die Daten, die an den Server gesendet werden</li>
  </ul>
  </li>
</ul>

<ul>

~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    // Eigene Logik vor der Aktualisierung
    return true;
});
~~~
</ul>

<ul>
<p>Dieses Event wird für jeden zu aktualisierenden Datensatz ausgelöst und vor <code>onBeforeDataSending</code>.</p>
<p>Wenn hier <code>false</code> zurückgegeben wird, wird das Senden der Daten abgebrochen.</p>

<p><b>Mögliche Antwort-Status:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onRowMark">
  <li>
  <b>onRowMark (id, state, mode, invalid): void</b> - wird ausgelöst, bevor ein aktualisiertes Element markiert wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements, auf das sich der Fehler bezieht</li>
  <li><b><i>state</i></b> - (<i>string</i>) - der Status des Elements (Operationstyp)</li>
  <li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code>, um eine Markierung hinzuzufügen, <code>false</code>, um sie zu entfernen</li>
  <li><b><i>invalid</i></b> - (<i>object</i>) - Fehlerdetails, falls vorhanden</li>
  </ul>
  </li>
</ul>

<ul>

~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
    // Eigene Logik vor dem Markieren eines Elements
    return true;
});
~~~
</ul>

<ul>
<p>Dieses Event kann blockiert werden. Wenn <code>false</code> zurückgegeben wird, wird das Element nicht markiert.</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Serverseitige Integration](guides/server-side.md)

