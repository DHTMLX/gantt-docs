onLightboxButton
=============

@short:fires when the user clicks on a custom button in the lightbox
	

@params: 
- css	string	the name of the CSS class applied to the button
- node	HTMLElement	 an HTML element of the clicked button
- e		Event	 a native 'click' event object

@example: 
gantt.attachEvent("onLightboxButton", function (css, node, e){
	//any custom logic here
});



@template:	api_event
@descr: 
The event fires only for custom buttons at the bottom of the lightbox and doesn't fire
for the default buttons.

