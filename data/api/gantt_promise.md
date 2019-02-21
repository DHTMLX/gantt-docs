Promise
=============

@short:
	Promise object constructor

@params:





@example:

new gantt.Promise(function(resolve, reject) {
	setTimeout(function(){
       resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});



@template:	api_method

@descr:

[Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) Promise object constructor, bundled with the Gantt library.
