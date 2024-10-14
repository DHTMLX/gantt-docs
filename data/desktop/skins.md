Available Skins
===================================

dhtmlxGantt provides several predefined skins that you can use to change the overall look of the Gantt chart:

1. [Terrace (default)](desktop/skins.md#terraceskin)
2. [Dark](skins.md#darkskin)
3. [Material](desktop/skins.md#materialskin)
4. [Contrast Black](desktop/skins.md#contrastblackskin) 
5. [Contrast White](desktop/skins.md#contrastwhiteskin)
6. [Skyblue](desktop/skins.md#skyblueskin) 
7. [Meadow](desktop/skins.md#meadowskin)
8. [Broadway](desktop/skins.md#broadwayskin)


Starting from v9.0, all skins are bundled in the main **dhtmlxgantt.css** file. A skin can be activated by setting the **gantt.skin** property:

~~~js
gantt.skin = "dark";
~~~

Or by calling the **gantt.setSkin** method:

~~~js
gantt.setSkin("dark");
~~~

In Gantt v8.0 and earlier skins are defined in separate CSS files. 

### Using fonts

By default, skins import the `Inter` font from `https://fonts.googleapis.com`. Read more about Google Fonts [here](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

If necessary, you can remove the font directly from **.less** files in the **codebase/sources/less/** folder and then rebuild the skin as described in the custom_skins.md article.

'Teracce' skin 
-----------------------------

To apply the default skin, include the default CSS file:


- **dhtmlxgantt.css**

<img alt="DHTMLX Gantt - Light Theme" src="desktop/gantt-default-skin.png"/>
{{sample 06_skins/01_default.html}}

'Dark' skin 
-----------------------------

To apply the 'Dark' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

<img alt="DHTMLX Gantt - Dark Theme" src="desktop/gantt-dark-skin.png" style="border: 1px solid #E4E4E4"/>

{{sample 06_skins/10_dark.html}}

'Material' skin
--------------------

To apply the 'Material' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "material";
~~~

<img src="desktop/gantt_material_skin.png"/>

{{sample
06_skins/09_material.html
}}

'Contrast Black' skin
--------------------
To apply the 'Contrast Black' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "contrast-black";
~~~

<img src="desktop/gantt_contrast_black_skin.png"/>
{{sample
06_skins/07_high_contrast_black.html
}}

'Contrast White' skin
---------------------
To apply the 'Contrast White' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "contrast-white";
~~~

<img src="desktop/gantt_contrast_white_skin.png"/>
{{sample
06_skins/08_high_contrast_white.html
}}

'Skyblue' skin
----------------------------------
To apply the 'Skyblue' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "skyblue";
~~~

<img src="desktop/gantt-skyblue-skin.png"/>
{{sample
06_skins/03_skyblue.html
}}



'Meadow' skin
-----------------------------

To apply the 'Meadow' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "meadow";
~~~


<img src="desktop/gantt-meadow-skin.png"/>
{{sample
06_skins/04_meadow.html
}}


'Broadway' skin
-----------------------------
To apply the 'Broadway' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "broadway";
~~~


<img src="desktop/gantt-broadway-skin.png"/>
{{sample
06_skins/05_broadway.html
}}




Starting from v6.3, the import of `Roboto` font was removed from the material skin. If necessary, you can add `Roboto` font manually, as in:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family=Open+Sans|Roboto:regular,medium,thin,bold'">
~~~