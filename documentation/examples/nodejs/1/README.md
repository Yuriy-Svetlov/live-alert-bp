# Example - 1 (NodeJs) (live-alert-bp)

When you already have the browser plugin «[Live Alert Browser Page](https://live-alert-browser-page.com/)» and this npm module is installed, you need to do the following.

## Steps
**1.** Download or copy [exmaple-1](https://github.com/Yuriy-Svetlov/live-alert-bp/tree/master/documentation/examples/nodejs/1)

**2.** Go to the directory with the example and run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **start.bat** or run in console 

```shell
node live-alert-bp.js
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080

**4.** 
Open your browser: http://localhost:3000

**5.** Open the browser plugin

   **5.1.** Go to 'Setting'
   
   **5.2.** Enter in the fields 'Server Host' `127.0.0.1` and 'Port' `8080`. Click the "Save" button. Back to the main menu.

![Live Alert Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-alert-bp/master/documentation/img/live-alert-browser-page-1.png)

   **5.3.** Go to **Reload Notification**. Turn on 'Visual notification' and 'Sound notification'. Back to the main menu.
 
![Live Alert Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-alert-bp/master/documentation/img/live-alert-browser-page-2.png)
 
   **5.4.** Go to **Live Alert**. Turn on 'Visual notification' and turn on 'Sound notification'

![Live Alert Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-alert-bp/master/documentation/img/live-alert-browser-page-4.png)

   **5.5.** Turn on the browser plugin (At the very top.)

![Live Alert Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-alert-bp/master/documentation/img/live-alert-browser-page-3.png)

**6.** Return to the project. Change the file `./dest/js/index.js` and save. The **Live Alert Browser Page** panel will open (if you have enabled **Live Alert Browser Page**).

**Congratulation!**
