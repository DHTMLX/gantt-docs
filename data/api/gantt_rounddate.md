roundDate
=============

@short:rounds the specified date to the nearest date in the time scale
	

@params:
- date	Date, object 	the Date object to round or an object with settings


@returns: 
- date	Date	the rounded Date object


@example:
var today = gantt.roundDate(new Date());

@template:	api_method
@descr:
If the specified date should be rounded to the nearest date, pass the Date object as a parameter to the method:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

If the specified date should be rounded to the nearest date considering the unit of time, pass an object with settings to the **roundDate()** method. The object can take the following attributes:

- **date** - (*object*) the Date object to round;
- **unit** - (*string*) the time unit ("minute", "hour", "day", "week", "month", "year");
- **step** - (*number*) the step of the time scale (X-Axis), 1 by default.

~~~js
var today = gantt.roundDate({
    date: new Date(),
    unit: "hour",
    step: 1   
});
console.log(today);
~~~

@relatedapi:
	api/gantt_roundtaskdates.md