getLightboxValues
=============
@short:returns values of the lightbox's sections
	

@returns:
- obj	object	the object of values 





@example:
gantt.getLightboxValues();

@template:	api_method
@related:
	api/gantt_getlightboxsection.md
@descr:
The method returns the values as a hash of *'section_name:value'* pairs 

~~~js
var values = gantt.getLightboxValues();
~~~

~~~js
values = {
	duration: 2,
	end_date: Fri Apr 05 2013 00:00:00 GMT+0300 (GTB Daylight Time),
	start_date: Wed Apr 03 2013 00:00:00 GMT+0300 (GTB Daylight Time),
	text: "Task #2.1"
}
~~~