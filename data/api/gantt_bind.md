bind
=============


@short:
	creates a new function that, when called, has its <i>this</i> keyword set to the provided value

@params:

- method		function			the target function
- thisArg		object				the value to be passed as the <i>this</i> parameter to the target function when the bound function is called

@returns:

- bound_function		function		 a new function that, when called, has its <i>this</i> keyword that will be passed to the target function

@example:

gantt.bind(method, thisArg);

@template:	api_method
@descr:
The method is used as the IE8 compatible replacement of the
[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 
function.

@changelog:
added in version 4.0