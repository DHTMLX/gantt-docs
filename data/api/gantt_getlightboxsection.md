getLightboxSection
=============
@short:returns the object of the lightbox's section 
	

@params:
- name	string | number	the name of the section

@returns:
- obj	object 	the section object



@example:
var time = gantt.getLightboxSection('time');
var descr = gantt.getLightboxSection('description');
 
//gets the value
var value = time.getValue();
var value1 = descr.getValue();
 
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


- **section** - (*object*) the configuration object of the section
  - **id** -  (*string*) the section id
  - **name** - (*string*) the section name. According to the name, the gantt takes the label for the section from the **locale.labels** collection. For example, for the 'description' section , 
  the label will be taken as **gantt.locale.labels.section_description**
  - **height** - (*number*) the section height
  - **map_to** - (*string*) the name of a property mapped to the editor
  - **type** - (*string*) the editor type
  - **focus** - (*boolean*) if set to *true*, the related field will take the focus on opening the lightbox
- **node** - (*HTMLElement*) a div with the section body
- **header** - (*HTMLElement*) a div with the section header
- **control** - (*HTML collection*) a collection of controls used in the section
  
###Methods

- **getValue()** - returns an object with the section's data
- **setValue()** - sets the value(s) for the section. As a parameter the method takes a value (or an object with values if the section has several controls) that should be set


