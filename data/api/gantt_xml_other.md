xml
=============
@short: specifies XML serialization and parsing
	

@type:object

@example:
var obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){...}}
@template:	api_config
@descr:
The XML object contains 2 members:

- **parse()** method  - defines how dhtmlxGantt will parse data in the XML format.
- **serialize()** method - defines how dhtmlxGantt will serialize data into the XML format. 
