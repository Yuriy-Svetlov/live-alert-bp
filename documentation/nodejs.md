# live-alert-bp how to use for NodeJs

When you already have the browser plugin and this npm module is installed, you need to do the following.

## Steps
1. Download or copy [exmaple-nodejs-1](https://github.com/semiromid/live-alert-bp/documentation/examples/nodejs/1)

2. Go to the directory with the example and run the command in console: 

```shell
npm install
```
3. Double-clisk on **start.bat** or run in console 
```shell
node live-alert-bp.js
```

4. Open the browser plugin
   4.1. Go to 'Setting'
   4.2. Enter in the fields 'Server Host' `127.0.0.1` and 'Port' `8080`. Click the "Save" button. Back to the main menu.
   4.3. Go to **Reload Notification**. Turn on 'Visual notification' and 'Sound notification'. Back to the main menu.
   4.4. Go to **Live Alert**. Turn on 'Visual notification' and turn on 'Sound notification'
   4.5. Turn on the browser plugin (At the very top.)

5. Return to the project. Change the file `./dest/js/main.js` and save.

You should see a sound and visual notification on the browser pages.