changeLightboxType
=============

@short:repaints the lighbox for the task according to its type
	

@params:
- type	string	the task type	


@returns:
- result	void|boolean	void if the type is changed, `true` if there is no need to change the type


@example:
gantt.changeLightboxType(gantt.config.types.project);

@template:	api_method
@descr:
The method repaints the lightbox and if possible saves all the input. For rebuilding the structure, the method uses the [configuration for the specified type](desktop/default_edit_form.md).

If the old type is the same as the type in the parameter, the method returns `true` and does nothing.

@relatedapi:
api/gantt_onlightboxchange_event.md
