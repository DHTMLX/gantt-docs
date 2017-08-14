getClosestWorkTime
=============
@short:returns the closest working time
	

@params:
- config	object		the configuration object 
* task		object		optional, the object of the task the duration of which should be calculated

@returns: 
- date		Date	a Date object of the closest working time 


@example:

@template:	api_method
@descr:

Configuration object properties
---------------------------------------

The configuration object can contain the following properties:

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Property 
		</th>
		<th>
			Description
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td rowspan=2><b id="date">date</b></td>
        <td>a date to get the closest working time for</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
gantt.getClosestWorkTime({date:new Date(2013,0,1), dir:"future"})
// -> Wed Jan 02 2013 00:00:00 if duration_unit="day"
// -> Wed Jan 02 2013 08:00:00 if duration_unit="hour"
~~~
		</td>
	</tr>
    <tr>
		<td rowspan=2><b id="dir">dir</b></td>
        <td> (<i>'future'</i> or <i>'past'</i>) specifies the direction of the closest time</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
gantt.getClosestWorkTime({date:new Date(2013,0,1), dir:"past"})
// -> Mon Dec 31 2012 17:00:00
~~~
		</td>
	</tr>
	<tr>
		<td rowspan=2><b id="unit">unit</b></td>
        <td> a time unit to search for the closest working time</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//searches for the closest working hour
gantt.getClosestWorkTime({
	date:new Date(2013,0,1), 
    dir:"future", 
    unit:"hour"
});// ->Wed Jan 02 2013 08:00:00
~~~
		</td>
	</tr>
	</tbody>
</table>

