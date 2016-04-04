# Lacey
[![Build Status](https://travis-ci.org/alexzicat/lacey.svg?branch=master)](https://travis-ci.org/alexzicat/lacey)  
***Lacey*** is a small javascript library for module oriented development.

## Table of contents
- [Quick start](#quick-start)
- [How to use](#how-to-use)

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
Once the library is installed, you are now ready to create a ***lacey*** app.  
A ***lacey*** project is structured as follows:
```
javascripts/
├── modules/
│   ├── a_module.js
│   ├── another_module.js
├── app.js
```
**The project structure proposed is not required, only recommended.*  

You can now create your *app.js* file.  
This file contains only the following line of code:
```javascript
window.app = new LaceyApp('name_of_your_app');
```