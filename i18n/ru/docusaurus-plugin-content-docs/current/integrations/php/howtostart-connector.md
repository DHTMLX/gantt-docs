---
title: "dhtmlxGantt с dhtmlxConnector"
sidebar_label: "dhtmlxGantt с dhtmlxConnector"
---

# dhtmlxGantt с dhtmlxConnector

Этот учебник покажет, как создать базовую диаграмму Ганта на странице, которая сможет сохранять и обновлять задачи в базе данных (то есть на сервере).

Настоящий учебник предназначен для создания Gantt с [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html).  
Если вы хотите использовать другую серверную технологию, смотрите список доступных вариантов интеграции ниже:

- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP:Slim3](integrations/php/howtostart-php.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)

**Связанный пример**: [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Шаг 1. Загрузка пакета dhtmlxGantt

Начнем руководство с загрузки пакета библиотеки на ваш компьютер.

**Сделайте следующее:**

<ul>
  <li>Скачайте пакет dhtmlxGantt <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>здесь</a>, если вы еще этого не сделали.</li>
  <li>Распакуйте пакет в корневой каталог вашего локального веб-сервера. Распакованные файлы будут сохранены в папку с тем же именем, что и пакетный файл - dhtmlxGantt.</li>
</ul>

## Шаг 2. Подключение файлов кода dhtmlxGantt

Затем нужно подключить файлы кода dhtmlxGantt в ваш HTML-файл (чтобы можно было использовать функциональность библиотеки).  
Файлы кода dhtmlxGantt:

- `dhtmlxgantt.js`
- `dhtmlxgantt.css`

**Делайте следующее:**

1. Создайте HTML-файл в папке `dhtmlxGantt` (папка с файлами dhtmlxGantt). Назовите его, например, `myGantt.html`.
2. Подключите файлы кода dhtmlxGantt к файлу **myGantt.html** (оба файла находятся в папке `codebase`). См. myGantt.html:

~~~html
<!DOCTYPE html>
<html>
<head>
  <title>How to Start with dhtmlxGantt</title>
  <script src="codebase/dhtmlxgantt.js"></script> <!-- important -->
  <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> <!-- important -->
</head>
<body>
  <!-- your code will be here -->
</body>
</html>
~~~

## Шаг 3. Инициализация dhtmlxGantt

<div>

Затем необходимо создать DIV-контейнер и инициализировать dhtmlxGantt внутри него.

Обратите внимание, что dhtmlxGantt является статическим объектом и может быть создан на странице один раз.  
Чтобы обратиться к экземпляру dhtmlxGantt, можно использовать **dhtmlxGantt** или просто **gantt**.

<div>
  <span>Делайте следующее:</span>
</div>

- Определите DIV-контейнер в файле **myGantt.html**.
- Инициализируйте dhtmlxGantt с помощью команды <code>gantt.init("gantt_here")</code>.  В качестве параметра метод принимает HTML-контейнер, куда будет помещена диаграмма Ганта.

~~~html title="myGantt.html"
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
	<div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript">
		gantt.init("gantt_here"); /*!*/  
	</script>
</body>
</html>
~~~

</div>
Примечание: если вы используете полноэкранный режим, укажите текущий стиль, чтобы гарантировать корректное поведение:

~~~js
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

## Шаг 4. Загрузка данных в диаграмму Ганта

Затем необходимо заполнить диаграмму Ганта данными из образца источника данных. Мы воспользуемся самым простым способом и укажем источник данных в виде встроенного объекта.  
Чтобы загрузить данные, мы будем использовать метод [parse](api/method/parse.md), который принимает имя источника данных в качестве параметра.  
Свойства объекта:

- <b>data</b> - указывает задачи Gantt.
  - <b>id</b> - (<i>string, number</i>) идентификатор события.
  - <b>start_date</b> - (<i>Date</i>) дата начала.
  - <b>text</b> - (<i>string</i>) описание задачи.
  - <b>progress</b> - (<i>number</i>) число от 0 до 1, показывающее, какой процент задачи выполнен.
  - <b>duration</b> - (<i>number</i>) длительность задачи в единицах текущего масштаба времени.
  - <b>parent</b> - (<i>number</i>) идентификатор родительской задачи.
  - <b>links</b> - указывает зависимые связи Gantt
    - <b>id</b>-(<i>string, number</i>) идентификатор события.
    - <b>source</b>-(<i>number</i>) идентификатор исходной задачи.
    - <b>target</b>-(<i>number</i>) идентификатор целевой задачи.
    - <b>type</b>-(<i>string</i>) тип зависимости: 0 - 'finish to start', 1 - 'start to start', 2 - 'finish to finish'.

<div> <span>Делайте следующее:</span></div>

Объявите переменную 'tasks' в файле <b>myGantt.html</b>:

~~~js title="myGantt.html"
var tasks = {
    data:[
        {id:1, text:"Project #1",start_date:"01-04-2013", duration:11,
        progress: 0.6, open: true},
        {id:2, text:"Task #1",     start_date:"03-04-2013", duration:5, 
        progress: 1,   open: true, parent:1},
        {id:3, text:"Task #2",   start_date:"02-04-2013", duration:7, 
        progress: 0.5, open: true, parent:1},
        {id:4, text:"Task #2.1", start_date:"03-04-2013", duration:2, 
        progress: 1,   open: true, parent:3},
        {id:5, text:"Task #2.2", start_date:"04-04-2013", duration:3, 
        progress: 0.8, open: true, parent:3},
        {id:6, text:"Task #2.3", start_date:"05-04-2013", duration:4, 
        progress: 0.2, open: true, parent:3}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:1, target:3, type:"1"},
        {id:3, source:3, target:4, type:"1"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};
~~~

Вызовите команду <code>gantt.parse(tasks)</code> после строки <code>gantt.init("gantt_here")</code>:

~~~js title="myGantt.html"
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

**Связанный пример**: [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

## Шаг 5. Создание базы данных

:::note
Прочитайте это и последующие шаги, если хотите загружать данные из базы данных вместо встроенного объекта.
:::

Затем нужно создать базу данных с двумя таблицами для хранения задач и зависимостей. 
<i><b>sortorder</b> — свойство, которое используется только при загрузке данных из базы данных. Это свойство задаёт индекс задачи среди соседей.</i>
<span>Делайте следующее:</span>
Создайте новую базу данных с именем - <i>gantt</i>.
Выполните приведённый ниже код для создания 2 таблиц в ней: <i>gantt_tasks</i> и <i>gantt_links</i>.

~~~sql
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 0,
  `progress` float NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~

Чтобы иметь возможность сохранять задачи в базе данных, когда какая‑то колонка имеет пустое значение, добавьте следующий код в файл **myGantt.html**:

~~~js title="myGantt.html"
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~

## Шаг 6. Загрузка данных из базы данных

:::note
В следующих двух шагах мы будем использовать платформу PHP для реализации интеграции сервер–клиент.

 Если вы используете другую платформу, пожалуйста, прочитайте статью [](guides/loading.md), чтобы узнать, как самостоятельно реализовать серверный скрипт.
:::

Далее необходимо обеспечить возможность отображения данных из базы данных в диаграмме. Сделаем это с помощью метода [load](api/method/load.md), который принимает URL к источнику данных в качестве параметра. В случае базы данных это PHP-файл, который реализует подключение к серверной стороне. Мы будем использовать платформу PHP и библиотеку <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a>, так как это самый простой способ реализовать серверную логику для dhtmlxGantt.
<span>Делайте следующее:</span>
Создайте PHP-файл в папке 'dhtmlxGantt' и назовите его, например, <b>data.php</b>.
Откройте файл <b>data.php</b> и добавьте в него следующий код со стороны сервера:

~~~php title="data.php"
<?php

include ('codebase/connector/gantt_connector.php');

$res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

$gantt = new JSONGanttConnector($res);
$gantt->render_links("gantt_links","id","source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,sortorder,parent"
);
?>
~~~

Переключитесь на файл <b>myGantt.html</b> и установите свойство <code>gantt.config.date_format</code> в <i> "%Y-%m-%d %H:%i"</i>, чтобы формат выходных данных соответствовал формату dhtmlxGantt.

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~

Вызовите команду <code>gantt.load('data.php')</code> для загрузки данных из базы данных в диаграмму Гantt.

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//loads data to Gantt from the database  /*!*/  
~~~

### Сопоставление столбцов базы данных

Обратите внимание, что порядок столбцов в **$connector->render_table** важен. Первые три столбца в списке столбцов сопоставляются с свойствами *start_date/duration/text* или *start_date/end_date/text* объекта задачи на стороне клиента соответственно, независимо от того, какие имена столбцов вы указываете. Логика сопоставления столбцов описана ниже. 
 
Второй столбец сопоставляется с *task.duration*, если вы указываете 'duration' в конфигурации:

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~

или, используя псевдоним:

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
 // JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~

Если указан другой имя столбца, второй столбец будет сопоставлен со свойством *end_date*:

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
 // JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~

#### Сопоставление других столбцов

Все остальные столбцы будут сопоставляться по своим именам без изменений:

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
 // JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~

Алиасы можно использовать и для других столбцов:

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
 // JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~

## Шаг 7. Обновление данных в базе данных

Здесь нужно обеспечить возможность сохранения изменений, внесённых в диаграмму Гantt, обратно в базу данных. Для этого будем использовать вспомогательную библиотеку DataProcessor. Все, что нужно сделать, — инициализировать DataProcessor и привязать его к объекту dhtmlxGantt.

<span>Делайте следующее:</span>

Откройте файл <b>myGantt.html</b> и инициализируйте dhtmlxDataProcessor командой <code>dataProcessor("data.php")</code>.
Прикрепите объект dhtmlxDataProcessor к объекту dhtmlxGantt командой <code>dp.init(gantt)</code>.

~~~js title="myGantt.html"
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~

## Ведение журнала ошибок

Если вы выполнили указанные выше шаги, но что‑то все ещё не работает, включите ведение журнала в Gantt для выявления ошибки.

Прежде всего, убедитесь, что в каталоге, где расположен HTML‑файл, есть права на запись. Затем добавьте следующую строку в файл **data.php**:

~~~php title="data.php"
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

После этого логи можно просматривать в файле **log.txt**.

## Что дальше?

На этом всё. Получилась базовая, но функциональная диаграмма Gantt, которая может загружать данные из базы и сохранять их обратно. Теперь можно настраивать и адаптировать её под ваши нужды.

Мы рекомендуем на следующем этапе ознакомиться с этими статьями:

- [Configuration](guides/common-configuration.md) → Конфигурация
- [Event handling](guides/handling-events.md) → Обработка событий
- [Data loading](guides/loading.md) → Загрузка данных