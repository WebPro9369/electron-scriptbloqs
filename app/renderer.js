var AppConfig;

AppConfig = {
  code401: function() {},
  code400: function() {},
  code403: function() {
    return localStorage.removeItem("token");
  },
  code500: function() {},
  code502: function() {}
};

$.ajaxSetup({
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  statusCode: {
    400: AppConfig.code400,
    401: AppConfig.code401,
    403: AppConfig.code403,
    500: AppConfig.code500,
    502: AppConfig.code502
  },
  beforeSend: function(xhr) {
    var sendToken, token;
    token = localStorage.getItem("token");
    if (token) {
      sendToken = "Bearer " + token;
      return xhr.setRequestHeader("Authorization", sendToken);
    }
  }
});
