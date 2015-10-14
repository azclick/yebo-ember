# Yebo Ember Storefront

[![Build Status](https://travis-ci.org/azclick/yebo-ember.svg?branch=master)](https://travis-ci.org/azclick/yebo-ember)
[![Join the chat at https://gitter.im/azclick/yebo-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/azclick/yebo-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The Yebo Ember Storefront is a collection of routes, templates and components
that work out of the box with the [Yebo](http://github.com/yebo/yebo) rails 
engine via [Yebo AMS](http://github.com/azclick/yebo_ams).

It uses:
* [Yebo Ember Core](http://www.yebo-ember.com/core/index.html)
* [Yebo Ember Checkouts](http://www.yebo-ember/checkouts/index.html)

## Installation

```bash
ember install yebo-ember-storefront
```

This will install all of the Storefront templates into your host application.

Now, you'll need to tell Ember's router where to put the standard Yebo routes.

In `router.js`:

```javascript
import Ember from 'ember';
import config from './config/environment';

// This line imports the Yebo Router.
import yeboRouter from 'yebo-ember-storefront/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  yeboRouter(this, config);
});

export default Router;
```

For full Yebo Ember documentation, visit [http://www.yebo-ember.com/](http://www.yebo-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Disable Normalize.css & Zurb Foundation

Yebo Ember Storefront includes Normalize & Zurb Foundation into your CSS tree.
If you'd like to disable them, you can optionally do so in your application's
`Brocfile.js`.

```javascript
var app = new EmberApp({
  'yebo-ember-storefront': {
    disableNormalize: true,
    disableFoundation: true
  }
});
```

