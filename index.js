/**
 * Copyright (c) S. Yuri
 * https://github.com/semiromid
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const
	fs = require('fs'),
	https = require('https'),
	WebSocket = require('ws'),
	COLOR__YELLOW = '\x1b[93m%s\x1b[0m',
	COLOR__RED = '\x1b[31m%s\x1b[0m';

var debug = false;


class Server{

	constructor(options){
		if(options.port === undefined){
			this.port = 8080;
		}else{
			this.port = options.port;
		}

		if(options.host === undefined){
			this.host = '127.0.0.1';
		}else{
			this.host = options.host;
		}		

		this.wss = null;
		this.ssl = options.ssl;
		this.error = false;
		debug = options.debug;
	}


	run(){
		if(this.ssl !== undefined && this.ssl.enable === true){
			/* 
			    # tls_createsecurecontext_options
				https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
			 */
			if(validationSSL_options(this.ssl.options) == false){
				console.log(" The server does not start.");
				return false;
			}

			this.ssl.options.key = getFileData(this.ssl.options.key);
			this.ssl.options.cert = getFileData(this.ssl.options.cert);
			this.ssl.options.ca = getFileData(this.ssl.options.ca);

			this.wss = new WebSocket.Server({ 
				server: https.createServer(this.ssl.options).listen(this.port) 
			});

			console.log(" Server started with SSL connection | host: "+this.host+" | port: "+this.port);
		}else{
			this.wss = new WebSocket.Server({ host: this.host, port: this.port });
			console.log(" Server started | host: "+this.host+" | port: "+this.port);
		}
		
		
		if(debug === true){
			this.wss.on('connection', function connection(ws) {
			 	console.log(' New connection');
			 	ws.on('close', function close() {
					console.log(' disconnected');
				});
			});
		}
		
	
		function validationSSL_options(options){
			if(options === undefined){
				console.log(COLOR__RED, '[ssl_options] is undefined.');
				return false;
			}

			if(options.key === undefined){
				console.log(COLOR__RED, '[ssl_options.key] is undefined.');
				return false;
			}

			if(options.cert === undefined){
				console.log(COLOR__RED, '[ssl_options.cert] is undefined.');
				return false;
			}

			if(fs.existsSync(options.key) === false){
				console.log(COLOR__RED, 'The file does not exist: '+options.key);
				return false;
			}

			if(fs.existsSync(options.cert) === false){
				console.log(COLOR__RED, 'The file does not exist: '+options.cert);
				return false;
			}
		}
	}


	close(){
		if(this.hasError() != true && this.wss != undefined){
		     this.wss.clients.forEach(function each(client) {
		      	if(client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({
						action: 'live_alert_close'
					}));

					if(debug === true){
						console.log('[Live Alert-BP] ' + getDateTime());
					}
		    	     }
		     });	
		}			
	}


	open(message){
		this.error = true;

		if(this.wss != undefined){
		     this.wss.clients.forEach(function each(client) {
		      	if(client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({
						action: 'live_alert',
						message: message
					}));

		        	     console.log('[Live Alert] ' + getDateTime());
		    	     }
		     });	
		}		
	}


	reloadNotification(){
		if(this.hasError() != true && this.wss != undefined){
		     this.wss.clients.forEach(function each(client) {
		      	if(client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({
						action: 'reload_notification_push'
					}));

					if(debug === true){
						console.log('[Live Alert-BP] (reloadNotification) ' + getDateTime());
					}
		    	     }
		     });	
		}
	}


	resetError(){
		this.error = false;
	}

	hasError(){
		return this.error;
	}

}

module.exports = Server;


function getFileData(path){
	if(path === undefined){
		return null;
	}

	if(fs.existsSync(path) === false){
		return null;
	}

	return fs.readFileSync(path);
}


function getDateTime(){
    const 
    now = new Date();

    let
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds(), 
    milliseconds = now.getMilliseconds();

    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }

    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }

    if(second.toString().length == 1) {
         second = '0'+second;
    }   

    return hour+':'+minute+':'+second+':'+milliseconds;
}
