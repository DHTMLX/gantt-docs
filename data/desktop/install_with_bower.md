How to Install dhtmlxGantt 
====================================

You can use [NuGet](https://www.nuget.org/), [Bower](https://bower.io/) or [npm](https://www.npmjs.com/) package managers to install the dhtmlxGantt package into your project.

It's also possible to include the necessary JS/CSS files from CDN.


npm - standard free version
-------------------------

You can install the Standard version of dhtmlxGantt from [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt), by executing the following command line:

~~~html
npm install dhtmlx-gantt
~~~

{{note Only the Standard version of the Gantt is available at [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) }}

npm - Evaluation and PRO versions
-----------------------------------

**Professional Evaluation version**

Download the [trial Gantt package](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) and follow the steps mentioned in the README file. 
Note that the trial Gantt version is available 30 days only.

**Professional version**

Send your **license number** to the ***contact@dhtmlx.com*** email to receive a login and a password for a private **npm** as well as a detailed guide on how to
install Gantt. Note that a private **npm** is available before the expiration of the proprietary Gantt license.


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

If you have the PRO version of the component, you need to go to the [Client Area](https://dhtmlx.com/clients/) and download the PRO package from there.

Independent of the version, unpack the downloaded package into a folder of your project. 
Then include **dhtmlxgantt.js** and **dhtmlxgantt.css** files into a page. Make sure that you set correct relative paths to these files:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

Adding PRO Edition into Project
---------------------------------

### **Install Pro version**

{{note
Before installing the Pro version of Gantt, you should [uninstall the trial version package](#uninstalltrialversion) (if you've installed it)
}}

All public sources (CDN, NuGet, Bower, and npm) contain a Standard edition of the component, which is distributed under the GPL license.

We also provide our [private npm registry](#npmevaluationandproversions) from where the Professional and Evaluation versions of the component can be installed.

If for some reason the methods described above are not available to you, there are two possible ways out:
 
- you can add the Pro version to your project by hand
- you can install the Pro version to your project via npm from a local directory

### Installing the package from a local folder {#installfromlocalfolder}

If case of **npm**, you can install the Pro package from a local folder using  [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) or [`npm link`](https://docs.npmjs.com/cli/link/).
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

### **Uninstall trial version** {#uninstalltrialversion}

The correct way to install the Pro version would be to remove the trial version package:

~~~js
npm uninstall dhtmlx-gantt
~~~

Then you need to thoroughly check that your applications don't have the *dhtmlxgantt.js* file anywhere.

**For Linux and MacOS**, you can use the following commands in the terminal:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**For Windows**, you can use the following commands in the command line:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app\*
findstr /mis "evaluation" path_to_your_app\*
~~~

After that you can install the Pro version of the Gantt chart as described above.

@index:
- desktop/cdn_links_list.md
