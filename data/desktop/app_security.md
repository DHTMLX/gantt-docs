Application Security
=======================

Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the application. The backend must properly validate/escape/cleanse incoming data, user access rules, etc.

Please note that the client-side validation can be easily compromised or bypassed completely, thus it can't be relied on as a security means. It is aimed to give a user an immediate feedback in case of an erroneous input, without having to wait a server response, while the final validation should be done on the server. 

Here we highlight the most common types of attack and show possible ways to avoid them. Usually, just implementing the backend CRUD according to the best practices of your platform will be good enough.


##XSS Attacks

Possible vectors for XSS attacks are [Gantt template functions](api/refs/gantt_templates.md), [user input via UI](desktop/default_edit_form.md) 
and unsafe CRUD implementation on the backend:

- a [template](api/refs/gantt_templates.md) output is injected into the inner HTML of Gantt as is, without any escaping or pre-processing. 
Templates allow inserting a custom markup (formatted text, icons, buttons, etc.) into Gantt elements by design. However, it creates a possibility for injecting a remote code into the page. 

{{editor		http://snippet.dhtmlx.com/01da6922e			Template XSS}}

Any template can be redefined with the implementation you find suitable.

- the lightbox doesn't have any default validation of a client input, which, if not handled, also creates a gateway for XSS attacks.

{{editor		http://snippet.dhtmlx.com/c20f8733f			Lightbox XSS}}

Please [check the article on the client-side validation](desktop/validation.md#clientsidevalidation).

- the backend API that is used to save/load data into Gantt (which lies within the responsibility of the developer) is expected to escape the input/output and provide Gantt with safe data. If you use [dhtmlxConnector](desktop/howtostart_connector.md), it will [escape and sanitize the client input automatically](https://docs.dhtmlx.com/connector__php__app_security.html#protectionfromcrosssitescriptingxss). If you implement the backend on your own, you should consider escaping data you save to the database and load into Gantt by yourself.


##SQL Injections

dhtmlxGantt is 100% client-side component, thus SQL injections have to be prevented on the backend by the developer.

There are two points to consider:

- The lightbox doesn't have any default validation, which, if not handled, allows the user to enter any values into editable inputs.
- your backend API can be called by a PUT/POST request containing dangerous values manually, bypassing the client-side UI.

Thus you'll need to have some kind of SQL injections escaping on your backend. If you use [dhtmlxConnector](desktop/howtostart_connector.md) and specify a table configuration as shown in our [documentation](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase), all values will be escaped automatically. Otherwise, you'll have to use a safe CRUD implementation, according to the good practices of the platform you use. Implementations shown in the [how to start guides](desktop/howtostart_guides.md) should be safe in terms of SQL injections.


##CSRF Attacks

If you use [dhtmlxConnector](desktop/howtostart_connector.md) on the backend, CSRF security can be enabled in the connector configuration. See the details
[in the related article](https://docs.dhtmlx.com/connector__php__app_security.html#preventingcsrfandxsrfattacks).

Otherwise, you'll have to handle it manually. Please check [this article](desktop/server_side.md#customrequestheadersandparameters) for adding custom tokens of headers to a request sent by Gantt to the backend. 

##Content Security Policy

The library provides a special extension that allows you to adjust the code of your application created with dhtmlxGantt to comply with the CSP (Content Security Policy) 
standard. It helps preventing various code injection attacks and improve the safety of application. 
[Read more about applying the CSP standard to a dhtmlxGantt application](desktop/content_security_policy.md).


@linkclass:hidden