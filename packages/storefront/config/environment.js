'use strict';

module.exports = function(/* environment, appConfig */) {
  return { 
    "yebo": {
      apiHost: "http://localhost:3000",
      namespace: "api/ams",
      mount: "/",
      productsPath: "products",
      cartPath: "cart",
      checkoutPath: "checkout",
      ordersPath: "orders",
      taxonsPath: "t"
    }
  };
};
