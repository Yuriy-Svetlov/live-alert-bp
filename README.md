# live-alert-bp (Live Alert Browser Page)

![Live Alert Browser Page](https://raw.githubusercontent.com/semiromid/live-alert-bp/master/images/on_128x128_v1.png)

This module is for the browser plugin «[Live Alert Browser Page](https://live-alert-browser-page.com/)» — this is the browser plugin for real-time alert on the browser page during web development.

[live-alert-browser-page.com](https://live-alert-browser-page.com/)

You may also want to use: 
* [live-reload-browser-page](https://live-reload-browser-page.com/)
* [live-html-validator](https://live-html-validator.com/)

## Installs

**Step - 1** 

You need to install the browser plugin [Live Alert Browser Page](https://live-alert-browser-page.com/) if you have not already installed it for:
  * [Google Chrome](#)
  * Firefox (not yet available)
  
**Step - 2**
```shell
npm i live-alert-bp --save-dev
```

##  How to use

[Example of how to establish a connection to the plugin «**Live Alert Browser Page**»](https://github.com/semiromid/live-alert-bp/tree/master/documentation/examples/%D1%81onnect_to_server)

```javascript
const liveAlertBP = require("live-alert-bp");
const liveAlert = new liveAlertBP({
  host: '127.0.0.1',
   port: '8080'
});

// Run Server
liveAlert.run();

console.log('Within 10 seconds, you need to connect to this server using the browser plugin «Live Alert Browser Page».');

setTimeout(function(){
  // Open Live-Alert-BP panel (Without using a formatter)  
  liveAlert.open([
    { label: 'My label-1', message: 'My message-1.'},
    { label: 'My label-2', message: 'My message-2.'},
  ]);

  closeLiveAlert(3000);      
}, 10000);



function closeLiveAlert(milliseconds) {
  setTimeout(function(){
    liveAlert.resetError();

    // Close Live-Alert-BP panel
    liveAlert.close();

    // Push notification. Used for success notification. (Reload-Notification must be enabled)
    liveAlert.reloadNotification();     
  }, milliseconds);
}
```

##  Examples:

* [NodeJs](https://github.com/semiromid/live-alert-bp/tree/master/documentation/nodejs) (To better understand how to use this tool, it is recommended that you get started.)
* [Gulp](https://github.com/semiromid/live-alert-bp/blob/master/documentation/examples/gulp/README.md)
* [Webpack](https://github.com/semiromid/live-alert-bp/blob/master/documentation/examples/webpack/README.md)
* [Grunt](https://github.com/semiromid/live-alert-bp/tree/master/documentation/examples/grunt)



## Formaters
* [live-alert-bp-formatter-eslint](https://github.com/semiromid/live-alert-bp-formatter-eslint)
* [live-alert-bp-formatter-jshint](https://github.com/semiromid/live-alert-bp-formatter-jshint)
* [live-alert-bp-formatter-postcss](https://github.com/semiromid/live-alert-bp-formatter-postcss)
* [live-alert-bp-formatter-sass](https://github.com/semiromid/live-alert-bp-formatter-sass)
* [live-alert-bp-formatter-stylelint](https://github.com/semiromid/live-alert-bp-formatter-stylelint)

## Other related modules

* [postcss-on-alert](https://github.com/semiromid/postcss-on-alert)

* [grunt-jshint-event-reporter](https://github.com/semiromid/grunt-jshint-event-reporter)

* [call-no-more-often-than](https://github.com/semiromid/call-no-more-often-than)
