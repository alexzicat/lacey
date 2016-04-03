[![Build Status](https://travis-ci.org/alexzicat/lacey.svg?branch=master)](https://travis-ci.org/alexzicat/lacey)

# Lacey
***Lacey*** is a small javascript library for module oriented development.

## Table of contents
- [Quick start](#quick-start)
- [How to use](#how-to-use)

## Quick start
There is many different options made available you can use to install the library to your project.

### Install with npm
```shell
npm install lacey --save
```
 
### Install with Bower
```shell
bower install lacey --save
```

Once installed, add a script tag to your html header pointing to `dist/lacey.js`.  
You can also use the minified version: `dist/lacey.min.js`

### Install with Ruby
The official gem that wraps the ***lacey*** library is [lacey-rails](https://github.com/alexzicat/lacey-rails).  
***lacey-rails*** is a gemified version for an easier integration with the rails asset pipeline.

Add this line to your application's Gemfile:

```ruby
gem 'lacey-rails', '~> 1.0.0'
```

And then execute:
```shell
bundle install
````
    
Or install it yourself as:
```shell
gem install lacey-rails
````

Add the following directive to your Javascript manifest file (application.js):
```ruby
//= require lacey
```
The ***lacey-rails*** gem provides no minified version of the library and lets the asset pipeline take care of the job.

## How to use

