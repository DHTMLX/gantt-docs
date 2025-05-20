env
=============

@short:
	a set of flags which describe current environment

@type:object


@example:

if (gantt.env.isEdge) {
    // your code
}

@template:	api_config
@descr:

The possible flags are:

- isChrome	- set to true if browser is Chrome
- isSafari	- set to true if browser is Safari
- isEdge	- set to true if browser is Edge
- isSalesforce - set true if Gantt runs inside a SalesForce app
- isFF		- set to true if browser is Firefox
- isIE		- set to true if browser is Internet Explorer
- isOpera	- set to true if browser is Opera
- isIPad	- set to true if browser is Safari on IPad

@changelog:
- added in version 4.0
- updated in 9.0.11

