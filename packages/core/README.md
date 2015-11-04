# Yebo Ember Core

[![Build Status](https://travis-ci.org/azclick/yebo-ember.svg?branch=master)](https://travis-ci.org/azclick/yebo-ember)
[![Join the chat at https://gitter.im/azclick/yebo-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/azclick/yebo-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Yebo Ember Core is the core dependency of all other Yebo Ember addons.  It
provides the `yebo` service, which has a seperate `store` to the host
application.

This store uses a custom `serializer` and `adapter` that are
designed to work tightly with the [Yebo](http://github.com/yebo/yebo) rails
engine, via [Yebo AMS](http://github.com/azclick/yebo_ams).

```bash
this.yebo.store.findAll("product");
```

**Note:** This Package is included with `yebo-ember-storefront`.  If you're
using that, there's no need to install this seperately.

This addon also adds the following models to the global namespace:
* Address
* Address
* Country
* Image
* Line Item
* Order
* Payment Method
* Payment
* Product Propert
* Product
* Shipment
* Shipping Category
* Shipping Method
* Shipping Rate
* Source
* State
* Stock Location
* Taxon
* Taxonomy
* User
* Variant
* Zone

Finally, this addon handles the UI State Persistance using browser local
storage.

## Installation

```bash
ember install yebo-ember-core
```

For full Yebo Ember documentation, visit [http://www.yebo-ember.com/](http://www.yebo-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Yebo Ember

If you're just getting started, it's recommended that you checkout the
`yebo-ember-storefront` addon instead.  It's the quickest way to get up and
running with Yebo Ember.
