i18n
=============

@short: a set of methods for Gantt chart localization
	

@type: object

@example:

@template:	api_config
@descr:
The **i18n** object provides the following methods:

- **addLocale(languageCode, localeObject)** - adds a new custom locale in Gantt 
	- **languageCode** - (*string*) a two-letter language code 
	- **localeObject** - (*object*) an object of the locale
- **setLocale(localeObject: string|object)** - activates a specified locale

The method can take as a parameter either a language code:
~~~js
gantt.i18n.setLocale("fr");
~~~

or an object of the locale:

~~~js
gantt.i18n.setLocale({
   labels: {
       new_task:"new task"
   }
});
~~~

- **getLocale(languageCode : string)** - returns a locale object by the language code


@changelog: added in v7.0

@related: desktop/localization.md