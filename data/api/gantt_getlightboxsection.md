getLightboxSection
=============
@short:returns the object of the lightbox's section 
	

@params:
- name	string | number	the name of the section

@returns:
- obj	LightboxSectionState 	the section object



@example:
const time = gantt.getLightboxSection('time');
const descr = gantt.getLightboxSection('description');
 
//gets the value
const value = time.getValue();
const value1 = descr.getValue();
 
//sets the value
descr.setValue('New Task'); //for sections that contain the only control
time.setValue(null,{
	start_date:new Date(2020,03,10), 
    end_date:new Date(2022,03,10), 
    duration:5
}); //for multi-control sections: the 1st parameter is 'null', 2nd - a data object


@template:	api_method
@descr:

The section object contains the following members:

###Properties


- <span class=subproperty>**section**</span> - (*object*) - the configuration object of the section
    - **_id_** - (*string*) - the section id
    - **_name_** - (*string*) - the section name. According to the name, the gantt takes the label for the section from the **locale.labels** collection. For example, for the 'description' section, the label will be taken as **gantt.locale.labels.section_description**
    - **_height_** - (*number*) - the section height
    - **_map_to_** - (*string*) - the name of a property mapped to the editor
    - **_type_** - (*string*) - the editor type
    - **_focus_** - (*boolean*) - if set to *true*, the related field will take the focus on opening the lightbox
- <span class=subproperty>**node**</span> - (*HTMLElement*) - a div with the section body
- <span class=subproperty>**header**</span> - (*HTMLElement*) - a div with the section header
- <span class=subproperty>**control**</span> - (*HTMLCollection*) - a collection of controls used in the section


  
###Methods

- <span class=submethod>**getValue (): any**</span> - returns an object with the section's data
- <span class=submethod>**setValue (value, valueObject): any**</span> - sets the value(s) for the section. As a parameter the method takes a value (or an object with values if the section has several controls) that should be set
    - **_value_** - (*any*) - a value for the section
    - **_valueObject?_** - (*CustomObject*) - optional, an object with any properties



