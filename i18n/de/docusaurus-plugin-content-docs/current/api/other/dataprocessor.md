---
sidebar_label: dataprocessor
title: dataprocessor config
description: "eine Sammlung von dataprocessor-Methoden"
---

# dataprocessor

### Description

@short: Eine Sammlung von dataprocessor-Methoden

### Details

Eine neue Instanz von DataProcessor kann mithilfe der Methode [createDataProcessor](api/method/createdataprocessor.md) erstellt werden. Alternativ bietet der [dataProcessor](api/method/dataprocessor.md) Konstruktor einen legacy Weg, eine DataProcessor-Instanz zu erstellen. 
Das **dataprocessor**-Objekt besitzt die folgenden [Methoden](#methods) und [Ereignisse](#events):

Methoden

### Methods {#methods}

<ul id="attachEvent">
	<li>
		<b class="submethod">attachEvent (name, handler, settings): string</b> - hängt den Handler an ein API-Ereignis von DataProcessor an
		<ul><li><b><i>name</i></b> - (<i>string</i>) - der Name des Ereignisses, Groß-/Kleinschreibung wird ignoriert</li><li><b><i>handler</i></b> - (<i>Function</i>) - die Handler-Funktion</li><li><b><i>settings?</i></b> - (<i>object</i>) - Optional, ein Objekt mit Einstellungen für den Ereignis-Handler</li></ul>
	</li>
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
		<b class="submethod">detachEvent (id): void</b> - trennt einen zuvor von der Methode <b>attachEvent()</b> angehängten Handler von einem Ereignis
		<ul>
			<li><b><i>id</i></b> - (<i>string</i>) - die ID des Ereignisses</li>
		</ul>
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

// detach a listener
dp.detachEvent(handlerId);
~~~
</ul>

<ul id="getState">
	<li>
		<b class="submethod">getState (id): string</b> - gibt den Zustand eines Elements zurück (aktualisiert oder nicht)
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - die ID eines Elements</li>
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
		<b class="submethod">ignore (code): void</b> - führt einen Block aus, ohne DataProcessor auszulösen
		<ul>
			<li><b><i>code</i></b> - (<i>Function</i>) - Code zur Änderung von Daten</li>
		</ul>
	</li>
</ul>

<ul>
	~~~js
	dp.ignore(() => {
		// wird nicht gespeichert
		gantt.addTask({
			id: 10,
			text: "Task #5",
			start_date: "03-02-2025",
			duration: 5
		});
	});
	~~~
<p>Hier können Sie Operationen zum Hinzufügen und Löschen von Daten platzieren, wenn Sie diese Änderungen nicht auf dem Server speichern möchten.</p>
<i>Die dp.ignore()-Methode funktioniert ähnlich wie [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="setTransactionMode">
	<li>
		<b class="submethod">setTransactionMode (mode, total): void</b> - konfiguriert den Datensende-Modus
		<ul>
			<li><b><i>mode</i></b> - (<i>string</i>) - der Datensende-Modus, "GET"|"POST"|"REST"|"JSON"|"REST-JSON"</li>
			<li><b><i>total</i></b> - (<i>boolean</i>) - definiert, ob alle Daten auf einmal gesendet werden oder jeder Datensatz durch eine separate Anfrage</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>Um benutzerdefinierte HTTP-Anforderungsheader oder zusätzliche Daten an den Server zu senden, geben Sie den ersten Parameter als Objekt mit den folgenden Eigenschaften an:</p>

<ul>
	<li><b><i>mode</i></b> - (<i>string</i>) - Datensende-Modus, "GET", "POST", "REST", "JSON", "REST-JSON"</li>
	<li><b><i>headers</i></b> - (<i>object</i>) - eine Menge von Headern, definiert als Paare <code>"key":"value"</code>, die mit einer Anfrage gesendet werden sollen</li>
	<li><b><i>payload</i></b> - (<i>object</i>) - zusätzliche Daten, festgelegt als Paare <code>"key":"value"</code>, die zusammen mit den Headers an den Server gesendet werden sollen</li>
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
		<b class="submethod">setUpdated (rowId, [mode, state]): void</b> - markiert ein Element als aktualisiert
		<ul>
			<li><b><i>rowId</i></b> - (<i>string | number</i>) - die ID eines Elements, für das der Aktualisierungsstatus festgelegt wird</li>
			<li><b><i>mode?</i></b> - (<i>boolean</i>) - Optional, <code>true</code> (Standard) für "aktualisiert", <code>false</code> für "nicht aktualisiert"</li>
			<li><b><i>state?</i></b> - (<i>string</i>) - Optional, der Name des Aktualisierungsmodus, standardmäßig <code>"updated"</code></li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>
<ul id="getSyncState">
	<li>
		<b class="submethod">getSyncState (): boolean</b> - gibt den Zustand von DataProcessor zurück (<i>true</i>, wenn alle Daten gespeichert sind)
	</li>
</ul>

<ul>
~~~js
const state = dp.getSyncState();
~~~

<p>Wenn einige Datensätze noch nicht gespeichert wurden oder eine "error"-Antwort erhalten haben, gibt die Methode <i>false</i> zurück.</p>
</ul>

<ul id="sendData">
	<li>
		<b class="submethod">sendData ([id]): void</b> - sendet alle Daten, die noch nicht auf der Serverseite gespeichert sind
  <ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - optional, die ID eines Elements</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.sendData();
~~~

<p> Falls eine ID angegeben wird, wird nur ein Element an die Serverseite gesendet.</p>
<p> Beim Aufruf ohne Parameter sendet die Methode alle Elemente, die noch nicht gespeichert wurden.</p>
</ul>


### Events {#events} 

<ul id="onAfterUpdate">
	<li>
		<b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - löst sich aus, nachdem die serverseitige Antwort empfangen und verarbeitet wurde
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - die ID des aktualisierten Elements</li>
			<li><b><i>action</i></b> - (<i>string</i>) - der Status der Antwort (Operationstyp)</li>
			<li><b><i>tid</i></b> - (<i>string</i>) - die neue ID (gilt nur für Insert-Operationen)</li>
			<li><b><i>response</i></b> - (<i>mixed</i>) - der geparste XML-Knoten oder das JSON-Objekt der Antwort</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
	if (action === "error") {
		alert(`Server error: ${response.message}`);
	}
});
~~~
</ul>

<ul>
<p><b>Possible response statuses:</b></p>
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
		<b class="submethod">onBeforeDataSending (id, state, data): void</b> - löst sich aus, bevor Daten an einen Server gesendet werden
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
			<li><b><i>state</i></b> - (<i>string</i>) - der Zustand des Elements (Operationstyp)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - die serialisierten Daten, die an den Server gesendet werden</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
	// Benutzerdefinierte Logik vor dem Senden der Daten
	return true;
});
~~~
</ul>

<ul>
<p>Das Ereignis wird für jede Datenaktualisierungsanforderung ausgelöst (nach <code>onBeforeUpdate</code>).</p>
<p>Durch Zurückgeben von <code>false</code> aus dem Ereignis-Handler wird verhindert, dass Daten an den Server gesendet werden.</p>

<p><b>Mögliche Antwort-Statuses:</b></p>
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
		<b class="submethod">onBeforeUpdate (id, state, data): void</b> - löst sich vor dem Aktualisieren eines Datensatzes (oder mehrerer Datensätze) aus
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
			<li><b><i>state</i></b> - (<i>string</i>) - der Zustand des Elements (Operationstyp)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - die an den Server gesendeten Daten</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
	// Benutzerdefinierte Logik vor dem Aktualisieren
	return true;
});
~~~
</ul>

<ul>
<p>Das Ereignis wird für jedes zu aktualisierende Datensatz ausgelöst und vor <code>onBeforeDataSending</code>.</p>
<p>Durch Zurückgeben von <code>false</code> aus dem Ereignis-Handler wird verhindert, dass Daten an den Server gesendet werden.</p>

<p><b>Possible response statuses:</b></p>
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
		<b class="submethod">onRowMark (id, state, mode, invalid): void</b> - löst sich vor jedem Versuch aus, das aktualisierte Element zu markieren
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements, für das der Fehler auftritt</li>
			<li><b><i>state</i></b> - (<i>string</i>) - der Zustand des Elements (Operationstyp)</li>
			<li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code> zum Hinzufügen einer Aktualisierungs-Markierung, <code>false</code> zum Entfernen</li>
			<li><b><i>invalid</i></b> - (<i>object</i>) - Details zu Fehlern, falls vorhanden</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
	// Benutzerdefinierte Logik vor dem Markieren eines Elements
	return true;
});
~~~
</ul>

<ul>
<p>Das Ereignis ist blockierbar. Wenn <code>false</code> zurückgegeben wird, wird das Element nicht markiert.</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Serverseitige Integration](guides/server-side.md)