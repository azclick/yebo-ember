# Customization

The Yebo Ember frontend has been built carefully to provide stability, but not 
limit the developer.

### Defaults
***

All Yebo Ember configuration is done through the Ember CLI environment.  Here's
the defaults for the `yebo-ember-storefronts` package:

```javascript
ENV["yebo"] = {
  apiHost: "http://localhost:3000",
  namespace: "api/ams",
  mount: "/",
  productsPath: "products",
  cartPath: "cart",
  checkoutPath: "checkout",
  ordersPath: "orders",
  taxonsPath: "t"
}
```

### Zurb Foundation
***

We chose Zurb Foundation because it allowed us to build a fully responsive 
frontend without writing a line of custom CSS.

It's super easy to disable.  Simply edit your application's
`Brocfile.js`:

```javascript
var app = new EmberApp({
  'yebo-ember-storefront': {
    disableNormalize: true,
    disableFoundation: true
  }
});
```
**Note:** This is also useful if you'd like to use a more configurable approach
to Zurb Foundation, such as [ember-cli-foundation-sass](https://github.com/artificialio/ember-cli-foundation-sass).

# Generators

Generators allow you to copy files from an Ember Addon into your Ember host 
application.  This way they will override the Addon versions of themselves, and
allow the developer to deeply customize the way an Addon behaves.

### Templates
***

When you installed `yebo-ember-storefront`, every frontend template file from
the addon was copied to your host application.  If you need to re-install them,
you can re-run the default generator:

```bash
ember generate yebo-ember-storefront
```

**Note:** This will also attempt to re-install `ember-cli-foundation-sass`, and
overwrite any template changes you've made since the initial installation.

### Components
***

Sometimes, you'll want to deeply customize the way a component behaves.  You can
copy the `yebo-ember-storefront` component javascript files to your host
application with this generator: 

```bash
ember generate yebo-ember-storefront-components
```

You can now extend the default components, or overwrite them completely.

### Routes
***

If you need to add actions to routes, or specify custom route behaviour, you'll
want to copy the `yebo-ember-storefront` route javascript files to your host
application.  Simply run this generator:

```bash
ember generate yebo-ember-storefront-routes
```

You'll now have the routes availble to your application, ready for
customization.

### Customizing the Checkout Flow
***

The `yebo-ember-storefront` addon uses `yebo-ember-checkouts` as a dependency.
It provides a stateful checkout abstraction as a service to allow the developer
to build a single page checkout in a reactive style of programming.

Yebo allows the developer to customize the backend Order State Machine.  Yebo
Ember provides the same utility through the [Ember FSM](https://github.com/heycarsten/ember-fsm)
library.

#### **For more information, please see the [yebo-ember-checkouts API Documentation.](http://www.yebo-ember.com/checkouts/index.html)**

### Adding User Accounts and Management 
***

Yebo also provides User models.  If you'd like to add user accounts and user
management to your Yebo Ember application, you can do so with a single line
install:

```bash
ember install yebo-ember-auth
```

Like `yebo-ember-storefront`, you'll want to add the `yebo-ember-auth` router
to your application.

In `router.js`:

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

The `yebo-ember-auth` package is a wrapper for the 
[Ember Simple Auth](https://github.com/simplabs/ember-simple-auth) package, and 
provides some default customization variables to the `yebo` environment object.

#### **For more information, please see the [yebo-ember-auth API Documentation.](http://www.yebo-ember.com/auth/index.html)**
