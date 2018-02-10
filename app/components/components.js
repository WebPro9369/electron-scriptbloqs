
riot.tag2('app', '<main toolbox="{opts.toolbox}" script="{opts.script}" shared-observable="{opts.sharedObservable}"></main>', 'app { height: 100%; width: 100%; }', '', function(opts) {
this.auth = false;

this.load = true;

console.log("why");
});
































riot.tag2('login', '<div riot-style="{styles}" class="valign-wrapper"> <form style="width: 300px" onsubmit="{submit}" class="col s12"> <div class="row"> <div class="input-field col s12"> <input id="email" type="text" ref="email" class="validate"> <label for="email">Email</label> </div> </div> <div class="row"> <div class="input-field col s12"> <input id="password" type="password" ref="password" class="validate"> <label for="password">Password</label> </div> </div> <button type="submit" name="action" class="btn waves-effect waves-light">Submit<i class="material-icons right">send</i></button> </form> </div>', '', '', function(opts) {
console.log("logging in");

this.styles = {
  "justify\-content": "center",
  height: "100vh"
};

this.submit = (function(_this) {
  return function(e) {
    var password, user_email, wpapi;
    wpapi = require('wpapi');
    e.preventDefault();
    user_email = _this.refs.email.value;
    password = _this.refs.password.value;
    window.wp = new wpapi({
      endpoint: 'https://scriptbloqs.com/wp-json',
      username: user_email,
      password: password,
      auth: true
    });
    return console.log(wp);
  };
})(this);
});

riot.tag2('main', '<pypod toolbox="{opts.toolbox}" script="{opts.script}" events-observable="{opts.sharedObservable}"></pypod>', 'main { height: 100%; width: 100%; }', '', function(opts) {
(function() {
  riot.settings.autoUpdate = false;

}).call(this);

});

riot.tag2('preload', '<div riot-style="{styles}" class="valign-wrapper"> <div class="progress"> <div class="indeterminate"></div> </div> </div>', '', '', function(opts) {
this.styles = {
  "justify\-content": "center",
  height: "100vh"
};
});