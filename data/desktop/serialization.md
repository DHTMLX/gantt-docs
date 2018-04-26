Serializing Data into XML and JSON 
===============================================

JSON format
--------------------------------------------------

To serialize data from a Gantt chart into a JSON object, use the api/gantt_serialize.md method as in:

~~~js
var json = gantt.serialize();
~~~

As a result, the **json** variable from the code above will look something like this:

~~~js
{
 "data": [{"id":"11", "text":"Project #1", "start_date":"01-04-2013 00:00", ...}, ...], 
 "links":[{"id":"1", "source":"1", "target":"2", "type": "1"}, ...]
}
~~~

XML format
----------------------------------

To serialize data from a Gantt chart into an XML string, use the api/gantt_serialize.md method as in:

~~~js
var xml = gantt.serialize("xml");
~~~

As a result, the **xml** variable from the code above will look something like this:

~~~html
"<data>
	<task id='11' parent=''   start_date='01-04-2013 00:00' duration='11' 
     open='true' progress='0.6' end_date='12-04-2013 00:00'>
    	<![CDATA[Project #1]]>
    </task>
    <task id='12' parent='11' start_date='03-04-2013 00:00' duration='5' 
     open='true' progress='1' end_date='08-04-2013 00:00'>
    	<![CDATA[Task #1]]>
    </task>
</data>"
~~~

{{note
Serialization to old (dhtmlxGantt <2.0) XML format  is not available
}}

{{todo check json format example}}