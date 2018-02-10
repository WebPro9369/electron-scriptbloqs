main
  pypod(toolbox="{opts.toolbox}" script="{opts.script}"  events-observable="{opts.sharedObservable}")
  script
    :coffee-script
        riot.settings.autoUpdate = false

  style(type="text/stylus").
    main
      height 100%
      width 100%