'use strict';

const chokidar = require('chokidar');

const
  liveAlertBP = require("live-alert-bp"),
  dest = './dest/**/*.(js|css|php|html)',
  liveAlert = new liveAlertBP({
    host: '127.0.0.1',
	  port: '8080'
  });

// Run Server
liveAlert.run();

chokidar.watch(dest)
.on('change', (path) => {
  console.log('file changed');

  // Open Live-Alert-BP panel  
  liveAlert.open([
    { label: 'My label-1', message: 'My message-1.'},
    { label: 'My label-2', message: 'My message-2.'},
  ]);

  closeLiveAlert(3000);

});

function closeLiveAlert(milliseconds) {
  setTimeout(function(){
    liveAlert.resetError();

    // Close Live-Alert-BP panel
    liveAlert.close();

    // Push notification. Used for success notification. (Reload-Notification must be enabled)
    liveAlert.reloadNotification();     
  }, milliseconds);
}
