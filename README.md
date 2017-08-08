# E-Wallet

E-Wallet app by team 2 (Ashwin, Chaitra, Gayathri and Rishikesh).

## Setup

Commands to run after installing node & npm

* `npm install`: Install dependencies
* `npm install nodemon -g` Install nodemon globally if you don't have it installed already
* `npm install -g @angular/cli`: To install the Angular CLI
* `npm start`: Launch the server


### Project structure

```
├── server/                      * Source of Server side app
|   ├── api/                     * Every Services/Routes
│   ├── db/                      * All database connections
|   |    └──db-pg-connection.js  * Database config/connection for postgres
│   ├── app.js                   * Entry point of the application, launches the server
│   ├── app.router.js            * Main router
├── bootstrap-app.js             * Bootsrap the application for ES6 using Babel
├── client/                      * Source of Client side app
│   └── public                   * Public folder to contain static distribution files
│       └──index.html            * Starting point for front-end app
├── node_modules/                * NPM third party modules
├── nodemon.json                 * Nodemon config file
├── package.json                 * Third party libraries list
└── README.md                    * This file
```

### Web Service

A web service is specified by a route and is in the server/api folder. Here is the common structure for a web service:

```
server/api/                         * Every web services
└── employee                        * Folder of the web service
    ├── employee.controller.js      * No logic, just passing the request parameters to the service
    ├── employee.router.js          * Set routes to controller methods
    └── employee.service.js         * The logic of the web service
```
NOTE: To test the employee service example, create an employees table and add atleast one entry into the table.

### Front End

#To Run App -
- cd into the app
- npm install
- ng serve / ng serve --host=0.0.0.0 --port=xxxx

#To Build App -
- cd into app
- ng build
