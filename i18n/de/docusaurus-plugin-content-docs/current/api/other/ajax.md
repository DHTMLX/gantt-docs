---
sidebar_label: ajax
title: Ajax-Konfiguration
description: "Gantt Ajax-Modul"
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

### API-Referenz

Alle Methoden können als Parameter entweder:

1) RequestConfig - ein Objekt mit Optionen der Anfrage-Konfiguration, das wie folgt aussieht:

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

- url - die URL zum Server
- method - optional, die Methode, die zum Senden der Anfrage verwendet wird, standardmäßig "GET"
- data - optional, die an den Server durch die POST-Anforderung gesendeten Daten. Die POST- und PUT-Methoden akzeptieren sowohl einen String als auch ein Objekt mit Daten
- async - optional, der Modus zum Senden von Daten an einen Server, standardmäßig true
- callback - optional, eine Funktion, die nach dem Laden der Antwort aufgerufen wird
- headers - optional, eine Menge von Headers, definiert als Paare "key":"value", die mit einer Anfrage gesendet werden sollten

oder:

2) Drei Parameter (außer für die **query()**-Methode, die nur das *RequestConfig*-Objekt akzeptieren kann): 

- url - die URL zum Server
- data - optional, die an den Server durch die POST-Anforderung gesendeten Daten
- callback - optional, eine Funktion, die nach dem Laden der Antwort aufgerufen wird

Die Liste der ajax-Modul-API ist unten aufgeführt:

#### Callback-Optionen

Alle Methoden unterstützen sowohl Callbacks als auch [promises](#promises) zur Verarbeitung der Antwort.

Ein ajax-Promise gibt ein fertiges XmlHttpRequest zurück:

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

Aus historischen Gründen erhält die Callback-Option den Wert in einem leicht abweichenden Format:

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

die allgemeine Methode zum Senden von Anfragen. Ermöglicht das Senden jeder Art von Anfrage (Sie müssen lediglich die gewünschte Anfrage in den Parametern angeben)

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

sendet eine GET-Anfrage

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

sendet eine PUT-Anfrage

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // Ihr Code hier
});
 // oder
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
   data: {}
});
~~~

#### del

sendet eine DELETE-Anfrage 

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

sendet eine POST-Anfrage

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // Ihr Code hier
});
 // oder
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" }
      data: {}
});
~~~

### Senden von Daten mit POST/PUT-Methoden

Sie können ein Objekt mit Daten anstelle eines Strings in die **post**- und **put**-Methoden übergeben. Falls ein Objekt übergeben wird, serialisiert das ajax-Modul es automatisch. 
Ein einfaches Objekt wird als Formulardaten (&param=value) serialisiert, verschachtelte Strukturen werden mithilfe von JSON.stringify() serialisiert.

Beispiel des folgenden Objekts:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

wird in eine Zeichenkette konvertiert, die wie `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D` aussieht.

### Promises

dhtmlxGantt unterstützt die Verwendung von promises (einschließlich IE8+). Für die Arbeit mit promises verwendet Gantt die [Bluebird](https://github.com/petkaantonov/bluebird) Promise-Bibliothek. 
Um ein Promise zu erstellen, verwenden Sie den folgenden Konstruktor:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

Promise wird innerhalb von Gantt deklariert, nicht global für die Anwendung.

Das AJAX-Modul gibt ein Promise zurück, das die Verwendung der Promise-Schnittstelle statt des Callbacks ermöglicht. So statt zu verwenden

~~~js
gantt.ajax.post(url, params, callback);
~~~

können Sie beim Senden einer POST-Anfrage Folgendes verwenden:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

Es ist möglich, Callbacks und Promises gleichzeitig zu verwenden. 

Das folgende Beispiel zeigt, wie Sie mehrere Anfragen gleichzeitig an den Server senden und danach Daten neu laden können: 
 
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