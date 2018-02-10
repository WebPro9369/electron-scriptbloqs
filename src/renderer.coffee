AppConfig = {
  code401: () ->

  code400: () ->

  code403: () ->
    localStorage.removeItem("token")
  code500: ()->

  code502: () ->
}

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
  beforeSend: (xhr)->
    token =  localStorage.getItem("token")
    if(token)
      sendToken = "Bearer " + token
      xhr.setRequestHeader("Authorization", sendToken)
})