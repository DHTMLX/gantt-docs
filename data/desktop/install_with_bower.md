How to Install dhtmlxGantt 
====================================

You can use [NuGet](https://www.nuget.org/), [Bower](https://bower.io/) or [npm](https://www.npmjs.com/) package managers to install the dhtmlxGantt package into your project.

It's also possible to include the necessary JS/CSS files from CDN.

NuGet
-------------------------

To install dhtmlxGantt through [NuGet](https://www.nuget.org/), execute the following command line:

~~~html
nuget install DHTMLX.Gantt
~~~

If you are using Microsoft Visual Studio, run the following command from the Package Manager Console:

~~~html
install-package DHTMLX.Gantt
~~~


Bower
-------------------------

To install dhtmlxGantt through [Bower](https://bower.io/), execute the following command line:

~~~html
bower install gantt
~~~

npm
-------------------------

To install dhtmlxGantt through [npm](https://www.npmjs.com/package/dhtmlx-gantt), execute the following command line:

~~~html
npm install dhtmlx-gantt
~~~

CDN
-----

To include JS/CSS files from CDN, you should set direct links to **dhtmlxgantt.js** and **dhtmlxgantt.css** files:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

You can find the full list of links that you can include from CDN, depending on the version of dhtmlxGantt in a [separate article](desktop/cdn_links_list.md).

Download the Package
---------------------

###GPL version

[Download the package of dhtmlxGantt GPL version](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml). 


###PRO version

If you have the Commercial or Enterprise license, you need to go to the [Client Area](https://dhtmlx.com/clients/) and download the PRO package from there.

Independent of the version, unpack the downloaded package into a folder of your project. 
Then include **dhtmlxgantt.js** and **dhtmlxgantt.css** files into a page. Make sure that you set correct relative paths to these files:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~



Adding PRO Edition into Project
---------------------------------

All public sources (CDN, NuGet, Bower, and npm) contain a Standard edition of the component, which is distributed under the GPL license.
Currently we don't have corresponding private servers from where the Professional version of the component can be installed. There are two possible ways out:
 
- you can add the Pro version to your project by hand.
- you can install the Pro version to your project via npm from a local directory.

If case of npm, you can install the Pro package from a local folder using  [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) or [`npm link`](https://docs.npmjs.com/cli/link/).
There are step-by-step instructions for both variants:

###npm install

1. Copy the Gantt package into some local directory.
2. Go to your project directory. 
3. Call `npm install ../gantt-local-package-path`.

###npm link

1. Copy the Gantt package into some local directory.
2. Call `npm link` in the package folder.
3. Go to your project directory.
4. Call `npm link dhtmlx-gantt`.

To see the difference between the Standard and PRO versions of the dhtmlxGantt library, check the related article desktop/editions_comparison.md.


@index:
- desktop/cdn_links_list.md
