destructor
=============

@short:
	destroys the gantt instance

@params:


@example:
var myGantt = Gantt.getGanttInstance();

//destroying a gantt instance
myGantt.destructor();

@template:	api_method

@descr:
The method destroys a gantt instance and calls the api/gantt_ondestroy_event.md event.

Calling a destructor will:

- clear the data loaded into a gantt instance
- destroy the api/gantt_dataprocessor.md (if it is attached to the gantt)
- detach the gantt from DOM
- detach all DOM events attached via the api/gantt_event.md method

{{note
If you use a package that does not allow creating multiple instances of a gantt (GPL or Individual editions), calling the gantt destructor will make gantt inaccessible until page reload.
}}

@related:
	desktop/multiple_gantts.md#destructorofganttanddataprocessorinstances
@relatedapi:
    api/gantt_ondestroy_event.md
@changelog:
added in version 5.1

