ignore_time
=============

@short: hides a time unit in the time scale

@type: function

@example:
// 0 refers to Sunday, 6 - to Saturday
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};

@template:	api_config
@descr:
The **ignore_time** method is a function that takes the cell's date as a parameter. To hide a unit - return *true* for it.

@related: desktop/custom_scale.md

