ajax
=============

@short:
dhtmlx ajax module	

@type:
object

@example:

// assuming that the response is the following
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php", function(r){
    var t = JSON.parse(r.xmlDoc.responseText); // convert response to json object
    if (t && t.status == "ok") {
        // response is ok
    }
});

// HTTP POST
xhr.post("server.php", "paramName=paramValue", function(r){
    var t = JSON.parse(r.xmlDoc.responseText); 
    if (t && t.status == "ok") {
        // response is ok
    }
});

@template:	api_config
@descr:
API reference of ajax module can be found [here](http://docs.dhtmlx.com/api__refs__dhtmlxajax.html).

@changelog:
added in version 4.0
