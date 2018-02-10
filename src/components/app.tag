app
  //preload(show='{load}')
  //login(hide='{auth}')
  main( toolbox="{opts.toolbox}" script="{opts.script}"  shared-observable="{opts.sharedObservable}")
  style(type="text/stylus").
    app
      height 100%
      width 100%
  script(type='text/coffeescript').
      #check if user token is valid
      @auth = false
      @load = true
      console.log "why"
      # @on('mount',  =>
      #                 $.ajax({
      #                 url: 'https://scriptbloqs.com/wp-json/jwt-auth/v1/token/validate',
      #                 type: 'POST'
      #                 timeout: 2000
      #                 }).then((res)=>
      #                     console.log "successed"
      #                     console.log res
      #                     @auth = true;
      #                     @load = false;
      #                     @update()
      #                     return
      #                 , ()=>
      #                     console.log "suckks ess"
      #                     @load = false;
      #                     @update()
      #                     return
      #                 )
      # )
