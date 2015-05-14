# grunt-chromeload
Grunt task for loading or reloading tabs in Chrome.

Tired of having a new tab open every time you use grunt-open after launching a server or something? Me too. `grunt-chrome-load` scans open tabs across Chrome and reloads the ones you want instead of opening a brand new one every time.

## Prerequisites

* Grunt, obviously.
* `chrome-cli`: https://github.com/prasmussen/chrome-cli

## How to use it

```
grunt.config({
  chromeload: {
      dev: {
          reload_pattern: 'https?:\/\/localhost:8080',
          new_url: 'http://localhost:8080'
        },
      prod: {
          reload_pattern: 'https?:\/\/jayeb.com',
          new_url: 'http://jayeb.com'
        }
    },
});
```

For each target, you can define an optional `reload_pattern`. This string will be turned into a regular expression and used to determine which (if any) open Chrome tabs should be reloaded when the task is run.

For each target, you must also define a `new_url`. If the task is run and no Chrome tabs are found that match the `reload_pattern` parameter (or no `reload_pattern` is defined for this task), a new tab will be opened at this URL.


## Et cetera

If your server's hostname and port are already defined somewhere in your config, pipe these variables into `grunt-chromeload` to DRY out your shit:

```
grunt.config({
  chromeload: {
      dev: {
          reload_pattern: 'https?:\/\/<%= express.dev.options.hostname %>:<%= express.dev.options.port %>',
          new_url: 'http://<%= express.dev.options.hostname %>:<%= express.dev.options.port %>'
        }
    },
});
```

`grunt-chromeload` is also great when doing local development on Chrome extensions. where reloading the `chrome://extensions` page will reload your extension package:

```
grunt.config({
  chromeload: {
      extensions: {
          reload_pattern: 'chrome:\/\/extensions',
          new_url: 'chrome://extensions'
        }
    },
});
```
