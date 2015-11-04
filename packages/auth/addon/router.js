export default function(router, ENV) {

  var mountPath   = ENV["yebo"]["mount"];
  var signinPath  = ENV["yebo"]["signinPath"];
  var signupPath  = ENV["yebo"]["signupPath"];
  var accountPath = ENV["yebo"]["accountPath"];
  
  router.resource('yebo', { path: mountPath }, function() {
    this.route('signin', { path: signinPath });
    this.route('signup', { path: signupPath });
    this.route('account', { path: accountPath });
  });
}
