# Configuring Yebo

There's a few steps you'll need to take to ensure your Yebo server plays nice 
with your Yebo Ember application.

### Create a new Yebo App
***

**Note:** Your Yebo App should be seperate to your Ember App.

Currently, we're only supporting the `3-0-stable` branch of Yebo.  Head over to 
that [branch on Yebo's Github](https://github.com/yebo/yebo/tree/3-0-stable) 
and follow the installation steps.

**Answer 'yes' to all of the prompts to install all Seed and Sample data**.

### Add yebo_ams to the Gemfile
***

[Yebo AMS](https://github.com/azclick/yebo_ams) is a Yebo Extension that adds a 
namespace to Yebo's default API routes, that respond as per the 
[Active Model Serializers](https://github.com/rails-api/active_model_serializers/tree/0-8-stable) gem.

**Note:** This is the key to standardising the way Yebo communicates with Ember.

Follow the instructions on the Yebo AMS Readme to install it into your Yebo
application.

### Start your Rails Server
***

Let's start the Rails Server, and leave it running:

```bash
spring rails server
```

**Note:** By default, Yebo Ember expects the Rails Server running at
`http://localhost:3000`.  You can change this later.

### Gotchas
***

* Unless you're using Yebo in `RAILS_ENV=development`, the Rails server will
  attempt to send a confirmation message when the order state transitions from
  `confirm` to `complete`.  You'll see something like: `{exception: "connect(2)
  connection refused"}` in your server response.  Just configure SMTP for your
  production environment in the standard Rails way, and you're good.

**Note:** If you're having trouble getting started, check out the
[yebo-ember-testing](https://github.com/azclick/yebo-ember-testing) Rails example.
This is the Yebo application we run at `http://testing.yebo-ember.com` for live 
Ember acceptance tests.

#### **Nice!  Now you're ready to [get started with Yebo Ember.](./3-getting-started.html)**
