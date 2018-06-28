constants
=============

@short:
	stores various constants to reduce the use of magic numbers in the code 

@descr:
    stores various constants to reduce the use of magic numbers in the code. Currently stores only **KEY_CODES** object


@type: object

@example:
document.addEventListener("keypress", function(e){
   var keys = gantt.constants.KEY_CODES;
   if(e.keyCode === keys.ENTER){
    // do on enter
   }
});


@template:	api_config
@descr:


