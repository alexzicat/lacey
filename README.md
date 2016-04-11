# Lacey
[![Build Status](https://travis-ci.org/alexzicat/lacey.svg?branch=master)](https://travis-ci.org/alexzicat/lacey)  
***Lacey*** is a (really) small javascript library for module oriented development.

## Table of contents
- [Quick start](#quick-start)
- [How to use](#how-to-use)
    * [Project Structure](#project-structure)
    * [Creating the app](#creating-the-app)
    * [Registering modules](#registering-modules)
    * [Instantiating a module](#instantiating-a-module)

## Quick start
There is many different options you can use to install the library to your project.

#### Install with npm
```shell
npm install lacey --save
```
 
#### Install with Bower
```shell
bower install lacey --save
```

Once installed, add a script tag to your html header pointing to `lacey/dist/lacey.js`.  
You can also use the minified version: `lacey/dist/lacey.min.js`
  
#### Install with Ruby
The official ***lacey*** gem is [lacey-rails](https://github.com/alexzicat/lacey-rails).  
***lacey-rails*** is a gemified version of the library that act as a wrapper for an easier integration with the rails asset pipeline.

Add this line to your application's Gemfile:

```ruby
gem 'lacey-rails', '~> 1.0.0'
```

And then execute:
```shell
bundle install
````
    
Or install it yourself:
```shell
gem install lacey-rails
````

Add the following directive to your Javascript manifest file (application.js):
```ruby
//= require lacey
```
The ***lacey-rails*** gem provides no minified version of the library and lets the asset pipeline take care of the job.

## How to use
Once the library is installed, you are now ready to create a ***lacey*** app: 

#### Project Structure
A ***lacey*** project is structured as follows:
```
javascripts/
├── modules/
│   ├── a_module.js
│   ├── another_module.js
├── app.js
```
**The project structure proposed is not required, only recommended.*

#### Creating the app
You can now create your *app.js* file.  
This file contains :
```javascript
window.app = new LaceyApp('name_of_your_app'); // choose a pertinent name for your app
```

Your app serves the purpose of registering modules. It acts as the glue that binds you modules together.  

**The available methods are:**  

```javascript
app.name; // returns the name of the app (ex: 'name_of_your_app')
```
```javascript
app.modules; // returns an array of registered modules
```
```javascript
app.register_module(...); // registers a module
```
```javascript
app.unregister_module(...); // unregisters a module
```

#### Registering modules
Modules contains code for a component of your app. The idea is to scope all of the functions and variables pertaining to a certain functionality. Inside a module, you are now able to define *public* and *private* variable.  

A module is registered like this:
```javascript
app.register_module('Filters', function(){
    this.name_filter = 'alex';
    this.age_filter = 29;
    
    this.hello = function(){
        alert(greetings);
    };
    
    var greetings = 'hello ! My name is ' + this.name_filter + '.';
});
```

**It is recommended to CamelCase module names as you would for any class name.*

A module called *Filters* has been created.  
The *Filters* module contains three public properties (*name_filter*, *age_filter* and *hello*).
Those properties are accessible from an instance of your module. *Filters* also contains a private variable (*greetings*) that is only accessible inside the module.

#### Instantiating a module

The app now contains an instance of the module:
```javascript
var filters = app.get_instance('Filters');
```

Every module is a singleton.  
