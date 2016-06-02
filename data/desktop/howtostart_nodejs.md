How to Start with Gantt for Node.js
===================================

The current tutorial is intended for creating Gantt with Node.js. If you use some other technology, check the list of available integration variants below:

- desktop/how_to_start.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_ruby.md

Our Gantt implementation in Node.js will be based on REST API that will be used for communication with server. 
Node.js has a set of ready-made solutions, so we won’t have to code everything from the very beginning.

Step 1. Creating a simple Node.js app
-------------------------------

###Preparing Node.js modules

We'll make use of the following resources:

- [Express](http://expressjs.com/) - a tiny framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - a Node.js parsing tool
- [date-format-lite](https://github.com/litejs/date-format-lite) - a small library that will help us to convert dates into the propert format
- [node-mysql](https://github.com/felixge/node-mysql) - a Node.js client for working with MySQL

