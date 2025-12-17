---
sidebar_label: ajax
title: ajax config
description: "gantt ajax Modul"
---

# ajax

### Description

@short: Gantt ajax Modul

@signature: ajax: any

### Example

~~~jsx
// angenommen, die Antwort sieht so aus
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // Antwort ist ok
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // Antwort ist ok
    }
});
~~~

### Details

## API Referenz

Alle Methoden akzeptieren Parameter auf eine von zwei Arten:

1) RequestConfig - ein Objekt mit Konfigurationsoptionen für die Anfrage, strukturiert wie folgt:

~~~js
{
  url: string,
  method: "PUT|GET|POST|DELETE",
  data: string | object,
  async: true|false,
  callback: function,
  headers: object
}
~~~

wobei:

- url - die Server-URL
- method - optional, HTTP-Methode, standardmäßig "GET"
- data - optional, Daten, die mit POST- oder PUT-Anfragen gesendet werden; kann ein String oder ein Objekt sein
- async - optional, bestimmt, ob die Anfrage asynchron ist, Standard ist true
- callback - optional, Funktion, die aufgerufen wird, sobald die Antwort empfangen wurde
- headers - optional, Objekt mit Headern als Schlüssel-Wert-Paare, die in der Anfrage enthalten sein sollen

oder:

2) Drei Parameter (außer bei der **query()**-Methode, die nur das *RequestConfig*-Objekt akzeptiert):

- url - die Server-URL
- data - optional, Daten, die mit der POST-Anfrage gesendet werden
- callback - optional, Funktion, die nach Empfang der Antwort aufgerufen wird

Nachfolgend die Liste der verfügbaren Methoden der ajax Modul API:

#### Callback-Optionen

Alle Methoden unterstützen sowohl Callbacks als auch [Promises](#promises) zur Verarbeitung von Antworten.

Ein ajax Promise wird mit einem abgeschlossenen XmlHttpRequest-Objekt aufgelöst:

~~~js
gantt.ajax.post({ 
    url:"some.php",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

Aus Kompatibilitätsgründen erhält der Callback das Ergebnis in einem leicht abweichenden Format:

~~~js
gantt.ajax.post({ 
    url:"some.php",
    data: {
       paramName: "paramValue"
    },
    callback: function(result){
       var response = result.xmlDoc;
       
       alert(response.responseText);
    }
});
~~~


#### query

Dies ist die allgemeine Methode zum Senden von Anfragen. Sie können jede HTTP-Methode in den Parametern angeben.

~~~js
gantt.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

Sendet eine GET-Anfrage.

~~~js
gantt.ajax.get("some.php", function(){
    // Ihr Code hier
});
// oder
gantt.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

Sendet eine PUT-Anfrage.

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // Ihr Code hier
});
// oder
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" },
   data: {}
});
~~~

#### del

Sendet eine DELETE-Anfrage.

~~~js
gantt.ajax.del("server.php", function(){
    // Ihr Code hier
});
// oder
gantt.ajax.del({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
});
~~~

#### post

Sendet eine POST-Anfrage.

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // Ihr Code hier
});
// oder
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" },
      data: {}
});
~~~

## Daten mit POST/PUT Methoden senden

Anstelle eines Strings können Sie ein Objekt als Daten an die **post**- und **put**-Methoden übergeben. Wenn ein Objekt übergeben wird, übernimmt das ajax Modul die Serialisierung automatisch. Einfache Objekte werden als Formulardaten (&param=value) serialisiert, während verschachtelte Strukturen mit JSON.stringify() serialisiert werden.

Zum Beispiel wird das folgende Objekt:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

in einen String wie `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D` umgewandelt.

### Promises {#promises}

dhtmlxGantt unterstützt Promises (einschließlich IE8+). Intern wird die [Bluebird](https://github.com/petkaantonov/bluebird) Promise-Bibliothek verwendet. Um ein Promise zu erstellen, verwenden Sie diesen Konstruktor:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

Das Promise-Objekt ist innerhalb von Gantt definiert, nicht global.

Das AJAX-Modul gibt ein Promise zurück, sodass Sie die Promise-Syntax anstelle von Callbacks verwenden können. Zum Beispiel anstelle von:

~~~js
gantt.ajax.post(url, params, callback);
~~~

können Sie schreiben:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

Es ist möglich, sowohl Callbacks als auch Promises gemeinsam zu verwenden.

Das folgende Beispiel zeigt, wie mehrere Anfragen gleichzeitig gesendet werden und danach die Daten neu geladen werden:

~~~js 
gantt.Promise.all([
      gantt.ajax.post({url: "api/task", data: task1}),
      gantt.ajax.post({url: "api/task", data: task2}),
      gantt.ajax.post({url: "api/task", data: task3})
]).then(function(){
   gantt.clearAll();
   gantt.load("/api");
});
~~~

### Change log
- hinzugefügt in Version 4.0
