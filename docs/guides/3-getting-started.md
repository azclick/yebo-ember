# Getting Started

The quickest way to get starting using Yebo Ember is to install the
`yebo-ember-storefront` addon into a new Ember CLI application.

Under the hood, the `yebo-ember-storefront` addon uses:
- `yebo-ember-core`
- `yebo-ember-checkouts`
- `Normalize.css`
- `Zurb Foundation 5.5`

### Ember CLI
***

First - you'll need the Ember CLI.  Head over to 
[Getting Started with Ember CLI](http://www.ember-cli.com/#getting-started) for 
instructions.

Once installed, you'll want to spin up a new Ember application.

```bash
ember new frontend
cd frontend
ember server
```

Now open up your browser, and navigate to `localhost:4200`, and you you should 
see the default Ember welcome page!

### Installing Yebo Ember
***

The `yebo-ember-storefront` package installs it's dependencies automatically,
so you can simply use the one line installer:

```bash
ember install yebo-ember-storefront
```

This command will copy all of the storefront route & component templates to your 
application, for easy customization.

### Importing the Yebo Storefront Router
***

Now, you'll need to tell Ember where to put the Yebo routes.

In `router.js`:

```javascript
import Ember from 'ember';
import config from './config/environment';
import yeboRouter from 'yebo-ember-storefront/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  yeboRouter(this, config);
});

export default Router;
```

### Fire it up! 
***

Now start up the `ember server` again, and you should now see the Yebo Ember 
welcome page at `http://localhost:4200`!  Head to `/products`, and your
application should load products into your Ember app from your Yebo server.

**Note:** If you're not seeing any products or data, double check your Yebo
server is running on `http://localhost:3000`.

#### **Next, you'll probably want to [customize Yebo Ember.](./4-customization.html)**
