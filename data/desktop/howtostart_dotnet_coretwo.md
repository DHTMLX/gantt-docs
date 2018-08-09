dhtmlxGantt with ASP.NET Core 
==========================

In this tutorial you will learn how to create Gantt with [ASP.NET](https://www.asp.net/) Core 2 on the server side.

You can also read tutorials on other server-side technologies:

- desktop/howtostart_dotnet.md
- desktop/howtostart_php.md
- desktop/howtostart_php_laravel.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_ruby.md


To organize communication with database we will use the [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/).
We will build our application with the help of the Visual Studio 2017.

[Grab the demo from GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core).

## Step 1. Creating a Project

Launch Visual Studio 2017 and create a new project. Open the **File** menu and select: *New -> Project*.

Next select ASP.NET Core Web Application and name it *DHX.Gantt*.

![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step1.png)


Select an Empty template.


![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step2.png)


## Step 2. Adding Gantt Markup and JS

Go to **wwwroot** and create **index.html**

![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step3.png)


![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step4.png)


In the newly created file we will create a simple page for our gantt chart.

Note, that gantt files are added from the [CDN](desktop/install_with_bower.md#cdn) in this demo. If you have a Professional version of the component, 
you'll need to [add gantt files to your project manually](desktop/install_with_bower.md#addingprofessionaleditionintoproject). 

{{snippet index.html}}
~~~js
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css"
          rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            // specifying the date format
            gantt.config.xml_date = "%Y-%m-%d %H:%i";
            // initializing gantt
            gantt.init("gantt_here");

            // initiating data loading
            gantt.load("/api/data");
            // initializing dataProcessor
            var dp = new gantt.dataProcessor("/api/");
            // and attaching it to gantt
            dp.init(gantt);
            // setting the REST mode for dataProcessor
            dp.setTransactionMode("REST");
        });
    </script>
</head>
<body>
    <div id="gantt_here" style="width: 100%; height: 100vh;"></div>
</body>
</html>
~~~

When the page is loaded, in addition to [initializing gantt chart](desktop/initializing_gantt_chart.md) we immediately [call data loading](desktop/loading.md) and set up the 
[`dataProcessor`](desktop/server_side.md#technique) so all changes made to gantt chart by the user will be saved to the backend. We haven't implemented a backend yet, so it will make more sense later.

Next go to **Startup.cs** and tell the application to use this **index.html** page. In order to do so, we need to configure our app to server static files from the `wwwroot` folder. 
It's done in the `Configure` method by calling the `app.UseStaticFiles()` method.
You can find [more details here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

So, in **Startup.cs** replace the "Hello world" stub with these two lines of code:

~~~js
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DHX.Gantt
{
    public class Startup
    {
        // This method gets called by the runtime. 
        // Use this method to add services to the container.
        // For more information on how to configure your application, 
        // visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime.
        // Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles(); //!
            app.UseStaticFiles(); //!
        }
    }
}
~~~

Once you do it, you should be able to run the app and see an empty gantt on the page. Note that the "Invalid data" label at the top right corner shows up because we call `gantt.load()` 
while there is still no proper backend to serve the data. Once we implement the controller, gantt will be able to display tasks and links.

![dhtmlxGantt with ASP.NET Core 2 adding Gantt](001_adding_gantt.png)


Now we're done with the basic part and it's time to implement the backend. We'll start with implementing model classes and after that will proceed to WebAPI controller.
