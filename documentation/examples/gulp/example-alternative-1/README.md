# Alternative Example - 1 with using Gulp (live-alert-bp)

This example shows how to use this plugin differently with Gulp.

**1.** Download or copy [example-alternative-1](https://github.com/semiromid/live-alert-bp/tree/master/documentation/examples/gulp/example-alternative-1)

**2.** Go to the directory with `gulpfile.js` and run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **start.bat** or run in console 

```shell
gulp watch
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080

**4.** Set up a connection with the plugin. [Example of how to establish a connection to a plugin](https://github.com/semiromid/live-alert-bp/tree/master/documentation/examples/%D1%81onnect_to_server)

**5.** Change a file `.sass` (make a syntax error).

**Congratulation!**

You should hear a sound and see a visual notification on the browser page.




