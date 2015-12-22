export default function(router, ENV) {

  var mountPath      = ENV["yebo"]["mount"];
  var cartPath       = ENV["yebo"]["cartPath"];
  var checkoutPath   = ENV["yebo"]["checkoutPath"];
  var productsPath   = ENV["yebo"]["productsPath"];
  var ordersPath     = ENV["yebo"]["ordersPath"];
  var taxonsPath     = ENV["yebo"]["taxonsPath"];

  router.route('yebo', { resetNamespace: true, path: mountPath }, function () {
    router.route('yebo.cart', { path: mountPath + '/' + cartPath });
    router.route('yebo.checkout', { path: mountPath + '/' + checkoutPath });

    router.route('yebo.products', { path: mountPath + '/' + productsPath },function() {
      this.route('index', { path: '/', queryParams: ['taxon'] });
      this.route('show', { path: '/:slug' });
    });

    router.route('yebo.taxons', { path: mountPath + '/' + taxonsPath },function() {
      this.route('index', { path: '/*taxon_id' });
    });

    router.route('yebo.orders', { path: mountPath + '/' + ordersPath },function() {
      this.route('index', { path: '/' });
      this.route('show', { path: '/:id' });
    });
  });
}
