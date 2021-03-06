# live-alert-bp (Live Alert Browser Page)

![Live Alert Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-alert-bp/master/images/on_128x128_v1.png)

This module is for the browser plugin «[Live Alert Browser Page](https://live-alert-browser-page.com/)» — this is the browser plugin for real-time alert on the browser page during web development.

[live-alert-browser-page.com](https://live-alert-browser-page.com/)

You may also want to use: 
* [Live Reload Browser Page](https://live-reload-browser-page.com/)
* [Live HTML Validator](https://live-html-validator.com/)

![Live Alert Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-alert-bp/master/documentation/img/1_1280x800.png)

## Installs

**Step - 1** 

You need to install the browser plugin [Live Alert Browser Page](https://live-alert-browser-page.com/) if you have not already installed it for:
  * [Google Chrome](https://chrome.google.com/webstore/detail/live-alert-browser-page/cjhigcdlmbhfagoidakpmmkgmokhocdl)
  
**Step - 2**
```shell
npm i live-alert-bp --save-dev
```

##  How to use

[Example of how to establish a connection to the plugin «**Live Alert Browser Page**»](https://github.com/Yuriy-Svetlov/live-alert-bp/tree/master/documentation/examples/%D1%81onnect_to_server)

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

* [NodeJs](https://github.com/Yuriy-Svetlov/live-alert-bp/tree/master/documentation/nodejs) (To better understand how to use this tool, it is recommended that you get started.)
* [Gulp](https://github.com/Yuriy-Svetlov/live-alert-bp/blob/master/documentation/examples/gulp/README.md)
* [Webpack](https://github.com/Yuriy-Svetlov/live-alert-bp/blob/master/documentation/examples/webpack/README.md)
* [Grunt](https://github.com/Yuriy-Svetlov/live-alert-bp/tree/master/documentation/examples/grunt)



## Formaters
* [live-alert-bp-formatter-eslint](https://github.com/Yuriy-Svetlov/live-alert-bp-formatter-eslint)
* [live-alert-bp-formatter-jshint](https://github.com/Yuriy-Svetlov/live-alert-bp-formatter-jshint)
* [live-alert-bp-formatter-postcss](https://github.com/Yuriy-Svetlov/live-alert-bp-formatter-postcss)
* [live-alert-bp-formatter-sass](https://github.com/Yuriy-Svetlov/live-alert-bp-formatter-sass)
* [live-alert-bp-formatter-stylelint](https://github.com/Yuriy-Svetlov/live-alert-bp-formatter-stylelint)

## Other related modules

* [postcss-on-alert](https://github.com/Yuriy-Svetlov/postcss-on-alert)
* [grunt-jshint-event-reporter](https://github.com/Yuriy-Svetlov/grunt-jshint-event-reporter)
* [call-no-more-often-than](https://github.com/Yuriy-Svetlov/call-no-more-often-than)
* [grunt-sass-scss](https://github.com/Yuriy-Svetlov/grunt-sass)
* [gulp-live-alert-bp](https://github.com/Yuriy-Svetlov/gulp-live-alert-bp)


##  API

### Instance options (for run the server)

`const liveAlert = new liveAlertBP({options});`

#### options.host
* Type: `String`
* Default value: `127.0.0.1`

#### options.port
* Type: `String|Integer`
* Default value: `8080`

#### options.debug
* Type: `boolean`
* Default value: `false`

Prints additional data to the console

#### options.ssl
* Type: `ObjectJSON`
* Default value: `undefined`

To connect via SSL connection.

[options ssl](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

```js
ssl: { 
  enable: true,
    options: { 
      key: './ssl/my.key',
      cert: './ssl/my.crt'  
  }               
}
```

### Instance methods

#### liveAlert.run()
Running the server

#### liveAlert.open(message)
Call the alert panel on a web page. 

\* The method in [live-reload-bp](https://github.com/Yuriy-Svetlov/live-reload-bp) has other name. See [live-reload-bp API](https://github.com/Yuriy-Svetlov/live-reload-bp#api).


`message` must be in the format (you can also look at [Browser plugin API](https://live-alert-browser-page.com/documentation)):

```js
[
  { label: 'My label-1', message: 'My message-1.'}
]
```

or

```js
[
  {
    label: {
      style: { 
        backgroundColor: '#ff0000', 
        color: '#ffffff' 
      }, 
      name: 'Error'             
    },
    message: 'My message...'
  }
]
```

#### liveAlert.close()
To clouse the alert panel on a web page.

#### liveAlert.reloadNotification()
Sound alert

#### liveAlert.resetError()
Reset errors

#### liveAlert.hasError()
Check if there are any errors

##  Browser plugin API

[API of browser plugin **Live Alert Browser Page**](https://live-alert-browser-page.com/documentation)