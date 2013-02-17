cordova.define("cordova/plugin/assetfilereader",
  function(require, exports, module) {
    ProgressEvent = require('cordova/plugin/ProgressEvent');
    FileError = require('cordova/plugin/FileError'),

    var AssetFileReader = function () {
        this.readyState = 0;
        this.error = null;
        this.result = null;
    };

    AssetFileReader.EMPTY = 0;
    AssetFileReader.LOADING = 1;
    AssetFileReader.DONE = 2;

    AssetFileReader.prototype.abort = function() {
        this.result = null;
    
        if (this.readyState == FileReader.DONE || this.readyState == FileReader.EMPTY) {
          return;
        }
    
        this.readyState = FileReader.DONE;
    
        // If abort callback
        if (typeof this.onabort === 'function') {
            this.onabort(new ProgressEvent('abort', {target:this}));
        }
        // If load end callback
        if (typeof this.onloadend === 'function') {
            this.onloadend(new ProgressEvent('loadend', {target:this}));
        }
    };

    AssetFileReader.prototype.readAsArrayBuffer = function(file) {
        console.log('method "readAsArrayBuffer" is not supported at this time.');
        this.abort();
    };

    AssetFileReader.prototype.readAsText = function(file, encoding) {
        // Default encoding is UTF-8
        var enc = encoding ? encoding : "UTF-8";
        var me = this;

        var request = new XMLHttpRequest();
        request.open("GET", file, true);
        request.onreadystatechange = function() {//Call a function when the state changes.
            if (request.readyState == 3) {
                // If onprogress callback
                if (typeof me.onprogress === "function") {
                    // Save partial result
                    me.result = request.responseText;

                    me.onprogress(new ProgressEvent("progress", {target:me}));
                }
            } else if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    // If DONE (cancelled), then don't do anything
                    if (me.readyState === FileReader.DONE) {
                        return;
                    }
        
                    // Save result
                    me.result = request.responseText;
        
                    // If onload callback
                    if (typeof me.onload === "function") {
                        me.onload(new ProgressEvent("load", {target:me}));
                    }
        
                    // DONE state
                    me.readyState = FileReader.DONE;
        
                    // If onloadend callback
                    if (typeof me.onloadend === "function") {
                        me.onloadend(new ProgressEvent("loadend", {target:me}));
                    }
                } else {
                    // If DONE (cancelled), then don't do anything
                    if (me.readyState === FileReader.DONE) {
                        return;
                    }
        
                    // DONE state
                    me.readyState = FileReader.DONE;
        
                    // null result
                    me.result = null;
        
                    // Save error
                    me.error = new FileError(e);
        
                    // If onerror callback
                    if (typeof me.onerror === "function") {
                        me.onerror(new ProgressEvent("error", {target:me}));
                    }
        
                    // If onloadend callback
                    if (typeof me.onloadend === "function") {
                        me.onloadend(new ProgressEvent("loadend", {target:me}));
                    }
                }
            }
        }
        // If onloadstart callback
        if (typeof this.onloadstart === "function") {
            this.onloadstart(new ProgressEvent("loadstart", {target:me}));
        }
        request.send();
    };

    AssetFileReader.prototype.readAsDataURL = function(file) {
        console.log('method "readAsDataURL" is not supported at this time.');
        this.abort();
    };

    var fileReader = new AssetFileReader();
    module.exports = fileReader;
});