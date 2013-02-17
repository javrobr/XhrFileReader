# XhrFileReader for PhoneGap Android #

You can't use the regular FileReader to read files from the assets folder so I'm providing an interface that follows the 
same API as the regular FileReader. Of course the XhrFileReader is not limited to only reading files from the assets folder, 
it can also read files from the file system and over HTTP.

## Adding the plugin to your project ##

1. To install the plugin, move XhrFileReader.js to your project's www folder and include a reference to it in your html files.

## Using the plugin ##

To instantiate a new reader use the folling code: 

    var reader = cordova.require("cordova/plugin/xhrfilereader");

Setup your event handlers:

    // called once the reader begins
    reader.onloadstart = function() {
        console.log("load start");
    };

    // called when the file has been completely read
    reader.onloadend = function(evt) {
        console.log("File read");
        console.log(evt.target.result);
    };

Unfortunately, you will only get an error on files read over HTTP. When you specify a file:// path the request status is 
always 0. There is no way to tell between a successful read or an error. So if you specify a file that does not exist like 
"file:///does.not.exist.txt" you will get an empty evt.target.result in your onloadend handler.

    // called if the reader encounters an error
    reader.onerror = function(error) {
        console.log("Error: " + error.code);
    };

Progress events are fired but are not very useful as they don't contain partial results.

    // called while the file is being read
    reader.onprogress = function(evt) {
        console.log("progress");
    };

Finally call your read method, for instance:

    reader.readAsText("http://www.google.com");
    reader.readAsText("file:///android_asset/www/config.json");
    reader.readAsText("file:///sdcard/error.log");

## Licence ##

The MIT License

Copyright (c) 2013 Simon MacDonald

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
