export default function(router, ENV) {

  var mountPath   = ENV["yebo"]["mount"];
  var signinPath  = ENV["yebo"]["signinPath"];
  var signupPath  = ENV["yebo"]["signupPath"];
  var accountPath = ENV["yebo"]["accountPath"];

  router.route('yebo', { resetNamespace: true, path: mountPath }, function () {
    // Login actions
    this.route('signin', { path: signinPath });
    this.route('signup', { path: signupPath });

    // Custumer Pages
    this.route('account', { path: accountPath });

    // Reset password
    this.route('reset-password', { path: 'reset-password/:token' });
    this.route('request-reset-password', { path: 'reset-password' });
  });
}
