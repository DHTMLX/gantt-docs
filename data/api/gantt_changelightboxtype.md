changeLightboxType
=============

@short:repaints the lighbox for the task according to its type
	

@params:
- type	string	the task type	


@example:
gantt.changeLightboxType(gantt.config.types.project);

@template:	api_method
@descr:
The method repaints the lightbox and if possible saves all the input. For rebuilding the structure, the method uses the [configuration for the specified type](desktop/default_edit_form.md).

If the type of the lightbox is the same as the type in the parameter, the method does not repaint the lightbox.

@relatedapi:
api/gantt_onlightboxchange_event.md
