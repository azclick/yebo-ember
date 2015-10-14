# Yebo Ember Auth

[![Build Status](https://travis-ci.org/azclick/yebo-ember.svg?branch=master)](https://travis-ci.org/azclick/yebo-ember)
[![Join the chat at https://gitter.im/azclick/yebo-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/azclick/yebo-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The Yebo Ember Auth package is a wrapper on 
[Ember Simple Auth](https://github.com/simplabs/ember-cli-simple-auth), that 
provides a custom Yebo `Authorizer` and `Authenticator` that work out of the box 
with the [Yebo](http://github.com/yebo/yebo) rails engine via 
[Yebo AMS](http://github.com/azclick/yebo_ams).

It uses:
* [Yebo Ember Core](http://www.yebo-ember.com/core/index.html)
* [Ember Simple Auth](https://github.com/simplabs/ember-cli-simple-auth)

## Installation

```bash
ember install yebo-ember-auth
```

This will run the `yebo-ember-auth` generator, which does a few key things:

* Adds Ember CLI Simple Auth to your host application
* Installs user related routes at `app/routes/yebo/*`
* Installs user related route templates at `app/templates/yebo/*`
* Attempts to install an application route file at `app/routes/application.js`

**Important:** If you opted to not override your application route, or you're
using an application setup that will ignore the generated `application.js` such
as the Pod structure, you'll need to manually import the Ember Simple Auth
application route mixin, like so:

```javascript
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin);
```

It's recommended that you study the [Ember Simple Auth Documentation](http://ember-simple-auth.com/ember-simple-auth-api-docs.html).

For full Yebo Ember documentation, visit [http://www.yebo-ember.com/](http://www.yebo-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Setup

Now you'll need to tell your router about the new Yebo Auth routes:

```javascript
import Ember from 'ember';
import config from './config/environment';

import yeboRouter from 'yebo-ember-storefront/router';
import yeboAuthRouter from 'yebo-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  yeboRouter(this, config);
  yeboAuthRouter(this, config);
});

export default Router;
```

### Configuration

All customization is done through the Ember CLI Environment.  Here's the
defaults:

```javascript
"yebo": {
  signinPath: 'signin',
  signupPath: 'signup',
  accountPath: 'account'
},

"simple-auth": {
  localStorageKey: 'yebo-ember:session',
  authorizer: 'simple-auth-authorizer:yebo',
  crossOriginWhitelist: ['http://localhost:3000'],
  authenticationRoute: 'yebo.signin',
  routeAfterAuthentication: "yebo.account",
  routeIfAlreadyAuthenticated: "yebo.account"
}
```

### Overriding the Signin / Signup Component

You can override the appearance and behaviour of the `{{yebo-auth}}` component
by running the generator:

```bash
ember g yebo-ember-auth-component
```

This will install a template file at `app/templates/components/yebo-auth` and a
component file at `app/components/yebo-auth`.

#### **For more information, please see the [yebo-ember-auth API Documentation.](http://www.yebo-ember.com/auth/index.html)**
