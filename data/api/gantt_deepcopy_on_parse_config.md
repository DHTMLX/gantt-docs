deepcopy_on_parse
=============


@short: defines whether gantt will perform a deep copy of data objects passed into the gantt.parse() method
	

@type: boolean
@default: false
@example:
gantt.config.deepcopy_on_parse = true;

@template:	api_config
@descr:


- If the property is set to *true*, the gantt will attempt to implement a deep copy of the data objects passed into the [gantt.parse](api/gantt_parse.md) method. As a result, the inner gantt data objects will be disconnected from the source data objects and no changes made to the gantt will affect the original data object.
- If the property is set to *false* (default), the gantt will reuse the data objects provided in the [gantt.parse](api/gantt_parse.md) method (a shallow copy). The objects will be connected and changes made to the gantt will be applied to the original data object.

@changelog: added in v7.1

@relateapi:
api/gantt_parse.md